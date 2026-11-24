const resultados = document.getElementById('resultados');
const contador = document.getElementById('contador');
const estado = document.getElementById('estado');
const boton = document.getElementById('cargar');
const buscar = document.getElementById('buscar');
const cantidad = document.getElementById('cantidad');
let pokemones = [];

// 1. Consultar la API y convertir la respuesta a JSON.
async function consultarAPI(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error('Error HTTP: ' + respuesta.status);
    }
    return await respuesta.json();
}

// 2. Crear una tarjeta con las propiedades de un Pokémon.
function crearTarjeta(pokemon) {
    const columna = document.createElement('div');
    columna.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
    const tipos = pokemon.types.map(tipo => tipo.type.name).join(', ');
    const imagen = pokemon.sprites.other['official-artwork'].front_default
        || pokemon.sprites.front_default;
    columna.innerHTML = `
        <article class="card pokemon h-100 shadow-sm text-center p-3">
            <span class="text-secondary">#${pokemon.id}</span>
            ${imagen ? `<img src="${imagen}" alt="${pokemon.name}" class="mx-auto my-2">` : '<p>Sin imagen</p>'}
            <h2 class="h5 text-capitalize">${pokemon.name}</h2>
            <p class="mb-2"><span class="badge text-bg-dark">${tipos}</span></p>
            <p class="mb-1">Peso: ${pokemon.weight / 10} kg</p>
            <p class="mb-0">Altura: ${pokemon.height / 10} m</p>
        </article>`;
    return columna;
}

// 3. Recorrer la lista y actualizar el DOM sin duplicados.
function mostrarPokemones(lista) {
    resultados.replaceChildren();
    contador.textContent = lista.length;
    if (lista.length === 0) {
        estado.textContent = 'No se encontraron Pokémon.';
        return;
    }
    for (const pokemon of lista) {
        resultados.appendChild(crearTarjeta(pokemon));
    }
    estado.textContent = 'Datos cargados correctamente.';
}

// 4. Obtener la lista y los detalles de cada registro.
async function cargarPokemones() {
    boton.disabled = true;
    buscar.disabled = true;
    resultados.replaceChildren();
    contador.textContent = '0';
    estado.textContent = 'Cargando Pokémon...';
    pokemones = [];
    try {
        const datos = await consultarAPI(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad.value}`);
        for (const registro of datos.results) {
            const pokemon = await consultarAPI(registro.url);
            pokemones.push(pokemon);
        }
        filtrarPokemones();
    } catch (error) {
        pokemones = [];
        estado.textContent = 'No se pudo cargar la API. Intenta nuevamente.';
        console.error(error);
    } finally {
        boton.disabled = false;
        buscar.disabled = false;
    }
}

// 5. Buscar dentro de los Pokémon cargados.
function filtrarPokemones() {
    const texto = buscar.value.trim().toLowerCase();
    const filtrados = pokemones.filter(pokemon => pokemon.name.includes(texto));
    mostrarPokemones(filtrados);
}

boton.addEventListener('click', cargarPokemones);
buscar.addEventListener('input', filtrarPokemones);
cargarPokemones();

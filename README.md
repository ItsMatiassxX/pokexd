# Pokédex — INF211

Evaluación parcial 3. Consumo de PokéAPI con JavaScript y Bootstrap.

## Ejecutar
1. Abrir la carpeta en Visual Studio Code.
2. Abrir index.html en el navegador o mediante Live Server.
3. Mantener conexión a Internet para acceder a PokéAPI, imágenes y Bootstrap.
4. Comprobar 12 tarjetas, recargar y verificar que siguen siendo 12.
5. Cambiar cantidad a 24, recargar, buscar bulbasaur y luego un nombre inexistente. Limpiar búsqueda antes de comprobar el total.

## GitHub
Crear un repositorio vacío en GitHub, abrir la terminal en esta carpeta y ejecutar:

```bash
git init
git add .
git commit -m "Proyecto Pokedex INF211"
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```
Reemplazar URL_DE_TU_REPOSITORIO por la URL real. Dar acceso al profesor y entregar el enlace.

## Defensa oral: preguntas de práctica
- ¿Cómo consultas la API? script.js líneas 10–16: fetch espera la respuesta, se comprueba su estado y json convierte el cuerpo a datos JavaScript.
- ¿Dónde está la lista y cómo la recorres? líneas 60–64: datos.results contiene los registros con sus URL; for...of consulta cada detalle y push lo agrega al arreglo.
- ¿Cómo evitas duplicados? líneas 38–49 y 55–58: replaceChildren elimina tarjetas anteriores, se reinicia el arreglo al cargar y se actualiza el contador con length.
- ¿Cómo funciona el botón y qué pasa si no hay resultados? líneas 83–85 registran eventos y realizan la carga inicial; líneas 41–44 muestran un aviso para lista vacía; líneas 66–73 manejan errores y rehabilitan controles.

Funciones propias: consultarAPI, crearTarjeta, mostrarPokemones, cargarPokemones, filtrarPokemones. El buscador filtra únicamente los registros cargados. Los tipos se muestran con sus nombres originales en inglés.

Verificación realizada: sintaxis JavaScript con node --check. Pendiente probar la consulta real y presentación en navegador, publicar en GitHub y practicar la defensa.

document.addEventListener('DOMContentLoaded', function () {
  const listaProductos = document.getElementById('listaProductos');
  const listaImagenes = document.getElementById('listaImagenes');
  const imagenProducto = document.getElementById('imagen');
  // Realiza una solicitud a la API para obtener la lista de productos
  fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(productos => {
      // Muestra la lista de productos
      console.log(productos)
      productos.forEach(nombreProducto => {
        const li = document.createElement('li');
        li.textContent = nombreProducto;

        li.addEventListener('click', function () {
          // Al hacer clic en un producto, obtén la lista de imágenes para ese producto
          fetch(`http://localhost:3000/productos/${nombreProducto}`)
            .then(response => response.json())
            .then(imagenesProducto => {
              // Muestra la lista de imágenes
              listaImagenes.innerHTML = '';
              imagenesProducto.forEach(nombreImagen => {
                const liImagen = document.createElement('img');
                const rutaImagen = `public/images/${nombreProducto}/${nombreImagen}`;
                liImagen.src = rutaImagen;
                liImagen.style.width = "200px"
                liImagen.style.height = "200px"

                liImagen.addEventListener('click', function () {
                  const rutaImagen = `public/images/${nombreProducto}/${nombreImagen}`;
                  imagenProducto.src = rutaImagen;
                });

                listaImagenes.appendChild(liImagen);
              });
            })
            .catch(error => console.error('Error al obtener la lista de imágenes:', error));
        });

        listaProductos.appendChild(li);
      });
    })
    .catch(error => console.error('Error al obtener la lista de productos:', error));
});
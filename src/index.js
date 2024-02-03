

document.addEventListener('DOMContentLoaded', function () {
  const listaCategorias = document.getElementById('listaCategorias');
  const listaProductos = document.getElementById('listaProductos');

  const imagenProducto = document.getElementById('imagenProducto');

  fetch('http://localhost:3000/categorias')
    .then(response => response.json())
    .then(categorias => {
      categorias.forEach(categoria => {
        const li = document.createElement('li');
        li.textContent = categoria;
        li.addEventListener('click', function () {
          listaProductos.innerHTML = ""
          fetch(`http://localhost:3000/categorias/${categoria}`)
            .then(response => response.json())
            .then(productos => {
              productos.forEach(producto => {
                const liProducto = document.createElement('div');
                liProducto.id = producto.toLowerCase()

                const listaImagenesElement = document.createElement('div');
                listaImagenesElement.classList.add(`listaImagenes`)





                fetch(`http://localhost:3000/categorias/${categoria}/${producto}`)
                  .then(response => response.json())
                  .then(imagenes => {
                    imagenes.forEach(nombreImagen => {
                      const liImagen = document.createElement('img');
                      const rutaImagen = `public/images/${categoria}/${producto}/${nombreImagen}`;
                      liImagen.src = rutaImagen;
                      liImagen.classList.add('refImg')
                      liImagen.style.width = "100px";
                      liImagen.style.height = "100px";
                      listaImagenesElement.appendChild(liImagen)
                      liImagen.addEventListener('click', function () {
                        const contenedorProducto = document.getElementById(producto.toLowerCase())
                        const imagenProducto = contenedorProducto.querySelector('.imagenProducto')
                        // Al hacer clic en una imagen, muestra la imagen seleccionada
                        let rutaImagen = liImagen.src
                        imagenProducto.src = rutaImagen;
                        imagenProducto.style.width = "500px"
                        imagenProducto.style.width = "500px"

                      });
                    })
                    liProducto.appendChild(listaImagenesElement);


                    
                    // Crear el contenedor de la imagen del producto y la descripción
                    const imagenProductoElement = document.createElement('img');
                    imagenProductoElement.src = `/public/images/Portatiles/${producto}/${imagenes[0]}`
                    imagenProductoElement.classList.add(`imagenProducto`)
                    liProducto.appendChild(imagenProductoElement);

                    const descripcionProductoElement = document.createElement('div');
                    descripcionProductoElement.id = 'descripcionProducto';
                    descripcionProductoElement.innerHTML = `<h3>${producto}</h3>
                                                              <p>
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus tempore
                                                                soluta maxime velit. Cumque, similique. Reprehenderit, beatae porro
                                                                ducimus ex ea natus ab molestiae obcaecati unde eligendi dolore rerum
                                                                itaque.
                                                              </p>
                                                              <button class="obtener">Obtener</button>`;
                    liProducto.appendChild(descripcionProductoElement);
                  })





                liProducto.classList.add('containProduct')

                listaProductos.appendChild(liProducto);
              });
            })
            .catch(error => console.error('Error al obtener la lista de imágenes:', error));
        });

        listaCategorias.appendChild(li);
      });
    })
    .catch(error => console.error('Error al obtener la lista de productos:', error));
});
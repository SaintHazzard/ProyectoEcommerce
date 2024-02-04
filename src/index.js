

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
              document.getElementById('categoriaSeleccionada').textContent = categoria
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
                      liImagen.addEventListener('mouseover', function () {
                        const contenedorProducto = document.getElementById(producto.toLowerCase())
                        const imagenProducto = contenedorProducto.querySelector('.imagenProducto')
                        // Al hacer clic en una imagen, muestra la imagen seleccionada
                        let rutaImagen = liImagen.src
                        imagenProducto.src = rutaImagen;
                        // imagenProducto.style.width = "500px"
                        // imagenProducto.style.width = "500px"

                      });
                    })
                    liProducto.appendChild(listaImagenesElement);



                    // Crear el contenedor de la imagen del producto y la descripción
                    const contImagen = document.createElement('div')
                    contImagen.classList.add(`contenedorImagen`)
                    const imagenProductoElement = document.createElement('img');

                    imagenProductoElement.src = `/public/images/${categoria}/${producto}/${imagenes[0]}`
                    imagenProductoElement.classList.add(`imagenProducto`)
                    contImagen.appendChild(imagenProductoElement)
                    liProducto.appendChild(contImagen);

                    const descripcionProductoElement = document.createElement('div');
                    descripcionProductoElement.classList.add('descripcionProducto');
                    descripcionProductoElement.innerHTML = `<h3>${producto}</h3>
                                                              <p>
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus tempore
                                                                soluta maxime velit. Cumque, similique. Reprehenderit, beatae porro
                                                                ducimus ex ea natus ab molestiae obcaecati unde eligendi dolore rerum
                                                                itaque.
                                                              </p>
                                                              <h3>$ 100.000</h3>
                                                              <button class="obtener agregar">Obtener</button>`;
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
      document.querySelector('#listaCategorias li:first-child').click();
    })

    .catch(error => console.error('Error al obtener la lista de productos:', error));
});



document.addEventListener('DOMContentLoaded', function () {
  const listaProductos = document.getElementById('listaProductos');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeBtn');
  const modalContent = document.getElementById('modalContent');

  listaProductos.addEventListener('click', function (event) {
    const target = event.target;

    // Verifica si el clic fue en un botón de obtener
    if (target.classList.contains('obtener')) {
      // Obtén el contenido relacionado con el producto
      const producto = target.closest('.containProduct');

      const imagenProducto = producto.querySelector(".contenedorImagen")
      const descripcionProducto = producto.querySelector('.descripcionProducto');

      const ventanaEmergente = document.getElementById('modalContent');
      ventanaEmergente.innerHTML = '';  // Limpiar el contenido existente
      ventanaEmergente.appendChild(imagenProducto.cloneNode(true));
      ventanaEmergente.appendChild(descripcionProducto.cloneNode(true));
      // Crear elementos de entrada y botón
      ventanaEmergente.querySelector(`.obtener`).style.display = 'none'

      const contenedorAgregar = document.createElement('div')
      contenedorAgregar.classList.add('containAgregar')
      const inputText = document.createElement('input');
      inputText.setAttribute('type', 'text');

      const buttonAgregar = document.createElement('button');
      buttonAgregar.textContent = `Agregar`
      buttonAgregar.classList.add('agregar');
      contenedorAgregar.appendChild(inputText);
      contenedorAgregar.appendChild(buttonAgregar);
      ventanaEmergente.appendChild(contenedorAgregar)
      // Muestra la ventana emergente con el contenido del producto
      modal.style.display = 'block';
    }
  });

  closeBtn.addEventListener('click', function () {
    // Cierra la ventana emergente al hacer clic en el botón de cerrar
    modal.style.display = 'none';
  });
});


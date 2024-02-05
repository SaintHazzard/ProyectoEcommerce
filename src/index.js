

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
                                                                    <div class="estrellas">
                                                                      <i class="bx bxs-star"></i>
                                                                      <i class="bx bxs-star"></i>
                                                                      <i class="bx bxs-star"></i>
                                                                      <i class="bx bxs-star"></i>
                                                                      <i class="bx bxs-star"></i>
                                                                    </div>
                                                              <p>
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus tempore
                                                                soluta maxime velit. Cumque, similique. Reprehenderit, beatae porro
                                                                ducimus ex ea natus ab molestiae obcaecati unde eligendi dolore rerum
                                                                itaque.
                                                              </p>
                                                              <h3 class="precio">$ ${Math.floor(Math.random() * (400 - 100) + 100)} USD</h3>
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
  const mainModal = document.getElementsByClassName('modal-content');

  listaProductos.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('obtener')) {
      const producto = target.closest('.containProduct');

      const imagenProducto = producto.querySelector(".contenedorImagen")
      const descripcionProducto = producto.querySelector('.descripcionProducto');

      const ventanaEmergente = document.getElementById('modalContent');
      ventanaEmergente.innerHTML = '';  // Limpiar el contenido existente
      ventanaEmergente.appendChild(imagenProducto.cloneNode(true));
      ventanaEmergente.appendChild(descripcionProducto.cloneNode(true));

      ventanaEmergente.querySelector(`.obtener`).style.display = 'none'

      const contenedorAgregar = document.createElement('div')
      contenedorAgregar.classList.add('containAgregar')
      const inputText = document.createElement('input');
      inputText.setAttribute('type', 'text');
      inputText.classList.add('cantidad')

      const buttonAgregar = document.createElement('button');
      buttonAgregar.textContent = `Agregar`
      buttonAgregar.classList.add('agregar');
      contenedorAgregar.appendChild(inputText);
      contenedorAgregar.appendChild(buttonAgregar);
      ventanaEmergente.appendChild(contenedorAgregar)
      modal.style.display = 'block';
    }
    window.addEventListener('click', function (event) {
      let header = document.querySelector('.header')
      if (modal.style.display === 'block' && header.contains(event.target)) {
        modal.style.display = 'none';
      }
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    })
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});



let botonMovil = document.getElementById('botonMovil')
let listaCategorias = document.getElementById('listaCategorias')
botonMovil.addEventListener('click', function () {
  listaCategorias.classList.toggle('active')
})

listaCategorias.addEventListener('click', function (event) {
  const target = event.target;
  if (target.tagName === 'LI' && listaCategorias.classList.contains('active')) {
    listaCategorias.classList.toggle('active')
  }

});



document.addEventListener("DOMContentLoaded", function () {
  let botonCarrito = document.getElementById('carrito')
  let modalCarrito = document.getElementById('modalCarrito')
  let botonAgregar = document.querySelector('.agregar')
  let modalContent = document.getElementsByClassName('containAgregar')
  const modal = document.getElementById('modal');
  let modalProducto = document.getElementById('modalContent')

  modalProducto.addEventListener("click", function (event) {
    let target = event.target
    if (target.classList.contains('agregar')) {
      let fotoProducto = modalProducto.querySelector(".contenedorImagen")
      let descripcionProducto = modalProducto.querySelector(".descripcionProducto")
      let estrellas = descripcionProducto.querySelector('.estrellas')
      let inputCantidad = modalProducto.querySelector('.cantidad')
      let parrafo = descripcionProducto.querySelector('p')
      let precio = Number(descripcionProducto.querySelector('.precio').textContent.match(/\d+/g))
      console.log(precio)
      parrafo.innerHTML = ''
      if (/^\d+$/.test(inputCantidad.value) && Number(inputCantidad.value) > 0) {
        console.log('entra')
        parrafo.innerHTML = `Cantidad: ${inputCantidad.value}`
        descripcionProducto.querySelector(".precio").innerHTML = `${inputCantidad.value * precio}`
      } else {
        parrafo.innerHTML = `Cantidad: ${1}`
      }

      descripcionProducto.removeChild(estrellas)
      // descripcionProducto.removeChild(parrafo)
      let carritoCard = document.createElement('div')
      carritoCard.classList.add('cardCarrito')

      let contenidoCarrito = modalCarrito.querySelector('#modalContent')

      carritoCard.appendChild(fotoProducto.cloneNode(true))
      // descripcionProducto.removeChild(descripcionProducto.querySelector('.precio'))
      carritoCard.appendChild(descripcionProducto.cloneNode(true))
      carritoCard.insertAdjacentHTML("beforeend", "<i id='eliminarProdcto' class='bx bxs-trash-alt' ></i>")
      // carritoCard.appendChild(parrafo)
      // carritoCard.insertAdjacentHTML('beforeend', `<p class='unitario'>Precio unitario : ${descripcionProducto.querySelector(".precio").textContent.match(/\d+/g)}</p>`)
      contenidoCarrito.appendChild(carritoCard)
      modal.style.display = 'none'


      let valores = contenidoCarrito.querySelectorAll('.precio')
      let sumTotal = 0

      valores.forEach(num => {
        // let nCantidad = Number(num.closest('p').textContent.match(/\d+/g).join('')) 
        // console.log(nCantidad)
        let contenidoh3 = num.textContent

        let extraido = contenidoh3.match(/\d+/g)
        num.innerHTML = extraido + " USD"
        sumTotal += Number(extraido)
      })

      let totalizado = document.querySelector('.totalizado')
      totalizado.innerHTML = `$ ${sumTotal} USD`
    }

  })

  let btnObtener = document.querySelector(".obtener")
  // console.log(btnObtener)
  // botonAgregar = modalContent.querySelector('agregar')

  botonCarrito.addEventListener("click", function () {
    modalCarrito.classList.toggle('active2');
  })

  closeBtn = modalCarrito.querySelector('.close-btn')
  const target = event.target;


  closeBtn.addEventListener('click', function () {
    modalCarrito.classList.toggle('active2');
  }); 
})



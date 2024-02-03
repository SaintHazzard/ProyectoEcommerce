const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});



const carpetaImagenes = path.join(__dirname, 'public/images');
const categorias = fs.readdirSync(carpetaImagenes);

app.get('/categorias', (req, res) => {
  res.json(categorias);
});

app.get('/categorias/:categoria', (req, res) => {
  const nombreCategoria = req.params.categoria;
  const rutaCarpetaCategoria = path.join(carpetaImagenes, nombreCategoria);
  const productos = fs.readdirSync(rutaCarpetaCategoria);
  res.json(productos);
});


app.get('/categorias/:categoria/:producto', (req, res) => {
  const nombreCategoria = req.params.categoria;
  const nombreProducto = req.params.producto;

  const rutaCarpetaProducto = path.join(carpetaImagenes, nombreCategoria, nombreProducto);
  const imagenes = fs.readdirSync(rutaCarpetaProducto);

  res.json(imagenes)
})


app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});



















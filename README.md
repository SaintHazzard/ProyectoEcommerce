
# Proyecto E-commerce campus land

Proyecto de un ecommerce para software skills campusland




## Ejecucion

Es necesario iniciar el servidor utilizando nodeJs

```bash
  cd ProyectoEcommerce
  node app.js
  
```
    
## API Reference

#### Get all items

```http
  GET /categorias
```

#### Get item

```http
  GET /categorias/${producto}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id item for generate product card |

#### fetch(/categorias/:categoria)

Toma el contenido de la carpeta que son imagenes para utilizarlas en el html

## Authors

- [@SaintHazzard](https://github.com/SaintHazzard)


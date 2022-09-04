# NodeJS && Express

## Requerimientos

```
NodeJS v16.15.0
```
Nota*:  npm install nodemon --global (Para trabajar en modo desarrollo)

## Ejecucion
```
npm run dev
```

## Servicios
### Listar todos los productos
```
URL     : /api/v1/products
METHOD  : GET
PARAMS  : None
RESPONSE:
{
    "status": "success",
    "timeOfRequest": "2022-09-03T05:15:53.781Z",
    "results": 3,
    "data": {
        "products": [
            {
                "id": 1,
                "name": "product 1",
                "price": 10.5,
                "category": "cat1"
            },
            {
                "id": 2,
                "name": "product 2",
                "price": 20.5,
                "category": "cat1"
            },
            {
                "id": 3,
                "name": "product 3",
                "price": 30.5,
                "category": "cat1"
            }
        ]
    }
}
```

### Listar un producto
```
URL     : /api/v1/products/:id
METHOD  : GET
PARAMS  : id
RESPONSE:
{
    "status": "success",
    "data": {
        "product": {
            "id": 1,
            "name": "product 1",
            "price": 10.5,
            "category": "cat1"
        }
    }
}
```

### Adicionar un producto
```
URL     : /api/v1/products
METHOD  : POST
PARAMS  : None
BODY    : 
{
    "id": 4,
    "name": "product 4",
    "price": 10.5,
    "category": "cat1"
}

RESPONSE:
{
    "status": "success",
    "message": "Producto adicionado satisfactoriamente",
    "data": {
        "products": [
            {
                "id": 1,
                "name": "product 1",
                "price": 10.5,
                "category": "cat1"
            },
            {
                "id": 2,
                "name": "product 2",
                "price": 20.5,
                "category": "cat1"
            },
            {
                "id": 3,
                "name": "product 3",
                "price": 30.5,
                "category": "cat1"
            },
            {
                "id": 4,
                "name": "product 4",
                "price": 10.5,
                "category": "cat1"
            }
        ]
    }
}
```

### Editar un producto
```
URL     : /api/v1/products/:id
METHOD  : PUT
PARAMS  : id
BODY    :
{
    "id": 2,
    "name": "product 2 editado",
    "price": 12.6,
    "category": "cat2"
}
RESPONSE:
{
    "status": "success",
    "message": "Producto actualizado satisfactoriamente",
    "data": {
        "products": [
            {
                "id": 1,
                "name": "product 1",
                "price": 10.5,
                "category": "cat1"
            },
            {
                "id": 2,
                "name": "product 2 editado",
                "price": 12.6,
                "category": "cat2"
            },
            {
                "id": 3,
                "name": "product 3",
                "price": 30.5,
                "category": "cat1"
            },
            {
                "id": 4,
                "name": "product 4",
                "price": 10.5,
                "category": "cat1"
            }
        ]
    }
}
```

### Eliminar un producto
```
URL     : /api/v1/products/:id
METHOD  : DELETE
PARAMS  : id
RESPONSE:
{
    "status": "success",
    "message": "Producto eliminado satisfactoriamente",
    "data": {
        "id": 3,
        "name": "product 3",
        "price": 30.5,
        "category": "cat1"
    }
}
```


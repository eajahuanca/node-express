# NodeJS && Express

## Requerimientos

```
NodeJS v16.15.0
```

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
PARAMS  : 
{
    "id": 4,
    "name": "product 4",
    "price": 10.5,
    "category": "cat1"
}

RESPONSE:
{
    "status": "success",
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



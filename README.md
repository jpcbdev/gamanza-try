# Veterinaria Nest.JS API

## End Points

### /veterinary

> GET **Busquedas con y sin parameto**

- http://localhost:3000/veterinary
- http://localhost:3000/veterinary/:name

> POST

- http://localhost:3000/veterinary

**Body example**
`{ "name":"Carlos", "surnames":"Mora", "specialty": "Vacuno", "phone":"495029102" }`

> PUT **Necesario indicar el parametro id**

- http://localhost:3000/veterinary/:id

**Body example**
`{ "name":"Actualizado", "surnames":"Actualizado", "specialty": "Actualizado", "phone":"Actualizado" }`

> DELETE **Necesario indicar el parametro id**

- http://localhost:3000/veterinary/:id

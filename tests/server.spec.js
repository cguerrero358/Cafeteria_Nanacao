const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {


// Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
// es un arreglo con por lo menos 1 objeto

    test("debería devolver un status 200 y un arreglo con al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);  
        expect(Array.isArray(response.body)).toBe(true);  
        expect(response.body.length).toBeGreaterThan(0);  
    });


//  Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe

    test("debería devolver un status 404 al intentar eliminar un café con un id que no existe", async () => {
        const response = await request(server).delete("/cafes/999");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "No se encontró ningún cafe con ese id" });  
    }); 


//  Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201

    test("debería devolver un status 201 al agregar un nuevo Café", async () => {
        const cafe = { id: 1, nombre: "Irlandes"};
        const response = await request(server).post("/cafes").send(cafe);
        expect(response.status).toBe(201);
    }) 

// Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
//café enviando un id en los parámetros que sea diferente al id dentro del payload

    test("debería devolver un status 400 si intentas actualizar un Café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const cafe = { id: 6, nombre: "Expresso"};
        const response = await request(server).put("/cafes/2").send(cafe);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "El id del café enviado en los parámetros no coincide con el id dentro del payload",
        });  
    })

});

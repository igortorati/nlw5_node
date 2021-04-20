import express from "express";

import "./database";

import {routes} from "./routes";

const app = express();

app.use(express.json()); // Define que o quer virá é um json

app.use(routes);



app.listen(3333, () => console.log("Server running on port 3333."));



/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração (update)
 * DELETE = Deletar
 * PATCH = Alterar uma info específica (um campo único por exemplo)
 */

// metodo get, rota: "/",parametros request e response, mensagem enviada "Olá NLW 05"
/**app.get("/", (request, response) => {
    return response.send("Olá NLW 05");
});*/

// metodo get, rota: "/",parametros request e response, enviando json com atributo message contando "Olá NLW 05"
/*app.get("/", (request, response) => {
    return response.json({
        message: "Olá NLW 05"
    });
});*/

// metodo post, rota: "/", parametros request e response, enviando json com atributo message contando "Usuário salvo com sucesso!"
/*app.post("/", (request, response) => {
    return response.json({
        message: "Usuário salvo com sucesso!"
    });
});*/
// Posso utilizar a mesma rota pois o método é diferente, um é get e o outro é post

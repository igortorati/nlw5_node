import express from "express";

const app = express();


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
app.get("/", (request, response) => {
    return response.json({
        message: "Olá NLW 05"
    });
});

// metodo post, rota: "/", parametros request e response, enviando json com atributo message contando "Usuário salvo com sucesso!"
app.post("/", (request, response) => {
    return response.json({
        message: "Usuário salvo com sucesso!"
    });
});
// Posso utilizar a mesma rota pois o método é diferente, um é get e o outro é post

app.listen(3333, () => console.log("Server running on port 3333."));

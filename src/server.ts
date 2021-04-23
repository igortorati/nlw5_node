import { http } from "./http";
import "./websocket/client"; // importa funcionalidades do cliente
import "./websocket/admin"; // importa funcionalidades do admin (claro, em
// um sistema real, existiria login para isso)

http.listen(3333, () => console.log("Server running on port 3333."));



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

import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path"; // Modulo do node que permite construir caminhos de arquivos para a aplicação

import "./database";

import {routes} from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public")); // informo onde estão as views
app.engine("html", require("ejs").renderFile); // informo que a engine será a padrão (ejs), porém, os
// arquivos serão salvos como html (https://stackoverflow.com/a/38025343/7148436)
app.set("view engine", "html");

app.get("/pages/client", (request, response) => { // Defino para rendenizar a página client.html quando
    // o usuário acessar /pages/client
    return response.render("html/client.html");
})

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando o protocolo websocket

io.on("connection", (socket: Socket) => { // quando usuário se conecta
    console.log("Se conectou", socket.id);
});

app.use(express.json()); // Define que o quer virá é um json

app.use(routes);



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

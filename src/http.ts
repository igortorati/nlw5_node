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
app.get("/pages/admin", (request, response) => { // Defino para rendenizar a página client.html quando
    // o usuário acessar /pages/client
    return response.render("html/admin.html");
})

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando o protocolo websocket

io.on("connection", (socket: Socket) => { // quando usuário se conecta
    console.log(socket.id, " se conectou.");
});

app.use(express.json()); // Define que o quer virá é um json

app.use(routes);

export { http, io };
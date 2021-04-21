import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
// Criando rota para criar users
const usersController = new UsersController();
const messagesController = new MessagesController()

routes.post("/settings", settingsController.create);
// Adicionando a rota de criação de users
routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);

// Recebe um parametro id pelo método GET
routes.get("/messages/:id", messagesController.showByUser);

export { routes }
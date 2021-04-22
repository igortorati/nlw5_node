import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsService } from "../services/SettingsService";

class SettingsController {

    async create(request: Request, response: Response){
        const {chat, username} = request.body;
        
        const settingsService = new SettingsService();
        // Tratando o erro emitido caso o usuário já exista
        try {
            const settings = await settingsService.create({ chat, username });
            return response.json(settings);
        } catch(err) {
            return response.status(400).json({
                message: err.message,
            }); // Os códigos de erro, no cado como
            // é dentro da aplicação, iremos utilizar o erro 400.
        }
        
        
    }

    // Recuperando o status do chat
    async findByUsername(request: Request, response: Response) {
        const { username } = request.params;
        const settingsService = new SettingsService();
        const settings = await settingsService.findByUsername(username);

        return response.json(settings);

    }

    // Atualizando o status do chat
    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;
        const settingsService = new SettingsService();
        const settings = await settingsService.update(username, chat);

        return response.json(settings);

    }
}

export { SettingsController }

// Responsável por pegar informações das rotas,
// deixando as rotas mais organizadas, sem muito código.
// Simplesmente pega todos os dados da rota e entrega apenas
// os necessários para o serviço.
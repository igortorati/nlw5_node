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
}

export { SettingsController }

// Responsável por pegar informações das rotas,
// deixando as rotas mais organizadas, sem muito código.
// Simplesmente pega todos os dados da rota e entrega apenas
// os necessários para o serviço.
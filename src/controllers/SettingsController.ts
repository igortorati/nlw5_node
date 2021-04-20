import {Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "../repositories/SettingsRepository";

class SettingController {

    async create(request: Request, response: Response){
        const {chat, username} = request.body;
        const settingsRepository = getCustomRepository(SettingsRepository)

        const settings = settingsRepository.create({
            chat,
            username
        })

        await settingsRepository.save(settings);

        return response.json(settings);
    }
}

export {SettingController}

// Responsável por pegar informações das rotas e o repositório,
// deixando as rotas mais organizadas, sem muito código.
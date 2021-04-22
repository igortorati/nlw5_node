import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: SettingsRepository;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username } : ISettingsCreate) {
        // Verifica se já não existe uma setting com o conteúdo de username.
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        });

        // Emite erro caso usuário já exista. Passa o erro para a camada que
        // chamou o service.
        if (userAlreadyExists) {
            throw new Error("User already exists."); 
        }

        const setting = this.settingsRepository.create({
            chat,
            username,
        });

        await this.settingsRepository.save(setting);

        return setting;
    }

    // Recuperando o status do chat
    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username,
        });
        return settings;
    }

    // Atualizando o status do chat
    async update(username: string, chat: boolean) {
        const settings = await this.settingsRepository.createQueryBuilder()
        .update(Setting)
        .set({ chat })
        .where("username = :username", {
            username
        })
        .execute();
    }
}

export { SettingsService };

// Recebe os dados da camada de controle e é responsável por
// aplicar as regras de negócio sobre os dados.
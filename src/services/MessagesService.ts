import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: MessagesRepository;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {
            const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        await this.messagesRepository.save(message);
        return message;
    }

    // Recuperando mensagens de um usuário
    async listByUser(user_id: string) {

        // Busca mensagens por id do usuário e também retorna o atributo user da
        // entidade User
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"],
        });

        return list;
    }
}

export { MessagesService };
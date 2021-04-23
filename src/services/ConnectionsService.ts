import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    user_id: string;
    admin_id?: string;
    id?: string;
    socket_id: string;
}

class ConnectionsService{
    private connectionsRepository: ConnectionsRepository;

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ user_id, admin_id, id, socket_id }: IConnectionCreate){
        const connection = this.connectionsRepository.create({
            user_id,
            socket_id,
            admin_id,
            id,
        });

        await this.connectionsRepository.save(connection);
    }

    async findByUserId(user_id: string) {
        const connection = this.connectionsRepository.findOne({
            user_id,
        });

        return connection;
    }

    // Recupero usuários não atendidos
    async findAllWithoutAdmin() {
        const connections = this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"],
        });

        return connections;
    }

    // Recupera socket_id a partir do user_id
    async findBySocketId(socket_id: string) {
        const connection = this.connectionsRepository.findOne({
            socket_id,
        });
        return connection;
    }

    // Atualiza a conexão, usuário ja foi/está sendo atendido
    async updateAdminId(user_id: string, admin_id: string) {
        await this.connectionsRepository
          .createQueryBuilder()
          .update(Connection)
          .set({ admin_id })
          .where('user_id = :user_id', {
            user_id,
          })
          .execute();
      }
}

export { ConnectionsService };
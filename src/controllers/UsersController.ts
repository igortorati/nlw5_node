// Importar request/response do express
import { Request, Response } from "express";
// Importar Repositório e getCustomRepository
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
// Importar Serviço
import { UsersService } from "../services/UsersService";

// Criar Classe de controle
class UsersController{
    // Criar metodo create assíncrono
    async create(request : Request, response : Response): Promise<Response> {
        // Desconstruir o corpo do request para obter as informações desejadas
        const {email} = request.body;

        // Criar serviço
        const usersService = new UsersService();

        // Tentar criar usuário e retornar resposta
        try {
            const user = await usersService.create(email);
            return response.json(user);
        // Tratar erro caso não seja possível criar o uruário
        } catch(err) {
            return response.json({
                message: err.message,
            });
        }
    }
}
// Exportar classe
export { UsersController };
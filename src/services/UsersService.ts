// importar
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
import { UsersRepository } from "../repositories/UsersRepository";

// criar interface
interface IUsersCreate {
    email: string;
}

// criar classe de serviço
class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async create({ email } : IUsersCreate) {
        // no metodo create verificar se usuário existe, se existir emite erro
        const userAlreadyExists = await this.usersRepository.findOne({
            email
        }); 
        if (userAlreadyExists) {
            return userAlreadyExists;
        }

        // no metodo create criar usuário com campos passados pelo controller
        const user = this.usersRepository.create({
            email,
        });

        

        // no metodo create salvar usuário e aguardar que o banco faça isso
        await this.usersRepository.save(user)

        // no metodo create retornar 
        return user;
    }
}

// exportar classe
export { UsersService };
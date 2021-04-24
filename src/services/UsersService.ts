// importar
import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

// criar interface
interface IUsersCreate {
    email: string;
}

// criar classe de serviço
class UsersService {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
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

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        return user;
    }
}

// exportar classe
export { UsersService };
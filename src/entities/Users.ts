import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn
} from "typeorm";

import { v4 as uuid } from "uuid"; // Importa uuid e renomeia de v4 para uuid

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) { // Caso usuário não tenha id, gera um uuid,
            // caso ele possua um id é um dado que está sendo alterado
            this.id = uuid();
        }
    }
}

export {User};
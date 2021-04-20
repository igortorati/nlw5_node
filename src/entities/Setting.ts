import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("settings")
class Setting {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;
    
    @Column()
    chat: boolean;
    
    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) { // Se não estiver vazio quer dizer que estamos alterando
            // alguma entrada do banco, então não devemos gerar outro id
            this.id = uuid();
        }
    }
}

export {
    Setting
}

// Entidade de Settings, ja linkado com a tabela do banco utilizando o ORM
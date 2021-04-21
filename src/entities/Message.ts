import {
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./Users";

@Entity("messages")
class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @JoinColumn({name:"user_id"}) // Fará Join com o user_id
    @ManyToOne(() => User) // Many messages to One user
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export {Message};
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Player } from "./player";


@Entity()
export class TwinoidUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string = "";

    @Column()
    password: string = "";

    @OneToOne(() => Player, (player) => player.user)
    player: Player;
}

// const propertiesOf = <TObj>(_obj: (TObj | undefined) = undefined) => <T extends keyof TObj>(name: T): T => name;

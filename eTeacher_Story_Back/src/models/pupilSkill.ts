import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class PupilSkill{
    @PrimaryColumn()
    name: string;

    @Column({ default: 1 })
    damage: number;
}
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Pupil } from "./pupil";

@Entity()
export class PupilSkill{
    @PrimaryColumn()
    name: string;

    @Column({ default: 0 })
    missedPercentage: number;

    @Column({ default: 1 })
    damage: number;

    @ManyToMany(
        () => Pupil,
        (pupil) => pupil.skills
    )
    pupils: Pupil;
}
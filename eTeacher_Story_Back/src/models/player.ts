import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany, JoinTable} from "typeorm";
import { TwinoidUser } from "./twinoidUser";
import { Skill } from "./skill";
import { CourseRun } from "./courseRun";


@Entity()
export class Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 1 })
    grade: number;

    @Column({ default: 1 })
    level: number;

    @Column({ default: 0 })
    xp: number;

    @ManyToMany(() => Skill, (skill) => skill.players)
    @JoinTable({ name: "player_skills" })
    skillsId: Skill[];

    @Column({ default: 20 })
    Max_SC: number;

    @Column({ default: 20 })
    SC: number;

    @Column({ type: "int", array: true })
    HatsId: number[] = [];

    @Column({ type: "int", array: true })
    AssistantsId: number[] = [];

    @Column({ default: 0 })
    AssistantProgress: number;

    @Column({ default: 0 })
    MissionsAccomplished: number;

    @Column({ default: 1 })
    Rank: number;

    @Column({ type: "text" })
    Housing: any = {};

    @OneToOne(
        () => CourseRun,
        (courseRun) => courseRun.player,
        { nullable: true }
    )
    @JoinColumn()
    currentClass: CourseRun | null;

    @OneToOne(() => TwinoidUser, (user) => user.player)
    @JoinColumn()
    user: TwinoidUser;
}
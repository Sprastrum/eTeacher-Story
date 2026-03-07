import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, OneToOne } from "typeorm";
import { Player } from "./player";
import { Course } from "./course";
import { GameSession } from "./gameSession";

@Entity()
export class CourseRun {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(
        () => Player,
        (player) => player.currentClass
    )
    player: Player;

    @ManyToOne(
        () => Course,
        (course) => course.courseRun
    )
    course: Course;

    @OneToMany(
        () => GameSession,
        (gamesSession) => gamesSession.courseRun
    )
    gamesSession: GameSession[];

    @Column({ default: 1 })
    currentDay: number;

    @Column({ default: false })
    completed: boolean;

    @Column({ default: false })
    failed: boolean;
}

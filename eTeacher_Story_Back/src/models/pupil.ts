import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { Course } from "./course";
import { GamePupilState } from "./gamePupilState";
import { PupilBehavior } from "../domain/constants/pupil/pupilBehavior.constant";


@Entity()
export class Pupil {
 
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ default: "Null-Name" })
	name: string;

	@Column({ default: 0 })
	grade: number;

	@Column({ type: "int", array: true })
	appearance : number[] = [1,1,1,1,1];

	@Column({ type: 'varchar', default: 'DREAMER' })
	behavior: PupilBehavior;

	@ManyToOne(
		() => Course,
		(course) => course.pupils
	)
	course: Course;

	@OneToMany(
		() => GamePupilState,
		(gamePupilState) => gamePupilState.pupil
	)
	pupilStates: GamePupilState;
}

import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany} from "typeorm";
import { CourseRun } from "./courseRun";
import { GamePupilState } from "./gamePupilState";
import {MatrixValue} from "../domain/constants/pupil/pupilMatrixValue.constant";


@Entity()
export class GameSession {

	@PrimaryGeneratedColumn("uuid")
	id: string;
	
	@ManyToOne(
		() => CourseRun,
		(courseRun) => courseRun.gamesSession
	)
	courseRun: CourseRun;

	@OneToMany(
		() => GamePupilState,
		(state) => state.gameSession,
		{ cascade: true }
	)
	pupilsState: GamePupilState[];
	
	@Column({ default: 1 })
	dayNumber: number;
	
	@Column({ default: 1 })
	currentTurn: number;

	@Column({ default: false })
	finished: boolean;

	@Column({ type: 'jsonb', default: () => "'[]'" })
	matrix: MatrixValue[][];
}
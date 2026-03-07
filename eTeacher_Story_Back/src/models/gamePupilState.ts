import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { GameSession } from "./gameSession";
import { Pupil } from "./pupil";

@Entity()
export class GamePupilState{
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Pupil, (pupil) => pupil.pupilStates)
	pupil: Pupil;

	@Column()
	name: string;

	@Column()
	grade: number;
	
	@ManyToOne(() => GameSession,
		(session) => session.pupilsState,
		{ onDelete: "CASCADE" }
	)
	gameSession: GameSession;
	
	@Column()
	ignorancePoints: number;
	
	@Column()
	boredomPoints: number;

	@Column({ default: false })
	defeated: boolean;

	@Column()
	row: number;

	@Column()
	col: number;
}
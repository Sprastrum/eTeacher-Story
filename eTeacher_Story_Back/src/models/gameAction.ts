import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToMany} from "typeorm";
import { GameSession } from "./gameSession"
import { GamePupilState } from "./gamePupilState";
import { Player } from "./player"
import { Skill } from "./skill"

@Entity()
export class GameAction {
	@PrimaryGeneratedColumn()
	id: string;
	
	/*@ManyToOne(() => GameSession)
	session: GameSession;

	@OneToMany(() => GamePupilState)
	pupilsState: GamePupilState;
	
	@ManyToOne(() => Player)
	player: Player;
	
	@ManyToOne(() => Skill)
	skill: Skill;
	
	@Column()
	turn: number;
	
	@CreateDateColumn()
	createdAt: Date;*/
}
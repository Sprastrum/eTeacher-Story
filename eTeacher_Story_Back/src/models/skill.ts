import { Entity, PrimaryGeneratedColumn, ManyToMany, Column } from "typeorm";
import { Player } from "./player";
import { TargetEnum } from "../domain/enums/target.enum";


@Entity()
export class Skill {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ default: "" })
	name: string;

	@ManyToMany(() => Player, (player) => player.skillsId)
	players: Player[];
	
	@Column({ type: 'enum', enum: TargetEnum, default: TargetEnum.SINGLE })
	target: TargetEnum;
	
	@Column({ default: 0 })
	ignoranceDamage: number;
	
	@Column({ default: 0 })
	boredomDamage: number;

	@Column({ default: 0 })
	mixedDamage: number;
	
	@Column({ default: "" })
	description: string;
	
	@Column({ default: 1 })
	cooldownTurns: number;
}
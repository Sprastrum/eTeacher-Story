import { OneToMany, Column, Entity, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Pupil } from "./pupil";
import { CourseRun } from "./courseRun";


@Entity()
export class Course {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ default: "6A" })
	grade: string;

	@Column({ default: "Native" })
	subject: string;

	@Column({ default: 1 })
	difficulty: number;

	@Column({ default: 1 })
	deadline: number;

	@Column({ default: 20 })
	goal_mark: number;

	@Column({ default: -1 })
	goal_number: number;

	@Column({ default: 0 })
	reward: number = 0;

	@OneToMany(() => Pupil, (pupil) => pupil.course)
	pupils: Pupil[];

	@OneToMany(() => CourseRun, (courseRun) => courseRun.course)
	courseRun: CourseRun[];
}
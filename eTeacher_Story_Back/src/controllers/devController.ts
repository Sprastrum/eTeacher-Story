import { Pupil } from "../models/pupil";
import { Course } from "../models/course";
import { Player } from "../models/player";
import { TwinoidUser } from "../models/twinoidUser";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Skill } from "../models/skill";


export class DevController {
	static async seedPlayer(req: Request, res: Response) {
		try {
			const playerRepo = AppDataSource.getRepository(Player);
			const userRepo = AppDataSource.getRepository(TwinoidUser);

			const player = playerRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d003a"
			});

			await playerRepo.save(player);

			const user = userRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d003a",
				username: "test",
				password: "1234",
				player
			});

			await userRepo.save(user);

			res.status(201).json({
				playerID: player.id,
				userId: user.id
			});
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	static async seedCourses(req: Request, res: Response) {
		try {
			const courseRepo = AppDataSource.getRepository(Course);

			const course1 = courseRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d001a",
				grade: "Primero",
				subject: "Mátematicas"
			});

			await courseRepo.save(course1);

			const course2 = courseRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d002a",
				grade: "Segundo",
				subject: "Historia"
			});

			await courseRepo.save(course2);

			const course3 = courseRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d003a",
				grade: "Tercero",
				subject: "Idiomas"
			});

			await courseRepo.save(course3);

			res.status(201).json({
				classId1: course1.id,
				classId2: course2.id,
				classId3: course3.id
			});
		} catch (err: any) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	static async seedPupils(req: Request, res: Response) {
		try {
			const pupilRepo = AppDataSource.getRepository(Pupil);

			const pupil1 = pupilRepo.create({
				id: "1efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Test",
				grade: 5,
				behavior: 'JOVIAL',
			});

			await pupilRepo.save(pupil1);

			const pupil2 = pupilRepo.create({
				id: "2efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Student",
				grade: 10,
				behavior: 'DREAMER',
			});

			await pupilRepo.save(pupil2);

			const pupil3 = pupilRepo.create({
				id: "3efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Student",
				grade: 10,
				behavior: 'DREAMER',
			});

			await pupilRepo.save(pupil3);

			const pupil4 = pupilRepo.create({
				id: "4efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Student",
				grade: 10,
				behavior: 'DREAMER',
			});

			await pupilRepo.save(pupil4);

			const pupil5 = pupilRepo.create({
				id: "5efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Student",
				grade: 10,
				behavior: 'DREAMER',
			});

			await pupilRepo.save(pupil5);

			const pupil6 = pupilRepo.create({
				id: "6efcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Jhon Student",
				grade: 10,
				behavior: 'DREAMER',
			});

			await pupilRepo.save(pupil6);

			res.status(201).json({
				pupil1Id: pupil1.id,
				pupil2Id: pupil2.id,
				pupil3Id: pupil3.id,
				pupil4Id: pupil4.id,
				pupil5Id: pupil5.id,
				pupil6Id: pupil6.id,
			});
		} catch (err: any) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	static async seedSkill(req: Request, res: Response) {
		try {
			const skillRepo = AppDataSource.getRepository(Skill);

			const skill = skillRepo.create({
				id: "e6fcbd72-cf97-4cfe-9ea4-a849df6d003a",
				name: "Test Unique Target Skill",
				ignoranceDamage: 1,
				boredomDamage: 1,
				description: "Test Unique Target Skill",
			});

			await skillRepo.save(skill);

			res.status(201).json({
				skillId: skill.id
			});
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

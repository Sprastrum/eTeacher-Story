import { AppDataSource } from "../data-source";
import { Course } from "../models/course";
import { Pupil } from "../models/pupil";
import { In, Repository } from "typeorm";
import { CourseDto } from "../dto/course.dto";


export class CourseService {

	static async assignPupilToCourse(courseId: string, pupilsIds: string[]) {

		return AppDataSource.transaction(async (manager) => {
			const courseRepo = AppDataSource.getRepository(Course);
			const pupilRepo = AppDataSource.getRepository(Pupil);

			const course = await courseRepo.findOne({
				where: {
					id: courseId
				},
				relations: ["pupils"],
			});

			if(!course) {
				throw new Error('Course not found');
			}

			const pupils = await pupilRepo.find({
				where: {
					id: In(pupilsIds)
				},
			});

			if (pupils.length !== pupilsIds.length) {
				throw new Error('Some pupils were not found');
			}

			course.pupils.push(...pupils);

			return await courseRepo.save(course);
		});
	}

	static async getAvailableCoursesToPlayer() {
		const courseRepo = AppDataSource.getRepository(Course);

		const courses: CourseDto[] = await this.getRandomCourses(courseRepo);

		return courses.map(c => ({
			id: c.id,
			grade: c.grade,
			subject: c.subject,
			difficulty: c.difficulty,
			deadline: c.deadline,
			goal_mark: c.goal_mark,
			goal_number: c.goal_number,
			reward: c.reward,
			pupils: c.pupils.map(p => ({
				name: p.name,
				grade: p.grade,
				behavior: p.behavior,
			})),
		}));
	}

	static async getRandomCourses(courseRepo: Repository<Course>) {
		const randomIds = await courseRepo
			.createQueryBuilder('course')
			.select('course.id')
			.orderBy('RANDOM()')
			.take(2)
			.getMany();

		return await courseRepo
			.createQueryBuilder('course')
			.leftJoinAndSelect("course.pupils", "pupil")
			.whereInIds(randomIds.map(c => c.id))
			.getMany()
	}
}
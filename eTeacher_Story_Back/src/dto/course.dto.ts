export interface CourseDto {
    id: string;
    grade: string;
    subject: string;
    difficulty: number;
    deadline: number;
    goal_mark: number;
    goal_number: number;
    reward: number;
    pupils: PupilDto[];
}
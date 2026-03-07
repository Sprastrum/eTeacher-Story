import {CourseDto} from "./course.dto";
import {PlayerDto} from "./player.dto";
import {GameSessionDto} from "./gameSession.dto";

export interface CourseRunDto {
    id: string;
    player: PlayerDto;
    course: CourseDto;
    gameSession: GameSessionDto;
    currentDay: number;
    completed: boolean;
    failed: boolean;
}
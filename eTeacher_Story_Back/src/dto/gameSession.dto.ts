import {CourseRunDto} from "./courseRun.dto";
import {GamePupilStateDto} from "./gamePupilState.dto";


export interface GameSessionDto {
    id: string;
    courseRun: CourseRunDto;
    pupilsState: GamePupilStateDto[];
    dayNumber: number;
    currentTurn: number;
    finished: boolean;
}
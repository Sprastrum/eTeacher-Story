import {GameSessionDto} from "./gameSession.dto";
import {PupilDto} from "./pupil.dto";

export interface GamePupilStateDto {
    id: string;
    gameSession: GameSessionDto;
    pupil: PupilDto;
    ignorancePoints: number;
    boredomPoints: number;
    defeated: boolean;
    row: number;
    col: number;
}
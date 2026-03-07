import {CourseRunDto} from "./courseRun.dto";
import {SkillDto} from "./skill.dto";

export interface PlayerDto {
    id: string;
    grade: number;
    level: number;
    skillsId: SkillDto;
    Max_SC: number;
    SC: number;
    currentClass: CourseRunDto;
}
import { TargetTypeEnum } from "../../eTeacher_Story_Back/src/domain/enums/targetType.enum";

export interface SkillDto {
    name: string;
    target: TargetTypeEnum;
    ignoranceDamage: number;
    boredomDamage: number;
    mixedDamage: number;
    description: string;
    cooldownTurns: number;
}
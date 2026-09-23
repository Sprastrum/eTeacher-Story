import { AppDataSource } from "../data-source";
import { TargetEnum } from "../domain/enums/target.enum";
import { Skill } from "../models/skill";



export class SkillService {

    static async createSkill(skillName: string, target: TargetEnum, ignoranceDamage: number, boredomDamage: number,
                             mixedDamage: number, description: string, cooldownTurns: number, imagePath: string) {

        return AppDataSource.transaction(async (manager) => {

            const skillRepo = manager.getRepository(Skill);

            const skill = skillRepo.create({
                name: skillName,
                target: target,
                ignoranceDamage: ignoranceDamage,
                boredomDamage: boredomDamage,
                mixedDamage: mixedDamage,
                description: description,
                cooldownTurns: cooldownTurns,
                image: imagePath,
            });

            return await skillRepo.save(skill);
        });
    }
}
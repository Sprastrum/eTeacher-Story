import { Request, Response } from "express";
import { SkillService } from "../services/skill.service";


export class SkillController {

    static async addSkill(req: Request, res: Response) {
        try {
            const { name, target, ignoranceDamage, boredomDamage, mixedDamage, cooldownTurns,
                image, description } = req.body;

            const skill = await SkillService.createSkill(name, target, ignoranceDamage, boredomDamage,
                mixedDamage, description, cooldownTurns, image);

            return res.status(200).json(skill);
        } catch (error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }

}
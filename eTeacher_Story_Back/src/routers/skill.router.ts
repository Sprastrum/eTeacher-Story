import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { SkillController } from "../controllers/skill.controller";


export class SkillRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "SkillRoutes");
    }

    configureRoutes() {
        this.app.route(`/api/skill`).post(SkillController.addSkill)

        return this.app;
    }
}
import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { DevController } from "../controllers/devController";


export class DevRouter extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "DevRoutes");
	}

	configureRoutes() {
		this.app.route("/api/dev/seed-player").post(DevController.seedPlayer);
		this.app.route("/api/dev/seed-class").post(DevController.seedCourses);
		this.app.route("/api/dev/seed-pupil").post(DevController.seedPupils);
		this.app.route("/api/dev/seed-skill").post(DevController.seedSkill);
		return this.app;
	}
}

import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { CourseRunController } from "../controllers/courseRun.controller";


export class CourseRunRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "CourseRunRoutes");
    }

    configureRoutes() {
        this.app.route("/api/course-run").post(CourseRunController.create);
        this.app.route("/api/course-run").delete(CourseRunController.delete);
        this.app.route("/api/course-run/:playerId").get(CourseRunController.getActive);

        return this.app;
    }
}
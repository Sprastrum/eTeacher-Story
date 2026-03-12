import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { CourseController } from "../controllers/courseController";


export class CourseRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "CourseRoutes");
    }

    configureRoutes() {
        this.app.route("/api/dev/course/:courseId/assign-pupils").post(CourseController.assignPupils);
        this.app.route("/api/courses").get(CourseController.getCourses);
        return this.app;
    }
}
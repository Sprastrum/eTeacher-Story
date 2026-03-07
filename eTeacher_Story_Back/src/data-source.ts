import "reflect-metadata";
import { DataSource } from "typeorm";

import { Player } from "./models/player";
import { Course } from "./models/course";
import { Pupil } from "./models/pupil";
import { Skill } from "./models/skill";
import { TwinoidUser } from "./models/twinoidUser";
import { GameSession } from "./models/gameSession";
import { GamePupilState } from "./models/gamePupilState";
import { GameAction } from "./models/gameAction";
import { CourseRun } from "./models/courseRun";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    logging: false,

    entities: [
        Player,
        Course,
        Pupil,
        Skill,
        TwinoidUser,
        GameSession,
        GamePupilState,
        GameAction,
        CourseRun
    ],
});

import { GenerateClass } from "./classFactory";
import { Course } from "../models/course";
import { Random } from "./utils";

export class SetupService {
    async newMission(): Promise<Course[]> {
        let missionTable: Course[] = [];

        for (var i = 0; i < 3; i++) {
            GenerateClass(Random(0, 4)).then((mission) => {
                missionTable.push(mission);
            });
        }

        return missionTable;
    }
}

import assert = require('assert');
import { useSkill } from "../src/services/skillService";
import { Course } from "../src/models/course";
import { Pupil } from "../src/models/pupil";

let mockClass: Course = new Course({
    id: 1,
    pupils: [new Pupil({
        name: "Mark",
        hp: 6,
        shields: 1,
        debuff: [1,7,4]
    }),
        new Pupil({
            name: "Frank",
            hp: 6,
            shields: 0,
            debuff: []
        }),
        new Pupil({
            name: "Victor",
            hp: 6,
            shields: 4,
            debuff: [2]
        })    ]
})

describe("Test Skill 1", () => {
    let testClass: Course = useSkill("skill_01", mockClass, mockClass.pupils);
    it("Test less debuffs", () => {
        assert.ok(testClass.pupils[0].debuff.length == 2, "V�rifie si un d�buff a bien �t� retir� � Mark");
        assert.ok(testClass.pupils[2].debuff.length == 0, "V�rifie si un d�buff a bien �t� retir� � Victor");
    });

    
});

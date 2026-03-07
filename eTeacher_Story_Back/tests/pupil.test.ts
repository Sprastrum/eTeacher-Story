import { Pupil } from "../src/models/pupil";
import assert = require('assert');

describe("Pupil interactions", () => {
    let mock_pupil: Pupil = new Pupil({
        name: "Mark",
        mark: 15,
        hp: 2,
        state: "normal"
    })
    it("Test Defeat", () => {
        assert.ok(!mock_pupil.CheckDefeat(), "The pupil should not be defeated.");
    });

    it("Test Hit", () => {
        mock_pupil.hp = 0
        assert.ok(mock_pupil.CheckDefeat(), "The pupil should be defeated");
        assert.ok(!mock_pupil.CheckDefeat(), "Since it's the second time, the student is already defeated and it should return false");
    });
});

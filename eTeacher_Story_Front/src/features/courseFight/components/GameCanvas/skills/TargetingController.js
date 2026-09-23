const NO_TARGET_TYPES = new Set(["ALL", "RANDOM", "SELF"]);

export class TargetingController {
    constructor(scene, { pupilRenderer, skillBar, onAction } = {}) {
        this.scene = scene;
        this.pupilRenderer = pupilRenderer;
        this.skillBar = skillBar;
        this.onAction = onAction;
        this.selectedSkill = null;
        this.pupils = [];
    }

    setPupils(pupils = []) {
        this.pupils = pupils;
        if (this.selectedSkill) {
            this.pupilRenderer.setTargetableHighlight(pupils.map((p) => p.id));
        }
    }

    handleSkillClick(skill) {
        if (this.selectedSkill?.name === skill.name) {
            this.cancel();
            return;
        }

        this.selectedSkill = skill;

        if (NO_TARGET_TYPES.has(skill.target)) {
            this._emit(null);
            return;
        }

        this.pupilRenderer.setTargetableHighlight(this.pupils.map((p) => p.id));
        this.skillBar.setSelected(skill.name);
    }

    handlePupilClick(pupil) {
        if (!this.selectedSkill) return;
        this._emit(pupil);
    }

    cancel() {
        this.selectedSkill = null;
        this.pupilRenderer.clearHighlight();
        this.skillBar.setSelected(null);
    }

    _emit(pupil) {
        const skill = this.selectedSkill;

        this.onAction?.({
            action: "skill",
            skillName: skill.name,
            targetRow: pupil?.row ?? -1,
            targetCol: pupil?.col ?? -1,
        });

        this.cancel();
    }
}

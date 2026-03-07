

const difficultyImages = import.meta.glob(
    "../assets/courseImg/difficulty/*.png",
    { eager: true }
);

const DIFFICULTY_ICONS = {};

for (const path in difficultyImages) {
    const key = path.split("/").pop().replace(".png", "");
    DIFFICULTY_ICONS[key] = difficultyImages[path].default;
}

export const DIFFICULTY_LEVELS = {
    1: { icon: DIFFICULTY_ICONS["diff1"] },
    2: { icon: DIFFICULTY_ICONS["diff2"] },
    3: { icon: DIFFICULTY_ICONS["diff3"] },
    4: { icon: DIFFICULTY_ICONS["diff4"] },
    5: { icon: '😈😈😈😈😈' }
};
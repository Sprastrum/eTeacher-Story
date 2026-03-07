

const levelImages = import.meta.glob(
    "../assets/playerImg/grades/*.png",
    { eager: true }
);

const LEVEL_ICONS = {};

for (const path in levelImages) {
    const key = path.split("/").pop().replace(".png", "");
    LEVEL_ICONS[key] = levelImages[path].default;
}

export const PLAYER_LEVELS = {
    1: { icon: LEVEL_ICONS["grade1"] },
    2: { icon: LEVEL_ICONS["grade2"] },
    3: { icon: LEVEL_ICONS["grade3"] },
    4: { icon: LEVEL_ICONS["grade4"] },
    5: { icon: LEVEL_ICONS["grade5"] },
    6: { icon: LEVEL_ICONS["grade6"] },
    7: { icon: LEVEL_ICONS["grade7"] },
    8: { icon: LEVEL_ICONS["grade8"] },
    9: { icon: LEVEL_ICONS["grade9"] },
};
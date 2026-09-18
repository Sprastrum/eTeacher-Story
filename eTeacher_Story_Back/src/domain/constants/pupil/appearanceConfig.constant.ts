export const GENDER = {
    MALE: 0,
    FEMALE: 1,
} as const

export const HAIR_COLORS = [
    0xffffff, // blanco
    0x000000, // negro
    0x8B4513, // castaño
    0xFFD700, // rubio
    0xFF4500, // pelirrojo
    0x808080, // gris
] as const;

export const SHIRT_COLORS = [
    0xffffff,
    0xff0000,
    0x0000ff,
    0x00ff00,
    0xffff00,
    0xff69b4,
    0x800080,
    0xff8c00,
] as const;

export const PANTS_COLORS = [
    0x000080, // azul marino
    0x000000, // negro
    0x808080, // gris
    0x8B4513, // castaño
    0x006400, // verde oscuro
] as const;

export interface AppearanceConfig {
    gender: number;       // appearance[0]
    head: number;         // appearance[1]
    hair: number;         // appearance[2]
    hairColor: number;    // appearance[3]
    shirt: number;        // appearance[4]
    shirtColor: number;   // appearance[5]
    pants: number;        // appearance[6]
    pantsColor: number;   // appearance[7]
    eyes: number;         // appearance[8]
}

export function parseAppearance(appearance: number[]): AppearanceConfig {
    return {
        gender:     appearance[0] ?? 0,
        head:       appearance[1] ?? 0,
        hair:       appearance[2] ?? 0,
        hairColor:  appearance[3] ?? 0,
        shirt:      appearance[4] ?? 0,
        shirtColor: appearance[5] ?? 0,
        pants:      appearance[6] ?? 0,
        pantsColor: appearance[7] ?? 0,
        eyes:       appearance[8] ?? 0,
    };
}

export function resolveHairFrame(gender: number, hairIndex: number): number {
    return gender === GENDER.FEMALE ? 15 + hairIndex : hairIndex;
}

export function resolveShirtFrame(gender: number, shirtIndex: number): number {
    return gender === GENDER.FEMALE ? 12 + shirtIndex : shirtIndex;
}

export function resolvePantsFrame(gender: number, pantsIndex: number): number {
    return gender === GENDER.FEMALE ? 5 + pantsIndex : pantsIndex;
}
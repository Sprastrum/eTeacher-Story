export const PUPIL_BEHAVIOR = {
    DREAMER: {
        ignorance: { minPoints: 3, maxPoints: 6 },
        boredom: { minPoints: 2, maxPoints: 6 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    JOVIAL: {
        ignorance: { minPoints: 2, maxPoints: 4 },
        boredom: { minPoints: 2, maxPoints: 3 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    CLEVER: {
        ignorance: { minPoints: 2, maxPoints: 4 },
        boredom: { minPoints: 2, maxPoints: 3 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    SHY: {
        ignorance: { minPoints: 2, maxPoints: 4 },
        boredom: { minPoints: 2, maxPoints: 3 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    CLOWN: {
        ignorance: { minPoints: 2, maxPoints: 4 },
        boredom: { minPoints: 1, maxPoints: 4 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    NOISY: {
        ignorance: { minPoints: 3, maxPoints: 4 },
        boredom: { minPoints: 1, maxPoints: 4 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    MANIPULATOR: {
        ignorance: { minPoints: 2, maxPoints: 4 },
        boredom: { minPoints: 0, maxPoints: 3 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
    HYPERACTIVE: {
        ignorance: { minPoints: 3, maxPoints: 5 },
        boredom: { minPoints: 1, maxPoints: 4 },
        skills: {},
        uniqueSkills: {},
        petSkill: {},
    },
} as const;

export type PupilBehavior = keyof typeof PUPIL_BEHAVIOR;
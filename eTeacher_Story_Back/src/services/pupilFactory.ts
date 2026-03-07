import { Pupil } from "../models/pupil";
import { Random } from "./utils";
import { getConnection, getRepository } from "typeorm";


	function GenerateAppearance(gender: number): any {
		//TODO
		return { /*name et sprite*/}
	}

    function GenerateMark(): number {
        return markPool[Random(0,markPool.length)];
	}

	function GenerateTrait(diff: number, lvl?: number): number {
		let trait: number[] =[0]

		return trait[Random(0,trait.length)];

}

function GenerateSkill(traitId: number): number {
    let skill: number[] = [0]

    return skill[Random(0, skill.length)]
                            
}

function GenerateName(): string {
    let names: Array<string> = ["Marie", "Jean", "Camille", "Mathis"];
    return names[Random(0,4)];
}

export async function GeneratePupil(difficulty: number): Promise<Pupil> {
    const pupilRepository = getRepository(Pupil);
    let trait = GenerateTrait(difficulty);
        let pupil: Pupil =  new Pupil({
            appearance: GenerateAppearance(Random(0,1)),
            mark: GenerateMark(),
            traitId: trait,
            skillId: GenerateSkill(trait),
            name: GenerateName()
        });
    //await pupilRepository.save(pupil);
    return pupil;
	}

const probMark: any[] = [{
    note: [2, 3],
    weight: 5
}, {
        "note": [4, 5],
        "weight": 12
    }, {
        "note": [6],
        "weight": 20
    }, {
        "note": [7, 8],
        "weight": 30
    }, {
        "note": [9],
        "weight": 20
    }, {
        "note": [10],
        "weight": 8
    }, {
        "note": [11],
        "weight": 2
    }, {
        "note": [12],
        "weight": 2
    }, {
        "note": [13],
        "weight": 1
}]

const markPool: number[] = [];
probMark.forEach((value) => {
    value.note.forEach((mark: number) => {
        for (var i = 0; i < value.weight; i++) {
            markPool.push(mark)
        }
    })
})

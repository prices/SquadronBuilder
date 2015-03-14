//
// The special force cards are specified here
//
SquadronBuilder.force.support = {
    RegultSquad: {
        name: "Regult Squad",
        mecha: {
            "Regult": 6,
        },
        points: 35,
        upgrades: {
            "Veteran Warriors": {
                points: 10,
            },
        },
        factions: ["Zentraedi", "Malcontents"],
    },
    ValkyrieSquad: {
        name: "Valkyrie Squad",
        mecha: {
            "VF1AValkyrie": 2,
        },
        points: 40,
        upgrades: {
            "Valkyrie MLOPs": {
                points: 2,
            },
            "Valkyrie Long-Range Missiles": {
                points: 10,
            },
            "Valkyrie Gravity Bombs": {
                points: 5,
            },
            "SDF-1 Air Wing Nose Lasers": {
                points: 2,
            },
        },
        factions: ["UEDF"],
    }
}

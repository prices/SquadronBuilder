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
            'VeteranWarriors': 10
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    ValkyrieSquad: {
        name: "Valkyrie Squad",
        mecha: {
            "VF1AValkyrie": 2,
        },
        points: 40,
        upgrades: {
            'ValkyrieMLOPs': 2,
            'ValkyrieLongRangeMissiles': 10,
            'Valkyrie Gravity Bombs': 5,
            'SDF1AirWingNoseLasers': 2
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    TomahawkSquad: {
        name: "Tomahawk Squad",
        mecha: {
            "Tomahawk": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    PhalanxSquad: {
        name: "Phalanx Squad",
        mecha: {
            "Phalanx": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    DefenderSquad: {
        name: "Defender Squad",
        mecha: {
            "Defender": 2,
        },
        points: 20,
        upgrades: {
            'DefenderAirBurstMunitions': 5
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    }
}

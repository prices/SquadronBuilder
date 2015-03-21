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
    GluuhaugRegultSquad: {
        name: "Gluuhaug-Regult Squad",
        mecha: {
            "GluuhaugRegult": 2,
        },
        points: 25,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    SerauhaugRegultSquad: {
        name: "Serauhaug-Regult Squad",
        mecha: {
            "SerauhaugRegult": 2,
        },
        points: 40,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    TelnestaRegultSquad: {
        name: "Telnesta-Regult Squad",
        mecha: {
            "TelnestaRegult": 2,
        },
        points: 15,
        upgrades: {
        },
        factions: ["Zentraedi"],
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
            'ValkyrieGravityBombs': 5,
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
    },
    RegultSquadMalcontents: {
        name: "Regult Support Squad",
        mecha: {
            "GluuhaugRegult": 2,
            "SerauhaugRegult": 2,
        },
        points: 65,
        upgrades: {
        },
        factions: ["Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
}

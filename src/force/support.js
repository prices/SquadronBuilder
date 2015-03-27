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
    VF1R: {
        name: "VF-1R Upgrade",
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ["UEDF"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("VF1AValkyrie") != -1) || (mecha.indexOf("VF1JValkyrie") != -1)) {
                return true;
            }

            return true;
        },
        execute: function (core) {
            var count = 2;
            core.upgradeMecha(function(mecha) {
                var piloting = mecha.getStat('piloting');
                var gunnery = mecha.getStat('gunnery');
                if (mecha.count <= count) {
                    var newmecha = core.replaceMecha(mecha.class, 'VF1RValkyrie', mecha.count);
                    count -= mecha.count;
                } else {
                    mecha.count -= count;
                    var newmecha = core.addMecha('VF1RValkyrie', count, true);
                    count = 0;
                }
                if (newmecha) {
                    // This gets the piloting and gunnery for the mecha.
                    for (var mode in piloting) {
                        newmecha.setStat('piloting', piloting[mode], [mode]);
                    }
                    for (var mode in gunnery) {
                        newmecha.setStat('gunnery', gunnery[mode], [mode]);
                    }
                }
            }, ["VF1AValkyrie", "VF1JValkyrie"]);

            return true;
        },
    },
}

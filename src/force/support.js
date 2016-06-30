//
// The special force cards are specified here
//
SquadronBuilder.force.support = {
    QuelRegult: {
        name: "Quel-Regult",
        mecha: {
            "QuelRegult": 1,
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
    QuelGulnau: {
        name: "Quel-Gulnau",
        mecha: {
            "QuelGulnau": 1,
        },
        points: 10,
        upgrades: {
        },
        factions: ["Zentraedi"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("Glaug") == -1) && (mecha.indexOf("GlaugEldare") == -1)) {
                return false;
            }
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
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
    GluuGerSquad: {
        name: "Light Infantry Squad",
        mecha: {
            "GluuGer": 6,
        },
        points: 10,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 0,
            'ZTFGMkVTacticalFlechetteCannon': 0,
            'ZMLMkIIShoulderFiredMissileLauncher': 0,
            'VeteranWarriors': 5
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    SerauGerSquad: {
        name: "Heavy Infantry Squad",
        mecha: {
            "SerauGer": 6,
        },
        points: 15,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 0,
            'ZTFGMkVTacticalFlechetteCannon': 0,
            'ZMLMkIIShoulderFiredMissileLauncher': 0,
            'VeteranWarriors': 5
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    NousjadeulGerSquad: {
        name: "Nousjadeul-Ger Squad",
        mecha: {
            "NousjadeulGer": 3,
        },
        points: 25,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 8,
            'ZTFGMkVTacticalFlechetteCannon': 23,
            'ZMLMkIIShoulderFiredMissileLauncher': 15
        },
        factions: ["Zentraedi", "Malcontents"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("QueadluunRau") != -1) || (mecha.indexOf("QueadluunGult") != -1)) {
                return false;
            }
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
    GnerlSquad: {
        name: 'Gnerl Squad',
        mecha: {
            'Gnerl': 3,
        },
        points: 35,
        upgrades: {
            'GnerlUnderSlungMissiles': 15,
            'GnerlPlasmaBombs': 10
        },
        check: function (core) {
            return true;
        },
        factions: ['Zentraedi'],
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
            'ValkyrieLongRangeMissiles': 8,
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
    SuperValkyrieSquad: {
        name: "Super Valkyrie Squad",
        mecha: {
            "SuperVF1AValkyrie": 2,
        },
        points: 55,
        upgrades: {
            'ValkyrieMLOPs': 2,
            'ValkyrieLongRangeMissiles': 8,
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
    YF4VeritechSquad: {
        name: "YF-4 Veritech Squad",
        mecha: {
            "YF4Veritech": 2,
        },
        points: 50,
        upgrades: {
            'YF4MLOPs': 3,
            'YF4MRM': 5,
            'YF4GravityBombs': 5
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    SuperVF1D: {
        name: "Super VF-1D Valkyrie",
        mecha: {
            "SuperVF1DValkyrie": 1,
        },
        points: 40,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 5,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    VF1D: {
        name: "VF-1D Valkyrie",
        mecha: {
            "VF1DValkyrie": 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 5,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    VEF1: {
        name: "VEF-1 Valkyrie",
        mecha: {
            "VEF1Valkyrie": 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 5,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1
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
    ArmoredValkyrieSquad: {
        name: "Armored Valkyrie Squad",
        mecha: {
            "ArmoredVF1AValkyrie": 2,
        },
        points: 45,
        upgrades: {
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
    ArmoredVF1D: {
        name: "Armored VF-1D",
        mecha: {
            "ArmoredVF1DValkyrie": 1,
        },
        points: 35,
        upgrades: {
            'SDF1AirWingNoseLasers': 1
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    JotunArmoredValkyrieSquad: {
        name: "Jotun Armored Valkyrie Squad",
        mecha: {
            "JotunArmoredVF1AValkyrie": 2,
        },
        points: 45,
        upgrades: {
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
    ArmoredVF1D: {
        name: "Jotun Armored VF-1D",
        mecha: {
            "JotunArmoredVF1DValkyrie": 1,
        },
        points: 35,
        upgrades: {
            'SDF1AirWingNoseLasers': 1
        },
        factions: ["UEDF"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            return true;
        },
    },
    QF3000GhostSquad: {
        name: "QF-3000 Ghost Squad",
        mecha: {
            "QF3000Ghost": 2,
        },
        points: 35,
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
    SF3ALancerIISquad: {
        name: "SF-3A Lancer II Squad",
        mecha: {
            "SF3ALancerII": 2,
        },
        points: 35,
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

            return false;
        },
        execute: function (core) {
            var count = 2;
            core.upgradeMecha(function(mecha) {
                var piloting = mecha.getStat('piloting');
                var gunnery = mecha.getStat('gunnery');
                var leadership = mecha.getAbility('Leadership');
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
                    newmecha.setAbility('Leadership', leadership);
                }
            }, ["VF1AValkyrie", "VF1JValkyrie"]);

            return true;
        },
    },
    ArmoredValkyrieSquadMalcontents: {
        name: "Armored Valkyrie Squad",
        mecha: {
            "ArmoredVF1AValkyrie": 2,
        },
        points: 50,
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
    AssaultDestriodSquad: {
        name: 'Assault Destroid Squad',
        mecha: {
            'Tomahawk': 1,
            'Spartan': 1,
        },
        points: 35,
        upgrades: {
            ZPRMkVIIIParticleAssaultRifle: 2,
            ZTFGMkVTacticalFlechetteCannon: 8,
            ZMLMkIIShoulderFiredMissileLauncher: 5,
            GU11GunPod: 5,
        },
        factions: ['Malcontents'],
    },
    GnerlSquadMalcontents: {
        name: 'Gnerl Squad',
        mecha: {
            'Gnerl': 3,
        },
        points: 35,
        upgrades: {
            'ValkyrieImprovisedBombs': 8,
        },
        factions: ['Malcontents'],
    },
    RegultSupportSquad: {
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
    SuperVF1AMalcontents: {
        name: "Super VF-1A Valkyrie",
        mecha: {
            "SuperVF1AValkyrie": 1,
        },
        points: 30,
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
    SupportDestroidSquad: {
        name: 'Support Destroid Squad',
        mecha: {
            'Phalanx': 1,
            'Defender': 1,
        },
        points: 30,
        upgrades: {
            'DefenderAirBurstMunitions': 2,
            'PhalanxArtilleryRockets': 5,
        },
        factions: ['Malcontents'],
    },
    ValkyrieSquadMalcontents: {
        name: 'Valkyrie Squad',
        mecha: {
            'VF1AValkyrie': 2,
        },
        points: 40,
        upgrades: {
            'ValkyrieImprovisedBombs': 5,
        },
        factions: ['Malcontents'],
    },
    VF1RMalcontents: {
        name: "VF-1R Upgrade",
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ["Malcontents"],
        check: function (core) {
            mecha = core.getMecha();
            if ((mecha.indexOf("VF1AValkyrie") != -1) || (mecha.indexOf("VF1JValkyrie") != -1) || (mecha.indexOf("VF1DValkyrie") != -1) || (mecha.indexOf("VF1SValkyrie") != -1)) {
                return true;
            }

            return false;
        },
        execute: function (core) {
            var count = 1;
            core.upgradeMecha(function(mecha) {
                var piloting = mecha.getStat('piloting');
                var gunnery = mecha.getStat('gunnery');
                var leadership = mecha.getAbility('Leadership');
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
                    newmecha.setAbility('Leadership', leadership);
                }
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1DValkyrie", "VF1SValkyrie"]);

            return true;
        },
    },
}

//
// The special force cards are specified here
//
SquadronBuilder.force.special = {
     Glaug: {
        name: 'Glaug',
        mecha: {
            'Glaug': 1,
        },
        points: 20,
        upgrades: {
            'GlaugEldare': 25,
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("Glaug") == -1) && (mecha.indexOf("GlaugEldare") == -1)) {
                return true;
            }
            return false;
        },
        execute: function (core)
        {
            return true;
        }

    },
    QueadluunRau: {
        name: 'Queadluun-Rau',
        mecha: {
            'QueadluunRau': 1,
        },
        points: 30,
        upgrades: {
            'NousjadeulGer32mmPlasmaMachinePistol': 10,
            'QueadluunRauZCRMK2ConvergingBeamRifle': 10
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("NousjadeulGer") != -1) || (mecha.indexOf("NousgarmaGer") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            return true;
        }

    },
    QueadluunGult: {
        name: 'Queadluun-Gult',
        mecha: {
            'QueadluunGult': 1,
        },
        points: 35,
        upgrades: {
            'NousjadeulGer32mmPlasmaMachinePistol': 10,
            'QueadluunRauZCRMK2ConvergingBeamRifle': 10
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("NousjadeulGer") != -1) || (mecha.indexOf("NousgarmaGer") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            return true;
        }

    },
    NousgarmaGer: {
        name: 'NousGarma-Ger',
        mecha: {
            'NousgarmaGer': 1,
        },
        points: 25,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 8,
            'ZTFGMkVTacticalFlechetteCannon': 20,
            'ZMLMkIIShoulderFiredMissileLauncher': 15,
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("QuadluunRau") != -1) || (mecha.indexOf("QueadluunGult") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            return true;
        }

    },
    VF1S: {
        name: 'VF-1S Valkyrie',
        mecha: {
            'VF1SValkyrie': 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 4,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1,
        },
        factions: ['UEDF'],
        check: function (core)
        {
            return true;
        },
        execute: function (core)
        {
        }
    },
    SuperVF1S: {
        name: 'Super VF-1S Valkyrie',
        mecha: {
            'SuperVF1SValkyrie': 1,
        },
        points: 40,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 4,
            'ValkyrieGravityBombs': 3,
            'SDF1AirWingNoseLasers': 1,
        },
        factions: ['UEDF'],
        check: function (core)
        {
            return true;
        },
        execute: function (core)
        {
        }
    },
    ArmoredVF1S: {
        name: "Armored VF-1S",
        mecha: {
            "ArmoredVF1SValkyrie": 1,
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
    JotunArmoredVF1S: {
        name: "Jotun Armored VF-1S",
        mecha: {
            "JotunArmoredVF1SValkyrie": 1,
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
    Monster: {
        name: "Monster",
        mecha: {
            "Monster": 1,
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
    CommandDestroidDefender: {
        name: 'Command Defender Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Defender") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Defender', 'Defender', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidTomahawk: {
        name: 'Command Tomahawk Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Tomahawk") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Tomahawk', 'Tomahawk', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidSpartan: {
        name: 'Command Spartan Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Spartan") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Spartan', 'Spartan', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandDestroidPhalanx: {
        name: 'Command Phalanx Upgrade',
        mecha: {
        },
        points: 10,
        upgrades: {
        },
        factions: ['UEDF'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("Phalanx") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('Phalanx', 'Phalanx', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    GluuGerZentraediOfficer: {
        name: 'Gluu-Ger Officer Upgrade',
        mecha: {
        },
        points: 5,
        upgrades: {
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("GluuGer") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('GluuGer', 'GluuGer', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 1);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    SerauGerZentraediOfficer: {
        name: 'Serau-Ger Officer Upgrade',
        mecha: {
        },
        points: 5,
        upgrades: {
        },
        factions: ['Zentraedi'],
        check: function (core)
        {
            mecha = core.getMecha();
            if (mecha.indexOf("SerauGer") == -1) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            var mecha = core.replaceMecha('SerauGer', 'SerauGer', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 1);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        }
    },
    CommandMonster: {
        name: "Command Monster",
        mecha: {
            "Monster": 1,
        },
        points: 60,
        upgrades: {
        },
        factions: ["Malcontents"],
        check: function (core) {
            return true;
        },
        execute: function (core) {
            var mecha = core.replaceMecha('Monster', 'Monster', 1);
            mecha.changeStat('piloting', 1);
            mecha.changeStat('gunnery', 1);
            mecha.setAbility('Leadership', 2);
            mecha.mecha.name = "Command\n"+mecha.mecha.name;
            return true;
        },
    },
    GlaugMalcontents: {
        name: 'Glaug',
        mecha: {
            'Glaug': 1,
        },
        points: 25,
        upgrades: {
        },
        factions: ['Malcontents'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("Glaug") == -1) && (mecha.indexOf("GlaugEldare") == -1)) {
                return true;
            }
            return false;
        },
        execute: function (core)
        {
            return true;
        }

    },
    QueadluunRauMalcontents: {
        name: 'Queadluun-Rau',
        mecha: {
            'QueadluunRau': 1,
        },
        points: 30,
        upgrades: {
        },
        factions: ['Malcontents'],
        check: function (core)
        {
            mecha = core.getMecha();
            if ((mecha.indexOf("NousjadeulGer") != -1) || (mecha.indexOf("NousgarmaGer") != -1)) {
                return false;
            }
            return true;
        },
        execute: function (core)
        {
            return true;
        }

    },
    QuelRegult: {
        name: "Quel-Regult",
        mecha: {
            "QuelRegult": 1,
        },
        points: 20,
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

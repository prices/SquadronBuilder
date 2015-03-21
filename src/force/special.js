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
    VF1S: {
        name: 'VF-1S Valkyrie',
        mecha: {
            'VF1SValkyrie': 1,
        },
        points: 30,
        upgrades: {
            'ValkyrieMLOPs': 1,
            'ValkyrieLongRangeMissiles': 5,
            'Valkyrie Gravity Bombs': 3,
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

}

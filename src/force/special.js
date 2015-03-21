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
            'GlaugEldare': {
                name: 'Glaug-Eldare',
                desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
                points: 25,
                execute: function (core)
                {
                    core.replaceMecha('Glaug', 'GlaugEldare');
                }
            },
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
            'ValkyrieMLOPs': {
                name: 'Valkyrie MLOPs',
                desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
                points: 1,
                exclusive: true,
            },
            'ValkyrieLongRangeMissiles': {
                name: 'Valkyrie Long-Range Missiles',
                desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X',
                points: 5,
                exclusive: true,
            },
            'Valkyrie Gravity Bombs': {
                name: 'Valkyrie Gravity Bombs',
                desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
                points: 3,
                exclusive: true,
            },
            'SDF1AirWingNoseLasers': {
                name: 'SDF-1 Air Wing Nose Lasers',
                desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
                points: 1,
            },
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

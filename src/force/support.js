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
            'VeteranWarriors': {
                name: 'Veteran Warriors',
                desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
                points: 10,
                execute: function (core)
                {
                    core.card.name = "Veteran "+core.card.name;
                    core.upgradeMecha(function(mecha) {
                        if (mecha.class == "Regult") {
                            mecha.changeStat('piloting', 1);
                            mecha.changeStat('gunnery', 1);
                        }
                    }, ["Regult", "SerauGer", "GluuGer"]);
                }
            },
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
            'ValkyrieMLOPs': {
                name: 'Valkyrie MLOPs',
                desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
                points: 2,
                exclusive: true,
            },
            'ValkyrieLongRangeMissiles': {
                name: 'Valkyrie Long-Range Missiles',
                desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X',
                points: 10,
                exclusive: true,
            },
            'Valkyrie Gravity Bombs': {
                name: 'Valkyrie Gravity Bombs',
                desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
                points: 5,
                exclusive: true,
            },
            'SDF1AirWingNoseLasers': {
                name: 'SDF-1 Air Wing Nose Lasers',
                desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
                points: 2,
            },
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
    DefenderSquad: {
        name: "Defender Squad",
        mecha: {
            "Defender": 2,
        },
        points: 20,
        upgrades: {
            'DefenderAirBurstMunitions': {
                name: 'Defender Air-Burst Munitions',
                desc: 'Changes Dual M-996 78mm Auto-Cannons to RG:36, MD:4, Accurate, Anti-missile, Blast, Rapid Fire, Rear Fire, Split Fire',
                points: 5,
            },
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

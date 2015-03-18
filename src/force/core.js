//
// The core force cards are specified here
//
SquadronBuilder.force.core = {
    NousjadeulGerSquadron: {
        name: 'Nousjadeul-Ger Squadron',
        mecha: {
            'NousjadeulGer': 6,
        },
        points: 50,
        upgrades: {
            'Veteran Warriors': {
                desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
                points: 10,
            }
        },
        factions: ['Zentraedi'],
    },
    RegultArtillerySquadron: {
        name: 'Regult Artillery Squadron',
        mecha: {
            'GluuhaugRegult': 4,
            'SerauhaugRegult': 2,
        },
        points: 90,
        upgrades: {},
        factions: ['Zentraedi'],
    },
    RegultAttackSquadron: {
        name: 'Regult Attack Squadron',
        mecha: {
            'Glaug': 1,
            'Regult': 9,
        },
        points: 80,
        upgrades: {
            'Veteran Warriors': {
                desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
                points: 20,
                execute: function (core)
                {
                    core.card.name = "Veteran "+core.card.name;
                    core.upgradeMecha(function(mecha) {
                        mecha.changeStat('piloting', 1);
                        mecha.changeStat('gunnery', 1);
                    }, ["Regult", "SerauGer", "GluuGer"]);
                }
            },
            'Glaug-Eldare': {
                desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
                points: 25,
                execute: function (core)
                {
                    core.replaceMecha('Glaug', 'GlaugEldare');
                }
            },
        },
        factions: ['Zentraedi'],
    },
    RegultAttritionSquadron: {
        name: 'Regult Attrition Squadron',
        mecha: {
            'Regult': 12,
        },
        points: 70,
        upgrades: {
            'Veteran Warriors': {
                desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
                points: 25,
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
        factions: ['Zentraedi'],
    },
    RegultReconSquadron: {
        name: 'Regult Recon Squadron',
        mecha: {
            'Glaug': 1,
            'Regult': 6,
            'QuelRegult': 1,
        },
        points: 70,
        upgrades: {
            'Veteran Warriors': {
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
            'Glaug-Eldare': {
                desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
                points: 25,
                execute: function (core)
                {
                    core.replaceMecha('Glaug', 'GlaugEldare');
                }
            },
        },
        factions: ['Zentraedi'],
    },
    ValkyrieSquadron: {
        name: 'Valkyrie Squadron',
        mecha: {
            'VF1JValkyrie': 1,
            'VF1AValkyrie': 3,
        },
        points: 80,
        upgrades: {
            'Valkyrie MLOPs': {
                desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
                points: 5,
                exclusive: true,
            },
            'Valkyrie Long-Range Missiles': {
                desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X',
                points: 20,
                exclusive: true,
            },
            'Valkyrie Gravity Bombs': {
                desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
                points: 10,
                exclusive: true,
            },
            'SDF-1 Air Wing Nose Lasers': {
                desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
                points: 5,
            },
        },
        factions: ['UEDF'],
        upgrade: function (name)
        {
            switch (name) {
            }
            return true;
        }
    }
}

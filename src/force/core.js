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
            'VeteranWarriors': 20,
            'GlaugEldare': 25
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
            'VeteranWarriors': 25,
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
            'VeteranWarriors': 10,
            'GlaugEldare': 25,
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
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 20,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    AreaDenialDestroidSquadron: {
        name: 'Area Denial Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Defender': 2,
        },
        points: 60,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
        },
        factions: ['UEDF'],
    },
    ArmoredDestroidSquadron: {
        name: 'Armored Destroid Squadron',
        mecha: {
            'Tomahawk': 4,
        },
        points: 80,
        upgrades: {
        },
        factions: ['UEDF'],
    },
    CloseQuartersDestroidSquadron: {
        name: 'Close Quarters Destroid Squadron',
        mecha: {
            'Spartan': 4,
        },
        points: 60,
        upgrades: {
            'GU11GunPod': 20,
            'SpartanShockBaton': 10,
        },
        factions: ['UEDF'],
    },
    BrawlerDestroidSquadron: {
        name: 'Brawler Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Spartan': 2,
        },
        points: 70,
        upgrades: {
            'GU11GunPod': 10,
            'SpartanShockBaton': 5
        },
        factions: ['UEDF'],
    },
    // Malcontents
    HeavyDestroidSquadron: {
        name: 'Heavy Destroid Squadron',
        mecha: {
            'Tomahawk': 2,
            'Spartan': 2,
            'Glaug': 1
        },
        points: 90,
        upgrades: {
            GU11GunPod: 10,
            ZPRMkVIIIParticleAssaultRifle: 5,
            ZTFGMkVTacticalFlechetteCannon: 15,
            ZMLMkIIShoulderFiredMissileLauncher: 10
        },
        factions: ['Malcontents'],
    },
    AirDefenseSquadron: {
        name: 'Air Defense Squadron',
        mecha: {
            'GluuhaugRegult': 4,
            'Defender': 2,
        },
        points: 70,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
        },
        factions: ['Malcontents'],
    },
}

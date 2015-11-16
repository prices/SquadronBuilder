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
            'ZPRMkVIIIParticleAssaultRifle': 15,
            'ZTFGMkVTacticalFlechetteCannon': 40,
            'ZMLMkIIShoulderFiredMissileLauncher': 30
        },
        factions: ['Zentraedi'],
    },
    QueadluunRauSquadron: {
        name: 'Queadluun-Rau Squadron',
        mecha: {
            'QueadluunRau': 3,
        },
        points: 100,
        upgrades: {
            'NousjadeulGer32mmPlasmaMachinePistol': 30,
            'QueadluunRauZCRMK2ConvergingBeamRifle': 30
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
    ArmoredValkyrieSquadron: {
        name: 'Armored Valkyrie Squadron',
        mecha: {
            'ArmoredVF1JValkyrie': 1,
            'ArmoredVF1AValkyrie': 3,
        },
        points: 100,
        upgrades: {
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 20,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
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
    AirSuperioritySquadron: {
        name: 'Air Superiority Squadron',
        mecha: {
            'VF1AValkyrie': 3,
            'QueadluunRau': 1,
        },
        points: 90,
        upgrades: {
            'ValkyrieImprovisedBombs': 8,
        },
        factions: ['Malcontents'],
    },
    HeavyDestroidSquadron: {
        name: 'Heavy Destroid Squadron',
        mecha: {
            'Glaug': 1,
            'Spartan': 2,
            'Tomahawk': 2
        },
        points: 90,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10
        },
        factions: ['Malcontents'],
    },
    MainBattleSquadron: {
        name: 'Main Battle Squadron',
        mecha: {
            'NousjadeulGer': 3,
            'Tomahawk': 2
        },
        points: 65,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10
        },
        factions: ['Malcontents'],
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

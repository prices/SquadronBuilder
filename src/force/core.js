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
    NousgarmaGerSquadron: {
        name: 'Nousgarma-Ger Squadron',
        mecha: {
            'NousgarmaGer': 3,
        },
        points: 70,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 8,
            'ZTFGMkVTacticalFlechetteCannon': 20,
            'ZMLMkIIShoulderFiredMissileLauncher': 15
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
    QueadluunGultSquadron: {
        name: 'Queadluun-Gult Squadron',
        mecha: {
            'QueadluunGult': 3,
        },
        points: 110,
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
    GlaugEldareAttackSquadron: {
        name: 'Glaug-Eldare Attack Squadron',
        mecha: {
            'GlaugEldare': 3,
        },
        points: 150,
        upgrades: {
        },
        factions: ['Zentraedi'],
    },
    GnerlAttackSquadron: {
        name: 'Gnerl Attack Squadron',
        mecha: {
            'Gnerl': 6,
        },
        points: 65,
        upgrades: {
            'GnerlUnderSlungMissiles': 30,
            'GnerlPlasmaBombs': 20
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
    SerauGerSquadron: {
        name: 'Zentraedi Heavy Infantry Squadron',
        mecha: {
            'SerauGer': 12,
        },
        points: 35,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 0,
            'ZTFGMkVTacticalFlechetteCannon': 0,
            'ZMLMkIIShoulderFiredMissileLauncher': 0,
            'VeteranWarriors': 10,
        },
        factions: ['Zentraedi'],
    },
    GluuGerSquadron: {
        name: 'Zentraedi Light Infantry Squadron',
        mecha: {
            'GluuGer': 12,
        },
        points: 25,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 0,
            'ZTFGMkVTacticalFlechetteCannon': 0,
            'ZMLMkIIShoulderFiredMissileLauncher': 0,
            'VeteranWarriors': 10,
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
            'ValkyrieLongRangeMissiles': 15,
            'ValkyrieGravityBombs': 10,
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    SuperValkyrieSquadron: {
        name: 'Super Valkyrie Squadron',
        mecha: {
            'SuperVF1JValkyrie': 1,
            'SuperVF1AValkyrie': 3,
        },
        points: 110,
        upgrades: {
            'ValkyrieMLOPs': 5,
            'ValkyrieLongRangeMissiles': 15,
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
        points: 90,
        upgrades: {
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    JotunArmoredValkyrieSquadron: {
        name: 'Jotun Armored Valkyrie Squadron',
        mecha: {
            'JotunArmoredVF1JValkyrie': 1,
            'JotunArmoredVF1AValkyrie': 3,
        },
        points: 90,
        upgrades: {
            'SDF1AirWingNoseLasers': 5
        },
        factions: ['UEDF'],
    },
    GhostSquadron: {
        name: 'QF-3000 Ghost Squadron',
        mecha: {
            'QF3000Ghost': 4,
        },
        points: 70,
        upgrades: {
        },
        factions: ['UEDF'],
    },
    LancerIISquadron: {
        name: 'SF-3A Lancer II Squadron',
        mecha: {
            'SF3ALancerII': 4,
        },
        points: 70,
        upgrades: {
        },
        factions: ['UEDF'],
    },
    YF4VeritechSquadron: {
        name: 'YF-4 Veritech Squadron',
        mecha: {
            'FlightLeadYF4Veritech': 1,
            'YF4Veritech': 3,
        },
        points: 105,
        upgrades: {
            'YF4MLOPs': 5,
            'YF4MRM': 10,
            'YF4GravityBombs': 10
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
    ArtilleryDestriodSquadron: {
        name: 'Artillery Destriod Squadron',
        mecha: {
            'Phalanx': 4,
        },
        points: 80,
        upgrades: {
            'PhalanxArtilleryRockets': 20,
            'PhalanxScorpioAdvancedArtillery': 30,
        },
        factions: ['UEDF'],
    },
    FireSupportDestroidSquadron: {
        name: 'Fire Support Destroid Squadron',
        mecha: {
            'Phalanx': 2,
            'Defender': 2,
        },
        points: 60,
        upgrades: {
            'DefenderAirBurstMunitions': 5,
            'PhalanxArtilleryRockets': 10,
            'PhalanxScorpioAdvancedArtillery': 15,
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
    AirSuperioritySquadron: {
        name: 'Armored Assault Squadron',
        mecha: {
            'ArmoredVF1AValkyrie': 3,
            'QueadluunRau': 1,
        },
        points: 100,
        upgrades: {
        },
        factions: ['Malcontents'],
    },
    ArtillerySupportSquadron: {
        name: 'Artillery Support Squadron',
        mecha: {
            'SerauhaugRegult': 2,
            'Phalanx': 2,
        },
        points: 80,
        upgrades: {
            'PhalanxArtilleryRockets': 10,
        },
        factions: ['Malcontents'],
    },
    AssaultReconSquadron: {
        name: 'Assault Recon Squadron',
        mecha: {
            'VEF1Valkyrie': 1,
            'Gnerl': 3,
        },
        points: 65,
        upgrades: {
            'ValkyrieImprovisedBombs': 10,
        },
        factions: ['Malcontents'],
    },
    GroundAttackSquadron: {
        name: 'Ground Attack Squadron',
        mecha: {
            'VF1JValkyrie': 1,
            'VF1AValkyrie': 1,
            'Gnerl': 3,
        },
        points: 75,
        upgrades: {
            'ValkyrieImprovisedBombs': 12,
        },
        factions: ['Malcontents'],
    },
    LightRaiderSquadron: {
        name: 'Light Raider Squadron',
        mecha: {
            'Spartan': 2,
            'Regult': 6,
        },
        points: 65,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10,
            'VeteranWarriors': 10
        },
        factions: ['Malcontents'],
    },
    MixedInfantrySquadron: {
        name: 'Mixed Infantry Squadron',
        mecha: {
            'Spartan': 2,
            'SerauGer': 3,
            'GluuGer': 6
        },
        points: 65,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 5,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 10,
            'GU11GunPod': 10,
            'VeteranWarriors': 10
        },
        factions: ['Malcontents'],
    },
    SuperValkyrieSquadron: {
        name: 'Super Valkyrie Squadron',
        mecha: {
            'SuperVF1AValkyrie': 4,
        },
        points: 110,
        upgrades: {
            'ValkyrieImprovisedBombs': 10
        },
        factions: ['Malcontents'],
    },
    ZentraediAssaultSquadron: {
        name: 'Zentraedi Assault Squadron',
        mecha: {
            'NousjadeulGer': 3,
            'Regult': 6
        },
        points: 60,
        upgrades: {
            'ZPRMkVIIIParticleAssaultRifle': 7,
            'ZTFGMkVTacticalFlechetteCannon': 15,
            'ZMLMkIIShoulderFiredMissileLauncher': 13,
            'GU11GunPod': 13,
            'VeteranWarriors': 10
        },
        factions: ['Malcontents'],
    },
}

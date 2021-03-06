//
// The various upgrades are specified here
//
SquadronBuilder.force.upgrades = {
    // Zentraedi
    VeteranWarriors: {
        name: 'Veteran Warriors',
        desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
        execute: function (core)
        {
            core.card.name = "Veteran "+core.card.name;
            core.upgradeMecha(function(mecha) {
                mecha.changeStat('piloting', 1);
                mecha.changeStat('gunnery', 1);
            }, ["Regult", "SerauGer", "GluuGer"]);
        },
        blocks: []
    },
    GlaugEldare: {
        name: 'Glaug-Eldare',
        desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
        execute: function (core)
        {
            core.replaceMecha('Glaug', 'GlaugEldare');
        },
        blocks: []
    },
    NousjadeulGer32mmPlasmaMachinePistol: {
        name: '32mm plasma Machine pistols',
        desc: 'RG: 9, MD: 8, Rapid Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('NousjadeulGer32mmPlasmaMachinePistol');
            }, ["QueadluunRau"]);
        },
        blocks: ['QueadluunRauZCRMK2ConvergingBeamRifle']
    },
    QueadluunRauZCRMK2ConvergingBeamRifle: {
        name: 'Z-CR MK. II Converging Beam rifles',
        desc: 'RG: 24, MD: 9, Accurate',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('QueadluunRauZCRMK2ConvergingBeamRifle');
            }, ["QueadluunRau"]);
        },
        blocks: ['NousjadeulGer32mmPlasmaMachinePistol']
    },
    GnerlUnderSlungMissiles: {
        name: 'Under-Slung Missiles',
        desc: 'The Gnerl has long-range missiles mounted on its undercarriage with the following profile: RG: 48, MD: 9 per missile, Ammo 3, Blast, Missile, Volley X',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('GnerlUnderSlungMissiles');
            }, ["Gnerl"]);
        },
        blocks: ['GnerlPlasmaBombs']
    },
    GnerlPlasmaBombs: {
        name: 'Plasma Bombs',
        desc: 'The Gnerl has plasma bombs mounted on its undercarriage with the following profile: RG: -, MD: 16, Ammo 2, Blast, Fly Over, Missile, Overwhelming.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('GnerlPlasmaBombs');
            }, ["Gnerl"]);
        },
        blocks: ['GnerlUnderSlungMissiles']
    },
    ZPRMkVIIIParticleAssaultRifle: {
        name: 'Z-PR Mk. VIII Particle Assault Rifle',
        desc: 'RG:12, MD: 5, Accurate',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZPRMkVIIIParticleAssaultRifle');
            }, ["Spartan", "NousjadeulGer", "GluuGer", "SerauGer"]);
        },
        blocks: ['GU11GunPod', 'ZTFGMkVTacticalFlechetteCannon', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    ZTFGMkVTacticalFlechetteCannon: {
        name: 'Z-TFG Mk. V Tactical Flechette Cannon',
        desc: 'RG:9, MD: 4, Ammo 8, Blast',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZTFGMkVTacticalFlechetteCannon');
            }, ["Spartan", "NousjadeulGer", "GluuGer", "SerauGer"]);
        },
        blocks: ['GU11GunPod', 'ZPRMkVIIIParticleAssaultRifle', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    ZMLMkIIShoulderFiredMissileLauncher: {
        name: 'Z-ML MkII Shoulder-Fired Missile Launcher',
        desc: 'RG:18, MD: 6/missile, Ammo 5, Anti-Missile, Blast',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ZMLMkIIShoulderFiredMissileLauncher');
            }, ["Spartan", "NousjadeulGer", "GluuGer", "SerauGer"]);
        },
        blocks: ['GU11GunPod', 'ZTFGMkVTacticalFlechetteCannon', 'ZPRMkVIIIParticleAssaultRifle']
    },
    // UEDF
    DefenderAirBurstMunitions: {
        name: 'Defender Air-Burst Munitions',
        desc: 'Changes Dual M-996 78mm Auto-Cannons to RG:36, MD:4, Accurate, Anti-missile, Blast, Rapid Fire, Rear Fire, Split Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('M99678mmAutoCannon', 'M99678mmAutoCannonAirBurst');
            }, ["Defender"]);
        },
        blocks: []
    },
    GU11GunPod: {
        name: 'GU-11 Gun Pod',
        desc: 'RG:24, MD:6, Rapid Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('GU11Battloid');
            }, ["Spartan", "NousjadeulGer"]);
        },
        blocks: ['ZTFGMkVTacticalFlechetteCannon', 'ZPRMkVIIIParticleAssaultRifle', 'ZMLMkIIShoulderFiredMissileLauncher']
    },
    SpartanShockBaton: {
        name: 'Spartan Shock Baton',
        desc: 'Clubbing weapon.  Reduces target\'s speed to 0 for the turn.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addHandToHand('Club');
                mecha.addExtraAbility('Spartan Shock Baton', 'Clubbing weapon. Reduces target\'s speed to 0 for the turn.');
            }, ["Spartan"]);
        },
        blocks: []
    },
    ValkyrieMLOPs: {
        name: 'Valkyrie MLOPs',
        desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieMLOPs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieLongRangeMissiles', 'ValkyrieGravityBombs']
    },
    ValkyrieLongRangeMissiles: {
        name: 'Valkyrie Long-Range Missiles',
        desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 6, Missile, Vollley X',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieLRM');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieGravityBombs', 'ValkyrieMLOPs']
    },
    ValkyrieGravityBombs: {
        name: 'Valkyrie Gravity Bombs',
        desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieGravityBombs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: ['ValkyrieLongRangeMissiles', 'ValkyrieMLOPs']
    },
    ValkyrieImprovisedBombs: {
        name: 'Improvised Bombs',
        desc: 'The mecha has makeshift bombs mounted on its undercarriage with the following pro le: RG: -, MD: 6, Ammo 2, Blast, Fly Over, Missile. Note: On a Valkyrie, these are in addition to the normal Wing Mounted Articulated Missile Hardpoints',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('ValkyrieImprovisedBombs', ["Guardian", "Fighter"]);
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie", "Gnerl", "SuperVF1AValkyrie", "SuperVF1JValkyrie", "SuperVF1SValkyrie"]);
        },
        blocks: []
    },
    SDF1AirWingNoseLasers: {
        name: 'SDF-1 Air Wing Nose Lasers',
        desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('SDF1AirWingNoseLasers');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        },
        blocks: []
    },
    YF4MLOPs: {
        name: 'YF-4 MLOPs',
        desc: 'Adds a Wing Mounted Articulated Hardpoints weapon system to the YF-4 with the following profile: RG: 12, MD: 2 per missile, Ammo 4, Anti-Missile, Missile, Volley 4. This system cannot be fired while the YF-4 is in Battloid mode.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('YF4MLOPS');
            }, ["YF4Veritech", "FlightLeadYF4Veritech"]);
        },
        blocks: ['YF4MRM', 'YF4GravityBombs']
    },
    YF4MRM: {
        name: 'YF-4 Medium-Range Missiles',
        desc: 'Adds a Wing Mounted Articulated Missile Hardpoints weapon system to the YF-4 with the following profile: RG: 24, MD: 9 per missile, Ammo 3, Missile, Volley 2. This system cannot be fired while the YF-4 is in Battloid mode.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('YF4MRM');
            }, ["YF4Veritech", "FlightLeadYF4Veritech"]);
        },
        blocks: ['YF4MLOPs', 'YF4GravityBombs']
    },
    YF4GravityBombs: {
        name: 'YF-4 Gravity Bombs',
        desc: 'Adds a Wing Mounted Articulated Missile Hardpoints weapon system to the YF-4 with the following profile: RG: -, MD: 12, Ammo 2, Blast, Fly Over, Missile, Overwhelming. This system cannot be fired while the YF-4 is in Battloid mode.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('YF4GravityBombs');
            }, ["YF4Veritech", "FlightLeadYF4Veritech"]);
        },
        blocks: ['YF4MRM', 'YF4MLOPs']
    },
    PhalanxArtilleryRockets: {
        name: 'Phalanx Artillery Rockets',
        desc: 'Changes the attributes of the Dual MDS-H-22 Derringer Missile Launchers to RG: 36, MD: 9 per missile, Ammo 11, Blast, Indirect Fire, Missile, Overwhelming, Rear Fire, Volley 4.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('MDSH22DerringerMissileLaunchers', 'MDSH22DerringerMissileLaunchersPhalanx');
            }, ["Phalanx"]);
        },
        blocks: []
    },
    PhalanxScorpioAdvancedArtillery: {
        name: 'Phalanx Scorpio Advanced Artillery',
        desc: 'Replaces the Phalanx’s Dual MDS-H-22 Derringer Missile Launchers with the Scorpio Advanced Dual Artillery Launchers RG: 48, MD: 10 per missile. Ammo 4, Blast, Indirect Fire, Inescapable, Missile, Rear Fire. Missiles fired by the Scorpio cannot be shot down.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('MDSH22DerringerMissileLaunchers', 'ScorpioAdvancedArtillery');
            }, ["Phalanx"]);
        },
        blocks: []
    },

}
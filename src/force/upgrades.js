//
// The various upgrades are specified here
//
SquadronBuilder.force.upgrades = {
    // Zentraedi
    'VeteranWarriors': {
        name: 'Veteran Warriors',
        desc: 'Regults, Serau-Ger and Gluu-Ger in this squadron get +1 to Piloting (or Physical) and +1 to Gunnery',
        execute: function (core)
        {
            core.card.name = "Veteran "+core.card.name;
            core.upgradeMecha(function(mecha) {
                mecha.changeStat('piloting', 1);
                mecha.changeStat('gunnery', 1);
            }, ["Regult", "SerauGer", "GluuGer"]);
        }
    },
    'GlaugEldare': {
        name: 'Glaug-Eldare',
        desc: 'Upgrade the Glaug in the squadron to a Glaug-Eldare',
        execute: function (core)
        {
            core.replaceMecha('Glaug', 'GlaugEldare');
        }
    },
    // UEDF
    'DefenderAirBurstMunitions': {
        name: 'Defender Air-Burst Munitions',
        desc: 'Changes Dual M-996 78mm Auto-Cannons to RG:36, MD:4, Accurate, Anti-missile, Blast, Rapid Fire, Rear Fire, Split Fire',
        execute: function (core)
        {
        }
    },
    'GU11GunPod': {
        name: 'GU-11 Gun Pod',
        desc: 'RG:24, MD:6, Rapid Fire',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('GU11Battloid');
            }, ["Spartan"]);
        }
    },
    'SpartanShockBaton': {
        name: 'Spartan Shock Baton',
        desc: 'Clubbing weapon.  Reduces target\'s speed to 0 for the turn.',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addHandToHand('Club');
                mecha.addExtraAbility('Spartan Shock Baton', 'Clubbing weapon. Reduces target\'s speed to 0 for the turn.');
            }, ["Spartan"]);
        }
    },
    'ValkyrieMLOPs': {
        name: 'Valkyrie MLOPs',
        desc: 'Changes the wing mounted hard points to RG:12, MD:2/missile, Ammo 8, Anti-missile, Missile, Vollley 8',
        exclusive: true,
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieMLOPs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        }
    },
    'ValkyrieLongRangeMissiles': {
        name: 'Valkyrie Long-Range Missiles',
        desc: 'Changes the wing mounted hard points to RG:48, MD:9/missile, Ammo 8, Missile, Vollley X',
        exclusive: true,
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieLRM');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        }
    },
    'Valkyrie Gravity Bombs': {
        name: 'Valkyrie Gravity Bombs',
        desc: 'Changes the wing mounted hard points to RG:-, MD:12, Ammo 4, Blast, Fly Over, Missile, Overwhelming',
        exclusive: true,
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.replaceWeapon('ValkyrieWingHardPoints', 'ValkyrieGravityBombs');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        }
    },
    'SDF1AirWingNoseLasers': {
        name: 'SDF-1 Air Wing Nose Lasers',
        desc: 'Adds nose lasers to Figher and Guardian modes.  RG:18, MD:2, Anti-Missile',
        execute: function (core)
        {
            core.upgradeMecha(function(mecha) {
                mecha.addWeapon('SDF1AirWingNoseLasers');
            }, ["VF1AValkyrie", "VF1JValkyrie", "VF1SValkyrie"]);
        }
    },

}
//
// The mecha are specified here
//
SquadronBuilder.data.mecha = {
    //       Zentraedi
    GlaugEldare: {
        name: 'Glaug-Eldare',
        speed: 12,
        piloting: 2,
        gunnery: 3,
        defense: 7,
        damage: 9,
        extradamage: 10,
        abilities: {
            'Afterburner'         : true,
            'Aircraft'            : true,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'Glaug',
            'Leadership'          : 4,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'GlaugChargedParticleCannon', 'GlaugHeavyParticleCannons', 
            'GlaugRailCannons', 'RegultAutoCannons', 'Glaug150mmSRM',
            'Glaug103mmMiniMissiles', 'Glaug178mmSRM'
        ],
        handtohand: [
            'Body Block', 'Punch', 'Power Punch'
        ]
    },
    Glaug: {
        name: 'Glaug',
        speed: 7,
        piloting: 3,
        gunnery: 3,
        defense: 7,
        damage: 9,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 4,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'GlaugChargedParticleCannon', 'GlaugHeavyParticleCannons', 
            'GlaugRailCannons', 'RegultAutoCannons', 'Glaug150mmSRM'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QuelGulnau: {
        name: 'Quel-Gulnau',
        speed: 9,
        piloting: 2,
        gunnery: '-',
        defense: 5,
        damage: 9,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : true,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        ],
        handtohand: [
        'Body Block', 'Grab', 'Punch', 'Power Punch'
        ],
        extraabilities: {
            'Recovery and Salvage': 'While a Quel-Gulnau is within 2 inches of a Glaug or Glaug-Eldare, it extends the normal 8 in range of the Zentraedi faction ability of reinforcements to 12"'
        }
    },
    Gnerl: {
        name: 'Gnerl Fighter',
        speed: 12,
        piloting: 2,
        gunnery: 2,
        defense: 7,
        damage: 9,
        extradamage: 10,
        abilities: {
            'Afterburner'         : true,
            'Aircraft'            : true,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'PZ3232mmRotaryParticleCannon', 'MZ18AirtoAirMissleLaunchers'
        ],
        handtohand: [
        'None'
        ]
    },
    GluuhaugRegult: {
        name: 'Gluuhaug Regult',
        speed: 4,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 'Regult313mmMRM'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ]
    },
    GluuGer: {
        name: 'Gluu-Ger',
        speed: 3,
        piloting: 1,
        gunnery: 1,
        defense: 5,
        damage: 3,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : true,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : true,
        },
        ranged: [
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    SerauGer: {
        name: 'Serau-Ger',
        speed: 3,
        piloting: 1,
        gunnery: 1,
        defense: 6,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : true,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : true,
        },
        ranged: [
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    NousjadeulGer: {
        name: 'Nousjadeul-Ger',
        speed: 5,
        piloting: 3,
        gunnery: 2,
        defense: 6,
        damage: 10,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'NousjadeulGerChargedParticleCannon', 'NousjadeulGer64mmGrenadeLauncher',
            'NousjadeulGer32mmPlasmaMachinePistol'
        ],
        handtohand: [
            'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    NousgarmaGer: {
        name: 'Nousgarma-Ger',
        speed: 10,
        piloting: 3,
        gunnery: 2,
        defense: 6,
        damage: 10,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'Regult313mmMRM', 'NousjadeulGer64mmGrenadeLauncher',
        'NousjadeulGer32mmPlasmaMachinePistol'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QueadluunRau: {
        name: 'Queadluun-Rau',
        speed: 12,
        piloting: 3,
        gunnery: 3,
        defense: 6,
        damage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : true,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'QueadluunRau64mmGrenadeLauncher', 'QueadluunRauMedParticleCannons',
            'QueadluunRau103mmMiniMissiles'
        ],
        handtohand: [
            'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QueadluunGult: {
        name: 'Queadluun-Gult',
        speed: 12,
        piloting: 3,
        gunnery: 3,
        defense: 6,
        damage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : true,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'QueadluunRau64mmGrenadeLauncher', 'QueadluunRauMedParticleCannons',
        'QueadluunGult103mmMiniMissiles', 'QueadluunGultHvyParticleCannons'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    QuelRegult: {
        name: 'Quel-Regult',
        speed: 6,
        piloting: 3,
        gunnery: '-',
        defense: 6,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
        extraabilities: {
            'Advanced Reconnaissance Suite': 'Spend 2 command points to give +1 to strike to mecha within 12\'',
            'Electronic Attack Suite': 'Spend 1 command point to give -1 to strike to enemy mecha within 24\'',
        }
    },
    Regult: {
        name: 'Regult',
        speed: 5,
        piloting: 2,
        gunnery: 1,
        defense: 6,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : true,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 'RegultAirDefenseLasers'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ]
    },
    SerauhaugRegult: {
        name: 'Serauhaug-Regult',
        speed: 4,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'RegultHeavyParticleCannons', 'RegultAutoCannons', 
            'Regult791mmBallisticMissile'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
    },
    TelnestaRegult: {
        name: 'Telnesta-Regult',
        speed: 4,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 5,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : true,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'RegultHeavyParticleCannons', 'RegultAutoCannons',
        'RegultDualChargedParticleCannons'
        ],
        handtohand: [
        'Body Block', 'Kick', 'Jump Kick', 'Stomp'
        ],
    },
    // UEDF
    Tomahawk: {
        name: 'Tomahawk',
        speed: 5,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 19,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'HPC155CParticleCannon', 'DualTZIVGunClusters', 'MDSL12MultipleMissilePods',
            'MDSM6AirDefenseMissilePod', 'RDS2RocketLauncherBoxes',
            'GAU20A150CalMachineguns'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Stomp'
        ],
    },
    Defender: {
        name: 'Defender',
        speed: 6,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 11,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'M99678mmAutoCannon'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Jump Kick', 'Punch', 'Stomp'
        ],
    },
    Phalanx: {
        name: 'Phalanx',
        speed: 5,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 11,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'MDSH22DerringerMissileLaunchers'
        ],
        handtohand: [
            'Body Block', 'Kick', 'Stomp'
        ],
    },
    Spartan: {
        name: 'Spartan',
        speed: 7,
        piloting: 2,
        gunnery: 2,
        defense: 6,
        damage: 16,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : true,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'MDSL12MultipleMissilePods', 'TZIVGunClusters', 'LWS20PointDefenseLaserTurret'
        ],
        handtohand: [
            'Body Block', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ],
        extraabilities: {
            'Brawler': '1 free hand to hand attack per turn.  All hand to hand attacks do +2 MDC',
        }
    },
    VF1AValkyrie: {
        name: 'VF-1A Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieHeadLaser',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 2,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 10,
                piloting: 3,
                gunnery: 2,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 2,
                gunnery: 2,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser'
                ],
                handtohand: [
                    'None'
                ],
            }
        }
    },
    SuperVF1AValkyrie: {
        name: 'Super VF-1A Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'VF1AValkyrie',
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieHeadLaser',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 2,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
                piloting: 3,
                gunnery: 2,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
                piloting: 2,
                gunnery: 2,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieHeadLaser', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    VF1DValkyrie: {
        name: 'VF-1D Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        extraabilities: {
            'Dual Pilot': 'An additional weapon system can be fired each turn at no Command Point cost at a GN of 1.',
        },
        modes: {
            Battloid: {
                speed: 5,
                piloting: 3,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                    'None'
                ]
            }
        },
    },
    SuperVF1DValkyrie: {
        name: 'Super VF-1D Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'VF1DValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        extraabilities: {
            'Dual Pilot': 'An additional weapon system can be fired each turn at no Command Point cost at a GN of 1.',
        },
        modes: {
            Battloid: {
                speed: 6,
                piloting: 3,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    VF1JValkyrie: {
        name: 'VF-1J Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 3,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    SuperVF1JValkyrie: {
        name: 'Super VF-1J Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 3,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    VF1SValkyrie: {
        name: 'VF-1S Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
            'GU11Battloid', 'GU11', 'GU11Fighter'
        ],
        modes: {
            Battloid: {
                speed: 5,
                piloting: 4,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Battloid', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                    'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 5,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 4,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                    'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers'
                ],
                handtohand: [
                    'None'
                ]
            }
        },
    },
    SuperVF1SValkyrie: {
        name: 'Super VF-1S Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 4,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 14,
                piloting: 5,
                gunnery: 4,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 16,
                piloting: 4,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    VEF1Valkyrie: {
        name: 'VEF-1 Valkyrie',
        damage: 14,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 1,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
        ],
        extraabilities: {
            'Electroinc Attack Suite': 'When the VEF-1 activates, you may spend a Command Point to inflict a -1 penalty to strike in ranged combat on a single enemy mecha within 24".  Multiple enemy mecha may be affected at a cost of one Command Point per mecha.',
            'Jamming and Sensor Spoofing Pod': 'When the VEF-1 is activated, you may pay 2 Command Points to enable the Jamming and Sensor Spoofing Pod.  While activated the VEF-1 can not be targeted with missiles and any friendly mecha within 12" receive a free Dodge against all incoming fire.  Even missile volleys of 4 or more missiles can be dodged.  This lasts until the VEF-1 activates again.'
        },
        modes: {
            Battloid: {
                speed: 5,
                piloting: 3,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 10,
                piloting: 4,
                gunnery: 2,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 12,
                piloting: 3,
                gunnery: 2,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    VF1RValkyrie: {
        name: 'VF-1R Valkyrie',
        damage: 17,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
            'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
            'GU11Battloid', 'GU11', 'GU11Fighter',
            'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 0,
                gunnery: 0,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'ValkyrieAutoCannon',
                'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 12,
                piloting: 0,
                gunnery: 0,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 14,
                piloting: 0,
                gunnery: 0,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    SuperVF1RValkyrie: {
        name: 'Super VF-1R Valkyrie',
        damage: 17,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': true,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ValkyrieWingHardPoints', 'ValkyrieDualHeadLasers',
        'GU11Battloid', 'GU11', 'GU11Fighter',
        'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
        ],
        modes: {
            Battloid: {
                speed: 7,
                piloting: 0,
                gunnery: 0,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Battloid', 'ValkyrieQuadHeadLasers', 'ValkyrieAutoCannon',
                'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ]
            },
            Guardian: {
                speed: 16,
                piloting: 0,
                gunnery: 0,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 18,
                piloting: 0,
                gunnery: 0,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'GU11Fighter', 'ValkyrieWingHardPoints', 'ValkyrieQuadHeadLasers',
                'ValkyrieAutoCannon', 'ValkyrieMiniMissiles', 'MDSL46HailstormMissilePack'
                ],
                handtohand: [
                'None'
                ]
            }
        },
    },
    ArmoredVF1AValkyrie: {
        name: 'Armored VF-1A Valkyrie',
        speed: 4,
        piloting: 2,
        gunnery: 3,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1AValkyrie',
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieHeadLaser', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    ArmoredVF1DValkyrie: {
        name: 'Armored VF-1D Valkyrie',
        speed: 4,
        piloting: 3,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1DValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ],
        extraabilities: {
            'Dual Pilot': 'An additional weapon system can be fired each turn at no Command Point cost at a GN of 1.',
        }
    },
    ArmoredVF1JValkyrie: {
        name: 'Armored VF-1J Valkyrie',
        speed: 4,
        piloting: 3,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    ArmoredVF1SValkyrie: {
        name: 'Armored VF-1S Valkyrie',
        speed: 4,
        piloting: 4,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1SValkyrie',
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieQuadHeadLasers', 'MDSL70BarrageMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    Monster: {
        name: 'Monster',
        speed: 3,
        piloting: 2,
        gunnery: 3,
        defense: 7,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : true,
            'Fast Mover'          : false,
            'Flight'              : false,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'MonsterQuadM400ArtilleryCannon', 'DualMMDS12MultipleMissleLaunchers'
        ],
        handtohand: [
        'Body Block', 'Kick', 'Punch', 'Power Punch', 'Stomp'
        ],
        extraabilities: {
            'Quad Cannon Salvo': 'Double the MD of the Quad M-400 Cannons before you roll to hit.  If you do, they can\'t be used during the next turn and two points of ammo are used.',
        }
    },
    JotunArmoredVF1AValkyrie: {
        name: 'Jotun Armored VF-1A Valkyrie',
        speed: 4,
        piloting: 2,
        gunnery: 3,
        defense: 5,
        damage: 14,
        extradamage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1AValkyrie',
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieHeadLaser', 'MDSL23HailstormMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    JotunArmoredVF1DValkyrie: {
        name: 'Jotun Armored VF-1D Valkyrie',
        speed: 4,
        piloting: 3,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL23HailstormMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ],
        extraabilities: {
            'Dual Pilot': 'An additional weapon system can be fired each turn at no Command Point cost at a GN of 1.',
        }
    },
    JotunArmoredVF1JValkyrie: {
        name: 'Jotun Armored VF-1J Valkyrie',
        speed: 4,
        piloting: 3,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 12,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1JValkyrie',
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieDualHeadLasers', 'MDSL23HailstormMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    JotunArmoredVF1SValkyrie: {
        name: 'Jotun Armored VF-1S Valkyrie',
        speed: 4,
        piloting: 4,
        gunnery: 4,
        defense: 5,
        damage: 14,
        extradamage: 8,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : true,
            'Hover'               : false,
            'Jettison'            : 'VF1SValkyrie',
            'Leadership'          : 3,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'GU11Battloid', 'ValkyrieQuadHeadLasers', 'MDSL23HailstormMissilePack'
        ],
        handtohand: [
        'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch', 'Power Punch', 'Stomp'
        ]
    },
    YF4Veritech: {
        name: 'YF-4 Veritech',
        damage: 16,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 2,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 11,
                piloting: 3,
                gunnery: 2,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 14,
                piloting: 2,
                gunnery: 2,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    FlightLeadYF4Veritech: {
        name: 'Flight Lead YF-4 Veritech',
        damage: 16,
        extradamage: 0,
        abilities: {
            'Afterburner'         : false,
            'Aircraft'            : false,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : 2,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : true,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
        ],
        modes: {
            Battloid: {
                speed: 6,
                piloting: 2,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Jump Kick', 'Punch',
                'Power Punch', 'Stomp'
                ],
            },
            Guardian: {
                speed: 11,
                piloting: 4,
                gunnery: 3,
                defense: 5,
                abilities: {
                    'Afterburner'         : false,
                    'Aircraft'            : false,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : false,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : true,
                    'Hover'               : true,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'Body Block', 'Club', 'Grab', 'Kick', 'Punch'
                ]
            },
            Fighter: {
                speed: 14,
                piloting: 3,
                gunnery: 3,
                defense: 6,
                abilities: {
                    'Afterburner'         : true,
                    'Aircraft'            : true,
                    'Battloid Restriction': false,
                    'Cumbersome'          : false,
                    'Fast Mover'          : true,
                    'Flight'              : false,
                    'Focus Fire'          : false,
                    'Hands'               : false,
                    'Hover'               : false,
                    'Jettison'            : false,
                    'Leadership'          : false,
                    'Leap'                : false,
                    'Life is Cheap'       : false,
                    'Variable Modes'      : false,
                    'Zentraidi Infantry'  : false,
                },
                ranged: [
                'YF4DualLLW60BeamCannons', 'ValkyrieMiniMissiles', 'YF4LongRangeMissiles'
                ],
                handtohand: [
                'None'
                ],
            }
        }
    },
    QF3000Ghost: {
        name: 'QF-3000 Ghost',
        speed: 10,
        piloting: 1,
        gunnery: 1,
        defense: 6,
        damage: 9,
        extradamage: 0,
        abilities: {
            'Afterburner'         : true,
            'Aircraft'            : true,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'ARLENMk730mmAutoCannons', 'MDRSRS5SRMLaunchers', 'MDRSRS5MRMLaunchers'
        ],
        handtohand: [
        'None'
        ],
        extraabilities: {
            'Dual MDRS-RF-5 Missile Launchers': 'Carry both short and medium range missiles and can fire either.  Only one kind may be fired each turn.',
        }
    },
    SF3ALancerII: {
        name: 'SF-3A Lancer II',
        speed: 11,
        piloting: 2,
        gunnery: 2,
        defense: 5,
        damage: 11,
        extradamage: 0,
        abilities: {
            'Afterburner'         : true,
            'Aircraft'            : true,
            'Battloid Restriction': false,
            'Cumbersome'          : false,
            'Fast Mover'          : false,
            'Flight'              : true,
            'Focus Fire'          : false,
            'Hands'               : false,
            'Hover'               : false,
            'Jettison'            : false,
            'Leadership'          : false,
            'Leap'                : false,
            'Life is Cheap'       : false,
            'Variable Modes'      : false,
            'Zentraidi Infantry'  : false,
        },
        ranged: [
        'DoubleBarreledPlasmaBeamCannon', 'MDSL12ShortRangeLauncher'
        ],
        handtohand: [
        'None'
        ],
        extraabilities: {
        }
    },
}

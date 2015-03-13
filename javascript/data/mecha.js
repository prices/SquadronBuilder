/**
* This is where weapons are specified
*
* @category   JavaScript
* @package    Weapons
* @subpackage JavaScript
* @author     Scott Price <prices@dflytech.com>
* @copyright  2015 Scott Price
* @link       http://github.com/prices/SquadronBuilder
*/
SquadronBuilder.data.mecha = {
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
            'NousjadeulGerChargedParticleCannon', 'NousjadeulGer64mmGrenadeLauncher',
            'NousjadeulGer32mmPlasmaMachinePistol'
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
            'Leadership'          : false,
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
            'Leadership'          : false,
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
}

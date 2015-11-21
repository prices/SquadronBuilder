//
// The core force cards are specified here
//
SquadronBuilder.force.characters = {
    /*******************************************************************
     *         Zentraedi
     *******************************************************************/
    Azonia: {
        name: "Azonia",
        mecha: [
            "Glaug", "GlaugEldare", "QueadluunRau"
        ],
        points: 5,
        factions: ["Zentraedi", "Malcontents"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Breetai: {
        name: "Breetai",
        mecha: [
        "SerauGer", "GluuGer"
        ],
        points: 20,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 5);
            mecha.changeStat("gunnery", 2);
            mecha.changeStat("piloting", 2);
            mecha.addExtraAbility(
                "High Lord",
                "Whenever Breetai is taking damage, any amount of it may be redirected \nto friendly mecha within 4 inches of him in any combination his player \nchooses.  Hand to hand attachks made by Breetai do double their normal\n damage, and Breetai can make 2 additional hand to hand attacks per turn for free."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Khyron: {
        name: "Khyron",
        mecha: [
        "Glaug", "GlaugEldare", "NousjadeulGer", "SerauGer", "GluuGer"
        ],
        points: 10,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addExtraAbility(
                "The Backstabber",
                "When Khyron's squadron activates, his player may destroy a Mecha \nfrom his squadron, within 8 inches of him, to gain 3 Command Points.\nRegults destroyed in this way cannot be set aside to possibly return \nas Reinforcements."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    MiriyaParina: {
        name: "Miriya-Parina",
        mecha: [
        "QueadluunRau"
        ],
        points: 10,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 2);
            mecha.addExtraAbility(
                "Agressive",
                "Miriya can re-roll all of her Strike rolls.  Remember, no single \nroll can be re-rolled more than once."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Grell: {
        name: "Grell",
        mecha: [
        "Regult", "Glaug", "GlaugEldare", "NousjadeulGer", "NousgarmaGer", "SerauGer", "GluuGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Calling for Reinforcements",
                "Regults from Grell's squadron destroyed within 8 inches of him may \nbe put aside to return as Reinforcements even if he doesn't have line\n of sight to them.  Grell may set aside Regults from his squadron as \nReinforcements no matter what mecha he is piloting."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Grell2: {
        name: "Grell",
        mecha: [
        "Regult", "Glaug", "GlaugEldare", "NousjadeulGer", "NousgarmaGer", "SerauGer", "GluuGer"
        ],
        points: 15,
        factions: ["Malcontents"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.changeStat("gunnery", 1);
            mecha.addExtraAbility(
                "Devastating Firepower",
                "All of Grell's weapon systems gain the Overwhelming and Rapid Fire abilities."
            );

        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Maloquinn: {
        name: "Maloquinn",
        mecha: [
        "NousjadeulGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
            mecha.replaceWeapon("NousjadeulGer32mmPlasmaMachinePistol", "Maloquinn32mmPlasmaMachinePistol");
            mecha.addWeapon("Maloquinn32mmPlasmaMachinePistol");
            mecha.addExtraAbility(
                "Watch the Skies",
                "Maloquinn's 32mm Plasma Machine Pistols get the Anti-Missile ability."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    PirionGalarr: {
        name: "Pirion-Galarr",
        mecha: [
        "Regult"
        ],
        points: 20,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Swarm",
                "Once per game, when Pirion-Galarr's squadron is activated, all of \nthe mecha in the squadron can automatically boost their SPD once that \nturn without paying any Command Points or making Piloting rolls."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    PolusMjor: {
        name: "Polus-Mjor",
        mecha: [
        "NousjadeulGer"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addHandToHand('Club');
            mecha.addExtraAbility(
                'Spartan Shock Baton',
                'Clubbing weapon. Reduces target\'s speed to 0 for the turn.  Target \ncan not spend Command Points to leave hand to hand combat.'
            );
            mecha.addExtraAbility(
                "Up Close and Personal",
                "Polus-Mjor may make an additional hand to hand attack each turn for free."
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    SulreenTehr: {
        name: "Sulreen-Tehr",
        mecha: [
        "Gnerl"
        ],
        points: 5,
        factions: ["Zentraedi"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Experienced Pilot',
                'When Sulreen-Tehr turns an Aircraft he is piloting, it can be turned \nto face any direction.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    /*******************************************************************
     *         UEDF
     *******************************************************************/
    RoyFokker: {
        name: "Roy Fokker",
        mecha: [
        "VF1SValkyrie",
        "ArmoredVF1SValkyrie",
        "SuperVF1SValkyrie",
        "JotunVF1SValkyrie"
        ],
        points: 30,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("gunnery", 1);
            mecha.changeAbility("Leadership", 1);
            mecha.addExtraAbility(
                'Double Ace',
                'Roy may attempt to Dodge twice per turn without paying Command Points.'
            );
            mecha.addExtraAbility(
                'Iron Will',
                'When Roy\'s mecha runs out of MDC, roll a D6.  On a roll of 4+, Roy \nisn\'t destroyed until the end of the next turn, and will remain on \nthe board, even if he suffers more damage, until then.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    RickHunter: {
        name: "Rick Hunter",
        mecha: [
        "VF1SValkyrie", "VF1JValkyrie", "VF1AValkyrie", "Spartan",
        "ArmoredVF1SValkyrie", "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1SValkyrie", "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1SValkyrie", "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("piloting", 1);
            mecha.addExtraAbility(
                'Natural Pilot',
                'Rick can boost his SPD once automatically each turn without paying \nCommand Points or making a Piloting roll.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    BenDixon: {
        name: "Ben Dixon",
        mecha: [
        "VF1AValkyrie",
        "ArmoredVF1AValkyrie",
        "SuperVF1AValkyrie",
        "JotunVF1AValkyrie"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Selfless',
                'When a mecha within 4 inches of Ben\'s VF-1A is hit, his player may \nchoose to have Ben take the hit instead.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    MaxSterling: {
        name: "Max Sterling",
        mecha: [
        "VF1JValkyrie", "VF1AValkyrie",
        "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeStat("gunnery", 1);
            mecha.addExtraAbility(
                'Prescient',
                'Max can re-roll all of his Dodge rolls that fail.  Remember, no single \nroll can be re-rolled more than once.'
            );
            mecha.addExtraAbility(
                'True Love',
                'While Max is within 4 inches of Miriya, and they are in the same army, \nhe gains her Agressive ability as well.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Dietrich: {
        name: "Dietrich",
        mecha: [
        "Tomahawk"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.changeAbility("Leadership", 1);
            mecha.addExtraAbility(
                'Fire at Will',
                'Dietrich can fire 1 additional weapon system per turn for free.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    FreemanDavidoff: {
        name: "Freeman Davidoff",
        mecha: [
        "Defender"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Itchy Trigger Finger',
                'Freeman\'s Defender\'s Dual M-996 78mm Anti-Aircraft Auto-Cannons may \nbe fired one additional time as per Rapid Fire each turn.  So he \ncan attack with the weapon system a total of 3 times per turn, at the \nstandard cost of one Command Point per additional attach.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    KainWeller: {
        name: "Kain Weller",
        mecha: [
        "Spartan"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Charge',
                'Kain can boost his SPD automatically once each turn without paying \nCommand Points or making a Piloting roll.'
            );
            mecha.addExtraAbility(
                'Hand-to-Hand Specialist',
                'Kain can make one additional hand to hand attack per turn for free.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    Magnus: {
        name: "Magnus",
        mecha: [
        "ArmoredVF1AValkyrie"
        ],
        points: 5,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                'Charge',
                'If Magnus hasn\'t moved yet during a turn, his PIL is 3.  This only \napplies while in Armored VF form.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },
    MiriyaSterling: {
        name: "Miriya Sterling",
        mecha: [
        "VF1JValkyrie", "VF1AValkyrie",
        "ArmoredVF1JValkyrie", "ArmoredVF1AValkyrie",
        "SuperVF1JValkyrie", "SuperVF1AValkyrie",
        "JotunVF1JValkyrie", "JotunVF1AValkyrie"
        ],
        points: 10,
        factions: ["UEDF"],
        modifyMecha: function (mecha)
        {
            mecha.addExtraAbility(
                "Agressive",
                "Miriya can re-roll all of her Strike rolls.  Remember, no single \nroll can be re-rolled more than once."
            );
            mecha.addExtraAbility(
                'True Love',
                'While Miriya is within 4 inches of Max, and they are in the same army, \nhe gains his Prescient ability as well.'
            );
        },
        check: function (core)
        {
            mecha = core.getMecha();
            for (key in this.mecha) {
                if (mecha.indexOf(this.mecha[key]) != -1) {
                    return true;
                }
            }
            return false;
        }
    },

}

//
// The core force cards are specified here
//
SquadronBuilder.force.characters = {
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
        "Regult", "Glaug", "GlaugEldare", "NousjadeulGer", "SerauGer", "GluuGer"
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
                'When Sulreen-Tehr turns an Aircraft he is piloting, it can be turned to face any direction.'
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

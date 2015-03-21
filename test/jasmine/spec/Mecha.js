describe("Mecha", function() {

    beforeEach(function() {
    });

    for (wkey in SquadronBuilder.data.mecha) {
        (function (key) {
            var mecha = SquadronBuilder.data.mecha[key];
            describe(key+ " has a name that", function() {
                var min = 5;
                var max = 40;
                it("is a string", function() {
                    expect(typeof mecha.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(mecha.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(mecha.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a extradamage that", function() {
                var min = 0;
                var max = 20;
                it("is an integer or not set", function() {
                    if (typeof mecha.extradamage == 'number') {
                        expect(mecha.extradamage).toBe(parseInt(mecha.extradamage));
                    } else {
                        expect(typeof mecha.extradamage).toBe('undefined');
                    }
                });
                if (typeof mecha.extradamage != 'undefined') {
                    it("is greater than or equal to "+min, function() {
                        expect(mecha.extradamage).toBeGreaterThan(min - 1);
                    });
                    it("is less than or equal to "+max, function() {
                        expect(mecha.extradamage).toBeLessThan(max + 1);
                    });
                }
            });
            describe(key+ " has a damage that", function() {
                var min = 1;
                var max = 60;
                var damage = parseInt(mecha.damage, 10);
                it("is an integer or of the form X/missile", function() {
                    if (mecha.damage !== damage) {
                        expect(mecha.damage).toBe(damage+"/missile");
                    } else {
                        expect(mecha.damage).toBe(damage);
                    }
                });
                it("is greater than or equal to "+min, function() {
                    expect(damage).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max, function() {
                    expect(damage).toBeLessThan(max + 1);
                });
            });
            var abilities = [
                'Afterburner', 'Aircraft', 'Battloid Restriction',
                'Cumbersome', 'Fast Mover', 'Flight', 'Focus Fire', 'Hands', 'Hover',
                'Leap', 'Life is Cheap', 'Variable Modes', 'Zentraedi Infantry'
            ];

            describe(key+ " has its abilities set as ", function() {
                for (akey in abilities) {
                    (function (k) {
                        it(abilities[k]+" set to true or false", function() {
                            expect(mecha.abilities[abilities[k]]).toBeBoolean();
                        });
                    })(akey);
                }
                it("Leadership set to false or an integer", function() {
                    expect(mecha.abilities['Leadership']).toBeFalseOrInt();
                });
                it("Jettison set to false or a mecha", function() {
                    if (typeof mecha.abilities['Jettison'] == 'string') {
                        expect(mecha.abilities['Jettison']).toBeDefinedMecha();
                    } else {
                        expect(mecha.abilities['Jettison']).toBeFalsy();
                    }
                });
            });
            // extra tests for variable modes
            if (typeof mecha.modes == 'object') {
                for (mkey in SquadronBuilder.data.mecha[key].modes) {
                    (function (kkey) {
                        var mode = SquadronBuilder.data.mecha[key].modes[kkey];

                        var abilities = ['Afterburner', 'Aircraft', 'Battloid Restriction',
                        'Cumbersome', 'Fast Mover', 'Flight', 'Focus Fire', 'Hands', 'Hover',
                        'Leap'];

                        describe(key + " mode "+kkey+" has its abilities set as ", function() {
                            for (akey in abilities) {
                                (function (k) {
                                    it(abilities[k]+" set to true or false", function() {
                                        expect(mode.abilities[abilities[k]]).toBeBoolean();
                                    });
                                })(akey);
                            }
                            it("Zentraedi Infantry set to false", function() {
                                expect(mode.abilities['Zentraedi Infantry']).toBeFalsy();
                            });
                            it("Life is Cheap set to false", function() {
                                expect(mode.abilities['Life is Cheap']).toBeFalsy();
                            });
                            it("Variable Modes set to false", function() {
                                expect(mode.abilities['Variable Modes']).toBeFalsy();
                            });
                            it("Leadership set to false", function() {
                                expect(mode.abilities['Leadership']).toBeFalsy();
                            });
                            it("Jettison set to false", function() {
                                expect(mode.abilities['Jettison']).toBeFalsy();
                            });
                        });

                        describe(key+ " has a gunnery that", function() {
                            var min = 0;
                            var max = 20;
                            it("is an integer", function() {
                                if (typeof mode.gunnery == 'number') {
                                    expect(mode.gunnery).toBe(parseInt(mode.gunnery));
                                } else {
                                    expect(mode.gunnery).toBe('-');
                                }
                            });
                            if (typeof mode.gunnery === 'number') {
                                it("is greater than or equal to "+min, function() {
                                    expect(mode.gunnery).toBeGreaterThan(min - 1);
                                });
                                it("is less than or equal to "+max, function() {
                                    expect(mode.gunnery).toBeLessThan(max + 1);
                                });
                            }
                        });
                        describe(key+ " has a piloting that", function() {
                            var min = 0;
                            var max = 20;
                            it("is an integer", function() {
                                expect(mode.piloting).toBe(parseInt(mode.piloting));
                            });
                            it("is greater than or equal to "+min, function() {
                                expect(mode.piloting).toBeGreaterThan(min - 1);
                            });
                            it("is less than or equal to "+max, function() {
                                expect(mode.piloting).toBeLessThan(max + 1);
                            });
                        });
                        describe(key+ " has a defense that", function() {
                            var min = 5;
                            var max = 20;
                            it("is an integer", function() {
                                expect(mode.defense).toBe(parseInt(mode.defense));
                            });
                            it("is greater than or equal to "+min, function() {
                                expect(mode.defense).toBeGreaterThan(min - 1);
                            });
                            it("is less than or equal to "+max, function() {
                                expect(mode.defense).toBeLessThan(max + 1);
                            });
                        });
                        describe(key+ " has a speed that", function() {
                            var min = 3;
                            var max = 20;
                            it("is an integer", function() {
                                expect(mode.speed).toBe(parseInt(mode.speed));
                            });
                            it("is greater than or equal to "+min, function() {
                                expect(mode.speed).toBeGreaterThan(min - 1);
                            });
                            it("is less than or equal to "+max, function() {
                                expect(mode.speed).toBeLessThan(max + 1);
                            });
                        });
                        describe(key+ " weapons that are ", function() {
                            for (qkey in mode.ranged) {
                                (function (q) {
                                    it(mode.ranged[q]+" is a defined weapon", function() {
                                        expect(mecha.ranged[q]).toBeDefinedWeapon();
                                    });
                                })(qkey);
                            }
                        });
                        describe(key+ " hand to hand attacks that are ", function() {
                            for (tkey in mode.handtohand) {
                                (function (t) {
                                    it(mode.handtohand[t]+" is valid ", function() {
                                        expect(mode.handtohand[t]).toBeValidHandToHand();
                                    });
                                })(tkey);
                            }
                        });

                    })(mkey);
                }
            } else {
                describe(key+ " has a gunnery that", function() {
                    var min = 0;
                    var max = 20;
                    it("is an integer", function() {
                        if (typeof mecha.gunnery == 'number') {
                            expect(mecha.gunnery).toBe(parseInt(mecha.gunnery));
                        } else {
                            expect(mecha.gunnery).toBe('-');
                        }
                    });
                    if (typeof mecha.gunnery === 'number') {
                        it("is greater than or equal to "+min, function() {
                            expect(mecha.gunnery).toBeGreaterThan(min - 1);
                        });
                        it("is less than or equal to "+max, function() {
                            expect(mecha.gunnery).toBeLessThan(max + 1);
                        });
                    }
                });
                describe(key+ " has a piloting that", function() {
                    var min = 0;
                    var max = 20;
                    it("is an integer", function() {
                        expect(mecha.piloting).toBe(parseInt(mecha.piloting));
                    });
                    it("is greater than or equal to "+min, function() {
                        expect(mecha.piloting).toBeGreaterThan(min - 1);
                    });
                    it("is less than or equal to "+max, function() {
                        expect(mecha.piloting).toBeLessThan(max + 1);
                    });
                });
                describe(key+ " has a defense that", function() {
                    var min = 5;
                    var max = 20;
                    it("is an integer", function() {
                        expect(mecha.defense).toBe(parseInt(mecha.defense));
                    });
                    it("is greater than or equal to "+min, function() {
                        expect(mecha.defense).toBeGreaterThan(min - 1);
                    });
                    it("is less than or equal to "+max, function() {
                        expect(mecha.defense).toBeLessThan(max + 1);
                    });
                });
                describe(key+ " has a speed that", function() {
                    var min = 3;
                    var max = 20;
                    it("is an integer", function() {
                        expect(mecha.speed).toBe(parseInt(mecha.speed));
                    });
                    it("is greater than or equal to "+min, function() {
                        expect(mecha.speed).toBeGreaterThan(min - 1);
                    });
                    it("is less than or equal to "+max, function() {
                        expect(mecha.speed).toBeLessThan(max + 1);
                    });
                });
                describe(key+ " weapons that are ", function() {
                    for (var rkey in mecha.ranged) {
                        (function (r) {
                            it(mecha.ranged[r]+" is a defined weapon", function() {
                                expect(mecha.ranged[r]).toBeDefinedWeapon();
                            });
                        })(rkey);
                    }
                });
                describe(key+ " hand to hand attacks that are ", function() {
                    for (var skey in mecha.handtohand) {
                        (function (s) {
                            it(mecha.handtohand[s]+" is valid ", function() {
                                expect(mecha.handtohand[s]).toBeValidHandToHand();
                            });
                        })(skey);
                    }
                });

            }
        })(wkey);
    }
});

describe("Core Force", function() {

    beforeEach(function() {
    });

    for (var wkey in SquadronBuilder.force.core) {
        (function (key) {
            var core = SquadronBuilder.force.core[key];
            describe(key+ " have a key that", function() {
                it("is a valid HTML ID", function() {
                    expect(key).toBeValidID();
                });
            });
            describe(key+ " have a name that", function() {
                var min = 5;
                var max = 45;
                it("is a string", function() {
                    expect(typeof core.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(core.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(core.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a mecha element that", function() {
                it("is an object ", function() {
                    expect(typeof core.mecha).toBe('object');
                });
                for (var mecha in core.mecha) {
                    (function (m) {
                        it(m+" is a defined mecha", function() {
                            expect(m).toBeDefinedMecha();
                        });
                    })(mecha);
                    it("More than zero "+mecha+" are defined", function() {

                        expect(core.mecha[mecha]).toBeGreaterThan(0);
                    });
                }
            });
            describe(key+ " has a factions element that", function() {
                it("is an array ", function() {
                    expect(typeof core.factions).toBe('object');
                });
                for (var rkey in core.factions) {
                    (function (r) {
                        it(core.factions[r]+" is a defined faction", function() {
                            expect(core.factions[r]).toBeValidFaction();
                        });
                    })(rkey);
                }
            });
            describe(key+ " has points defined that", function() {
                var min = 1;
                var max = 200;
                it("is a number", function() {
                    expect(typeof core.points).toBe("number");
                });
                it("is greater than 0", function() {

                    expect(core.points).toBeGreaterThan(min - 1);
                });
                it("is less than 200", function() {
                    expect(core.points).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a upgrades element that", function() {
                it("is an object ", function() {
                    expect(typeof core.upgrades).toBe('object');
                });
                for (var rkey in core.upgrades) {
                    (function (r) {
                        it(r+" is a defined upgrade", function() {
                            expect(r).toBeDefinedUpgrade();
                        });
                    })(rkey);
                    it("and zero or more points are defined for "+core.upgrades[rkey], function() {

                        expect(core.upgrades[rkey]).toBeGreaterThan(-1);
                    });
                }
            });
        })(wkey);
    }
});

describe("Support Force", function() {

    beforeEach(function() {
    });

    for (var wkey in SquadronBuilder.force.support) {
        (function (key) {
            var support = SquadronBuilder.force.support[key];
            describe(key+ " have a key that", function() {
                it("is a valid HTML ID", function() {
                    expect(key).toBeValidID();
                });
            });
            describe(key+ " have a name that", function() {
                var min = 5;
                var max = 45;
                it("is a string", function() {
                    expect(typeof support.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(support.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(support.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a mecha element that", function() {
                it("is an object ", function() {
                    expect(typeof support.mecha).toBe('object');
                });
                for (var mecha in support.mecha) {
                    (function (m) {
                        it(m+" is a defined mecha", function() {
                            expect(m).toBeDefinedMecha();
                        });
                    })(mecha);
                    it("More than zero "+mecha+" are defined", function() {

                        expect(support.mecha[mecha]).toBeGreaterThan(0);
                    });
                }
            });
            describe(key+ " has a factions element that", function() {
                it("is an array ", function() {
                    expect(typeof support.factions).toBe('object');
                });
                for (var rkey in support.factions) {
                    (function (r) {
                        it(support.factions[r]+" is a defined faction", function() {
                            expect(support.factions[r]).toBeValidFaction();
                        });
                    })(rkey);
                }
            });
            describe(key+ " has points defined that", function() {
                var min = 1;
                var max = 200;
                it("is a number", function() {
                    expect(typeof support.points).toBe("number");
                });
                it("is greater than 0", function() {

                    expect(support.points).toBeGreaterThan(min - 1);
                });
                it("is less than 200", function() {
                    expect(support.points).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a upgrades element that", function() {
                it("is an object ", function() {
                    expect(typeof support.upgrades).toBe('object');
                });
                for (var rkey in support.upgrades) {
                    (function (r) {
                        it(r+" is a defined upgrade", function() {
                            expect(r).toBeDefinedUpgrade();
                        });
                    })(rkey);
                    it("and zero or more points are defined for "+support.upgrades[rkey], function() {

                        expect(support.upgrades[rkey]).toBeGreaterThan(-1);
                    });
                }
            });
            describe(key+ " has an execute element that", function() {
                it("is an function ", function() {
                    expect(typeof support.execute).toBe('function');
                });
            });
            describe(key+ " has a check element that", function() {
                it("is an function ", function() {
                    expect(typeof support.check).toBe('function');
                });
            });
        })(wkey);
    }
});

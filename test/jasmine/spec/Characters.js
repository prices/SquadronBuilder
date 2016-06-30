describe("Characters ", function() {

    beforeEach(function() {
    });

    for (var wkey in SquadronBuilder.force.characters) {
        (function (key) {
            var characters = SquadronBuilder.force.characters[key];
            describe(key+ " have a key that", function() {
                it("is a valid HTML ID", function() {
                    expect(key).toBeValidID();
                });
            });
            describe(key+ " have a name that", function() {
                var min = 5;
                var max = 45;
                it("is a string", function() {
                    expect(typeof characters.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characterss", function() {

                    expect(characters.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characterss", function() {
                    expect(characters.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a mecha element that", function() {
                it("is an array ", function() {
                    expect(typeof characters.mecha).toBe('object');
                });
                for (var mecha in characters.mecha) {
                    (function (m) {
                        it(m+" is a defined mecha", function() {
                            expect(m).toBeDefinedMecha();
                        });
                    })(characters.mecha[mecha]);
                }
            });
            describe(key+ " has a factions element that", function() {
                it("is an array ", function() {
                    expect(typeof characters.factions).toBe('object');
                });
                for (var rkey in characters.factions) {
                    (function (r) {
                        it(characters.factions[r]+" is a defined faction", function() {
                            expect(characters.factions[r]).toBeValidFaction();
                        });
                    })(rkey);
                }
            });
            describe(key+ " has points defined that", function() {
                var min = 1;
                var max = 200;
                it("is a number", function() {
                    expect(typeof characters.points).toBe("number");
                });
                it("is greater than 0", function() {

                    expect(characters.points).toBeGreaterThan(min - 1);
                });
                it("is less than 200", function() {
                    expect(characters.points).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has an modifyMecha element that", function() {
                it("is an function ", function() {
                    expect(typeof characters.modifyMecha).toBe('function');
                });
            });
            describe(key+ " has a check element that", function() {
                it("is an function ", function() {
                    expect(typeof characters.check).toBe('function');
                });
            });
        })(wkey);
    }
});

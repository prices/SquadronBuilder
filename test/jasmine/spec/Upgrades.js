describe("Upgrades", function() {

    beforeEach(function() {
    });

    for (var wkey in SquadronBuilder.force.upgrades) {
        (function (key) {
            var upgrade = SquadronBuilder.force.upgrades[key];
            describe(key+ " have a key that", function() {
                it("is a valid HTML ID", function() {
                    expect(key).toBeValidID();
                });
            });
            describe(key+ " have a name that", function() {
                var min = 5;
                var max = 45;
                it("is a string", function() {
                    expect(typeof upgrade.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(upgrade.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(upgrade.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " have a description that", function() {
                var min = 5;
                var max = 300;
                it("is a string", function() {
                    expect(typeof upgrade.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(upgrade.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(upgrade.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a execute element that", function() {
                it("is an function ", function() {
                    expect(typeof upgrade.execute).toBe('function');
                });
            });
            describe(key+ " has a blocks element that", function() {
                it("is an array ", function() {
                    expect(typeof upgrade.blocks).toBe('object');
                });
                for (var rkey in upgrade.blocks) {
                    (function (r) {
                        it(upgrade.blocks[r]+" is a defined upgrade", function() {
                            expect(upgrade.blocks[r]).toBeDefinedUpgrade();
                        });
                    })(rkey);
                }
            });
        })(wkey);
    }
});

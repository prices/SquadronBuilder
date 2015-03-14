describe("Weapons", function() {
    var player;
    var song;

    beforeEach(function() {
    });

    for (wkey in SquadronBuilder.data.weapons) {
        (function (key) {
            var weapon = SquadronBuilder.data.weapons[key];
            describe(key+ " has a name that", function() {
                var min = 5;
                var max = 40;
                it("is a string", function() {
                    expect(typeof weapon.name).toBe("string");
                });
                it("is greater than or equal to "+min+" characters", function() {

                    expect(weapon.name.length).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max+" characters", function() {
                    expect(weapon.name.length).toBeLessThan(max + 1);
                });
            });
            describe(key+ " has a range that", function() {
                var min = 5;
                var max = 60;
                it("is an integer or '-'", function() {
                    if (weapon.range === '-') {
                        expect(weapon.range).toBe('-');
                    } else {
                        expect(weapon.range).toBe(parseInt(weapon.range));
                    }
                });
                if (weapon.range !== '-') {
                    it("is greater than or equal to "+min, function() {
                        expect(weapon.range).toBeGreaterThan(min - 1);
                    });
                    it("is less than or equal to "+max, function() {
                        expect(weapon.range).toBeLessThan(max + 1);
                    });
                }
            });
            describe(key+ " has a damage that", function() {
                var min = 1;
                var max = 60;
                var damage = parseInt(weapon.damage, 10);
                it("is an integer or of the form X/missile", function() {
                    if (weapon.damage !== damage) {
                        expect(weapon.damage).toBe(damage+"/missile");
                    } else {
                        expect(weapon.damage).toBe(damage);
                    }
                });
                it("is greater than or equal to "+min, function() {
                    expect(damage).toBeGreaterThan(min - 1);
                });
                it("is less than or equal to "+max, function() {
                    expect(damage).toBeLessThan(max + 1);
                });
            });
            var abilities = ['Accurate', 'Anti-Missile', 'Blast', 'Fly Over', 'Inescapable',
            'Indirect Fire', 'Missile', 'Overwhelming', 'Rapid Fire',
            'Rear Fire', 'Split Fire', 'Volley X'];

            describe(key+ " has its abilities set as ", function() {
                for (akey in abilities) {
                    (function (k) {
                        it(abilities[k]+" set to true or false", function() {
                            expect(weapon.abilities[abilities[k]]).toBeBoolean();
                        });
                    })(akey);
                }
                it("Ammo set to false or an integer", function() {
                    expect(weapon.abilities['Ammo']).toBeFalseOrInt();
                });
                it("Volley set to false or an integer", function() {
                    expect(weapon.abilities['Volley']).toBeFalseOrInt();
                });
            });
        })(wkey);
    }
});

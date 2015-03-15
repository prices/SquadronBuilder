beforeEach(function () {
  jasmine.addMatchers({
    toBeFalseOrInt: function () {
      return {
        compare: function (actual, expected) {

          return {
            pass: (actual === false) || (actual === parseInt(actual, 10))
          }
        }
      };
    },
    toBeBoolean: function () {
        return {
            compare: function (actual, expected) {

                return {
                    pass: (actual === false) || (actual === true) || (typeof actual == 'undefined')
                }
            }
        };
    },
    toBeValidHandToHand: function () {
        return {
            compare: function (actual, expected) {
                var types = ["Grab", "Body Block", "Kick", "Jump Kick", "Punch", "Power Punch", "Stomp", "Club", "None"];
                return {
                    pass: types.indexOf(actual) >= 0
                }
            }
        };
    },
    toBeDefinedWeapon: function () {
        return {
            compare: function (actual, expected) {

                return {
                    pass: typeof SquadronBuilder.data.weapons[actual] == 'object'
                }
            }
        };
    },
    toBeDefinedMecha: function () {
        return {
            compare: function (actual, expected) {

                return {
                    pass: typeof SquadronBuilder.data.mecha[actual] == 'object'
                }
            }
        };
    }
  });
});

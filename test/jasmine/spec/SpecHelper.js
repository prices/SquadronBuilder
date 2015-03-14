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
                    pass: (actual === false) || (actual === true)
                }
            }
        };
    }
  });
});

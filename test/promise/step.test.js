(()=>{

  "use strict";

  // TODO: should use import but I really don't like the syntax
  // TODO: is the import scope is limited to the clojure?
  const should = require('chai').should(),
    chain = require("../../lib/promise/chain");

  describe('Step', function() {

    const firstStep = step =>{
      return step.resolve(3);
    };

    const step = chain.step.create(firstStep);
    it("should not have a next step", ()=>{
      should.not.exist(step.getNextStep());
    });

  });

})();

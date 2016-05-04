(()=>{

  "use strict";

  // should use import
  let assert,
    chain;

  assert = require('chai').assert;
  chain = require("../chain");

  describe('Chain with two steps', function() {

    let firstStep = (step)=>{
      console.log("this is a test.");
      return 3;
    };

    let secondStep = (step)=>{
      console.log("this is a test.");
      return 4;
    };

    let m = chain.create();

    m.addStep(chain.step.create(firstStep)).
    addStep(chain.step.create(secondStep)).
    process();

    describe('When #process()', function () {
      it("it should get the return value of the first step", function () {
        assert.equal(3, m.getStepReturnValue(0));
      });

      it("it should get the return value of the second step", function () {
        assert.equal(4, m.getStepReturnValue(1));
      });

      it("it should have a step counter at 2", function () {
        assert.equal(2, m.getNumberOfStepsRun());
      });

    });

  });

})();

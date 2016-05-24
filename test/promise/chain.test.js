(()=>{

  "use strict";

  // TODO: should use import but I really don't like the syntax
  // TODO: is the import scope is limited to the clojure?
  const assert = require('chai').assert,
    expect = require('chai').expect,
    should = require('chai').should(),
    chain = require("../../lib/promise/chain");

  describe('Chain with two successful steps',() => {

    const firstStep = step =>{
      return step.resolve(3);
    };

    const secondStep = step =>{
      return step.resolve(4);
    };

    const m = chain.create();

    m.addStep(chain.step.create(firstStep)).
    addStep(chain.step.create(secondStep));

    it("should return a promise", ()=>{
      return m.process().should.be.a('promise');
    });

    it("should get the return value of the first step", ()=>{
      return m.process().
      then(function(result){
        result[0].should.equal(3);
      });

    });

    it("should get the return value of the second step", ()=>{
      return m.process().
      then(function(result){
        result[1].should.equal(4);
      });
    });

  });

  describe('Chain with one aborted step', ()=>{

    const firstStep = step =>{
      return step.reject("Unable to complete chain.");
    }, errorMessage = "Unable to complete chain.";

    const m = chain.create();

    m.addStep(chain.step.create(firstStep));

    it("should return an error", ()=>{
      return m.process().
      catch(error=>{
        error.should.equal(errorMessage);
      });

    });

  });

})();

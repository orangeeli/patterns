var assert = require('chai').assert;
describe('Chain', function() {

  var chain = require("../chain");

  var test = function(){
    console.log("this is a test.");
    var temp = 3;
    var contextData = this.getContextData();
    if(!contextData){
      contextData = {};
    }
    contextData.temp = 3;
    this.setContextData(contextData);
    this.processNext();
  };

  var m = chain.create();

  m.addStep(chain.step.create(test));
  m.process();

  describe('#indexOf()', function () {
    it("it should have run the chain", function () {
      console.log("The final value: "+m.getContextData().temp);
      assert.equal(3, m.getContextData().temp);
    });
  });
});

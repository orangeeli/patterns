describe("Chain", function() {

  var chain = require("../chain");

  var temp;

  var test = function(){
    console.log("this is a test.");
    temp = 3;
    this.processNext();
  };

  var m = chain.create();

  m.addStep(chain.step.create(test));
  m.process();

  it("it should have run the chain", function() {
    expect(temp).toBe(3);
  });

});

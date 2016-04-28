(()=>{

  "use strict";

  // should use import
  let assert,
    chain;

 // TODO: mudar a forma como acesso ao retorno da funcao => posso ir buscar o nome da funcao com a propriedade name
 // TODO: ver promessas, arrays, unicode em strings e acessors e imports

  assert = require('chai').assert;
  chain = require("../chain");

  describe('Chain', function() {

    let test = (step)=>{
      console.log("this is a test.");
      return 3;
    };

    let test2 = (step)=>{
      console.log("this is a test.");
      return 4;
    };

    let m = chain.create();

    m.addStep(chain.step.create(test));
    m.addStep(chain.step.create(test2));
    m.process();

    describe('#process()', function () {
      it("it should have run the chain", function () {
        console.log("The final value: "+m.getContextData().step0);
        console.log("The final value: "+JSON.stringify(m.getContextData()));
        assert.equal(3, m.getContextData().step0);
      });
    });

  });

}());

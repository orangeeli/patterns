module.exports =
  (function(){

    function Chain(){
      this.context = new Context();
      this.context.setRunner(this);
      this.firstStep = null;
      this.lastStep = null;
    }

    Chain.prototype.process = function(){
      if(!this.firstStep){
        this.context.onComplete();
      }else{
        console.log("Processing the first Step");
        this.firstStep.process(this.firstStep);
      }
    };

    Chain.prototype.onComplete = function(){
    };

    Chain.prototype.getLastRunStepIndex = function() {
      return this.context.getLastRunStepIndex();
    };

    Chain.prototype.getContextData = function(){
      return this.context.getContextData();
    };

    Chain.prototype.addStep = function(step){
      if(!this.firstStep){
        this.firstStep = step;
      }

      if(this.lastStep){
        this.lastStep.setNextStep(step);
      }

      this.lastStep = step;
      this.lastStep.setContext(this.context);
    };

    function Context(){
      this.currentStepIndex = 0;
      this.runner = null;
    }

    Context.prototype.onComplete = function() {
      this.runner.onComplete();
    };

    Context.prototype.incrementStepCounter = function(){
      this.currentStepIndex++;
    };

    Context.prototype.setContextData = function(data){
      this.data = data;
    };

    Context.prototype.setRunner = function(runner){
      this.runner = runner;
    };

    function Step(block){
      this.block = block;

      this.process = function(step){
        console.log("Processing next Step");
        block.call(this);
      }
    }

    /*Step.prototype.process = function(Step){
     console.log("Processing next Step ");
     this.block.call(Step);
     }*/

    Step.prototype.processNext = function(){
      if(!this.nextStep){
        this.context.onComplete();
      }else{
        this.context.incrementStepCounter();

        this.nextStep.process(this.nextStep);
      }
    };

    Step.prototype.interruptStep = function(message){
      this.context.chainInterruption(message);
    };

    Step.prototype.setContext = function(context){
      this.context = context;
    };

    Step.prototype.getContext = function(){
      return this.context;
    };

    Step.prototype.setNextStep = function(step){
      this.nextStep = step;
    };

    Step.prototype.getNextStep = function(){
      return this.nextStep;
    };

    Step.prototype.getContextData = function(){
      return this.context.getContextData();
    };

    // the api
    return {
      create : function(){
        return new Chain();
      },
      step : {
        create : function(f){
          return new Step(f);
        }
      }
    };

  })();

module.exports =
  (()=>{

    "use strict";

    let Context,
      Chain,
      Step;

    let chainFactory,
      stepFactory;

    Context = {
      currentStepIndex : 0,

      onComplete() {
        this.runner.onComplete();
      },
      incrementStepCounter(){
        console.log("The current Step Index: " + this.currentStepIndex);
        this.currentStepIndex++;
      },
      getCurrentStepCounter(){
        return this.currentStepIndex;
      },
      setContextData (data){
        this.data = data;
      },
      getContextData (){
        return this.data;
      },
      setRunner (runner){
        this.runner = runner;
      }
    };

    Chain = {

      context : {},

      process () {
        if(!this.firstStep){
          this.context.onComplete();
        }else{
          console.log("Processing the first Step");
          this.firstStep.process(this.firstStep);
        }
      },
      onComplete (){
      },
      getLastRunStepIndex (){
        return this.context.getCurrentStepCounter();
      },
      getNumberOfStepsRun(){
        return this.context.getCurrentStepCounter()+1;
      },
      getContextData (){
        return this.context.getContextData();
      },
      getStepReturnValue(index){
        return this.context.getContextData()[`step${index}`];
      },
      addStep (step){
        if(!this.firstStep){
          this.firstStep = step;
        }

        if(this.lastStep){
          this.lastStep.setNextStep(step);
        }

        this.lastStep = step;
        this.lastStep.setContext(this.context);

        return this;
      }
    };

    Step = {

      context : {},

      processNext (){
        if(!this.nextStep){
          this.context.onComplete();
        }else{
          console.log("Process next was called!");
          this.context.incrementStepCounter();
          this.nextStep.process();
        }
      },
      // interruptStep (message){
      //   this.context.chainInterruption(message);
      // },
      setContext (context){
        this.context = context;
      },
      getContext (){
        return this.context;
      },
      setNextStep (step){
        this.nextStep = step;
      },
      getNextStep (){
        return this.nextStep;
      },
      getContextData (){
        return this.context.getContextData();
      },
      setContextData (data){
        return this.context.setContextData(data);
      }
    };

    chainFactory = {
      create () {

        let context,
          chain;

        context = Object.assign(Object.create(Context));
        chain = Object.assign(Object.create(Chain), {
          context : context
        });

        context.setRunner(chain);

        return chain;
      }
    };

    stepFactory = {
      create (block) {

        let step;

        step = Object.assign(Object.create(Step), {
          block : block,
          process (){
            console.log("Processing next Step");
            let rValue,
              contextData,
              context;

            rValue = block.call(step);

            console.log(`The function name: ${block.name}`);

            contextData = this.getContextData();
            context = this.getContext();
            if(!contextData){
              contextData = {};
            }
            contextData["step"+context.getCurrentStepCounter()] = rValue;
            this.setContextData(contextData);
            this.processNext();
          }
        });

        return step;
      }
    };

    // the api
    return {
      create (){
        return chainFactory.create();
      },
      step : {
        create (f){
          return stepFactory.create(f);
        }
      }
    };

  })();

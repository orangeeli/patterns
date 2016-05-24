module.exports =
  (()=>{

    "use strict";

    const Step = {

      context : {},

      processNext (){
        if(!this.nextStep){
          return this.context.onComplete();
        }else{
          this.context.incrementStepCounter();
          return this.nextStep.process();
        }
      },
      interruptStep (message){
        return this.context.chainInterruption(message);
      },
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
      },
      resolve (arg){
        return Promise.resolve(arg);
      },
      reject (arg){
        return Promise.reject(arg);
      },
      updateContextData(rValue){
        let contextData,
          context;
        contextData = this.getContextData();
        context = this.getContext();
        contextData.set("step"+context.getCurrentStepCounter(), rValue);
      }
    };

    const create = block => {

      let step;

      step = Object.assign(Object.create(Step), {
        block : block,
        process (){

          return block.call(this, step).
          then(value=>{
            this.updateContextData(value);
            return this.processNext();
          }).catch(message=>{
            // should either break the chain or continue to the next step
            return this.interruptStep(message);
          });
        }
      });

      return step;
    };

    // the api
    return {
      create : create
    };

  })();

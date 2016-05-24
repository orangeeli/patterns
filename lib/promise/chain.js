module.exports =
  (()=>{

    "use strict";

    const Context = require("./context"),
      Step = require("./step");

    // TODO use promises on process to return the results

    /*
      process().
      then(()=>{
      }).catch(()=>{
      });
     */

    // TODO implement rejection

    // TODO steps should have a resolve and a reject method

    // TODO transform this project into a npm module with a well known api and explain which issue is trying to solve

    const Chain = {

      context : {},

      process () {

        // return new Promise((resolve, reject)=>{
        //   if(!this.firstStep){
        //     this.context.onComplete();
        //   }else{
        //     console.log("Processing the first Step");
        //     this.firstStep.process();
        //   }
        // });

        this.context.clear();

        if(!this.firstStep){
          return this.context.onComplete();
        }else{
          return this.firstStep.process();
        }
      },

      onComplete (){
        let contextData,
          values = [];

        contextData = this.getContextData();
        for (var value of contextData.values()) {
          values.push(value);
        }
        return Promise.resolve(values);
      },

      onInterrupt (message){
        return Promise.reject(message);
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

    const create = () => {

      let context,
        chain;

      let contextData = new Map();

      context = Object.assign(Object.create(Context), {
        data : contextData
      });
      chain = Object.assign(Object.create(Chain), {
        context : context
      });

      context.setRunner(chain);

      return chain;
    };
    // the api
    return {
      create : create,
      step : Step
    };

  })();

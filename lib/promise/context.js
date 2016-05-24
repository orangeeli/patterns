module.exports =
  (()=>{
    
    "use strict";

    return {
      currentStepIndex : 0,
      
      onComplete() {
        return this.runner.onComplete();
      },
      incrementStepCounter(){
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
      },

      clear (){
        this.setContextData (new Map());
      },

      chainInterruption (message){
        return this.runner.onInterrupt(message);
      }
      
    };
  })();

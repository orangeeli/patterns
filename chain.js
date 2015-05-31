function manager(){
	this.context = new context();
        this.context.setRunner(this);
        this.firstStep = null;
        this.lastStep = null;
}

manager.prototype.processChain = function(){
	if(!this.firstStep){
		this.context.chainComplete();
	}else{
            console.log("Processing the first step");
		this.firstStep.processStep(this.firstStep);
	}
}
console.log("Test [1]");
manager.prototype.chainComplete = function(){
}

manager.prototype.getLastRunStepIndex = function() {
	return this.context.getLastRunStepIndex();
}
	
manager.prototype.getContextData = function(){
	return this.context.getContextData();
}

manager.prototype.addChainStep = function(step){
	if(!this.firstStep){
		this.firstStep = step;
	}
		
	if(this.lastStep){
		this.lastStep.setNextStep(step);
	}
		
	this.lastStep = step;
	this.lastStep.setContext(this.context);
}

function context(){
	this.currentStepIndex = 0;
        this.runner = null;
}

context.prototype.chainComplete = function() {
		this.runner.chainComplete();
	}

context.prototype.incrementStepCounter = function(){
	this.currentStepIndex++;
}

context.prototype.setContextData = function(data){
	this.data = data;
}

context.prototype.setRunner = function(runner){
	this.runner = runner;
}

function step(block){
	this.block = block;

	this.processStep = function(step){
             console.log("Processing next step");
		block.call(this);
	}
}

/*step.prototype.processStep = function(step){
   console.log("Processing next step ");
   this.block.call(step);
}*/

step.prototype.processNext = function(){
	if(!this.nextStep){
		this.context.chainComplete();
	}else{
		this.context.incrementStepCounter();

		this.nextStep.processStep(this.nextStep);
	}
}

step.prototype.interruptStep = function(message){
	this.context.chainInterruption(message);
}

step.prototype.setContext = function(context){
	this.context = context;
}

step.prototype.getContext = function(){
	return this.context;
}

step.prototype.setNextStep = function(step){
	this.nextStep = step;
}

step.prototype.getNextStep = function(){
	return this.nextStep;
}

step.prototype.getContextData = function(){
	return context.getContextData();
}


var test = function(){
  console.log("this is a test.");
   this.processNext();
};


var m = new manager();
m.addChainStep(new step(test));
m.processChain();





# Patterns 
This is a small project to practice implementation of software design patterns on javascript. 

## Chain

The Chain of responsibility is a design pattern intended to allow a requester issue a context without knowing whom or how many receivers will handle it.

In other words, a sequence of actions can be defined in a particular execution flow yet there’s not known by the application whether which action will actually run or handle any given input.

This is a great way to hide implementation, since each action/receiver is only aware of itself, and/or the successor, and has it’s own responsibility.

With this clean and testable code is also ensured.

### Usage

In this particular implementation, each step has a reference to the next step in the chain. There's a chain handler the knows the first step, and will start the chain with that step. When there are no more steps to handle, the chain will stop.

If the chain is interrupted, no more steps will be run.

### Status
[![Build Status](https://travis-ci.org/orangeeli/patterns.svg?branch=master)](https://travis-ci.org/orangeeli/patterns)

[![Code Climate](https://codeclimate.com/github/orangeeli/patterns/badges/gpa.svg)](https://codeclimate.com/github/orangeeli/patterns)

## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)

**[Follow me (@orangeeli) on Twitter!](https://twitter.com/orangeeli)**

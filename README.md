# Patterns

This is a small project to practice implementation of software design patterns on javascript.

## Chain

The Chain of responsibility is a design pattern intended to allow a requester issue a context without knowing whom or how many receivers will handle it.

In other words, a sequence of actions can be defined in a particular execution flow yet there’s not known by the application whether which action will actually run or handle any given input.

This is a great way to hide implementation, since each action/receiver is only aware of itself, and/or the successor, and has it’s own responsibility.

With this clean and testable code is also ensured.

### Usage

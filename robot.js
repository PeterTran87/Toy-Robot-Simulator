"use strict";

// Import dependencies
const readLine = require("readline");
const RobotPrototype = require("./prototype");

// Create an input/output interface to get user input
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define final module for the robot object
module.exports = class Robot extends RobotPrototype {
  constructor() {
    super();
    this.initialised = false;
    this.testing = false;
  }

  init() {
    if (!this.initialised) {
      this.commandString = "";
      this.action = "";
      this.initialised = true;
      this.onTable = false;
      this.x = -1;
      this.y = -1;
      this.init();
      this.obstacles = [];
    }
    this.report = false;
    this.execute();
  }

  // Execute the valid directives
  execute() {
    switch (this.action) {
      case "move":
        this.move();
        break;
      case "left":
        this.turn("left");
        break;
      case "right":
        this.turn("right");
        break;
      case "quit":
        rl.close();
        process.exit();
        break;
      default:
        break;
    }
    if (!this.testing) this.getCommand();
  }

  // Get directive from user input
  getCommand() {
    rl.question("Enter your command: ", command => {
      this.commandString += command.toLowerCase();
      this.command();
    });
  }

  // Validate directive and move the robot
  command() {
    if (!this.testing) this.validateDirective(this.commandString);
    if (!this.report) this.execute();
    else {
      console.log();
      console.log(
        `Output: ${this.x},${this.y},${this.cardinalDirection.toUpperCase()}`
      );
      console.log();
      this.init();
    }
  }
};

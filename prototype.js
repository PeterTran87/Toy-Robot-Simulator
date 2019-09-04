"use strict";

// Import dependencies
const Blueprint = require("./blueprint");

// Define a robot prototype from the blueprint which can validate the command
module.exports = class RobotPrototype extends Blueprint {
  constructor() {
    super();
    this.commandString = null;
    this.action = null;
    this.report = false;
    this.validCommands = ["place", "move", "left", "right", "avoid"];
    this.invalidLocationMessage =
      "The robot is not on the table yet. Please place it on the table first.";
    this.outOfRangeMessage =
      "This directive will destroy the robot. Please give another directive.";
  }

  // Check if the directive will make the robot fall to destruction
  validateCommand(directive) {
    switch (true) {
      case directive === "move":
        if (
          (this.x === 0 && this.cardinalDirection === "west") ||
          (this.x === 0 &&
            this.y === 5 &&
            this.cardinalDirection === "north west") ||
          (this.x === 5 && this.cardinalDirection === "east") ||
          (this.x === 5 &&
            this.y === 0 &&
            this.cardinalDirection === "south east") ||
          (this.y === 0 && this.cardinalDirection === "south") ||
          (this.x === 0 &&
            this.y === 0 &&
            this.cardinalDirection === "south west") ||
          (this.y === 5 && this.cardinalDirection === "north") ||
          (this.x === 5 &&
            this.y === 5 &&
            this.cardinalDirection === "north east")
        ) {
          this.commandString = "";
          this.action = "";
          console.log(this.outOfRangeMessage);
          break;
        } else {
          this.commandString = "";
          this.action = directive;
          break;
        }
      case ["left", "right"].includes(directive):
        this.commandString = "";
        this.action = directive;
        break;
      case directive === "quit":
        this.action = directive;
        break;
      default:
        this.commandString = "";
        this.action = "";
        console.log(this.invalidMessage);
        break;
    }
  }

  // Validate the directive
  validateDirective(commandString) {
    let rawCommands = commandString.split(" ");
    let [directive, location] = rawCommands.filter(
      rawCommand => rawCommand !== ""
    );
    this.commandString = "";

    if (!this.onTable) {
      if (directive === "place") {
        this.place(location);
      } else if (directive === "avoid") {
        this.avoid(location);
      } else {
        console.log(this.invalidLocationMessage);
      }
    } else {
      switch (directive) {
        case "place":
          this.commandString = "";
          this.action = "";
          this.place(location);
          break;
        case "avoid":
          this.commandString = "";
          this.action = "";
          this.avoid(location);
          break;
        default:
          if (
            location === undefined &&
            (this.validCommands.includes(directive) || directive === "quit")
          ) {
            this.validateCommand(directive);
            break;
          } else if (directive === "report") {
            this.action = "";
            this.report = true;
            break;
          } else {
            this.commandString = "";
            this.action = "";
            console.log(this.invalidMessage);
            break;
          }
      }
    }
  }
};

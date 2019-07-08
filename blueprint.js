"use strict";

// Define a robot prototype with basic movement functions
module.exports = class Blueprint {
  constructor() {
    this.onTable = false;
    this.x = null;
    this.y = null;
    this.cardinalDirection = null;
    this.validCardinalDirection = ["north", "east", "west", "south"];
    this.outOfBoundMessage =
      "This command will place the robot out of the table. Please give another location";
    this.invalidMessage = "Invalid command. Please try again.";
  }

  // Place the robot on the table after validation
  place(location) {
    let result = this.placeValidation(location);
    if (result) {
      let { x, y, cardinalDirection } = result;
      this.onTable = true;
      this.x = x;
      this.y = y;
      this.cardinalDirection = cardinalDirection;
    }
  }

  // Validate the location of the robot
  placeValidation(location) {
    if (location) {
      let [horizontal, vertical, cardinalDirection] = location.split(",");
      if (
        horizontal.length === 1 &&
        vertical.length === 1 &&
        this.validCardinalDirection.includes(cardinalDirection)
      ) {
        let x = parseInt(horizontal);
        let y = parseInt(vertical);
        if (
          x >= 0 &&
          x <= 4 &&
          y >= 0 &&
          y <= 4 &&
          this.validCardinalDirection.includes(cardinalDirection)
        )
          return { x, y, cardinalDirection };
        else {
          console.log(this.outOfBoundMessage);
          return false;
        }
      } else {
        console.log(this.invalidMessage);
        return false;
      }
    } else {
      console.log(this.invalidMessage);
      return false;
    }
  }

  // Based on Cartesian plane concept, with (0,0) as SW and (4,4) as NE
  move() {
    switch (this.cardinalDirection) {
      case "north":
        this.y++;
        break;
      case "east":
        this.x++;
        break;
      case "south":
        this.y--;
        break;
      case "west":
        this.x--;
        break;
    }
  }

  // Based on Cartesian plane concept, with (0,0) as SW and (4,4) as NE
  turn(direction) {
    switch (direction) {
      case "left":
        switch (this.cardinalDirection) {
          case "north":
            this.cardinalDirection = "west";
            break;
          case "east":
            this.cardinalDirection = "north";
            break;
          case "south":
            this.cardinalDirection = "east";
            break;
          case "west":
            this.cardinalDirection = "south";
            break;
        }
        break;
      case "right":
        switch (this.cardinalDirection) {
          case "north":
            this.cardinalDirection = "east";
            break;
          case "east":
            this.cardinalDirection = "south";
            break;
          case "south":
            this.cardinalDirection = "west";
            break;
          case "west":
            this.cardinalDirection = "north";
            break;
        }
        break;
    }
  }
};

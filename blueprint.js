"use strict";

// Define a robot prototype with basic movement functions
module.exports = class Blueprint {
  constructor() {
    this.onTable = false;
    this.x = null;
    this.y = null;
    this.obstacles = null;
    this.initialPlace = false;
    this.cardinalDirection = null;
    this.validCardinalDirection = [
      "north west",
      "north",
      "north east",
      "east",
      "south east",
      "south",
      "south west",
      "west"
    ];
    this.outOfBoundMessage =
      "This command will place the robot out of the table. Please give another location";
    this.currentCoordinateWarning =
      "This is the current coordinate of the robot. Please give another location";
    this.invalidAvoidanceMessage =
      "This coordinate is outside of the table. Please give another location";
    this.blockedAccessMessage =
      "This coordinate is blocked. Please give another directive";
    this.invalidMessage = "Invalid command. Please try again.";
  }

  // Place the robot on the table after validation
  place(location) {
    let result = this.placeValidation(location);
    if (result) {
      let { x, y, cardinalDirection } = result;
      if (
        this.obstacles.every(obstacle => {
          let { x: xObstacle, y: yObstacle } = obstacle;
          return x !== xObstacle && y !== yObstacle;
        })
      ) {
        this.onTable = true;
        this.x = x;
        this.y = y;
      } else console.log(this.blockedAccessMessage);
      if (!this.initialPlace) {
        this.cardinalDirection = cardinalDirection;
        this.initialPlace = true;
      }
    }
  }

  // Validate the location of the robot
  placeValidation(location) {
    if (location) {
      let [horizontal, vertical, cardinalDirection] = location.split(",");
      if (
        horizontal.length === 1 &&
        vertical.length === 1 &&
        (this.initialPlace ||
          (!this.initialPlace &&
            this.validCardinalDirection.includes(cardinalDirection)))
      ) {
        let x = parseInt(horizontal);
        let y = parseInt(vertical);
        if (x >= 0 && x <= 5 && y >= 0 && y <= 5)
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
    let xCheck = this.x;
    let yCheck = this.y;
    switch (this.cardinalDirection) {
      case "north": {
        let subYCheck = ++yCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return this.x == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.y++;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "north east": {
        let subXCheck = ++xCheck;
        let subYCheck = ++yCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return subXCheck == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.x++;
          this.y++;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "east": {
        let subXCheck = ++xCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return subXCheck == xObstacle && this.y !== yObstacle;
          })
        ) {
          this.x++;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "south east": {
        let subXCheck = ++xCheck;
        let subYCheck = --yCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return subXCheck == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.x++;
          this.y--;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "south": {
        let subYCheck = --yCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return this.y == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.y--;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "south west": {
        let subXCheck = --xCheck;
        let subYCheck = --yCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return subXCheck == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.x--;
          this.y--;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "west": {
        let subXCheck = --xCheck;
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return subXCheck == xObstacle && this.y !== yObstacle;
          })
        ) {
          this.x--;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
      case "north west": {
        if (
          this.obstacles.every(obstacle => {
            let { x: xObstacle, y: yObstacle } = obstacle;
            return --xCheck == xObstacle && subYCheck !== yObstacle;
          })
        ) {
          this.x--;
          this.y++;
          break;
        } else {
          console.log(this.blockedAccessMessage);
          break;
        }
      }
    }
  }

  // Based on Cartesian plane concept, with (0,0) as SW and (4,4) as NE
  turn(direction) {
    switch (direction) {
      case "left":
        switch (this.cardinalDirection) {
          case "north":
            this.cardinalDirection = "north west";
            break;
          case "north west":
            this.cardinalDirection = "west";
            break;
          case "east":
            this.cardinalDirection = "north east";
            break;
          case "north east":
            this.cardinalDirection = "north";
            break;
          case "south":
            this.cardinalDirection = "south east";
            break;
          case "south east":
            this.cardinalDirection = "east";
            break;
          case "west":
            this.cardinalDirection = "south west";
            break;
          case "south west":
            this.cardinalDirection = "south";
            break;
        }
        break;
      case "right":
        switch (this.cardinalDirection) {
          case "north":
            this.cardinalDirection = "north east";
            break;
          case "north east":
            this.cardinalDirection = "east";
            break;
          case "east":
            this.cardinalDirection = "south east";
            break;
          case "south east":
            this.cardinalDirection = "south";
            break;
          case "south":
            this.cardinalDirection = "south west";
            break;
          case "south west":
            this.cardinalDirection = "west";
            break;
          case "west":
            this.cardinalDirection = "north west";
            break;
          case "north west":
            this.cardinalDirection = "north";
            break;
        }
        break;
    }
  }

  avoid(location) {
    let obstacle = this.validateObstruction(location);
    if (obstacle) {
      let { x, y } = obstacle;
      if (x === this.x && y === this.y)
        console.log(this.currentCoordinateWarning);
      else this.obstacles.push(obstacle);
    }
  }

  validateObstruction(location) {
    if (location) {
      let [horizontal, vertical] = location.split(",");
      if (horizontal.length === 1 && vertical.length === 1) {
        let x = parseInt(horizontal);
        let y = parseInt(vertical);
        if (x >= 0 && x <= 5 && y >= 0 && y <= 5) {
          if (x === this.x && y === this.y) {
            console.log(this.currentCoordinateWarning);
            return false;
          } else return { x, y };
        } else {
          console.log(this.invalidAvoidanceMessage);
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
};

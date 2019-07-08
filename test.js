// Import dependencies
const Robot = require("./robot");
let testRobot;
const process = require("process");

// Create test cases
const testCases = {
  "0": {
    case: "Sample case",
    content: ["PLACE 0,0,NORTH", "MOVE", "REPORT"]
  },
  "1": {
    case: "Sample case",
    content: ["PLACE 0,0,NORTH", "LEFT", "REPORT"]
  },
  "2": {
    case: "Sample case",
    content: ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"]
  },
  "3": {
    case: "Check if any accidental space can be tolerated",
    content: [
      "PLACE       3,1,WEST      ",
      "     MOVE  ",
      "  LEFT",
      "MOVE",
      "RIGHT  ",
      "    REPORT      "
    ]
  },
  //
  "4": {
    case:
      "Check if other movement commands or direction outside the scope or invalid punctuation will be discarded without crashing the app",
    content: [
      "PLACE 3.1,EAST",
      "PLACE 2,2.SOUTH",
      "PLACE 3.14,4.123445,SOUTH",
      "PLACE 2,2,SOUTH",
      "JUMP",
      "KICK",
      "MOVE",
      "MOVE",
      "REPORT"
    ]
  },
  "5": {
    case:
      "Check if mixture of upper- and lower-case valid commands can be tolerated",
    content: [
      "Place 1,3,eAst",
      "mOvE",
      "leFT",
      "mOVE",
      "RIGht",
      "MOVe",
      "report"
    ]
  },
  "6": {
    case:
      "Check if placing the robot outside table area will prevent the placement",
    content: [
      "PLACE 4,5,SOUTH",
      "MOVE",
      "PLACE 2,4,SOUTH",
      "MOVE",
      "MOVE",
      "REPORT"
    ]
  },
  "7": {
    case: "Check if invalid commands will stop further commands",
    content: [
      "PLACEMENT 0,0,SOUTH",
      "PLACE 0,0,SOUTH",
      "LEFT TURN",
      "TURN RIGHT",
      "LEFT",
      "MOVE",
      "MOVE",
      "LEFT",
      "MOVE UP",
      "MOVE DOWN",
      "MOVE",
      "MOVE",
      "REPORT"
    ]
  },
  "8": {
    case:
      "Check if movement commands before the first valid PLACE command will stop further commands",
    content: [
      "MOVE",
      "LEFT",
      "PLACE 1,2,NORTH",
      "MOVE",
      "LEFT",
      "MOVE",
      "REPORT"
    ]
  },
  "9": {
    case:
      "Check if movement command leading the robot to fall to destruction is allowed",
    content: [
      "PLACE 0,0,SOUTH",
      "MOVE",
      "RIGHT",
      "MOVE",
      "RIGHT",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "MOVE",
      "REPORT"
    ]
  },
  "10": {
    case: "Check case with multiple place and report commands",
    content: [
      "PLACE 2,3,WEST",
      "MOVE",
      "MOVE",
      "REPORT",
      "PLACE 0,0,NORTH",
      "MOVE",
      "REPORT",
      "PLACE 0,4,EAST",
      "MOVE",
      "RIGHT",
      "MOVE",
      "LEFT",
      "REPORT"
    ]
  }
};

// Start test cases
console.log("------ STARTING TEST CASES ------");
Object.keys(testCases).forEach(key => {
  // Initialise the robot and bypass the user input phase
  testRobot = new Robot();
  testRobot.initialised = true;
  testRobot.testing = true;
  // Aesthetic purpose for presentation
  if (parseInt(key) < 10) caseKey = "0" + key;
  else caseKey = key;
  console.log(`------------ CASE ${caseKey} ------------`);
  console.log(`${testCases[key].case.toUpperCase()}`);
  console.log();
  // Perform robot operation
  testCases[key].content.forEach(action => {
    console.log(`${action} \u25BC`);
    testRobot.commandString = action.toLowerCase();
    testRobot.validateDirective(testRobot.commandString);
    testRobot.execute();
    if (testRobot.report === true) testRobot.command();
  });
});

// Exit the program after finish testing
process.exit();

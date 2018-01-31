var inquirer = require("inquirer")
var Database = require("./database.js")
var dream_db = new Database()

var menuLookUp = function () {
  inquirer.prompt([{
    type: "list",
    message: "Select a Command",
    choices: ["View Products Sales by Department", "Create New Department", "Quit"],
    name: "command"
  }]).then(answers => {
    switch (answers.command) {
      case "View Products Sales by Department":
        dream_db.joinTables(menuLookUp)
        break
      case "Create New Department":
        createDepartPrompt()
        break
      case "Quit":
        dream_db.disconnect()
        break
    }
  })
}

function createDepartPrompt() {
  inquirer.prompt([{
    name: "department_name",
    message: "Department's name: "
  },
  {
    name: "over_head_costs",
    message: "Over head cost of department",
    validate: value => /^[\d.]+$/.test(value) ? true : console.log("   >Invalid Input")
  }]).then(answers => {
    answers.over_head_costs = parseFloat(answers.over_head_costs)
    dream_db.addDepartment(answers, menuLookUp)
  })
}

menuLookUp()
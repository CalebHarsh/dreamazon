var inquirer = require("inquirer")
var customer = require('./dreamazonCustomer.js')
var manager = require("./dreamazonManger.js")
var supVis = require("./dreamazonSupervisor.js")

function start() {
  inquirer.prompt([{
    type: "list",
    message: "Select Directory",
    name: "direct",
    choices: ["Customer", "Manager", "Supervisor"]
  }]).then(answers => {
    switch (answers.direct) {
      case 'Customer':
        customer()
        break
      case 'Manager':
        manager()
        break
      case 'Supervisor':
        supVis()
        break
    }
  })
}
start()
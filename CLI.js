var inquirer = require("inquirer")

inquirer.prompt([{
  type: "list",
  message: "Select Directory",
  name: "direct",
  choices: ["Customer", "Manager", "Supervisor"]
}]).then(answers => {
  switch (answers.direct) {
    case 'Customer':
      require("./dreamazonCustomer.js")
      break
    case 'Manager':
      require("./dreamazonManager.js")
      break
    case 'Supervisor':
      require("./dreamazonSupervisor.js")
      break
  }
})

var Database = require("./database.js")
var inquirer = require("inquirer")

var dream_db = new Database()

var menuSelection = function () {
  inquirer.prompt([{
    message: "Select a Command",
    type: "list",
    name: "command",
    choices: ["View Products for Sale", "View Low Invertory", "Add to Inventory", "Add New Product", "Quit"]
  }]).then(answers => {

    switch (answers.command) {
      case "View Products for Sale":
        dream_db.readAllItems(menuSelection)
        break
      case "View Low Invertory":
        dream_db.readLowItems(menuSelection)
        break
      case "Add to Inventory":
        addToInvertory()
        break
      case "Add New Product":
        addNewItem()
        break
      case "Quit":
        console.log("Good-Bye")
        dream_db.disconnect()
        break
    }
  })
}

function addNewItem() {
  inquirer.prompt([{
    message: "Name of new item",
    name: "product_name",
  },
  {
    message: "Item's department",
    name: "department_name"
  },
  {
    message: "Item's Price",
    name: "price",
    validate: value => /^[\d.]+$/.test(value) ? true : console.log("   >Invalid Input")

  },
  {
    message: "Quantity of Items",
    name: "stock_quantity",
    validate: value => /^[\d]+$/.test(value) ? true : console.log("   >Invalid Input")

  }
  ]).then(answers => {
    answers.price = parseFloat(answers.price)
    answers.stock_quantity = parseInt(answers.stock_quantity)
    dream_db.addItem(answers)
    menuSelection()
  })
}

function addToInvertory() {
  inquirer.prompt([{
    message: "Select the Items ID",
    name: "id",
    validate: value => value > 0 ? true : console.log("   >Invalid Number")
  }, {
    message: "Number of Inventory being added",
    name: "quantity",
    validate: value => /^[\d]+$/.test(value) ? true : console.log("   >Invalid Input")
  }]).then(answers => {
    dream_db.readItem(answers.id, answers.quantity, (it, quan) => {
      var total = parseInt(it.stock_quantity) + parseInt(quan)
      dream_db.updateItem(it.item_id, total, it.products_sales)
      menuSelection()
    })
  })
}

menuSelection()
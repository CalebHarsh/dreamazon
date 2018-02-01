var Database = require("./database.js")
var inquirer = require("inquirer")
var dream_db = new Database()

var selcetionPrompt = function () {
  console.log("")
  inquirer.prompt([{
    message: "Type the Item's ID you wish to buy.",
    name: "item_id",
    validate: value => value > 0 && value < 11 ? true : console.log("   >Invalid Number")
  },{
    message: "How many do you want?",
    name: "quantity",
    validate: value => /^[\d]+$/.test(value) ? true : console.log("   >Invalid Input")
  },
  {
    message: "Is this correct?",
    type: "confirm",
    name: "yes"
  }
]).then(answers => {
    if(answers.yes) {
      dream_db.readItem(answers.item_id, answers.quantity, checkQuanitiy)
    } else {
      selcetionPrompt()
    }
  })
}

function checkQuanitiy (item, quantity) {
  if(item.stock_quantity < quantity) {
    console.log("Insufficient quantity!")
  } else {
    var remain = item.stock_quantity - quantity
    var total = item.price * quantity
    var updateSales = total + item.products_sales
    dream_db.updateItem(item.item_id, remain, updateSales)
    console.log(`You paid $${total.toFixed(2)} for ${quantity} ${item.product_name}`)
  }
  dream_db.readAllItems(buyMore)
}

function buyMore () {
  inquirer.prompt([{
    message:"Buy something else",
    name: "buyMore",
    type: "confirm"
  }]).then(answers => {
    if(answers.buyMore) {
      selcetionPrompt()
    } else {
      console.log("Good-Bye")
      dream_db.disconnect()
    }
  })
}
function startCust () {
  dream_db.readAllItems(selcetionPrompt)
}
module.exports = startCust
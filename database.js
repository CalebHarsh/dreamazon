var mysql = require("mysql")
var password = require("./password.js")
var Table = require("cli-table")

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: password,
  database: "dreamazon_db"
})


var DatabaseConnection = function () {
  this.connection = connection
  this.table = "products"
  this.table2 = "departments"
}

DatabaseConnection.prototype.connect = function () {
  this.connection.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

  })
}

DatabaseConnection.prototype.addItem = function (item) {
  this.connection.query(`INSERT INTO ${this.table} SET ?`, item,
    (err, res) => {
      if (err) throw err

    })
}

DatabaseConnection.prototype.addDepartment = function (depart, cb) {
  this.connection.query(`INSERT INTO ${this.table2} SET ?`, depart,
    (err, res) => {
      if (err) throw err
      cb()
    })
}

DatabaseConnection.prototype.updateItem = function (id, quantity, total) {
  this.connection.query(`UPDATE ${this.table} SET ? WHERE ?`,
    [{
      stock_quantity: quantity,
      products_sales: total
    },
    {
      item_id: id
    }],
    (err, res) => {
      if (err) throw err
    })
}

DatabaseConnection.prototype.deleteItem = function () {
  this.connection.query(`DELETE FROM ${this.table} WHERE ?`, {

  },
    (err, res) => {
      if (err) throw err
      console.log(res.affectedRows + " has been deleted!\n")
    })
}

DatabaseConnection.prototype.readAllItems = function (callback) {
  this.connection.query(`SELECT * FROM ${this.table}`,
    (err, res, field) => {
      if (err) throw err
      var table = new Table({
        head: ['ID', 'Name', 'Department', 'Price', 'Quantity']
      })

      res.forEach(item => {
        table.push([item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity])
      })
      console.log(table.toString())
      callback()
    })
}

DatabaseConnection.prototype.readItem = function (id, quantity, cb) {

  this.connection.query(`SELECT * FROM ${this.table} WHERE item_id=${id}`,
    (err, res, field) => {
      if (err) throw err
      cb(res[0], quantity)
    }
  )
}

DatabaseConnection.prototype.readLowItems = function (cb) {
  this.connection.query(`SELECT * FROM ${this.table} WHERE stock_quantity < 16`,
    (err, res) => {
      if (err) throw err
      var table = new Table({
        head: ['ID', 'Name', 'Department', 'Quantity']
      })

      res.sort((a, b) => a.stock_quantity - b.stock_quantity)

      res.forEach(item => {
        table.push([item.item_id, item.product_name, item.department_name, item.stock_quantity])
      })
      console.log(table.toString())
      cb()
    })
}

DatabaseConnection.prototype.joinTables = function (cb) {
  this.connection.query(`SELECT departments.department_id, departments.department_name , departments.over_head_costs, SUM(products.products_sales) AS "product sales", SUM(products.products_sales) - departments.over_head_costs AS "Total Sales"
  FROM ${this.table2} LEFT JOIN ${this.table} ON departments.department_name = products.department_name GROUP BY departments.department_id;`,
    (err, res) => {
      if (err) throw err
      var table = new Table({
        head: ['ID', 'Department', 'Over Head Costs', 'Product Sales', 'Total sales']
      })
     
      res.forEach(item => {
        table.push([item.department_id, item.department_name, item.over_head_costs, item["product sales"], item["Total Sales"]])
      })
      console.log(table.toString())
      cb()
    })
}

DatabaseConnection.prototype.disconnect = function () {
  this.connection.end()
}



module.exports = DatabaseConnection



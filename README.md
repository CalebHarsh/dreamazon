# dreamazon

### Node.js & MySQL

## Overview

An Amazon-like storefront with connection to MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The app will also track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started

* Before you run the app you need to install the necessary node packages. The app uses `cli-table`, `mysql`, and `inquirer`. Enter this into the command line to install all of them.

```
npm install
```

* Another thing necessary for this app is to create a password.js that exports your MySQL password. Something like this.


``` javacript
module.exports = "password"
```

* Now your ready to run the app.

## Instructions

1. Run the Node application called `CLI.js`. Running this application will display a list of three choices: `Customer`, `Manager`, and `Supervisor`. Each one will run a different part of the app.

### Customer

2. Selecting `Customer` prints a table of all available products that can be sold. 

3. Then you are given a prompt that asks the user for input: 
   * The first ask them the ID of the product they would like to buy.
   * The second message ask how many units of the product they would like to buy.
   * The last message is a confirmation page to verify the object's ID and amount.

4. Once the customer has placed the order, it then checks if your store has enough of the product to meet the customer's request.
   * If the store has enough of the product the customer's total price and the amount order are displayed to screen.
   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

5. After the order goes through or if it is rejected for insufficient quantity. An updated version of the products is then displayed along with a prompt that asked the customer if they would like to make another order.
   * If they want to make another order the process repeats
   * If not then the application terminates.

### Manager

2. Selecting `Manager`. Lists a set of menu options: 
  * View Products for Sale
    
  * View Low Inventory
    
  * Add to Inventory
    
  * Add New Product

  * Quit

3. If a manager selects `View Products for Sale`, it displays a list every available item: the item IDs, names, prices, and quantities.

4. If a manager selects `View Low Inventory`, then it displays a list all items with an inventory count lower than 15. Listed from losted amount.

5. If a manager selects `Add to Inventory`, it display a prompt that will let the manager "add more" of any item currently in the store.

6. If a manager selects `Add New Product`, allows the manager to add a completely new product to the store.
 
7. If a manager selects `Quit`, it terminates the program. Ending the application. 

### Supervisor

2. Selecting `Supervisor`. Shows a set of menu options: 

   * View Product Sales by Department

   * Create New Department

   * Quit

3. If a supervisor selects `View Products Sales by Department`, it shows a tables that list the department's sales compared to the over head costs of the department. Someting like this:

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |


4. If a supervisor selects `Create New Department`, it displays the necessary prompt to create a completely new department.

5. If a supervisor selects `Quit`, it terminates the program. Ending the application.
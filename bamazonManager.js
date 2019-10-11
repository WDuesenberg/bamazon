var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,


  user: "root",


  password: "root",
  database: "bamazon_DB"
});


connection.connect(function(err) {
  if (err) throw err;

  whatToDo();
});

function whatToDo(){
  inquirer
    .prompt([
    {
      type: "list",
      message: "What do you want to do?",
      choices: ["Display Inventory", "View Low Inventory", "Add to Inventory", "Add New Product"],
      name: "action"
    }
    ]).then(function(answer){
      switch(answer.action){
        case "Display Inventory":
          displayAll();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addItem();
          break;
      }
    })
}

function displayAll(){
  connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.log('');
      console.log('-------------Inventory---------------');
      console.log('');
      for(var i = 0; i < results.length; i++){

        console.log("ID: " + results[i].item_id + 
          "\nItem Name: " + results[i].product_name +
          "\nDepartment: " + results[i].department_name +
          "\nStock: " + results[i].stock_quantity +
          "\nPrice: $" + results[i].price);
        console.log(" ");
        console.log(" ");
      }
      inquirer
        .prompt([
        {
          type: "confirm",
          message: "Return?",
          name: "confirm"
        }
        ]).then(function(answer) {
          if(answer.confirm){
            whatToDo();
          } else {
            console.log("Have a Nice Day");
          }
        })
  })
}

function lowInventory(){
  connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function(err, results) {
      if (err) throw err;

      

      if (results[0] === undefined){
        console.log("No low inventory.");
        whatToDo();
      } else {
        for(var i = 0; i < results.length; i++){
          console.log("ID: " + results[i].item_id + 
            "\nItem Name: " + results[i].product_name +
            "\nDepartment: " + results[i].department_name +
            "\nStock: " + results[i].stock_quantity +
            "\nPrice: $" + results[i].price);
          console.log(" ");
          console.log(" ")
        }
        whatToDo();
      }
  })
}

function restockItem(item){
  inquirer
    .prompt([
      {
            type: "input",
              message: "Quantity?",
              name: "quantity"
          }
    ]).then(function(answer){
      var input = parseInt(answer.stock_quantity);

      if(input <= 0){
        console.log("Insufficient Quantity.");
      } else {
        console.log("Restock Successful!");
        var newQuantity = item.stock_quantity + input;
     
        connection.query(
          "UPDATE products SET ? WHERE ?",
            [
                {
                  stock_quantity: newQuantity
                },
                {
                    item_id: item.item_id
                }
            ],function(err, results) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    type: "confirm",
                    message: "Return?",
                    name: "confirm"
                  }
                ]).then(function(answer) {
                  if(answer.confirm){
                    whatToDo();
                  } else {
                    console.log("Thank you for shoping with us.");
                  }
                })
            }
        );
      }
    })
}

function addInventory(){
  inquirer
      .prompt([
        {
          type: "input",
          message: "Id of the item",
          name: "id"
        }
      ]).then(function(item) {
        connection.query("SELECT * FROM products WHERE ?",
          [
            {
              item_id: item.item_id
            }
          ], function(err, results) {
            if (err) throw err;
            var product = results[0];
            console.log("You selected: ");
            console.log(product.product_name);
            restockItem(product_name);
          }
        );
      })
}

function addItem(){
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Name of item you want to add"
      },
      {
        name: "department",
        type: "input",
        message: "Department of new item?"
      },
      {
        name: "price",
        type: "input",
        message: "Cost of item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock",
        type: "input",
        message: "Quantity of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item_id,
          department_name: answer.department_name,
          price: answer.price,
          stock_quantity: answer.stock_quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Item Added!");

          whatToDo();
        }
      );
    });
}
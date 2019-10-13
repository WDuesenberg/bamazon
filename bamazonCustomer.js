var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    //Your PORT; if not 8889
    port: 8889,

    // your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if(err) throw err;
    products();
});

function products() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('------------Inventory-----------');
        console.log('');
        console.table(res);
        // for (var i = 0; i < res.length; i++) {
        //     console.log('Item ID: ' + res[i].item_id);
        //     console.log('Product: ' + res[i].product_name);
        //     console.log('Department: ' + res[i].department_name);
        //     console.log('Price: ' + res[i].price);
        //     console.log('Stocked Quantity: ' + res[i].stock_quantity);
        //     console.log(' ');
        //     console.log(' ');
        // }

        start();
    });
}

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw console.log("connection error:" + err);
    inquirer
        .prompt([
            {
                name: 'selectId',
                type: 'input',
                message: 'Enter the id number you want to purchase:',
            },

            {
                name: 'amountBought',
                type: 'input',
                message: 'How many would you like?',
            }
        ]).then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                item_id: answers.selectId
            }, function (err, res) {

                var inStock = res[0].stock_quantity;
                var itemBought = answers.amountBought;

                if (inStock >= itemBought) {
                    var leftInStock = inStock - itemBought;

                    var totalPrice = res[0].price * itemBought;
                    var itemPurchased = res[0].product_name;
                    console.log(totalPrice + " total price of items bought");

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: leftInStock
                            },
                            {
                                item_id: answers.selectId
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log("==================================");
                            console.log("\n\r");
                            console.log("Order details: ");
                            console.log("Item bought " + itemPurchased);
                            console.log("Quantity bought " + itemBought + " for $" + res[0].price);
                            console.log("Total Cost: $" + totalPrice);
                            console.log("\n\r");
                            console.log("Thank you for shopping with us.");
                            console.log("==================================");
                            products();
                        }
                    );
                } else {
                    console.log("=================================");
                    console.log("\n\r");
                    console.log("Not enough of that product");
                    console.log("\n\r");
                    console.log("=================================");
                    products();
                }
            });
        });
    });
}
                        

            

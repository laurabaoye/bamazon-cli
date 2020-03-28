const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// cli-table size
const table = new Table({
    head: ["ID", "Item", "Department", "Price", "Stock"],
    colWidths: [10, 30, 30, 10, 10]
})

//connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "84YuaN0924!",
    database: "bamazondb"
})

function showInventory() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            table.push([
                res[i].item_id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ])
        }
        console.log("\n\n" + table.toString());
    })
}

function addToCart() {
    inquirer.prompt([{
        type: "input",
        message: "what the ID name for your item",
        name: "myId"
    }, {
        type: "input",
        message: "How many you want",
        name: "myQuantity"
    }]).then(res => {
        checkOut(res.myId, res.myQuantity)
    })
}

function checkOut(userId, userQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = " + userId, (err, res) => {
        if (err) throw err
        if (userQuantity <= res[0].stock_quantity) {
            const totalCost = res[0].price * userQuantity;
            console.log("We do have it instock, we will ship it shortly");
            console.log("This is your total cost " + totalCost);
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + userQuantity + " WHERE item_id = " + userId)
            emptyCart()
        } else {
            console.log("Out of stock");
            emptyCart()
        }
    })
}

function emptyCart() {
    inquirer.prompt({
        type: "list",
        message: "Would like to contiune shopping?",
        choices: ['yes', 'no'],
        name: "shopAgain"
    }).then(res => {
        if (res.shopAgain === "yes") {
            mainMenu()
        } else {
            connection.end();
            console.log("Hopfully we will have you again");
        }
    })
}

// created function mainMenu
function mainMenu() {
    inquirer.prompt({
        type: "list",
        message: "Welcome to my shop",
        choices: ["look at store", "leave"],
        name: "main"
    }).then(res => {
        if (res.main === "leave") {
            connection.end()
        } else {
            showInventory()
            addToCart()
        }
    })
}

// throw err or success
connection.connect(err => {
    if (err) throw err
    console.log(`connected to thread id: ${connection.threadId}`);
    mainMenu();
})
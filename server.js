const mysql = require('mysql');
// const knex = require('knex');
// conecting the databese with server.
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'pinku6755',
    database: 'e_commerce'
  }
});

<<<<<<< HEAD


// here we are using the data for Json Web Token.
const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');



// creating the server for routing.
const express = require('express');
var app = express();
app.use(express.json());
=======
// creating the server for routing.
const express = require('express');
var app = express();

>>>>>>> c01e6c372ef3fd525599320ba229458812308825
// creating routs for the departments.
var departments = express.Router();
app.use('/departments', departments)

<<<<<<< HEAD
require('./routes/departments')(departments, knex);
=======
require('./routes/main')(departments, knex);
>>>>>>> c01e6c372ef3fd525599320ba229458812308825

// creating routs for the categories.
var categories = express.Router();
app.use('/categories', categories)

require('./routes/categories')(categories, knex);


// creating routs for the products.
var products = express.Router();
app.use('/products', products)

require('./routes/products')(products, knex);

// creating the routes for attributes.
var attributes = express.Router();
app.use('/attributes', attributes)

require('./routes/attributes')(attributes, knex);

<<<<<<< HEAD

// here we are inporting the shipping routs.
var shipping = express.Router();
app.use('/shipping',shipping)
require('./routes/shipping')(shipping,knex);



// here we are writing the routs for get all the tax detailds.
var tax= express.Router();
app.use('/tax',tax)
require('./routes/tax')(tax,knex);


/// hare we are writing the end ponts for shopping_cart.
var shoppingcart= express.Router();
app.use('/shoppingcart',shoppingcart)
require('./routes/shopping_cart')(shoppingcart,knex);


// creating the routes for get and post the data for customers.
var customers = express.Router();
app.use('/customers',customers)
require('./routes/customers')(customers, knex, jwt);










=======
>>>>>>> c01e6c372ef3fd525599320ba229458812308825
var server = app.listen(8000, () => {
  console.log('port is listening 8000');
});

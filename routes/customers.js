module.exports = function(customers, knex, jwt) {
  //Get customer by ID. The customer is getting by Token


  // Register a customer
  customers.post('/', (request, response, next) => {
    var customer = {
      email: request.body.email,
      password: request.body.password
    }

    var insertQuery = knex('customer').insert(request.body).then(() => {
      var query = knex.select('*')
        .from('customer')
        .where('email', request.body.email)
        .then((customersDetail) => {
          jwt.sign({
            customer
          }, 'secretKey', {
            expiresIn: '24h'
          }, (err, token) => {

            console.log('\nCoustomer Details:', customersDetail[0]);
            return response.json({
              customer: {
                schema: customersDetail[0]
              },
              accessToken: "Bearer " + token,
              expires_in: '24h'
            });
          });
        });
    })
  });

  // Token verification
  function verifyToken(request, response, next) {

    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
      var bearerToken = bearerHeader.split(' ')[1];
      request.token = bearerToken;
      next();
    } else {
      return response.sendStatus(403);
    }
  }



  // Sign In in the shopping
  customers.post('/login', verifyToken, (request, response, next) => {
    var email = request.body.email;
    var password = request.body.password;
    var query = knex('customer').where({
        email: email,
        password: password
      })
      .select("*").then((customerDeatail) => {
        jwt.verify(request.token, 'secretKey', (err, customerData) => {
          if (err) {
            console.log("this is coming from err:", err);
            return response.sendStaus(403);
          } else {
            if (customerData.customer.email == email && customerData.customer.password == password) {
              console.log('\nCoustomer Details:', customerDeatail[0]);
              return response.json({
                customer: {
                  schema: customerDeatail[0]
                },
                accessToken: "Bearer " + request.token,
                expires_in: '24h'
              });
            } else {
              return response.json({
                errorMsg: "Invalid user"
              });
            };
          };
        });
      });

  });

  /// hare we are writing the coed for get the customer's Details while he is logged in.
  customers.get('/', verifyToken, (request, response, next) => {
    jwt.verify(request.token, 'secretKey', (err, customerData) => {
      if (err) {
        console.log("this is coming from err:", err);
        return response.sendStaus(403);
      } else {
        var query = knex('customer').select('*')
          .where({
            email: customerData.customer.email,
            password: customerData.customer.password
          })
          .then((getData) => {
            console.log(getData);
            return response.json(getData[0]);
          });
      };
    });
  });





  /// here we are updating the customers data.
  customers.put('/', verifyToken, (request, response, next) => {
    jwt.verify(request.token, 'secretKey', (err, customerData) => {

      var email = customerData.customer.email;
      var password = customerData.customer.password;
      if (err) {
        console.log("this is coming from err:", err);
        return response.sendStaus(403);
      } else {
        var query = knex('customer').update(request.body)
          .where({
            email: email,
            password: password
          })
          .then(() => {

            var query = knex('customer')
              .where({
                email:email,
                password: password
              }).select('*').then((data)=>{


                return response.json(data);

              })

          });
      };
    });
  });






  /// here we will updata the use detail.
  customers.put('/aman', (request, responce, next) => {
    var upDate = knex('customer')
      .where('email', 'aman18@navgurukul.org')
      .update(request.body)
      .then(() => {
        var query = knex('customer')
          .where({
            name: "Aman",
            email: "aman18@navgurukul.org"
          }).select('*').then((data) => {
            return responce.json(data);
          });

      });
  });








};

module.exports = function(products, knex) {
  products.get('/', (request, response, next) => {
    var query = knex.select('*').from('product').then((productList) => {
      console.log("\nProduct List:\n", productList);
      response.json(productList);
    });
  });

  //
  products.get('/search/:product_name', (request, response, next) => {
    var product_name = request.params.product_name;
    var query = knex.select('*').from('product').where('name', product_name).then((product) => {
      console.log("\nCategory:\n", product);
      return response.json(product);
    });
  });

  products.get('/:product_id', (request, response, next) => {
    var product_id = request.params.product_id;
    var query = knex.select('*').from('product').where('product_id', product_id).then((products) => {
      console.log("\nProducts :\n", products);
      return response.json(products);
    });
  });
};

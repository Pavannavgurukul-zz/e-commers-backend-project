module.exports = function(products, knex) {


  // here we are getting the all product by using the product route.(complete)
  products.get('/', (request, response, next) => {
    var query = knex.select('*').from('product').then((productList) => {
      console.log("\nProduct List:\n", productList);
      response.json(productList);
    });
  });

  // here we are serching the product by its name.
  products.get('/search/:product_name', (request, response, next) => {
    var product_name = request.params.product_name;
    var query = knex.select('*').from('product')
      .where('name',product_name)
      .orWhere('name', 'like', '%' + ' ' + product_name)
      .orWhere('name', 'like', product_name + ' ' + '%')
      .orWhere('description', 'like', '%'+product_name+'%')
      .then((product) => {
        console.log("\nCategory:\n", product);
        return response.json(product);
      });
  });

  // here we are getting the product by its id.
  products.get('/:product_id', (request, response, next) => {
    var product_id = request.params.product_id;
    var query = knex.select('*').from('product').where('product_id', product_id).then((products) => {
      console.log("\nProducts :\n", products);
      return response.json(products);
    });
  });

  // we will get the list of products by the category Id.
  products.get('/inCategory/:category_id', (request, response, next) => {
    var category_id = request.params.category_id;
    var query = knex('product').join('product_category', 'product_category.product_id', '=', 'product.product_id')
      .select('product.product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail').where('category_id', category_id)
      .then((product_list) => {
        console.log(product_list);
        return response.json({
          "count": product_list.length,
          "rows": product_list
        });
      });

  });

  // here we will get the list of product by the department Id.
  products.get('/inDepartment/:department_id', (request, response, next) => {
    var department_id = request.params.department_id;
    var query = knex('product')
      .join('product_category', 'product_category.product_id', '=', 'product.product_id')
      .join('category', 'category.category_id', '=', 'product_category.category_id')
      .select('product.product_id', 'product.name', 'product.description', 'price', 'discounted_price', 'thumbnail', 'display').where('department_id', department_id)
      .then((product_list) => {
        console.log(product_list);
        return response.json({
          "count": product_list.length,
          "rows": product_list
        });
      });

  });

  // here we are getting the product by its id.
  products.get('/:product_id/details', (request, response, next) => {
    var product_id = request.params.product_id;
    var query = knex.select('*').from('product').where('product_id', product_id).then((products) => {
      console.log("\nProducts :\n", products);
      return response.json(products);
    });
  });

  // here we will get the product lication by giving the product Id.
  products.get('/:product_id/location', (request, response, next) => {
    var product_id = request.params.product_id;
    var query = knex('department')
      .join('category', 'category.department_id', '=', 'department.department_id')
      .join('product_category', 'product_category.category_id', '=', 'category.category_id')
      .select('department.department_id', 'category.category_id', 'category.name AS category_name', 'department.name as department_name', )
      .where('product_id', product_id).then((products) => {
        console.log("\nProducts :\n", products);
        return response.json(products);
      });
  });
};




// .join('category', 'category.department_id', '=', 'department.department_id')
// .join('product_category', 'product_category.product_id', '=', 'category.category_id')

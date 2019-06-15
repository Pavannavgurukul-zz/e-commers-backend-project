// in this file we are writing the routs for categories.
module.exports = function(categories, knex) {
  categories.get('/', (request, response, next) => {
    var query = knex.select('*').from('category').then((categoriesList) => {
      console.log("\nCategories List:\n", categoriesList);
      response.json(categoriesList);
    });
  });
  // here we are getting the category by category_id
  categories.get('/:category_id', (request, response, next) => {
    var category_id = request.params.category_id;
    var query = knex.select('*').from('category').where('category_id', category_id).then((category) => {
      if (category.length == 0) {
        var errMsg = {
          "error": {
            "status": 400,
            "code": "DEP_02",
            "message": "Don'exist category with this ID.",
            "field": "category_id"
          }
        }
        console.log("\nCategory:\n", "Don'exist category with this ID.");
        return response.json(errMsg);
      }
      console.log("\nCategory:\n", category[0]);
      return response.json(category);
    });
  });

  // here we are getting  category as the inProduct_id.
  categories.get('/inDepartment/:department_id', (request, response, next) => {
    var department_id = request.params.product_id;
    var query = knex.select('*').from('category').where('department_id', department_id).then((category) => {
      console.log("\nCategory:\n", category);
      return response.json(category);
    });
  });

  categories.get('/inProduct/:product_id', (request, response, next) => {
    var product_id = request.params.product_id;
    if (product_id == 0) {
      return response.json([]);
    }
    var query = knex('category').join('product_category', 'category.category_id', '=', 'product_category.category_id')
      .select('category.category_id','department_id','name').where('product_id', product_id)
      .then((category) => {
        console.log(category);
        return response.json(category);
      });
  })
};

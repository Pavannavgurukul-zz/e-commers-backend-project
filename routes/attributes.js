module.exports = function(attributes, knex) {
    attributes.get('/', (request, response, next) => {
      var query = knex.select('*').from('attribute').then((attributeList) => {
        console.log("\nAttribute List:\n", attributeList);
        response.json(attributeList);
      });
    });

    // here we are getting the attribute by its id.
    attributes.get('/:attr_id', (request, response, next) => {
      var attr_id = request.params.attr_id;
      var query = knex.select('*').from('attribute').where('attribute_id', attr_id).then((attributeList) => {
        console.log("\nAttribute List:\n", attributeList[0]);
        response.json(attributeList[0]);
      });
    });

    // hare we are getting the attribute_values by its id.
    attributes.get('/values/:attr_id', (request, response, next) => {
      var attr_id = request.params.attr_id;
      var query = knex.select('attribute_value_id', 'value').from('attribute_value').where('attribute_id', attr_id).then((attributeValuesList) => {
        console.log("\nAttribute Value List:\n", attributeValuesList);
        response.json(attributeValuesList);
      });
    });


    // here we are getting the attribute values bu the product ID.
    attributes.get('/inProduct/:product_id', (request, response, next) => {
          var product_id = request.params.product_id;
          if (product_id == 0) {
            return response.json([]);
          }

          var query = knex('attribute')
            .join('attribute_value', 'attribute.attribute_id', '=', 'attribute_value.attribute_id')
            .join('product_attribute','attribute_value.attribute_value_id','=','product_attribute.attribute_value_id')
            .select('attribute_value.attribute_value_id','name','value').where('product_id', product_id)
            .then((category) => {
              console.log(category);
              return response.json(category);
            });
          });

        };

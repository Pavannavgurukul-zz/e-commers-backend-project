module.exports = function(shipping, knex) {
  shipping.get('/regions', (request, response, next) => {
    var query = knex('shipping_region')
      .select('*')
      .then((shippingDetails) => {
        console.log("\nShipping List:\n", shippingDetails);
        response.json(shippingDetails);
      });
  });

  shipping.get('/regions/:shipping_region_id', (request, response, next) => {
    var shipping_region_id = request.params.shipping_region_id;
    console.log(shipping_region_id);
    var query = knex('shipping')
      .select('*').where('shipping_region_id',shipping_region_id)
      .then((shippingDetails) => {
        console.log("\nShipping List:\n", shippingDetails);
        response.json(shippingDetails);
      });
  });





};

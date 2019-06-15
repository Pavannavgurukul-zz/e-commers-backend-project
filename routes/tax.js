module.exports = function(tax, knex) {



  // here this is the rout for get the list of all taxes.
  tax.get('/', (request, response, next) => {
    var query = knex('tax')
      .select('*')
      .then((taxDetails) => {
        console.log("\nTaxes List:\n", taxDetails);
        response.json(taxDetails);
      });
  });

  // here we are geting the tax detail by its id.
  tax.get('/:tax_id', (request, response, next) => {
    var tax_id = request.params.tax_id;
    var query = knex('tax')
      .select('*').where('tax_id', tax_id)
      .then((taxDetails) => {
        console.log("\nTaxes List:\n", taxDetails[0]);
        response.json(taxDetails[0]);
      });
  });


};

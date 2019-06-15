module.exports = function(shoppingcart, knex) {
  shoppingcart.post('/add',(request, response, next)=>{
        var shoppingCart_details = request.body;
        shoppingCart_details['added_on'] = new Date();
        var insertQuery = knex('shopping_cart').insert(shoppingCart_details).then(()=>{
          var query = knex.select(
            'item_id',
            'product.name',
            'attributes',
            'product.product_id',
            'product.image',
            'product.price',
            'quantity'
          ).from('shopping_cart').join('product','shopping_cart.product_id','=','product.product_id')
          .then((shoppingCart)=>{
            for(let cart of shoppingCart){
              cart['subtotal'] = Number(cart.price)* Number(cart.quantity)
            };
            console.log("\nShopping Cart Details:\n",shoppingCart);
            return response.json(shoppingCart);
          });
        });
    });

    //Get list of products in shopping cart
     shoppingcart.get('/:cart_id',(request, response, next)=>{
       var cart_id = request.params.cart_id;
       var query = knex.select(
         'item_id',
         'product.name',
         'attributes',
         'product.product_id',
         'product.image',
         'product.price',
         'quantity'
       ).from('shopping_cart').join('product','shopping_cart.product_id','=','product.product_id')
       .where('cart_id',cart_id)
       .then((shoppingCart)=>{
         console.log("\nProducts in shopping cart:\n",shoppingCart);
         return response.json(shoppingCart);
       })
     });












};

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 
  userid:String,
  carts: [
    {
      type: mongoose.Schema.Types.Mixed, // Dynamic, flexible objects
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
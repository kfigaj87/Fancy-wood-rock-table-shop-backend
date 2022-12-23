const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productConfig: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = mongoose.model("orders", OrderSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  product: {
    type: String,
    required: true,
  },

  productConfig: {
    tableMaterial: String,
    tableColor: Object,
    objects: Object,
    objectColor: Object,
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

module.exports = mongoose.model("Order", OrderSchema);

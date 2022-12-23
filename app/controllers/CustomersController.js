const CustomerModel = require("../models/CustomerModel");

module.exports = {
  index: (_req, res) => {
    CustomerModel.find({}, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error while fetching Customers",
          error: err,
        });
      }
      res.json(result);
    });
  },

  create: (req, res) => {
    const customer = new CustomerModel({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      deliveryAddress: req.body.deliveryAddress,
      orders: req.body.orders,
    });

    customer.save((err, customer) => {
      if (err) {
        return res.status(500).json({
          message: "Error while creating Customer",
          error: err,
        });
      }
      return res.status(201).json(customer);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;

    CustomerModel.findByIdAndRemove(id, (err, _customer) => {
      if (err) {
        return res.status(500).json({
          message: "Error while deleting Customer",
          error: err,
        });
      }
      return res.status("200").json({
        id: id,
        deleted: true,
      });
    });
  },
};

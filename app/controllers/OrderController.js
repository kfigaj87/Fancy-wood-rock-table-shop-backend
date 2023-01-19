const OrderModel = require("../models/OrderModel");
const CustomerModel = require("../models/CustomerModel");

const mailHelper = require('../helpers/mailHelper')

module.exports = {
  create: (req, res) => {
    CustomerModel.findOne(
      { email: req.body.customer.email },
      (err, customer) => {
        if (err) res.send("err");

        if (!customer) {
          const newCustomer = new CustomerModel(req.body.customer);
          const newOrder = new OrderModel({
            ...req.body,
            customer: newCustomer._id,
          });

          newCustomer.save((err, createdCustomer) => {
            if (err) res.send("err");

            createdCustomer.orders.push(newOrder._id);
            createdCustomer.save();

            newOrder.customer = createdCustomer._id;
            newOrder.save((err, order) => {
              if (err) res.send("err");
              res.json(order);
            });
          });
        } else {
          const newOrder = OrderModel({
            ...req.body,
            customer: customer._id,
          });

          customer.orders.push(newOrder._id);
          newOrder.save((err, order) => {
            if (err) res.send("err");
            mailHelper.sendMail(order, customer)
            res.json({ ...order, message: "Order done" });
          });
        }
      }
    );
  },
};

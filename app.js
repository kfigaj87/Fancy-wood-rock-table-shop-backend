const config = require("./config");
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    throw err;
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const customerRoutes = require("./app/routes/CustomersRoutes")();
app.use("/customers", customerRoutes);

const orderController = require("./app/controllers/OrderController");
app.post("/order/create", orderController.create);

app.listen(config.app.port, () => {
  console.log("Ready to use!");
});

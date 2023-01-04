const config = require("./config");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
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

// nodemailer

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "karolfigaj87@gmail.com",
    pass: "************",
  },
  secure: true,
  tls: { rejectUnauthorized: false },
});

const mailOptions = {
  from: "karolfigaj87@gmail.com", // sender address
  to: "karolfigaj87@gmail.com", // list of receivers
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: "<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>",
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
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

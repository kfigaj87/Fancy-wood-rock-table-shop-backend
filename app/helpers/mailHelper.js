const nodemailer = require("nodemailer");

function sendMail(order, customer) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "karolfigaj87@gmail.com",
      pass: "uoqbaosdsmzwxqnh",
    },
    secure: true,
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: "karolfigaj87@gmail.com",
    to: customer.email,
    subject: `Congratulations! You have just placed an order for a product: ${order.product}`,
    text: "That was easy!",
    html: `Table material: ${order.productConfig.tableMaterial} <br> Table color: ${order.productConfig.tableColor.name} <br> Object: ${order.productConfig.objects} <br> Object Color: ${order.productConfig.objectColor.name}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = {
  sendMail,
};

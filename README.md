# Fancy wood/rock table shop by Karol Figaj

Backend:

Application project written based on node.js, express.js library and mongoDB database.
In the config.js file you can find details about the database.

Each customer saved to the database gets an ID and is created only once.
Each order is assigned to a specific customer, is assigned an ID and can be created multiple times.

To send emails I used "nodemailer" - In the application form, enter your e-mail to receive confirmation of the selected product.

In the project I also used : "mongoose", "express-router", "nodemon", "cors".

## `npm start` - to start the app

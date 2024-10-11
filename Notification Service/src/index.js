const { ServerConfig, Logger } = require("./config"); // If u are requiring from index.js file u don't need to specifically mention the file name i.e. index.js, it will automatically pick the index.js file
const { AboutController, HomeController } = require("./controllers");
const express = require("express");
const apiRoutes = require("./routes");
const Queue = require("./config/queue-config");
const nodemailer = require("nodemailer");
const app = express();
const mailsender = require("./config/email-config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes); // import apiRoutes from the ./routes folder & whenever somebody gives me an URL that starts with /api I will redirect all the requests to the apiRoutes. | |  Link : http://localhost:3000/api
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);
  //Logger.info("Successfully started the Server!", "root");
  await Queue.connectQueue(); //Subscribing/Consuming the message
  console.log(
    "The queue is connected successfully and Subscribing/Consuming the message!"
  ); // If the Queue is connected above print the msg
});

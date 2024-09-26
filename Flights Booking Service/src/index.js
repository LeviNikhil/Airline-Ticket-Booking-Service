const { ServerConfig} = require("./config"); // If u are requiring from index.js file u don't need to specifically mention the file name i.e. index.js, it will automatically pick the index.js file
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiRoutes = require("./routes");
const CRONS = require("./utils/common/cron-jobs");
const Queue = require("./config/queue-config");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes); // import apiRoutes from the ./routes folder & whenever somebody gives me an URL that starts with /api I will redirect all the requests to the apiRoutes. | |  Link : http://localhost:3000/api
app.use("/bookingService/api", apiRoutes); // The request is coming from the Reverse Proxy

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);
  CRONS(); // Calling the function to run the CRON JOBS
  // await Queue.connectQueue();
  // console.log("The queue is connected successfully and Publishing/Producing the message!"); // If the Queue is connected above print the msg

  // Logger.info("Successfully started the Server!", "root");
});

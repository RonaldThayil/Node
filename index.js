const mongoose = require("mongoose");
const User = require("./schema/user");
const express = require("express");
const routes = require("./routes/routes");
const https = require("https");
const router = require("./routes/routes");

try {
  // https
  //   .get("https://jsonplaceholder.typicode.com/todos/1", (resp) => {
  //     let data = "";
  //     // console.log(resp, "respresp");
  //     // A chunk of data has been received.
  //     // resp.on("data", (chunk) => {
  //     //   data += chunk;
  //     //   console.log(data, "datadata");
  //     // });

  //     // // The whole response has been received. Print out the result.
  //     resp.on("end", (resp) => {
  //       console.log(resp, "Hello ");
  //     });
  //   })
  //   .on("error", (err) => {
  //     console.log("Error: " + err.message);
  //   });

  mongoose.connect(
    "mongodb+srv://DB_USERDATA:123456Asd@node-data-db.9rtsp.mongodb.net/userData?retryWrites=true&w=majority"
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
  const app = express();

  //To recognize the incoming Request Object as a JSON Object
  app.use(express.json());

  // To recognize the incoming Request Object as strings or arrays.
  app.use(express.urlencoded({ extended: true }));

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    req.header("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use("/api", routes);
  // app.use("/api/signUp", function (req, res, next) {
  //   res.send("Hello World");
  // });
  app.listen(9000);

  // app.use("./api", router);

  // var server = app.listen(8081, function () {
  //   var host = server.address().address;
  //   var port = server.address().port;
  //   console.log("Example app listening at http://", host, port);
  // });
} catch (error) {
  console.log(error.message, "Connection Error");
}

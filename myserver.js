const express = require("express");
const request = require("request");

const app = express();

// app.get("/api/rates", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/api/rates", function (req, res) {
  console.log(req.query);

  request("https://api.exchangeratesapi.io/latest?base=USD", function (
    error,
    response,
    body
  ) {
    console.log(body);
  });
  // console.log(req.path);
});

app.listen(3000, function () {
  console.log("server is running");
});

// base=CZK&currency=EUR,GBP,USD

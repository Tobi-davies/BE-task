const express = require("express");

const app = express();

app.get("/api/rates", function (req, res) {
  res.send("Hwello");
});

app.listen(3000, function () {
  console.log("server is running");
});

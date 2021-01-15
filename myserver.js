const express = require("express");
const request = require("request");

const app = express();

// app.get("/api/rates", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/api/rates", function (req, res) {
  // console.log(req.query);

  // let rate;
  let newObj;
  let setBase = req.query.base;
  let setsymbols = req.query.symbols;

  request(
    `https://api.exchangeratesapi.io/latest?base=${setBase}&symbols=${setsymbols}`,
    function (error, response, body) {
      console.log(response.statusCode);

      let result = JSON.parse(body);

      if (response.statusCode === 200) {
        // rate = result.rates;
        console.log(JSON.stringify(result));

        newObj = {
          results: result,
        };

        console.log(JSON.stringify(newObj));

        res.send(JSON.stringify(newObj));
      } else {
        res.send(JSON.stringify(result));
      }
    }
  );

  // console.log(Object.keys(rate));
});

app.listen(3000, function () {
  console.log("server is running");
});

// base=CZK&currency=EUR,GBP,USD

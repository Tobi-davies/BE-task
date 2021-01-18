const express = require("express");
const request = require("request");

const app = express();

app.get("/api/rates", function (req, res) {
  let newObj;
  let setBase = req.query.base;
  let setsymbols = req.query.currency;

  request(
    `https://api.exchangeratesapi.io/latest?base=${setBase}&symbols=${setsymbols}`,
    function (error, response, body) {
      console.log(response.statusCode);

      let result = JSON.parse(body);

      if (response.statusCode === 200 && setBase && setsymbols) {
        // console.log(JSON.stringify(result));

        newObj = {
          results: {
            base: result.base,
            date: result.date,
            rates: result.rates,
          },
        };
      } else if (setsymbols === "" && setBase === "") {
        newObj = {
          error: "Base and Currency query parameters are required",
        };
      } else if (setsymbols !== "" && setBase === "") {
        newObj = {
          message: "Base  query parameter is required",
        };
      } else if (setBase !== "" && setsymbols === "") {
        newObj = {
          message: "Currency query parameter is required",
        };
      } else {
        newObj = {
          error: result.error,
          message: `Request failed with status code ${response.statusCode}`,
        };
      }
      res.send(JSON.stringify(newObj));
    }
  );
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is running");
});

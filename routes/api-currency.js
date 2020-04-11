var axios = require("axios");
//APIKEY is stored as a variable in Heroku; for localhost, an .env file is required and is NOT part of the git package
var apiKey = process.env.APIKEY;
const router = require("express").Router();

// module.exports = function(currencyData)
// {
router.get("/:date/:type", function (req, res) {
  console.log(apiKey);
  var type = req.params.type;
  var date = req.params.date;

  //date formate needs to be "YYYY-MM-DD"

  var queryURL =
    "https://api.currencylayer.com/historical?source=USD&currencies=" +
    type +
    "&date=" +
    date +
    "&access_key=" +
    apiKey;
  console.log(queryURL);

  axios
    .get(queryURL)
    .then(function (response) {
      if (response.data.error) {
        return res.status(202).json(response.data.error);
      }
      console.log(response);
      res.json(Object.values(response.data.quotes)[0]);
    })
    .catch(function (error) {
      res.status(500);
      console.log(error);
    });
});
// };
module.exports = router;

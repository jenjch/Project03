var axios = require ("axios");
//APIKEY is stored as a variable in Heroku; for localhost, a security file is required and is NOT part of the git package
var apiKey = process.env.APIKEY || require ("../.env");


module.exports = function(app)
{
    app.get("/currency/:date/:type", function(req, res) 
    {
        var type = req.params.type;
        var date = req.params.date;

        //date formate needs to be "YYYY-MM-DD"

        var queryURL = "https://api.currencylayer.com/historical?source=USD&currencies=   " + type + "&date=" + date + "&access_key=" + apiKey;
        console.log(queryURL);

        axios
        .get(queryURL)
        .then(function(response) 
        {
            console.log(response.data.items);
            res.json(response.data.items);
        });
    });
};
    
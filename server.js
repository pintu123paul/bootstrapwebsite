var express = require('express');
var app = express();
var parser = require('body-parser');
var pg = require('pg'); //Postgresql Database

app.use(express.static('public'));
app.use(parser.json());

var client = new pg.Client({
    user: "nipbryklvzzotr",
    password: "5650ba100016ee51b55083529aadbab9c34de92e393b214826025be5a6caf8b9",
    database: "d3b5auq58e34j9",
    port: 5432,
    host: "ec2-23-21-201-255.compute-1.amazonaws.com",
    ssl: true
});
client.connect();

client.query("CREATE TABLE IF NOT EXISTS blog(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, date date NOT NULL default CURRENT_DATE, summary text NOT NULL, body text NOT NULL)")
 //pgClient.query("CREATE TABLE IF NOT EXISTS comment(id SERIAL UNIQUE PRIMARY KEY,date date NOT NULL default CURRENT_DATE, name varchar(255) NOT NULL, email varchar(255) NOT NULL, comment text NOT NULL, postID Integer NOT NULL REFERENCES blog(id))");

//set port
var port = process.env.PORT || 8080
//views
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var query = pgClient.query("SELECT title, url, languages, info FROM projects ORDER BY date DESC");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    //return the data to the page
    res.render('home', { data: result.rows, act:"home"})
  });
})

app.get('*', function(request, response) {
  response.status(404).send('Page not found.');
});

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});

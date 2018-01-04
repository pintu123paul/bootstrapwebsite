var express = require('express');
var app = express();

//set port
var port = process.env.PORT || 8080

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(request, response){
    response.render('home');
});

app.get('*', function(request, response) {
  response.status(404).send('Page not found.');
});

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});

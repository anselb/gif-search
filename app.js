var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//GET gif search index
app.get('/', function (req, res) {
    var queryString = encodeURIComponent(req.query.term);
    console.log(queryString);
    if (queryString == "") {
        //load trending page if empty search
        giphy.trending(function (err, response) {
            res.render('home', {term: req.query.term, gifs: response.data});
        });
    } else {
        //load an update with
        giphy.search(queryString, function (err, response) {
            res.render('home', {term: req.query.term, gifs: response.data});
        });
    }
});

//GET gif search index without giphy api
// app.get('/', function (req, res) {
//     console.log(req.query.term);
//     var queryString = req.query.term;
//     //Encode the query string to remove white spaces and restricted characters
//     var term = encodeURIComponent(queryString);
//     //Put the search term into the giphy api search url
//     var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'
//
//     http.get(url, function(response) {
//         //Set encoding of response to utf8
//         response.setEncoding('utf8');
//
//         var body = '';
//
//         response.on('data', function(d) {
//             // Continuously update stream with data from giphy
//             body += d;
//         });
//
//         response.on('end', function() {
//             //When data is fully recieved parse into json
//             var parsed = JSON.parse(body);
//             //Render the home template and pass the gif data in to the template
//             res.render('home', {gifs: parsed.data});
//         });
//     });
// });

//Test to GET a gif
// app.get('/hello-gif', function (req, res) {
//     var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
//     res.render('hello-gif', {gifUrl: gifUrl});
// });

//Test to take user input and show
// app.get('/greetings/:name', function (req, res) {
//     var name = req.params.name;
//     res.render('greetings', {name: name});
// });

app.listen(3000, function() {
    console.log('Gif Search listening on port localhost:3000!');
});

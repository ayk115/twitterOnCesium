var express = require('express');
var twitter = require('./twitterCalls');
var app = express();
app.use(express.static(__dirname));

app.use('/twitter', twitter.trendsPlace);

var server = app.listen(8080,function(){
console.log("We have started our server on port 3000");
});


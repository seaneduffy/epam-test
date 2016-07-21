'use strict';

let express = require('express'),
	app = express(),
	http = require('http').Server(app);
	
app.use(express.static('./public'));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('templates/', {});
});

http.listen('3000', function(){
	console.log('Listening at port 3000');
})
// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var cool= require('cool-ascii-faces');

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

//configure instagram app with cliend_id
ig.use({
	client_id: '31793e7a5a2945b984ea2b5dd7a00450',
	client_secret: 'ee47769000124659bfae1925d603c96e'
});

// configure instagram app with client-id
// we'll get to this soon
// SET THE ROUTES
// ===================================================
// home page route - popular images
app.get('/', function (req, res) {
	// use the instagram package to get popular media
	ig.media_popular(function (err, medias, remaining, limit) {
		// render the home page and pass in the popular images
		res.render('pages/index', { grams: medias });
	});
});
app.get('/cool', function(request, response) {
  response.send(cool());
});

// START THE SERVER
// ==================================================
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
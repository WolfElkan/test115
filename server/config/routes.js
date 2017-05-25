var pachyderms = require('../controllers/pachyderms.js')
var users = require('../controllers/users.js')

module.exports = function(app){

	app.get('/pachyderms', function(req, res) {
		pachyderms.index(req, res);
	});

	app.get('/pachyderms/:id', function(req, res) {
		pachyderms.show(req, res);
	});

	app.post('/pachyderms', function(req, res) {
		pachyderms.create(req, res);
	});

	app.put('/pachyderms/:id', function(req, res) {
		pachyderms.update(req, res);
	});

	app.delete('/pachyderms/:id', function(req, res) {
		pachyderms.delete(req, res);
	});

	app.get('/users', function(req, res) {
		console.log('routes: index')
		users.index(req, res);
	});

	app.get('/users/:id', function(req, res) {
		users.show(req, res);
	});

	app.post('/users', function(req, res) {
		if (req.body.action == 'register') {
			console.log('routes: register')
			users.register(req, res);
		} else if (req.body.action == 'login') {
			console.log('routes: login')
			users.login(req, res);
		}
	});

	app.put('/users/:id', function(req, res) {
		users.update(req, res);
	});

	app.delete('/users/:id', function(req, res) {
		users.delete(req, res);
	});

}

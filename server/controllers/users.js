var USER  = require('../models/user.js')
var User  = USER.model
var equip = USER.equip
var valid = USER.valid

var users = {}

var data = {
	'request' : null,
	'success' : false,
	'user_id' : null,
	'invalid' : null,
	'account' : null,
	'dberror' : null,
//	'sescode' : null,
}

users.login = function(request, response) {
	console.log('server: login')
	data.request = 'login'
	User.find({username: request.body.username},function(error,result) {
		if (error) {
			data.dberror = error
			response.json(data)
		} else {
			var user = result[0]
			data.account = Boolean(user)
			if (user) {
				user = equip(user)
				if (user.check(request.body.password)) {
					console.log('server: password correct')
					data.success = true
					data.user_id = user._id
					data.invalid = false
					response.json(data)
				} else {
					console.log('server: password incorrect')
					data.invalid = true
					response.json(data)
				}
			} else {
				console.log('server: no account')
				response.json(data)
			}
		}
	})
}

users.register = function(request,response) {
	console.log('server: register')
	data.request = 'register'
	User.find({username: request.body.username},function(error,result) {
		var user = result[0]
		data.account = Boolean(user)
		if (user) {
			console.log('server: username exists')
			response.json(data)
		} else {
			var new_user = new User({
				username : request.body.username,
				password : request.body.password,
			})
			if (valid(new_user)) {
				console.log('server: creating account')
				new_user.save(function(error,result) {
					if (error) {
						console.log('server: database error')
						data.dberror = error
						response.json(data)
					} else {
						console.log('server: account created')
						data.success = true
						response.json(data)
					}
				})
			} else {
				console.log('server: validation error')
				data.invalid = true
				response.json(data)
			}
		}
	})
}

users.index = function(request, response) {
	console.log('server: index')
	User.find({},function(error,result) {
		console.log('server:',error,result)
		response.json({'users':result})
	})
}

users.show = function(request, response) {
	var id = request.params.id
	User.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

users.update = function(request, response) {
	var id = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	User.update(query,patch,function(error,result) {
		if (error) {
			console.log('server:',500,error)
		} else {
			console.log('server:',201.5)
			response.json(result)
		}
	})
}

users.delete = function(request, response) {
	var id = request.params.id
	User.remove({'_id':id},function(error,result) {
		if (error) {
			console.log('server:',500,error)
		} else {
			console.log('server:',201.9)
			response.json(result)
		}
	})
}

module.exports = users

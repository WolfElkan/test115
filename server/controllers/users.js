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
	var user = request.body	
	User.findOne({username: user.username},function(error,found_user) {
		if (error) {
			data.dberror = error
			response.json(data)
		} else {
			data.account = Boolean(found_user)
			if (found_user) {
				found_user = equip(found_user)
				if (found_user.check(user.password)) {
					console.log('server: password correct')
					data.success = true
					data.user_id = found_user._id
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
				new_user.save(function(error,saved_user) {
					if (error) {
						console.log('server: database error')
						data.dberror = error
						response.json(data)
					} else {
						console.log('server: account created')
						data.success = true
						data.user_id = saved_user._id
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
	console.log('server: users')
	User.find({},function(error,all_users) {
		response.json({'users':all_users})
	})
}

users.show = function(request, response) {
	var id = request.params.id
	User.find({'_id':id},function(error,user) {
		response.json(user)
	})
}

users.update = function(request, response) {
	var id = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	User.update(query,patch,function(error,specs) {
		if (error) {
			console.log('server: dberror',error)
		} else {
			console.log('server: user updated')
			response.json(specs)
		}
	})
}

users.delete = function(request, response) {
	var id = request.params.id
	User.remove({'_id':id},function(error,specs) {
		if (error) {
			console.log('server: dberror',error)
		} else {
			console.log('server: user deleted')
			response.json(specs)
		}
	})
}

module.exports = users

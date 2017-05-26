app.factory('UserFactory',['$http','$valid','$find',function($http,$valid,$find) {

	var factory = {}
	var content = []

	factory.validations = [
		$valid.Present('username'),
		$valid.Present('password'),
		$valid.Confirm('pw_conf','password','Passwords do not match'),
	]

	// factory.register = function(user) {
	// 	// var obj = $valid.ate(factory,user)
	// 	user.action = 'register'
	// 	return $http.post('/users',user)
	// }

	factory.register = function(user,callback) {
		user.action = 'register'
		var obj = $valid.ate(factory,user)
		if (obj.valid) {
			$http.post('/users',user).then(function(returned) {
				if (returned.data.account) {
					obj.valid = false
					obj.errors.push({'field':'username','error':'You already have an account'})
					obj.move = true					
				} else if (returned.data.success) {
					obj.user_id = returned.data.user_id
				}
				callback(obj)
			})
		} else {
			callback(obj)
		}
	}

	factory.login = function(user,callback) {
		user.action = 'login'
		var obj = $valid.ate()
		if (obj.valid) {
			$http.post('/users',user).then(function(returned) {
				if (!returned.data.account) {
					obj.valid = false
					obj.errors.push({'field':'username','error':'You do not have an account'})
					obj.move = true
				} else if (returned.data.invalid) {
					obj.valid = false
					obj.errors.push({'field':'password','error':'Your password is incorrect'})
				} else if (returned.data.success) {
					obj.user_id = returned.data.user_id
				}
				callback(obj)
			})
		} else {
			callback(obj)
		}
	}

	// factory.login = function(user) {
	// 	// var obj = $valid.ate()
	// 	user.action = 'login'
	// 	return $http.post('/users',user)
	// }

	factory.get = function(callback) {
		if (typeof(callback) == 'function') {
			if (content[0]) {
				return callback(content)
			} else {
				$http.get('/users').then(function(returned) {
					content = returned.data.users
					return callback(content)
				})
			}
		} else if (!callback) {
			if (!content[0]) {
				var promise = $http.get('/users')
				promise.then(function(returned) {
					content = returned.data.users
				})
				return promise
			}
		} else {
			throw new TypeError('Expected Function, got',callback.__proto__.constructor.name)
		}
	}

	factory.update = function(id,patch) {
		if ($valid.ate(patch).valid) {
			var promise = $http.put('/users/'+id,{'query':{'_id':id},'patch':patch})
			promise.then(function(returned) {
				if (returned.status == 200) {
					var index = $find.index(content,id)
					content[index] = returned.data
				} else {
					// console.log(returned)
				}
			})
			return promise
		}
	}

	factory.delete = function(id) {
		if ($find.index(content,id)+1) {
			var promise = $http.delete('/users/'+id)
			promise.then(function(returned) {
				if (returned.status == 200) {
					var index = $find.index(content,id)
					for (var i = index; i < content.length; i++) {
						content[i] = content[i+1]
					}
					content.pop()
				} else {
					// console.log(returned)
				}
			})
			return promise
		}
	}

	factory.print = function() {
		if (content.length) {
			console.log(content)
		} else {
			console.log('getting content...')
			factory.get(function(content) {
				console.log(content)
			})
		}
	}

	return factory

}])

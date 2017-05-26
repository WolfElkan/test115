app.factory('UserFactory',['$http','$valid','$find',function($http,$valid,$find) {

	var factory = {}
	var content = []

	factory.validations = [
		$valid.Present('username'),
		$valid.Present('password'),
		$valid.Confirm('pw_conf','password','Passwords do not match'),
	]

	factory.login = function(user) {
		user.action = 'login'
		return $http.post('/users',user)
	}

	factory.register = function(user) {
		var obj = $valid.ate(factory,user)
		console.log(obj)
		if (obj.valid) {
			user.action = 'register'
			obj.promise = $http.post('/users',user)
		}
		return obj
	}

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

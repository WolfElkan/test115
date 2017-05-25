app.factory('UserFactory',['$http',function($http) {

	var factory = {}
	var content = []

	factory.login = function(user) {
		console.log('fac: login')
		user.action = 'login'
		return $http.post('/users',user)
	}

	factory.register = function(new_user) {
		console.log('fac: register')
		if (valid(new_user)) {
			new_user.action = 'register'
			return $http.post('/users',new_user)
		}
	}

	function valid(user) {
		return true
	}

	factory.all = function() {
		return content
	}

	factory.load = function() {
		var promise = $http.get('/users')
		console.log('fac: load')
		promise.then(function(returned) {
			content = returned.data.users
		})
		return promise
	}

	factory.get = function(callback) {
		if (typeof(callback) == 'function') {
			return callback(content)
		} else {
			throw new TypeError('Expected Function, got',callback.__proto__.constructor.name)
		}
	}

	factory.findex = function(id,key='_id') {
		for (var i = 0; i < content.length; i++) {
			if (content[i][key] == id) {
				return i
			}
		}
	}

	factory.find = function(id,key='_id') {
		var index = factory.findex(id,key)
		return content[index]
	}

	factory.update = function(id,patch) {
		if (valid(patch)) {
			$http.put('/users/'+id,{'query':{'_id':id},'patch':patch}).then(function(returned) {
				if (returned.status == 200) {
					var index = factory.findex(id)
					content[index] = returned.data
				} else {
					console.log('fac:',returned)
				}
			})
		}
	}

	factory.delete = function(id) {
		if (factory.findex(id)+1) {
			$http.delete('/users/'+id).then(function(returned) {
				if (returned.status == 200) {
					var index = factory.findex(id)
					for (var i = index; i < content.length; i++) {
						content[i] = content[i+1]
					}
					content.pop()
				} else {
					console.log('fac:',returned)
				}
			})
		}
	}

	factory.print = function() {
		console.log('fac:',content)
	}

	return factory

}])

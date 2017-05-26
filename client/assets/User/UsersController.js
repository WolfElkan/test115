app.controller('UsersController',['$scope','$location','$cookies','UserFactory','$valid',function($scope,$location,$cookies,UserFactory,$valid) {

	if (/[0-9a-f]{24}/.exec($cookies.get('user_id'))) {
		$location.url('/')
	}

	UserFactory.get(function(content) {
		$scope.user_index = content
	})

	$scope.user_log = {}
	$scope.login = function() {
		UserFactory.login($scope.user_log).then(function(returned) {
			if (returned.data.account) {
				if (returned.data.success) {
					$cookies.put('user_id',returned.data.user_id)
					// $cookies.put('sescode',returned.data.sescode)
					$location.url('/')
				} else {
					console.log('cxr: password incorrect')
				}
			} else {
				console.log('cxr: no account')
			}
		})
		$scope.user_log = {}
	}

	$scope.register = function() {
		var obj = UserFactory.register($scope.user_reg)
		if (obj.promise) {
			obj.promise.then(function(returned) {
				$cookies.put('user_id',returned.data.user_id)
				// $cookies.put('sescode',returned.data.sescode)
				$location.url('/')
			})
		}
	}


	$scope.logout = function() {
		console.log('logging out...')
			$cookies.remove('user_id')
			// $cookies.remove('sescode')
			$location.url('/')
	}

	$scope.isLoggedIn = function() {
		return Boolean($cookies.get('user_id'))
	}

	$scope.isbcrypt = function(pw) {
		var bcrypt = /^\$2[ay]?\$\d{2}\$[./0-9A-Za-z]{53}$/
		return Boolean(bcrypt.exec(pw))
	}

	$scope.user_delete = function(id) {
		UserFactory.delete(id)
	}

	$scope.print = function() {
		console.log($cookies.getAll())
	}

}])

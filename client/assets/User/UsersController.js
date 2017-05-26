app.controller('UsersController',['$scope','$location','$cookies','UserFactory','$valid',function($scope,$location,$cookies,UserFactory,$valid) {

	$scope.isLoggedIn = function() {
		return Boolean(/[0-9a-f]{24}/.exec($cookies.get('user_id')))
	}

	if ($scope.isLoggedIn()) {
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
		if (obj.valid) {
			obj.promise.then(function(returned) {
				if (returned.data.account) {
					obj.valid = false
					obj.errors.push({'field':'username','error':'You already have an account. Please register.'})
					$valid.blame($scope,obj,'reg_errors')
					$scope.user_log.username = $scope.user_reg.username
					$scope.user_reg = {}
				} else {
					$cookies.put('user_id',returned.data.user_id)
					// $cookies.put('sescode',returned.data.sescode)
					$location.url('/')
				}
			})
		} else {
			$valid.blame($scope,obj,'reg_errors')
		}
	}

	$scope.logout = function() {
		console.log('logging out...')
			$cookies.remove('user_id')
			// $cookies.remove('sescode')
			$location.url('/')
	}

	$scope.isbcrypt = function(pw) {
		var bcrypt = /^\$2[ay]?\$\d{2}\$[./0-9A-Za-z]{53}$/
		return Boolean(bcrypt.exec(pw))
	}

	$scope.delete = function(id) {
		UserFactory.delete(id)
	}

	$scope.print = function() {
		console.log($cookies.getAll())
	}

}])

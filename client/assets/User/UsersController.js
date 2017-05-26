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

	$scope.user_reg = {}
	$scope.register = function() {
		UserFactory.register($scope.user_reg,function(obj) {
			console.log(obj)
			if (obj.valid) {
				$cookies.put('user_id',obj.user_id)
				// $cookies.put('sescode',obj.sescode)
				$location.url('/')
			} else {
				$valid.blame($scope,obj,'reg_errors')
				if (obj.move) {
					$scope.user_log.username = $scope.user_reg.username
					$scope.user_reg = {}
				}
			}
		})
	}

	$scope.user_log = {}
	$scope.login = function() {
		UserFactory.login($scope.user_log,function(obj) {
			console.log(obj)
			if (obj.valid) {
				$cookies.put('user_id',obj.user_id)
				// $cookies.put('sescode',obj.sescode)
				$location.url('/')
			} else {
				$valid.blame($scope,obj,'log_errors')
				if (obj.move) {
					$scope.user_reg.username = $scope.user_log.username
					$scope.user_log = {}
				}
			}
		})
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
		console.log('obj',obj)
	}

}])
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

	// $scope.register = function() {
	// 	var obj = UserFactory.register($scope.user_reg)
	// 	if (obj.valid) {
	// 		obj.promise.then(function(returned) {
	// 			if (returned.data.account) {
	// 				obj.valid = false
	// 				obj.errors.push({'field':'username','error':'You already have an account. Please log in.'})
	// 				$valid.blame($scope,obj,'reg_errors')
	// 				$scope.user_log.username = $scope.user_reg.username
	// 				$scope.user_reg = {}
	// 			} else {
	// 				$cookies.put('user_id',returned.data.user_id)
	// 				// $cookies.put('sescode',returned.data.sescode)
	// 				$location.url('/')
	// 			}
	// 		})
	// 	} else {
	// 		$valid.blame($scope,obj,'reg_errors')
	// 	}
	// 	obj = undefined
	// }

	$scope.user_reg = {}
	$scope.register = function() {
		UserFactory.register($scope.user_reg,function(obj) {
			console.log(obj)
			if (obj.valid) {
				$cookies.put('user_id',obj.user_id)
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

	// $scope.login = function() {
	// 	var obj = UserFactory.login($scope.user_log)
	// 	obj.promise.then(function(returned) {
	// 		if (returned.data.account) {
	// 			if (returned.data.success) {
	// 				$cookies.put('user_id',returned.data.user_id)
	// 				// $cookies.put('sescode',returned.data.sescode)
	// 				$location.url('/')		
	// 			} else {
	// 				console.log('cxr: password incorrect')
	// 				obj.errors.push({'field':'password','error':'Your password is incorrect.'})
	// 				$valid.blame($scope,obj,'log_errors')		
	// 			}
	// 		} else {
	// 			console.log('cxr: no account')
	// 			obj.errors.push({'field':'username','error':'You do not have an account. Please register.'})
	// 			$valid.blame($scope,obj,'log_errors')
	// 			$scope.user_reg.username = $scope.user_log.username	
	// 		}
	// 		obj = undefined
	// 	})
	// }

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

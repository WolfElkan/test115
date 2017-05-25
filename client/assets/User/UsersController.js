app.controller('UsersController',['$scope','$location','$cookies','UserFactory',function($scope,$location,$cookies,UserFactory,) {

	console.log('UsersController')

	$scope.user_log = {}
	$scope.login = function() {
		console.log('cxr: login')
		UserFactory.login($scope.user_log).then(function(returned) {
			console.log(returned.data)
			if (returned.data.account) {
				if (returned.data.success) {
					console.log('cxr: password correct')
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

	$scope.user_reg = {}
	$scope.register = function() {
		console.log('cxr: register')
		UserFactory.register($scope.user_reg).then(function(returned) {
			console.log('cxr:',returned)
		})
		$location.url('/users')
		$scope.user_reg = {}
	}

	$scope.user_index = UserFactory.all()
	UserFactory.load().then(function(returned) {
		$scope.user_index = returned.data.users
	})

	$scope.logout = function() {
		console.log('cxr: logging out...')
			$cookies.remove('user_id')
			// $cookies.remove('sescode')
			console.log($cookies.get('user_id'))
			$location.url('/')
	}

	$scope.isbcrypt = function(pw) {
		var bcrypt = /^\$2[ay]?\$\d{2}\$[./0-9A-Za-z]{53}$/
		return Boolean(bcrypt.exec(pw))
	}

	$scope.user_delete = function(id) {
		UserFactory.delete(id)
	}

	$scope.print = function() {
		
	}

}])

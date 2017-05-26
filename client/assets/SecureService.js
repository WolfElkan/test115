app.service('$secure',['$cookies','$location',function($cookies,$location) {

	var service = {}

	service.authenticate = function() {
		var user_id = $cookies.get('user_id')
		console.log(user_id)
		if (!user_id || user_id == 'null') {
			$location.url('/login')
		}
	}

	return service
	
}])

app.controller('NewElephant',['$scope','$location','$routeParams','$valid','ElephantFactory','$secure',function($scope,$location,$routeParams,$valid,ElephantFactory,) {

	$secure.authenticate()

	$scope.elephant = {}

	$scope.create = function() {
		$scope.errors = {}
		var elephant = $scope.elephant
		var obj = $valid.ate(ElephantFactory,elephant)
		if (obj.valid) {
			ElephantFactory.create(elephant).then(function(returned) {
				if (returned.status == 200) {
					$location.url('/pachyderms')
				}
			})
		} else {
			$valid.blame($scope,obj)
		}
	}

	$scope.print = function() {
		console.log($scope.elephant)
	}

}])

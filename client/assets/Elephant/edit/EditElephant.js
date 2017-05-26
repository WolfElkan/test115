app.controller('EditElephant',['$scope','$location','$routeParams','$find','ElephantFactory','$secure',function($scope,$location,$routeParams,$find,ElephantFactory,) {

	$secure.authenticate()

	var id = $routeParams.id

	ElephantFactory.get(function(content) {
		$scope.elephant = $find.clone(content,id)
	})

	$scope.update = function() {
		ElephantFactory.update(id,$scope.elephant).then(function( ) {
			$location.url('/pachyderms')
		})
	}

	$scope.delete = function(id) {
		ElephantFactory.delete(id)
		$location.url('/pachyderms')
	}

	$scope.print = function() {
		console.log($scope.elephant)
	}

}])

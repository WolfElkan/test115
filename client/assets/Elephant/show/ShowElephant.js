app.controller('ShowElephant',['$scope','$location','$routeParams','$find','ElephantFactory','$secure',function($scope,$location,$routeParams,$find,ElephantFactory,) {

	$secure.authenticate()

	var id = $routeParams.id

	ElephantFactory.get(function(content) {
		$scope.elephant = $find.element(content,id)
	})

	$scope.delete = function(id) {
		ElephantFactory.delete(id)
	}

	$scope.print = function() {
		ElephantFactory.print( )
	}

}])

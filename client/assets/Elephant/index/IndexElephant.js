app.controller('IndexElephant',['$scope','$location','ElephantFactory','$secure',function($scope,$location,ElephantFactory,$secure) {

	$secure.authenticate()

	ElephantFactory.get(function(content) {
		$scope.pachyderms = content
	})

	$scope.delete = function(id) {
		ElephantFactory.delete(id)
	}

	$scope.print = function() {
		ElephantFactory.print( )
	}

}])

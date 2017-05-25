app.controller('IndexElephant',['$scope','$location','ElephantFactory',function($scope,$location,ElephantFactory,) {

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

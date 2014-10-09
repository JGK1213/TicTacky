var app = angular.module('myApp', []);

app.controller('myController', function ($scope){
		$scope.instructors = [{name: "Alex"},{name: "Lorin"},{name: "Alfonso"},{name: "Sam"},{name: "Meredith"},{name: "Zach"},{name: "Grant"}];

		// $scope.changeColor = function () {
		// 	$scope.isred = false;
		// };

		$scope.down = function () {
			$scope.animation = "next";
		};
});

//ng.class only works when logic is true
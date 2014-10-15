// console.log("hello world");

// document.addEventListener("DOMContentLoaded",
// 	function (){
// 		console.log(document.getElementsByClassName("square")[0]);
// });
// var myHttp;

var TTTApp = angular.module('TTTApp', []);

  TTTApp.directive('ourRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" class="filled" x-ng-clicked="toggle($index)">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=' //two way data-binding
      },

      link: function (scope, elem, attrs) {
        console.log(scope.ratingValue);

        scope.$watch("ratingValue", function(newThing, oldThing){
        scope.stars = [];
        for (var i = 0; i < parseInt(newThing); i++) {
          scope.stars.push({});
        }
        });
        scope.toggle = function(index) {
          scope.ratingValue = index - 1;
        };
      }
    }
  });

TTTApp.controller('TTTController', ["$scope", "$http", function ($scope, $http) {
  myScope = $scope;
  $scope.someVar = 5;
  // var promise = $http.get("https://api.github.com/repos/lorint/AndrewIG/issues");
  // promise.success(function(data){
  //   $scope.issues = data;
  // });
//   $scope.boardRow = 3;
//   $scope.boardColumn = 3;
  

// $scope.fullBoard = function() {

//   $scope.fullBoard.length = ($scope.boardRow * $scope.boardColumn)


  $scope.cellList = [
  {status: "A"}, 
  {status: "B"}, 
  {status: "C"}, 
  {status: "D"}, 
  {status: "E"}, 
  {status: "F"}, 
  {status: "G"}, 
  {status: "H"}, 
  {status: "I"}
  ];
  
  $scope.movecounter = 0;


  // $scope.testJS = function() {
  //   console.log('Correctly accessing JS function.');
  // } ;

  $scope.playerPicks = function(thisCell) {
    console.log("Cell was: " + thisCell.status);
    if (($scope.movecounter % 2) == 0) {
      thisCell.status = "X";  
    } else {
      thisCell.status = "O";
    }


    $scope.checkWinner();

    $scope.movecounter++;


    console.log("Cell is now: " + thisCell.status);
  } ;


  $scope.checkWinner = function() {
    if (

      ($scope.cellList[0].status === $scope.cellList[1].status && $scope.cellList[0].status === $scope.cellList[2].status) ||
      ($scope.cellList[0].status === $scope.cellList[3].status && $scope.cellList[0].status === $scope.cellList[6].status) ||
      ($scope.cellList[0].status === $scope.cellList[4].status && $scope.cellList[0].status === $scope.cellList[8].status) ||

      ($scope.cellList[1].status === $scope.cellList[4].status && $scope.cellList[1].status === $scope.cellList[7].status) ||

      ($scope.cellList[2].status === $scope.cellList[4].status && $scope.cellList[2].status === $scope.cellList[6].status) ||
      ($scope.cellList[2].status === $scope.cellList[5].status && $scope.cellList[2].status === $scope.cellList[8].status) ||
      ($scope.cellList[3].status === $scope.cellList[4].status && $scope.cellList[3].status === $scope.cellList[5].status) ||

      ($scope.cellList[6].status === $scope.cellList[7].status && $scope.cellList[6].status === $scope.cellList[8].status)

      )

      {
        if (($scope.movecounter % 2) == 0) {
          alert("Player X, You Won!");
          // $scope.testString = "Angular source, App, and Controller present";
        }
        else {
          alert("Player O, You Won!");
          // $scope.testString = "Angular source, App, and Controller present";
        }
      }
    };

}]);



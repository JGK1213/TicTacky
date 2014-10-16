

var TTTApp = angular.module('TTTApp', ["firebase"]);


TTTApp.controller('TTTController', function ($scope, $firebase) {
  
$scope.remoteGameContainer = 
  $firebase(new Firebase("https://jackietictac.firebaseio.com/databaseGameContainer")) ;
  // Don't forget to change "tttbyrichard" to your Firebase app name.

  $scope.cellListArray = [
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
  $scope.xWin = 0;
  $scope.oWin = 0;
  $scope.writeWin = "";
  $scope.tieGameX = "";
  $scope.startXorO = 0;
  $scope.firstString = "X starts!";
  $scope.isDisabled = false;




   // This container object is what gets synced:
  $scope.gameContainer = {
    cellList: $scope.cellListArray,
    movecounter: $scope.movecounter,
    writeWin: $scope.writeWin,
    tieGame: $scope.tieGameX,
    xWin: $scope.xWin,
    oWin: $scope.oWin,
    startXorO: $scope.startXorO,
    firstString: $scope.firstString,
    isDisabled: $scope.isDisabled
  } ;

  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase node (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
  $scope.$watch('gameContainer', function() {
    console.log('gameContainer changed!') ;
  }) ;


  $scope.playerPicks = function(thisCell) {
    console.log("Cell was: " + thisCell.status);
    if (($scope.gameContainer.startXorO % 2) == 0){
      if(thisCell.status != "X" && thisCell.status != "O") {
        if (($scope.gameContainer.movecounter % 2) == 0) {
        thisCell.status = "X";  
        } 
        else {
        thisCell.status = "O";
        }
        $scope.checkWinner();

        $scope.gameContainer.movecounter++;
        if ($scope.gameContainer.movecounter > 0) {
            $scope.gameContainer.isDisabled = true;
          }
        }
      }
      else {
        if(thisCell.status != "X" && thisCell.status != "O") {
          if (($scope.gameContainer.movecounter % 2) == 0) {
          thisCell.status = "O";  
          } 
          else {
          thisCell.status = "X";
          }
          $scope.checkWinner();

          $scope.gameContainer.movecounter++;
          if ($scope.gameContainer.movecounter > 0) {
            $scope.gameContainer.isDisabled = true;
          }
        }
      }
  
  

    console.log("Cell is now: " + thisCell.status);
    };

  $scope.choosePlayer = function() {
    $scope.gameContainer.startXorO++;
    if (($scope.gameContainer.startXorO % 2) == 0) {
      $scope.gameContainer.firstString = "X starts!";
    }
      else {
        $scope.gameContainer.firstString = "O starts!";
      }
    if ($scope.gameContainer.startXorO == 2) {
      $scope.gameContainer.startXorO = 0;
    }
    

  };


  $scope.checkWinner = function() {
    if (

      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[1].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[2].status) ||
      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[3].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[6].status) ||
      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[8].status) ||

      ($scope.gameContainer.cellList[1].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[1].status === $scope.gameContainer.cellList[7].status) ||

      ($scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[6].status) ||
      ($scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[5].status && $scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[8].status) ||
      ($scope.gameContainer.cellList[3].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[3].status === $scope.gameContainer.cellList[5].status) ||

      ($scope.gameContainer.cellList[6].status === $scope.gameContainer.cellList[7].status && $scope.gameContainer.cellList[6].status === $scope.gameContainer.cellList[8].status)

      )

      {
        if (($scope.gameContainer.movecounter % 2) == 0) {
          $scope.gameContainer.writeWin = "Player X, You Won!";
          $scope.gameContainer.xWin++;
        }
        else {
          $scope.gameContainer.writeWin = "Player O, You Won!";
          $scope.gameContainer.oWin++;
        }
      }
      else if ($scope.gameContainer.movecounter == 8){
        $scope.gameContainer.tieGame = "Tie game!";
       }

    };

  //    $scope.winCount = function() {
  //     if ($scope.gameContainer.writeWin = "Player X, you Won!") {
  //       $scope.gameContainer.xWin++;
  //     }
  //     else if ($scope.gameContainer.writeWin = "Player O, You Won!") {
  //       $scope.gameContainer.oWin++;
  //     }
  // };

    $scope.resetGame = function() {
      $scope.gameContainer.writeWin = "";
      $scope.gameContainer.tieGame = "";
      $scope.gameContainer.isDisabled = false;
      $scope.gameContainer.movecounter=0;
      $scope.gameContainer.cellList = [
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
    };

});

//tie logic = done
//reset writeWin and tieGame = fixed
//drag and drop
//end game, after winner no more clickable area
//win counter = done
//disable button after 1st move

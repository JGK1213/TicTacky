

var TTTApp = angular.module('TTTApp', ["firebase"]);


TTTApp.controller('TTTController', function ($scope, $firebase) {
  

$scope.remoteGameContainer = 
  $firebase(new Firebase("https://jackietictac.firebaseio.com/databaseGameContainer"));
  // Don't forget to change "tttbyrichard" to your Firebase app name.

  $scope.whosTurn = {  
       turn : true
   }

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

  // {status: "0", image: [{name: 'test', src: 'image_new.jpg'}], num: 1}, 
  
  $scope.movecounter = 0;
  $scope.xWin = 0;
  $scope.oWin = 0;
  $scope.writeWin = "";
  $scope.tieGameX = "";
  $scope.startXorO = 0;
  $scope.firstString = "X starts!";
  $scope.isDisabled = false;
  $scope.hideImageX = false;
  $scope.hideImageO = false;




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
    isDisabled: $scope.isDisabled,
    hideImageX: $scope.hideImageX,
    hideImageO: $scope.hideImageO,
    whosTurn : $scope.whosTurn
  };

  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase node (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer");

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
  $scope.$watch('gameContainer', function() {
    console.log('gameContainer changed!');
  });


  $scope.playerPicks = function(thisCell) {
    console.log("Cell was: " + thisCell.status);
    if (($scope.gameContainer.startXorO % 2) == 0){
      if(thisCell.status != "X" && thisCell.status != "O") {
      
        if ($scope.whosTurn) {
           thisCell.status = "X";  
           $scope.whosTurn = false;
        } 
        else {
            thisCell.status = "O";
            $scope.whosTurn = true;
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
        if ($scope.whosTurn) {
          thisCell.status = "O";
          $scope.whosTurn = false;  
        } 
        else {
          thisCell.status = "X"
          $scope.whosTurn = true;
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

  // $scope.revealImage = function() {
  //   if (($scope.gameContainer.startXorO % 2) == 0){
  //     if ($scope.whosTurn/*($scope.gameContainer.movecounter % 2) == 0)*/) { $scope.gameContainer.hideImageX = false; 
  //       }
  //     else {
  //       $scope.gameContainer.hideImageX = true;
  //     }
  //   }
  //   else {
  //     if (($scope.gameContainer.movecounter % 2) == 0) {
  //       $scope.gameContainer.hideImageX = true;  
  //       } 
  //     else {
  //       $scope.gameContainer.hideImageX = false;
  //       }
  //     }
  // };

  // $scope.revealImage2 = function() {
  //   if (($scope.gameContainer.startXorO % 2) == 0){
  //     if (($scope.gameContainer.movecounter % 2) == 0) { $scope.gameContainer.hideImageO = true;  
  //       }
  //     else {
  //       $scope.gameContainer.hideImageO = false;
  //     }
  //   }
  //   else {
  //     if (($scope.gameContainer.movecounter % 2) == 0) {
  //       $scope.gameContainer.hideImageO = false;  
  //       } 
  //     else {
  //       $scope.gameContainer.hideImageO = true;
  //       }
  //     }
  // };

  $scope.choosePlayer = function() {
    $scope.whosTurn = !$scope.whosTurn;
      if ($scope.whosTurn) {
      $scope.gameContainer.firstString = "X starts!";
      }
      else {
      $scope.gameContainer.firstString = "O starts!";
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
        if ($scope.whosTurn) {
          $scope.gameContainer.writeWin = "Player O, You Won!";
          $scope.gameContainer.oWin++;
        }
        else {
          $scope.gameContainer.writeWin = "Player X, You Won!";
          $scope.gameContainer.xWin++;
        }
      }
        
      else if ($scope.gameContainer.movecounter == 8){
      $scope.gameContainer.tieGame = "Tie game!";
      }


    $scope.resetGame = function() {
      $scope.gameContainer.writeWin = "";
      $scope.gameContainer.tieGame = "";
      $scope.gameContainer.isDisabled = false;
      $scope.gameContainer.movecounter=0;
      $scope.whosTurn = {  
       turn : true
      };
      
      $scope.gameContainer.firstString = "X starts!";

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
  }
});

//tie logic = done
//reset writeWin and tieGame = fixed
//drag and drop
//end game, after winner no more clickable area
//win counter = done
//disable button after 1st move

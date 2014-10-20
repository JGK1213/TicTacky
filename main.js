

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
  $scope.firstString = "Red starts!";
  $scope.isDisabled = false;
  $scope.gameWonX = false;
 




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
    whosTurn : $scope.whosTurn,
    gameWon: $scope.gameWonX
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
    if ($scope.gameContainer.gameWon != true) {
      if (($scope.gameContainer.startXorO % 2) == 0){
        if(thisCell.status != "X" && thisCell.status != "O") {
        
          if ($scope.gameContainer.whosTurn) {
             thisCell.status = "X";
             $scope.gameContainer.whosTurn = false;
          } 
          else {
              thisCell.status = "O";
              $scope.gameContainer.whosTurn = true;
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
          if ($scope.gameContainer.whosTurn) {
            thisCell.status = "O";
            $scope.gameContainer.whosTurn = false;  
          } 
          else {
            thisCell.status = "X"
            $scope.gameContainer.whosTurn = true;
          }
          $scope.checkWinner();
          $scope.gameContainer.movecounter++;
        if ($scope.gameContainer.movecounter > 0) {
            $scope.gameContainer.isDisabled = true;
        }
        }
      }
    }
  console.log("Cell is now: " + thisCell.status);
  };

  

  $scope.choosePlayer = function() {
    $scope.gameContainer.whosTurn = !$scope.gameContainer.whosTurn;
      if ($scope.gameContainer.whosTurn) {
      $scope.gameContainer.firstString = "Red starts!";
      }
      else {
      $scope.gameContainer.firstString = "Blue starts!";
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
        if ($scope.gameContainer.whosTurn) {
          $scope.gameContainer.writeWin = "Blue, You Won!";
          $scope.gameContainer.oWin++;
          $scope.gameContainer.gameWon = true;
        }
        else {
          $scope.gameContainer.writeWin = "Red, You Won!";
          $scope.gameContainer.xWin++;
          $scope.gameContainer.gameWon = true;
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
      $scope.gameContainer.whosTurn = {  
       turn : true
      };
      $scope.gameContainer.gameWon = false;
      
      $scope.gameContainer.firstString = "Red starts!";

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

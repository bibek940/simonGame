var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;


function nextSequence() {
     userClickedPattern = [];
     level++;
     $("#level-title").text("Level " + level);

     var randomNumber = Math.floor(Math.random() * 4)
     var randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);
     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);

}

function playSound(color) {
     var audio = new Audio("sounds/" + color + ".mp3");

     audio.play();
};

function handleButtonClick() {
     $(".btn").click(function () {
         if (gameStarted) { 
             var userChosenColour = $(this).attr("id");
             userClickedPattern.push(userChosenColour);
 
             playSound(userChosenColour);
             animatePress(userChosenColour);
 
            
             checkAnswer(userClickedPattern.length - 1);
         }
     });
 }

function animatePress(currentColour) {
     $("#" + currentColour).addClass("pressed");
     setTimeout(function () {
          $("#" + currentColour).removeClass("pressed");
     }, 100);
}



$(document).keydown(function (event) {
     if (event.key === " " && !gameStarted) {
          startOver();
          
          gameStarted = true;
          nextSequence();


     }
});

function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

          if (userClickedPattern.length === gamePattern.length) {
               setTimeout(nextSequence, 1000);
          }
     } else {
          playSound("wrong");
          $("body").addClass("game-over");
          $("#level-title").text("Game Over, Press Space Bar to Restart");

          setTimeout(function () {
               $("body").removeClass("game-over");
          }, 200);


          startOver();
     }
}

function startOver() {
     level = 0;
     gamePattern = [];
     userClickedPattern = [];
     gameStarted = false;
}

$(document).ready(handleButtonClick );
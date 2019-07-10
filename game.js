var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;
$(".btn").on("click", function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatedPress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


  $(document).on("keypress", function(){
    if(gameStart === false){
      $("#level-title").text("Level "+level);
      nextSequence();
      gameStart = true;
    }
  });


function nextSequence(){
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#level-title").text("Level "+level);
  //add the new color to the game pattern
  gamePattern.push(randomChosenColor);
  //show the sequence of the color patterns
  if(gamePattern.length > 1){
    /**
      looping through the game pattern setting a timout function
      he timeout function is multiplied by the index in order to keep the animations
      from happening at the sime time. so index of 1 happens in 500 milliseconds
      index of 2 happens at  1000 milliseconds
    **/
    $.each(gamePattern, function(index, value){
        setTimeout(function(){
          $("#"+ gamePattern[index]).fadeOut(100).fadeIn(100);
          playSound(gamePattern[index]);
        }, 570 * index);
    });

      }
   else{
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }
}

function playSound(soundName){
  var audio = new Audio(`sounds/${soundName}.mp3`);
  audio.play();

  //The long way
  // var audioElement = document.createElement("audio");
  // audioElement.setAttribute("src", "sounds/"+randomChosenColor+".mp3");
  // audioElement.play();
}

function animatedPress(currentColor){
  $(`#${currentColor}`).addClass("pressed");
  //remove the class after some time
  setTimeout(function(){
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    console.log("User: "+userClickedPattern);
    console.log("Game: "+gamePattern);

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    StartOver();
  }
}

function StartOver(){
  level = 0;
  gameStart = false;
  gamePattern = [];
}

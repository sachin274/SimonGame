var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started=true;

var level=0;

$(document).keypress(function(){
    if(started){
        $("h1").text("Level "+level);
        nextSequence();
        started=false;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=true;
}
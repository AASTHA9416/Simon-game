var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


let started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level 0")

        nextSequence();
    }
    started=true;
});

$(".btn").on('click',function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut().fadeIn(100);
    playSound(randomChosenColour);

}



function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){


    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("sucess "+userClickedPattern[currentLevel]+" and "+gamePattern[currentLevel]);
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
nextSequence();
        },1000);
        userClickedPattern=[];
    }
}
else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    console.log("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
}
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}

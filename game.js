var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false

//to start click any key
$(document).on("keydown",function (){
  if(!started){

    nextSequence();
    started=true;
  }
});


// button press event by user
$(".btn").on("click",function handle(e){
 
 var userChosenColour=$(this).attr("id");
 userClickedPattern.push(userChosenColour);
 console.log("userclicked patt  "+userClickedPattern);
 playSound(userChosenColour);
 animatePress(userChosenColour);

 //to check 
checkAnswer(userClickedPattern.length-1);

});


//to check answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    currentLevel++;
    if(currentLevel==level){
      //or userClickedPattern.length=gamePattern.length
      userClickedPattern=[];
      setTimeout(function(){

        nextSequence();
      },1000);
    }
    console.log("success");
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
     $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    restart();
  }
}

//restart
function restart(){
  gamePattern=[];
  level=0;
  userClickedPattern=[];
  started=false;
  console.log("restarted");
}

//audio function
function playSound(name){ 
   var audio=new Audio( "./sounds/"+ name+".mp3");
   audio.play();
};


//to animate which button is got clicked
function animatePress(currentColor){
$("#" + currentColor).addClass("pressed");
setTimeout(function(){ $("#" + currentColor).removeClass("pressed")},100);
}



//for sequence
function nextSequence(){
    //random function
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);
    console.log("gamepattern "+gamePattern);

    //transition when u press any key
    $("#"+randomChoosenColor).fadeOut().fadeIn();

   //level increment
    level=level+1;
    $("h1").text("Level "+level);
   //play sound
    playSound(randomChoosenColor);
  
}

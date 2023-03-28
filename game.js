//alert("Working!");
const gamePattern = [];
const buttonColours = ["red","blue","green","yellow"];
const userClickedPattern = [];
let level = 0;
let started = false;


//GAME START
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});


//COMPUTER CONTROLS
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];

    let color_id = "#"+randomChosenColour;
    gamePattern.push(randomChosenColour);
    $(color_id).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// USER CLICK CONTROLS
$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if(checkAnswer(userClickedPattern.length-1)){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern.splice(0,userClickedPattern.length);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        userClickedPattern.splice(0,userClickedPattern.length);
        gamePattern.splice(0,gamePattern.length);
        started=false;
        level = 0;
    }
});


//SOUND FUNCTION
function playSound(name){

    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


//ANIMATION ONPRESS
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


//ANSWER CHECK LOGIC
function checkAnswer(currentLevel){
    return gamePattern[currentLevel]==userClickedPattern[currentLevel];
}



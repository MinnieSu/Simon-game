var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    } 
});

//1) create a game pattern of random chosen color. 

function nextSequence(){
    // 8)Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    playSound(randomChosenColor);

    //2)create a flash effect to the button that has the same color as randomChosenColor
    // option 1 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // option 2
    // $("#"+randomChosenColor).fadeTo(100, 0.3, function(){$(this).fadeTo(200, 1.0)});
}
    

// 4) detect when any of the buttons are clicked, and log them as user clicked pattern.
    // option 1 
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // 8)pass the index of the last answer to checkAnswer function after user clicked and chosen their answer.
    checkAnswer(userClickedPattern.length - 1);
});

// option 2
// $(".btn").on("click",function(event){
//     var userChosenColor = event.target.id;
//     userClickedPattern.push(userChosenColor);
//     console.log(userClickedPattern);
//     });

// 5)add sounds to button clicks
function playSound(name){
    //3)play sound corresponds to the button.
    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
};

// 6)add animation to use clicks.
function animatePress(currentColor){
    
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
        },100);
}

// 8) Check if the most recent answer is the same as the game pattern, if yes, check if two sequences are the same. 
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()},1000);
            }
        } else {
        // 9)apply sound + flash effects and change h1 when user gets it wrong.
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}


// 10)when user gets wrong, reset the values of level, gamePattern and started variables.
function startOver(){
    level = 0; 
    gamePattern = [];
    started = false;
}
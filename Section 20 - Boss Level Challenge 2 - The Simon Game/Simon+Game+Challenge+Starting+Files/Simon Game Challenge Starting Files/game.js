// document.addEventListener("DOMContentLoaded", function() {
//     alert("JavaScript successfully loaded");
// })

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var level = 0;

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

function nextSequence() {
    userClickPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $(`#${randomChosenColor}`).fadeOut().fadeIn();

    playSound(randomChosenColor);

    level += 1;
    $("h1").text(`Level ${level}`);
};

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
};


var gameStarted = false;
$(document).keydown(function(event){
    if (gameStarted === false){
        gameStarted = true;
        console.log("Game started!");
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success!")
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    else {
        console.log("Failure!")
        gameStarted = false;
        $("h1").text("Game Over! Press any key to restart");
        $(body).addClass("game-over");
        setTimeout(function() {
            $(body).removeClass("game-over");
        }, 200);
        level = 0;
    }
};


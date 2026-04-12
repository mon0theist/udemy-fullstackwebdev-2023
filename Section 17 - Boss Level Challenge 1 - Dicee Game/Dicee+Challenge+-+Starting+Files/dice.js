document.addEventListener("DOMContentLoaded", function() {

    // generate random numbers 1-6 for each player
    var p1roll = Math.floor(Math.random() * 6) + 1;
    var p2roll = Math.floor(Math.random() * 6) + 1;

    // load dice[p1roll].png and dice[p2roll].png
    // format string?
    // `dice${p1roll}.png`, `dice${p2roll}.png`
    // set in attribute list
    // document.queryselector().setAttribute(attribute, value)

    // update img1
    document.querySelector(".img1").setAttribute('src', `images/dice${p1roll}.png`);

    // update img2
    document.querySelector(".img2").setAttribute('src', `images/dice${p2roll}.png`);

    // set winner header text
    if (p1roll > p2roll){
        // p1 wins
        document.querySelector("h1").innerText = "Player 1 Wins!"
    }
    else if (p2roll > p1roll) {
        // p2 wins
        document.querySelector("h1").innerText = "Player 2 Wins!"
    }
    else {
        //draw
        document.querySelector("h1").innerText = "It's a Draw!"
    }

});
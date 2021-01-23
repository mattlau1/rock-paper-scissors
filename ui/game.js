const plays = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let cpuScore = 0;

function computerPlay() {
    // random number between 0 and 2
    return plays[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    const p1Play = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    const cpuPlay = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1).toLowerCase();
    displayChoice(p1Play, cpuPlay);

    const tieMsg = `It's a tie! ${p1Play} ties with ${cpuPlay}!`;
    const winMsg = `You win! ${p1Play} beats ${cpuPlay}!`;
    const loseMsg = `You lose! ${cpuPlay} beats ${p1Play}!`;
    const errMsg = `Error: ${p1Play} and ${cpuPlay}`;
    
    if (p1Play === cpuPlay) {
        // rock and rock
        return tieMsg;

    } else if (p1Play == plays[0] && cpuPlay == plays[2]) {
        // p1 rock cpu scissors
        playerScore++;
        return winMsg;

    } else if (p1Play == plays[1] && cpuPlay == plays[2]) {
        // p1 paper cpu scissors
        cpuScore++;
        return loseMsg;

    } else if (p1Play == plays[0] && cpuPlay == plays[1]) {
        // p1 rock cpu paper
        cpuScore++;
        return loseMsg;

    } else if (p1Play == plays[2] && cpuPlay == plays[1]) {
        // p1 scissors cpu paper
        playerScore++;
        return winMsg;

    } else if (p1Play == plays[1] && cpuPlay == plays[0]) {
        // p1 paper cpu rock
        playerScore++;
        return winMsg;

    } else if (p1Play == plays[2] && cpuPlay == plays[0]) {
        // p1 scissors cpu 
        cpuScore++;
        return loseMsg;

    }
    return errMsg;
}

function game(playerSelection, maxRounds) {
    for (let i = 0; i < maxRounds; i++) {
        let playerSelection = window.prompt("Scissors, Paper or Rock?");
        let computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
    }
}

function buttonHandler(e) {
    if (this.getAttribute('data-choice') === 'scissors') {
        console.log("scissors");
        console.log(playRound("Scissors", computerPlay()));
    } else if (this.getAttribute('data-choice') === 'paper') {
        console.log("paper");
        console.log(playRound("Paper", computerPlay()));
    } else if (this.getAttribute('data-choice') === 'rock') {
        console.log("rock");
        console.log(playRound("Rock", computerPlay()));
    }
    
    checkScores();
    displayScore();
}

function displayChoice(p1Play, cpuPlay) {
    const pChoice = document.getElementById("playerChoice");
    const cpuChoice = document.getElementById("cpuChoice");

    pChoice.className = '';
    if (p1Play === plays[0]) {
        // rock
        pChoice.classList.add("rBtn");
    } else if (p1Play === plays[1]) {
        // paper
        pChoice.classList.add("pBtn");
    } else if (p1Play === plays[2]) {
        // scissors
        pChoice.classList.add("sBtn");
    }

    cpuChoice.className = '';
    if (cpuPlay === plays[0]) {
        // rock
        cpuChoice.classList.add("rBtn");
    } else if (cpuPlay === plays[1]) {
        // paper
        cpuChoice.classList.add("pBtn");
    } else if (cpuPlay === plays[2]) {
        // scissors
        cpuChoice.classList.add("sBtn");
    }
}

function displayScore() {
    document.getElementById("playerScore").innerHTML = playerScore;
    document.getElementById("cpuScore").innerHTML = cpuScore;
}

function checkScores() {
    let maxScore = 5;
    if (playerScore === maxScore) {
        document.getElementById("wlContainer").style.visibility = "visible";
        document.getElementById("game").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("wlText").innerHTML = "You won!";
        document.getElementById("endScore").innerHTML = `Score: ${playerScore}-${cpuScore}`;
        playerScore = 0;
        cpuScore = 0;
    } else if (cpuScore === maxScore) {
        document.getElementById("wlContainer").style.visibility = "visible";
        document.getElementById("game").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("wlText").innerHTML = "You lost!";
        document.getElementById("endScore").innerHTML = `Score: ${playerScore}-${cpuScore}`;
        playerScore = 0;
        cpuScore = 0;
    }
    
}

document.getElementById("wlContainer").style.visibility = "hidden";
let buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener('mousedown', buttonHandler));


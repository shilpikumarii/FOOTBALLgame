let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

function resetScore(scoreStr) {
  score = scoreStr ? JSON.parse(scoreStr) : {
    win: 0,
    lost: 0,
    tie: 0,
  };

  score.displayScore = function() {
    return `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
  };
  showResult();
}

function generateComputerChoice() {
  let randomNumber = Math.random() * 3;
  if (randomNumber > 0 && randomNumber <= 1) {
    return 'Bat';
  } else if (randomNumber > 1 && randomNumber <= 2) {
    return 'Ball';
  } else {
    return 'Stump';
  }
}

function getResult(userMove, computerMove) {
  if (userMove === 'Bat') {
    if (computerMove === 'Ball') {
      score.win++;
      return 'User won';
    } else if (computerMove === 'Bat') {
      score.tie++;
      return `It's a tie`;
    } else if (computerMove === 'Stump') {
      score.lost++;
      return 'Computer has won';
    }
  } else if (userMove === 'Ball') {
    if (computerMove === 'Ball') {
      score.tie++;
      return `It's a tie`;
    } else if (computerMove === 'Bat') {
      score.lost++;
      return 'Computer has won';
    } else if (computerMove === 'Stump') {
      score.win++;
      return 'User won';
    }
  } else if (userMove === 'Stump') {
    if (computerMove === 'Ball') {
      score.lost++;
      return 'Computer has won';
    } else if (computerMove === 'Bat') {
      score.win++;
      return 'User won';
    } else if (computerMove === 'Stump') {
      score.tie++;
      return `It's a tie`;
    }
  }
}

function showResult(userMove, computerMove, result) {
  localStorage.setItem('Score', JSON.stringify(score));
  document.querySelector('#user-move').innerText = userMove ? `You have chosen ${userMove}` : '';
  document.querySelector('#computer-move').innerText = computerMove ? `Computer Choice is ${computerMove}` : '';
  document.querySelector('#result').innerText = result || '';
  document.querySelector('#score').innerText = score.displayScore();
}

function handleUserChoice(userMove) {
  let computerChoice = generateComputerChoice();
  let resultMsg = getResult(userMove, computerChoice);
  showResult(userMove, computerChoice, resultMsg);
}

function resetGame() {
  localStorage.clear();
  resetScore();
}

// Two Player Mode
let twoPlayerMode = false;
let player1Choice = null;
let player2Choice = null;

function startTwoPlayerMode() {
  twoPlayerMode = true;
  document.querySelector('#two-player-results').style.display = 'block';
  document.querySelector('#user-move').innerText = '';
  document.querySelector('#computer-move').innerText = '';
  document.querySelector('#result').innerText = '';
  document.querySelector('#player1-move').innerText = '';
  document.querySelector('#player2-move').innerText = '';
  document.querySelector('#two-player-result').innerText = '';
}

function handleTwoPlayerChoice(player, choice) {
  if (player === 1) {
    player1Choice = choice;
    document.querySelector('#player1-move').innerText = `Player 1 chose ${choice}`;
  } else if (player === 2) {
    player2Choice = choice;
    document.querySelector('#player2-move').innerText = `Player 2 chose ${choice}`;
  }

  if (player1Choice && player2Choice) {
    let resultMsg = getTwoPlayerResult(player1Choice, player2Choice);
    document.querySelector('#two-player-result').innerText = resultMsg;
    player1Choice = null;
    player2Choice = null;
  }
}

function getTwoPlayerResult(player1Move, player2Move) {
  if (player1Move === player2Move) {
    return `It's a tie`;
  } else if (
    (player1Move === 'Bat' && player2Move === 'Ball') ||
    (player1Move === 'Ball' && player2Move === 'Stump') ||
    (player1Move === 'Stump' && player2Move === 'Bat')
  ) {
    return 'Player 1 wins!';
  } else {
    return 'Player 2 wins!';
  }
}

// Event listeners for two-player mode
document.querySelectorAll('.Choice-button').forEach(button => {
  button.addEventListener('click', () => {
    if (twoPlayerMode) {
      if (!player1Choice) {
        handleTwoPlayerChoice(1, button.getAttribute('data-choice'));
      } else if (!player2Choice) {
        handleTwoPlayerChoice(2, button.getAttribute('data-choice'));
      }
    }
  });
});
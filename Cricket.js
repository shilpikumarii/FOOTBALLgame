const socket = io('http://localhost:3000');

const choiceButtons = document.querySelectorAll('.Choice-button');
const player1Move = document.querySelector('#player1-move');
const player2Move = document.querySelector('#player2-move');
const resultDisplay = document.querySelector('#result');

// Handle player choice
choiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.getAttribute('data-choice');
    socket.emit('playerChoice', choice);
  });
});

// Update player choices
socket.on('updatePlayers', (players) => {
  const playerIds = Object.keys(players);
  if (playerIds.length === 2) {
    player1Move.innerText = `Player 1 chose: ${players[playerIds[0]].choice || 'Waiting...'}`;
    player2Move.innerText = `Player 2 chose: ${players[playerIds[1]].choice || 'Waiting...'}`;
  } else {
    player1Move.innerText = 'Waiting for another player...';
    player2Move.innerText = '';
  }
});

// Display game result
socket.on('gameResult', (result) => {
  resultDisplay.innerText = result;
});

// Reset game
function resetGame() {
  socket.emit('resetGame');
}
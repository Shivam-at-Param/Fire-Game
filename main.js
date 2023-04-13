// Define variables for the game
var mazeLayout = [
  // Define maze layout here
  // 0: Empty cell
  // 1: Wall
  // 2: Fuel source
  // 3: Exit
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 0, 2, 0, 1],
  [1, 1, 1, 1, 1]
];

var player = {
  x: 1,
  y: 1,
  fuel: 100,
  score: 0
};

var gameScreen = document.getElementById('game-screen');
var fuelDisplay = document.getElementById('fuel');
var scoreDisplay = document.getElementById('score');


// Create maze layout on game screen
for (var i = 0; i < mazeLayout.length; i++) {
  
  var row = document.createElement('div');
  row.className = 'column';

  for (var j = 0; j < mazeLayout[0].length; j++) {
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.x = i; // Use j for column index
    cell.dataset.y = j; // Use i for row index

    if (mazeLayout[i][j] === 1) {
      cell.className += ' wall';
    }

    row.appendChild(cell);        /*  0 0  01 02 03 */
  }

  gameScreen.appendChild(row);
}



function logGameState() {
  // console.clear();
  console.log("Player position: (" + player.x + ", " + player.y + ")");
  console.log("Maze layout:");
  console.table(mazeLayout);
}


// Update player position on game screen
function updatePlayer() {
  var playerCell = document.querySelector('.cell.player');
  if (playerCell) {
    playerCell.classList.remove('player');
    playerCell.innerHTML = '&nbsp;'; // Add non-breaking space to give cell height
  }

  var newPlayerCell = document.querySelector(`.cell[data-x="${player.x}"][data-y="${player.y}"]`);
  if (newPlayerCell) {
    newPlayerCell.classList.add('player');
  }
  updatePlayerStats();
  // logGameState();
}


// Handle user input for player movement
function handleKeyPress(event) {
  var key = event.key;

  if (key === "ArrowLeft" && !isWall(player.x - 1, player.y)) { // Left arrow
    player.x--;
  } else if (key === "ArrowRight" && !isWall(player.x + 1, player.y)) { // Right arrow
    player.x++;
  } else if (key === "ArrowUp" && !isWall(player.x, player.y - 1)) { // Up arrow
    player.y--;
  } else if (key === "ArrowDown" && !isWall(player.x, player.y + 1)) { // Down arrow
    player.y++;
  }

  updatePlayer();
}



// Check if player position is a wall
function isWall(x, y) {
  if (x < 0 || x >= mazeLayout.length || y < 0 || y >= mazeLayout[0].length) {
    return true;
  }

  return mazeLayout[x][y] === 1;
}

// Check if player position is a fuel source
function isFuel(x, y) {
  if (x < 0 || x >= mazeLayout.length || y < 0 || y >= mazeLayout[0].length) {
    return false;
  }

  return mazeLayout[x][y] === 2;
}

// Check if player position is the exit
function isExit(x, y) {
  if (x < 0 || x >= mazeLayout.length || y < 0 || y >= mazeLayout[0].length) {
    return false;
  }

  return mazeLayout[x][y] === 3;
}

// Update player's fuel and score based on current position
function updatePlayerStats() {
  var currentCell = mazeLayout[player.y][player.x];

  if (isFuel(player.x, player.y)) {
    player.fuel += 10;
    player.score += 50;
    fuelDisplay.textContent = player.fuel;
    scoreDisplay.textContent = player.score;
    mazeLayout[player.y][player.x] = 0;
    mazeLayout[3][2] = 0;
    // mazeLayout[x][y] === 2;
    updatePlayer();
  }

  if (isExit(player.x, player.y)) {
    // Handle end of game
    alert(`Congratulations!`);
    return;
  }

  if (currentCell === 1) {
    // player.fuel -= 5;
    fuelDisplay.textContent = player.fuel;

    if (player.fuel <= 0) {
      // Handle end of game
      alert('Game over! You ran out of fuel.');
    }
  }
}

// Start the game
function startGame() {
  updatePlayer();
  fuelDisplay.textContent = player.fuel;
  scoreDisplay.textContent = player.score;

  document.addEventListener('keydown', handleKeyPress);
  setInterval(updatePlayerStats, 1000);
}

startGame();

const gameBoard = document.getElementById('game-board');

const width = 7;

const height = 6;

let currPlayer = 'red';

let board = [];

const makeBoard= () => {

  for (let row = 0; row < height; row++){

    board.push([]);

    for (let col = 0; col < width; col++) {

      board[row].push('');

    }
  }

  return board;

}

const makeGameBoard = () => {
  
  for (let col = 0; col < width; col++) { 
    
    const column = document.createElement("div");
    
    column.className = "column";
    
    column.dataset.col = col;
    
    column.addEventListener('click', handleClick);
    
    gameBoard.appendChild(column);
    
    for (let row = 0; row < height; row++) {
      
      const cell = document.createElement("div");
      
      cell.classList.add("cell");
      
      cell.setAttribute('id', `${row}-${col}`)
      
      column.appendChild(cell);
      
    }
  }
}

const handleClick = (e) => {

  const column = e.target.closest('.column');

  let cells = column.querySelectorAll('.cell');

  let col = column.dataset.col

  let row = null;

  for (let i = cells.length - 1; i >= 0; i--) {

    let cell = cells[i];

    if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {

      row = i;

      cell.classList.add(currPlayer);

      break;

    }
  }

  if (row === null) {

    return;

  }
  
  board[row][col] = currPlayer;

  checkForWinner();

  changePlayer();
  
};

const checkForWinner = () => {

  // Check horizontally
  for (let row = 0; row < height; row++) {
  
    for (let col = 0; col < width -3; col++) {
  
      if (board[row][col] !== '') {
  
        if (board[row][col] === board[row][col +1] && board[row][col +1] === board[row][col +2] && board[row][col +2] === board[row][col +3]) {

          setTimeout(endGame, 150, msg);

          return;
        
        }
      }
    }
  }

  // Check vertically
  for (let col = 0; col < width; col++) {

    for (let row = 0; row < height - 3; row++) {

      if (board[row][col] !== '') {

        if (board[row][col] === board[row +1][col] && board[row +1][col] === board[row +2][col] && board[row +2][col] === board[row +3][col]) {

          setTimeout(endGame, 150, msg);

          return;

        }
      }
    }
  }

  // Check antidiagonally
  for (let row = 0; row < height - 3; row++) {

    for (let col = 0; col < width - 3; col++) {

      if (board[row][col] !== '') {

        if (board[row][col] === board[row +1][col +1] && board[row+1][col+1] === board[row+2][col+2] && board[row+2][col+2] === board[row+3][col+3]) {

          setTimeout(endGame, 150, msg);

          return;

        }
      }
    }
  }

  // Check diagonally
  for (let row = 3; row < height; row++) {

    for (let col = 0; col < width - 3; col++) {

      if (board[row][col] !== '') {

        if (board[row][col] === board[row-1][col+1] && board[row-1][col+1] === board[row-2][col+2] && board[row-2][col+2] === board[row-3][col+3]) {

          setTimeout(endGame, 150, msg);
          
          return;
          
        }
      }
    }
  }
};

const msg = `${currPlayer.toUpperCase()} Player WINS!!!`;

const endGame = (msg) => alert(msg);

const changePlayer = () => currPlayer = currPlayer === 'red' ? 'yellow' : 'red';

makeGameBoard();

makeBoard();

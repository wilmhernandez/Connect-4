/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const  HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");

  // TODO: add comment for this code
  // Creates table row for game board
  const top = document.createElement("tr");
  // Sets the id attribute to "column-top"
  top.setAttribute("id", "column-top");
  // Adds a click event listener for the table row
  top.addEventListener("click", handleClick);

  // Initialize for loop for each column
  for (let x = 0; x < WIDTH; x++) {
    // Create a td element for each column
    const headCell = document.createElement("td");
    // Set the id attribute to x
    headCell.setAttribute("id", x);
    // Append headCell to the top of row
    top.append(headCell);
  }
  // Append everything to te htmlBoard
  board.append(top);

  // TODO: add comment for this code
  // Begin a for loop that creates tr element called row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // Uses a nested for loop to create td within the row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // The id attribute is set with location of the td within the board
      cell.setAttribute("id", `${y}-${x}`);
      // Append the cell to the corresponding row
      row.append(cell);
    }
    // Append the row to htmlBoard.
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {

    if (!board[x][y]) {

      return y; 

    }

  }

  return null;

}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");

  piece.classList.add("piece");

  piece.classList.add(`p${currPlayer}`);

  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);

  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {

    return endGame("It's a tie!");

  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // Checks if the player can win horizontally
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // Checks if the player can win vertically
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // Checks if the player can win diagonally right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // Checks if the player can win diagonally left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // Check if there's a winner
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

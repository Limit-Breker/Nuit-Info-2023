
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];

  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  const row = name === 'I' ? -1 : -2;

  return {
    name: name,
    matrix: matrix,
    row: row,
    col: col
  };
}

function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

function isValidMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] && (
          cellCol + col < 0 ||
          cellCol + col >= playfield[0].length ||
          cellRow + row >= playfield.length ||
          playfield[cellRow + row][cellCol + col])
        ) {
        return false;
      }
    }
  }

  return true;
}

function placeTetromino() {
  let cpt = compteur_RC;
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {

        if (tetromino.row + row < 0 || compteur_RC > max_temperature) {
          return showGameOver();
        }

        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
        compteur_RC = cpt + increment_temperature;
      }
    }
  }
  cpt = compteur_RC;
  let compteur_combo = 0;
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every(cell => !!cell)) {
      compteur_combo++;
      while (compteur_RC > min_temperature && compteur_RC > cpt - coef_desincrement_temperature*increment_temperature) {
        compteur_RC = compteur_RC - increment_temperature;
      }
      for (let r = row; r >= 0; r--) {
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r-1][c];
        }
      }
    }
    else {
      row--;
    }
  }
  switch (compteur_combo) {
    case 1:
      score = score + 10;
      break;
    case 2:
      score = score + 30;
      break;
    case 3:
      score = score + 80;
      break;
    case 4:
      score = score + 150;
      break;
  }
  document.getElementById('score').innerHTML = "Score : " + score;
  tetromino = getNextTetromino();
}

function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;

  document.getElementById('game').style.background = '#ff0000';
  context.fillStyle = 'black';
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

  context.globalAlpha = 1;
  context.fillStyle = 'white';
  context.font = '36px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('GAME OVER !', canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

const playfield = [];

for (let row = -2; row < 20; row++) {
  playfield[row] = [];

  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

const tetrominos = {
  'I': [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  'J': [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ],
  'L': [
    [0,0,1],
    [1,1,1],
    [0,0,0],
  ],
  'O': [
    [1,1],
    [1,1],
  ],
  'S': [
    [0,1,1],
    [1,1,0],
    [0,0,0],
  ],
  'Z': [
    [1,1,0],
    [0,1,1],
    [0,0,0],
  ],
  'T': [
    [0,1,0],
    [1,1,1],
    [0,0,0],
  ]
};

let count = 0;
let tetromino = getNextTetromino();
let rAF = null;
let gameOver = false;
let vitesse = 35;
function loop() {
  vitesse = 35 - compteur_RC;
  document.getElementById('game').style.background = colorsList[compteur_RC];
  rAF = requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      if (playfield[row][col]) {
        const name = playfield[row][col];
        context.fillStyle = colors[name];

        context.fillRect(col * grid, row * grid, grid-1, grid-1);
      }
    }
  }

  if (tetromino) {

    if (++count > vitesse) {
      tetromino.row++;
      count = 0;

      if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        tetromino.row--;
        placeTetromino();
      }
    }

    context.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {

          context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
        }
      }
    }
  }
}

document.addEventListener('keydown', function(e) {
  if (gameOver) return;

  if (e.which === 37 || e.which === 39) {
    const col = e.which === 37
      ? tetromino.col - 1
      : tetromino.col + 1;

    if (isValidMove(tetromino.matrix, tetromino.row, col)) {
      tetromino.col = col;
    }
  }

  if (e.which === 38 || e.which === 32) {
    const matrix = rotate(tetromino.matrix);
    if (isValidMove(matrix, tetromino.row, tetromino.col)) {
      tetromino.matrix = matrix;
    }
  }

  if(e.which === 40) {
    const row = tetromino.row + 1;

    if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
      tetromino.row = row - 1;

      placeTetromino();
      return;
    }

    tetromino.row = row;
  }
});

// couleur des pièces
const colors = {
  'I': 'black',
  'O': 'black',
  'T': 'black',
  'S': 'black',
  'Z': 'black',
  'J': 'black',
  'L': 'black '
};

// couleur de fond
let colorsList = [
  "#ff0000",
  "#ff0b01",
  "#ff1a00",
  "#fa3607",
  "#f4520a",
  "#ea6a0d",
  "#e86f0d",
  "#e4770e",
  "#df7f0f",
  "#dc840f",
  "#d19410",
  "#ce9910",
  "#cb9b11",
  "#c4a411",
  "#c0aa11",
  "#bcac11",
  "#b1b511",
  "#adba11",
  "#a6c011",
  "#a2c311",
  "#9fc511",
  "#94cd10",
  "#90d010",
  "#8cd310",
  "#88d510",
  "#80da0f",
  "#77df0f",
  "#72e10e",
  "#67e60d",
  "#62e90d",
  "#56ee0c",
  "#51f00b",
  "#4bf20a",
  "#3ff509"
];

const increment_temperature = 1;
const coef_desincrement_temperature = 3;
const max_temperature = 33;
const min_temperature = 0;

let compteur_RC = min_temperature;

colorsList = colorsList.reverse();

let score = 0;
let scoreElement = document.getElementById('score');
document.getElementById('score').innerHTML = "Score : " + score;

// start the game
rAF = requestAnimationFrame(loop());
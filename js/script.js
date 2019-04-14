"use strict";

/*****************

Let's Play: Ancient Greek Punishment: Chess Edition
Pippin Barr

******************/

// The sound effects
const placeSFX = new Howl({
  src: ['assets/sounds/place.wav']
});
const captureSFX = new Howl({
  src: ['assets/sounds/capture.wav']
});
const attackSFX = new Howl({
  src: ['assets/sounds/attack.wav']
});


let depth = 2;
let board;
let game;
let from;
let moves = 0;
let lastMove = '';
let positionsExamined = 0;
let hpTable = {
  k: 11,
  q: 10,
  r: 5,
  b: 3,
  n: 3,
  p: 1
};

let hpBoard = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: []
};

let config = {
  showNotation: false,
  moveSpeed: 200,
  draggable: false,
  position: 'start',
  onMoveEnd: () => {
  }
};

$(document).ready(setup);

function setup() {
  board = ChessBoard('board', config);
  game = new Chess();
  from = null;
  moves = 0;
  positionsExamined = 0;
  lastMove = null

  // Set up our own representation of the board for HP business.
  // How depressing that this seems necessary.
  $('.square-55d63').each(function () {
    let file = $(this).attr('data-square')[0];
    let rank = $(this).attr('data-square')[1];
    let $piece = $(this).find('img');
    if ($piece.length !== 0) {
      let color = $piece.attr('data-piece')[0];
      let type = $piece.attr('data-piece')[1].toLowerCase();
      hpBoard[file][rank] = { type: type, color: color, hp: hpTable[type] };
    }
    else {
      hpBoard[file][rank] = undefined;
    }
  });

  $('.square-55d63').on('click', squareClicked);
}

function dealgebriac(square) {
  let file = "abcdefgh".indexOf(square[0]);
  let rank = parseInt(square[1]);
  let dealgebrised = ((8 - rank) * 8) + file;
  return (8 - rank) * 2 * 8 + file;
}

function squareClicked (event) {
  // Find out the notation of the square and also the element representing the piece
  let square = $(event.currentTarget).attr('data-square');
  let piece = $(event.currentTarget).find('.piece-417db');
  let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(game.turn()) !== -1);

  if (validPiece) {
    highlightMoves(square);
  }
  else if (from !== null && $(event.currentTarget).hasClass('highlight1-32417')) {
    let to = $(event.currentTarget).attr('data-square');
    moveWhite(from,to);
  }
}

function highlightMoves (square) {
  clearHighlights();

  from = square;

  let moves = game.moves({
    square: from,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  moves.forEach((move) => {
    highlight(move.to);
  });
}

function highlight (square) {
  $('.square-'+square).addClass(`highlight1-32417`);
}

function clearHighlights () {
  $('.square-55d63').removeClass(`highlight1-32417`);
}

function moveWhite(from,to) {
  // Make the move in the game representation
  let move = {
    from: from,
    to: to,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  };

  lastMove = game.move(move);

  // Clear all highlights from the board (a new turn is about to begin)
  clearHighlights();

  // Update the board based on the new position
  board.position(game.fen(),true);

  setTimeout(() => {
    handleLastMove();
  },config.moveSpeed * 1.1);
}

function handleLastMove() {
  // This failed on checkmate?
  let to = lastMove.to;
  let from = lastMove.from;
  // Check for a capture
  if (lastMove.captured) {
    // If it's a capture (an attack in this game), reduce HP based on attacker's current HP
    let damage = Math.floor(Math.random() * (hpBoard[from[0]][from[1]].hp + 1));
    hpBoard[to[0]][to[1]].hp -= damage;
    // Check for death
    if (hpBoard[to[0]][to[1]].hp > 0) {
      // If they didn't die then we need to display attacking
      attackSFX.play();
      // Then undo the capture (since it didn't "take")
      game.undo();
      // Reset the board, animating it back to the previous position
      board.position(game.fen(),true);
      // Play the placement sound once the piece has animated back
      setTimeout(() => {
        placeSFX.play();
      },config.moveSpeed);
      // Change to opposite turn
      let fen = game.fen();
      let fenArray = fen.split(' ');
      fenArray[1] = game.turn() === 'w' ? 'b' : 'w';
      fenArray[3] = '-'; // Really don't get how this goes wonky and needs this 'fix'
      fen = fenArray.join(' ');
      game.load(fen);
    }
    else {
      // Otherwise, they died, so we need to update the HP states
      // Move the capturing piece's HP with it to the captured square
      hpBoard[to[0]][to[1]] = hpBoard[from[0]][from[1]];
      // Remove the HP information at its previous location (there's nothing there now)
      hpBoard[from[0]][from[1]] = undefined;
      // Play the capture sound
      captureSFX.play();
    }
  }
  else {
    // If we're here then the piece just moved
    // We need to think about castling
    if (lastMove.flags.indexOf('k') !== -1) {
      // Kingside
      // Move the king's HP from the king's square, which is just the movement indicated
      hpBoard[to[0]][to[1]] = hpBoard[from[0]][from[1]];
      // Remove the king's HP from the king's square
      hpBoard[from[0]][from[1]] = undefined;
      // Think  about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      hpBoard['f'][to[1]] = hpBoard['h'][to[1]];
      // Remove the rook's HP
      hpBoard['h'][to[1]] = undefined;
    }
    else if (lastMove.flags.indexOf('q') !== -1) {
      // Queenside
      // Move the king's HP from the king's square, which is just the movement indicated
      hpBoard[to[0]][to[1]] = hpBoard[from[0]][from[1]];
      // Remove the king's HP from the king's square
      hpBoard[from[0]][from[1]] = undefined;
      // Think about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      hpBoard['d'][to[1]] = hpBoard['a'][to[1]];
      // Remove the rook's HP
      hpBoard['a'][to[1]] = undefined;
    }
    else if (lastMove.flags.indexOf('p') !== -1) {
      // Promotion (which is always to queen for simplicity here)
      // Move the HP object to the new (promotion) square
      hpBoard[to[0]][to[1]] = hpBoard[from[0]][from[1]];
      // Remove the old position
      hpBoard[from[0]][from[1]] = undefined;
      // Set up the to reflect a queen
      hpBoard[to[0]][to[1]].type = 'q';
      hpBoard[to[0]][to[1]].color = lastMove.color;
      hpBoard[to[0]][to[1]].hp = hpTable['q'];
    }
    else {
      // A regular move
      hpBoard[to[0]][to[1]] = hpBoard[from[0]][from[1]];
      // Remove the previous
      hpBoard[from[0]][from[1]] = undefined;
    }
    // Placement sound
    placeSFX.play();
  }
  // Reset the move tracking
  from = null;

  if (game.turn() === 'b') {
    setTimeout(() => {
      moveBlack();
    },config.moveSpeed * 1.1);
  }
}

function moveBlack() {
  moves++;
  let move = getBlackMove();
  lastMove = game.move(move);
  board.position(game.fen(),true);

  setTimeout(() => {
    handleLastMove();
  },config.moveSpeed * 1.1);
}

function getBlackMove() {
  positionsExamined = 0;
  let move = minimaxRoot(depth,game,true)
  // console.log(`Examined ${positionsExamined} positions.`);
  return move;
}

function minimaxRoot (depth, game, isMaximisingPlayer) {
  var newGameMoves = game.moves();
  var evaluations = [];

  var bestMove = -9999;
  var bestMoveFound;

  // console.log(`Starting depth is ${depth}`);

  for(var i = 0; i < newGameMoves.length; i++) {
    var newGameMove = newGameMoves[i]
    game.move(newGameMove);
    if (game.in_stalemate()) {
      game.undo();
      continue;
    }
    var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    if (game.in_check()) {
      value += 5;
    }
    evaluations.push({move: newGameMoves[i], evaluation: value});
    game.undo();
    if(value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }
  return bestMoveFound;
}

function minimax (depth, game, alpha, beta, isMaximisingPlayer) {
  positionsExamined++;

  if (depth === 0) {
    return -evaluateBoard(game,game.board());
  }

  var newGameMoves = game.moves();

  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_stalemate()) {
        game.undo();
        continue;
      }
      let minimaxed = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
      bestMove = Math.max(bestMove, minimaxed);
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      let minimaxed = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
      bestMove = Math.min(bestMove, minimaxed);
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
}

function evaluateBoard (game,board) {
  let totalEvaluation = 0;
  if (game.in_stalemate()) {
    // console.log(`evaluateBoard found STALEMATE, returning 1000000`);
    return 1000;
  }
  else {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
      }
    }
  }
  return totalEvaluation;
}

function getPieceValue (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
}

function getAbsoluteValue (piece, isWhite, x ,y) {
  if (piece.type === 'p') {
    return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
  } else if (piece.type === 'r') {
    return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
  } else if (piece.type === 'n') {
    return 30 + knightEval[y][x];
  } else if (piece.type === 'b') {
    return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
  } else if (piece.type === 'q') {
    return 90 + evalQueen[y][x];
  } else if (piece.type === 'k') {
    return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
  }
  throw "Unknown piece type: " + piece.type;
}

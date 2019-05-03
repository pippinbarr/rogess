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


let firstClick = true;
let depth = 2;
let board;
let game;
let from;
let moveCount = 0;
let lastMove = '';
let positionsExamined = 0;
let hpTable = {
  k: 10,
  q: 9,
  r: 5,
  b: 3,
  n: 3,
  p: 1
};
let pieceNames = {
  k: 'King',
  q: 'Queen',
  r: 'Rook',
  b: 'Bishop',
  n: 'Knight',
  p: 'Pawn'
};

let hpBoard = {};

let missVerbs = [
  "misses", "swings and misses", "barely misses", "doesn't hit"
];

let hitVerbs = [
  "hits", "swings and hits", "has injured", "scored an excellent hit on"
];

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
  // game = new Chess();
  game = new Chess();

  // En passant test position
  // game.load('k7/2R1p3/8/8/3P4/8/8/1R2K3 w - - 0 1');

  board.position(game.fen(),false);

  from = null;
  moveCount = 0;
  positionsExamined = 0;
  lastMove = null

  // Set up our own representation of the board for HP business.
  // How depressing that this seems necessary.
  $('.square-55d63').each(function () {
    let file = $(this).attr('data-square')[1];
    let rank = $(this).attr('data-square')[0];
    let $piece = $(this).find('img');
    if ($piece.length !== 0) {
      let color = $piece.attr('data-piece')[0];
      let type = $piece.attr('data-piece')[1].toLowerCase();
      hpBoard[`${rank}${file}`] = { title:'', type: type, color: color, level: 1, captures: 0, hp: hpTable[type], maxHP: hpTable[type], xp: 0, nextXP: 10 };
    }
    else {
      hpBoard[`${rank}${file}`] = undefined;
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
    if (firstClick) {
      $('#status').show();
      $('#title').hide();
      $('#author').hide();
      firstClick = false;
    }
    highlightMoves(square);
    highlight(square);
    updateStatusBar(square);
  }
  else if (from !== null && $(event.currentTarget).hasClass('highlight1-32417')) {
    let to = $(event.currentTarget).attr('data-square');
    moveWhite(from,to);
  }
}

function updateStatusBar(square) {
  let piece = hpBoard[square];
  $('#name').text(`${piece.title}${pieceNames[piece.type]}`);
  $('#level').text(`${piece.level}`);
  $('#hp').text(`${piece.hp}`);
  $('#maxHP').text(`${piece.maxHP}`);
  $('#xp').text(`${piece.xp}`);
  $('#nextXP').text(`${piece.nextXP}`);
  $('#captures').text(`${piece.captures}`);
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
    updatePGN();
  },config.moveSpeed * 1.1);
}

function handleLastMove() {
  // This failed on checkmate?
  let to = lastMove.to;
  let target = lastMove.to;
  if (lastMove.flags.indexOf('e') !== -1) {
    let file = lastMove.to[0];
    let rank;
    if (lastMove.color === 'w') {
      rank = parseInt(lastMove.to[1]) - 1;
    }
    else {
      rank = parseInt(lastMove.to[1]) + 1;
    }
    target = file + rank;
  }
  let from = lastMove.from;
  // Check for a capture
  if (lastMove.captured) {
    // If it's a capture (an attack in this game), reduce HP based on attacker's current HP
    let damage = Math.floor(Math.random() * (hpBoard[from].hp + 1));
    let targetHP;
    lastMove.damage = damage;
    hpBoard[target].hp -= damage;
    // Check for death
    if (hpBoard[target].hp > 0) {
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
      // Update san in last move to our notation
      lastMove.san = lastMove.san.replace('x','*');

      let $message = $(`<div class="attack-message"></div>`);
      if (damage > 0) {
        // Display a damage indicator
        $message.text(`-${damage}HP`);
      }
      else {
        $message.text(`MISS!`);
      }
      let $target = $(`.square-${target}`);
      $target.append($message);
      $message.animate({
        top: `-=2em`,
        opacity: 0,
      },1000,() => {
        $(this).remove();
      });
    }
    else {
      // Otherwise, they died, so we need to update the HP states
      // Remove the target of the capture (this will be the same as 'to' if a standard capture)
      hpBoard[target] = undefined;
      // Update captures stat
      hpBoard[from].captures++;
      // Update XP

      // Move the capturing piece's HP with it to the captured square
      hpBoard[to] = hpBoard[from];
      // Remove the HP information at capturing piece's previous location (there's nothing there now)
      hpBoard[from] = undefined;
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
      hpBoard[to] = hpBoard[from];
      // Remove the king's HP from the king's square
      hpBoard[from] = undefined;
      // Think  about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      hpBoard['f' + to[1]] = hpBoard['h' + to[1]];
      // Remove the rook's HP
      hpBoard['h' + to[1]] = undefined;
    }
    else if (lastMove.flags.indexOf('q') !== -1) {
      // Queenside
      // Move the king's HP from the king's square, which is just the movement indicated
      hpBoard[to] = hpBoard[from];
      // Remove the king's HP from the king's square
      hpBoard[from] = undefined;
      // Think about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      hpBoard['d' + to[1]] = hpBoard['a' + to[1]];
      // Remove the rook's HP
      hpBoard['a' + to[1]] = undefined;
    }
    else if (lastMove.flags.indexOf('p') !== -1) {
      // Promotion (which is always to queen for simplicity here)
      // Move the HP object to the new (promotion) square
      hpBoard[to] = hpBoard[from];
      // Remove the old position
      hpBoard[from] = undefined;
      // Set up the to reflect a queen
      hpBoard[to].type = 'q';
      hpBoard[to].color = lastMove.color;
      hpBoard[to].hp = hpTable['q'];
    }
    else {
      // A regular move
      hpBoard[to] = hpBoard[from];
      // Remove the previous
      hpBoard[from] = undefined;
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
  moveCount++;
  let move = getBlackMove();
  lastMove = game.move(move);
  board.position(game.fen(),true);

  setTimeout(() => {
    handleLastMove();
    updatePGN();
  },config.moveSpeed * 1.1);
}

function updatePGN () {
  let san = lastMove.san;

  let note = '';

  let active = (lastMove.color === 'w') ? 'Your' : 'The black';
  let passive = (lastMove.color === 'w') ? 'The black' : 'Your';

  // Deal with capture messages
  if (san.indexOf('x') !== -1) {
    note = ` (${active} ${pieceNames[lastMove.piece].toLowerCase()} defeated ${passive.toLowerCase()} ${pieceNames[lastMove.captured].toLowerCase()})`;
  }
  // Deal with attack messages
  else if (san.indexOf('*') !== -1) {
    san = san.replace('+','');
    let verb = '';
    if (lastMove.damage === 0) {
      // If there's no damage, the san shouldn't display a check because the move didn't "complete"
      verb = missVerbs[Math.floor(Math.random() * missVerbs.length)];
    }
    else {
      verb = hitVerbs[Math.floor(Math.random() * hitVerbs.length)];
    }
    note = ` (${active} ${pieceNames[lastMove.piece].toLowerCase()} ${verb} ${passive.toLowerCase()} ${pieceNames[lastMove.captured].toLowerCase()})`;
  }

  if (lastMove.color === 'w') {
    $('#pgn').text(`${moveCount + 1}. ${san}${(note != '') ? note : ''}`);
  }
  else {
    $('#pgn').text(`${$('#pgn').text()} ${san}${(note != '') ? note : ''}`);
  }
}

function getBlackMove() {
  positionsExamined = 0;
  let move = minimaxRoot(depth,game,true)
  // console.log(`Examined ${positionsExamined} positions.`);
  return move;
}

function minimaxRoot (depth, game, isMaximisingPlayer) {
  console.log("ROOT");
  var newGameMoves = game.moves({verbose: true});
  var evaluations = [];

  var bestMove = -9999;
  var bestMoveFound;

  // console.log(`Starting depth is ${depth}`);

  for(var i = 0; i < newGameMoves.length; i++) {
    var newGameMove = newGameMoves[i];
    game.move(newGameMove);
    if (game.in_stalemate()) {
      game.undo();
      continue;
    }
    // let newHPBoard = newHPBoardFromMove(game,newGameMove,hpBoard);
    // var value = minimax(depth - 1, game, newHPBoard, -10000, 10000, !isMaximisingPlayer);
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

function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
      for (let prop2 in src[prop]) {
        if (src[prop].hasOwnProperty(prop2)) {
          target[prop][prop2] = src[prop][prop2];
        }
      }
    }
  }
  return target;
}

function newHPBoardFromMove(game,move,fromHPBoard) {
  let newHPBoard = iterationCopy(fromHPBoard);

  let to = move.to;
  let target = move.to;
  if (move.flags.indexOf('e') !== -1) {
    let file = move.to[0];
    let rank;
    if (move.color === 'w') {
      rank = parseInt(move.to[1]) - 1;
    }
    else {
      rank = parseInt(move.to[1]) + 1;
    }
    target = file + rank;
  }
  let from = move.from;

  // Check for a capture
  if (move.captured) {
    // If it's a capture (an attack in this game), reduce HP based on attacker's current HP
    let damage = Math.floor(Math.random() * (newHPBoard[from].hp + 1));
    let targetHP;
    move.damage = damage;
    newHPBoard[target].hp -= damage;
    // Check for death
    if (newHPBoard[target].hp > 0) {
      // Then undo the capture (since it didn't "take")
      game.undo();
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
      // Remove the target of the capture (this will be the same as 'to' if a standard capture)
      newHPBoard[target] = undefined;
      // Update captures stat
      newHPBoard[from].captures++;
      // Update XP

      // Move the capturing piece's HP with it to the captured square
      newHPBoard[to] = newHPBoard[from];
      // Remove the HP information at capturing piece's previous location (there's nothing there now)
      newHPBoard[from] = undefined;
    }
  }
  else {
    // If we're here then the piece just moved
    // We need to think about castling
    if (move.flags.indexOf('k') !== -1) {
      // Kingside
      // Move the king's HP from the king's square, which is just the movement indicated
      newHPBoard[to] = newHPBoard[from];
      // Remove the king's HP from the king's square
      newHPBoard[from] = undefined;
      // Think  about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      newHPBoard['f' + to[1]] = newHPBoard['h' + to[1]];
      // Remove the rook's HP
      newHPBoard['h' + to[1]] = undefined;
    }
    else if (move.flags.indexOf('q') !== -1) {
      // Queenside
      // Move the king's HP from the king's square, which is just the movement indicated
      newHPBoard[to] = newHPBoard[from];
      // Remove the king's HP from the king's square
      newHPBoard[from] = undefined;
      // Think about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      newHPBoard['d' + to[1]] = newHPBoard['a' + to[1]];
      // Remove the rook's HP
      newHPBoard['a' + to[1]] = undefined;
    }
    else if (move.flags.indexOf('p') !== -1) {
      // Promotion (which is always to queen for simplicity here)
      // Move the HP object to the new (promotion) square
      newHPBoard[to] = newHPBoard[from];
      // Remove the old position
      newHPBoard[from] = undefined;
      // Set up the to reflect a queen
      newHPBoard[to].type = 'q';
      newHPBoard[to].color = move.color;
      newHPBoard[to].hp = hpTable['q'];
    }
    else {
      // A regular move
      newHPBoard[to] = newHPBoard[from];
      // Remove the previous
      newHPBoard[from] = undefined;
    }
  }
  return newHPBoard;
}

function minimax (depth, game, alpha, beta, isMaximisingPlayer) {
  // function minimax (depth, game, hpBoard, alpha, beta, isMaximisingPlayer) {
  console.log("MINIMAX DEPTH " + depth);

  positionsExamined++;

  if (depth === 0) {
    return -evaluateBoard(game,game.board(),hpBoard);
  }

  let newGameMoves = game.moves({verbose: true});

  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      if (game.in_stalemate()) {
        game.undo();
        continue;
      }
      // let newHPBoard = newHPBoardFromMove(game,newGameMoves[i],hpBoard);
      // let minimaxed = minimax(depth - 1, game, newHPBoard, alpha, beta, !isMaximisingPlayer);
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
      // let newHPBoard = newHPBoardFromMove(game,newGameMoves[i],hpBoard);
      // let minimaxed = minimax(depth - 1, game, newHPBoard, alpha, beta, !isMaximisingPlayer);
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

// function evaluateBoard (game,board,hpBoard) {
  function evaluateBoard (game,board) {
  let totalEvaluation = 0;
  if (game.in_stalemate()) {
    // console.log(`evaluateBoard found STALEMATE, returning 1000000`);
    return 1000;
  }
  else {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        // totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j, hpBoard);
        totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
      }
    }
  }
  return totalEvaluation;
}

// function getPieceValue (piece, x, y, hpBoard) {
  function getPieceValue (piece, x, y) {
  if (piece === null) {
    return 0;
  }
  let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  // Here is an attempt to make the AI care about HP
  // Currently it would really only do a sort of "all things being equal" difference?
  // But perhaps that's actually enough?
  // What is a board position that would evaluate this???
  // let hp = hpBoard["abcdefgh".charAt(x) + y];
  // absoluteValue *= hp;
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

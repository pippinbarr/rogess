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

let AI = false;
const RIP_DELAY = 5000;
const TURN_BAR_DELAY = 500;
const CHECK_VALUE = 100;
let turnbarTimeout;
let thinkingInterval;

let gameOver = false;


let firstClick = true;
let depth = 3;
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

let states = [];

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
  let state = {};
  $('.square-55d63').each(function () {
    let file = $(this).attr('data-square')[1];
    let rank = $(this).attr('data-square')[0];
    let $piece = $(this).find('img');
    if ($piece.length !== 0) {
      let color = $piece.attr('data-piece')[0];
      let type = $piece.attr('data-piece')[1].toLowerCase();
      state[`${rank}${file}`] = {
        hp: hpTable[type],
        maxHP: hpTable[type],
        type: type,
        color: color,
        captures: 0,
      };
    }
    else {
      state[`${rank}${file}`] = undefined;
    }
  });

  states.unshift(state);

  //setupTestbed();

  $('.square-55d63').on('click', squareClicked);
  $('.option').on('click', menuClicked);
  $('#resign').on('click',resignClicked);
  $('#jonathan').on('click',() => {
    window.open('https://jonathanlessard.net/','_blank');
  });
  $('#pippin').on('click',() => {
    window.open('https://www.pippinbarr.com/','_blank');
  });
}

function squareClicked (event) {
  // Find out the notation of the square and also the element representing the piece
  let square = $(this).attr('data-square');
  let piece = $(this).find('.piece-417db');
  let validPiece = (piece.length !== 0 && piece.attr('data-piece').indexOf(game.turn()) !== -1);

  if (validPiece) {
    if (turnbarTimeout) {
      clearTimeout(turnbarTimeout);
      turnbarTimeout = null;
    }
    if (firstClick) {
      $('#status-wrapper').show();
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
    if (game.turn() === 'w') {
      moveWhite({from: from, to: to});
    }
    else {
      moveBlack({from: from, to: to});
    }
  }
}

function menuClicked () {

  if ($(this).hasClass('one-player')) {
    AI = true;
  }
  else if ($(this).hasClass('two-player')) {
    AI = false;
  }

  $('#menu').slideUp(500,() => {
    $('#menu').hide();
    $('#game').slideDown();
  });
}

function resignClicked () {
  let text = $('#resign-text').text();
  if (text === 'Resign') {
    $('#resign-text').text('Confirm?');
    setTimeout(() => {
      $('#resign-text').text('Resign');
    },2000);
  }
  else if (text === 'Confirm?') {
    // Kill the game
    showGameOver(undefined,true);
  }
}

function resetToMenu () {
  $(document).off('click');
  document.location.reload();
}

function updateStatusBar(square) {
  $('#turnbar').hide();
  let state = states[0];
  let piece = state[square];
  $('#name').text(`${pieceNames[piece.type]}`);
  // $('#level').text(`${piece.level}`);
  $('#hp').text(`${piece.hp}`);
  $('#maxHP').text(`${piece.maxHP}`);
  $('#captures').text(`${piece.captures}`);
  $('#statusbar').show();
}

function setTurnBar(color) {
  if (thinkingInterval !== null) clearInterval(thinkingInterval);

  $('#status').show();
  $('#statusbar').hide();
  let turn = color === 'w' ? 'White' : 'Black';
  if (AI && turn === 'Black') {
    $('#turnbar').html('Black is thinking...');
  }
  else {
    $('#turnbar').text(`${turn} to play.`);
  }
  $('#turnbar').show();
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

function moveWhite(move) {
  if (gameOver) return;

  move.promotion = 'q';

  // console.log("------ REAL WHITE MOVE ------");

  $('#statusbar').hide();
  makeMove(move,false);

  if (gameOver) return;
  clearHighlights();

  turnbarTimeout = setTimeout(() => {
    setTurnBar(game.turn());
    turnbarTimeout = null;
  },500);

  // console.log('AFTER WHITE',states[0]);

  // Clear all highlights from the board (a new turn is about to begin)

  // Update the board based on the new position

  if (AI) {
    setTimeout(() => {
      moveBlack();
    },config.moveSpeed * 6);
  }

}

function moveBlack(move) {
  if (gameOver) return;

  moveCount++;

  if (AI) {
    move = getBlackMove();
    makeDelayedMove(move);
  }
  else {
    $('#statusbar').hide();
    makeMove(move,false);
    clearHighlights();

    if (gameOver) return;

    turnbarTimeout = setTimeout(() => {
      setTurnBar(game.turn());
      turnbarTimeout = null;
    },500);
  }
}

function makeDelayedMove(move) {
  if (turnbarTimeout) {
    setTimeout(() => {
      makeDelayedMove(move);
    },1000);
  }
  else {
    $('#statusbar').hide();
    makeMove(move,false);
    if (gameOver) return;

    turnbarTimeout = setTimeout(() => {
      setTurnBar(game.turn());
      turnbarTimeout = null;
    },500);
  }
}

function undo() {
  // console.log("UNDO.")
  game.undo();
  states.shift();
}

function makeMove(move,simulate) {

  // console.log("Before simulate:",move);

  move = game.move(move);

  // console.log("After simulate:",move);

  if (move === null) {
    throw "INVALID MOVE ATTEMPTED";
  }
  if (!simulate) {
    // Animate the move (we'll animate back if it's an attack/non-capture)
    board.position(game.fen(),true);
  }
  game.undo();

  let state = copyState(states[0]);

  // This failed on checkmate?
  let to = move.to;
  let target = move.to;
  let from = move.from;

  // Handle en passant
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

  // Check for a capture
  if (move.captured) {
    // If it's a capture (an attack in this game), reduce HP based on attacker's current HP
    let damage;
    if (simulate) {
      damage = 0.5 * (state[from].hp + 1);
    }
    else {
      damage = Math.floor(Math.random() * (state[from].hp + 1));
    }
    // damage = 1000;
    let targetHP;
    move.damage = damage;
    state[target].hp -= damage;
    // Check for attack without capture
    if (state[target].hp > 0) {
      // Create a move representing "nothing" in the game
      move.san = move.san.replace('x','*');
      move.to = move.from;
      game.move(move);

      if (!simulate) {
        setTimeout(() => {
          // Play the attack sound
          attackSFX.play();
          // Display the message
          displayDamageMessage(target,damage);
          // updateStatusBar(move.from);
          // Reset the board, animating it back to the previous position
          board.position(game.fen(),true);
          // Play the placement sound once the piece has animated back
          setTimeout(() => {
            placeSFX.play();
          },config.moveSpeed);
        },config.moveSpeed * 1.1);
      }
    }
    else {
      game.move(move);

      // Otherwise, they died, so we need to update the HP states
      // Remove the target of the capture (this will be the same as 'to' if a standard capture)
      state[target] = undefined;
      // Update captures stat
      state[from].captures++;
      // Update XP

      // Move the capturing piece's HP with it to the captured square
      state[to] = state[from];
      // Remove the HP information at capturing piece's previous location (there's nothing there now)
      state[from] = undefined;

      if (!simulate) {
        setTimeout(() => {
          // Play the capture sound
          captureSFX.play();
          // updateStatusBar(move.to);
        },config.moveSpeed * 1.1);

        // Check if the king was captured...
        if (move.captured === 'k') {
          gameOver = true;
          clearHighlights();
          $('#status').hide();
          setTimeout(() => {
            showGameOver(move,false);
          },RIP_DELAY);
        }
      }


    }
  }
  else {
    // If we're here then the piece just moved in a regular way
    game.move(move);

    // We need to think about castling
    if (move.flags.indexOf('k') !== -1) {
      // Kingside
      // Move the king's HP from the king's square, which is just the movement indicated
      state[to] = state[from];
      // Remove the king's HP from the king's square
      state[from] = undefined;
      // Think  about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      state['f' + to[1]] = state['h' + to[1]];
      // Remove the rook's HP
      state['h' + to[1]] = undefined;
    }
    else if (move.flags.indexOf('q') !== -1) {
      // Queenside
      // Move the king's HP from the king's square, which is just the movement indicated
      state[to] = state[from];
      // Remove the king's HP from the king's square
      state[from] = undefined;
      // Think about the rook. We can rely on the rank to control for color
      // Move the rook's HP
      state['d' + to[1]] = state['a' + to[1]];
      // Remove the rook's HP
      state['a' + to[1]] = undefined;
    }
    else if (move.flags.indexOf('p') !== -1) {
      // Promotion (which is always to queen for simplicity here)
      // Move the HP object to the new (promotion) square
      state[to] = state[from];
      // Remove the old position
      state[from] = undefined;
      // Set up the to reflect a queen
      state[to].type = 'q';
      state[to].color = move.color;
      state[to].hp = hpTable['q'];
    }
    else {
      // A regular move
      state[to] = state[from];
      // Remove the previous
      state[from] = undefined;
    }


    if (!simulate) {
      setTimeout(() => {
        // Placement sound
        placeSFX.play();
        if (move.color === 'w' || !AI) {
          // updateStatusBar(move.to);
        }
      },config.moveSpeed * 1.1);
    }

    if (!simulate) {
      let delay = TURN_BAR_DELAY;
      if (AI && move.color === 'b') {
        delay = 500;
      }
    }
  }

  if (!simulate) {
    updatePGN(move);
    // Reset the move tracking
    from = null;
  }

  states.unshift(state);
}

function showGameOver(move,resignation) {
  $('#game').hide();
  $('#status-wrapper').hide();
  $('#rip-wrapper').show();

  let date = new Date();
  $('#rip-date').text(date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear());

  if (resignation) {
    $('#rip').show();
    if (AI) {
      $('#rip-cause').text(`${(game.turn() === 'w') ? 'You' : 'Black'} resigned.`);
    }
    else {
      $('#rip-cause').text(`${(game.turn() === 'w') ? 'White' : 'Black'} resigned.`);
    }
  }
  else {
    let kingColor = move.color === 'w' ? 'black' : 'white';
    if (AI && kingColor === 'black' && !resignation) {
      $('#congratulations').show();
    }
    else {
      $('#rip').show();
    }

    let capturer = pieceNames[move.piece].toLowerCase();
    $('#rip-cause').text(`The ${kingColor} king was captured by a ${capturer}.`);
  }

  setTimeout(() => { $(document).on('click',resetToMenu) },500);
  $('.square-55d63').off('click');
  $('#resign').off('click');

}

function updatePGN (move) {
  let san = move.san;

  let note = '';

  let active, passive;

  if (AI) {
    active = (move.color === 'w') ? 'Your' : 'The black';
    passive = (move.color === 'w') ? 'The black' : 'Your';
  }
  else {
    active = (move.color === 'w') ? 'The white' : 'The black';
    passive = (move.color === 'w') ? 'The black' : 'The white';
  }

  // Deal with capture messages
  if (san.indexOf('x') !== -1) {
    note = ` (${active} ${pieceNames[move.piece].toLowerCase()} defeated ${passive.toLowerCase()} ${pieceNames[move.captured].toLowerCase()})`;
  }
  // Deal with attack messages
  else if (san.indexOf('*') !== -1) {
    san = san.replace('+','');
    let verb = '';
    if (move.damage === 0) {
      // If there's no damage, the san shouldn't display a check because the move didn't "complete"
      verb = missVerbs[Math.floor(Math.random() * missVerbs.length)];
    }
    else {
      verb = hitVerbs[Math.floor(Math.random() * hitVerbs.length)];
    }
    note = ` (${active} ${pieceNames[move.piece].toLowerCase()} ${verb} ${passive.toLowerCase()} ${pieceNames[move.captured].toLowerCase()})`;
  }

  if (move.color === 'w') {
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
  var newGameMoves = game.moves({verbose: true});
  var evaluations = [];

  var bestMove = -9999;
  var bestMoveFound;

  // console.log(`Starting depth is ${depth}`);

  for(var i = 0; i < newGameMoves.length; i++) {

    // console.log(`------------ROOT, DEPTH=${depth}------------`);
    // console.log(game.pgn());
    // console.log(newGameMoves[i]);

    makeMove(newGameMoves[i],true);

    var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    if (game.in_check()) {
      value += CHECK_VALUE;
    }
    evaluations.push({move: newGameMoves[i], evaluation: value});

    undo();

    if(value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMoves[i];
    }
  }
  // console.log(evaluations)
  return bestMoveFound;
}

function minimax (depth, game, alpha, beta, isMaximisingPlayer) {
  // function minimax (depth, game, state, alpha, beta, isMaximisingPlayer) {
  // console.log("MINIMAX DEPTH " + depth);


  positionsExamined++;

  if (depth === 0) {
    return -evaluateBoard(game,game.board());
  }


  let newGameMoves = game.moves({verbose: true});

  if (isMaximisingPlayer) {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++) {

      // console.log(`------------DEPTH ${depth}------------`);
      // console.log(game.pgn());
      // console.log(newGameMoves[i]);

      makeMove(newGameMoves[i],true);

      // let newstate = newstateFromMove(game,newGameMoves[i],state);
      // let minimaxed = minimax(depth - 1, game, newstate, alpha, beta, !isMaximisingPlayer);
      let minimaxed = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
      if (game.in_check()) {
        minimaxed += CHECK_VALUE;
      }
      bestMove = Math.max(bestMove, minimaxed);

      undo();

      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++) {

      // console.log(`------------DEPTH ${depth}------------`);
      // console.log(game.pgn());
      // console.log(newGameMoves[i]);

      makeMove(newGameMoves[i],true);

      let minimaxed = minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
      if (game.in_check()) {
        minimaxed -= CHECK_VALUE;
      }
      bestMove = Math.min(bestMove, minimaxed);

      undo();

      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
}

// function evaluateBoard (game,board,state) {
function evaluateBoard (game,board) {
  let totalEvaluation = 0;
  if (game.in_stalemate()) {
    // console.log(`evaluateBoard found STALEMATE, returning 1000000`);
    return 1000;
  }
  else {
    // console.log(states[0]);
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        // totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j, state);
        totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
      }
    }
  }
  return totalEvaluation;
}

// function getPieceValue (piece, x, y, state) {
function getPieceValue (piece, x, y) {
  // console.log(x,y,square);
  if (piece === null) {
    return 0;
  }
  let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  // Here is an attempt to make the AI care about HP
  // Currently it would really only do a sort of "all things being equal" difference?
  // But perhaps that's actually enough?
  // What is a board position that would evaluate this???
  // let hp = state["abcdefgh".charAt(x) + y];
  // absoluteValue *= hp;
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
}

function getAbsoluteValue (piece, isWhite, x ,y) {
  let square = "abcdefgh".charAt(y) + (8-x);
  let hp = states[0][square].hp;
  let hpMax = hpTable[piece.type];
  let multiplier = hp;

  if (piece.type === 'p') {
    return multiplier * 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
  } else if (piece.type === 'r') {
    return multiplier * 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
  } else if (piece.type === 'n') {
    return multiplier * 30 + knightEval[y][x];
  } else if (piece.type === 'b') {
    return multiplier * 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
  } else if (piece.type === 'q') {
    return multiplier * 90 + evalQueen[y][x];
  } else if (piece.type === 'k') {
    return multiplier * 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
  }
  throw "Unknown piece type: " + piece.type;
}

function copyState(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = {};
      for (let prop2 in src[prop]) {
        if (src[prop].hasOwnProperty(prop2)) {
          target[prop][prop2] = src[prop][prop2];
        }
      }
    }
  }
  return target;
}

function displayDamageMessage(target,damage) {
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
    $message.remove();
  });
}

function setupTestbed() {

  // Horrible testbed for real/simulated moves that has proved nothing so far

  // game.load('rnbqkb1r/1ppppppp/5n2/p3P3/8/8/PPPP1PPP/RNBQKBNR w kq - 0 1');
  // board.position(game.fen());

  let moves = [
    // {from: 'e2', to: 'e4'},
    // {from: 'g8', to: 'f6'},
    // {from: 'e4', to: 'e5'},
    // {from: 'a7', to: 'a5'},
    // {from: 'e5', to: 'f6'},
    // {from: 'a8', to: 'a6'}, // THIS MOVE Ra6 PLACES A PAWN ON A7??? WTF?
    // IT ONLY HAPPEN ON THE A-FILE??? (If you mirror this on H it does happen)

    // It seems to be to do with the direction of capture by a pawn...
    // Yikes.
    {from: 'e2', to: 'e4'},
    {from: 'a7', to: 'a6'},
    {from: 'd1', to: 'f3'},
    {from: 'a6', to: 'a5'},
    {from: 'f1', to: 'c4'},
    {from: 'a5', to: 'a4'},
    {from: 'f3', to: 'f7'},

    // {from: 'd5', to: 'd4'},
    // {from: 'e5', to: 'f6'},
    // {from: 'd4', to: 'd3'},
    // {from: 'c2', to: 'd3'}
  ];
  let i = 0;

  $(document).on('keydown',(e) => {
    switch (e.key) {
      case 'u':
      undo();
      // console.log(game.ascii());
      board.position(game.fen());
      i--;
      break;

      case 'r':
      undo();
      // console.log(game.ascii());
      i--;
      break;

      case 'm':
      makeMove(moves[i],false);
      // console.log(">>> AFTER MAKEMOVE COMPLETE");
      // console.log("Move:",moves[i]);
      // console.log(game.pgn())
      // console.log(game.turn())
      // console.log(game.fen())
      // console.log(game.ascii())
      // console.log(game.ascii());
      // console.log(game.pgn());
      i++;
      break;

      case 's':
      makeMove(moves[i],true);
      // console.log(game.ascii());
      // console.log(game.pgn());
      i++;
      break;
    }
  });
}

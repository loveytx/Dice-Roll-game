'use strict';

// Selecting elements
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const score1El = document.querySelector('.score-1');
const score2El = document.querySelector('.score-2');
const current1El = document.querySelector('.cur-score-1');
const current2El = document.querySelector('.cur-score-2');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

//starting condition
score1El.textContent = 0;
score2El.textContent = 0;
dice.classList.add('hidden');

//utility functions
const removeActive = function (player) {
  player.classList.remove('player--active');
};
const addActive = function (player) {
  player.classList.add('player--active');
};

let curScore;
let activePlayer;
let playing;
let scores;

//New Game
const newGame = function () {
  curScore = 0;
  playing = true;
  scores = [0, 0, 0];
  activePlayer = 1;

  //starting condition
  score1El.textContent = 0;
  score2El.textContent = 0;
  dice.classList.add('hidden');
  current1El.textContent = 0;
  current2El.textContent = 0;

  //removing the winner class
  document.querySelector(`.player-1`).classList.remove('player--winner');
  document.querySelector(`.player-2`).classList.remove('player--winner');

  //adding active player class in the first player
  document.querySelector(`.player-1`).classList.add('player--active');
};
newGame();

const switchingPlayer = function () {
  curScore = 0;
  document.querySelector(`.cur-score-${activePlayer}`).textContent = 0;
  // removeActive(document.querySelector(`.player-${activePlayer}`));
  activePlayer = activePlayer === 1 ? 2 : 1;
  // addActive(document.querySelector(`.player-${activePlayer}`));
  // /*Or we can use this also to change active player also
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  //  */
};

//rolling dice functionality
const diceRoll = function () {
  if (playing) {
    //generating a random dice roll
    let n = Math.trunc(Math.random() * 6) + 1;

    //display dice roll
    dice.classList.remove('hidden');
    dice.src = `dice-${n}.png`;

    //Check for rolled 1 : if true than switch to next player else add it in the cur-score

    if (n !== 1) {
      curScore += n;
      document.querySelector(`.cur-score-${activePlayer}`).textContent =
        curScore;
    } else {
      //switching Players
      switchingPlayer();
    }
  }
};

//holding functionality
const Hold = function () {
  // 1. Add current score to active player's score
  if (playing) {
    scores[activePlayer] += curScore; // scores[1] = scores[1] + currentScore
    document.querySelector(`.score-${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if score is >= 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    }
    //switching Players
    else {
      switchingPlayer();
    }
  }
};

document.querySelector('.btn-roll').addEventListener('click', diceRoll);
document.querySelector('.btn-hold').addEventListener('click', Hold);
document.querySelector('.btn-new').addEventListener('click', newGame);

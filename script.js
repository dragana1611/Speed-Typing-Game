'use strict';
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('setting');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');
const btnStart = document.getElementById('start');

//list of words
const words = [
  'productive',
  'selective',
  'kimmy',
  'perpetual',
  'nikko',
  'magnificent',
  'grace',
  'exciting',
  'oven',
  'sneaky',
  'slippery',
  'berry',
  'guarded',
  'rest',
  'plantatio',
  'mask',
  'left',
  'guarantee',
  'scrape',
  'impulse',
  'curve',
  'tooth',
  'industry',
  'mouth',
  'verse',
  'impulse',
  'tingy',
  'deer',
  'hypothesis',
  'magical',
  'wooden',
  'birthday',
  'thankful',
  'apparatus',
  'elbow',
  'way',
  'abhorrent',
  'melt',
  'radiate',
  'building',
  'drag',
  'noxious',
  'disgusted',
  'reminiscent',
  'whip',
  'discreet',
  'meticulous',
  'developer',
  'conscientious',
  'customizable',
  'sensation',
  'shake',
  'dilute',
  'official',
  'harmful',
  'countryside',
  'artificial',
  'staircase',
  'different'
];

//init word
let randomWord;
let score = 0;
let time = 20;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'average';
//set diff select value
difficultySelect.value = difficulty;
//focus on text
text.focus();

//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//add word to dom
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM();
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
let timeInterval;
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()" style= 'background: #BABA75; font-weight:bold;'>Restart</button>
    `;
  endgameEl.style.display = 'flex';
}

btnStart.addEventListener('click', e => {
  //start count down
  timeInterval = setInterval(updateTime, 1000);
});

text.addEventListener('input', e => {
  const insetedText = e.target.value;
  if (insetedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'average') {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
    if (time == 0) {
      gameOver();
    }
  }
});

settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

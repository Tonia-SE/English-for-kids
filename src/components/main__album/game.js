import * as cards from './cards';
import { modalWin, modalFail } from '../modal__window';
export let mistakesQuantity = 0;
let randomIds = [];
let gameStarted = false;

export const wrapperBtns = document.createElement('div');
wrapperBtns.className = 'wrapperBtns';
wrapperBtns.innerHTML = `
    <div class="starsWrapper">  
    </div>
    <button type="button" class="btn btn-secondary" id="start_game">Start game</button>
    <button type="button" class="btn btn-secondary" id="repeat">⟳</button>
`;

function updateStars(answer) {
    let starText = '★';
    if (answer === 0) {
        starText = '☆';
    }
    const starWrapper = document.querySelector('.starsWrapper');
    const currentStars = starWrapper.querySelectorAll('.star');
    if (currentStars.length > 13) {
        for (const star of currentStars) {
            starWrapper.removeChild(star);
        }
    }
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = starText;
    starWrapper.append(star);
}

export function rightAnswer() {
    const audio = new Audio('./assets/audio/right.mp3');
    audio.play();
    randomIds.shift();
    updateStars(1);
}

export function wrongAnswer() {
    mistakesQuantity += 1;
    const audio = new Audio('./assets/audio/wrong.mp3');
    audio.play();
    updateStars(0);
}

export function win() {
    const wrapperBtn = document.querySelector('.wrapperBtns');
    wrapperBtn.style.display = 'none';
    const audio = new Audio('./assets/audio/win.mp3');
    audio.play();
    modalWin.style.display = 'flex';
}

export function fail() {
    const wrapperBtn = document.querySelector('.wrapperBtns');
    wrapperBtn.style.display = 'none';
    const audio = new Audio('./assets/audio/fail.mp3');
    audio.play();
    modalFail.querySelector('p').textContent = 'Fail... Better luck next time! Wrong answers: ' + mistakesQuantity;
    modalFail.style.display = 'flex';
}

export function isGameFinished() {
    if (randomIds.length === 0) {
        gameStarted = false;
        return true;
    }
    return false;
}

export function playAudio() {
    const category = localStorage.getItem('category');
    const audio = new Audio(cards[category][randomIds[0]].audioUrl);
    audio.play();
    localStorage.setItem('audioId', cards[category][randomIds[0]].id);
}

function startGame() {
    randomIds = [];
    mistakesQuantity = 0;
    gameStarted = true;
    while (randomIds.length < 8) {
        const randomId = Math.floor((Math.random() * 800) / 100);
        if (randomIds.indexOf(randomId) === -1) {
            randomIds.push(randomId);
        }
    }
    playAudio();
}

export function stopGame() {
    randomIds = [];
    mistakesQuantity = 0;
    gameStarted = false;
}

export function isGameStarted() {
    return gameStarted;
}

const startBtn = wrapperBtns.querySelector('#start_game');
startBtn.addEventListener('click', (event) => {
    event.target.style.display = 'none';
    const repeat = document.querySelector('#repeat');
    repeat.style.display = 'block';
    const starWrapper = document.querySelector('.starsWrapper');
    starWrapper.style.display = 'inline-block';
    const starsToDelete = starWrapper.querySelectorAll('.star');
    for (const star of starsToDelete) {
        starWrapper.removeChild(star);
    }
    startGame();
});

const repeatBtn = wrapperBtns.querySelector('#repeat');
repeatBtn.addEventListener('click', (event) => {
    playAudio();
});

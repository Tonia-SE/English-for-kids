import { createCards } from '../main__album/cards_categories';
import { createCardsMain } from '../main__album/cards_main';
import { createCardsForPlay } from '../main__album/cards_for_play';
import * as cards from '../main__album/cards';
import { statisticsWrapper, updateTable } from '../statistics';
import { main, animals, applicances, berries, flowers, fruit, furniture, insects, vegetables } from '../main__album/cards';

export const nav = document.createElement('div');
nav.className = 'navbar navbar-expand-lg navbar-light bg-light';
nav.innerHTML = `
<div class="dropdown">
  <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <div class="container-icon" id="menu-icon">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" id="home" href="#">Home</a>
    <a class="dropdown-item" id="stats" href="#">Stats</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" id="animals" href="#">animals</a>
    <a class="dropdown-item" id="applicances" href="#">applicances</a>
    <a class="dropdown-item" id="berries" href="#">berries</a>
    <a class="dropdown-item" id="flowers" href="#">flowers</a>
    <a class="dropdown-item" id="fruit" href="#">fruit</a>
    <a class="dropdown-item" id="furniture" href="#">furniture</a>
    <a class="dropdown-item" id="insects" href="#">insects</a>
    <a class="dropdown-item" id="vegetables" href="#">vegetables</a>
  </div>
  <h1 class="navbar-brand">
    English for kids
  </h1>  
</div>
<div class="wrapper-btns">
  <div class="second-wrapper-btns">
    <label class="switch">
      <input class="switch-input" type="checkbox">
      <span class="slider round"></span>
    </label>
    <p class="textBtn">Train</p>
  </div>
  <button type="button" class="btn btn-secondary" id="stat">Stats</button>
</div>
`;

const playChecker = nav.querySelector('.switch-input');
const textBtn = nav.querySelector('.textBtn');
playChecker.addEventListener('click', (event) => {
    const isHomePage = localStorage.getItem('isHomePage');
    if (event.target.checked) {
        textBtn.textContent = 'Play';
        if (isHomePage === 'false') {
            const wrapperBtn = document.querySelector('.wrapperBtns');
            wrapperBtn.style.display = 'flex';
            const category = localStorage.getItem('category');
            createCardsForPlay(cards[category], category);
        }
    } else {
        textBtn.textContent = 'Train';
        const wrapperBtn = document.querySelector('.wrapperBtns');
        wrapperBtn.style.display = 'none';
        const startBtn = document.querySelector('#start_game');
        startBtn.style.display = 'block';
        const repeat = document.querySelector('#repeat');
        repeat.style.display = 'none';
        const starWrapper = document.querySelector('.starsWrapper');
        starWrapper.style.display = 'none';
        const category = localStorage.getItem('category');
        if (category === 'main') {
            createCardsMain(cards[category], document.querySelector('.row'));
        } else {
            createCards(cards[category], category);
        }
    }
});

const menuBtn = nav.querySelector('#menu-icon');
menuBtn.addEventListener('click', () => {
    const bar1 = document.querySelector('.bar1');
    bar1.classList.toggle('change1');
    const bar2 = document.querySelector('.bar2');
    bar2.classList.toggle('change2');
    const bar3 = document.querySelector('.bar3');
    bar3.classList.toggle('change3');
});

const dropdownMenu = nav.querySelector('.dropdown-menu');
dropdownMenu.addEventListener('click', () => {
    const bar1 = document.querySelector('.change1');
    if (bar1 !== null) {
        bar1.className = 'bar1';
    }
    const bar2 = document.querySelector('.change2');
    if (bar2 !== null) {
        bar2.className = 'bar2';
    }
    const bar3 = document.querySelector('.change3');
    if (bar3 !== null) {
        bar3.className = 'bar3';
    }
});

window.addEventListener('click', (event) => {
    if (event.target !== menuBtn) {
        const bar1 = document.querySelector('.change1');
        if (bar1 !== null) {
            bar1.className = 'bar1';
        }
        const bar2 = document.querySelector('.change2');
        if (bar2 !== null) {
            bar2.className = 'bar2';
        }
        const bar3 = document.querySelector('.change3');
        if (bar3 !== null) {
            bar3.className = 'bar3';
        }
    }
});

const homeBtn = nav.querySelector('#home');
homeBtn.addEventListener('click', () => {
    const row = document.querySelector('.row');
    const wrapperBtn = document.querySelector('.wrapperBtns');
    wrapperBtn.style.display = 'none';
    createCardsMain(main, row);
});

const animalsBtn = nav.querySelector('#animals');
animalsBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(animals, 'animals');
    } else {
        createCards(animals, 'animals');
    }
});

const applicancesBtn = nav.querySelector('#applicances');
applicancesBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(applicances, 'applicances');
    } else {
        createCards(applicances, 'applicances');
    }
});

const berriesBtn = nav.querySelector('#berries');
berriesBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(berries, 'berries');
    } else {
        createCards(berries, 'berries');
    }
});

const flowersBtn = nav.querySelector('#flowers');
flowersBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(flowers, 'flowers');
    } else {
        createCards(flowers, 'flowers');
    }
});

const fruitBtn = nav.querySelector('#fruit');
fruitBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(fruit, 'fruit');
    } else {
        createCards(fruit, 'fruit');
    }
});

const furnitureBtn = nav.querySelector('#furniture');
furnitureBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(furniture, 'furniture');
    } else {
        createCards(furniture, 'furniture');
    }
});

const insectsBtn = nav.querySelector('#insects');
insectsBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(insects, 'insects');
    } else {
        createCards(insects, 'insects');
    }
});

const vegetablesBtn = nav.querySelector('#vegetables');
vegetablesBtn.addEventListener('click', () => {
    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        createCardsForPlay(vegetables, 'vegetables');
    } else {
        createCards(vegetables, 'vegetables');
    }
});

const statsBtn = nav.querySelector('#stats');
statsBtn.addEventListener('click', () => {
    const wrapperBtn = document.querySelector('.wrapperBtns');
    wrapperBtn.style.display = 'none';

    const row = document.querySelector('.row');
    const cardsToDelete = row.querySelectorAll('.col-md-3');
    for (const card of cardsToDelete) {
        row.removeChild(card);
    }
    updateTable();
    row.append(statisticsWrapper);
});

const statBtn = nav.querySelector('#stat');
statBtn.addEventListener('click', () => {
    const wrapperBtn = document.querySelector('.wrapperBtns');
    wrapperBtn.style.display = 'none';
    const row = document.querySelector('.row');
    const cardsToDelete = row.querySelectorAll('.col-md-3');
    for (const card of cardsToDelete) {
        row.removeChild(card);
    }
    updateTable();
    row.append(statisticsWrapper);
});

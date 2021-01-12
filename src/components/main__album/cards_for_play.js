import { playAudio, isGameFinished, isGameStarted } from './game';
import { rightAnswer, wrongAnswer, mistakesQuantity } from './game';
import { win, fail, stopGame } from './game';
import { incRightCount, incWrongCount } from '../statistics/data';

export function createCardsForPlay(cardsList, category) {
    stopGame();

    const row = document.querySelector('.row');
    localStorage.setItem('isHomePage', 'false');
    localStorage.setItem('category', category);

    const statisticsWrapper = document.querySelector('#statisic');
    if (statisticsWrapper !== null) {
        row.removeChild(statisticsWrapper);
    }

    const playChecker = document.querySelector('.switch-input');
    if (playChecker.checked) {
        const wrapperBtn = document.querySelector('.wrapperBtns');
        wrapperBtn.style.display = 'flex';
        const startBtn = document.querySelector('#start_game');
        startBtn.style.display = 'block';
        const repeat = document.querySelector('#repeat');
        repeat.style.display = 'none';
        const starWrapper = document.querySelector('.starsWrapper');
        starWrapper.style.display = 'none';
    }

    const cardsToDelete = row.querySelectorAll('.col-md-3');
    for (const card of cardsToDelete) {
        row.removeChild(card);
    }

    cardsList.forEach((element) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'col-md-3';

        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';
        card.id = element.id;
        card.setAttribute('description', element.description);

        const star = document.createElement('span');
        star.className = 'star';

        const img = document.createElement('img');
        img.src = element.imageUrl;
        img.alt = 'Learning is fun';
        img.className = 'bd-placeholder-img card-img-top game';
        img.width = '100%';
        img.id = element.id;
        img.setAttribute('description', element.description);

        card.addEventListener('click', (event) => {
            const audioId = parseInt(localStorage.getItem('audioId'));
            if (img.style.opacity !== '0.3' && isGameStarted()) {
                if (parseInt(event.target.id) === audioId) {
                    rightAnswer();
                    const word = event.target.getAttribute('description');
                    incRightCount(category, word);
                    img.style.opacity = '0.3';
                    if (!isGameFinished()) {
                        playAudio();
                    } else {
                        if (mistakesQuantity === 0) {
                            win();
                        } else {
                            fail();
                        }
                        stopGame();
                    }
                } else {
                    wrongAnswer();
                    const word = event.target.getAttribute('description');
                    incWrongCount(category, word);
                }
            }
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex align-items-center';

        row.append(cardWrapper);
        cardWrapper.append(card);
        card.append(img);
    });
}

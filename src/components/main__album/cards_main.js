import * as cards from './cards'; //все содержимое файла импортируем как единый объект
import { createCards } from './cards_categories';
import { createCardsForPlay } from './cards_for_play';

export function createCardsMain(cardsList, row) {
    localStorage.setItem('isHomePage', 'true');
    localStorage.setItem('category', 'main');

    const statisticsWrapper = document.querySelector('#statisic');
    if (statisticsWrapper !== null) {
        row.removeChild(statisticsWrapper);
    }

    const cardsToDelete = row.querySelectorAll('.col-md-3');
    for (const card of cardsToDelete) {
        row.removeChild(card);
    }

    cardsList.forEach((element) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'col-md-3';
        cardWrapper.style.paddingTop = '3%';

        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const img = document.createElement('img');
        img.src = element.imageUrl;
        img.style.padding = '0 6% 0 6%';
        img.alt = 'Learning is fun';
        img.className = 'bd-placeholder-img card-img-top';
        img.width = '100%';
        cardWrapper.addEventListener('click', () => {
            const playChecker = document.querySelector('.switch-input');
            if (playChecker.checked) {
                createCardsForPlay(cards[element.description], element.description);
            } else {
                createCards(cards[element.description], element.description);
            }
        });

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.paddingTop = '10px';
        cardBody.style.paddingBottom = '10px';

        const textContent = document.createElement('p');
        textContent.className = 'card-text';
        textContent.textContent = element.description;
        textContent.style.paddingTop = '2%';
        textContent.style.textAlign = 'center';
        textContent.style.fontSize = '1.3rem';
        textContent.style.fontWeight = '500';

        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex justify-content-between align-items-center';

        row.append(cardWrapper);
        cardWrapper.append(card);
        card.append(img);
        card.append(cardBody);
        cardBody.append(textContent);
        cardBody.append(wrapper);
    });
}

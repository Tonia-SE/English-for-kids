import { incTrainCount } from '../statistics/data';

export function createCards(cardsList, category) {
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

        const img = document.createElement('img');
        img.src = element.imageUrl;
        img.style.padding = '0 6% 0 6%';
        img.alt = 'Learning is fun';
        img.className = 'bd-placeholder-img card-img-top';
        img.width = '100%';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.padding = '5% 13% 5% 13%';

        const textContent = document.createElement('p');
        textContent.className = 'card-text';
        textContent.textContent = element.description;
        textContent.style.paddingTop = '2%';

        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex align-items-center';

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';
        btnGroup.style.padding = '0 0 4% 0';

        const translate = document.createElement('button');
        translate.className = 'btn btn-sm btn-outline-secondary';
        translate.type = 'button';
        translate.id = 'card_btn-BUY';
        translate.textContent = 'translate';
        translate.setAttribute('cardid', element.id);
        translate.style.opacity = '1';

        translate.addEventListener('click', () => {
            if (translate.style.opacity === '1') {
                const audio = new Audio(element.audioUrl);
                audio.play();
                incTrainCount(category, element.description);
            }
        });

        card.addEventListener('click', () => {
            if (translate.style.opacity === '1') {
                const audio = new Audio(element.audioUrl);
                audio.play();
                incTrainCount(category, element.description);
            }
        });

        translate.addEventListener('click', () => {
            card.style.transition = 'transform 0.8s';
            card.style.transform = 'rotateY(180deg)';
            card.style.transformStyle = 'preserve-3d';
            img.style.transform = 'rotateY(180deg)';
            cardBody.style.transform = 'rotateY(180deg)';
            textContent.textContent = element.translate;
            translate.style.opacity = '0';
        });

        card.addEventListener('mouseleave', (event) => {
            const translate = event.target.querySelector('#card_btn-BUY');
            if (translate.style.opacity === '0') {
                const card = event.target;
                card.style.transition = 'transform 0.8s';
                card.style.transform = 'rotateY(-180deg)';
                card.style.transformStyle = 'preserve-3d';
                img.style.transform = 'rotateY(180deg)';
                cardBody.style.transform = 'rotateY(180deg)';
                textContent.textContent = element.description;
                translate.style.opacity = '1';
            }
        });

        row.append(cardWrapper);
        cardWrapper.append(card);
        card.append(img);
        card.append(cardBody);
        cardBody.append(textContent);
        cardBody.append(wrapper);
        btnGroup.append(translate);
        wrapper.append(btnGroup);
    });
}

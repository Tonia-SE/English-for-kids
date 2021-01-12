import { main } from '../main__album/cards';
import { createCardsMain } from '../main__album/cards_main';

export const modalWin = document.createElement('div');
modalWin.className = 'modal';
modalWin.id = 'modal-win';
modalWin.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-img" src="./assets/images/win.jpg">
    <div class="modal-text">
        <p>Congratulations! You are winner!</p>
    </div>
`;

modalWin.onclick = function () {
    modalWin.style.display = 'none';
    createCardsMain(main, document.querySelector('.row'));
};

export const modalFail = document.createElement('div');
modalFail.className = 'modal';
modalFail.id = 'modal-fail';
modalFail.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-img" src="./assets/images/fail.jpg">
    <div class="modal-text">
        <p></p>
    </div>`;

modalFail.onclick = function () {
    modalFail.style.display = 'none';
    createCardsMain(main, document.querySelector('.row'));
};

document.body.append(modalWin, modalFail);

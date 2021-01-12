import { main } from './cards';
import { createCardsMain } from './cards_main';
import { wrapperBtns } from './game';

export const album = document.createElement('div');
album.className = 'album py-5';
album.style.backgroundColor = 'rgb(181, 233, 224) !important';

const container = document.createElement('div');
container.className = 'container';
container.style.backgroundColor = 'rgb(181, 233, 224) !important';

const row = document.createElement('div');
row.className = 'row';

album.append(container);
container.append(row);
row.append(wrapperBtns);
createCardsMain(main, row);

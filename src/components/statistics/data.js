import * as cards from '../main__album/cards';
let statisticsData = {};

const categories = ['animals', 'applicances', 'berries', 'flowers', 'fruit', 'furniture', 'insects', 'vegetables'];

export function initStaisticsData() {
    const savedData = localStorage.getItem('statisticsData');
    if (savedData === null) {
        for (const category of categories) {
            statisticsData[category] = {};
            for (const card of cards[category]) {
                statisticsData[category][card.description] = {
                    translate: card.translate,
                    trainCount: 0,
                    rightCount: 0,
                    wrongCount: 0,
                };
            }
        }
        localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
    } else {
        statisticsData = JSON.parse(savedData);
    }
}

export function getStaisticsData() {
    return statisticsData;
}

export function incRightCount(category, word) {
    if (statisticsData[category][word]['rightCount'] === undefined) {
        statisticsData[category][word]['rightCount'] = 1;
    } else {
        statisticsData[category][word]['rightCount'] += 1;
    }
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
}

export function incWrongCount(category, word) {
    if (statisticsData[category][word]['wrongCount'] === undefined) {
        statisticsData[category][word]['wrongCount'] = 1;
    } else {
        statisticsData[category][word]['wrongCount'] += 1;
    }
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
}

export function incTrainCount(category, word) {
    if (statisticsData[category][word]['trainCount'] === undefined) {
        statisticsData[category][word]['trainCount'] = 1;
    } else {
        statisticsData[category][word]['trainCount'] += 1;
    }
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
}

export function restStatisticsData() {
    localStorage.removeItem('statisticsData');
    initStaisticsData();
}

import { initStaisticsData, getStaisticsData, restStatisticsData } from '../statistics/data';

initStaisticsData();

export const statisticsWrapper = document.createElement('div');

statisticsWrapper.className = 'statisics-wrapper';
statisticsWrapper.id = 'statisic';
statisticsWrapper.innerHTML = `
<div class="wrapper-thread-btn">
    <button type="button" class="btn btn-secondary" id="reset">Reset</button>
    <button type="button" class="btn btn-secondary" id="repeat-difficult">Repeat difficult words</button>
</div>
`;

const resetBtn = statisticsWrapper.querySelector('#reset');

const statTable = document.createElement('table');
statTable.className = 'stat-table table table-hover table-responsive-md table-responsive-sm';
statTable.id = 'stattable';

statisticsWrapper.append(statTable);

statTable.innerHTML = `
<thead class="thead-dark">
    <tr>
        <th scope="col" id="categoryCol">Category</th>
        <th scope="col" id="wordCol">Word</th>
        <th scope="col" id="translationCol">Translation</th>
        <th scope="col" id="trainedCol">Trained</th>
        <th scope="col" id="correctCol">Correct</th>
        <th scope="col" id="incorrectCol">Incorrect</th>
        <th scope="col" id="percentCol">%</th>
    </tr>
    </thead>
`;

function sortTable(colNumber) {
    let rows, switching, i, x, y, shouldSwitch;
    const table = document.querySelector('#stattable');
    switching = true;

    let index = 0;
    for (const th of table.getElementsByTagName('th')) {
        if (index !== colNumber) {
            th.classList.remove('ascend');
            th.classList.remove('descend');
        }
        index++;
    }
    const th = table.getElementsByTagName('th')[colNumber];
    if (th.className.includes('descend')) {
        th.classList.remove('descend');
        th.classList.add('ascend');
    } else if (th.className.includes('ascend')) {
        th.classList.remove('ascend');
        th.classList.add('descend');
    } else {
        th.classList.add('ascend');
    }
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            let x = rows[i].getElementsByTagName('TD')[colNumber].innerHTML.toLowerCase();
            let y = rows[i + 1].getElementsByTagName('TD')[colNumber].innerHTML.toLowerCase();
            if (colNumber > 2) {
                x = parseInt(x);
                y = parseInt(y);
            }
            if (th.className.includes('descend')) {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

const categoryCol = statTable.querySelector('#categoryCol');
categoryCol.addEventListener('click', () => {
    sortTable(0);
});

const wordCol = statTable.querySelector('#wordCol');
wordCol.addEventListener('click', () => {
    sortTable(1);
});

const translationCol = statTable.querySelector('#translationCol');
translationCol.addEventListener('click', () => {
    sortTable(2);
});

const trainedCol = statTable.querySelector('#trainedCol');
trainedCol.addEventListener('click', () => {
    sortTable(3);
});

const correctCol = statTable.querySelector('#correctCol');
correctCol.addEventListener('click', () => {
    sortTable(4);
});

const incorrectCol = statTable.querySelector('#incorrectCol');
incorrectCol.addEventListener('click', () => {
    sortTable(5);
});

const percentCol = statTable.querySelector('#percentCol');
percentCol.addEventListener('click', () => {
    sortTable(6);
});

const tbody = document.createElement('tbody');

export function updateTable() {
    for (const tr of tbody.querySelectorAll('tr')) {
        tbody.removeChild(tr);
    }
    for (const [category, words] of Object.entries(getStaisticsData())) {
        for (const [word, stats] of Object.entries(words)) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = category;
            td.setAttribute('scope', 'row');
            const td1 = document.createElement('td');
            td1.textContent = word;
            const td2 = document.createElement('td');
            td2.textContent = stats.translate;
            const td3 = document.createElement('td');
            td3.textContent = stats.trainCount;
            const td4 = document.createElement('td');
            td4.textContent = stats.rightCount;
            const td5 = document.createElement('td');
            td5.textContent = stats.wrongCount;
            const td6 = document.createElement('td');
            const totalAttempts = parseInt(stats.rightCount) + parseInt(stats.wrongCount);
            if (totalAttempts === 0) {
                td6.textContent = 0;
            } else {
                td6.textContent = Math.ceil((parseInt(stats.rightCount) / totalAttempts) * 100);
            }
            tr.append(td, td1, td2, td3, td4, td5, td6);
            tbody.append(tr);
        }
    }
    statTable.append(tbody);
}

updateTable();

resetBtn.addEventListener('click', () => {
    restStatisticsData();
    const table = document.querySelector('#stattable');
    for (const th of table.getElementsByTagName('th')) {
        th.classList.remove('ascend');
        th.classList.remove('descend');
    }
    updateTable();
});

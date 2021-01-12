const fs = require('fs'); // запись через require импортирует либу, но в отличие от import не нужно настраивать модуль 
const util = require('util');
var request = require('sync-request');

var glob = require('glob');

let categories = [
    'animals',
    'applicances',
    'berries',
    'flowers',
    'fruit',
    'furniture',
    'insects',
    'vegetables'
]

function sleep(ms) {
    var start = new Date().getTime(), expire = start + ms;
    while (new Date().getTime() < expire) { }
    return;
}

//categories.forEach(category => {
let id = 120;
let n = 100;
let main = [];
fs.writeFileSync('./generated.js', '', 'utf-8')
for (category of categories) {    
    fs.appendFileSync('./generated.js', 'export const ' + category + ' = [\r\n', 'utf-8')
    //const description = category.charAt(0).toUpperCase() + category.slice(1);
    main.push({id: n, description: category, imageUrl: './assets/images/' + glob.sync(category + '\/*_main\.jpg')[0]});
    n +=1;
    for (let j = 1; j < 9; j++) {
        
        let regExp = category + '\/*_' + j + '\.jpg';
        let imageUrl = '';
        let description = '';
        console.log(glob.sync(regExp)[0]);
        glob.sync(regExp)[0];
        id += 1;
        imageUrl = './assets/images/' + glob.sync(regExp)[0];
        description = glob.sync(regExp)[0].split('/')[1].split('_')[0];
        const audioUrl = './assets/audio/' + category + '/' + description + '.mp3';
        let res = request('GET', "https://dictionary.skyeng.ru/api/public/v1/words/search?search=" + description)
        //sleep(1000);
        let translation = JSON.parse(res.getBody('utf8'))[0].meanings[0].translation.text;
        const obj = {id: id, description: description, translate: translation, imageUrl: imageUrl, audioUrl: audioUrl};
        fs.appendFileSync('./generated.js', '    ' + util.inspect(obj) + ',\r\n', 'utf-8');     
    }
    fs.appendFileSync('./generated.js', ']\r\n', 'utf-8');
}
fs.appendFileSync('./generated.js', "export const main = " + util.inspect(main), 'utf-8');
const fs = require('fs'); // запись через require импортирует либу, но в отличие от import не нужно настраивать модуль 
const https = require('https');
var glob = require('glob');

let categories = [
    'animals',
    'applicances',
    'berries',
    'flowers',
    'fruit',
    'furniture',
    'insects',
    'trees',
    'vegetables'
]

//Принцип тот же самый что для generate_mock.js.
// Основа итерации - список категорий
for (category of categories) {
    // Сначала надо создать папку category если ее нет, используя fs.
    // Имена  папок будут такие же как для картинок
    if (!fs.existsSync(category)){
        fs.mkdirSync(category);
    }

    for (let j = 1; j < 10; j++) {
        // Далее проходим по всем файлам с картинками, так как они изначально содержат английские слова в своем названии
        let regExp = '../images/' + category + '\/*_' + j + '\.jpg';
        // То есть нам нужно просто получить слово из названия файла
        let description = glob.sync(regExp)[0].split('/')[3].split('_')[0];
        console.log(description);
        
        let audioFile = fs.createWriteStream(category + '/' + description + ".mp3"); // Cоздаем пустой файл 
        //Функция https.get отправляет GET запрос. URL для запроса включает в себя слово, для которого нам нужен аудио файл
        https.get("https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + description + "--_us_1.mp3", function(response) {
         response.pipe(audioFile); // в ответ на запрос фактически приходит набор байт, который мы записываем в файл, который создали выше
        });
    }
}
// words.forEach((word) => {
//     const file = fs.createWriteStream(word + ".mp3");
//     const request = https.get("https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + word + "--_us_1.mp3", function(response) {
//         response.pipe(file);
//     });
// });

var https = require('https');
var request = require('sync-request');

var translation = 'xxxxxxxxxxx'

var res = request('GET', "https://dictionary.skyeng.ru/api/public/v1/words/search?search=" + description)
translation = JSON.parse(res.getBody('utf8'))[0].meanings[0].translation.text;


// var util = require('util');


//         //Функция https.get отправляет GET запрос. URL для запроса включает в себя слово, для которого нам нужен аудио файл
//     https.get("https://dictionary.skyeng.ru/api/public/v1/words/search?search=" + description, function(response) {
//         var bodyChunks = '';
//         response.setEncoding('utf8');
//         response.on('data', function(chunk) {
//           bodyChunks += chunk;
//         }).on('end', function() {          
//           var translation = JSON.parse(bodyChunks)[0].meanings[0].translation.text
//           console.log(translation);
//           //console.log('BODY: ' + parsed);
//           // ...and/or process the entire body here.
//         })
//     });
// console.log(translation);
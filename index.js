const logEvents = require('./logEvents');
const EventEmitter = require('events');

class My_Emitter extends EventEmitter {}

//initialize object
const myEmitter = new My_Emitter();

//add listener
//myEmitter 'log' emit sinyalini bekliyor.
//Sinyal geldiğinde emit ile gönderilen değeri callback fn'a yolluyor
//          'dinlenen sinyal', gelen değer ile yapılacak
myEmitter.on('log', (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  //emit event
  //.emit ise dürtücü olarak görev yapıyor
  //'log' emit'i dürtülüyor, 2. arg olarak ise value gönderiliyor.
  //Alınan ikinci string üstteki on'a arg olarak gönderiliyor.
  //Dürtürü, value
  myEmitter.emit('log', 'This is tenth msg');
}, 1000);

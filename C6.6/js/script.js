const wsUri = 'wss://echo-ws-service.herokuapp.com/';
const status = document.querySelector('#status');
const btnGeo = document.querySelector('.btn-geo');

const outputSent = document.getElementById("outputSent");
const outputResponse = document.getElementById("outputResponse");
const btnOpen = document.querySelector('.btn-send');
let websocket;
let myMessage;

function writeToScreenSent(message) {
  let pre = document.createElement("span");
  pre.className = 'Sent';
  pre.innerHTML = message;
  pre.style.display = 'block';
  document.body.appendChild(pre);
}

function writeToScreenResponse(message) {
  let pre = document.createElement("span");
  pre.className = 'Reponse';
  pre.innerHTML = message;
  pre.style.display = 'block';
  document.body.appendChild(pre);
}

function writeToScreenGeo(message) {
  let pre = document.createElement("span");
  pre.className = 'Geo';
  pre.innerHTML = message;
  pre.style.display = 'block';
  document.body.appendChild(pre);
}

function usePromise() {
    const myPromise = new Promise((resolve, reject) => {
    var myMessage = document.getElementById('sendMesg').value;
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
    console.log('CONNECTED')}
    
    websocket.onclose = function(evt) {
    console.log("DISCONNECTED");};
      
    websocket.onmessage = function(evt) {writeToScreenResponse('Сообщение от сервера: ' + evt.data);};
    websocket.onerror = function(evt) {writeToScreenResponse('<span style="color: red;">ERROR:</span>' + evt.data);};
  
    setTimeout(() => {
      writeToScreenSent("Сообщение отправителя: " + myMessage);
      websocket.send(myMessage);
    }, 5000); });

  myPromise
    .then((result) => {
      console.log('Обрабатываем resolve', result);})
    .catch((error) => {
      console.log('Обрабатываем reject', error);})
    // .finally(() => {
    // });
};

// Функция, выводящая текст об ошибке geo
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  // console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreenGeo(`Широта: ${latitude} °, Долгота: ${longitude} °`);

  // status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  // mapLink.textContent = 'Ссылка на карту';
}

//Process
btnOpen.addEventListener('click', () => {
  usePromise()
});

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    // status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
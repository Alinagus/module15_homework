const btnSend = document.querySelector('.form-btn')
const getText = document.querySelector('.form-text')
const chatField = document.querySelector('.chat-field')
const geo = document.querySelector('.form-btn_geo')

function getResponse(text, getClass){
  const response = document.createElement('p');
  chatField.appendChild(response);
  response.innerHTML += text;
  response.className = getClass;
}


btnSend.addEventListener('click', function(){
  getResponse(getText.value);
  const socket = new WebSocket('wss://echo-ws-service.herokuapp.com')
  socket.onopen = function() {
    console.log("Соединение установлено");
    socket.send(getText.value);
    socket.onmessage = function(event) {
      getResponse(event.data, 'form-response');
  
    };
  };
})

geo.addEventListener('click', function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const socket = new WebSocket('wss://echo-ws-service.herokuapp.com')
      socket.onopen = function() {
        socket.send(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`)
        socket.onmessage = function(event) {
          const location = document.createElement('a');
          chatField.appendChild(location);
          location.href = event.data;
          location.innerHTML = 'Геолокация'
        };
      };
    });
  }

  else{
    getResponse('Ваш браузер не поддерживает геолокацию', 'form-btn_geo')
  }

})


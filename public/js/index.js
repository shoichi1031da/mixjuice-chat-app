
const container = document.getElementById('container');

//メッセージを受け取った日時を取得
let nowDate = () => {
  let date = new Date();
  let day = date.getDate();
  let hour = ("00" + date.getHours()).slice(-2);
  let minite = ("00" + date.getMinutes()).slice(-2);
  return hour + ":" + minite; 
}

//全クライアントのブラウザに表示
let socket = io();
socket.on("chat message", function(msg){
    
  let element = document.createElement("li");            
  element.innerHTML = '<span id="time">' + nowDate() + '</span> ' + msg;
  messages.appendChild(element);
    
  //自動スクロール
  if(container.scrollHeight > container.scrollTop + container.offsetHeight){
      container.scrollTop = container.scrollHeight;
  }
});

  
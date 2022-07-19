
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
socket.on("chat message", (MSG,ICON) => {
  let icon = "";
  let element = document.createElement("li"); 
  if(ICON) icon = ICON.substr(0,2);
  if(!icon) icon = "🍓";
  icon = '<div id="icon">' + icon + '</div>' ;
  let time = '<span id="time">' + nowDate() + '</span> '
  let message = '<span id="message">' + MSG + '</span>';

  element.innerHTML = icon + time + message;
  messages.appendChild(element);
  
    
  //自動スクロール
  if(container.scrollHeight > container.scrollTop + container.offsetHeight){
      container.scrollTop = container.scrollHeight;
  }

// socket.on("all messages", () => {
//   socket.emit("all messages",container.textContent);
// })

});

  
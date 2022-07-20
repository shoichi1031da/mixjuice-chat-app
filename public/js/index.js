
const container = document.getElementById('container');


//メッセージを受け取った日時を取得
let nowDate = () => {
  let date = new Date();
  let day = date.getDate();
  let hour = ("00" + date.getHours()).slice(-2);
  let minite = ("00" + date.getMinutes()).slice(-2);
  return hour + ":" + minite; 
}

//気持ちレスポンシブに。後日対応予定
let client_w = document.getElementById('notes').clientWidth;
console.log(client_w);

let notes = document.getElementById('notes');
let note = document.getElementById('note');
let src = document.getElementById('src');
let line = document.getElementById('line');

if(client_w > 415){

  notes.style.flexWrap = "none";
  note.style.flexGrow = "none"
  src.style.width = "0%";
  src.style.flexGrow = "1";
  src.style.flexBasis = "0";
  line.style.width = "0%";
  line.style.margin = "5px 10px 5px 0";
  
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

// MixJuiceのレスポンスで全チャットの内容を返すプログラムを作る予定
// socket.on("all messages", () => {
//   socket.emit("all messages",container.textContent);
// })

});

  
//タグの要素を取得
const header = document.getElementById('header');
const ichigojam = document.getElementById('ichigojam');
const notes = document.getElementById('notes');
  const note = document.getElementById('note');
  const src = document.getElementById('src');
  const line = document.getElementById('line');
  const link = document.getElementById('link');
const btn = document.getElementById('btn');
const container = document.getElementById('container');

//気持ちレスポンシブに。後日対応予定
  let src_w = document.getElementById('src').clientWidth;
    // console.log("src_w " + src_w);
  link.textContent = "アプリの使い方 | src on GitHub";
  if(src_w > 393){
    notes.style.flexWrap = "none";
    note.style.flexGrow = "none"
    src.style.width = "0%";
    src.style.flexGrow = "1";
    src.style.flexBasis = "0";
    line.style.width = "0%";
    line.style.margin = "5px 10px 5px 0";
    line.style.borderTop = "1px solid rgb(160, 213, 213);"
    link.innerHTML = "＜アプリの使い方＞<br>src on GitHub";
  }

//チャットコンテナの高さ調整
  let footer_h = document.getElementById('footer').clientHeight;
  let window_h = window.innerHeight
    // console.log("window height: " + window_h);
    // console.log("container offsetTop: " + container.offsetTop);
  let adjustHeight = (window_h - container.offsetTop - footer_h - 17) + "px";
    // console.log("adjustHeight: " + adjustHeight);
  container.style.height = adjustHeight;


//全画面モード
let btnState = 0;
btn.onclick = () => {
  if(btnState == 0){
  header.remove();
  ichigojam.remove();
  notes.remove();
  adjustHeight = (window_h - container.offsetTop - 2 * footer_h) + "px";
  container.style.margin = "10px 10px 0 10px";
  container.style.height = adjustHeight;
  } else{
    location.reload();
  }
btnState = !btnState;
}

//メッセージを受け取った日時を取得
// let nowDate = () => {
//   let date = new Date();
//   let day = date.getDate();
//   let hour = ("00" + date.getHours()).slice(-2);
//   let minite = ("00" + date.getMinutes()).slice(-2);
//   return hour + ":" + minite; 
// }

 const escapeHtml = (str) => {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}

//全クライアントのブラウザに表示
let socket = io();
socket.on("chat message", (MSG,ICON) => {
  let icon, msg = "";
  let li = document.createElement("li"); 
  ICON = ICON.substr(0,2);
  icon = '<div id="icon">' + escapeHtml(ICON) + '</div>' ;
  msg = '<span id="message">' + escapeHtml(MSG) + '</span>';
  li.innerHTML = icon + msg;
  messages.appendChild(li);

    
  //自動スクロール
  if(container.scrollHeight > container.scrollTop + container.offsetHeight){
      container.scrollTop = container.scrollHeight;
  }

// MixJuiceのレスポンスで全チャットの内容を返すプログラムを作る予定
// socket.on("all messages", () => {
//   socket.emit("all messages",container.textContent);
// })

});


  
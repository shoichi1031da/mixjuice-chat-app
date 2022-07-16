
const express = require("express");
const app = express();
const fs = require('fs');
const http = require("http");
const { receiveMessageOnPort } = require("worker_threads");
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server)

const IchigoJamEncoder = require("./IchigoJamEncoder");
const PORT = process.env.PORT || 3000;

//publicディレクトリ内のファイルをロードできるようになる
app.use(express.static('public'));

app.get("/" ,(req,res) => {
    let cliantType = req.headers["user-agent"];
        console.log("\n クライアントタイプ:" + cliantType);
    let recMsg = req.query.msg;
        console.log(" エンコード前:" + recMsg);
    let encodedUri = encodeURI(recMsg); 
        console.log(" ユニコード化:" + encodedUri);

    //パラメータで受け取った文字列をエンコード
    if(recMsg){
        
        let msgLength = recMsg.length;
        let sendMsg = IchigoJamEncoder(recMsg,msgLength);
        
        if(cliantType.substr(0,8) == "MixJuice"){
            io.emit("chat message", sendMsg);
            console.log(" ブラウザ表示:" + sendMsg);
        }else{
            app.set("sendMsg",recMsg);
        }
    }

    //MixJuice側へのHTMLレスポンスを強制終了させるためにリダイレクトエラーを起こす
    if(req.query.redirect){
        console.log(" リダイレクト:" + req.query.redirect);
        res.redirect('https://google.com');
    }

    res.sendFile(__dirname + "/index.html");
});

//WebSocketの接続
io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    let sendMsg = app.get("sendMsg")
    if(sendMsg){
        io.emit("chat message",sendMsg);
        console.log(" ブラウザ表示:" + sendMsg);
    }
    
});


server.listen(PORT, () =>{
    console.log("listening on 80");
});



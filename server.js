
const express = require("express");
const app = express();
const fs = require('fs');
const http = require("http");
const { receiveMessageOnPort } = require("worker_threads");
const server = http.createServer(app);
const io = require("socket.io")(server);

//結局herokuサーバーにCORSのヘッダー追加ができなかったためコメントアウト
    // const cors = require('cors');
    // app.use(cors());
    // const corsOption = {
    //     origin: [
    //       "https://fukuno.jig.jp"
    //     ],
    //     credentials: true,
    //   };
    //   app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;
const IchigoJamEncoder = require("./public/js/IchigoJamEncoder");

//publicディレクトリ内のファイルをロードできるようになる
app.use(express.static('public'));

let iconUri = "";
let msgUri = "";

app.get("/",(req,res) => {
    app.set("encodedStr","");
    let cliantType = req.headers["user-agent"];
        console.log("\n クライアントタイプ:" + cliantType);
    
    //IchigoJam web からのリクエストを受け付ける
    let origin = req.headers.origin;
        console.log("origin:" + origin);
    
    let icon = req.query.icon;
    if(icon) {
        iconUri = encodeURI(icon);
        console.log(" iconエンコード:" + iconUri);
    }
        console.log("icon:" + icon);
    let recMsg = req.query.msg;
        console.log(" エンコード前:" + recMsg);
    msgUri = encodeURI(recMsg); 
        console.log(" エンコード後:" + msgUri);

    //パラメータで受け取った文字列をエンコード
    if(recMsg){
        const encodedStr = IchigoJamEncoder(recMsg,msgUri,icon,iconUri);
        
        if(cliantType.substr(0,8) == "MixJuice" || origin == "https://fukuno.jig.jp"){
            io.emit("chat message", encodedStr.msg,encodedStr.icon);
            console.log(" ブラウザ表示:" + encodedStr.msg);
            if(encodedStr.icon)console.log(" アイコン表示:" + encodedStr.icon);
        }else{
            app.set("encodedStr",encodedStr);
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
    let encodedStr = app.get("encodedStr")
    if(encodedStr){
        io.emit("chat message",encodedStr.msg,encodedStr.icon);
        console.log(" ブラウザ表示:" + encodedStr.msg);
        console.log(" アイコン表示:" + encodedStr.icon);
    }
});


server.listen(PORT, () => {
    console.log("listening on " + PORT);
});



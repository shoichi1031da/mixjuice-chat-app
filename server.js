
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

//IchigoJam webでのCORSのヘッダー設定
const cors = require('cors');
app.use(
    cors({
        origin: "https://fukuno.jig.jp",
    }));
    
//publicディレクトリ内のファイルをロードできるようになる
app.use(express.static('public'));
    
const IchigoJamDecoder = require("./public/js/IchigoJamDecoder");
    
//ブラウザもしくはIchigoJamからのGETリクエストに対する処理
app.get("/",(req,res) => {
    app.set("decodedData","");
    let cliantType = req.headers["user-agent"];
        console.log("\n クライアントタイプ:" + cliantType);
    
    //IchigoJam web からのリクエストを受け付ける
    let origin = req.headers.origin;
        console.log("origin:" + origin);
    
    //パラメーターからiconの文字列を受け取る
    let ICON = req.query.icon;
    if(!ICON)ICON = "🍓";
        console.log("パラメータICON:" + ICON);

    //iconの文字列を1文字ずつ分割し、文字コードに変換（絵文字対策）
    let ICONcharaCode = [];
    for(let i = 0; i < ICON.length; i++){
        ICONcharaCode.push(ICON.charCodeAt(i));
    }

    //パラメーターからmsgの文字列を受け取る
    let MSG = req.query.msg;
    if(!MSG)MSG = "Hello Mixchat!";
        console.log("パラメータMSG:" + MSG);

    //msgの文字列を1文字ずつ分割し、文字コードに変換（絵文字対策）
    let MSGcharaCode = [];
    for(let i = 0; i < MSG.length; i++){
        MSGcharaCode.push(MSG.charCodeAt(i));
    }
    
    //最終的にブラウザに表示するためにデコード
    let decodedData = IchigoJamDecoder(ICONcharaCode,MSGcharaCode);
    app.set("decodedData",decodedData);
    
    //クライアントがMixJuice実機かIchigoJam webの時
    if(cliantType.substr(0,8) == "MixJuice" || origin == "https://fukuno.jig.jp"){
        io.emit("chat message", decodedData.MSG,decodedData.ICON);
        console.log(" アイコン表示:" + decodedData.ICON);
        console.log(" ブラウザ表示:" + decodedData.MSG);
    }else{
        app.set("decodedData",decodedData);
    }
    
    //MixJuice側へのHTMLレスポンス拒否機能（空のbodyを送る）
    if(req.query.res == "off"){
        res.send("");
        console.log(" レスポンス:" + req.query.res);
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//ブラウザとのWebSocketの接続
io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    let decodedData = app.get("decodedData");
    if(decodedData){
        io.emit("chat message",decodedData.MSG,decodedData.ICON);
        console.log(" アイコン表示:" + decodedData.ICON);
        console.log(" ブラウザ表示:" + decodedData.MSG);
    }
});


server.listen(PORT, () => {
    console.log("listening on " + PORT);
});



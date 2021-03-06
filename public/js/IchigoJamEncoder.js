
const IchigoJamEncoderTable = {

    recieveStr:[
        "±","²","³","´","µ",
        "¶","·","¸","¹","º",
        "»","¼","½","¾","¿",
        "À","Á","Â","Ã","Ä",
        "Å","Æ","Ç","È","É",
        "Ê","Ë","Ì","Í","Î",        
        "Ï","Ð","Ñ","Ò","Ó",
        "Ô","Õ","Ö", 
        "×","Ø","Ù","Ú","Û",
        "Ü","¦","Ý",

        "§","¨","©","ª","«",
        "¯",
        "¬","%C2%AD","%C2%AE", //小文字のユヨが読み取れないのでユニコードで対応
        "¤","¡","°","¢","£",

        "¶Þ","·Þ","¸Þ","¹Þ","ºÞ", 
        "»Þ","¼Þ","½Þ","¾Þ","¿Þ",
        "ÀÞ","ÁÞ","ÂÞ","ÃÞ","ÄÞ",
        "ÊÞ","ËÞ","ÌÞ","ÍÞ","ÎÞ",
        "Êß","Ëß","Ìß","Íß","Îß",

        "à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï",
        "ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ",

        //読み取れない文字列はユニコードで対応
        "%C2%81","%C2%82","%C2%83","%C2%84","%C2%85","%C2%86","%C2%87","%C2%88","%C2%89","%C2%8A","%C2%8B","%C2%8C","%C2%8D","%C2%8E","%C2%8F","%C2%90","%C2%91","%C2%92","%C2%93","%C2%94","%C2%95","%C2%96","%C2%97","%C2%98","%C2%99","%C2%9A","%C2%9B","%C2%9C","%C2%9D","%C2%9E","%C2%9F"
    ],

    sendStr:[
        "ア","イ","ウ","エ","オ",
        "カ","キ","ク","ケ","コ",
        "サ","シ","ス","セ","ソ",
        "タ","チ","ツ","テ","ト",
        "ナ","ニ","ヌ","ネ","ノ",
        "ハ","ヒ","フ","ヘ","ホ",
        "マ","ミ","ム","メ","モ",
        "ヤ","ユ","ヨ",
        "ラ","リ","ル","レ","ロ",
        "ワ","ヲ","ン",
        
        "ァ","ィ","ゥ","ェ","ォ",
        "ッ",
        "ャ","ュ","ョ",
        "、","。","ー","「","」",

        "ガ","ギ","グ","ゲ","ゴ",
        "ザ","ジ","ズ","ゼ","ゾ",
        "ダ","ヂ","ヅ","デ","ド",
        "バ","ビ","ブ","ベ","ボ",
        "パ","ピ","プ","ペ","ポ",

        "←","→","↑","↓","♠","♥","♣","♦","⚫","⚪","🔟","🍙","🐱","👾","♪","🌀",
        "🚀","🛸","⌇","🚁","💥","💰","🧰","📶","🚪","🕴","🕺","💃","🏌","🏃","🚶","🍓",

        "/","/","▘","▝","▀","▖","▌","▞","▛","▗","▚","▐","▜","▄","▙","▟","█","・","━","┃","╋","┫","┣","┻","┳","┏","┓","┗","┛","◤","◥","◣","◢"
    ]

}

const IchigoJamEncoder = (recMsg,msgUri,icon,iconUri) => {
    const recMsgLength = recMsg.length;
    let encodedMsg = "";
    let encodedIcon = "";
    let d = []; 

    //アイコンの文字がアルファベットや数字、ひらがな、漢字の時はエンコードしない
    if(iconUri.substr(0,2) != "%C"){
        encodedIcon = icon;
        
    } else {
        //IchigoJamEncoderTableオブジェクトを参照しエンコード
        for(const j in IchigoJamEncoderTable.sendStr){
            if(icon == IchigoJamEncoderTable.recieveStr[j] || encodeURI(icon) == IchigoJamEncoderTable.recieveStr[j]){
                encodedIcon = IchigoJamEncoderTable.sendStr[j];
                
            } 
        }  
    }
    

    //エンコード前の文字を1文字ずつ分割して配列dに格納
    for(let i = 0; i < recMsgLength; i++){
        d[i] = recMsg.substr(i,1);
    }

    //1文字ずつエンコード
    for(let i = 0; i < recMsgLength; i++){

        //濁点、半濁点の時はスキップ
        if(d[i] == "Þ" || d[i] == "ß") continue;

        //濁点文字の処理
        if(d[i+1] == "Þ") d[i] = d[i] + "Þ";

        //半濁点文字の処理
        if(d[i+1] == "ß") d[i] = d[i] + "ß";

        //メッセージがアルファベットや数字、ひらがな、漢字の時はエンコードせず連結
        if(encodeURI(d[i]).substr(0,2) != "%C"){
            encodedMsg = encodedMsg + d[i];
            continue;
        }

        //IchigoJamEncoderTableオブジェクトを参照しエンコード
        for(const j in IchigoJamEncoderTable.sendStr){
            if(d[i] == IchigoJamEncoderTable.recieveStr[j] || encodeURI(d[i]) == IchigoJamEncoderTable.recieveStr[j]){
                encodedMsg = encodedMsg + IchigoJamEncoderTable.sendStr[j];
            } 
        }            
        
    } 
    let encodedStr = {msg:encodedMsg, icon:encodedIcon};
    return encodedStr;
}

module.exports = IchigoJamEncoder;


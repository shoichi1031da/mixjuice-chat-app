
const katakanaTable = {
    katakana:[
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
        "パ","ピ","プ","ペ","ポ"
    
    ],
    
    strings:[
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
        "¬","","­", //小文字のユヨだけ読み取れない
        "¤","¡","°","¢","£",

        "¶Þ","·Þ","¸Þ","¹Þ","ºÞ", 
        "»Þ","¼Þ","½Þ","¾Þ","¿Þ",
        "ÀÞ","ÁÞ","ÂÞ","ÃÞ","ÄÞ",
        "ÊÞ","ËÞ","ÌÞ","ÍÞ","ÎÞ",
        "Êß","Ëß","Ìß","Íß","Îß"
    ],
}

//小文字のユヨ変換関数
const yuyo = (uri) => {
    let d = uri;
    if(uri == "%C2%AD") d = "ュ";
    else d = "ョ";
    return d;
}


const IchigoJamEncoder = (resMsg,msgLength) => {
    let encodedMsg = "";
    let d = []; 
    //エンコード前の文字を1文字ずつ分割して配列dに格納
    for(let i=0;i<msgLength;i++){
        d[i] = resMsg.substr(i,1);
    }

    //1文字ずつエンコード
    for(let i=0;i<msgLength;i++){

        //濁点、半濁点の時はスキップ
        if(d[i] == "Þ" || d[i] == "ß")continue;

        //濁点の処理
        if(d[i+1] == "Þ")d[i] = d[i] + "Þ";

        //半濁点の処理
        if(d[i+1] == "ß")d[i] = d[i] + "ß";

        //アルファベットや数字の時はエンコードせず連結
        if(encodeURI(d[i]).substr(0,1) !== "%"){
            encodedMsg = encodedMsg + d[i];
            continue;
        } 

        //katakanaTableオブジェクトのプロパティと一致するまで繰り返し（検索）
        let j=0;
        while(d[i] !== katakanaTable.strings[j]){

            //なぜか小文字のユとヨのエンコード前の文字だけ読み取れないので、ユニコードで処理
            let uri = encodeURI(d[i]);
            if(uri == "%C2%AD" || uri == "%C2%AE"){
                katakanaTable.katakana[j] = yuyo(uri);
                break;
            }
            j++;
            
        }

        encodedMsg = encodedMsg + katakanaTable.katakana[j];
    
    } return encodedMsg;
}
    

module.exports = IchigoJamEncoder;


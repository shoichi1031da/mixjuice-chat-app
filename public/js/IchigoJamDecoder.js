
const decodedStrings = [

        //文字コード129〜255まで
        "▘","▝","▀","▖","▌","▞","▛","▗","▚","▐","▜","▄","▙","▟","█","・","━","┃","╋","┫","┣","┻","┳","┏","┓","┗","┛","◤","◥","◣","◢",
        "¥","。","「","」","、","・",
        "ヲ","ァ","ィ","ゥ","ェ","ォ","ャ","ュ","ョ","ッ","ー",
        "ア","イ","ウ","エ","オ",
        "カ","キ","ク","ケ","コ",
        "サ","シ","ス","セ","ソ",
        "タ","チ","ツ","テ","ト",
        "ナ","ニ","ヌ","ネ","ノ",
        "ハ","ヒ","フ","ヘ","ホ",
        "マ","ミ","ム","メ","モ",
        "ヤ","ユ","ヨ",
        "ラ","リ","ル","レ","ロ",
        "ワ","ン","゛","゜",
        "←","→","↑","↓","♠","♥","♣","♦","⚫","⚪","🔟","🍙","🐱","👾","♪","🌀",
        "🚀","🛸","⌇","🚁","💥","💰","🧰","📶","🚪","🕴","🕺","💃","🏌","🏃","🚶","🍓"

]

const IchigoJamDecoder = (iconCharaCode,msgCharaCode) => {
    let decodedICON = "";
    let decodedMSG = "";

    for(const i in iconCharaCode){
        if(iconCharaCode[i] > 128 && iconCharaCode[i] < 256){
            decodedICON += decodedStrings[iconCharaCode[i] - 129];
        } else{
            decodedICON += String.fromCharCode(iconCharaCode[i]);
        } 
    }

    for(const i in msgCharaCode){

        if(msgCharaCode[i] > 128 && msgCharaCode[i] < 256){
            decodedMSG += decodedStrings[msgCharaCode[i] - 129];
        } else{
            decodedMSG += String.fromCharCode(msgCharaCode[i]);
        } 
    }

    const decodedData = {
        ICON: decodedICON,
        MSG: decodedMSG
    }

    return decodedData;
   
}

module.exports = IchigoJamDecoder;


# MixJuice専用チャットアプリ "Mixchat!"
https://mixjuice-chat.herokuapp.com/

GETメソッドのパラメータmsgにメッセージを代入しリクエストを送るとブラウザに表示されます。

## 例)ブラウザの場合
https://mixjuice-chat.herokuapp.com/?msg=メッセージ

## 例)MixJuiceの場合
?"MJ GETS mixjuice-chat.herokuapp.com/?msg=メッセージ"

MixJuice側でGETリクエストを強制終了させたい場合はredirectパラメータを追記しましょう。
?"MJ GETS mixjuice-chat.herokuapp.com/?redirect=on&msg=メッセージ"

# MixJuice専用チャットアプリ "Mixchat!"
https://mixjuice-chat.herokuapp.com/

GETメソッドのパラメータmsgにメッセージを代入しリクエストを送るとブラウザに表示されます。
IchigoJamのカタカナや句読点にも対応しています。

＜今後の対応予定＞

・IchigoJam絵文字の対応

・クローズドなグループチャット機能（現在はユーザー全員が同じグループでチャットしているだけ）

## 例1)ブラウザの場合
https://mixjuice-chat.herokuapp.com/?msg=メッセージ

## 例2)MixJuice、IchigoJam実機の場合
### ?"MJ GETS mixjuice-chat.herokuapp.com/?msg=メッセージ"

MixJuice側でGETリクエストを強制終了させたい場合はredirectパラメータを追記しましょう。
### ?"MJ GETS mixjuice-chat.herokuapp.com/?redirect=on&msg=メッセージ"

## 例3)IchigoJam Webの仮想MixJuice機能の場合
https://fukuno.jig.jp/app/IchigoJam/
「I/O」ボタンをクリックし、「MixJuice」のチェックボックスにチェックを入れるとMixJuice機能が使えます。使い方は例2と同じです。
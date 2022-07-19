# MixJuice専用チャットアプリ "Mixchat!"
### https://mixjuice-chat.herokuapp.com/

GETメソッドのパラメータmsgにメッセージを代入しリクエストを送るとブラウザに表示されます。
IchigoJamのカタカナや絵文字にも対応しています。

IchigoJamでのネットワーク講座などでご利用ください。

＜今後の対応予定＞

・クローズドなグループチャット機能（現在は完全にオープンチャット）

## 使用例1)ブラウザの場合
アドレスバーにmsgパラメータ付きで入力しアクセスするとメッセージを送ることができます。

https://mixjuice-chat.herokuapp.com/?msg=アドレスバーにメッセージを入力

チャットメッセージ全体のエリアのサイズは、エリアの右下をクリックして変更することができます。

## 使用例2)MixJuice、IchigoJam実機の場合
### ?"MJ GETS mixjuice-chat.herokuapp.com/?msg=メッセージ"

追加機能1）MixJuice側でGETリクエストを拒否できます。redirectパラメーターを追加します。

### ?"MJ GETS mixjuice-chat.herokuapp.com/?redirect=on&msg=メッセージ"

追加機能2)アイコンに使用する文字をiconパラメーターで指定できます（デフォルトは🍓）。アルファベットなら2文字まで指定できます。

### ?"MJ GETS mixjuice-chat.herokuapp.com/?icon=🐱&msg=メッセージ"

### ※注意※ キーにスペースは使えません。
MixJuice、IchigoJam実機の場合は、スペースをパラメータに使わないでください。

## 使用例3)IchigoJam Webの仮想MixJuice機能の場合
https://fukuno.jig.jp/app/IchigoJam/
「I/O」ボタンをクリックし、「MixJuice」のチェックボックスにチェックを入れるとMixJuice機能が使えます。使い方は使用例2)と同じです。

※IchigoJam Webの場合はスペースをパラメータに使うことができます。
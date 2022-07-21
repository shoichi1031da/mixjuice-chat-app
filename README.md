# MixJuice専用チャットアプリ "Mixchat!" バージョン 2.1.1
### https://mixjuice-chat.herokuapp.com/
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/main.png" alt="メイン" title="main">

GETメソッドのパラメータmsgにメッセージを入力しリクエストを送るとブラウザに表示され、チャットができます。

IchigoJamのカタカナや絵文字にも対応しています。

IchigoJamでのネットワーク講座などでご利用ください。

＜今後の対応予定＞

・クローズドなグループチャット機能（現在は完全にオープンチャット）

## 使用例1)ブラウザの場合
アドレスバーにmsgパラメータ付きで入力しアクセスするとメッセージを送ることができます。

https://mixjuice-chat.herokuapp.com/?msg=アドレスバーにメッセージを入力

### ブラウザ機能)イチゴマークをクリックすると全画面表示に切り替わります。
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/default_screen.png" alt="メッセージ" title="msg">

↓

<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/full_screen.png" alt="メッセージ" title="msg">
もう一度イチゴマークを押すとリロードされ初期画面に戻ります。

## 使用例2)MixJuice、IchigoJam実機の場合
?"MJ GETS mixjuice-chat.herokuapp.com/?msg=メッセージ"
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample1_msg.png" alt="メッセージ" title="msg">

<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample0.png" alt="初期画面" title="initial screen">

↓

<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample1_msg_result.png" alt="メッセージ結果" title="msg_result">

### 追加機能1）MixJuice側でGETリクエストを拒否できます。resパラメーターを追加します。
?"MJ GETS mixjuice-chat.herokuapp.com/?res=off&msg=メッセージ"
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample2_res.png" alt="リダイレクト" title="redirect">

### 追加機能2)アイコンに使用する文字をiconパラメーターで指定できます（デフォルトは🍓）。アルファベットなら2文字まで指定できます。

?"MJ GETS mixjuice-chat.herokuapp.com/?icon=キャラ&msg=メッセージ"
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample3_icon.png" alt="アイコン" title="icon">
<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample3_icon_result.png" alt="アイコン結果" title="icon_result">


### ※注意※ パラメーターにスペースは使えません。
MixJuice、IchigoJam実機の場合は、スペースをパラメータに使わないでください。

## 使用例3)IchigoJam Webの仮想MixJuice機能の場合
https://fukuno.jig.jp/app/IchigoJam/
「I/O」ボタンをクリックし、「MixJuice」のチェックボックスにチェックを入れるとMixJuice機能が使えます。使い方は使用例2)と同じです。

https://fukuno.jig.jp/app/IchigoJam/#10%20%3F%22MJ%20GETS%20mixjuice-chat.herokuapp.com%2F%3Fmsg%3DIchigoJamWeb%22%0A

<img src="https://github.com/shoichi1031da/mixjuice-chat-app/blob/main/document/sample4_ichigojamweb.png" alt="IchigoJamweb" title="ichigojamweb">
※IchigoJam Webの場合はスペースをパラメータに使うことができます。

## その他
質問はTwitterのDMにてお願いします。

https://twitter.com/shihan_hanadojo

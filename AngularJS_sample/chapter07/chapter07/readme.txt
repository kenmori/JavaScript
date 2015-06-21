7章のサンプルコードはサーバーとの通信が必要となります。
そのため、ngMockE2EのhttpBackendを利用して擬似通信をしています。

他にもwebsocket通信がありますが、これはwebsocket_serverにスクリプトを用意しました。
node.jsで起動してください。
モジュールとしてwsを利用しておりますので、npmでwsをインストールしてください。

% cd websocket_server
% npm install ws
% node server.js

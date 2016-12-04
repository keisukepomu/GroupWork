var socket, emit, id;
(function(){
    socket = io.connect("http://localhost:8888");
    emit = function (name, data){
        // json → 文字列に変換して送信する関数
        socket.emit(name, JSON.stringify(data));
    }
})();

var scrollMsg = function(){
	// 要素の位置を取得する
	var element = document.getElementById('send') ;
	var rect = element.getBoundingClientRect() ;
	var positionX = rect.left + window.pageXOffset ;	// 要素のX座標
	var positionY = rect.top + window.pageYOffset ;	// 要素のY座標

	// 要素の位置にスクロールさせる
	window.scrollTo( positionX, positionY ) ;
}

window.onload = function(){
	var navibar = document.getElementById('nvChatRoom');
	navibar.className = "active";

	var idx = 0;

    var sendBtn = document.getElementById('send');
    sendBtn.addEventListener("click", function(){
        emit('msg', {text: msg.value, id: id});
        document.getElementById('msg').value = '';
    });

    socket.on('init', function(d){
    	var data = JSON.parse(d), // 文字列→JSON
    		panel = document.createElement('div'), // liタグ作成
    		span = document.createElement('span'), //spanタグ作成
    		msgPanel = document.getElementsByClassName('msgPanel').item(0);; // ulタグの取得
    	panel.className = "panel panel-default";
    	panel.id = idx;
       	span.className = "glyphicon glyphicon-bell color-skyblue";
        panel.textContent = data.text; // liタグに値を入れる
        msgPanel.appendChild(span); // ulタグの子ノードとして作成したsapanタグを追加
        msgPanel.appendChild(panel); // ulタグの子ノードとして作成したliタグを追加
        id = socket.id;
        scrollMsg();
        idx++;
    });

    socket.on('receiveMsg', function(d){
        var data = JSON.parse(d), // 文字列→JSON
            panel = document.createElement('div'), // liタグ作成
            span = document.createElement('span'), //spanタグ作成
            msgPanel = document.getElementsByClassName('msgPanel').item(0); // ulタグの取得
        panel.className = "panel panel-default";
        panel.id = idx;
        if (data.id == id) {
        	span.className = "glyphicon glyphicon-user color-blue";
        } else {
        	span.className = "glyphicon glyphicon-user";
        }
        panel.innerText = data.text; // liタグに値を入れる
        msgPanel.appendChild(span); // ulタグの子ノードとして作成したsapanタグを追加
        msgPanel.appendChild(panel); // ulタグの子ノードとして作成したliタグを追加
        scrollMsg();
        idx++;
    });
};

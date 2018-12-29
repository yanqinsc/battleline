let websocket = '';
let ajaxPageNum = 1;
let last_health;
let health_timeout = 10;
let tDates = [], tData = [];
let rightIndex;
if ($('body').attr('userName') != '' && $('body').attr('ws') == 'yes') {
    let userName = $('body').attr('userName');
    if (window.WebSocket) {
        websocket = new WebSocket(
            encodeURI('ws://' + document.domain + ':8887'));
        websocket.onopen = function() {
            console.log('已连接');
            websocket.send("online"+userName);
            heartbeat_timer = setInterval(function() {
                keepalive(websocket)
            }, 60000);
        };
        websocket.onerror = function() {
            console.log('连接发生错误');
        };
        websocket.onclose = function() {
            console.log('已经断开连接');
            initWs();
        };
        // 消息接收
        websocket.onmessage = function(message) {
            console.log(message)
            showNotice("新订单", "您有新的逸品订单，请及时处理！")
        };
    } else {
        alert("该浏览器不支持下单提醒。<br/>建议使用高版本的浏览器，<br/>如 IE10、火狐 、谷歌  、搜狗等");
    }

}
let initWs = function() {
    if (window.WebSocket) {
        websocket = new WebSocket(
            encodeURI('ws://' + document.domain + ':8887'));
        websocket.onopen = function() {
            console.log('已连接');
            websocket.send("online"+userName);
            heartbeat_timer = setInterval(function() {
                keepalive(websocket)
            }, 60000);
        };
        websocket.onerror = function() {
            console.log('连接发生错误');
        };
        websocket.onclose = function() {
            console.log('已经断开连接');
            initWs();
        };
        // 消息接收
        websocket.onmessage = function(message) {
            console.log(message);
            showNotice("新订单", "您有新的逸品订单，请及时处理！")
        };
    } else {
        alert("该浏览器不支持下单提醒。<br/>建议使用高版本的浏览器，<br/>如 IE10、火狐 、谷歌  、搜狗等");
    }
};
let vadioTimeOut;
function showNotice(title, content) {
    if (!title && !content) {
        title = "新订单";
        content = "您有新的订单,请及时处理！";
    }
    let iconUrl = "http://www.wonyen.com/favicon.ico";
    $("#myaudio")[0].play();// 消息播放语音
    let playTime = 1;
    let audio = document.createElement("myaudio");
    clearTimeout(vadioTimeOut);
    audio.addEventListener('ended', function() {
        vadioTimeOut = setTimeout(function() {
            playTime = playTime + 1;
            playTime < 3 ? audio.play() : clearTimeout(vadioTimeOut);
        }, 500);
    });
    if (Notification.permission === "granted") {
        let notification = new Notification(title, {
            body : content,
            icon : iconUrl
        });

        notification.onclick = function() {
            notification.close();
        };
    }
}

// 心跳包
function keepalive(ws) {
    let time = new Date();
    if (last_health != -1 && (time.getTime() - last_health > health_timeout)) {
        // ws.close();
    } else {
        if (ws.bufferedAmount == 0) {
            ws.send('~HC~');
        }
    }
}
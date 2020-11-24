import {baseUrl} from "./base";
import {getUrlParam} from "../utils/tool";
import state from "../store/state";

export const ws  = ()=>{
    var sendJSONObject
    //获取用户登入信息
    var obj = {
        C2S_WeChatLogin:{
            Nickname:getUrlParam('Nickname'),
            Headimgurl:getUrlParam('Headimgurl'),
            Sex:parseInt(getUrlParam('Sex')),
            Serial:getUrlParam('Serial'),
            Model:getUrlParam('Model'),
            Unionid:getUrlParam('Unionid'),
            Type:parseInt(getUrlParam('Type')),
            CircleId:parseInt(getUrlParam('CircleId')),
            IphoneNumer:getUrlParam('IphoneNumer'),
            ShareAccount:getUrlParam('ShareAccount'),
        },
    }
    var ws = new WebSocket(baseUrl.ws);

    //登入
    ws.onopen = function () {
        sendJSONObject(obj)
    };

    //发送消息
    sendJSONObject = function (obj) {
        if (ws && ws.readyState == WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
        return Object.keys(obj)
    };

    // 监听返回数据
    ws.onmessage = function (e) {
        //二进制转换
        var reader = new FileReader();
        reader.readAsText(e.data);
        reader.onload = function () {
            var result = JSON.parse(this.result);
            console.log(result);
            //返回登入成功信息
            if (result.S2C_Login) {
                var loginInfo = result.S2C_Login
                state.loginInfo = loginInfo
                var timestamp = (new Date()).getTime();
                loginInfo.ActivityEndTime*1000-timestamp>0?state.start=0:state.start=2
            }
            if (result.S2C_Heartbeat) {
                sendJSONObject({C2S_Heartbeat: {}});
            }
        }
    };
    // 断开连接
    ws.onclose = function (e) {
        console.log("断开了")
    };
}
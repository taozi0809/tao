import md5 from 'js-md5';

export const YXB = {
    partnerKey: "youxibi_shenzhouxing_gc",
    secretkey: "EA6CD4B2ACB4AAFBBCE4716805DA8045",
    versionCode: 100,
    versionName: "1.0",
    lang: "ZH",
    // --------------------------------------------------------
    url : {
        coin : "http://api.core.chatlink.shenzhouxing.com",
        chat_link:'http://api.link.chatlink.shenzhouxing.com',//chat.link 注册
    },
    dataBase : {
        tableSet : new Map(),
        table : {
            obj : function() {
                return {
                    find : function(index) {
                        return this.data.get(index);
                    },
                    set : function(index, data) {
                        this.data.set(index, data);
                    },
                    data : new Map()
                }
            },
            create : function(tableName) {
                YXB.dataBase.tableSet.set(tableName, new YXB.dataBase.table.obj());
            },
            get : function(tableName) {
                var table = YXB.dataBase.tableSet.get(tableName);
                if (!table) {
                    table = new YXB.dataBase.table.obj();
                    YXB.dataBase.tableSet.set(tableName, table);
                }
                return table;
            }
        }
    },

    wsMessageIdSet : new Set(),
    websocket : function(action) {
        var websocket;
        if (action.url) {
            websocket = new WebSocket(action.url);
        } else {
            websocket = new WebSocket(YXB.url.ws);
        }
        websocket.onopen = function(evt) {
            var registObj = {
                userName : action.userName,
                token : action.token,
                notifyUrl : action.notifyUrl
            }
            websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.regist", registObj)));
            setInterval(function() {
                websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.ping", {})));
            }, 3000);
            if (action.open) {
                action.open(evt);
            }
        };
        websocket.onclose = function(evt) {
            action.close(evt)
        };
        websocket.onmessage = function(evt) {
            var jdata = JSON.parse(evt.data);
            if ("0" == jdata.code) {
                if (null != jdata.id) {
                    if (!YXB.wsMessageIdSet.has(jdata.id)) {
                        YXB.wsMessageIdSet.add(jdata.id);
                        if (YXB.wsMessageIdSet.size > 1000) {
                            YXB.wsMessageIdSet = new Set();
                        }
                        var checkObj = {
                            id : jdata.id
                        }
                        websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.message.check", checkObj)));
                        action.message(jdata.model, jdata.data);
                    }
                }
            } else {
                action.error(jdata.code);
            }
        };
        websocket.onerror = function(evt) {
            action.error(-100);
        };
        return {
            doSend : function(message) {
                console.log("send:" + message.method);
                websocket.send(JSON.stringify(message));
            }
        }
    }
}

YXB.getBaseCtoInfo = function getBaseCtoInfo(method, data) {

    let obj = {}
    if(data==undefined || data==null || data==""){
        obj = {
            device : "WEB",
            deviceId : "none",
            lang : YXB.lang,
            method : method,
            partnerKey : YXB.partnerKey,
            secretKey : YXB.secretkey,
            sendTime : new Date().getTime(),
            signType : "NORMAL",
            versionCode : YXB.versionCode,
            versionName : YXB.versionName
        }
    }else{
        obj = {
            device : "WEB",
            deviceId : "none",
            lang : YXB.lang,
            method : method,
            params : JSON.stringify(data),
            partnerKey : YXB.partnerKey,
            secretKey : YXB.secretkey,
            sendTime : new Date().getTime(),
            signType : "NORMAL",
            versionCode : YXB.versionCode,
            versionName : YXB.versionName
        }
    }
    var content = "";
    for ( var o in obj) {
        content = content + o + "=" +obj[o]+ "&";
    }

    obj.sign = md5(content.substring(0, content.length - 1));
    return obj;

}



import md5 from 'js-md5';
export const YXB = {
  partnerKey: "vidfish_web",
  secretkey: "B6A86F00BA36E75AEDB90C7E9B84ED13",

  versionCode: 100,
  versionName: "1.0",
  lang: "ZH",
  url : {

      // service:"http://192.168.1.211:7004",//本地
      // upload:'http://192.168.1.211:8002',
      // zf:'http://192.168.1.211:8001/client.do',
      //
      // service:'http://150.109.20.244:9003',//测试
      // upload:'http://150.109.20.244:9007',
      // zf:'http://150.109.20.244:9006/client.do',

      // service : "http://150.109.20.236:5007",//生产
      // upload:'https://150.109.20.236:5002',
      // zf:'http://150.109.20.236:5001/client.do'
      //
      service : "https://api.core.latest.user.vidfish.com",//生产
      upload:'https://api.core.latest.upload.vidfish.com',
      zf:'https://api.core.latest.pay.vidfish.com/client.do'
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

import {getLocalStore} from "../../storage";
let ip = getLocalStore('ip')
YXB.getBaseCtoInfo = function getBaseCtoInfo(method,data) {
        let obj = {}
        if(data==undefined || data==null || data==""){
            obj = {
                device : "WEB",
                deviceId :ip,
                lang : data.hasOwnProperty('lang')?data.lang:YXB.lang,
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
                deviceId :ip,
                lang : data.hasOwnProperty('lang')?data.lang:YXB.lang,
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
        content = content.slice(0,content.length-1)


        obj.sign = md5(content);
       return obj;
    }



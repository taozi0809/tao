//是否是微信
/*if (isWeiXin()) {*/
    var login = GetQueryString("login");

    //判断是否已经重定向过
    if (login) {
        console.log("主页");
    }
    else {
        var token = localStorage.getItem("token");

		 //检测是否附带了ShareAccount
        var ShareAccount = GetQueryString("ShareAccount");
        setCookie("ShareAccount", ShareAccount, 365);

        //检测是否附带了code
        var Code = GetQueryString("Code");
        setCookie("Code", Code, 365);
        //检测是否附带了赠送/索取信息
        var type = GetQueryString("type");
        var headimgurl = GetQueryString("headimgurl");
        var mjnum = GetQueryString("mjnum");
        var fromname = GetQueryString("fromname");
        setCookie("type", type, 365);
        setCookie("headimgurl", headimgurl, 365);
        setCookie("mjnum", mjnum, 365);
        setCookie("fromname", fromname, 365);
        //重定向页
        if (token == null || token == undefined || token == "") {
            //微信登入
            window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f3abe2bc1b39109&redirect_uri=http%3a%2f%2fh5game.shenzhouxing.com%2foauth2.php?ShareAccount=" + ShareAccount + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

        }
        else {
            //token登入
            console.log("token登入！" + token);
            var obj = {
                C2S_TokenLogin: {
                    Token: token
                }
            };
            obj = JSON.stringify(obj);
            //将obj 存入cookie
            setCookie("obj", obj, 365);

            // setCookie("mainIf","false",365);
        }
    }
/*}

else {
    window.location = "http://h5game.shenzhouxing.com/MahjongFamily/generalize.html"
}*/

//是否是微信
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true
    } else {
        return false
    }
}

//检测是否重定向
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}



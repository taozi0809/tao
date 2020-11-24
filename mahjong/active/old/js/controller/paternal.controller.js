var app = angular.module('mjapp', []);

//过滤麻将
app.filter('mjimgurl', function () {
    return function (item, $index) {
        if ($index >= 0 && $index <= 8) {
            if (item <= 0) {
                return "img/acr-27/" + ($index + 1) + "w-no.png";
            }
            else {
                return "img/acr-27/" + ($index + 1) + "w.png";
            }
        }
        else if ($index >= 9 && $index <= 17) {
            if (item <= 0) {
                return "img/acr-27/" + ($index - 8) + "t-no.png";
            }
            else {
                return "img/acr-27/" + ($index - 8) + "t.png";
            }
        }
        else {
            if (item <= 0) {
                return "img/acr-27/" + ($index - 17) + "s-no.png";
            }
            else {
                return "img/acr-27/" + ($index - 17) + "s.png";
            }
        }
    }
});
//过滤麻将数量
app.filter('mjnumber', function () {
    return function (item) {
        if (item <= 0) {
            return 0;
        } else {
            return item;
        }
    }
});
//过滤兑奖区
app.filter('areares', function () {
    return function (item) {
        if (item < 0) {
            return "img/majiangBox.png";
        } else {
            if (item >= 0 && item <= 8) {
                return "img/acr-27/" + (item + 1) + "w.png";
            }
            if (item >= 9 && item <= 17) {
                return "img/acr-27/" + (item - 8) + "t.png";
            }
            if (item >= 18 && item <= 26) {
                return "img/acr-27/" + (item - 17) + "s.png";
            }

        }
    }
});
//过滤排名
app.filter('mjrank', function () {
    return function (item) {
        if (item == 0) {
            return "暂无排名";
        }
        else {
            return "第" + item + "名";
        }
    }
});
//过滤器刷选兑换区麻将显示情况
app.filter('areaResW', function () { //可以注入依赖
    return function (item, $index) {
        if (item <= 0) {
            return "img/acr-27/" + ($index + 1) + "w-no.png";
        } else {
            return "img/acr-27/" + ($index + 1) + "w.png";
        }
    }
});
app.filter('areaResT', function () { //可以注入依赖
    return function (item, $index) {
        if (item <= 0) {
            return "img/acr-27/" + ($index + 1) + "t-no.png";
        } else {
            return "img/acr-27/" + ($index + 1) + "t.png";
        }
    }
});
app.filter('areaResS', function () { //可以注入依赖
    return function (item, $index) {
        if (item <= 0) {
            return "img/acr-27/" + ($index + 1) + "s-no.png";
        } else {
            return "img/acr-27/" + ($index + 1) + "s.png";
        }
    }
});
//过滤showmessagepage显示的文字
app.filter('filterShowPageTxt', function () {
    return function (way, fromname, card) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            mjnum = numtxt[card - 9] + "筒";
        }
        else {
            mjnum = numtxt[card - 18] + "条";
        }

        if (way == "give") {

            return "“" + fromname + "”赠送了一张“" + mjnum + "”给你，再接再厉吧！";

        }
        else {
            return "“" + fromname + "”向你跪求一张“" + mjnum + "”，行行好吧！";
        }
    }
});
//过滤赠送显示的麻将
app.filter('filterShowMessage', function () {
    return function (item) {
        if (item >= 0 && item <= 8) {
            return "img/giveOrask/" + (item + 1) + "w.png";
        }
        else if (item >= 9 && item <= 17) {
            return "img/giveOrask/" + (item - 8) + "t.png";
        }
        else {
            return "img/giveOrask/" + (item - 17) + "s.png";
        }


    }
});
//过滤赠送显示的文字
app.filter('filterShowTxt', function () {
    return function (way, use, fromname, toname, card) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            mjnum = numtxt[card - 9] + "筒";
        }
        else {
            mjnum = numtxt[card - 18] + "条";
        }


        if (use) {
            if (way == "give") {

                return "你已领取“" + fromname + "”赠送给你的一张“" + mjnum + "”，再接再厉吧！";

            }
            else if (way == "ask"){
                return "赠送成功！";
            }
			else{
				return "对方分享失败！";
			}

        }
        else {
            if (way == "scangive") {
                return "不能领取自己分享的麻将哦！"
            }
            else if (way == "scanask") {
                return "不能向自己索取麻将哦！";
            }
            else if (way == "give") {
                return "“" + fromname + "”赠送了一张“" + mjnum + "”，已被别人领取！";
            }
            else if (way == "ask"){
                if (toname == "") {
                    return "赠送失败，你没有这张麻将！";
                }
                else {
                    return "赠送失败，已被别人赠送！";
                }

            }
			else{
				return "对方分享失败！";
			}
        }


    }
});
//过滤背景
app.filter('filterPopBg', function () {
    return function (way) {
        if (way == "scangive") {
            return "showmessage-bg";
        }
        else if (way == "scanask") {
            return "showmessage-bg showmessage-bg-ask";
        }
        else if (way == "give") {
            return "showmessage-bg";
        }
        else {
            return "showmessage-bg showmessage-bg-ask";
        }
    }
})
//过滤按钮
app.filter('filterBtn', function () {
    return function (way) {
        if (way == "give") {
            return "img/putin.png";
        }
        else {
            return "img/sendOrget/send-btn.png";
        }
    }
})
//过滤器-时间
app.filter('filterData', function () {
    return function (time) {
        function formatDateTime(timeStamp) {
            var date = new Date();
            date.setTime(timeStamp * 1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        };
        return formatDateTime(time)
    }
})
//过滤赠送列表信息
app.filter('filterGiveList', function () {
    return function (card, fromname) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            mjnum = numtxt[card - 9] + "筒";
        }
        else {
            mjnum = numtxt[card - 18] + "条";
        }

        if (fromname) {
            return fromname + "赠送给你的一个“" + mjnum + "”";
        }
        else {
            return "我向好友赠送了一个“" + mjnum + "”";
        }

    }
})
//过滤索取列表信息
app.filter('filterAskList', function () {
    return function (card, use, toname) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            mjnum = numtxt[card - 9] + "筒";
        }
        else {
            mjnum = numtxt[card - 18] + "条";
        }

        if (use) {
            return "我向" + toname + "索取一张“" + mjnum + "”";
        }
        else {
            return "我向好友索取一张“" + mjnum + "”";
        }

    }
})
//过滤索取列表信息
app.filter('filterAskMeList', function () {
    return function (card, fromname) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            mjnum = numtxt[card - 9] + "筒";
        }
        else {
            mjnum = numtxt[card - 18] + "条";
        }

        return fromname + "向你索取了一个“" + mjnum + "”";

    }
})
//过滤是否获得
app.filter('filterIsGet', function () {
    return function (use) {
        if (use) {
            return "已获得";
        }
        else {
            return "未响应";
        }

    }
})
//过滤是否获得颜色
app.filter('filterIsGetColor', function () {
    return function (use) {
        if (use) {
            return "ask-stateYes";
        }
        else {
            return "ask-state";
        }

    }
})
//过滤排名中麻将数量
app.filter('recopymjnumber', function () {
    return function (item) {
        if (item <= 0) {
            return 0;
        } else {
            return "x" + item;
        }
    }
});


//初始化localStroge对象
var localstorage = window.localStorage;

//初始化sessionStroge对象
var sessionstorage = window.sessionStorage;

//初始化轮播消息数组
var jsonArrBroad = [];

app.controller('paternalCtrl', ['$scope', function ($scope) {


//初始化showmessage隐藏显示
    $scope.showmessagedata = {show: false};
//初始化showmessagepage隐藏显示
    $scope.showmessagepage = {showmesagepageIf: false};
//showmessage
    $scope.showmessage = {showmesageIf: false};

    //初始化索取数组
    $scope.getmjarr = {
        wnum: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        tnum: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        snum: [1, 1, 1, 1, 1, 1, 1, 1, 1]

    };

//初始化各个模块的状态

    if (localStorage.getItem("mainIf") == "false") {
        $scope.main = {mainIf: false}
        $scope.home = {homeIf: true}
        $scope.showmessage.showmessageIf = $scope.showmessagedata.show;
    }
    else {
        $scope.main = {mainIf: true}
        $scope.home = {homeIf: false};
    }

    $scope.activity = {activity: false};
// part
    $scope.part = {partIf: false};
    $scope.partOption = {partOptionIf: false};
    $scope.partSucc = {partSuccIf: false};
// bronze
    $scope.bronze = {bronzeIf: false};
    $scope.bronzeOption = {bronzeOptionIf: false};
    $scope.bronzeSucc = {bronzeSuccIf: false};
// silver
    $scope.silver = {silverIf: false};
    $scope.silverOption = {silverOptionIf: false};
    $scope.silverSucc = {silverSuccIf: false};
// gold
    $scope.gold = {goldIf: false};
    $scope.goldOption = {goldOptionIf: false};
    $scope.goldSucc = {goldSuccIf: false};
// gold
    $scope.special = {specialIf: false};
    $scope.specialOption = {specialOptionIf: false};
    $scope.specialSucc = {specialSuccIf: false};
//nodrow
    $scope.nodrow = {nodrowIf: false};
//getmj
    $scope.getmj = {getmjIf: false};
// recopyrank
    $scope.recopyrank = {recopyIf: false};
//sendten
    $scope.sendten = {sendtenIf: false};
//sendtube
    $scope.sendtube = {sendtubeIf: false};
//sendstrip
    $scope.sendstrip = {sendstripIf: false};
//showshare
    $scope.showshare = {showshareIf: false};
//getten
    $scope.getten = {gettenIf: false};
// gettube
    $scope.gettube = {gettubeIf: false};
// getstrip
    $scope.getstrip = {getstripIf: false};

//askactive
    $scope.askActive = {askActiveIf: false};
//ask
    $scope.ask = {askIf: false};
//giveactive
    $scope.giveActive = {giveActiveIf: false};
//give
    $scope.give = {giveIf: false};
//loading
    $scope.loading = {loadingIf: false};

//stopMake
	$scope.stopMake={stopMakeIf:false}

//download
	$scope.download={downloadIf:false}

//download-shade
$scope.shade={shadeIf:false}

//初始化发送兑换奖项的麻将数组
    $scope.postmj = {
        getpart: sendInit(10),
        getbronze: sendInit(14),
        getsilver: sendInit(9),
        getgold: sendInit(18),
        getspecial: sendInit(27),
    }

    function sendInit(e) {
        var arr = [];
        for (var i = 0; i < e; i++) {
            arr.push(-1);
        }
        return arr;
    }

//选中麻将待发送兑奖
    $scope.putIn = {
        putInPost: function (item, $index, arr) {
            if (item <= 0) {
                return;
            }
            else {
                if (isFull(arr).length == 0) {
                    return;
                }
                else {
                    $scope.mjdata.mjlist[$index] = $scope.mjdata.mjlist[$index] - 1;
                    arr[isFull(arr)[0]] = $index;
                }
            }

        }
    };

//撤销选中的麻将
    $scope.putOut = {
        putOutPost: function (item, $index, arr) {
            if (item == -1) {
                return;
            }
            else {
                $scope.mjdata.mjlist[item] = $scope.mjdata.mjlist[item] + 1;
                arr[$index] = -1;
            }
        }
    }

//确认发送
    $scope.postMjPrize = function (arr) {
        var nowTime = new Date().getTime();
        var clickTime = $(this).attr("ctime");
        if (clickTime != 'undefined' && (nowTime - clickTime < 2000)) {

            return false;
        } else {
            $(this).attr("ctime", nowTime);
            if (isFull(arr) == 0) {
                getPrize(arr)
            }
            else {
                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换失败，集齐后再试!");
            }
        }
    };

//特等奖
    $scope.postMjSpecial = {
        post: function (arr) {
            if (isFull(sendSpecial(arr)) == 0) {
                getPrize(sendSpecial(arr))
            }
            else {
                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换失败，集齐后再试!");

            }

        }
    };

//确认发送的special数组
    function sendSpecial(arr) {
        var postdata = [];
        for (var i = 0; i < 27; i++) {
            if (arr[i] > 0) {
                postdata.push(i);
            }
            else {
                postdata.push(-1);
            }
        }
        return postdata;
    }

//判断兑奖区是否全部有麻将
    function isFull(arr) {
        var isEmpty = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == -1) {
                isEmpty.push(i);
            }
        }
        return isEmpty;
    }

//发送选中的牌
    function getPrize(arr) {
        var obj = {
            C2S_GetPrize: {
                Cards: arr
            }
        };
        console.log("发送的数组：" + arr)
        sendJSONObject(obj);
    }

//用户的兑换码
    $scope.todayData = {code: ""};

    $scope.getTodayCode = function () {
        var nowTime = new Date().getTime();
        var clickTime = $(this).attr("ctime");
        if (clickTime != 'undefined' && (nowTime - clickTime < 2000)) {

            return false;
        } else {
            $(this).attr("ctime", nowTime);
            if ($scope.todayData.code.length > 0 && $scope.todayData.code.length < 5) {

                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换码不正确，请重新输入!");
            }
            else if ($scope.todayData.code.length == 5) {
                getUserCode();
            }
            else {
                $('.err').fadeIn().delay(1000).fadeOut().children().html("请输入兑换码!");
            }
        }
    };

//每天取牌兑换
    function getUserCode() {
        console.log($scope.todayData.code)
        var obj = {
            C2S_GetCardCode: {
                Code: $scope.todayData.code
            }
        };
        sendJSONObject(obj);
    }


//取出cookie
    function getCookie(name) {
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

//删除cookie
    function clearCookie(name) {
        setCookie(name, "", -1);
    }


//获取用户登入信息
    var obj = JSON.parse(getCookie('obj'));

    //建立连接
    var ws = new WebSocket('ws://139.199.221.33:3750');

    //登入
    ws.onopen = function () {
        console.log(obj)
        sendJSONObject(obj);
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
            result = JSON.parse(this.result);
            console.log(result);
            //返回登入成功信息
            if (result.S2C_Login) {
			
                $scope.headimg = {Headimgurl: result.S2C_Login.Headimgurl};
                $scope.nickname = {Nickname: result.S2C_Login.Nickname};
                $scope.accountid = {AccountID: result.S2C_Login.AccountID};
                $scope.mjdata = {mjlist: result.S2C_Login.Num};
                $scope.addnumberdata = {CollectTimes: result.S2C_Login.CollectTimes}
				$scope.DayCollectTimes = {DayCollectTimes:result.S2C_Login.DayCollectTimes}
				
                $scope.prize = {
                    topP: result.S2C_Login.TopPrize,
                    topF: result.S2C_Login.FirstPrize,
                    topS: result.S2C_Login.SecondPrize,
                    topT: result.S2C_Login.ThirdPrize,
                    topL: result.S2C_Login.LastPrize
                }

                $scope.recopyrank = {
                    rank: result.S2C_Login.RankShow,
                    userrank: result.S2C_Login.UserRank,
                    ranknum: "x" + result.S2C_Login.UserRankSum
                }
                $scope.rankslice = {ranklist: $scope.recopyrank.rank.slice(3, 10)};

                $scope.mjnumslice = {
                    wnum: splitMjNum(result.S2C_Login.Num, 0),
                    tnum: splitMjNum(result.S2C_Login.Num, 1),
                    snum: splitMjNum(result.S2C_Login.Num, 2)
                };
					codeshareing($scope.accountid.AccountID);

                //登入成功在localstorage中存入token
                localStorage.setItem("token", result.S2C_Login.Token);

                localStorage.setItem("mainIf", "false");

                //登入成功取出Code
                $scope.Code = {usecode: getCookie("Code")};

                //登入成功取出赠送/所求信息
                var typeShare = getCookie("type");
                var headimgurlShare = getCookie("headimgurl");
                var mjnumShare = parseInt(getCookie("mjnum"));
                var fromnameShare = decodeURI(getCookie("fromname"));

                if (typeShare == "give") {
                    //发送code到后台换取赠送牌的信息				
                    UseCode();
                }
                if (typeShare == "ask") {
                    $scope.showmessagepagedata = {
                        card: mjnumShare,
                        fromname: fromnameShare,
                        headimgurl: headimgurlShare,
                        way: typeShare,
                        show: true
                    }
                    if ($scope.main.mainIf) {

                    }
                    else {
                        $scope.showmessagepage.showmessagepageIf = $scope.showmessagepagedata.show;
                        $scope.$apply();
                    }
                    $scope.showmessagepage.showmessagepageIf = true;
                }
				
                $scope.$apply();

				var ts = Math.round(new Date().getTime()/1000).toString();
				if(ts >= 1509638400){
			     //if(ts >= 1509503620){
					$scope.home = {homeIf:false}
					$scope.download={downloadIf:true}
					$scope.$apply();
				}
            }
            //返回登入失败
            if (result.S2C_Close) {
                //微信登入
                localStorage.removeItem("token");
                alert("登入失败，请重新登入！")

            }


            //返回奖项兑换成功信息
            if (result.S2C_GetPrizeSuccess) {
                $scope.mjdata = {mjlist: result.S2C_GetPrizeSuccess.Cards};

                $scope.prize = {
                    topP: result.S2C_GetPrizeSuccess.TopPrize,
                    topF: result.S2C_GetPrizeSuccess.FirstPrize,
                    topS: result.S2C_GetPrizeSuccess.SeconddPrize,
                    topT: result.S2C_GetPrizeSuccess.ThirdPrize,
                    topL: result.S2C_GetPrizeSuccess.LastPrize,
                }

                $scope.code = {PrizeCode: result.S2C_GetPrizeSuccess.PrizeCode};

                if (result.S2C_GetPrizeSuccess.Prize == "LastPrize") {

                    //弹出兑奖成功页面
                    $scope.partOption.partOptionIf = false;
                    $scope.partSucc.partSuccIf = true;
                    //清空兑奖区
                    $scope.postmj.getpart = sendInit(10);
                    $scope.$apply();
                }

                if (result.S2C_GetPrizeSuccess.Prize == "ThirdPrize") {
                    //弹出兑奖成功页面
                    $scope.bronzeOption.bronzeOptionIf = false;
                    $scope.bronzeSucc.bronzeSuccIf = true;
                    //清空兑奖区
                    $scope.postmj.getbronze = sendInit(14);
                    $scope.$apply();
                }

                if (result.S2C_GetPrizeSuccess.Prize == "SecondPrize") {
                    //弹出兑奖成功页面
                    $scope.silverOption.silverOptionIf = false;
                    $scope.silverSucc.silverSuccIf = true;
                    //清空兑奖区
                    $scope.postmj.getsilver = sendInit(9);
                    $scope.$apply();
                }

                if (result.S2C_GetPrizeSuccess.Prize == "FirstPrize") {
                    //弹出兑奖成功页面
                    $scope.goldOption.goldOptionIf = false;
                    $scope.goldSucc.goldSuccIf = true;
                    //清空兑奖区
                    $scope.postmj.getgold = sendInit(18);
                    $scope.$apply();
                }

                if (result.S2C_GetPrizeSuccess.Prize == "TopPrize") {
                    //弹出兑奖成功页面
                    $scope.specialOption.specialOptionIf = false;
                    $scope.specialSucc.specialSuccIf = true;
                    $scope.$apply();
                }

            }

            //返回兑换失败信息
            if (result.S2C_GetPrizeFail) {
                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换失败，集齐后再试!");
            }

            //返回成功获取一张麻将信息
            if (result.S2C_CollectCardSuccess) {
                $scope.mjdata = {mjlist: result.S2C_CollectCardSuccess.Cards};
                $scope.addnumberdata = {CollectTimes: result.S2C_CollectCardSuccess.CollectTimes};
                $scope.card = {Card: result.S2C_CollectCardSuccess.Card};
				$scope.DayCollectTimes = {DayCollectTimes:result.S2C_CollectCardSuccess.DayCollectTimes}
                $scope.mjnumslice = {
                    wnum: splitMjNum(result.S2C_CollectCardSuccess.Cards, 0),
                    tnum: splitMjNum(result.S2C_CollectCardSuccess.Cards, 1),
                    snum: splitMjNum(result.S2C_CollectCardSuccess.Cards, 2)
                };
            }

            //所有用户返回兑奖成功信息
            if (result.S2C_PrizeBroadcast) {
                /*滚动消息*/
                jsonArrBroad.push(result.S2C_PrizeBroadcast);
                var broadcastStr = JSON.stringify(jsonArrBroad);
                localstorage.setItem("broadcast", broadcastStr);
                jsonArrBroad = [];
                brodAnimate();

                //兑奖信息动画
                function brodAnimate() {
                    //取出sessionStorage存的用户所有的兑奖记录
                    var getBrod = localstorage.getItem("broadcast");
                    var bordCastData = JSON.parse(getBrod);

                    if (bordCastData.length >= 1) {
                        var prize = "";
                        switch (bordCastData[0].Prize) {
                            case "LastPrize":
                                prize = "参与奖";
                                break;
                            case "ThirdPrize":
                                prize = "铜牌奖";
                                break;
                            case "SecondPrize":
                                prize = "银牌奖";
                                break;
                            case 'FirstPrize':
                                prize = "金牌奖";
                                break;
                            case "TopPrize":
                                prize = "特等奖";
                                break;
                        }

                        $('.ad-text-pos').text(bordCastData[0].Name + "成功兑换了" + prize + "！").css('margin-left', '60vw');
                        $('.ad-text-pos').animate({'margin-left': '-60vw'}, 8000, function () {

                            var newbroad = bordCastData.shift();

                            //更新session的存的数据
                            var newbroadcastStr = JSON.stringify(newbroad);
                            localstorage.setItem("broadcast", newbroadcastStr);
                            brodAnimate();

                        });

                    } else {
                        return;
                    }
                }


            }

            //返回兑换码兑换成功
            if (result.S2C_AddCollectTimesSuccess) {
                $scope.addnumberdata = {CollectTimes: $scope.addnumberdata.CollectTimes + 1};
                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换成功!");
                $scope.todayData = {code: ""};
                $scope.$apply();
            }
            //返回兑换码对话失败
            if (result.S2C_AddCollectTimesFail) {
                $('.err').fadeIn().delay(1000).fadeOut().children().html("兑换失败，请重新输入!");

            }

            //赠送--获得code成功
            if (result.S2C_GiveCardSuccess) {
                $scope.savecard = {card: result.S2C_GiveCardSuccess.Card};
                $scope.savecode = {code: result.S2C_GiveCardSuccess.Code};
                $scope.saveheadimgurl = {fordheadimg: result.S2C_GiveCardSuccess.FromHeadImg};
                $scope.savefromname = {fromname: result.S2C_GiveCardSuccess.FromName};
                $scope.saveway = {way: result.S2C_GiveCardSuccess.Way};
				
                var urllink = "http://h5game.shenzhouxing.com/MahjongFamily/index.php?Code=" + result.S2C_GiveCardSuccess.Code + "&headimgurl=" + $scope.headimg.Headimgurl + "&fromname=" + $scope.nickname.Nickname + "&ShareAccount="+$scope.accountid.AccountID;
                $scope.share = {url: encodeURI(urllink)};
			 $scope.$apply();
            }
            //索取--获得code成功
            if (result.S2C_AskCardSuccess) {
                $scope.savecard = {card: result.S2C_AskCardSuccess.Card};
                $scope.savecode = {code: result.S2C_AskCardSuccess.Code};
                $scope.saveheadimgurl = {fordheadimg: result.S2C_AskCardSuccess.FromHeadImg};
                $scope.savefromname = {fromname: result.S2C_AskCardSuccess.FromName};
                $scope.saveway = {way: result.S2C_AskCardSuccess.Way};
					
                var urllink = "http://h5game.shenzhouxing.com/MahjongFamily/index.php?Code=" + $scope.savecode.code + "&headimgurl=" + $scope.headimg.Headimgurl + "&fromname=" + $scope.nickname.Nickname + "&ShareAccount="+$scope.accountid.AccountID;
                $scope.share = {url: encodeURI(urllink)};
				console.log($scope.share.url)
				 $scope.$apply();	
            }

            //赠送--发送code成功
            if (result.S2C_SaveUserCodeSuccess) {

                $scope.mjdata = {mjlist: result.S2C_SaveUserCodeSuccess.Cards};
                $scope.mjnumslice = {
                    wnum: splitMjNum(result.S2C_SaveUserCodeSuccess.Cards, 0),
                    tnum: splitMjNum(result.S2C_SaveUserCodeSuccess.Cards, 1),
                    snum: splitMjNum(result.S2C_SaveUserCodeSuccess.Cards, 2)
                };
                $scope.$apply();
            }
            //赠送--发送code失败
            if (result.S2C_SaveUserCodeFail) {
                clearBox();
                clearTxtnew();
                hideshare();
                angular.element('.err').fadeIn().delay(1000).fadeOut().children().html("分享失败!");
            }


            //赠送--返回Code成功兑换麻将信息
            if (result.S2C_UseCodeSuccess) {

                $scope.mjdata = {mjlist: result.S2C_UseCodeSuccess.Cards};
                $scope.showmessagedata = {
                    card: result.S2C_UseCodeSuccess.Card,
                    cards: result.S2C_UseCodeSuccess.Cards,
                    fromname: result.S2C_UseCodeSuccess.FromName,
                    toname: result.S2C_UseCodeSuccess.ToName,
                    headimgurl: result.S2C_UseCodeSuccess.FromHeadImg,
                    use: true,
                    way: result.S2C_UseCodeSuccess.Way,
                    show: true
                }
					console.log(result.S2C_UseCodeSuccess.Card)
                if ($scope.main.mainIf) {
                    console.log($scope.main.mainIf)
                }
                else {
                    $scope.showmessage.showmessageIf = $scope.showmessagedata.show;
                    $scope.$apply();
                }

            }

            //赠送--返回Code兑换麻将失败信息
            if (result.S2C_UseCodeFail) {
                /*clearCookie("Code");*/

                $scope.showmessagedata = {
                    card: result.S2C_UseCodeFail.Card,
                    cards: result.S2C_UseCodeFail.Cards,
                    fromname: result.S2C_UseCodeFail.FromName,
                    toname: result.S2C_UseCodeFail.ToName,
                    headimgurl: result.S2C_UseCodeFail.FromHeadImg,
                    use: false,
                    way: result.S2C_UseCodeFail.Way,
                    show: true
                }

                if ($scope.main.mainIf) {

                }
                else {
                    $scope.showmessage.showmessageIf = $scope.showmessagedata.show;
                    $scope.$apply();
                }

            }


            //返回赠送列表
            if (result.S2C_GiveList) {
                $scope.givelistdata = {
                    GiveMeList: result.S2C_GiveList.GiveMeList,
                    IGiveList: result.S2C_GiveList.IGiveList
                }
                $scope.$apply();
            }
            //返回索取列表
            if (result.S2C_AskList) {
                $scope.asklistdata = {
                    AskMeList: result.S2C_AskList.AskMeList,
                    IAskList: result.S2C_AskList.IAskList
                }
                $scope.$apply();
            }


            else {
                if (result.S2C_Heartbeat) {
                    sendJSONObject({C2S_Heartbeat: {}});
                }
            }
        }
    };

    // 断开连接
    ws.onclose = function (e) {
        console.log("断开了")
    };


//麻将数量显示或隐藏
    $scope.ishide = function (item) {
        if (item <= 0) {
            return false;
        }
        else {
            return true;
        }
    }

// 切割数组
    function splitMjNum(arr, index) {
        return sliceArr(arr, 9)[index];
    }

//切割数组
    function sliceArr(array, size) {
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        return result;
    }

    var sendNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

//选中赠送或索取麻将
    $scope.sendorget = function (index, item, way, type) {
        if (item <= 0) {
            $scope.sendTxtnew = "请先获取此张麻将！";
            return;
        }
        else {
            $('.item-list:eq(' + index + ')').css({
                'border': '3px solid #fff100',
                'box-shadow': '0px 0px 30px 2px #fff100'
            }).siblings().css({
                'border': '3px solid rgba(0,0,0,0)',
                'box-shadow': '0px 0px 30px 2px rgba(0,0,0,0)'
            });

        }
        $scope.sendNumTen = sendNum[index];

        if (way == "send") {
            $scope.isway = {way: "赠送"};
            if (type == "w") {
                $scope.sendTxtnew = "你准备赠送一张“" + $scope.sendNumTen + "万”给好友";
                $scope.sogcard = {card: index};
            }
            else if (type == "t") {
                $scope.sendTxtnew = "你准备赠送一张“" + $scope.sendNumTen + "筒”给好友";
                $scope.sogcard = {card: (index + 9)}
            }
            else {
                $scope.sendTxtnew = "你准备赠送一张“" + $scope.sendNumTen + "条”给好友";
                $scope.sogcard = {card: (index + 18)}
            }

        }
        else {
            $scope.isway = {way: "索取"};
            if (type == "w") {
                $scope.gettext = "你准备索取一张“" + $scope.sendNumTen + "万”";
                $scope.sogcard = {card: index}
            }
            else if (type == "t") {
                $scope.gettext = "你准备索取一张“" + $scope.sendNumTen + "筒”";
                $scope.sogcard = {card: (index + 9)}
            }
            else {
                $scope.gettext = "你准备索取一张“" + $scope.sendNumTen + "条”";
                $scope.sogcard = {card: (index + 18)}
            }

        }
    }

    $scope.showShareSend = function (type) {
		$scope.share = false;
        var nowTime = new Date().getTime();
        var clickTime = $(this).attr("ctime");
        if (clickTime != 'undefined' && (nowTime - clickTime < 1000)) {

            return false;
        } else {
            $(this).attr("ctime", nowTime);
            try {
                // 可能出现异常的代码
                if ($scope.sogcard.card >= 0) {
                    if (type == "send") {
                        $scope.showshare.showshareIf = true;
                        $scope.mjdata.mjlist[$scope.sogcard.card] = $scope.mjdata.mjlist[$scope.sogcard.card] + 1;
                        $scope.type = {way: "give"};
                        GiveCard();
                    }
                    else {
                        $scope.showshare.showshareIf = true;
                        $scope.type = {way: "ask"};
                        AskCard();
                    }
                    var newcard = $scope.sogcard.card;
                    var mjurl = isMjImg(newcard);
					
                    function CircleCallBack() {			
                        if ($scope.share) {
							console.log($scope.share)
                            clearInterval(timer)
                            wx.ready(function () {
                                //分享到朋友							
                                wx.onMenuShareAppMessage({
                                    title: $scope.nickname.Nickname + "向你" + $scope.isway.way + "一张" + filterCard(newcard), // 分享标题
                                    desc: '麻将全家福', // 分享描述
                                    link:$scope.share.url + "&type=" + $scope.type.way + "&mjnum=" + newcard,// 分享链接
                                    imgUrl: mjurl, // 分享图标
                                    type: '', // 分享类型,music、video或link，不填默认为link
                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        clearBox();
                                        hideshare();
                                        clearTxtnew();
                                        SaveUserCode();
										$scope.share = false;
										
									
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                        clearBox();
                                        clearTxtnew();
                                        hideshare();
										$scope.share = false;
										
                                    }
                                });

                                //分享到朋友圈
                                wx.onMenuShareTimeline({
                                    title: $scope.nickname.Nickname + "向你" + $scope.isway.way + "一张" + filterCard(newcard), // 分享标题
                                    link: $scope.share.url + "&type=" + $scope.type.way + "&mjnum=" + newcard, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: mjurl, // 分享图标
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        clearBox();
                                        hideshare();
                                        clearTxtnew();
                                        SaveUserCode();
										$scope.share = false;
										
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                        clearBox();
                                        clearTxtnew();
                                        hideshare();
										$scope.share = false; 
										
                                    }
                                });
                            });
                        }
                        else {
                            timer = setInterval(function () {
                                CircleCallBack();
                            }, 100)
                        }
                    }
                    CircleCallBack();
					
                }
                else {
                    //没有选麻将
                    angular.element('.err').fadeIn().delay(1000).fadeOut().children().html("请先选择麻将!");
                }

            } catch (e) {
                // 出现异常以后执行的代码
                // e:exception，用来捕获异常的信息
            }
        }

		
    }


//点击隐藏分享提示
    $scope.hideshare = function () {

        $scope.showshare.showshareIf = false;
    }

//点击隐藏分享提示
    function hideshare() {
        $scope.showshare = {showshareIf: false};
    }


//跳转到askactive
    $scope.goAskactive = function () {
        askList();
        $scope.askActive.askActiveIf = true;
        $scope.getten.gettenIf = false;
        $scope.gettube.gettubeIf = false;
        $scope.getstrip.getstripIf = false;
    }

    //askactive返回上级
    $scope.askBack = function () {
        $scope.askActive.askActiveIf = false;
        $scope.ask.askIf = false;
        $scope.sendten.sendtenIf = true;
    };
    //askactive返回
    $scope.backAskactive = function () {
        $scope.askActive.askActiveIf = true;
        $scope.ask.askIf = false;
    }
    //关闭askactive
    $scope.closeAskactive = function () {
        $scope.askActive.askActiveIf = false;
    };
    //goask
    $scope.goAsk = function () {
        $scope.ask.askIf = true;
        $scope.askActive.askActiveIf = false;

    }
    //关闭sak
    $scope.closeAsk = function () {
        $scope.ask.askIf = false;
    }


    //跳转到giveactive
    $scope.goGiveactive = function () {
        giveList();
        $scope.giveActive.giveActiveIf = true;
        $scope.sendten.sendtenIf = false;
        $scope.sendtube.sendtubeIf = false;
        $scope.sendstrip.sendstripIf = false;
    };
    //giveactive返回
    $scope.giveBack = function () {
        $scope.giveActive.giveActiveIf = false;
        $scope.give.giveIf = false;
        $scope.sendten.sendtenIf = true;
    }
    //gogive
    $scope.goGive = function () {
        $scope.give.giveIf = true;
        $scope.giveActive.giveActiveIf = false;

    }
    //关闭giveactive
    $scope.closeGiveactive = function () {
        $scope.giveActive.giveActiveIf = false;
        $scope.give.giveIf = false;
    }
    $scope.backGiveactive = function () {
        $scope.giveActive.giveActiveIf = true;
        $scope.give.giveIf = false;
    }


$scope.closeStopMake = function(){
	$scope.stopMake.stopMakeIf = false;
}

$scope.goDownload = function(e){
	stopDefault(e);
   $scope.shade.shadeIf = true;
}

//赠送请求
    function GiveCard() {
        console.log($scope.sogcard.card)
        var obj = {
            C2S_GiveCard: {
                Card: $scope.sogcard.card
            }
        };
        sendJSONObject(obj);
    }

// 索取请求
    function AskCard() {
        console.log($scope.sogcard.card)
        var obj = {
            C2S_AskCard: {
                Card: $scope.sogcard.card
            }
        };
        sendJSONObject(obj);
    }

//请求code换取赠送/索取是否成功
    function UseCode() {
        console.log($scope.Code.usecode)
        if ($scope.Code.usecode == "" || $scope.Code.usecode == null || $scope.Code.usecode == undefined) {
            return;
        }
        else {
            var obj = {
                C2S_UseCode: {
                    Code: $scope.Code.usecode
                }
            }
        }
        sendJSONObject(obj);
    }

//请求--分享成功后给后台发送code

    function SaveUserCode() {
        console.log($scope.savecode.code)
        var obj = {
            C2S_SaveUserCode: {
                Code: $scope.savecode.code
            }
        }
        sendJSONObject(obj);
    }


//请求--赠送列表
    function giveList() {
        console.log("givelist")
        var obj = {
            C2S_GiveList: {}
        }
        sendJSONObject(obj);

    }

    //请求--索取列表
    function askList() {
        var obj = {
            C2S_AskList: {}
        }
        sendJSONObject(obj);

    }


//清除赠送文字信息
    clearTxtnew = function () {
        $scope.sendTxtnew = "";
        $scope.sogcard = {card: -1};
    }
//清除索取文字信息
    clearGetTxt = function () {
        $scope.gettext = "";
        $scope.sogcard = {card: -1};
    }

//清除active高亮框
    clearBox = function () {
        $('.item-list').css({
            'border': '3px solid rgba(0,0,0,0)',
            'box-shadow': '0px 0px 30px 2px rgba(0,0,0,0)'
        });
    }


//过滤麻将名字
    function filterCard(card) {
        var numtxt = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var mjnum = "";
        if (card >= 0 && card <= 8) {
            return mjnum = numtxt[card] + "万";
        }
        else if (card >= 9 && card <= 17) {
            return mjnum = numtxt[card - 9] + "筒";
        }
        else {
            return mjnum = numtxt[card - 18] + "条";
        }
    }

//过滤麻将显示图片

    function isMjImg(n) {
			console.log(n)
        if (n >= 0 && n <= 8) {
            return "http://h5game.shenzhouxing.com/MahjongFamily/img/giveOrask/" + (n + 1) + "w.png";
        }
        else if (n >= 9 && n <= 17) {
            return "http://h5game.shenzhouxing.com/MahjongFamily/img/giveOrask/" + (n - 8) + "t.png";
        }
        else if(n >= 18 && n <= 26) {
            return "http://h5game.shenzhouxing.com/MahjongFamily/img/giveOrask/" + (n - 17) + "s.png";
        }
		else{
			return "http://h5game.shenzhouxing.com/MahjongFamily/img/game-start.jpg";
		}

    }

}]);
 
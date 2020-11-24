<?php
require_once "jssdk.php";
error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

$jssdk = new JSSDK("wx9f3abe2bc1b39109", "c0344560b7b75315cf3789090bbbee00");
$signPackage = $jssdk->GetSignPackage();

/*$title = '麻将全家福';
$link = $_COOKIE["link"];
$imgUrl = 'http://h5game.shenzhouxing.com/MahjongFamily/img/game-start.jpg';*/
?>
<!doctype html>
<html ng-app="mjapp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/mjapp.css">
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>

    <script src="js/jweixin-1.2.0.js"></script>
    <script>
        wx.config({
            debug: false,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: '<?php echo $signPackage["timestamp"];?>',
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage"
            ]
        });

	codeshareing = function(e){
		console.log(e)
		wx.ready(function () {

		// 2. 分享接口
		// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口   
			wx.onMenuShareAppMessage({
				title: '麻将全家福',
				desc: '收集麻将，兑换豪礼，还送银滩旅游！！！',
				link:"http://h5game.shenzhouxing.com/MahjongFamily?ShareAccount="+e,
				imgUrl: 'http://h5game.shenzhouxing.com/MahjongFamily/img/sharehome.jpg',
				
				success: function (res) {
					alert('已分享');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});		
		// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		
			wx.onMenuShareTimeline({
				title: '麻将全家福',
				link:"http://h5game.shenzhouxing.com/MahjongFamily?ShareAccount="+e,
				imgUrl: 'http://h5game.shenzhouxing.com/MahjongFamily/img/sharehome.jpg',
			   
				success: function (res) {
					alert('已分享');
				},
				cancel: function (res) {
					alert('已取消');
				},
				fail: function (res) {
					alert(JSON.stringify(res));
				}
			});
    
   
		})
	}		
	
    </script>
    <script src="js/login.js"></script>
    <title>麻将全家福</title>
</head>
<body>
<div class="paternal" ng-controller="paternalCtrl">
    <!--game starat-->
    <div class="main" ng-if="main.mainIf" ng-click="start()" ng-controller="mainCtrl"></div>
	<!--download-->
	<div class="mdownload" ng-if="download.downloadIf">
		<div class="download-bg">
			<img src="img/download.png" alt="" class="mdownload-content"/>
			 <a href="https://www.shenzhouxing.com/hnzz/dl/">
				<img src="img/download-btn.png" alt="" class="mdownload-btn" />
			 </a>
		</div>		
	</div>
    <!--home-->
    <div class="home" ng-if="home.homeIf" ng-controller="homeCtrl">

        <div class="header">
            <div class="user-box">
                <img ng-src="{{headimg.Headimgurl}}" alt="" class="user-w">
                <div class="user-info">       
                    <div class="user-id" ng-bind="accountid.AccountID"></div>
					<div class="user-name" ng-bind="nickname.Nickname"></div>
                </div>
            </div>
            <img src="img/aclogo.png" alt="" class="activity-logo" ng-click="goActivity()">
        </div>

        <div class="home-content">
            <div class="home-content-awa">
                <div class="home-content-item home-awa0" ng-click="goSpecial()">
                    <img src="img/gou.png" alt="" ng-if="prize.topP">
                </div>
                <div class="home-content-item home-awa1" ng-click="goGold()">
                    <img src="img/gou.png" alt="" ng-if="prize.topF">
                </div>
                <div class="home-content-item home-awa2" ng-click="goSilver()">
                    <img src="img/gou.png" alt="" ng-if="prize.topS">
                </div>
                <div class="home-content-item home-awa3" ng-click="goBronze()">
                    <img src="img/gou.png" alt="" ng-if="prize.topT">
                </div>
                <div class="home-content-item home-awa4" ng-click="goPart()">
                    <img src="img/gou.png" alt="" ng-if="prize.topL" ng-click="goPart()">
                </div>
            </div>

            <div class="message">
                <img src="img/ad.png" alt="">
            </div>

            <div class="ad-text">
                <div class="ad-text-cont">
                    <!--飞鱼已成功兑换参与奖！-->
                    <div class="ad-text-pos"></div>
                </div>
            </div>

            <div class="show-allmj">
                <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                    <img ng-src="{{item | mjimgurl:$index}}" alt="">
                </div>
            </div>

            <div class="show-allmj show-allmj-number">
                <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                    <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                </div>
            </div>
        </div>

        <div class="home-deputy">
            <div class="home-deputy-left">
                <img src="img/btn-acr.png" alt="" class="add-details" ng-click="goNodrow()">
                <img src="img/hand.png" alt="" class="hand" ng-click="goGetmj()">
                <span class="red-circle addnumber" ng-bind="addnumberdata.CollectTimes"></span>
            </div>

            <div class="home-deputy-right">
                <input type="text" placeholder="填写取牌码" maxlength="5" class="input-code" ng-model="todayData.code"
                       onfocus="this.placeholder=''" onblur="this.placeholder='填写取牌码'">
                <img src="img/conv.png" alt="" class="conv" ng-click="getTodayCode()">
            </div>
        </div>

        <div class="footer">
            <img src="img/send-acr.png" alt="" class="footer-left" ng-click="goSendten()">
            <img src="img/focus.png" alt="" class="footer-main" ng-click="goRecopyrank()">
            <img src="img/get-acr.png" alt="" class="footer-right" ng-click="goGetten()">
        </div>
    </div>

    <!--activity-->
    <div class="activity" ng-if="activity.activityIf" ng-controller="activityCtrl">
        <div class="header-activity">
            <div class="header-left">
                <img src="img/act/back.png" alt="" ng-click="closeActivity()">
            </div>
            <div class="header-right">
                <img src="img/act/act-logo.png" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col act-h2">
                收集麻将，兑换豪礼，还送银滩旅游！！！
            </div>
        </div>
        <div class="row">
            <div class="col act-time">
                <p>活动时间：2017年10月1日--2017年11月1日</p>
            </div>
        </div>
        <div class="activity-btn">
            <div class="activity-btn-left" ng-click="actAct()">
                <p>活动介绍</p>
            </div>
            <div class="activity-btn-right" ng-click="actAwa()">
                <p>奖项说明</p>
            </div>
        </div>

        <div class="scrollBox-t touchAdd activity-scroll">

            <div class="act-content-left" ng-if="actcon">
                <div class="act-content-item act-item1">
                    <div class="act-item-box">
                        <p>1.首次参加游戏即可获得两次翻牌机会,点击翻牌按钮得随机麻将:</p>
                        <img src="img/act/act-content-img1.png" alt="" class="act-content-img1">
                    </div>
                </div>
                <div class="act-content-item act-item2">
                    <div class="act-item-box">
                        <p>2.在银滩湖南麻将游戏中也会定期发放取牌码,用来兑换翻牌次数。</p>
                        <img src="img/act/act-content-img2.png" alt="" class="act-content-img2">
                    </div>


                </div>
                <div class="act-content-item act-item3">
                    <div class="act-item-box">
                        <p>* 本次活动“麻将”种类共有万、筒、条3类共27种，每种牌可以拥有多张。</p>
                        <p>* 活动中每一种奖项仅可领取一次。</p>
						<p>* 每天最多翻10次牌。</p>
                    </div>
                </div>
            </div>

            <div class="act-content-right" ng-if="!actcon">
                <div class="act-content-item act-item11">
                    <div class="act-item-box">
                        <div class="item-img-left">
                            <img src="img/claim/special.png" alt="">
                        </div>
                        <div class="item-p-right">
                            <p>特等奖：集齐万、筒、条三类花色各9种共27张，即可获得惠州十里银滩三天两晚海滨度假游和iPhone 8 Plus一台。</p>
                        </div>
                        <img src="img/act/act-set-img1.png" class="act-set">
                    </div>
                </div>


                <div class="act-content-item act-item22">
                    <div class="act-item-box">
                        <div class="item-img-left">
                            <img src="img/claim/gold.png" alt="">
                        </div>
                        <div class="item-p-right">
                            <p>金牌奖：集齐任意两类花色，各9种共18张，即可获得惠州十里银滩三天两晚海滨度假游和小米MIX 2一台。</p>
                        </div>
                        <img src="img/act/act-set-img2.png" class="act-set">
                    </div>

                </div>
                <div class="act-content-item act-item33">
                    <div class="act-item-box">
                        <div class="item-img-left">
                            <img src="img/claim/silver.png" alt="">
                        </div>
                        <div class="item-p-right">
                            <p>银牌奖：集齐任意一类花色，9种共9张，即可获得小米MAX2一台。</p>
                        </div>
                        <img src="img/act/act-set-img3.png" class="act-set">
                    </div>
                </div>
                <div class="act-content-item act-item44">
                    <div class="act-item-box">
                        <div class="item-img-left">
                            <img src="img/claim/bronze.png" alt="">
                        </div>
                        <div class="item-p-right">
                            <p>铜牌奖：集齐任意一种胡牌牌型（需同时包含万，条，筒的顺子），即可获得100元话费卡。</p>
                        </div>
                        <img src="img/act/act-set-img4.png" class="act-set">
                    </div>
                </div>
                <div class="act-content-item act-item55">
                    <div class="act-item-box">
                        <div class="item-img-left">
                            <img src="img/claim/participation.png" alt="">
                        </div>
                        <div class="item-p-right">
                            <p>参与奖：集齐任意10张麻将，即可获得5元现金红包。</p>
                        </div>
                        <img src="img/act/act-set-img5.png" class="act-set act-set-marginTop">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--part-->
    <div class="part" ng-if="part.partIf" ng-controller="partCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closePart()">
            <img src="img/claim/participation.png" alt="" class="claim-parti">
            <img src="img/claim/parti-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="img/claim/claim-btn.png" alt="" class="claim-btn" ng-click="goPartOption()">
            </div>
            <div class="claim-txt">
                <p>条件：</p>
                <p>收集10张麻将即可。</p>
            </div>
        </div>
    </div>
    <!--partOption-->
    <div class="partOption" ng-if="partOption.partOptionIf" ng-controller="partOptionCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closePartOption()">
            <img src="img/claim/participation.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <img ng-src="{{item | mjimgurl:$index}}" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index"
                         ng-click="putIn.putInPost(item,$index,postmj.getpart)">
                        <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                    </div>
                </div>
            </div>
            <div class="partiClaim-txt">
                <p>*点击上方麻将添加到兑奖区，点击下方将麻将放回</p>
            </div>
            <div class="giving">
                <li ng-repeat="item in postmj.getpart track by $index">
                    <img ng-src="{{item | areares}}" alt="" class="full"
                         ng-click="putOut.putOutPost(item,$index,postmj.getpart)">
                </li>
            </div>
            <div class="btn-box btn-box-top">
                <img ng-src="img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get"
                     ng-click="postMjPrize(postmj.getpart)">
            </div>
        </div>

    </div>
    <!--partSucc-->
    <div class="partSucc" ng-if="partSucc.partSuccIf" ng-controller="partSuccCtrl">
        <div class="su-content">
            <ion-content class="claim-bj claim-bj2">
                <div class="claim-box">
                    <img src="img/close.png" alt="" class="acr-close" ng-click="closePartSucc()">
                    <img src="img/claim/participation.png" alt="" class="claim-parti">
                    <img src="img/claim/parti-awa.png" alt="" class="acr-parti">
                    <div class="aCode">
                        <p ng-bind="prize.topL"></p>
                    </div>
                    <div class="SuccText">
                        <p>请将此页截屏，</p>
                        <p>联系客服进行兑奖事宜。</p>
                        <p class="wxTxt">兑奖微信：yintan66</p>
                    </div>
                </div>
            </ion-content>
        </div>

    </div>

    <!--bronze-->
    <div class="bronze" ng-if="bronze.bronzeIf" ng-controller="bronzeCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeBronze()">
            <img src="img/claim/bronze.png" alt="" class="claim-parti">
            <img src="img/claim/bronze-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="img/claim/claim-btn.png" alt="" class="claim-btn" ng-click="goBronzeOption()">
            </div>
            <div class="claim-txt">
                <p>条件：</p>
                <p>收集符合胡牌的牌型（需同时包含万，条，筒的顺子），共14张。</p>
            </div>
        </div>
    </div>
    <!--bronzeOption-->
    <div class="bronzeOption" ng-if="bronzeOption.bronzeOptionIf" ng-controller="bronzeOptionCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeBronzeOption()">
            <img src="img/claim/bronze.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <img ng-src="{{item | mjimgurl:$index}}" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index"
                         ng-click="putIn.putInPost(item,$index,postmj.getbronze)">
                        <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                    </div>
                </div>
            </div>
            <div class="partiClaim-txt">
                <p>*点击上方麻将添加到兑奖区，点击下方将麻将放回</p>
            </div>
            <div class="giving">
                <li ng-repeat="item in postmj.getbronze track by $index">
                    <img ng-src="{{item | areares}}" alt="" class="full"
                         ng-click="putOut.putOutPost(item,$index,postmj.getbronze)">
                </li>
            </div>
            <div class="btn-box btn-box-top">
                <img ng-src="img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get"
                     ng-click="postMjPrize(postmj.getbronze)">
            </div>
        </div>

    </div>
    <!--bronzeSucc-->
    <div class="bronzeSucc" ng-if="bronzeSucc.bronzeSuccIf" ng-controller="bronzeSuccCtrl">
        <div class="su-content">
            <ion-content class="claim-bj claim-bj2">
                <div class="claim-box">
                    <img src="img/close.png" alt="" class="acr-close" ng-click="closeBronzeSucc()">
                    <img src="img/claim/bronze.png" alt="" class="claim-parti">
                    <img src="img/claim/bronze-awa.png" alt="" class="acr-parti">
                    <div class="aCode">
                        <p ng-bind="prize.topT"></p>
                    </div>
                    <div class="SuccText">
                        <p>请将此页截屏，</p>
                        <p>联系客服进行兑奖事宜。</p>
						<p>（并提供“银滩湖南麻将”游戏截图。）</p>
                        <p class="wxTxt">兑奖微信：yintan66</p>
                    </div>
                </div>
            </ion-content>
        </div>

    </div>

    <!--sliver-->
    <div class="silver" ng-if="silver.silverIf" ng-controller="silverCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeSilver()">
            <img src="img/claim/silver.png" alt="" class="claim-parti">
            <img src="img/claim/silver-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="img/claim/claim-btn.png" alt="" class="claim-btn" ng-click="goSilverOption()">
            </div>
            <div class="claim-txt">
                <p>条件：</p>
                <p>收集1-9万、条、筒随意一类，共9张。</p>
            </div>
        </div>
    </div>
    <!--silverOption-->
    <div class="silverOption" ng-if="silverOption.silverOptionIf" ng-controller="silverOptionCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeSilverOption()">
            <img src="img/claim/silver.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <img ng-src="{{item | mjimgurl:$index}}" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index"
                         ng-click="putIn.putInPost(item,$index,postmj.getsilver)">
                        <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                    </div>
                </div>
            </div>
            <div class="partiClaim-txt">
                <p>*点击上方麻将添加到兑奖区，点击下方将麻将放回</p>
            </div>
            <div class="giving">
                <li ng-repeat="item in postmj.getsilver track by $index">
                    <img ng-src="{{item | areares}}" alt="" class="full"
                         ng-click="putOut.putOutPost(item,$index,postmj.getsilver)">
                </li>
            </div>
            <div class="btn-box btn-box-top">
                <img ng-src="img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get"
                     ng-click="postMjPrize(postmj.getsilver)">
            </div>
        </div>

    </div>
    <!--silverSucc-->
    <div class="silverSucc" ng-if="silverSucc.silverSuccIf" ng-controller="silverSuccCtrl">
        <div class="su-content">
            <ion-content class="claim-bj claim-bj2">
                <div class="claim-box">
                    <img src="img/close.png" alt="" class="acr-close" ng-click="closeSilverSucc()">
                    <img src="img/claim/silver.png" alt="" class="claim-parti">
                    <img src="img/claim/silver-awa.png" alt="" class="acr-parti">
                    <div class="aCode">
                        <p ng-bind="prize.topS"></p>
                    </div>
                    <div class="SuccText">
                        <p>请将此页截屏，</p>
                        <p>联系客服进行兑奖事宜。</p>
						<p>（并提供“银滩湖南麻将”游戏截图。）</p>
                        <p class="wxTxt">兑奖微信：yintan66</p>
                    </div>
                </div>
            </ion-content>
        </div>

    </div>

    <!--gold-->
    <div class="gold" ng-if="gold.goldIf" ng-controller="goldCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeGold()">
            <img src="img/claim/gold.png" alt="" class="claim-parti">
            <img src="img/claim/gold-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="img/claim/claim-btn.png" alt="" class="claim-btn" ng-click="goGoldOption()">
            </div>

            <div class="claim-txt">
                <p>条件：</p>
                <p>收集1-9万、条、筒随意二类，共18张。</p>
            </div>
        </div>
    </div>
    <!--goldOption-->
    <div class="goldOption" ng-if="goldOption.goldOptionIf" ng-controller="goldOptionCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeGoldOption()">
            <img src="img/claim/gold.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <img ng-src="{{item | mjimgurl:$index}}" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index"
                         ng-click="putIn.putInPost(item,$index,postmj.getgold)">
                        <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                    </div>
                </div>
            </div>
            <div class="partiClaim-txt">
                <p>*点击上方麻将添加到兑奖区，点击下方将麻将放回</p>
            </div>
            <div class="giving">
                <li ng-repeat="item in postmj.getgold track by $index">
                    <img ng-src="{{item | areares}}" alt="" class="full"
                         ng-click="putOut.putOutPost(item,$index,postmj.getgold)">
                </li>
            </div>
            <div class="btn-box btn-box-top">
                <img ng-src="img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get"
                     ng-click="postMjPrize(postmj.getgold)">
            </div>
        </div>

    </div>
    <!--goldSucc-->
    <div class="goldSucc" ng-if="goldSucc.goldSuccIf" ng-controller="goldSuccCtrl">
        <div class="su-content">
            <ion-content class="claim-bj claim-bj2">
                <div class="claim-box">
                    <img src="img/close.png" alt="" class="acr-close" ng-click="closeGoldSucc()">
                    <img src="img/claim/gold.png" alt="" class="claim-parti">
                    <img src="img/claim/gold-awa.png" alt="" class="acr-parti">
                    <div class="aCode">
                        <p ng-bind="prize.topF"></p>
                    </div>
                    <div class="SuccText">
                        <p>请将此页截屏，</p>
                        <p>联系客服进行兑奖事宜。</p>
						<p>（并提供“银滩湖南麻将”游戏截图。）</p>
                        <p class="wxTxt">兑奖微信：yintan66</p>
                    </div>
                </div>
            </ion-content>
        </div>

    </div>

    <!--special-->
    <div class="special" ng-if="special.specialIf" ng-controller="specialCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeSpecial()">
            <img src="img/claim/special.png" alt="" class="claim-parti">
            <img src="img/claim/special-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="img/claim/claim-btn.png" alt="" class="claim-btn" ng-click="goSpecialOption()">
            </div>

            <div class="claim-txt">
                <p>条件：</p>
                <p>收集27张麻将君：1-9万，1-9筒，1-9条。</p>
            </div>
        </div>
    </div>
    <!--specialOption-->
    <div class="specialOption" ng-if="specialOption.specialOptionIf" ng-controller="specialOptionCtrl">
        <div class="claim-box">
            <img src="img/close.png" alt="" class="acr-close" ng-click="closeSpecialOption()">
            <img src="img/claim/special.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <img ng-src="{{item | mjimgurl:$index}}" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" ng-repeat="item in mjdata.mjlist track by $index">
                        <span class="red-circle" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
                    </div>
                </div>
            </div>


            <div class="btn-box btn-box-top">
                <img ng-src="img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get"
                     ng-click="postMjSpecial.post(mjdata.mjlist)">
            </div>
        </div>

    </div>
    <!--specialSucc-->
    <div class="specialSucc" ng-if="specialSucc.specialSuccIf" ng-controller="specialSuccCtrl">
        <div class="su-content">
            <ion-content class="claim-bj claim-bj2">
                <div class="claim-box">
                    <img src="img/close.png" alt="" class="acr-close" ng-click="closespecialSucc()">
                    <img src="img/claim/special.png" alt="" class="claim-parti">
                    <img src="img/claim/special-awa.png" alt="" class="acr-parti">
                    <div class="aCode">
                        <p ng-bind="prize.topP"></p>
                    </div>
                    <div class="SuccText">
                        <p>请将此页截屏，</p>
                        <p>联系客服进行兑奖事宜。</p>
						<p>（并提供“银滩湖南麻将”游戏截图。）</p>
                        <p class="wxTxt">兑奖微信：yintan66</p>
                    </div>
                </div>
            </ion-content>
        </div>
    </div>

    <!--nodrow-->
    <div class="nodrow" ng-if="nodrow.nodrowIf" ng-controller="nodrowCtrl">
        <div class="cardNum-bj">
            <div class="nodrow-header">
                <img src="img/close.png" alt="" ng-click="closeNodrow()">
            </div>

            <div class="content-box">
                <div class="way-txt">
                    <p>“银滩湖南麻将”，游戏内领取取牌码。</p>
                </div>

                <div class="card-list">

                    <li class="card-list-top">1.点击“下载游戏”。</li>
                    <li>
                        <img src="" alt="">
                        <a href="https://www.shenzhouxing.com/hnzz/dl/"><span class="download-game">点击下载<span></a>
                    </li>

                    <li class="card-list-top">2.游戏公告栏会每天不定时向全体玩家发放取牌码。</li>

                    <li class="card-list-top">3.在“麻将全家福”首页，填写取牌码。</li>
                    <li><img src="img/card-dh.png" alt="" class="gzh"></li>

                    <li class="card-list-top">点击兑换后翻牌次数随后增加。</li>
                    <li><img src="img/card-mp.png" alt="" class="card-mp"></li>
                </div>

            </div>
        </div>
    </div>

    <!--getmj-->
    <div class="getmj " ng-if="getmj.getmjIf" ng-controller="getmjCtrl">
        <div class="getmj getmjnostop">
            <div class="getmj-box ">
                <div class="getMjKey"></div>
                <div class="focus" style=></div>
                <div class="putIn getmjyesstop" ng-click="closeGetMj()">
                    <img src="img/putin.png" alt="">
                </div>
            </div>
        </div>
    </div>

    <!--recopyrank-->
    <div class="recopyrank" ng-if="recopyrank.recopyrankIf" ng-controller="recopyrankCtrl">
        <img src="img/recopy-bj.png" alt="" class="recopy-bj">
        <div class="recopy-header">
            <img src="img/close.png" alt="" class="recopy-close" ng-click="closeRecopyrank()">
        </div>
        <div class="recopy-content">
            <div class="recopy-top">
                <div class="rank-pm">
                    <div class="rank-item rank-left">
                        <img ng-src="{{recopyrank.rank[1].Headimgurl}}" alt="">
                        <p ng-bind="recopyrank.rank[1].Nickname"></p>

                        <div class="second-box">
                            <div class="second-left"><img src="img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p ng-bind="recopyrank.rank[1].CardSum | recopymjnumber"
                                                         class="second-p"></p></div>
                        </div>

                    </div>

                    <div class="rank-item rank-center">
                        <img ng-src="{{recopyrank.rank[0].Headimgurl}}" alt="">
                        <p ng-bind="recopyrank.rank[0].Nickname"></p>

                        <div class="second-box">
                            <div class="second-left"><img src="img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p ng-bind="recopyrank.rank[0].CardSum | recopymjnumber"
                                                         class="second-p"></p></div>
                        </div>
                    </div>

                    <div class="rank-item rank-right">
                        <img ng-src="{{recopyrank.rank[2].Headimgurl}}" alt="">
                        <p ng-bind="recopyrank.rank[2].Nickname"></p>

                        <div class="second-box">
                            <div class="second-left"><img src="img/majiang-rev.png" class="second-img"></div>
                            <div class="second-right"><p ng-bind="recopyrank.rank[2].CardSum | recopymjnumber"
                                                         class="second-p"></p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="remark-txt"><p>（排名每小时更新1次）</p></div>
            <div class="user-onself">
                <div class="ranking" ng-bind="recopyrank.userrank"></div>
                <div class="user-hedaer">
                    <img ng-src="{{headimg.Headimgurl}}" alt="">
                </div>
                <div class="user-monick">
                    <div class="monick-top" ng-bind="nickname.Nickname"></div>

                </div>
                <div class="user-mj"><img src="img/majiang-rev.png" alt=""></div>
                <div class="user-number" ng-bind="recopyrank.ranknum"></div>
            </div>
            <div class="scrollBox-t touchAdd rank-scroll">
                <div class="user-other" ng-repeat="item in rankslice.ranklist track by $index">
                    <div class="ranking" ng-bind="$index+4"></div>
                    <div class="user-hedaer">
                        <img ng-src="{{item.Headimgurl}}" alt="">
                    </div>
                    <div class="user-monick" ng-bind="item.Nickname"></div>
                    <div class="user-mj">
                        <img src="img/majiang-rev.png" alt="">
                    </div>
                    <div class="user-number" ng-bind="item.CardSum | recopymjnumber"></div>
                </div>
            </div>
        </div>
    </div>

    <!--sendten-->
    <div class="sendten" ng-if="sendten.sendtenIf" ng-controller="sendtenCtrl">
        <div class="twt-tabs">
            <div class="twt-ten"></div>
            <div class="twt-tube" ng-click="goSendtube()"></div>
            <div class="twt-strip" ng-click="goSendstrip()"></div>
        </div>

        <img src="img/sendOrget/ten.png" alt="" class="sg-top">

        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeSendten()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in mjnumslice.wnum track by $index">
                <img ng-src="{{item |areaResW:$index}}" alt="">
            </li>
        </div>

        <div class="item-box">
            <li class="item-list item-list-ten" ng-repeat="item in mjnumslice.wnum track by $index"
                ng-click="sendorget($index,item,'send','w')">
                <span class="item-list-num" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
            </li>
        </div>

        <div class="sg-tBtn">
            <p ng-bind="sendTxtnew"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goGiveactive()">
                <img src="img/sendOrget/send-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('send')">
            </div>
        </div>

        <div class="hint">必须点“赠送”按钮，分享才生效。</div>
    </div>

    <!--sendtube-->
    <div class="sendtube" ng-if="sendtube.sendtubeIf" ng-controller="sendtubeCtrl">
        <div class="twt-tabs">
            <div class="twt-ten" ng-click="goSendten()"></div>
            <div class="twt-tube"></div>
            <div class="twt-strip" ng-click="goSendstrip()"></div>
        </div>

        <img src="img/sendOrget/tube.png" alt="" class="sg-top">
        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeSendtube()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in mjnumslice.tnum track by $index">
                <img ng-src="{{item | areaResT:$index}}" alt="">
            </li>
        </div>

        <div class="item-box">
            <li class="item-list item-list-tube" ng-repeat="item in mjnumslice.tnum track by $index"
                ng-click="sendorget($index,item,'send','t')">
                <span class="item-list-num" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
            </li>
        </div>

        <div class="sg-tBtn">
            <p ng-bind="sendTxtnew"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goGiveactive()">
                <img src="img/sendOrget/send-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('send')">
            </div>
        </div>
        <div class="hint">必须点“赠送”按钮，分享才生效。</div>
    </div>

    <!--sendstrip-->

    <div class="sendstrip" ng-if="sendstrip.sendstripIf" ng-controller="sendstripCtrl">
        <div class="twt-tabs">
            <div class="twt-ten" ng-click="goSendten()"></div>
            <div class="twt-tube" ng-click="goSendtube()"></div>
            <div class="twt-strip"></div>
        </div>

        <img src="img/sendOrget/strip.png" alt="" class="sg-top">
        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeSendstrip()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in mjnumslice.snum track by $index">
                <img ng-src="{{item | areaResS:$index}}" alt="">
            </li>
        </div>

        <div class="item-box">
            <li class="item-list item-list-strip" ng-repeat="item in mjnumslice.snum track by $index"
                ng-click="sendorget($index,item,'send','s')">
                <span class="item-list-num" ng-bind="item | mjnumber" ng-if="ishide(item)"></span>
            </li>
        </div>

        <div class="sg-tBtn">
            <p ng-bind="sendTxtnew"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goGiveactive()">
                <img src="img/sendOrget/send-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('send')">
            </div>
        </div>
        <div class="hint">必须点“赠送”按钮，分享才生效。</div>
    </div>

    <!--getten-->
    <div class="getten" ng-if="getten.gettenIf" ng-controller="gettenCtrl">
        <div class="twt-tabs">
            <div class="twt-ten"></div>
            <div class="twt-tube" ng-click="goGettube()"></div>
            <div class="twt-strip" ng-click="goGetstrip()"></div>
        </div>

        <img src="img/sendOrget/ten.png" alt="" class="sg-top">

        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeGetten()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in getmjarr.wnum track by $index"
                ng-click="sendorget($index,item,'get','w')">
                <img ng-src="{{item |mjimgurl:$index}}" alt="">
            </li>
        </div>


        <div class="sg-tBtn">
            <p ng-bind="gettext"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goAskactive()">
                <img src="img/sendOrget/get-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('get')">
            </div>
        </div>
        <div class="hint">必须点“去索取”按钮，分享才生效。</div>
    </div>

    <!--gettube-->
    <div class="gettube" ng-if="gettube.gettubeIf" ng-controller="gettubeCtrl">
        <div class="twt-tabs">
            <div class="twt-ten" ng-click="goGetten()"></div>
            <div class="twt-tube"></div>
            <div class="twt-strip" ng-click="goGetstrip()"></div>
        </div>

        <img src="img/sendOrget/tube.png" alt="" class="sg-top">
        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeGettube()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in getmjarr.tnum track by $index"
                ng-click="sendorget($index,item,'get','t')">
                <img ng-src="{{item | areaResT:$index}}" alt="">
            </li>
        </div>


        <div class="sg-tBtn">
            <p ng-bind="gettext"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goAskactive()">
                <img src="img/sendOrget/get-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('get')">
            </div>
        </div>
        <div class="hint">必须点“去索取”按钮，分享才生效。</div>
    </div>

    <!--getstrip-->
    <div class="getstrip" ng-if="getstrip.getstripIf" ng-controller="getstripCtrl">
        <div class="twt-tabs">
            <div class="twt-ten" ng-click="goGetten()"></div>
            <div class="twt-tube" ng-click="goGettube()"></div>
            <div class="twt-strip"></div>
        </div>

        <img src="img/sendOrget/strip.png" alt="" class="sg-top">
        <img src="img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="img/close.png" alt="" class="sg-close" ng-click="closeGetstrip()">
        <div><img src="img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" ng-repeat="item in getmjarr.snum track by $index"
                ng-click="sendorget($index,item,'get','s')">
                <img ng-src="{{item | areaResS:$index}}" alt="">
            </li>
        </div>


        <div class="sg-tBtn">
            <p ng-bind="gettext"></p>
            <div class="logview-btn-box">
                <img src="img/logview.png" alt="" class="btn btn-left" ng-click="goAskactive()">
                <img src="img/sendOrget/get-btn.png" alt="" class="btn btn-right" ng-click="showShareSend('get')">
            </div>
        </div>
        <div class="hint">必须点“去索取”按钮，分享才生效。</div>
    </div>

    <!--showmessagepage-->
    <div class="showmessagepage" ng-if="showmessagepage.showmessagepageIf" ng-controller="showmessagepageCtrl">
        <div ng-class="showmessagepagedata.way | filterPopBg">
            <div class="showmessage-cont">
                <div class="fromheadimg">
                    <img ng-src="{{showmessagepagedata.headimgurl}}" alt="">
                </div>

                <div class="fromname">
                    <div ng-bind="showmessagepagedata.fromname"></div>
                </div>

                <div class="showcard">
                    <img ng-src="{{showmessagepagedata.card | filterShowMessage}}" alt="">
                </div>


                <div class="showmessage-txt"
                     ng-bind="showmessagepagedata.way | filterShowPageTxt:showmessagepagedata.fromname:showmessagepagedata.card"></div>

                <div class="showmessage-btn-box">
                    <div class="showmessage-btn" ng-click="UseCode()">

                        <img ng-src="{{showmessagepagedata.way | filterBtn}}" alt="">
                    </div>
                </div>
            </div>
        </div>
        <img src="img/close.png" alt="" class="showmessageclose" ng-click="closeShowmessagepage()">
    </div>

    <!--showmessage-->
    <div class="showmessage" ng-if="showmessage.showmessageIf" ng-controller="showmessageCtrl">
        <div ng-class="showmessagedata.way | filterPopBg">

            <div class="showmessage-cont">
                <div class="fromheadimg">
                    <img ng-src="{{showmessagedata.headimgurl}}" alt="">
                </div>

                <div class="fromname">
                    <div ng-bind="showmessagedata.fromname"></div>
                </div>

                <div class="showcard">
                    <img ng-src="{{showmessagedata.card | filterShowMessage}}" alt="">
                </div>


                <div class="showmessage-txt"
                     ng-bind="showmessagedata.way | filterShowTxt:showmessagedata.use:showmessagedata.fromname:showmessagedata.toname:showmessagedata.card"></div>

                <div class="showmessage-btn-box">
                    <div class="showmessage-btn" ng-click="closeShowmessage()">
                        <img src="img/gotit.png" class="gotit"">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!--giveactive-->
    <div class="giveActive" ng-if="giveActive.giveActiveIf">
        <div class="ask-header">
            <img src="img/giveOrask/askback.png" alt="" ng-click="giveBack()">
            <img src="img/giveOrask/us-send-active.png" alt="">
            <img src="img/giveOrask/us-give.png" alt="" ng-click="goGive()">
            <img src="img/close.png" alt="" ng-click="closeGiveactive()">
        </div>

        <div class="askbg">
            <div class="scrollBox-t touchAdd ask-cont">
                <!--start-->
                <div class="askcont-box" ng-repeat="item in givelistdata.IGiveList track by $index">
                    <div class="user-hedaer">
                        <img ng-src="{{headimg.Headimgurl}}" alt="">
                    </div>

                    <div class="ask-main">
                        <div class="asktime" ng-bind="item.CreatedAt | filterData"></div>
                        <div class="asktxt" ng-bind="item.Card | filterGiveList"></div>
                    </div>
                </div>
                <!--start-->
            </div>
        </div>
    </div>

    <!--give-->
    <div class="giveActive" ng-if="give.giveIf">
        <div class="ask-header">
            <img src="img/giveOrask/askback.png" alt="" ng-click="giveBack()">
            <img src="img/giveOrask/us-send.png" alt="" ng-click="backGiveactive()">
            <img src="img/giveOrask/us-give-active.png" alt="">
            <img src="img/close.png" alt="" ng-click="closeGiveactive()">
        </div>

        <div class="askbg">
            <div class="scrollBox-t touchAdd ask-cont">
                <div class="askcont-box" ng-repeat="item in givelistdata.GiveMeList track by $index">
                    <div class="user-hedaer">
                        <img ng-src="{{item.Headimgurl}}" alt="">
                    </div>

                    <div class="ask-main">
                        <div class="asktime" ng-bind="item.CreatedAt | filterData"></div>
                        <div class="asktxt" ng-bind="item.Card | filterGiveList:item.FromName"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!--askactive-->
    <div class="askActive" ng-if="askActive.askActiveIf">
        <div class="ask-header">
            <img src="img/giveOrask/askback.png" alt="" ng-click="askBack()">
            <img src="img/giveOrask/us-ask-active.png" alt="">
            <img src="img/giveOrask/other-ask.png" alt="" ng-click="goAsk()">
            <img src="img/close.png" alt="" ng-click="closeAskactive()">
        </div>

        <div class="askbg">
            <div class="scrollBox-t touchAdd ask-cont">
                <div class="askcont-box" ng-repeat="item in asklistdata.IAskList track by $index">
                    <div class="user-hedaer">
                        <img ng-src="{{headimg.Headimgurl}}" alt="">
                    </div>

                    <div class="ask-main">
                        <div class="asktime" ng-bind="item.CreatedAt | filterData"></div>
                        <div class="asktxt" ng-bind="item.Card | filterAskList:item.Use:item.ToName"></div>
                    </div>

                    <div class="ask-right">
                        <div ng-class="item.Use | filterIsGetColor " ng-bind="item.Use | filterIsGet"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!--ask-->
    <div class="ask" ng-if="ask.askIf">
        <div class="ask-header">
            <img src="img/giveOrask/askback.png" alt="" ng-click="askBack()">
            <img src="img/giveOrask/us-ask.png" alt="" ng-click="backAskactive()">
            <img src="img/giveOrask/other-ask-active.png" alt="">
            <img src="img/close.png" alt="" ng-click="closeAsk()">
        </div>

        <div class="askbg">
            <div class="scrollBox-t touchAdd ask-cont">
                <div class="askcont-box" ng-repeat="item in asklistdata.AskMeList track by $index">
                    <div class="user-hedaer">
                        <img ng-src="{{item.Headimgurl}}" alt="">
                    </div>

                    <div class="ask-main">
                        <div class="asktime" ng-bind="item.CreatedAt | filterData"></div>
                        <div class="asktxt" ng-bind="item.Card | filterAskMeList:item.FromName"></div>
                    </div>
                </div>


            </div>
        </div>
    </div>
<!--stopMake-->
	<div class="stopMake" ng-if="stopMake.stopMakeIf">
		<img src="img/stop-prize.png" alt="" class="stop-make"/>
		<img src="img/make.png" alt="" class="make-btn" ng-click="closeStopMake()">
	</div>

  <!--showshare-->
    <div class="showshare" ng-if="showshare.showshareIf" ng-click="hideshare()">
        <img src="img/showshare.png" alt="" class="show-wx">
    </div>
  <!--loading-->
    <div class="loading" ng-if="loading.loadingIf">
        <div style="width:100%;height:100%;background:#fff;">
            <br>
            加载中，请稍后...
        </div>
    </div>


    <!--err-->
    <div class="err">
        <div class="err-txt"></div>
    </div>

    <!--end-->
</div>

<script src="js/controller/paternal.controller.js"></script>
<script src="js/controller/main.controller.js"></script>
<script src="js/controller/home.controller.js?1"></script>
<script src="js/controller/activity.controller.js"></script>

<script src="js/controller/part.controller.js"></script>
<script src="js/controller/partOption.controller.js"></script>
<script src="js/controller/partSucc.controller.js"></script>

<script src="js/controller/bronze.controller.js"></script>
<script src="js/controller/bronzeOption.controller.js"></script>
<script src="js/controller/bronzeSucc.controller.js"></script>

<script src="js/controller/silver.controller.js"></script>
<script src="js/controller/silverOption.controller.js"></script>
<script src="js/controller/silverSucc.controller.js"></script>

<script src="js/controller/gold.controller.js"></script>
<script src="js/controller/goldOption.controller.js"></script>
<script src="js/controller/goldSucc.controller.js"></script>

<script src="js/controller/special.controller.js"></script>
<script src="js/controller/specialOption.controller.js"></script>
<script src="js/controller/specialSucc.controller.js"></script>

<script src="js/controller/nodrow.controller.js"></script>
<script src="js/controller/getmj.controller.js?val=123"></script>

<script src="js/controller/recopy.controller.js"></script>

<script src="js/controller/sendten.controller.js"></script>
<script src="js/controller/sendtube.controller.js"></script>
<script src="js/controller/sendstrip.controller.js"></script>

<script src="js/controller/getten.controller.js"></script>
<script src="js/controller/gettube.controller.js"></script>
<script src="js/controller/getstrip.controller.js"></script>

<script src="js/controller/showmessagepage.controller.js"></script>
<script src="js/controller/showmessage.controller.js"></script>

<script>
    function preloadImg(srcArr) {
        if (srcArr instanceof Array) {
            for (var i = 0; i < srcArr.length; i++) {
                var oImg = new Image();
                oImg.src = srcArr[i];
            }
        }
    }

    //预加载图片
    preloadImg([
        'img/goes/1w.png',
        'img/goes/2w.png',
        'img/goes/3w.png',
        'img/goes/4w.png',
        'img/goes/5w.png',
        'img/goes/6w.png',
        'img/goes/7w.png',
        'img/goes/8w.png',
        'img/goes/9w.png',
        'img/goes/1t.png',
        'img/goes/2t.png',
        'img/goes/3t.png',
        'img/goes/4t.png',
        'img/goes/5t.png',
        'img/goes/6t.png',
        'img/goes/7t.png',
        'img/goes/8t.png',
        'img/goes/9t.png',
        'img/goes/1s.png',
        'img/goes/2s.png',
        'img/goes/3s.png',
        'img/goes/4s.png',
        'img/goes/5s.png',
        'img/goes/6s.png',
        'img/goes/7s.png',
        'img/goes/8s.png',
        'img/goes/9s.png',


    ]);
</script>

</body>
</html>

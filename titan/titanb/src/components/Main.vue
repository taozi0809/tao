<template>
    <div class="home">
        <div class="head">
            <p class="title" @click="handleClick('0')">
                <span><img src="../assets/img/logo.png" alt=""></span>
            </p>
            <p class="app-download" :class="head_active=='1'?'active':''" @click="handleClick('1')">APP下载</p>
            <a href="http://titan.link/web/" class="webpage" :class="head_active=='2'?'active':''" @click="handleClick('2')">登录网页版</a>
        </div>
        <div class="con" v-if="head_active=='0'">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <span class="bg"><img src="../assets/img/banner/1.png" alt=""></span>
                        <div class="slide-con">
                            <span class="f-l"><img src="../assets/img/banner/1l.png" alt=""></span>
                            <span class="f-r"><img src="../assets/img/banner/1r.png" alt=""></span>
                        </div>

                    </div>
                    <div class="swiper-slide">
                        <span class="bg"><img src="../assets/img/banner/2.png" alt=""></span>
                        <div class="slide-con">
                            <span class="s-l"><img src="../assets/img/banner/2l.png" alt=""></span>
                            <span class="s-r"><img src="../assets/img/banner/2r.png" alt=""></span>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <span class="bg"><img src="../assets/img/banner/3.png" alt=""></span>
                        <div class="slide-con">
                            <span class="t-l"><img src="../assets/img/banner/3l.png" alt=""></span>
                            <span class="t-r"><img src="../assets/img/banner/3r.png" alt=""></span>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination" id="swiper-pagination"></div>

            </div>
        </div>
        <div class="con" v-if="head_active=='1'">
            <div class="app-download-con">
                <span class="bg"><img src="../assets/img/app-dwonload-bg.png" alt=""></span>

                <div class="c">
                    <span class="iphone"><img src="../assets/img/iphone.png" alt=""></span>
                    <div class="r">
                        <span class="r-title"><img src="../assets/img/app-download-title.png" alt=""></span>
                        <div class="b">
                            <div class="qr">
                                <span><img src="../assets/img/qr-code.png" alt=""></span>
                                <p>扫码下载APP</p>
                            </div>
                            <div class="btn" v-if="!is_wechat">
                                <a :href="url">Android</a>
                                <a :href="url">IOS</a>
                            </div>
                            <div class="btn" @click="handleWechat" v-if="is_wechat">
                                <a :href="url">Android</a>
                                <a :href="url">IOS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="bot">
            <div class="des">
                <p class="copyright">©2018-2022 TITAN All Rights Reserved</p>
                <p class="regard">关于我们&nbsp;&nbsp;|&nbsp;&nbsp;隐私政策&nbsp;&nbsp;|&nbsp;&nbsp;友情链接</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        data(){
            return{
                head_active:0,
                download_active:'ios',
                url:'javascript:;',
                is_wechat:false,
            }
        },
        mounted:function(){
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            let is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})(); //微信终端
            isiOS?this.url='itms-services://?action=download-manifest&url=https://www.titan.link/ipa/titan_1.0.0.plist':''
            isAndroid?this.url='http://api.resource.titan.shenzhouxing.com/web/apk/titan.apk':''
            is_weixin&&isAndroid?this.is_wechat=true:''
            this.init_swiper()
        },
        methods:{
            handleClick(i){
                if(this.head_active!=0){
                    if(i==0){
                        setTimeout(()=>{
                            this.init_swiper()
                        },100)
                    }
                }
                this.head_active = i
            },
            handleDownload(e){
                this.download_active = e
            },
            init_swiper(){
                new Swiper ('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop : true,
                })
            },
            handleWechat(){
                alert('请在浏览器打开')
            }
        }
    }
</script>

<style>
    .home{
        width: 100%;
        height: 100%;
    }
    .head{
        width: 100%;
        min-width: 1000px;
        height: 80px;
        background: #eee;
        display: flex;
        align-content: center;
    }
    .head .title{
        padding-left: 220px;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 80px;
        width: 48px;
    }
    .head .title span{
        display: block;
        width: 48px;
        height: 48px;
    }
    .head .title span img{
        width: 100%;
    }
    .head .app-download,.head .webpage{
        font-size: 16px;
        color: #333;
        height: 80px;
        line-height: 80px;
        margin-left: 90px;
        cursor: pointer;
    }
    .head .active{
        color: #47AB2B;
    }
    .head .app-download:hover,.head .webpage:hover{
        color: #47AB2B;
    }
    .bot{
        width: 100%;
        min-width: 1000px;
        height: 120px;
        position: absolute;
        left:0;
        bottom: 0;
        background: #181818;
    }
    .bot .des{
        margin: 0 auto;
        width: 1000px;
        height: 120px;
        display: flex;
        align-content: center;
        justify-content: space-between;
    }
    .bot .des .copyright,.regard{
        font-size: 14px;
        color: #fff;
        height: 120px;
        line-height: 120px;
    }

    .con{
        width: 100%;
        min-width: 1000px;
        height: calc(100% - 200px);
        background: #ecf0f3;
        overflow: hidden;
    }
    .swiper-container{
        width: 100%;
        height:100%;
    }
    .swiper-slide{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .swiper-slide .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block;
    }
    .swiper-slide .bg img{
        height: 100%;
        width: 100%;
    }
    .slide-con{
        position: absolute;
        height: 100%;
        width: 70%;
        min-width: 1000px;
        overflow: hidden;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        left: 50%;
        transform: translateX(-50%);
    }
    .f-l{
        width: 600px;
        display: block;
    }
    .f-l{
        width: 44.64%;
    }
    .f-l img{
        width: 100%;
    }
    .f-r{
        width: 420px;
        display: block;
    }
    .f-r{
        width: 31.25%;
    }
    .f-r img{
        width: 100%;
    }
    .s-l{
        width: 433px;
        display: block;
    }
    .s-l{
        width: 32.21%;
    }
    .s-l img{width: 100%;}
    .s-r{
        width:516px;
        display: block;
    }
    .s-r{
        width:38.39%;
    }
    .s-r img{width: 100%;}

    .t-l{
        width:400px;
        display: block;
    }
    .t-l{
        width:29.76%;
    }
    .t-l img{width: 100%;}
    .t-r{
        width: 535px;
        display: block;
    }
    .t-r{
        width:39.8%;
    }
    .t-r img{width: 100%;}

    .app-download-con{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .app-download-con .bg{
        display: block;
        position: absolute;
        top:0;
        width: 100%;
        height: 100%;
    }
    .app-download-con .bg img{
        width: 100%;
        height: 100%;
    }
    .c{
        width: 1000px;
        height:434px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .c .iphone{
        display: block;
        width: 235px;
        height: 434px;
        overflow: hidden;
    }
    .c .iphone img{
        width: 100%;
        height: 100%;
    }
    .r{
        margin-left: 90px;
    }
    .r .r-title{
        display: block;
        width: 546px;
        height: 126px;
    }
    .r .r-title img{
        width: 100%;

    }
    .b{
        display: flex;
        align-items: center;
        padding-top: 60px;
    }
    .b .qr{
        width: 190px;
        height: 210px;
        background: #fff;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 2px;
    }
    .b .qr{
        text-align: center;
        box-sizing: border-box;
        padding: 15px;
    }
    .b .qr span{
        width:160px;
        height: 160px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }
    .b .qr span img{
        width: 100%;
        height: 100%;
    }
    .b .qr p{
        color: #7FB239;
        font-size: 18px;
        padding-top: 5px;
    }


    .b .btn{
        padding-left: 40px;
    }
    .b .btn a{
        display: block;
        width: 240px;
        height: 66px;
        line-height: 66px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        border: 1px solid #fff;
        border-radius: 5px;
        overflow: hidden;
        margin:30px 0;
    }
    .b .btn .active{
        border: 2px solid #fff;
    }

    #swiper-pagination .swiper-pagination-bullet{
        width: 54px;
        height: 8px;
        background: #fff;
        border-radius: 5px;
    }

</style>

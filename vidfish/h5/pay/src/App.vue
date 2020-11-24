<template>
  <div id="app" :class="loading?'center':'no-center'">
      <van-loading color="#1989fa" size="40px" vertical v-if="loading"/>
      <div class="pay" v-if="!loading">
          <div class="bg"><img src="./assets/img/bg.png" alt=""></div>
          <div class="content">
              <span class="logo"><img src="./assets/img/logo.png" alt=""></span>
              <!--<div class="top-box">-->
                  <!--<span class="logo-top"><img src="./assets/img/banner.png" alt=""></span>-->
                  <!--<span class="logo-top"><img src="./assets/img/gopay-top.png" alt=""></span>-->
                  <!--<span class="logo-top"><img src="./assets/img/active.png" alt=""></span>-->
                  <!--<p class="passes">{{langCon[payInfos.lang].passes}}</p>-->
              <!--</div>-->
              <ul class="product">
                  <li v-for="item in payProductCtoModelList" :key="item.id" @click="pay('gopay',item.type)">
                      <span class="pay-logo"><img src="./assets/img/gopay.png" alt=""></span>
                      <div class="r" v-if="item.type==0">
                          <p>Go-Pay {{langCon[payInfos.lang].mc}}</p>
                          <p>rp39,800 / {{langCon.EN.m}}</p>
                      </div>
                      <div class="r" v-if="item.type==1">
                          <p>Go-Pay {{langCon[payInfos.lang].yc}}</p>
                          <p>rp398,000 / {{langCon.EN.y}}</p>
                      </div>
                  </li>
              </ul>
              <ul class="product indomaret">
                  <li v-for="(item,index) in payProductCtoModelList" @click="pay('indomaret',item.type)" >
                      <span class="pay-logo"><img src="./assets/img/indomaret.png" alt=""></span>
                      <div class="r" v-if="item.type==0">
                          <p>Indomaret {{langCon[payInfos.lang].mc}}</p>
                          <p>rp39,800 / {{langCon.EN.m}}</p>
                      </div>
                      <div class="r" v-if="item.type==1">
                          <p>Indomaret {{langCon[payInfos.lang].yc}}</p>
                          <p>rp398,000 / {{langCon.EN.y}}</p>
                      </div>
                  </li>
              </ul>
              <div class="paypal">
                  <div class="paypal-box">
                      <div id="paypal-button-container" class="paypal-button-container"></div>
                  </div>
                  <p class="paypal-price">USD 3.99/{{langCon.EN.y}}</p>
              </div>
              <div class="paypal paypal1">
                  <div class="paypal-box">
                      <div id="paypal-button-container1" class="paypal-button-container"></div>
                  </div>
                  <p class="paypal-price">USD 39.9/{{langCon.EN.y}}</p>
              </div>


          </div>
      </div>
  </div>
</template>

<script>
    import {payProductlist} from "./service/api";
    import {langCon} from "./assets/data/langCon.js";
    import {YXB} from "./service/YXB";
    import jq from './assets/config/jquery.min'
    import { Toast } from 'vant';
    export default {
        jq,
        data(){
            return{
                payProductCtoModelList:[],
                payInfos:{},
                loading:true,
                gopayPriceM:39800,
                gopayPriceY:398000,
                indomaretPriceM:39800,
                indomaretPriceY:398000,
                callback_url:'http://www.vidfish.com/',
            }
        },
        created:function(){
            this.langCon=langCon
        },
        mounted:function(){
            window.payInfo = this.payInfo
            // this.payInfo('EN,2248891667@qq.com,null,8B493345431DB9B80B4DAF32B3832441')

            payProductlist().then(res=>{
                console.log(res)
                if(res.code==0){
                    this.payProductCtoModelList=res.data.payProductCtoModelList
                    this.createOrder({method:'youxibi.paypal.finish.order', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[0].id}},YXB.url.zf,{price:3.9})
                    this.createOrder1({method:'youxibi.paypal.finish.order', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[1].id}},YXB.url.zf,{price:39.9})
                }
            })

        },
        methods:{
            pay(payMethod,type){
                Toast.loading({mask: true,duration:10000});
                if(payMethod=='gopay'){
                    if(type==0){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceM,
                            name:'Vidfish Month',
                            email:this.payInfos.email,
                            phone:this.payInfos.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[0].id}},YXB.url.zf,agrs,'gopay')
                    }
                    if(type==1){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceY,
                            name:'Vidfish Year',
                            email:this.payInfos.email,
                            phone:this.payInfos.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[1].id}},YXB.url.zf,agrs,'gopay')
                    }
                }
                if(payMethod=='indomaret'){
                    if(type==0){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.indomaretPriceM,
                            name:'Vidfish Month',
                            email:this.payInfos.email,
                            phone:this.payInfos.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[0].id}},YXB.url.zf,agrs,'indomaret')
                    }
                    if(type==1){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.indomaretPriceY,
                            name:'Vidfish Year',
                            email:this.payInfos.email,
                            phone:this.payInfos.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.payInfos.idCode,productId:this.payProductCtoModelList[1].id}},YXB.url.zf,agrs,'indomaret')
                    }
                }

            },
            midtransGetToken(option,url,agrs,payMethod){

                let data = YXB.getBaseCtoInfo(option.method,option.data)
                let ret=''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                data = ret
                url = url+'?'+data
                let obj={}
                if(payMethod=='gopay'){
                    obj = {"midtransCtoInfo":{
                            "transaction_details": {
                                "order_id":agrs.order_id,
                                "gross_amount": agrs.price,
                            },
                            "item_details": [{
                                "id": "ITEM1",
                                "price": agrs.price,
                                "quantity": 1,
                                "name": agrs.name,
                                "brand": "Midtrans",
                                "category": "Toys",
                                "merchant_name": "Midtrans"
                            }],
                            "customer_details": {
                                "first_name": "",
                                "last_name": agrs.email,
                                "email": agrs.email,
                                "phone": agrs.phone,
                            },
                            "enabled_payments": ["gopay"],
                            // "enabled_payments": ["mandiri,"],
                            // "enabled_payments": ["permata"],
                            // "enabled_payments": ["BNI"],
                            // "enabled_payments": ["indomaret"],
                            "gopay": {
                                "enable_callback": true,
                                "callback_url":this.callback_url
                            }
                        }}
                }
                if(payMethod=='indomaret'){
                    obj = {"midtransCtoInfo":{
                            "transaction_details": {
                                "order_id":agrs.order_id,
                                "gross_amount": agrs.price,
                            },
                            "item_details": [{
                                "id": "ITEM1",
                                "price": agrs.price,
                                "quantity": 1,
                                "name": agrs.name,
                                "brand": "Midtrans",
                                "category": "Toys",
                                "merchant_name": "Midtrans"
                            }],
                            "customer_details": {
                                "first_name": "",
                                "last_name": agrs.email,
                                "email": agrs.email,
                                "phone": agrs.phone,
                            },
                            // "enabled_payments": ["gopay"],
                            // "enabled_payments": ["mandiri,"],
                            // "enabled_payments": ["permata"],
                            // "enabled_payments": ["BNI"],
                            "enabled_payments": ["indomaret"],
                            // "gopay": {
                            //     "enable_callback": true,
                            //     "callback_url":this.callback_url
                            // }
                        }}
                }

                obj=JSON.stringify(obj)
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: obj,
                    dataType: "json",
                    contentType: "application/json;",
                    success: function(res){
                        console.log('gopay:',res)
                        if(res.code==0){
                            window.location.href=res.data.redirect_url
                            // Toast({mask:false});
                        }else{
                            Toast({message:res.message,duration:1500});
                        }
                    },
                })
            },
            getOrderId(){
                function CheckBarCode(s) {
                    var a = 0,b = 0,c = 0,d = 0,e = 0;
                    for (var i = 1; i <= 12; i++) {
                        var sc = parseInt(s[i - 1]);
                        if (i <= 12 && i % 2 == 0) {
                            a += sc;
                        }else if (i <= 11 && i % 2 == 1) {
                            b += sc;
                        }
                    }
                    c = a * 3;
                    d = b + c;
                    if (d % 10 == 0)  e = d - d;
                    else e = d + (10 - d % 10) - d;
                    return e;
                }
                function createBarcode(){
                    var str='69';
                    for(var i=0;i<10;i++){
                        str+=Math.floor(Math.random()*10);
                    }
                    var checkcode=CheckBarCode(str);
                    return str+checkcode;
                }
                return createBarcode()
            },
            payInfo(args){
                args=args.split(',')
                this.payInfos={
                    lang:args[0].replace(/\s*/g,""),
                    email:args[1].replace(/\s*/g,""),
                    phoneNumber:args[2].replace(/\s*/g,""),
                    idCode:args[3].replace(/\s*/g,""),
                }
                this.loading=false
            },
            createOrder(option,url,agrs){
                console.log(option,url,agrs)
                let _this=this
                let data = YXB.getBaseCtoInfo(option.method,option.data)
                let ret=''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                data = ret
                url = url+'?'+data
                paypal.Buttons({
                    style: {
                        layout:  'horizontal',
                        color:   'white',
                        shape:   'rect',
                        label:   'paypal'
                    },
                    createOrder: function(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value:agrs.price
                                }
                            }]
                        });
                    },

                    onApprove: function(data, actions) {
                        return actions.order.capture().then(function(details) {
                            return fetch(url,{
                                method: 'post',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "object":{
                                        "orderID": data.orderID
                                    }
                                })
                            }).then(function(response) {
                                return response.json();
                            }).then(function(res) {
                                console.log('回调状态：',res);
                                if(res.code==0){
                                    location.reload()
                                }else{
                                    Toast({message:res.message,duration:1500});
                                }

                            });

                        });
                    },
                }).render('#paypal-button-container');
            },
            createOrder1(option,url,agrs){
                console.log(option,url,agrs)
                let _this=this
                let data = YXB.getBaseCtoInfo(option.method,option.data)
                let ret=''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                data = ret
                url = url+'?'+data
                paypal.Buttons({
                    style: {
                        layout:  'horizontal',
                        color:   'white',
                        shape:   'rect',
                        label:   'paypal'
                    },
                    createOrder: function(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value:agrs.price
                                }
                            }]
                        });
                    },
                    onApprove: function(data, actions) {
                        return actions.order.capture().then(function(details) {
                            return fetch(url,{
                                method: 'post',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "object":{
                                        "orderID": data.orderID
                                    }
                                })
                            }).then(function(response) {
                                return response.json();
                            }).then(function(res) {
                                console.log(res);
                                if(res.code==0){
                                    location.reload()
                                }else{
                                    Toast({message:res.message,duration:1500});
                                }

                            });

                        });
                    },
                }).render('#paypal-button-container1');
            },
        },



    }
</script>

<style>
  @import "./assets/css/normalize.css";
    body{
        width: 100%;
        background: #000;
    }
  .center{
      height:1334px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .no-center{
      height:auto;
  }
    .bg{
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 0;
    }
    .bg img{
        width: 100%;
    }
    .content{
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
        background: rgba(0,0,0,.7);
        min-height: 100%;
    }
    .logo{
        width:118px ;
        height: 118px;
        display: block;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
        margin-top: 102px;
        margin-bottom: 70px;
    }
.top-box{
    width: 100%;
    height: 380px;
}
    .logo-top{
        width: 100%;
        display: block;
    }
    .logo-top img{
        width: 100%;
    }

    .logo img{
        width: 100%;
    }

    .passes{
        font-size: 45px;
        color: #fff;
        text-align: center;
        font-family:Arial;
        font-weight: bold;
        margin-top: 0;
    }
    .product li{
        margin: 0 auto;
        width: 622px;
        height: 144px;
        overflow: hidden;
        border-radius: 50px;
        margin-bottom: 36px;
        display: flex;
        /*align-items: center;*/


    }
    .product li:nth-child(1){
        background:linear-gradient(35deg,rgba(208,25,141,1),rgba(83,15,134,1));
    }
    .product li:nth-child(2){
       background:linear-gradient(35deg,rgba(211,148,37,1),rgba(255,97,44,1));
    }
    .indomaret li:nth-child(1){
        background:linear-gradient(35deg,rgba(44,76,135,1),rgba(36,153,191,1));
    }
    .indomaret li:nth-child(2){
        background:linear-gradient(35deg,rgba(101,123,15,1),rgba(19,91,43,1));
    }
    .pay-logo{
        width: 226px;
        height: 61px;
        overflow: hidden;
        display: block;
        margin-top: 39px;
        margin-right: 13px;
    }
    .pay-logo img{
        width: 100%;
    }
    .r{

    }
    .r p:nth-child(1){
        color: #fff;
        font-family: Arial;
        font-size: 29px;
        margin: 0;
        padding: 0;
        margin-top: 39px;
        margin-bottom: 10px;
    }
    .r p:nth-child(2){
        color: #fff;
        font-family: Arial;
        font-size: 24px;
        margin: 0;
        padding: 0;

    }
    .paypal{
        width: 622px;
        height: 144px;
        overflow: hidden;
        background:linear-gradient(35deg,rgba(208,25,141,1),rgba(83,15,134,1));
        margin: 0 auto;
        border-radius: 50px;
        margin-bottom: 36px;

    }
    .paypal1{
        background:linear-gradient(35deg,rgba(211,148,37,1),rgba(255,97,44,1));
    }
    .paypal-box{
        width: 622px;
        height: 100px;
        overflow: hidden;
    }
    .paypal-price{
        color: #fff;
        text-align: center;
        position: relative;
        bottom: 25px;
        font-family: 微软雅黑;
        font-size: 28px;
    }

</style>
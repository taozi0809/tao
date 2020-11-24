<template>
    <div class="pay">
        <Head/>
        <div class="top"></div>
        <section class="main">
            <div class="con">
                <div class="nav">
                    <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</div>
                    <ul>
                        <li @click="$router.push({path:'/account'})">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</li>
                        <li @click="$router.push({path:'/sub_account'})">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.subAccount:''}}</li>
                        <li class="active">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membership:''}}</li>
                    </ul>
                </div>
                <div class="details">
                    <div class="membership-billing">
                        <div>
                            <p class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membershipTitle:''}}</p>
                            <div class="vip-type-list">
                                <ul>
                                    <li :class="cardIndex==index?'active':''" v-for="(item,index) in payProductCtoModelList" @click="product(index,item)">
                                        <span v-if="cardIndex==index"><img src="../../assets/img/accountSet/card-active.png" alt="card"></span>
                                        <span v-if="cardIndex!=index"><img src="../../assets/img/accountSet/card.png" alt="card"></span>
                                        <p v-if="lang.lang=='ZH'">{{item.name}}</p>
                                        <p v-if="lang.lang=='EN'">{{item.englishName}}</p>
                                        <p v-if="lang.lang=='IND'">{{item.indiaName}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="promotion-code">
                                <p class="label">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.freeCode:''}}</p>
                                <div class="value">
                                    <input type="text" v-model="freeCode">
                                    <div class="btn" @click="freeCodeSubmit">Submit</div>
                                </div>
                            </div>

                            <div class="pay-list">
                                <p class="payment">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.payment:''}}</p>
                                <div class="paypal-box" :class="cardIndex==0?'show':'hide'">
                                    <div id="paypal-button-container" class="paypal-button-container"></div>
                                    <div class="price">
                                        <p class="price" v-if="payIndex==0">USD {{cardIndex==0?paypalPriceM:paypalPriceY}}</p>
                                    </div>
                                </div>
                                <div class="paypal-box" :class="cardIndex==1?'show':'hide'">
                                    <div id="paypal-button-container1" class="paypal-button-container"></div>
                                    <div class="price">
                                        <p class="price" v-if="payIndex==0">USD {{cardIndex==0?paypalPriceM:paypalPriceY}}</p>
                                    </div>
                                </div>
                                <ul>
                                    <li v-for="(item,index) in defrayPlatformCtoModelList" @click="buy(item)">
                                        <span><img :src="item.logoPc" alt="logo"></span>
                                        <div class="price" v-if="item.platform=='Gopay'">
                                            <p class="price" v-if="payIndex==0">IDR {{cardIndex==0?gopayPriceM:gopayPriceY}}</p>
                                        </div>
                                        <div class="price" v-if="item.platform=='Indomaret'">
                                            <p class="price" v-if="payIndex==0">IDR {{cardIndex==0?gopayPriceM:gopayPriceY}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="hint">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.hint:''}}</div>
                            <div class="vip-privilege">
                                <ul>
                                    <li>
                                        <span><img src="../../assets/img/accountSet/icon/icon1.png" alt="icon"></span>
                                        <p>Huge Content Library</p>
                                    </li>
                                    <li>
                                        <span><img src="../../assets/img/accountSet/icon/icon2.png" alt="icon"></span>
                                        <p>High Definition Videos</p>
                                    </li>
                                    <li>
                                        <span><img src="../../assets/img/accountSet/icon/icon3.png" alt="icon"></span>
                                        <p>Watch History, Bookmarks, Ratings</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <message ref="message"/>
        <load ref="load"/>
        <div class="received-code" v-if="receivedCodeShow">
            <div class="box">
                <div class="close" @click="receivedCodeShow=false">×</div>
                <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.codeTitle:''}}</div>
                <div class="des">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.codeDes[0]:''}}</div>
                <div class="des">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.codeDes[1]:''}}</div>
                <div class="des">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.codeDes[2]:''}}</div>
                <div class="btn">
                    <div class="btn1" @click="buyNow">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.buyNow:''}}</div>
                    <div class="btn2" @click="receivedCodeShow=false">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.later:''}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/Head'
    import {mapState, mapMutations} from 'vuex'
    import {getLocalStore,setLocalStore} from "../../storage";
    import {defrayPlatformList,userSetting,emailSendCheckCode,paypalPay,payProductlist,rechargeUse,freeCodeUse} from "../../service/api";
    import {langCon} from "../../assets/data/langCon";
    import {YXB} from "../../assets/config/YXB";
    import Datepicker from 'vuejs-datepicker';
    import {en, id,zh} from 'vuejs-datepicker/dist/locale'


    export default {
        metaInfo: {
            title: 'Vidfish Pass - Watch Latest VIP Videos, Remove Ads, and More',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, HD streaming drama, free chinese drama, full chinese dramas, watch chinese drama online, popular chinese drama 2019, chinese drama streaming'
            },
            {
                name: 'description',
                content: 'Grab your Vidfish Pass to gain access to all the latest VIP Videos. Other perks: removing all ads, unlimited offline downloads and exclusive videos.'
            }],
        },
        components:{Head,Datepicker},
        data(){
            return{
                headimg1:'this.src="'+ require('../../assets/img/headimg-vip.png') +'"',
                headimg2:'this.src="'+ require('../../assets/img/headimg-notVip.png') +'"',
                activeCardIndex:0,
                lon:'',
                lat:'',
                anchor:0,
                token:'',
                defrayPlatformCtoModelList:[],
                timeNum:60,
                timeNum2:60,
                TIMECONTENT:60,
                emailType:0,
                authCode1:'',
                authCode3:'',
                authCodeContent:'',
                authCodeContent2:'',
                email2:'',
                activePayIndex:0,
                payProductCtoModelList:[],
                id:null,
                successUrl:`${YXB.url.zf}/pay/success`,
                cancelUrl:`${YXB.url.zf}/pay/cancel`,
                return_url:`${YXB.url.zf}/paypal/subscription/success`,
                cancel_url:`${YXB.url.zf}/paypal/subscription/cancel`,
                callback_url:'https://www.vidfish.com/',
                productType:1,
                paypalPriceM:3.990,
                paypalPriceY:39.90,
                gopayPriceM:39800,
                gopayPriceY:398000,
                cardIndex:0,
                payIndex:0,
                en:en,
                ind:id,
                zh:zh,
                newBirthday:'',
                paypalPrice:0,
                receivedCodeShow:false,
                promotionCode:'',
                freeCode:'',
            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo','country']),
            birthdayRub(){
                let timestampToTime1 = value =>{
                    if(value){
                        let date = new Date(value );
                        let Y = date.getFullYear() + '-';
                        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        let D = date.getDate() + ' ';
                        let h = date.getHours() + ':';
                        let m = date.getMinutes() ;
                        let s = date.getSeconds();
                        return Y+M+D
                    }
                }
                return timestampToTime1(this.userInfo.birthday)
            },
        },
        created:function(){
            this.token = getLocalStore('token')
            this.langCon = langCon
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lat
            }


            payProductlist().then(res=>{
                console.log('产品列表:',res)
                if(res.code==0){
                    this.payProductCtoModelList = res.data.payProductCtoModelList
                    this.id=this.payProductCtoModelList[0].id
                    if(this.payProductCtoModelList[0].productType==0){
                        this.getDefrayPlatformList(this.country,'single')
                    }else{
                        this.getDefrayPlatformList(this.country,'auto')
                    }
                    this.createOrder({method:'youxibi.paypal.finish.order', data:{idCode:this.userInfo.idCode,productId:this.payProductCtoModelList[0].id}},YXB.url.zf,{price:3.9})
                    this.createOrder1({method:'youxibi.paypal.finish.order', data:{idCode:this.userInfo.idCode,productId:this.payProductCtoModelList[1].id}},YXB.url.zf,{price:39.9})
               }
            })
        },
        mounted:function(){
            if(!this.isLogin){
                switch (this.lang.lang) {
                    case 'ZH':
                        // this.$refs.message.Message('您尚未登录。立即登录！');
                        alert('您尚未登录。立即登录！');
                        break;
                    case 'EN':
                        // this.$refs.message.Message('You are not logged in. Login now! ');
                        alert('You are not logged in. Login now! ');
                        break;
                    case 'IND':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'ES':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'PT':
                        // this.$refs.message.Message('Você não está logado. Entre agora!');
                        alert('Você não está logado. Entre agora!');
                        break;
                    default:
                        alert('You are not logged in. Login now! ');
                }
                this.$router.push('/home')
            }
            this.newBirthday = this.birthdayRub
        },
        methods:{
            ...mapMutations(['USERINFO','ISLOGIN']),

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
                        _this.$refs.load.Load(true)
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
                                    _this.$refs.load.Load(false)
                                    location.reload()
                                }else{
                                    _this.$refs.load.Load(false)
                                    _this.$refs.message.Message(res.message);
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
                        _this.$refs.load.Load(true)
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
                                    _this.$refs.load.Load(false)
                                    location.reload()
                                }else{
                                    _this.$refs.load.Load(false)
                                    _this.$refs.message.Message(res.message);
                                }

                            });

                        });
                    },
                }).render('#paypal-button-container1');
            },
            handleNav(i){
                this.anchor=i
                if(i==1){
                    payProductlist().then(res=>{
                        console.log('产品列表:',res)
                        if(res.code==0){
                            this.payProductCtoModelList = res.data.payProductCtoModelList
                            this.id=this.payProductCtoModelList[0].id
                            if(this.payProductCtoModelList[0].productType==0){
                                this.getDefrayPlatformList(this.country,'single')
                            }else{
                                this.getDefrayPlatformList(this.country,'auto')
                            }

                            this.createOrder({method:'youxibi.paypal.finish.order', data:{idCode:this.userInfo.idCode,productId:this.payProductCtoModelList[0].id}},YXB.url.zf,{price:3.99})
                            this.createOrder1({method:'youxibi.paypal.finish.order', data:{idCode:this.userInfo.idCode,productId:this.payProductCtoModelList[1].id}},YXB.url.zf,{price:39.9})
                        }
                    })
                }
            },
            handleLogout(){
                this.ISLOGIN(false)
                setLocalStore('token','')
                this.$router.push({
                    path:'/'
                })
            },
            product(i,item){
                this.id=item.id
                this.cardIndex=i
                if(item.productType==0){
                    this.getDefrayPlatformList(this.country,'single')
                }else{
                    this.getDefrayPlatformList(this.country,'auto')
                }
            },
            buy(item){
                this.$refs.load.Load(true)
                if(item.platform=='Gopay'){
                    if(this.cardIndex==0){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceM,
                            name:'Vidfish Month',
                            email:this.userInfo.email,
                            phone:this.userInfo.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.userInfo.idCode,productId:this.id}},YXB.url.zf,agrs,'gopay')
                    }
                    if(this.cardIndex==1){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceY,
                            name:'Vidfish Year',
                            email:this.userInfo.email,
                            phone:this.userInfo.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.userInfo.idCode,productId:this.id}},YXB.url.zf,agrs,'gopay')

                    }
                }
                if(item.platform=='Indomaret'){
                    if(this.cardIndex==0){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceM,
                            name:'Indomaret Month',
                            email:this.userInfo.email,
                            phone:this.userInfo.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.userInfo.idCode,productId:this.id}},YXB.url.zf,agrs,'indomaret')
                    }
                    if(this.cardIndex==1){
                        let agrs={
                            order_id:this.getOrderId(),
                            price:this.gopayPriceY,
                            name:'Indomaret Year',
                            email:this.userInfo.email,
                            phone:this.userInfo.phoneNumber,
                        }
                        this.midtransGetToken({method:'youxibi.midtrans.get.token', data:{idCode:this.userInfo.idCode,productId:this.id}},YXB.url.zf,agrs,'indomaret')
                    }
                }




            },
            changeUserSetting(token,birthday,cancellation,gender,isPush,parentControl,parentPassword,userName,email,phoneNumber,changeEmailCode,changePhoneCode){
                this.$refs.load.Load(true)
                userSetting(token,birthday,cancellation,gender,isPush,parentControl,parentPassword,userName,email,phoneNumber,changeEmailCode,changePhoneCode).then(res=>{
                    console.log('修改用户信息:',res)
                    if(res.code==0){
                        this.USERINFO(res.data)
                    }
                    this.$refs.load.Load(false)
                })
            },

            getDefrayPlatformList(country,enable){
                this.defrayPlatformCtoModelList=[]
                defrayPlatformList(country,enable).then(res=>{
                    console.log('支付平台列表：',res)
                    if(res.code==0){
                        this.defrayPlatformCtoModelList = res.data.defrayPlatformCtoModelList
                    }
                })
            },
            getSstartTime(){
                let t = (new Date()).getTime()+1000
                function myTimeToLocal(inputTime){
                    if(!inputTime && typeof inputTime !== 'number'){
                        return '';
                    }
                    var localTime = '';
                    inputTime = new Date(inputTime).getTime();
                    const offset = (new Date()).getTimezoneOffset();
                    localTime = (new Date(inputTime - offset * 60000)).toISOString();
                    localTime = localTime.substr(0, localTime.lastIndexOf('.'));
                    return localTime+'Z';
                }
                return myTimeToLocal(t)
            },



            midtransGetToken(option,url,agrs,payMethod){
                let _this = this
                let data = YXB.getBaseCtoInfo(option.method,option.data)
                let ret=''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                data = ret
                url = url+'?'+data
                // let obj = {"midtransCtoInfo":{
                //         "transaction_details": {
                //             "order_id":agrs.order_id,
                //             "gross_amount": agrs.price,
                //         },
                //         "item_details": [{
                //             "id": "ITEM1",
                //             "price": agrs.price,
                //             "quantity": 1,
                //             "name": agrs.name,
                //             "brand": "Midtrans",
                //             "category": "Toys",
                //             "merchant_name": "Midtrans"
                //         }],
                //         "customer_details": {
                //             "first_name": "",
                //             "last_name": agrs.email,
                //             "email": agrs.email,
                //             "phone": agrs.phone,
                //         },
                //         "enabled_payments": ["gopay"],
                //         // "enabled_payments": ["mandiri,"],
                //         // "enabled_payments": ["permata"],
                //         // "enabled_payments": ["BNI"],
                //         // "enabled_payments": ["indomaret"],
                //         "gopay": {
                //             "enable_callback": true,
                //             "callback_url":this.callback_url
                //         }
                //     }
                // }
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
                        }else{
                            _this.$refs.load.Load(false)
                            _this.$refs.message.Message(res.message);
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
            submit(){
                if(!!this.promotionCode){
                    this.receivedCodeShow=true
                }
            },
            freeCodeSubmit(){
                if(!!this.freeCode){
                    freeCodeUse(this.token,this.freeCode,YXB.partnerKey,this.country,this.lang.lang).then(res=>{
                        console.log('使用免费码',res)
                        if(res.code==0){
                            this.freeCode=''
                            var data = this.userInfo
                            data.isVip=0
                            this.USERINFO(data)
                            if(this.lang.lang=='ZH'){this.$refs.message.Message('使用成功')}
                            if(this.lang.lang=='EN'){this.$refs.message.Message('Apploied')}
                            if(this.lang.lang=='IND'){this.$refs.message.Message('Sukses')}
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
            buyNow(){
                rechargeUse(this.userInfo.token,this.promotionCode,YXB.partnerKey).then(res=>{
                    console.log('使用code：',res)
                    if(res.code==0){
                        this.promotionCode=''
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                    this.receivedCodeShow=false
                })
            }

        },
        watch:{
            isLogin(newValue,oldValue){
                if(newValue!=oldValue){
                    if(!newValue){
                        this.$router.push('/')
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pay{
        .top{
            position: absolute;
            width: 100%;
            height: 750px;
            background: url("../../assets/img/bg.png") no-repeat;
            background-size: cover;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .main{
            position: absolute;
            top:150px;
            min-width: 1200px;
            width: 100%;
            box-sizing: border-box;
            padding: 0 60px;
            .con{
                width: 100%;
                min-width: 1200px;
                display: flex;
                .nav{
                    width: 260px;
                    border: 1px solid #fff;
                    box-sizing: border-box;
                    flex:  0 0 auto;
                    height: 240px;
                    overflow: hidden;
                    .title{
                        font-size: 32px;
                        font-weight: bold;
                        color: #f7f7f7;
                        height: 60px;
                        line-height: 60px;
                        box-sizing: border-box;
                        padding: 0 10px;
                    }
                    ul{
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        li{
                            font-size: 16px;
                            font-weight: bold;
                            color: #fff;
                            cursor: pointer;
                            height: 60px;
                            line-height: 60px;
                            box-sizing: border-box;
                            padding: 0 10px;
                        }
                        .active{
                            cursor: default;
                            background: #358dfe;
                            /*background: #62a4fa;*/
                        }

                    }
                }
                .details{
                    flex: 1 1 auto;
                    .account-settings{
                        .head{
                            margin-bottom: 30px;
                            span{
                                display: block;
                                width: 80px;
                                height: 80px;
                                overflow: hidden;
                                margin: 0 auto;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                        .form{
                            width: 100%;
                            min-width: 1000px;
                            margin: 0 auto;
                            height: 400px;
                            background: #000;
                            box-sizing: border-box;
                            padding: 30px 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .form-container{
                                width: 100%;
                                padding: 0 30px;
                                box-sizing: border-box;
                                .row{
                                    display: flex;
                                    align-items: center;
                                    min-width: 1000px;
                                    width: 100%;
                                    .item{
                                        display: flex;
                                        align-items: center;
                                        margin-bottom: 30px;
                                        width: 45%;
                                        min-width: 500px;
                                        box-sizing: border-box;
                                        p{
                                            color: #fff;
                                            font-size: 18px;
                                            width:180px;
                                            white-space: nowrap;
                                        }
                                        .r{
                                            display: flex;
                                            align-items: center;
                                            border-bottom: 1px solid #fff;
                                            padding: 6px;
                                            position: relative;
                                            box-sizing: border-box;
                                            flex: 1;
                                            input{
                                                color: #fff;
                                                background: none;
                                                border: none;
                                                font-size: 18px;
                                            }
                                            input:focus {
                                                outline: none;
                                            }
                                            .change{
                                                cursor: pointer;
                                                font-size: 16px;
                                                color: #358dfe;
                                                position: absolute;
                                                right: 0;
                                            }
                                            .qh{
                                                position: absolute;
                                                width: 30px;
                                                display: block;
                                                right: 0;
                                                cursor: pointer;
                                                img{
                                                    width: 100%;
                                                }
                                            }
                                            .authCodeBtn{
                                                cursor: pointer;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                position: absolute;
                                                right: 0;
                                                color: #358dfe;
                                            }
                                        }
                                    }
                                    .c{
                                        width: 60px;
                                    }


                                }
                                .save,.change-password{
                                    display: inline-block;
                                    height: 30px;
                                    line-height: 30px;
                                    text-align: center;
                                    background: #358dfe;
                                    color: #fff;
                                    border-radius: 30px;
                                    margin: 0 auto;
                                    margin-top: 50px;
                                    cursor: pointer;
                                    padding: 4px 30px;
                                }
                                .change-password{
                                    position: relative;
                                    left: -40px;
                                }
                            }
                            .zh{
                                .row{
                                    .item{
                                        p{
                                            width: 60px;
                                        }
                                    }
                                }
                            }
                            .en{
                                .row{
                                    .item{
                                        p{
                                            width: 140px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .membership-billing{
                        width: 100%;
                        overflow: hidden;
                        .title{
                            color: #fff;
                            font-size: 24px;
                            width: 100%;
                            padding: 0 30px;
                            box-sizing: border-box;
                            margin-bottom: 15px;
                        }
                        .limited{
                            color: #fff;
                            font-size: 14px;
                            width: 100%;
                            padding: 0 30px;
                            box-sizing: border-box;
                            margin-bottom: 30px;
                        }
                        .vip-type-list{
                            width: 100%;
                            margin-bottom: 30px;
                            ul{
                                box-sizing: border-box;
                                width: 100%;
                                padding: 0 30px;
                                display: flex;
                                align-items: center;
                                li{
                                    width: 200px;
                                    border-radius: 40px;
                                    position: relative;
                                    margin-right: 15px;
                                    cursor: pointer;
                                    span{
                                        display: block;
                                        width: 200px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    p{
                                        position: absolute;
                                        top: 50%;
                                        left:50%;
                                        transform: translate(-50%,-50%);
                                        color: #fff;
                                        font-size: 18px;
                                        white-space :nowrap;
                                    }
                                }
                                .active{
                                    /*background: #ffc510;*/
                                    p{
                                        color: #000;
                                    }
                                }
                            }
                        }
                        .promotion-code,.freeCode{
                            width: 100%;
                            margin-left: 30px;
                            margin-bottom: 30px;
                            .label{
                                color: #fff;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .value{
                                display: flex;
                                align-items: center;
                                width: 420px;
                                border-bottom: 1px solid #fff;
                                input{
                                    border: none;
                                    background: transparent;
                                    width: 500px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 18px;
                                    color: #fff;
                                    outline: none;
                                }
                                .btn{
                                    color: #358dfe;
                                    cursor: pointer;
                                }
                            }
                        }
                        .pay-list{
                            box-sizing: border-box;
                            margin: 0 30px;
                            margin-bottom: 15px;
                            .payment{
                                color: #fff;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .paypal-box{
                                display: flex;
                                align-items: center;
                                height: 34px;
                                margin-bottom: 20px;
                                .paypal-button-container{
                                    width: 260px;
                                    height: 34px;
                                    overflow: hidden;
                                    margin-right: 60px;
                                }
                            }
                            .show{
                                display: flex;
                            }
                            .hide{
                                display: none;
                            }
                            ul{
                                li{
                                    cursor: pointer;
                                    margin-right: 30px;
                                    box-sizing: border-box;
                                    margin-bottom: 20px;
                                    text-align: center;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 260px;
                                        overflow: hidden;
                                        background: #fff;
                                        height: 34px;
                                        cursor: pointer ;
                                        border-radius: 3px;
                                        margin-right: 60px;
                                        img{
                                            height: 100%;
                                        }
                                    }

                                }
                            }
                            .price{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    color: #fff;
                                    position: relative;
                                    margin-right: 20px;
                                }
                                .line:after{
                                    content: '';
                                    display: block;
                                    width: 100%;
                                    height: 2px;
                                    background: #ff0000;
                                    border-radius: 5px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                p:nth-child(2){
                                    color: #fff;
                                }
                            }


                        }
                        .hint{
                            width: 100%;
                            padding: 0 30px;
                            margin-bottom: 15px;
                            color: #ffb632;
                        }
                        .total{
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            justify-content: space-between;
                            padding: 0 30px;
                            margin-bottom: 30px;
                            width: 100%;
                            .l{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    margin-right: 10px;
                                    color: #fff;
                                }
                                p:nth-child(2){
                                    display: block;
                                    color: #ff4949;
                                    border: 1px solid #ff4949;
                                    border-radius: 5px;
                                    padding: 4px 10px;
                                    box-sizing: border-box;
                                }
                            }
                            .r{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    color: #fff;
                                    position: relative;
                                    margin-right: 20px;
                                }
                                p:nth-child(1):after{
                                    content: '';
                                    display: block;
                                    width: 100%;
                                    height: 2px;
                                    background: #ff0000;
                                    border-radius: 5px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                p:nth-child(2){
                                    color: #fff;
                                }
                            }
                        }
                        .vip-privilege{
                            margin-bottom: 30px;
                            ul{
                                box-sizing: border-box;
                                padding: 0 30px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                li{
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 30px;
                                        margin-right: 15px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    p{
                                        color: #fff;
                                        font-size: 16px;
                                    }
                                }
                            }
                        }

                        .join{
                            width: 100%;
                            box-sizing: border-box;
                            padding: 0 30px;
                            display: flex;
                            margin-bottom: 30px;
                            span{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: 5px;
                                color: #fff;
                                font-size: 18px;
                                cursor: pointer;
                                width: 268px;
                                height: 65px;
                                background: url("../../assets/img/accountSet/buy.png") no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
            }
        }
        .received-code{
            width: 100%;
            position: absolute;
            z-index: 9999;
            height: 100%;
            top: 0;
            bottom: 0;
            background: rgba(0,0,0,.6);
            display: flex;
            align-items: center;
            justify-content: center;
            .box{
                background: #000;
                border: 1px solid #fff;
                border-radius: 30px;
                width: 500px;
                height: 300px;
                position: relative;
                .close{
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    color: #fff;
                    font-size:26px;
                    cursor: pointer;
                }
                .title{
                    color: #fff;
                    font-size: 18px;
                    text-align: center;
                    margin-top: 40px;
                }
                .des{
                    color: #fff;
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box;
                    margin-top: 15px;
                    line-height: 1.5;
                    text-align: center;
                }
                .btn{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 40px;
                    .btn1{
                        width: 225px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 50px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 30px;
                        background:linear-gradient(35deg,rgba(208,25,141,1),rgba(83,15,134,1));
                        cursor: pointer;
                    }
                    .btn2{
                        width: 225px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 50px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 30px;
                        background:linear-gradient(35deg,rgba(44,76,135,1),rgba(36,153,191,1));
                        cursor: pointer;
                    }
                }
            }
        }
        .right-web{
            position: absolute;
            width: 400px;
            height: 400px;
            right: 80px;
            top: -20px;
            img{
                width: 100%;
            }
        }
    }

</style>
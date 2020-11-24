<template>
    <div class="user">
        <Head/>
        <div class="top"></div>
        <section class="main">
            <div class="con">
                <div class="nav" :class="!!userInfo.parentId?'subAccount':''">
                    <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</div>
                    <ul>
                        <li class="active">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</li>
                        <li @click="$router.push({path:'/sub_account'})">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.subAccount:''}}</li>
                        <li @click="linkPay" v-if="!userInfo.parentId">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membership:''}}</li>
                    </ul>
                </div>
                <div class="details">
                    <div class="account-settings">
                        <div class="head">
                            <span v-if="userInfo.isVip==0"><img :src="userInfo.photoUrl==null?'':userInfo.photoUrl" alt="head-img" :onerror="headimg1"></span>
                            <span v-if="userInfo.isVip!=0"><img :src="userInfo.photoUrl==null?'':userInfo.photoUrl" alt="head-img" :onerror="headimg2"></span>
                        </div>
                        <div class="form">
                            <div class="form-container">
                                <div class="row">
                                    <div class="item">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.name:''}}</p>
                                        <div class="r">
                                            <input type="text" v-model="userInfo.userName">
                                            <div class="change" @click="changeUserSetting(token,userInfo.birthday,userInfo.cancellation,userInfo.gender,userInfo.isPush,userInfo.parentControl,userInfo.parentPassword,userInfo.userName,userInfo.email,userInfo.phoneNumber,userInfo.changeEmailCode,userInfo.changePhoneCode)">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.change:''}}</div>
                                        </div>
                                    </div>
                                    <div class="c"></div>
                                    <div class="item">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.birthdays:''}}</p>
                                        <div class="r">
                                            <datepicker type="date" format="yyyy-MM-dd" input-class="date-input" v-model="newBirthday" v-if="lang.lang=='EN'" :language="en"></datepicker>
                                            <datepicker type="date" format="yyyy-MM-dd" input-class="date-input" v-model="newBirthday" v-if="lang.lang=='ZH'" :language="zh"></datepicker>
                                            <datepicker type="date" format="yyyy-MM-dd" input-class="date-input" v-model="newBirthday" v-if="lang.lang=='IND'" :language="ind"></datepicker>
                                            <div class="change" @click="handleChangeBirthday">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.change:''}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="item" v-if="emailStatus==0">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.email:''}}</p>
                                        <div class="r">
                                            <input type="text" v-model="userInfo.email" v-if="!userInfo.parentId">
                                            <div class="authCodeBtn" @click="changeEmail" v-if="!userInfo.parentId">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.change:''}}</div>
                                            <input type="text" v-model="userInfo.email" disabled v-if="!!userInfo.parentId">

                                        </div>
                                    </div>
                                    <div class="item" v-if="emailStatus==1">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.email:''}}</p>
                                        <div class="r">
                                            <input type="text" v-model="newEmail" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.newEmailDes:''">
                                            <div class="authCodeBtn" @click="handleSendAuthCode">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCodeBtn:''}}</div>
                                        </div>
                                    </div>
                                    <div class="item" v-if="emailStatus==2">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCode:''}}</p>
                                        <div class="r">
                                            <input type="text" v-model="authCode1" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.authDes:''">
                                            <div class="change" @click="handleAuthCode1">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.change:''}}（{{timeNum}}s）</div>
                                        </div>
                                    </div>

                                    <div class="c"></div>
                                    <div class="item">
                                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.gender:''}}</p>
                                        <div class="r">
                                            <input v-if="lang.lang=='ZH'" type="text" v-model="userInfo.gender==0?'男':'女'" disabled>
                                            <input v-if="lang.lang=='EN'" type="text" v-model="userInfo.gender==0?'Male':'Female'" disabled>
                                            <input v-if="lang.lang=='IND'" type="text" v-model="userInfo.gender==0?'Pria':'Wanita'" disabled>
                                            <span class="qh" @click="changeUserSetting(token,userInfo.birthday,userInfo.cancellation,userInfo.gender==0?userInfo.gender=1:userInfo.gender=0,userInfo.isPush,userInfo.parentControl,userInfo.parentPassword,userInfo.userName,userInfo.email,userInfo.phoneNumber,userInfo.changeEmailCode,userInfo.changePhoneCode)">
                                                <img src="../../assets/img/qh.png" alt="qh"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="change-password" v-if="!userInfo.parentId" @click="handleChangePassword">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.changePassword:''}}</div>
                                    <div class="change-password" @click="handleLogout">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.logout:''}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <message ref="message"/>
        <load ref="load"/>
    </div>
</template>

<script>
    import Head from '../../components/Head'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../../assets/data/langCon";
    import Datepicker from 'vuejs-datepicker';
    import {en, id,zh} from 'vuejs-datepicker/dist/locale'
    import {YXB} from "../../assets/config/YXB";
    import {getLocalStore,setLocalStore} from "../../storage";
    import {userSetting,emailSendCheckCode,rechargeUse,freeCodeUse} from "../../service/api";
    export default {
        metaInfo: {
            title: 'Your Account - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
            {
                name: 'description',
                content: 'Update your Vidfish account information by editing your name, password, birthday, email, and gender information here. '
            }],
        },
        components:{Head,Datepicker},
        data(){
            return{
                langCon:langCon,
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
                emailStatus:0,
                newEmail:'',
                oldEmail:'',
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
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lat
            }

        },
        mounted:function(){
            this.newBirthday = this.birthdayRub
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
        },
        methods:{
            ...mapMutations(['USERINFO','ISLOGIN']),
            handleLogout(){
                this.ISLOGIN(false)
                setLocalStore('token','')
                this.$router.push({
                    path:'/'
                })
            },
            linkPay(){
                if(this.userInfo.isVip==0){this.$router.push({path:'/member'})}
                if(this.userInfo.isVip!=0){this.$router.push({path:'/pay'})}
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
            handleSendAuthCode(){
                if(!!this.newEmail){
                    emailSendCheckCode(null,this.newEmail,this.lang.lang).then(res=>{
                        console.log('注册码发送:',res)
                        if(res.code==0){
                            this.authCodeContent=res.data.content
                            this.timeNum = this.TIMECONTENT
                            let timer = setInterval(() => {
                                if (this.timeNum > 0 && this.timeNum <= this.TIMECONTENT) {
                                    this.timeNum--;
                                } else {
                                    this.emailType==1?this.emailType=0:''
                                    clearInterval(timer);
                                }
                            }, 1000)
                            switch (this.lang.lang){
                                case 'ZH':
                                    this.$refs.message.Message(`我们已发送验证码到${this.userInfo.email}，请查看邮箱。`);
                                    break;
                                case 'EN':
                                    this.$refs.message.Message(`We have sent the verification code to ${this.userInfo.email}, please check your mailbox.`);
                                    break;
                                case 'IND':
                                    this.$refs.message.Message(`Kami telah mengirimkan kode verifikasi ke ${this.userInfo.email}, silakan periksa kotak surat Anda`);
                                    break;
                                case 'PT':
                                    this.$refs.message.Message(`Nós enviamos o código de verificação para ${this.email2}, por favor, verifique o e-mail.`);
                                    break;
                                case 'ES':
                                    this.$refs.message.Message(`Hemos enviado el código de verificación a ${this.email2}`);
                                    break;
                            }
                            this.emailStatus=2
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
            handleSendAuthCode2(){
                if(!!this.email2){
                    emailSendCheckCode(null,this.email2,this.lang.lang).then(res=>{
                        console.log('注册码发送2:',res)
                        if(res.code==0){
                            this.authCodeContent2=res.data.content
                            this.timeNum2 = this.TIMECONTENT
                            let timer = setInterval(() => {
                                if (this.timeNum2 > 0 && this.timeNum2 <= this.TIMECONTENT) {
                                    this.timeNum2--;
                                } else {
                                    this.emailType==3?this.emailType=2:''
                                    clearInterval(timer);
                                }
                            }, 1000)
                            switch (this.lang.lang){
                                case 'ZH':
                                    this.$refs.message.Message(`我们已发送验证码到${this.email2}，请查看邮箱。`);
                                    break;
                                case 'EN':
                                    this.$refs.message.Message(`We have sent the verification code to ${this.email2}, please check your mailbox.`);
                                    break;
                                case 'IND':
                                    this.$refs.message.Message(`Kami telah mengirimkan kode verifikasi ke ${this.email2}, silakan periksa kotak surat Anda`);
                                    break;
                                case 'PT':
                                    this.$refs.message.Message(`Nós enviamos o código de verificação para ${this.email2}, por favor, verifique o e-mail.`);
                                    break;
                                case 'ES':
                                    this.$refs.message.Message(`Hemos enviado el código de verificación a ${this.email2}`);
                                    break;
                            }
                            this.emailType=3
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
            handleAuthCode1(){
                if(!!this.authCode1){
                    if(this.authCode1==this.authCodeContent){
                        userSetting(this.token,this.userInfo.birthday,this.userInfo.cancellation,this.userInfo.gender,this.userInfo.isPush,
                            this.userInfo.parentControl,this.userInfo.parentPassword,this.userInfo.userName,this.newEmail,this.userInfo.phoneNumber,
                            this.authCode1,this.userInfo.changePhoneCode).then(res=>{
                            console.log('修改用户信息:',res)
                            if(res.code==0){
                                switch (this.lang.lang) {
                                    case 'ZH':this.$refs.message.Message('修改成功');break
                                    case 'EN':this.$refs.message.Message('Modify the success');break
                                    case 'IND':this.$refs.message.Message('Berhasil mengubah'); break
                                    case 'PT':this.$refs.message.Message('Modificação bem sucedida'); break
                                    case 'ES':this.$refs.message.Message('Modificación exitosa');break
                                }
                                this.USERINFO(res.data)
                                this.emailStatus=0
                            }else{
                                this.$refs.message.Message(res.message);
                            }
                        })
                    }else{
                        switch (this.lang.lang) {
                            case 'ZH':this.$refs.message.Message('验证码错误');break
                            case 'EN':this.$refs.message.Message('Verification code error');break
                            case 'IND':this.$refs.message.Message('Galat captcha'); break
                            case 'PT':this.$refs.message.Message('Erro de captcha'); break
                            case 'ES':this.$refs.message.Message('Error de captcha');break
                        }
                    }
                }
            },
            handleAuthCode3(){
                if(this.authCode3==this.authCodeContent2){
                    userSetting(this.token,this.userInfo.birthday,this.userInfo.cancellation,this.userInfo.gender,this.userInfo.isPush,
                        this.userInfo.parentControl,this.userInfo.parentPassword,this.userInfo.userName,this.email2,this.userInfo.phoneNumber,
                        this.authCodeContent2,this.userInfo.changePhoneCode).then(res=>{
                        console.log('修改用户信息:',res)
                        if(res.code==0){
                            switch (this.lang.lang) {
                                case 'ZH':this.$refs.message.Message('修改成功');break
                                case 'EN':this.$refs.message.Message('Modify the success');break
                                case 'IND':this.$refs.message.Message('Berhasil mengubah'); break
                                case 'PT':this.$refs.message.Message('Modificação bem sucedida'); break
                                case 'ES':this.$refs.message.Message('Modificación exitosa');break
                            }
                            this.USERINFO(res.data)
                            this.emailType=0
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }else{
                    switch (this.lang.lang) {
                        case 'ZH':this.$refs.message.Message('验证码错误');break
                        case 'EN':this.$refs.message.Message('Verification code error');break
                        case 'IND':this.$refs.message.Message('Galat captcha'); break
                        case 'PT':this.$refs.message.Message('Erro de captcha'); break
                        case 'ES':this.$refs.message.Message('Error de captcha');break
                    }
                }
            },
            handleChangeBirthday(){
                this.changeUserSetting(this.token,(this.newBirthday).valueOf(),this.userInfo.cancellation,this.userInfo.gender,this.userInfo.isPush,this.userInfo.parentControl,
                    this.userInfo.parentPassword,this.userInfo.userName,this.userInfo.email,this.userInfo.phoneNumber,this.userInfo.changeEmailCode,this.userInfo.changePhoneCode)

            },
            handleChangePassword(){
                this.$router.push('/forgetPassword')
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
                            if(this.lang.lang=='PT'){this.$refs.message.Message('Utilização bem sucedida')}
                            if(this.lang.lang=='ES'){this.$refs.message.Message('Uso exitoso')}
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
            },
            changeEmail(){
                this.emailStatus=1
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

<style scoped lang="scss">
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
            .subAccount{
                height: 180px;
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
</style>
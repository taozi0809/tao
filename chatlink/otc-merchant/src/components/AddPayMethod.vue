<template>
    <div >
        <div class="addPayMethodShow" v-if="addPayStatus=='0'||addPayStatus=='b0'" >
            <div class="h3">添加收款方式</div>
            <ul>
                <li class="item" @click="addPayType(addPayStatus==0?'1':'b1')">
                    <span class="pay-logo"><img src="https://exchange.link/img/pay/ali_pay.png" alt=""></span>
                    <span class="pay-name">支付宝</span>
                </li>
                <li class="item" @click="addPayType(addPayStatus==0?'2':'b2')">
                    <span class="pay-logo"><img src="https://exchange.link/img/pay/wechat_pay.png" alt=""></span>
                    <span class="pay-name">微信</span>
                </li>
                <li class="item" @click="addPayType(addPayStatus==0?'3':'b3')">
                    <span class="pay-logo"><img src="https://exchange.link/img/pay/bankcard_pay.png" alt=""></span>
                    <span class="pay-name">银行卡</span>
                </li>
                <li class="item" @click="addPayType(addPayStatus==0?'u1':'b4')">
                    <span class="pay-logo"><img src="https://exchange.link/img/pay/union_pay.png" alt=""></span>
                    <span class="pay-name">云闪付</span>
                </li>
            </ul>
            <div class="cancel" @click="cancel">取消</div>
        </div>

        <div class="alipay" v-if="addPayStatus=='1'||addPayStatus=='3'||addPayStatus=='5'||addPayStatus=='7'||addPayStatus=='b1'" :class="addPayStatus==7?'global-a':'global-b'" >
            <div class="head">
                <span class="px23"><img src="https://exchange.link/img/pay/ali_pay.png" alt=""></span>
                <span class="p17">支付宝</span>
            </div>
            <div class="item">
                <div class="l p15">姓名</div>
                <div class="r">
                    <van-field v-model="alipayName" placeholder="请输入姓名" class="input-height"/>
                </div>
            </div>
            <div class="item">
                <div class="l p15">支付宝账号</div>
                <div class="r">
                    <van-field v-model="alipayAccount" placeholder="请输入账号" />
                </div>
            </div>
            <div class="item upload">
                <div class="l p15">上传二维码</div>
                <div class="r">
                    <van-uploader accept="image/*"  :after-read="afterAlipayRead" :preview-size="50" :max-count="1" id="alipayinput"/>
                    <div class="ios-upload" v-if="!isiOS" @click="haveClick('1')"><img :src="alipayUrl" alt=""></div>
                    <div class="ios-upload" v-if="isiOS" @click="iosUpload"><img :src="iosUploadUrl" alt=""></div>
                </div>
            </div>
            <div class="global" v-if="addPayStatus==7">
                <div class="title">本次修改</div>
                <van-radio-group v-model="global">
                    <van-radio name="0"><p class="global-item">仅保存信息</p></van-radio>
                    <van-radio name="1"><p class="global-item global-item2">保存并更新全部出售货币的收款方式</p></van-radio>
                </van-radio-group>
            </div>
            <div class="bt">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save('alipay')">保存</div>
            </div>
        </div>
        <div class="wechat-pay" v-if="addPayStatus=='2'||addPayStatus=='4'||addPayStatus=='6'||addPayStatus=='8'||addPayStatus=='b2'" :class="addPayStatus==8?'global-a':'global-b'" >
            <div class="head">
                <span class="px23"><img src="https://exchange.link/img/pay/wechat_pay.png" alt=""></span>
                <span class="p17">微信</span>
            </div>
            <div class="item">
                <div class="l p15">姓名</div>
                <div class="r">
                    <van-field v-model="wechatPayName" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="item">
                <div class="l p15">微信账号</div>
                <div class="r">
                    <van-field v-model="wechatPayAccount" placeholder="请输入微信账号" />
                </div>
            </div>
            <div class="item upload">
                <div class="l p15">上传二维码</div>
                <div class="r">
                    <van-uploader accept="image/*" :after-read="afterWechatPayRead" :preview-size="50" :max-count="1" id="wechatpayinput"/>
                    <div class="ios-upload" v-if="!isiOS" @click="haveClick('2')"><img :src="wechatPayUrl" alt=""></div>
                    <div class="ios-upload" v-if="isiOS" @click="iosUpload"><img :src="iosUploadUrl" alt=""></div>
                    <!--<div class="ios-upload" v-if="isiOS" @click="iosUpload"><img src="../assets/images/pay/alipay-logo.png" alt=""></div>-->
                </div>
            </div>
            <div class="global" v-if="addPayStatus==8">
                <div class="title">本次修改</div>
                <van-radio-group v-model="global">
                    <van-radio name="0"><p class="global-item">仅保存信息</p></van-radio>
                    <van-radio name="1"><p class="global-item global-item2">保存并更新全部出售货币的收款方式</p></van-radio>
                </van-radio-group>
            </div>
            <div class="bt">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save('wechatPay')">保存</div>
            </div>
        </div>
        <div class="bankcard-pay" v-if="addPayStatus=='a1'||addPayStatus=='a3'||addPayStatus=='a5'||addPayStatus=='a7'||addPayStatus=='b3'" :class="addPayStatus=='a7'?'global-a':'global-b'" >
            <div class="head">
                <span class="px23"><img src="https://exchange.link/img/pay/bankcard_pay.png" alt=""></span>
                <span class="p17">银行卡</span>
            </div>
            <div class="item">
                <div class="l p15">姓名</div>
                <div class="r">
                    <van-field v-model="bankcardPayUserName" placeholder="请输入姓名" class="input-height"/>
                </div>
            </div>
            <div class="item">
                <div class="l p15">开户银行</div>
                <div class="r">
                    <van-field v-model="bankcardPayBankName" placeholder="请输入开户银行" class="input-height"/>
                </div>
            </div>
            <div class="item">
                <div class="l p15">银行卡号</div>
                <div class="r">
                    <van-field v-model="bankcardPayAccount" placeholder="请输入账号" />
                </div>
            </div>
            <div class="global" v-if="addPayStatus=='a7'">
                <div class="title">本次修改</div>
                <van-radio-group v-model="global">
                    <van-radio name="0"><p class="global-item">仅保存信息</p></van-radio>
                    <van-radio name="1"><p class="global-item global-item2">保存并更新全部出售货币的收款方式</p></van-radio>
                </van-radio-group>
            </div>
            <div class="bt">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save('bankcardPay')">保存</div>
            </div>
        </div>
        <div class="union-pay" v-if="addPayStatus=='u1'||addPayStatus=='u3'||addPayStatus=='u5'||addPayStatus=='u7'||addPayStatus=='b4'" :class="addPayStatus=='u7'?'global-a':'global-b'" >
            <div class="head">
                <span class="px23"><img src="https://exchange.link/img/pay/union_pay.png" alt=""></span>
                <span class="p17">云闪付</span>
            </div>
            <div class="item">
                <div class="l p15">姓名</div>
                <div class="r">
                    <van-field v-model="unionPayName" placeholder="请输入姓名" class="input-height"/>
                </div>
            </div>
            <div class="item upload">
                <div class="l p15">上传二维码</div>
                <div class="r">
                    <van-uploader accept="image/*"  :after-read="afterAlipayRead" :preview-size="50" :max-count="1" id="alipayinput"/>
                    <div class="ios-upload" v-if="!isiOS" @click="haveClick('1')"><img :src="unionPayUrl" alt=""></div>
                    <div class="ios-upload" v-if="isiOS" @click="iosUpload"><img :src="iosUploadUrl" alt=""></div>
                </div>
            </div>
            <div class="global" v-if="addPayStatus=='u7'">
                <div class="title">本次修改</div>
                <van-radio-group v-model="global">
                    <van-radio name="0"><p class="global-item">仅保存信息</p></van-radio>
                    <van-radio name="1"><p class="global-item global-item2">保存并更新全部出售货币的收款方式</p></van-radio>
                </van-radio-group>
            </div>
            <div class="bt">
                <div class="cancel" @click="cancel">取消</div>
                <div class="save" @click="save('unionPay')">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {addMerchantPaymentMethod,updateMerchantPaymentMethod,merchantPaymentMethod,sellTradePaymentMethodUpdate,postUploadDo} from "../service/api";
    import {getSessionStore} from "../storage";
    import {mapState, mapMutations} from 'vuex'
    import { Toast } from 'vant';


    export default {
        data(){
            return{
                addPayMethod:'addPayMethods',
                alipayName:'',
                alipayAccount:'',
                alipayUrl:'',
                alipayFileList:[],
                wechatPayName:'',
                wechatPayAccount:'',
                wechatPayUrl:'',
                wechatPayFileList:[],
                paymentMethods:[],
                global:'0',
                merchantPaymentMethods:[],
                editSale:{},

                bankcardPayUserName:'',
                bankcardPayBankName:'',
                bankcardPayAccount:'',

                unionPayName:'',
                unionPayUrl:'',
            }
        },
        computed:{...mapState(['addPayStatus','editPayInfo','iosUploadUrl'])},
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')

            var u = navigator.userAgent;
            this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            merchantPaymentMethod(this.userName,this.token).then(res=>{
                console.log('商家支付方式列表',res)
                if(res.code==0){
                    this.merchantPaymentMethods=res.data.merchantPaymentMethods
                }
            })
        },
        mounted:function(){
            if(this.addPayStatus!=0){this.editInit(this.editPayInfo)}else{
                this.init()
            }
        },
        methods:{
            ...mapMutations(['ADDPAYSTATUS','EDITPAYINFO','IOSUPLOADURL']),
            iosUpload(){
                selectPhoto()
            },
            afterAlipayRead(res){
                postUploadDo('circle:avatar',res.file).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        // Toast('上传成功');
                        this.alipayUrl=res.data.fullUrl
                    }else{
                        Toast(res.message);
                    }
                })
            },
            afterWechatPayRead(res){
                postUploadDo('circle:avatar',res.file).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        // Toast('上传成功');
                        this.wechatPayUrl=res.data.fullUrl
                    }else{
                        Toast(res.message);
                    }
                })

            },
            cancel(){
                this.$emit('operation','cancel');
            },
            addPayType(item){
                this.ADDPAYSTATUS(item)
            },
            save(type){
                if(type=='alipay'&&this.addPayStatus==1){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.alipayUrl
                    if(!!this.alipayAccount&&!!this.alipayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            account:this.alipayAccount,
                            beneficiaryName: this.alipayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,1,).then(res=>{
                            console.log('添加支付宝付款：',res)
                            if(res.code==0){
                                this.alipayAccount=''
                                this.alipayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='wechatPay'&&this.addPayStatus==2){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.wechatPayUrl
                    if(!!this.wechatPayAccount&&!!this.wechatPayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            account:this.wechatPayAccount,
                            beneficiaryName:this.wechatPayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,2).then(res=>{
                            console.log('添加微信付款：',res)
                            if(res.code==0){
                                this.wechatPayAccount=''
                                this.wechatPayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='bankcardPay'&&this.addPayStatus=='a1'){
                    if(!!this.bankcardPayUserName&&!!this.bankcardPayBankName&&!!this.bankcardPayAccount){
                        var paymentMethodInfo={
                            bankName:this.bankcardPayBankName,
                            beneficiaryName:this.bankcardPayUserName,
                            cardNumber:this.bankcardPayAccount,
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,3,).then(res=>{
                            console.log('添加银行卡付款：',res)
                            if(res.code==0){
                                this.bankcardPayBankName=''
                                this.bankcardPayUserName=''
                                this.bankcardPayAccount=''
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='unionPay'&&this.addPayStatus=='u1'){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.unionPayUrl
                    // qrCodeUrl='https://exchange.link/img/pay/union_pay.png'
                    if(!!this.unionPayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            beneficiaryName:this.unionPayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,4,).then(res=>{
                            console.log('添加云闪付：',res)
                            if(res.code==0){
                                this.unionPayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.unionPayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }

                if(type=='alipay'&&this.addPayStatus==3||this.addPayStatus==7){
                    var merchantPaymentId=0
                    for(let i in this.merchantPaymentMethods){
                        if(this.merchantPaymentMethods[i].paymentMethodId==1){
                            merchantPaymentId=this.merchantPaymentMethods[i].merchantPaymentMethodId
                        }
                    }
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.alipayUrl
                    var paymentMethodInfo={
                        account:this.alipayAccount,
                        beneficiaryName: this.alipayName,
                        qrCodeUrl:qrCodeUrl
                    }
                    updateMerchantPaymentMethod(this.userName,this.token,merchantPaymentId,paymentMethodInfo,this.global).then(res=>{
                        console.log('修改支付宝付款：',res)
                        if(res.code==0){
                            this.alipayAccount=''
                            this.alipayName=''
                            if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }
                if(type=='wechatPay'&&this.addPayStatus==4||this.addPayStatus==8){
                    var merchantPaymentId=0
                    for(let i in this.merchantPaymentMethods){
                        if(this.merchantPaymentMethods[i].paymentMethodId==2){
                            merchantPaymentId=this.merchantPaymentMethods[i].merchantPaymentMethodId
                        }
                    }
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.wechatPayUrl
                    var paymentMethodInfo={
                        account:this.wechatPayAccount,
                        beneficiaryName:this.wechatPayName,
                        qrCodeUrl:qrCodeUrl
                    }
                    updateMerchantPaymentMethod(this.userName,this.token,merchantPaymentId,paymentMethodInfo,this.global).then(res=>{
                        console.log('修改微信付款：',res)
                        if(res.code==0){
                            this.wechatPayAccount=''
                            this.wechatPayName=''
                            if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }
                if(type=='bankcardPay'&&this.addPayStatus=='a3'||this.addPayStatus=='a7'){
                    var merchantPaymentId=0
                    for(let i in this.merchantPaymentMethods){
                        if(this.merchantPaymentMethods[i].paymentMethodId==3){
                            merchantPaymentId=this.merchantPaymentMethods[i].merchantPaymentMethodId
                        }
                    }
                    var paymentMethodInfo={
                        bankName:this.bankcardPayBankName,
                        beneficiaryName:this.bankcardPayUserName,
                        cardNumber:this.bankcardPayAccount,
                    }
                    updateMerchantPaymentMethod(this.userName,this.token,merchantPaymentId,paymentMethodInfo,this.global).then(res=>{
                        console.log('修改银行卡付款：',res)
                        if(res.code==0){
                            this.bankcardPayBankName=''
                            this.bankcardPayUserName=''
                            this.bankcardPayAccount=''
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }
                if(type=='unionPay'&&this.addPayStatus=='u3'||this.addPayStatus=='u7'){
                    var merchantPaymentId=0
                    for(let i in this.merchantPaymentMethods){
                        if(this.merchantPaymentMethods[i].paymentMethodId==4){
                            merchantPaymentId=this.merchantPaymentMethods[i].merchantPaymentMethodId
                        }
                    }
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.unionPayUrl
                    var paymentMethodInfo={
                        beneficiaryName: this.unionPayName,
                        qrCodeUrl:qrCodeUrl
                    }
                    updateMerchantPaymentMethod(this.userName,this.token,merchantPaymentId,paymentMethodInfo,this.global).then(res=>{
                        console.log('修改支付宝付款：',res)
                        if(res.code==0){
                            this.unionPayName=''
                            if(this.isiOS){this.IOSUPLOADURL('')}else{this.unionPayUrl=''}
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }

                if(type=='alipay'&&this.addPayStatus==5){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.alipayUrl
                    var paymentMethodInfo={
                        account:this.alipayAccount,
                        beneficiaryName: this.alipayName,
                        qrCodeUrl:qrCodeUrl
                    }
                    sellTradePaymentMethodUpdate(this.userName,this.token,this.editSale.merchantPaymentMethodId,1,this.editSale.tradeId,paymentMethodInfo).then(res=>{
                        console.log('修改支付宝付款：',res)
                        if(res.code==0){
                            this.alipayAccount=''
                            this.alipayName=''
                            if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }
                if(type=='wechatPay'&&this.addPayStatus==6){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.wechatPayUrl
                    var paymentMethodInfo={
                        account:this.wechatPayAccount,
                        beneficiaryName:this.wechatPayName,
                        qrCodeUrl:qrCodeUrl
                    }
                        sellTradePaymentMethodUpdate(this.userName,this.token,this.editSale.merchantPaymentMethodId,2,this.editSale.tradeId,paymentMethodInfo).then(res=>{
                            console.log('修改微信付款：',res)
                            if(res.code==0){
                                this.wechatPayAccount=''
                                this.wechatPayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                if(type=='bankcardPay'&&this.addPayStatus=='a5'){
                    var paymentMethodInfo={
                        bankName:this.bankcardPayBankName,
                        beneficiaryName:this.bankcardPayUserName,
                        cardNumber:this.bankcardPayAccount,
                    }
                    sellTradePaymentMethodUpdate(this.userName,this.token,this.editSale.merchantPaymentMethodId,3,this.editSale.tradeId,paymentMethodInfo).then(res=>{
                        console.log('修改银行卡付款：',res)
                        if(res.code==0){
                            this.bankcardPayBankName=''
                            this.bankcardPayUserName=''
                            this.bankcardPayAccount=''
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }
                if(type=='unionPay'&&this.addPayStatus=='u5'){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.unionPayUrl
                    var paymentMethodInfo={
                        beneficiaryName: this.unionPayName,
                        qrCodeUrl:qrCodeUrl
                    }
                    sellTradePaymentMethodUpdate(this.userName,this.token,this.editSale.merchantPaymentMethodId,4,this.editSale.tradeId,paymentMethodInfo).then(res=>{
                        console.log('修改支付宝付款：',res)
                        if(res.code==0){
                            this.unionPayName=''
                            if(this.isiOS){this.IOSUPLOADURL('')}else{this.unionPayUrl=''}
                            Toast('保存成功');
                            this.$emit('operation','success');
                        }else{
                            Toast(res.message);
                        }
                    })
                }

                if(type=='alipay'&&this.addPayStatus=='b1'){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.alipayUrl
                    if(!!this.alipayAccount&&!!this.alipayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            account:this.alipayAccount,
                            beneficiaryName: this.alipayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,1,).then(res=>{
                            console.log('添加支付宝付款：',res)
                            if(res.code==0){
                                this.alipayAccount=''
                                this.alipayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='wechatPay'&&this.addPayStatus=='b2'){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.wechatPayUrl
                    if(!!this.wechatPayAccount&&!!this.wechatPayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            account:this.wechatPayAccount,
                            beneficiaryName:this.wechatPayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,2).then(res=>{
                            console.log('添加微信付款：',res)
                            if(res.code==0){
                                this.wechatPayAccount=''
                                this.wechatPayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.alipayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='bankcardPay'&&this.addPayStatus=='b3'){
                    if(!!this.bankcardPayUserName&&!!this.bankcardPayBankName&&!!this.bankcardPayAccount){
                        var paymentMethodInfo={
                            bankName:this.bankcardPayBankName,
                            beneficiaryName:this.bankcardPayUserName,
                            cardNumber:this.bankcardPayAccount,
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,3,).then(res=>{
                            console.log('添加银行卡付款：',res)
                            if(res.code==0){
                                this.bankcardPayBankName=''
                                this.bankcardPayUserName=''
                                this.bankcardPayAccount=''
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }
                if(type=='unionPay'&&this.addPayStatus=='b4'){
                    var qrCodeUrl=this.isiOS?this.iosUploadUrl:this.unionPayUrl
                    if(!!this.unionPayName&&!!qrCodeUrl){
                        var paymentMethodInfo={
                            beneficiaryName: this.unionPayName,
                            qrCodeUrl:qrCodeUrl
                        }
                        addMerchantPaymentMethod(this.userName,this.token,paymentMethodInfo,4).then(res=>{
                            console.log('添加云闪付：',res)
                            if(res.code==0){
                                this.unionPayName=''
                                if(this.isiOS){this.IOSUPLOADURL('')}else{this.unionPayUrl=''}
                                Toast('保存成功');
                                this.$emit('operation','success');
                            }else{
                                Toast(res.message);
                            }
                        })
                    }
                }

            },
            init(){
                // console.log('init')
                this.alipayName=''
                this.alipayAccount=''
                this.alipayUrl=''
                this.wechatPayName=''
                this.wechatPayAccount=''
                this.wechatPayUrl=''
                this.bankcardPayBankName=''
                this.bankcardPayUserName=''
                this.bankcardPayAccount=''
            },
            editInit(editPayInfo){
                console.log(editPayInfo)
                if(editPayInfo.paymentMethodId==1){
                    this.alipayName=editPayInfo.paymentMethodInfo.beneficiaryName
                    this.alipayAccount=editPayInfo.paymentMethodInfo.account
                    this.alipayUrl=editPayInfo.paymentMethodInfo.qrCodeUrl
                }
                if(editPayInfo.paymentMethodId==2){
                    this.wechatPayName=editPayInfo.paymentMethodInfo.beneficiaryName
                    this.wechatPayAccount=editPayInfo.paymentMethodInfo.account
                    this.wechatPayUrl=editPayInfo.paymentMethodInfo.qrCodeUrl
                }
                if(editPayInfo.paymentMethodId==3){
                    this.bankcardPayBankName=editPayInfo.paymentMethodInfo.bankName
                    this.bankcardPayUserName=editPayInfo.paymentMethodInfo.beneficiaryName
                    this.bankcardPayAccount=editPayInfo.paymentMethodInfo.cardNumber
                }
                if(editPayInfo.paymentMethodId==4){
                    this.unionPayUrl=editPayInfo.paymentMethodInfo.qrCodeUrl
                    this.unionPayName=editPayInfo.paymentMethodInfo.beneficiaryName
                }
                this.editSale=editPayInfo
            },
            haveClick(num){
                if(num==1){
                    var btnNode = document.getElementById('alipayinput');
                    btnNode.click();
                }
                if(num==2){
                    var btnNode = document.getElementById('wechatpayinput');
                    btnNode.click();
                }

            }
        },
        watch:{
            addPayStatus(newValue,oldValue){
                if(newValue==0){this.init()}
            },
            editPayInfo(newValue,oldValue){
                this.editInit(newValue)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .addPayMethodShow{
        width: 295px;
        height: 430px;
        border-radius: 4px;
        overflow: hidden;
        box-sizing: border-box;
        padding: 20px;
        .h3{
            color: #000000;
            font-size: 17px;
            font-weight: bold;
        }
        .item{
            width: 255px;
            height: 70px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #D9D9D9;
            .pay-logo{
                display: block;
                width: 23px;
                height: 23px;
                overflow: hidden;
                /*background: red;*/
                border-radius: 50%;
                img{
                    width: 100%;
                }
            }
            .pay-name{
                color: #1B1B1B;
                font-size: 15px;
                margin-left: 16px;
            }
        }
        .cancel{
            width: 250px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 15px;
            background: #013071;
            border-radius: 3px;
            margin-top: 20px;
        }
    }

    .alipay,.wechat-pay,.bankcard-pay,.union-pay{
        width: 335px;
        height: 460px;
        background: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px;
        .head{
            display: flex;
            align-items: center;
            span:nth-child(2){
                margin-left: 17px;
            }
        }
        .item{
            width: 295px;
            height: 64px;
            border-bottom: 1px solid #D9D9D9;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l{
                line-height: 64px;
                width: 100px;
            }
            .r{
                flex: 1;

            }
        }
        .upload{
            .r{
                box-sizing: border-box;
               position: relative;
                .van-uploader{
                    position: absolute;
                    right: 0;
                    top: -25px;
                }
                .ios-upload{
                    box-sizing: border-box;
                    width: 52px;
                    height: 52px;
                    position: absolute;
                    top: -25px;
                    right: 9.4px;
                    z-index: 0;
                    overflow: hidden;
                    border: none;
                    img{
                        width:54px;
                        display: inline-block;
                        box-sizing: border-box;
                        margin: -1px;

                    }


                }

            }
        }
        .bt{
            display: flex;
            align-items: center;
            margin-top: 20px;
            .cancel{
                width: 104px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #89A2C3;
                background:rgba(1,48,113,.2);
                border-radius: 4px;
            }
            .save{
                width: 180px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background: #013071;
                border-radius: 4px;
                margin-left: 10px;
            }
        }
    }
    .global-a{
        height: 460px;
    }
    .global-b{
        height: 360px;
    }
    .union-pay.global-a{
        height: 400px;
    }
    .union-pay.global-b{
        height: 290px;
    }

    .global{
        margin-top: 20px;
        .title{
            color: #000;
            font-size: 17px;
            font-weight: bold;
        }
        .global-item{
            width: 100%;
            margin: 0;
            height: 40px;
            line-height: 40px;
        }


    }
    .global-a{}
    .global-b{}

</style>


<style>
    .van-field__control{
        height: 40px;
        /*border: 1px solid red;*/
        width: 190px;
    }
</style>
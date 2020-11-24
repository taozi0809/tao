<template>
    <div class="cim">
       <div class="title">收款信息管理</div>
        <div class="box">
            <div class="card" v-for="item in userPaymentMethods" :key="item.userPaymentMethodId" :class="item.paymentMethodId==4?'minHeight':''">
                <div class="item top">
                    <div class="l">
                        <span class="icon"><img :src="item.iconUrl" alt=""></span>
                        <span class="name">{{item.name}}</span>
                    </div>
                    <div class="r a" @click="addShowFun(item.paymentMethodId==1?'7':item.paymentMethodId==2?'8':item.paymentMethodId=='a7'?'a7':'u7',item)">修改</div>
                </div>
                <div class="item">
                    <div class="l">姓名</div>
                    <div class="r">{{item.paymentMethodInfo.beneficiaryName}}</div>
                </div>
                <div class="item" v-if="item.paymentMethodId!=3&&item.paymentMethodId!=4">
                    <div class="l">{{item.name}}账号</div>
                    <div class="r">{{item.paymentMethodInfo.account}}</div>
                </div>
                <div class="item" v-if="item.paymentMethodId==3">
                    <div class="l">开户银行</div>
                    <div class="r">{{item.paymentMethodInfo.bankName}}</div>
                </div>
                <div class="item" v-if="item.paymentMethodId!=3">
                    <div class="l">收款码</div>
                    <div class="r a" @click="showBigImg(item)">查看大图</div>
                </div>
                <div class="item" v-if="item.paymentMethodId==3">
                    <div class="l">银行卡号</div>
                    <div class="r">{{item.paymentMethodInfo.cardNumber}}</div>
                </div>
            </div>

            <van-popup v-model="bigImgShow">
                <span class="big-img"><img :src="qrCodeUrl" alt=""></span>
            </van-popup>

            <van-popup v-model="addPayMethodShow">
                <AddPayMethod @operation="onOperation" v-if="addPayMethodShow"/>
            </van-popup>

            <div class="add-pay-method" @click="addShowFun('0')">添加收款方式</div>
        </div>
    </div>
</template>

<script>
    import {merchantPaymentMethod} from "../service/api";
    import {getSessionStore} from "../storage";
    import AddPayMethod from '../components/AddPayMethod'
    import {mapState, mapMutations} from 'vuex'
    export default {
        components:{AddPayMethod},
        data(){
            return{
                userPaymentMethods:[],
                isBig:false,
                qrCodeUrl:'',
                addPayMethodShow:false,
                type:'',
                data:'',
                bigImgShow:false,
            }
        },
        computed:{...mapState(['addPayStatus'])},
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            this.merchantPaymentMethod()
        },
        methods:{
            ...mapMutations(['ADDPAYSTATUS','EDITPAYINFO','IOSUPLOADURL']),
            showBigImg(item){
                this.qrCodeUrl=item.paymentMethodInfo.qrCodeUrl
                this.bigImgShow=true
            },
            addShowFun(status,info){
                this.ADDPAYSTATUS(status)
                this.IOSUPLOADURL('')
                if(status==7||status==8||status=='u7'){
                    this.EDITPAYINFO(info)
                    this.IOSUPLOADURL(info.qrCodeUrl)
                }
                if(status=='a7'){this.EDITPAYINFO(info)}
                this.addPayMethodShow=true
            },
            onOperation(type){
                this.addPayMethodShow=false
                if(type=='success'){
                    this.merchantPaymentMethod()
                }
            },
            merchantPaymentMethod(){
                merchantPaymentMethod(this.userName,this.token).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        this.userPaymentMethods=res.data.merchantPaymentMethods
                    }
                })
            }


        }

    }
</script>

<style lang="scss" scoped>
    .cim{
        .title{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
            font-weight: bold;
            color: #000;
        }
        .title:after{
            display: block;
            width: 100%;
            content: '';
            height: 3px;
            background: #EFF0F4;
            position: absolute;
            top: 50px;
            left: 0;
        }
        .box{
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            padding: 20px 0;
            .card{
                width: 354px;
                height:188px;
                border: 1px solid #E6E6E6;
                margin: 0 auto;
                margin-bottom: 20px;
                .item{
                    width: 100%;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 0 18px;
                    .l{
                        color: #808080;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        .icon{
                            width: 23px;
                            height: 23px;
                            display: block;
                            margin-right: 16px;
                            img{
                                width: 100%;
                            }
                        }
                        .name{
                            font-size: 15px;
                            color:#1B1B1B ;
                        }
                    }
                    .r{
                        color: #1A1A1A;
                        font-size: 14px;
                    }
                    .a{
                        font-weight: bold;
                        color: #2A39FF;
                    }
                }
                .top{
                    height: 56px;
                }
            }
            .minHeight{
                height:145px;
            }
            .add-pay-method{
                width: 354px;
                height: 48px;
                background: #013071;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 15px;
                border-radius: 3px;
                margin-bottom: 14px;
            }
        }
        .big-img{
            width: 238px;
            height: 305px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 100%;
            }
        }
    }
</style>
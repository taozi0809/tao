<template>
    <div class="ConfigureCSale">
        <div class="h2">出售-{{details.coinSymbol}}配置</div>
        <div class="save" @click="save">保存</div>
        <div class="item">
            <div class="sale-price">
                <div class="l">
                    <span>出售价</span>
                    <!--<span>最高价出售</span>-->
                </div>
                <div class="c">
                    <van-field v-model="saleValue" type="number" placeholder="请输入价格"/>
                </div>
                <div class="r">{{details.legalMoneySymbol}}/{{details.coinSymbol}}</div>
            </div>
        </div>
        <div class="item">
            <div class="time">
                <div class="l">限购时间段</div>
                <div class="r">
                    <div class="start" @click="showStart">
                        <span class="currentTime">{{currentStartTime}}</span>
                        <span class="arrow-b"></span>
                    </div>
                    <span class="c">~</span>
                    <div class="end" @click="showEnd">
                        <span class="currentTime">{{currentEndTime}}</span>
                        <span class="arrow-b"></span>
                    </div>
                </div>
            </div>
            <van-datetime-picker
                    v-model="currentStartTime"
                    type="time"
                    :min-hour="0"
                    :max-hour="23"
                    @confirm="startConfirm"
                    @cancel="startCancel"
                    v-show="isCurrentStartTime"
            />
            <van-datetime-picker
                    v-model="currentEndTime"
                    type="time"
                    :min-hour="0"
                    :max-hour="23"
                    @confirm="endConfirm"
                    @cancel="endCancel"
                    v-show="isCurrentEndTime"
            />
        </div>
        <div class="item">
            <div class="up-value">
                <div class="l">出售上限</div>
                <div class="c">
                    <van-field v-model="upValue" type="number" :placeholder="'可用余额 '+coin.balance+' '+coin.name"/>
                </div>
                <div class="r">{{details.coinSymbol}}</div>
            </div>
        </div>
        <div class="item">
            <div class="limit">
                <div class="limit-l">
                    <div class="l">订单限额</div>
                    <div class="c">
                        <div class="min">
                            <van-field v-model="minValue" type="number"/>
                        </div>
                        <span class="c-c">~</span>
                        <div class="max">
                            <van-field v-model="maxValue" type="number"/>
                        </div>
                    </div>
                </div>
                <div class="r">{{details.legalMoneySymbol}}</div>
            </div>
        </div>
        <div class="box" v-if="!isAutoPayInfo">
            <van-checkbox-group v-model="result">
                <div class="pay-list" v-for="item in merchantPaymentMethods" :class="item.paymentMethodId==4?'minHeight':''">
                    <div class="item-head">
                        <div class="l">
                            <span class="px23"><img :src="item.iconUrl" alt=""></span>
                            <span class="p15">{{item.name}}</span>
                            <span class="change-pay" @click="addShowFun(item.paymentMethodId==1?'5':item.paymentMethodId==2?'6':item.paymentMethodId=='a5'?'a5':'u5',item)">编辑</span>
                        </div>
                        <div class="r">
                            <van-checkbox :name="item.merchantPaymentMethodId"></van-checkbox>
                        </div>
                    </div>
                    <div class="item-list">
                        <div class="l">姓名</div>
                        <div class="r">{{item.paymentMethodInfo.beneficiaryName}}</div>
                    </div>
                    <div class="item-list" v-if="item.paymentMethodId!=3&&item.paymentMethodId!=4">
                        <div class="l">{{item.name}}账号</div>
                        <div class="r">{{item.paymentMethodInfo.account}}</div>
                    </div>
                    <div class="item-list" v-if="item.paymentMethodId==3">
                        <div class="l">开户银行</div>
                        <div class="r">{{item.paymentMethodInfo.bankName}}</div>
                    </div>
                    <div class="item-list" v-if="item.paymentMethodId!=3">
                        <div class="l">收款码</div>
                        <div class="r big" @click="showBigImg(item)">查看大图</div>
                    </div>
                    <div class="item-list" v-if="item.paymentMethodId==3">
                        <div class="l">银行卡号</div>
                        <div class="r">{{item.paymentMethodInfo.cardNumber}}</div>
                    </div>
                </div>

            </van-checkbox-group>
        </div>
        <div class="box" >
            <div class="add-pay-method" @click="addShowFun('b0')" v-if="!isAutoPayInfo">添加收款方式</div>
            <div class="note" v-if="!isAutoPayInfo">
                请务必使用您本人的实名账户，被激活的收款方式将在交易时向
                买方展示，最多激活三种
            </div>

            <div class="delete" @click="deleteA">删除</div>
        </div>
        <van-popup v-model="bigImgShow">
            <span class="big-img"><img :src="qrCodeUrl" alt=""></span>
        </van-popup>
        <van-popup v-model="addPayMethodShow">
            <AddPayMethod @operation="onOperation" v-if="addPayMethodShow"/>
        </van-popup>

    </div>
</template>

<script>
    import AddPayMethod from '../components/AddPayMethod'
    import {getSessionStore} from "../storage";
    import { Dialog } from 'vant';
    import {merchantPaymentMethod,deleteTrade,updateSellTrade,sellTradeDetails,coinBalanceList} from "../service/api";
    import {mapState, mapMutations} from 'vuex'
    import { Toast } from 'vant';

    export default {
        components:{AddPayMethod},
        data(){
            return{
                isCurrentStartTime:false,
                isCurrentEndTime:false,
                addPayMethodShow:false,

                bigImgShow:false,
                qrCodeUrl:'',
                type:'',
                data:'',
                result:[],
                details:{},
                saleValue: '',
                upValue:'',
                minValue:'',
                maxValue:'',
                currentStartTime: '00:00',
                currentEndTime: '23:59',
                tradeId:'',
                merchantPaymentMethods:[],
                coin:{},


            }
        },
        computed:{...mapState(['addPayStatus'])},
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            this.isAutoPayInfo= JSON.parse(getSessionStore('isAutoPayInfo'))
            this.tradeId = JSON.parse(this.$route.query.details).tradeId
            this.sellTradeDetails()
            var details=JSON.parse(this.$route.query.details)

            coinBalanceList(this.userName,this.token).then(res=>{
                console.log('钱包列表:',res)
                if(res.code==0){
                    for(let i in res.data.coinBalanceCtoModels){
                        if(details.coinSymbol==res.data.coinBalanceCtoModels[i].name){
                            console.log(res.data.coinBalanceCtoModels[i])
                            this.coin=res.data.coinBalanceCtoModels[i]
                        }
                    }
                }
            })
        },
        methods:{
            ...mapMutations(['ADDPAYSTATUS','EDITPAYINFO','IOSUPLOADURL']),

            showStart(){
                if(this.isCurrentEndTime){this.isCurrentEndTime=false}
                this.isCurrentStartTime=true
            },
            showEnd(){
                if(this.isCurrentStartTime){this.isCurrentStartTime=false}
                this.isCurrentEndTime=true
            },
            startConfirm(){this.isCurrentStartTime=false},
            startCancel(){this.isCurrentStartTime=false},
            endConfirm(){this.isCurrentEndTime=false},
            endCancel(){this.isCurrentEndTime=false},

            showBigImg(item){
                this.qrCodeUrl=item.paymentMethodInfo.qrCodeUrl
                this.bigImgShow=true
            },
            save(){
                var amount = parseFloat(this.upValue)
                var price=parseFloat(this.saleValue)
                var startTradeTime=''
                var endTradeTime=''
                if(this.currentStartTime.length==8){
                    startTradeTime=this.currentStartTime
                    endTradeTime=this.currentEndTime
                }else{
                    startTradeTime=this.currentStartTime+':00'
                    endTradeTime=this.currentEndTime+':59'
                }

                var minTradePrice=parseFloat(this.minValue)
                var maxTradePrice=parseFloat(this.maxValue)
                var paymentMethodIds=this.result
                console.log(this.result)

                if(!!price){}else{Toast.fail({message:'请填入价格',duration:1500});return}
                if(startTradeTime>endTradeTime){Toast.fail({message:'开始时间不能大于结束时间',duration:1500});return}
                if(!!amount){}else{Toast.fail({message:'请填入出售上限',duration:1500});return}
                if(!!minTradePrice){}else{Toast.fail({message:'请填入订单限额',duration:1500});return}
                if(!!maxTradePrice){}else{Toast.fail({message:'请填入订单限额',duration:1500});return}
                if(Number(minTradePrice)>Number(maxTradePrice)){Toast.fail({message:'请填入正确的订单限额',duration:1500});return}
                if(this.isAutoPayInfo){}else{
                    if(paymentMethodIds.length==0){Toast.fail({message:'请添加收款方式',duration:1500});return}
                }
                updateSellTrade(this.details.tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,this.userName,this.token).then(res=>{
                    console.log('修改商家买入交易：',res)
                    if(res.code==0){
                        Toast.success({message:'保存成功',duration:1500})
                        this.$router.push({path:'/CoinSale'})
                    }else{
                        Toast(res.message);
                    }
                })
            },
            addShowFun(status,info){
                this.ADDPAYSTATUS(status)
                this.IOSUPLOADURL('')
                if(status==5||status==6||status=='u5'){
                    info['tradeId']=this.tradeId
                    this.EDITPAYINFO(info)
                    this.IOSUPLOADURL(info.qrCodeUrl)
                }
                if(status=='a5'){
                    info['tradeId']=this.tradeId
                    this.EDITPAYINFO(info)
                }
                this.addPayMethodShow=true
            },
            onOperation(type){
                this.addPayMethodShow=false
                if(type=='success'){
                    this.sellTradeDetails()
                }
            },
            deleteA(){
                var that=this
                Dialog.confirm({
                    message: '是否删除该配置文件',
                    beforeClose
                });
                function beforeClose(action, done) {
                    if (action === 'confirm') {
                        deleteTrade(that.userName,that.token,that.details.tradeId).then(res=>{
                            if(res.code==0){
                                Toast.success({message:'删除成功',duration:1500})
                                that.$router.push({path:'/CoinSale'})
                                done();
                            }else{
                                Toast(res.message)
                            }

                        })
                    } else {
                        done();
                    }
                }
            },
            sellTradeDetails(){
                sellTradeDetails(this.userName,this.token,this.tradeId).then(res=>{
                    console.log('商家出售交易详情:',res)
                    if(res.code==0){
                        this.details=res.data
                        this.saleValue=this.details.price
                        this.currentStartTime=this.details.startTradeTime.substring(0,5)
                        this.currentEndTime=this.details.endTradeTime.substring(0,5)

                        this.upValue=this.details.amount
                        this.minValue=this.details.minTradePrice
                        this.maxValue=this.details.maxTradePrice
                        // this.merchantPaymentMethods=this.details.merchantPaymentMethods
                        merchantPaymentMethod(this.userName,this.token).then(response=>{
                            console.log('222',response)
                            if(res.code==0){
                                this.merchantPaymentMethods=response.data.merchantPaymentMethods
                            }
                        })
                        // console.log('111',this.merchantPaymentMethods)
                        var arr=[]
                        for(let i in this.details.merchantPaymentMethods){
                            arr.push(this.details.merchantPaymentMethods[i].merchantPaymentMethodId)
                        }
                        this.result=arr
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    .ConfigureCSale{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        .h2{
            color: #000;
            font-size: 17px;
            font-weight: bold;
            background: #fff;
            height: 53px;
            text-align: center;
            line-height: 53px;
            margin-bottom: 4px;
            border-bottom: 3px solid #EFF0F4;
        }
        .save{
            color: #002569;
            font-size: 15px;
            position: absolute;
            right: 12px;
            z-index: 3;
            height: 53px;
            width: auto;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .item{
            width: 375px;
            height: 64px;
            background: #fff;
            .sale-price{
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #D9D9D9;
                box-sizing: border-box;
                width: 355px;
                height: 64px;
                margin: 0 auto;
                .l{
                    width: 75px;
                    box-sizing: border-box;
                    span{
                        display: block;
                    }
                    span:nth-child(1){
                        color: #1B1B1B;
                        font-size: 15px;
                        margin-bottom: 6px;
                    }
                    span:nth-child(2){
                        color: #2A39FF;
                        font-size: 14px;
                        margin-top: 6px;
                    }
                }
                .c{
                    flex: auto;
                }
                .r{
                    font-size: 15px;
                    color: #1B1B1B;
                }
            }
            .time{
                display: flex;
                align-items: center;
                border-bottom: 1px solid #D9D9D9;
                box-sizing: border-box;
                width: 355px;
                height: 64px;
                margin: 0 auto;
                .l{
                    font-size: 15px;
                    color:#1B1B1B ;
                    width: 75px;
                    box-sizing: border-box;
                }
                .r{
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 15px;
                    .start,.end{
                        width: 108px;
                        height: 30px;
                        background: #EEEEEE;
                        border:1px solid rgba(181,181,181,1);
                        border-radius: 3px;
                        position: relative;
                        .arrow-b{
                            display: block;
                            margin: 0px;
                            border-width: 8px;
                            border-style: solid;
                            border-color: #000000 transparent transparent transparent;
                            padding: 0px;
                            width: 0px;
                            height: 0px;
                            position: absolute;
                            top: 12px;
                            right: 10px;
                        }
                        .currentTime{
                            text-align: center;
                            line-height: 30px;
                            color: #373737;
                            font-size: 15px;
                            position: absolute;
                            left:40%;
                            transform: translateX(-50%);
                        }
                    }
                    .c{
                        font-size: 15px;
                        color: #1B1B1B;
                        margin: 0 10px;
                    }

                }
            }
            .up-value{
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #D9D9D9;
                box-sizing: border-box;
                width: 355px;
                height: 64px;
                margin: 0 auto;
                .l,.r{
                    color: #1B1B1B;
                    font-size: 15px;
                }
                .l{
                    width: 75px;
                }
                .c{
                    box-sizing: border-box;
                    flex: auto;
                }
            }
            .limit{
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #D9D9D9;
                box-sizing: border-box;
                width: 355px;
                height: 64px;
                margin: 0 auto;
                .limit-l{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .l{
                        font-size: 15px;
                        color:#1B1B1B ;
                        width: 75px;
                        box-sizing: border-box;
                    }
                    .c{
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        padding: 0 15px;
                        .min,.max{
                            width: 88px;
                            height: 30px;
                            border:1px solid rgba(181,181,181,1);
                            border-radius: 3px;
                            position: relative;
                            overflow: hidden;
                            .van-cell{
                                width: 100%;
                                height: 100%;
                                box-sizing: border-box;
                                display: flex;
                                align-items: center;
                                padding-left: 5px;
                            }
                        }
                        .c-c{
                            font-size: 15px;
                            color: #1B1B1B;
                            margin: 0 10px;
                        }

                    }
                }
                .r{
                    color: #1B1B1B;
                    font-size: 15px;
                }
            }
        }
        .add-pay-method{
            width: 348px;
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
        .note{
            width: 345px;
            margin: 0 auto;
            font-size: 12px;
            line-height: 18px;
            color: #808080;
        }
        .delete{
            width: 348px;
            height: 48px;
            background: #FF4851;
            color: #fff;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            margin-top: 30px;
            border-radius: 3px;
        }
        .box{
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            padding: 20px 0;
            .pay-list{
                width: 355px;
                height: 188px;
                background: #fff;
                border: 1px solid #E6E6E6;
                border-radius: 3px;
                margin: 0 auto;
                margin-bottom: 16px;
                .item-head{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 20px 18px;
                    .l{
                        display: flex;
                        align-items: center;
                        .p15{
                            margin-left: 16px;
                        }
                    }
                    .change-pay{
                        color: #2A39FF;
                        font-size: 14px;
                        padding-left: 16px;
                        font-weight: bold;
                    }
                }
                .item-list{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding: 0 18px;
                    margin-bottom: 25px;
                    .l{
                        color: #808080;
                        font-size: 14px;
                        width: 80px;
                    }
                    .r{
                        color: #1A1A1A;
                        font-size: 14px;
                    }
                    .big{
                        color: #2A39FF;
                        font-weight: bold;
                    }
                }
            }
            .minHeight{
                height:145px;
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
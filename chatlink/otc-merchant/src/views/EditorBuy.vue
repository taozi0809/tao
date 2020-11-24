<template>
    <div class="ConfigureCSale">
        <div class="h2">购买-{{details.coinSymbol}}配置</div>
        <div class="save" @click="save">保存</div>
        <div class="item">
            <div class="sale-price">
                <div class="l">
                    <span>购入价</span>
                    <!--<span>最高价购入</span>-->
                </div>
                <div class="c">
                    <van-field v-model="buyValue" type="number" placeholder="请输入价格"/>
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
                <div class="l">购入上限</div>
                <div class="c">
                    <van-field v-model="upValue" type="number" placeholder="请输入购入上限" />
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
        <div class="pay">
            <div class="pay-method">
                <div class="l">付款方式</div>
                <div class="c">
                    <van-checkbox-group v-model="result">
                        <van-checkbox v-for="item in paymentMethodsA" :key="item.paymentMethodId" :name="item.paymentMethodId">
                            <div class="box">
                                <span class="pay-logo"><img :src="item.iconUrl" alt=""></span>
                                <span class="des">{{item.name}}</span>
                            </div>
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </div>
            <div class="delete" @click="deleteA">删除</div>
        </div>

    </div>
</template>

<script>

    import {getSessionStore} from "../storage";
    import { Dialog } from 'vant';
    import {updateBuyTrade,deleteTrade,buyTradeDetails} from "../service/api";
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                isCurrentStartTime:false,
                isCurrentEndTime:false,
                result:[],
                details:{},
                buyValue: '',
                upValue:'',
                minValue:'',
                maxValue:'',
                currentStartTime: '00:00:00',
                currentEndTime: '23:59:00',
                paymentMethods:[],
                paymentMethodsA:[{
                    iconUrl: "https://exchange.link/img/pay/ali_pay.png",
                    name: "支付宝",
                    paymentMethodId: 1,
                },{
                    iconUrl: "https://exchange.link/img/pay/wechat_pay.png",
                    name: "微信",
                    paymentMethodId: 2,
                },{
                    iconUrl: "https://exchange.link/img/pay/bankcard_pay.png",
                    name: "银行卡",
                    paymentMethodId: 3,
                },{
                    iconUrl: "https://exchange.link/img/pay/union_pay.png",
                    name: "云闪付",
                    paymentMethodId: 4,
                }]
            }
        },
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            this.tradeId=JSON.parse(this.$route.query.details).tradeId
            this.buyTradeDetails()
        },
        methods:{
            showStart(){
                if(this.isCurrentEndTime){this.isCurrentEndTime=false}
                this.isCurrentStartTime=true
            },
            showEnd(){
                if(this.isCurrentStartTime){this.isCurrentStartTime=false}
                this.isCurrentEndTime=true},
            startConfirm(){this.isCurrentStartTime=false},
            startCancel(){this.isCurrentStartTime=false},
            endConfirm(){this.isCurrentEndTime=false},
            endCancel(){this.isCurrentEndTime=false},
            save(){
                var amount = parseFloat(this.upValue)
                var price=parseFloat(this.buyValue)
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

                if(!!price){}else{Toast.fail({message:'请填入价格',duration:1500});return}
                if(startTradeTime>endTradeTime){Toast.fail({message:'开始时间不能大于结束时间',duration:1500});return}
                if(!!amount){}else{Toast.fail({message:'请填入购买上限',duration:1500});return}
                if(!!minTradePrice){}else{Toast.fail({message:'请填入订单限额',duration:1500});return}
                if(!!maxTradePrice){}else{Toast.fail({message:'请填入订单限额',duration:1500});return}
                if(parseFloat(maxTradePrice)<parseFloat(minTradePrice)){Toast.fail({message:'请填入正确的订单限额',duration:1500});return}
                if(paymentMethodIds.length==0){Toast.fail({message:'请选择付款方式',duration:1500});return}

               updateBuyTrade(this.details.tradeId,amount,price,startTradeTime,endTradeTime,minTradePrice,maxTradePrice,paymentMethodIds,this.userName,this.token).then(res=>{
                    console.log('修改商家买入交易：',res)
                    if(res.code==0){
                        Toast.success({message:'保存成功',duration:1500})
                        this.$router.push({path:'/'})
                    }else{
                        Toast(res.message);
                    }
                })
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
                                that.$router.push({path:'/'})
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

            buyTradeDetails(){
                buyTradeDetails(this.userName,this.token,this.tradeId).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        this.details=res.data
                        this.buyValue=this.details.price
                        this.currentStartTime=this.details.startTradeTime.substring(0,5)
                        this.currentEndTime=this.details.endTradeTime.substring(0,5)
                        this.upValue=this.details.amount
                        this.minValue=this.details.minTradePrice
                        this.maxValue=this.details.maxTradePrice
                        this.paymentMethods=this.details.paymentMethods
                        var arr=[]
                        for(let i in this.details.paymentMethods){
                            arr.push(this.details.paymentMethods[i].paymentMethodId)
                        }
                        this.result=arr
                    }else{

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
        .pay{
            width: 375px;
            background: #fff;
            padding-bottom: 20px;
            .pay-method{
                display: flex;
                width: 355px;
                margin: 0 auto;
                background: #fff;
                padding-bottom: 22px;
                .l{
                    color: #1B1B1B;
                    font-size: 15px;
                    height: 64px;
                    line-height: 64px;
                    width: 75px;
                }
                .c{
                    box-sizing: border-box;
                    padding:0 15px;
                    .van-checkbox{
                        margin-top: 22px;
                    }
                    .box{
                        display: flex;
                        align-items: center;
                        .pay-logo{
                            display: block;
                            width: 23px;
                            height: 23px;
                            overflow: hidden;
                            border-radius: 50%;
                            img{
                                width: 100%;
                            }
                        }
                        .des{
                            color: #1B1B1B;
                            font-size: 15px;
                            margin-left: 8px;
                        }
                    }
                }
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
        }



    }

</style>
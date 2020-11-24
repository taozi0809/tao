<template>
    <div class="BetInput" id="pos-bot">
        <div class="head">
            <div class="coin-type">请选择竞猜币种:</div>
            <ul>
                <li :class="coinName==item.name?'active':''" v-for="item in coin_list" @click="handleCoin(item.name,item.moneyCode,item.balance)" >
                    <span><img :src="item.icon" alt=""></span>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div class="input">
            <div class="t">
                <input type="number" v-model.number.trim="sum" :placeholder="placeholder" v-on:input="handleMax">
                <div class="infuse">
                    <p>{{guessInputDataBasketball.name | toName}}</p>
                    <p>@{{guessInputDataBasketball.number}}</p>
                </div>
            </div>
            <div class="b">
                <div class="b-l">
                    总投注金额：
                    <span class="money-sum">{{totalSum}}</span>
                    <span class="coin-name"> {{coinName}}</span>
                </div>
                <div class="b-r">
                    余额：
                    <span class="money-sum">{{balance}}</span>
                    <span class="coin-name"> {{coinName}}</span>
                </div>

            </div>
        </div>
        <div class="btn">
            <span v-if="!quizing" @click="handleQuiz">立即竞猜(最高返还{{returnSum + coinName}})</span>
            <span :class="quizing?'loading':''" v-if="quizing">立即竞猜(最高返还{{returnSum + coinName}})</span>
        </div>

        <message ref="message"/>
    </div>
</template>

<script>
    import {coin_balance_list} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    import {limitNumber} from "../../assets/js/tool";
    import {basketball_bet} from "../../service/api";

    export default {
        data(){
            return{
                coinName:'TITAN',
                moneyCode:'TITAN_COIN',
                coin_list:'',
                balance:0,
                sum:'',
                coin_arr:{},
                placeholder:'请输入竞猜金额（最高10000TITAN）',
                quizing:false,

            }
        },
        computed:{
            ...mapState(['guessInputDataBasketball','betInfo','token','userName']),
            returnSum(){
                return this.sum * this.guessInputDataBasketball.number>0?(this.sum * this.guessInputDataBasketball.number).toFixed(2):'0'
            },
            totalSum(){
                return this.sum>0?this.sum:'0'
            }
        },
        created:function(){
            this.getCoinBalanceList(this.userName,this.token)
        },
        methods:{
            handleCoin(type,moneyCode,balance){
                this.coinName = type
                this.moneyCode = moneyCode
                this.sum=''
                this.balance = balance>0?balance:0
                if(type=='TITAN'){
                    this.placeholder = '请输入竞猜金额（最高10000TITAN）'
                }
                else if(type=='USDT'){
                    this.placeholder = '请输入竞猜金额（最高150UDST）'
                }
                else if(type=='ETH'){
                    this.placeholder = '请输入竞猜金额（最高1ETH）'
                }
            },
            handleMax(){
                this.sum = limitNumber(this.sum)

                if(this.coinName=='TITAN'){
                    if(this.sum>10000){
                        this.sum = 10000
                    }
                }
                else if(this.coinName=='USDT'){
                    if(this.sum>150){
                        this.sum = 150
                    }
                }
                else if(this.coinName=='ETH'){
                    if(this.sum>1){
                        this.sum = 1
                    }
                }
            },
            handleQuiz(){
                if(this.sum==''||this.sum==undefined||this.sum==null){return}
                let type = this.guessInputDataBasketball.type
                let dparam = this.guessInputDataBasketball.numberH
                let info = this.guessInputDataBasketball.info
                let number = this.guessInputDataBasketball.dparam
                let pid = this.guessInputDataBasketball.pid
                if(this.sum>0){
                    this.quizing=true
                    basketball_bet(this.betInfo.matchId,this.userName,this.token,this.coinName,this.moneyCode,this.sum,type,dparam,info,number,pid).then(res=>{
                        console.log(res)
                        if(res.code==='0'){
                            this.$refs.message.Message('竞猜成功');
                            this.sum = ''
                            this.getCoinBalanceList(this.userName,this.token)
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                        this.quizing=false
                    })
                }
            },
            getCoinBalanceList(userName,token){
                coin_balance_list(userName,token).then(res=>{
                    console.log('钱包列表',res)
                    if(res.code==='0'){
                        this.coin_arr  = res.data.coinBalanceCtoModels
                        this.coin_list = res.data.coinBalanceCtoModels
                        this.coinName = res.data.coinBalanceCtoModels[0].name
                        this.moneyCode = res.data.coinBalanceCtoModels[0].moneyCode
                        this.balance = res.data.coinBalanceCtoModels[0].balance
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .BetInput{
        position: absolute;
        width: 100%;
        height: 380px;
        background: #f1f1f1;
        overflow: hidden;
        bottom: 0;
        z-index: 1;
        box-sizing: border-box;
        box-shadow: 0  0 5px 1px rgba(0,0,0,.1);
        .head{
            display: flex;
            align-items: center;
            width: 100%;
            height: 70px;
            box-sizing: border-box;
            .coin-type{
                width:210px;
                height:70px;
                line-height: 70px;
                color: #4D4D4D;
                font-size: 24px;
                padding-left:30px;
                box-sizing: border-box;
            }
            ul{
                display: flex;
                align-items: center;
                li{
                    width:180px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    border-left: 1px solid #DFDFDF;
                    span{
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        width:44px;
                        height: 44px;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        color: #4D4D4D;
                        font-size: 24px;
                        padding-left: 10px;
                    }
                }
                .active{
                    background: #fff;
                }
            }
        }
        .input{
            width: 100%;
            height:170px;
            background: #fff;
            box-sizing: border-box;
            padding: 15px 30px;
            .t{
                display: flex;
                align-items: center;
                input{
                    display: block;
                    height: 70px;
                    width: 500px;
                    background: #f1f1f1;
                    border: none;
                    margin: 0 auto;
                    box-sizing: border-box;
                    padding: 0 10px;
                    color: #999999;
                    font-size: 28px;
                }
                input::placeholder{text-align: center;}
                .infuse{
                    width: 190px;
                    height:70px;
                    line-height: 70px;
                    color: #34C47C;
                    box-sizing: border-box;
                    padding-left: 30px;
                    display: flex;
                    overflow: hidden;
                    position: relative;
                    align-items: center;
                    justify-content: space-between;
                    font-size:28px;
                }
            }
            .b{
                display: flex;
                align-items: center;
                justify-content: space-between;

                margin-top: 15px;
                color: #333333;
                font-size: 24px;
                box-sizing: border-box;
                height: 40px;
                .money-sum{
                    color: #34C47C;
                    font-size: 36px;
                }
                .coin-name{
                    color:#999999 ;
                }
            }
        }
        .btn{
            width: 100%;
            height: 140px;
            background: #fff;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 30px;
            span{
                display: block;
                width:100%;
                margin:  0 auto;
                height: 70px;
                line-height: 70px;
                border-radius: 5px;
                background: #34C47C;
                text-align: center;
                color: #fff;
                font-size:36px;
            }
            .loading{
                background: #bfbfbf;
            }
        }
    }
</style>
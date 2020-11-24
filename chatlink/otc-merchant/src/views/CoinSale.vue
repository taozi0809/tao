<template>
    <div class="coinSale">
        <div class="h2">币商设置</div>

        <div class="add" @click="addShow=!addShow">管理</div>
        <div class="add-popup" v-if="addShow" @click="addShow=false">
            <ul class="add-nav">
                <li @click="$router.push({path:'/ConfigureA'})">添加新商品</li>
                <li @click="$router.push({path:'/Cim'})" v-if="!isAutoPayInfo">收款信息</li>
            </ul>
        </div>
        <div class="nav">
            <div class="nav-item buy" @click="$router.push({path:'/'})">购入</div>
            <div class="nav-item sale active" @click="$router.push({path:'/CoinSale'})">出售</div>
        </div>
        <div class="nav-nav">
            <span :class="swiperIndex==0?'active':''" @click="swiper.slideTo('0')">全部</span>
            <span :class="swiperIndex==1?'active':''" @click="swiper.slideTo('1')">已开启接单</span>
            <span :class="swiperIndex==2?'active':''" @click="swiper.slideTo('2')">未开启接单</span>
        </div>
        <div class="swiper-coinSale">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="coinSale-wrapper0" ref="coinSaleWrapper0">
                        <ul class="content">
                            <van-list v-model="loadingAll" :finished="finishedAll" finished-text="没有更多了" @load="onLoad('0')">
                                <li class="item" v-for="item in listAll" :key="item.tradeId">
                                    <div class="col1">
                                        <div class="l">
                                            <span class="col1-img"><img :src="item.coinIcon" alt=""></span>
                                            <p class="col1-p">{{item.coinSymbol}}</p>
                                        </div>
                                        <div class="r">
                                            <div class="r-p">接单</div>
                                            <van-switch v-model="item.status==1?true:false" size="28px" active-color="#4cd864" inactive-color="#eff0f4" @input="onSwitchInput(item)"/>
                                        </div>
                                    </div>
                                    <div class="col2">
                                        <span class="p14">出售价格：</span>
                                        <span class="price">{{item.price}} {{item.legalMoneySymbol}}/{{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col3">
                                        <span class="p14">接单时间：</span>
                                        <span class="p14">{{item.startTradeTime}}-{{item.endTradeTime}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">上限数量：</span>
                                        <span class="p14">{{item.amount}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">剩余库存：</span>
                                        <span class="p14">{{item.amount-item.finished}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">出售限额：</span>
                                        <span class="p14">{{item.minTradePrice}} - {{item.maxTradePrice}} {{item.legalMoneySymbol}}</span>
                                    </div>
                                    <div class="col5">
                                        <div class="pay">
                                            <p class="p14">付款方式： </p>
                                            <ul class="pay-list">
                                                <li v-for="cell in item.paymentMethods" :key="cell.paymentMethodId">
                                                    <span><img :src="cell.iconUrl" alt=""></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="change" @click="$router.push({path:'/EditorSale',query:{details:JSON.stringify(item)}})">修改</div>
                                    </div>
                                </li>
                            </van-list>
                        </ul>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="coinSale-wrapper1" ref="coinSaleWrapper1">
                        <ul class="content">
                            <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad('1')">
                                <li class="item" v-for="item in list1" :key="item.tradeId">
                                    <div class="col1">
                                        <div class="l">
                                            <span class="col1-img"><img :src="item.coinIcon" alt=""></span>
                                            <p class="col1-p">{{item.coinSymbol}}</p>
                                        </div>
                                        <div class="r">
                                            <div class="r-p">接单</div>
                                            <van-switch v-model="item.status==1?true:false" size="28px" active-color="#4cd864" inactive-color="#eff0f4" @input="onSwitchInput(item)"/>
                                        </div>
                                    </div>
                                    <div class="col2">
                                        <span class="p14">出售价格：</span>
                                        <span class="price">{{item.price}} {{item.legalMoneySymbol}}/{{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col3">
                                        <span class="p14">接单时间：</span>
                                        <span class="p14">{{item.startTradeTime}}-{{item.endTradeTime}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">上限数量：</span>
                                        <span class="p14">{{item.amount}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">剩余库存：</span>
                                        <span class="p14">{{item.amount-item.finished}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">出售限额：</span>
                                        <span class="p14">{{item.minTradePrice}} - {{item.maxTradePrice}} {{item.legalMoneySymbol}}</span>
                                    </div>
                                    <div class="col5">
                                        <div class="pay">
                                            <p class="p14">付款方式： </p>
                                            <ul class="pay-list">
                                                <li v-for="cell in item.paymentMethods" :key="cell.paymentMethodId">
                                                    <span><img :src="cell.iconUrl" alt=""></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="change" @click="$router.push({path:'/EditorSale',query:{details:JSON.stringify(item)}})">修改</div>
                                    </div>
                                </li>
                            </van-list>
                        </ul>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="coinSale-wrapper2" ref="coinSaleWrapper2">
                        <ul class="content">
                            <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad('2')">
                                <li class="item" v-for="item in list2" :key="item.tradeId">
                                    <div class="col1">
                                        <div class="l">
                                            <span class="col1-img"><img :src="item.coinIcon" alt=""></span>
                                            <p class="col1-p">{{item.coinSymbol}}</p>
                                        </div>
                                        <div class="r">
                                            <div class="r-p">接单</div>
                                            <van-switch v-model="item.status==1?true:false" size="28px" active-color="#4cd864" inactive-color="#eff0f4" @input="onSwitchInput(item)"/>
                                        </div>
                                    </div>
                                    <div class="col2">
                                        <span class="p14">出售价格：</span>
                                        <span class="price">{{item.price}} {{item.legalMoneySymbol}}/{{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col3">
                                        <span class="p14">接单时间：</span>
                                        <span class="p14">{{item.startTradeTime}}-{{item.endTradeTime}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">上限数量：</span>
                                        <span class="p14">{{item.amount}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">剩余库存：</span>
                                        <span class="p14">{{item.amount-item.finished}} {{item.coinSymbol}}</span>
                                    </div>
                                    <div class="col4">
                                        <span class="p14">出售限额：</span>
                                        <span class="p14">{{item.minTradePrice}} - {{item.maxTradePrice}} {{item.legalMoneySymbol}}</span>
                                    </div>
                                    <div class="col5">
                                        <div class="pay">
                                            <p class="p14">付款方式： </p>
                                            <ul class="pay-list">
                                                <li v-for="cell in item.paymentMethods" :key="cell.paymentMethodId">
                                                    <span><img :src="cell.iconUrl" alt=""></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="change" @click="$router.push({path:'/EditorSale',query:{details:JSON.stringify(item)}})">修改</div>
                                    </div>
                                </li>
                            </van-list>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {tradeList,updateTradeStatus} from "../service/api";
    import { Dialog } from 'vant';
    import {getSessionStore} from "../storage";

    export default {
        data(){
            return{
                swiper:null,
                swiperIndex:0,

                pageAll:0,
                pageSize:10,
                listAll: [],
                loadingAll: false,
                finishedAll: false,

                page1:0,
                list1: [],
                loading1: false,
                finished1: false,

                page2:0,
                list2: [],
                loading2: false,
                finished2: false,
                addShow:false,
            }
        },
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            this.isAutoPayInfo= JSON.parse(getSessionStore('isAutoPayInfo'))
        },
        mounted:function(){
            var that = this
            this.swiper = new Swiper ('.swiper-coinSale', {
                on:{
                    slideChangeTransitionStart:function(){
                        that.swiperIndex = this.activeIndex
                    },
                }
            })
        },
        methods:{
            tradeList(status,userName,token,pageSize){
                if(status==0){
                    this.pageAll++
                    tradeList(userName,token,status,2,this.pageAll,pageSize).then(res=>{
                        console.log('币商创建交易列表0',res)
                        if(res.code==0){
                            this.listAll=[...this.listAll,...res.data.otcTrades]
                            this.loadingAll = false;
                            if (res.data.otcTrades.length<10) {
                                this.finishedAll = true;
                            }
                        }
                    })
                }
                if(status==1){
                    this.page1++
                    tradeList(userName,token,status,2,this.page1,pageSize).then(res=>{
                        console.log('币商创建交易列表1',res)
                        if(res.code==0){
                            this.list1=[...this.list1,...res.data.otcTrades]
                            this.loading1 = false;
                            if (res.data.otcTrades.length<10) {
                                this.finished1 = true;
                            }
                        }
                    })
                }
                if(status==2){
                    this.page2++
                    tradeList(userName,token,status,2,this.page2,pageSize).then(res=>{
                        console.log('币商创建交易列表2',res)
                        if(res.code==0){
                            this.list2=[...this.list2,...res.data.otcTrades]
                            this.loading2 = false;
                            if (res.data.otcTrades.length<10) {
                                this.finished2 = true;
                            }
                        }
                    })
                }
            },
            updateTradeStatus(userName,token,tradeId,status){
                updateTradeStatus(userName,token,tradeId,status).then(res=>{
                    console.log('修改交易的接单状态：',res)
                    if(res.code==0){
                        tradeList(this.userName,this.token,0,2,1,this.pageSize).then(res=>{
                            console.log('币商创建交易列表0',res)
                            if(res.code==0){
                                this.listAll=res.data.otcTrades
                            }
                        })
                        tradeList(this.userName,this.token,1,2,1,this.pageSize).then(res=>{
                            console.log('币商创建交易列表1',res)
                            if(res.code==0){
                                this.list1=res.data.otcTrades
                            }
                        })
                        tradeList(this.userName,this.token,2,2,1,this.pageSize).then(res=>{
                            console.log('币商创建交易列表2',res)
                            if(res.code==0){
                                this.list2=res.data.otcTrades
                            }
                        })
                    }
                })
            },

            onLoad(number) {
                this.tradeList(number,this.userName,this.token,this.pageSize)
            },
            onSwitchInput(item){
                Dialog.confirm({
                    title: '提醒',
                    message: '是否切换开关？'
                }).then(() => {
                    var status = item.status==1?2:1
                    if(this.swiperIndex==0){
                        item.status=status
                    }
                    this.updateTradeStatus(this.userName,this.token,item.tradeId,status)
                }).catch(() => {});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .coinSale{
        width: 375px;
        background: #EFF0F4;
        position: absolute;
        top: 0;
        bottom: 0;
        .h2{
            color: #000;
            font-size: 17px;
            font-weight: bold;
            background: #fff;
            height: 50px;
            text-align: center;
            line-height: 50px;
        }
        .add{
            color: #002569;
            font-size: 15px;
            position: absolute;
            z-index: 3;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            top: 0;
        }
        .add-popup{
            position: absolute;
            top: 50px;
            bottom: 0;
            overflow: hidden;
            width: 100%;
            background: rgba(0,0,0,.7);
            z-index: 9;
            .add-nav{
                position: absolute;
                right: 0;
                top: 0;
                z-index: 10;
                background: #fff;
                li{
                    width: 124px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content:center ;
                    font-size: 13px;
                    color: #000;
                    border-bottom: 1px solid #D9D9D9;
                }
                li:last-child{
                    border: none;
                }

            }
        }
        .nav{
            width: 100%;
            display: flex;
            align-items: center;
            background: #fff;
            height: 40px;
            .nav-item{
                width: 80px;
                height: 25px;
                overflow: hidden;
                border-radius: 13px;
                color: #000;
                font-size: 17px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .buy{
                margin-left: 84px;
            }
            .sale{
                margin-left: 60px;
            }
            .active{
                background:rgba(1,48,113,1);
                color: #fff;
            }

        }
        .nav-nav{
            width: 375px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 16px;
            background: #fff;
            span{
                font-size: 13px;
                color: #000;
                width: 94px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                /*border: 1px solid red;*/
                box-sizing: border-box;
            }
            .active{
                border-bottom: 2px solid #013071;
            }
        }
        .swiper-coinSale{
            width:375px;
            position: absolute;
            top: 140px;
            bottom: 0;
            box-sizing: border-box;
            overflow: hidden;
            .coinSale-wrapper0,.coinSale-wrapper1,.coinSale-wrapper2{
                position: absolute;
                top:0;
                bottom: 0;
                overflow-y: scroll;
                overflow-x: hidden;
                box-sizing: border-box;
                left: 10px;
                right: 10px;
                ul{
                    .item{
                        width: 355px;
                        height: 320px;
                        background: #fff;
                        overflow: hidden;
                        border-radius: 5px;
                        margin-bottom: 10px;
                        .col1,.col5{
                            width: 100%;
                            height: 60px;
                            box-sizing: border-box;
                            /*border: 1px solid red;*/
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 20px;
                            .l{
                                display: flex;
                                align-items: center;
                                .col1-img{
                                    width: 23px;
                                    height: 23px;
                                    overflow: hidden;
                                    display: block;
                                    border-radius: 50%;
                                    margin-right: 10px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .col1-p{
                                    color:#1B1B1B;
                                    font-size: 15px;
                                }
                            }
                            .r{
                                display: flex;
                                align-items: center;
                                .r-p{
                                    color: #808080;
                                    font-size: 13px;
                                    margin-right: 8px;
                                }
                            }
                            .pay{
                                display: flex;
                                align-items: center;
                                overflow: hidden;
                                height: 60px;
                                .pay-list{
                                    display: flex;
                                    align-items: center;
                                    span{
                                        width: 23px;
                                        height: 23px;
                                        overflow: hidden;
                                        display: block;
                                        border-radius: 50%;
                                        margin-right: 10px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                }
                                .p14{
                                    color: #808080;
                                    font-size: 14px;
                                }
                            }
                            .change{
                                font-size: 12px;
                                color: #013071;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 60px;
                                height: 25px;
                                border-radius: 13px;
                                border: 1px solid #013071;
                            }
                        }
                        .col2,.col3,.col4{
                            width: 100%;
                            height: 40px;
                            box-sizing: border-box;
                            /*border: 1px solid red;*/
                            line-height: 40px;
                            padding: 0 20px;
                            .price{
                                color: #D71313;
                            }
                            .p14{
                                color: #808080;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

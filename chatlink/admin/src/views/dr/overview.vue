<template>
    <div class="overview">
       <div class="main-title">数据总览</div>
        <div class="row">
            <div class="time">
                <Time @selectTime="onSelectTime"/>
            </div>
        </div>
        <div class="row">
            <div class="item">
                <div class="l"></div>
                <div class="r">
                    <p>新增用户</p>
                    <p>{{user.newUserAmount}}</p>
                </div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r">
                    <p>总活跃用户</p>
                    <p>{{user.activeUserAmount}}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="item">
                <div class="l">OTC</div>
                <div class="r">
                    <p>OTC总订单数</p>
                    <p>{{otc.orderAmount}}</p>
                </div>
            </div>
            <div class="item">
                <div class="l">OTC</div>
                <div class="r">
                    <p>用户购买金额</p>
                    <p>¥ {{otc.userBuyMoney}}</p>
                </div>
            </div>
            <div class="item">
                <div class="l">OTC</div>
                <div class="r">
                    <p>用户出售总金额</p>
                    <p>¥ {{otc.userSellMoney}}</p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import Time from '../../components/time/Time'


    export default {
        components:{Time},
        data(){
            return{
                otc:{},
                user:{},
            }
        },
        computed:{

        },
        created:function(){

        },
        methods:{
            onSelectTime(res){
                this.otc=res.otc
                this.user=res.user

                // console.log(this.otc,this.user)
            },

        }
    }
</script>

<style lang="scss" scoped>
    .main-title{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 26px;
        color: #CCCCCC;
        display: flex;
        align-items: center;
    }
    .row{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .item{
            width: 240px;
            height: 90px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            .l{
                width:90px;
                height: 90px;
                background: #0093EE;

                font-size: 30px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
            .r{
                width:150px;
                height: 90px;
                background: #EFEFEF;
                p{margin: 0;padding: 0;}
                p:nth-child(1){
                    color: #707070;
                    font-size: 18px;
                    text-align: center;
                    padding:15px 0;
                }
                p:nth-child(2){
                    color: #444444;
                    font-size: 30px;
                    text-align: center;
                }

            }
        }
    }
</style>
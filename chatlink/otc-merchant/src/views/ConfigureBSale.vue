<template>
    <div class="ConfigureB">
        <div class="h2">出售</div>
        <div class="head">
            <div class="setp1">
                <span class="rectangle"></span>
                <span class="arrow-r"></span>
                <span class="des active">配置目标</span>
            </div>
            <div class="setp2">
                <span class="arrow-l"></span>
                <span class="rectangle"></span>
                <span class="arrow-r"></span>
                <span class="des active">选择币种</span>
            </div>
            <div class="setp3">
                <span class="arrow-l"></span>
                <span class="rectangle"></span>
                <span class="des">配置数据</span>
            </div>
        </div>
        <ul class="type">
            <li class="sale" v-for="item in coinBalanceCtoModels" @click="$router.push({path:'/ConfigureCSale',query:{coin:JSON.stringify(item)}})">
                <div class="l">
                    <span><img :src="item.icon" alt=""></span>
                    <span>{{item.name}}</span>
                </div>
                <div class="r">
                    <span>{{item.balance>0?item.balance:0}}</span>
                    <span>{{item.name}}</span>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
    import {getSessionStore} from "../storage";
    import {coinBalanceList} from "../service/api";

    export default {
        data(){
            return{
                coinBalanceCtoModels:[]
            }
        },
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            coinBalanceList(this.userName,this.token).then(res=>{
                console.log('钱包列表:',res)
                if(res.code==0){
                    this.coinBalanceCtoModels=res.data.coinBalanceCtoModels
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .ConfigureB{
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
        }
        .head{
            background: #fff;
            display: flex;
            align-items: center;
            width: 375px;
            height: 30px;
            overflow: hidden;
            border-bottom: 3px solid #EFF0F4;
            padding-bottom: 8px;
            .setp1,.setp2,.setp3{
                width: 125px;
                height: 30px;
                position: relative;
                .rectangle{
                    width: 115px;
                    height: 30px;
                    background: #013071;
                    display: block;
                    position: absolute;
                    left: 0;
                }
                .arrow-r{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #013071;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 115px;
                    z-index: 2;
                }
                .des{
                    color: #B3B3B3;
                    font-size: 14px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    line-height: 30px;
                }
                .active{
                    color: #fff;
                }
            }
            .setp2{
                left: 5px;
                .arrow-l{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #fff;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 0;
                    z-index: 2;
                }
                .rectangle{
                    width: 110px;
                    background: #013071;
                    position: absolute;
                    left:0px;
                }
                .arrow-r{
                    border-color: transparent transparent transparent #013071;
                    position: absolute;
                    z-index: 2;
                    left: 110px;

                }
            }
            .setp3{
                background: red;
                left: 5px;
                width: 120px;
                .arrow-l{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #fff;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 0;
                    z-index: 2;
                }
                .rectangle{
                    width: 120px;
                    background: #EFF0F4;
                    position: absolute;
                    left: 0px;
                }
            }
        }
        .type{
            background: #fff;
            width: 100%;
            .sale,.buy{
                width: 100%;
                height: 60px;
                border-bottom:1px solid #D9D9D9;
                background: #fff;
                box-sizing: border-box;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .l{
                    display: flex;
                    align-items: center;
                    span:nth-child(1){
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
                    span:nth-child(2){
                        color:#1B1B1B;
                        font-size: 15px;
                    }
                }
                .r{
                    span:nth-child(1){
                        color: #1B1B1B;
                        font-size: 15px;
                    }
                    span:nth-child(2){
                        color: #1B1B1B;
                        font-size: 15px;
                        margin-left: 5px;
                    }
                }
            }
        }
    }

</style>
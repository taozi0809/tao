<template>
    <div class="balance">
        <div class="title" @click="STATUS('0')">
            我的资产
            <span><img src="../../assets/images/asideL/close.png" alt=""></span>
        </div>
        <ul>
            <li v-for="(item,index) in list" :key="item.coinId" class="item">
                <span><img :src="item.icon" alt=""></span>
                <div class="name">{{item.name}}</div>
                <div class="value">{{item.balance}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {balanceList} from "../../service/api";
    export default {
        data(){
            return{
                list:[],
            }
        },
        computed:{
            ...mapState(['token','userInfo']),
        },
        created:function(){
            this.balanceList()
        },
        methods:{
            ...mapMutations(['STATUS']),
            balanceList(){
                balanceList(this.userInfo.userName,this.token).then(res=>{
                    console.log('钱包列表',res)
                    if(res.code==0){
                        this.list=res.data.coinBalanceCtoModels
                    }
                })
            },


        }
    }
</script>

<style lang="scss" scoped>
    .balance{
        width:13vw ;
        min-width: 208px;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        position: absolute;
        top: 114px;
        left: 0;
        bottom: 0;
        .title{
            width: 100%;
            height:50px;
            line-height: 50px;
            position: relative;
            font-size: 16px;
            /*border: 1px solid red;*/
            box-sizing: border-box;
            padding: 0 16px;
            background: #E8E9EE;
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 14px;
                position: absolute;
                top: 16px;
                right: 10px;
                cursor: pointer;
                img{
                    width: 100%;
                }
            }
        }
        .item{
            width: 100%;
            height: 70px;
            background: #E8E9EE;
            display: flex;
            align-items: center;
            position: relative;
            box-sizing: border-box;
            padding: 0 16px;
            span{
                width: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                img{
                    width: 100%;
                }
            }
            .name{
                font-size: 14px;
                font-weight: bold;
                font-family: "Leelawadee UI";
            }
            .value{
                position: absolute;
                right: 16px;
            }
        }
    }
    .balance::-webkit-scrollbar {display:none}
</style>
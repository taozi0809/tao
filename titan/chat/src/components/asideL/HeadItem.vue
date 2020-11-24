<template>
    <div class="head-item">
        <div class="head-img">
            <img :src="userInfo.avatar" alt="">
        </div>
        <div class="message">
            <div class="t1">{{userInfo.nickName}}</div>
            <div class="t2">{{userInfo.userName}}</div>
        </div>
        <div class="ISUSERINFOMENU" @click="ISUSERINFOMENU(true)">
            <img src="../../assets/images/asideL/arrow-bot.png" alt="">
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['token','userInfo','isUserInfoMenu','chatStatus'])
        },
        mounted:function(){

        },
        methods:{
            ...mapMutations(['ISUSERINFOMENU']),

        }
    }
</script>

<style lang="scss" scoped>
    .head-item{
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        background: #E8E9EE;
        box-sizing: border-box;
        padding: 0 10px;
        position: relative;
        cursor: pointer;
        .head-img{
            width:42px;
            height: 42px;
            overflow: hidden;
            margin-right: 10px;
            img{
                width: 100%;
            }
        }
        .t1{
            color: #333333;
            font-size: 16px;
            line-height: 20px;
        }
        .t2{
            color: #999999;
            font-size: 12px;
            line-height: 20px;
        }
        .ISUSERINFOMENU{
            width: 40px;
            height: 70px;
            position: absolute;
            top: 0;
            right:0;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            display: flex;
            justify-content: center;
            padding-top: 20px;
            img{
                width:14px;
                height:7px;
            }
        }
    }
</style>


<template>
    <div class="friend-info">
        <HeadTop/>
        <div class="info">
            <div class="item" v-for="(item,index) in friendRelationApplys" :key="index">
                <div class="head-img"><img :src="item.avatar" alt=""></div>
                <div class="des-info">
                    <div class="t1">{{item.nickName}}</div>
                    <div class="t2">备注</div>
                    <div class="t3">{{item.applyContent}}</div>
                </div>
                <div class="btn">
                    <!--<div class="disagree" @click="relationDisagree(item)">忽略</div>-->
                    <div class="agree" @click="relationAgree(item)">同意</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTop from './main/HeadTop'
    import {mapState, mapMutations} from 'vuex'
    import {relationAgree,relationDisagree} from "../service/api";

    export default {
        components:{HeadTop},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['chatStatus','friendRelationApplys','userInfo','token']),
        },
        created:function(){

        },
        methods:{
            ...mapMutations(['CHATSTATUS','NAV','CHATINFO','CHATINFOINDEX']),
            relationDisagree(item){
                relationDisagree(this.userInfo.userName,this.token,item.idCode,item.applyContent).then(res=>{
                    console.log('拒绝好友申请',res)
                })
            },
            relationAgree(item){
                relationAgree(this.userInfo.userName,this.token,item.idCode,item.applyContent).then(res=>{
                    console.log('同意好友申请',res)
                })
            },
        }

    }
</script>

<style lang="scss" scoped>
    .friend-info{
        width:35.5vw;
        height: 39vw;
        min-width: 568px;
        min-height: 625px;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
        box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
        border-left: none;
        border-right: none;
        border-left: none;
        background: #fff;
        overflow: hidden;
        .info{
            overflow-x: hidden;
            overflow-y: auto;
            border-top: 1px solid #D0D0D0;
            width: 100%;
            /*height: 35.1vw;*/
            height:calc(35.1vw - 15px);
            min-width: 568px;
            /*min-height:562.5px;*/
            min-height:547.5px;
            box-sizing: border-box;
            .item{
                display: flex;
                align-items: center;
                width: 100%;
                height: 120px;
                box-sizing: border-box;
                padding:0 15px;
                position: relative;
                .head-img{
                    width: 84px;
                    height: 84px;
                    overflow: hidden;
                    border-radius:5px;
                    margin-right: 15px;
                    /*border: 1px solid red;*/
                    img{
                        width: 100%;
                    }
                }
                .des-info{
                    .t1{
                        font-size: 16px;
                        color: #333;
                        font-weight: bold;
                        height: 40px;
                        line-height: 40px;
                    }
                    .t2{
                        font-size:13px;
                        color: #333;
                        height: 22px;
                        line-height: 22px;
                    }
                    .t3{
                        font-size:13px;
                        color: #888;
                        height: 22px;
                        line-height: 22px;
                    }
                }
                .btn{
                    position: absolute;
                    right: 15px;
                    display: flex;
                    align-items: center;
                    .disagree,.agree{
                        width: 84px;
                        height: 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #003680;
                        border-radius: 6px;
                        color: #003680;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .agree{
                        margin-left: 15px;
                    }
                }
            }


        }
        .info::-webkit-scrollbar {display:none}

    }
</style>
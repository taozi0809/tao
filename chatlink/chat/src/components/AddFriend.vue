<template>
    <div class="add-friend" @click.stop="POPOVER('0')">
        <div class="con" @click.stop="POPOVER('5')">
            <div class="t">
                <input type="text" v-model="account" placeholder="手机号">
                <div class="label" @click="goSearch">搜索</div>
            </div>
            <div class="infos" v-if="isShow">
                <span class="head-img"><img :src="data.avatar" alt=""></span>
                <div class="info">
                    <div class="name">{{data.nickName}}</div>
                    <div class="des">{{data.account}}</div>
                </div>
                <div class="btn" @click="addFriend">加为好友</div>
            </div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {userInfo,friendRelationApply} from "../service/api";


    export default {
        data(){
            return{
                account:'',
                data:{},
                isShow:false,
            }
        },
        computed:{
            ...mapState(['userInfo','token','chatInfo']),
        },
        created:function(){

        },
        methods:{
            ...mapMutations(['POPOVER']),
            goSearch(){
                if(!!this.account){
                    userInfo(this.account).then(res=>{
                        console.log('搜索用户',res)
                        if(res.code==0){
                            this.data=res.data
                            this.isShow=true
                        }else{
                            this.$refs.message.Message(res.message);
                            this.isShow=false
                        }
                    })
                }
            },
            addFriend(){
                friendRelationApply(this.userInfo.userName,this.token,this.data.idCode,`我是${this.userInfo.nickName}`).then(res=>{
                    console.log('添加好友',res)
                    if(res.code==0){
                        this.POPOVER('0')
                        window.location.reload();
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .add-friend{
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        .con{
            height:350px;
            width: 470px;
            background: #fff;
            border-radius: 6px;
            .t{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding:0 20px;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                input{
                    background:#EDEDED ;
                    border:1px solid rgba(228, 228, 228, 1);
                    border-radius:6px;
                    height: 30px;
                    width: 360px;
                    margin-right: 20px;
                    padding: 0 15px;
                    color: #333333;
                    font-size: 14px;
                }
                .label{
                    width: 40px;
                    height: 30px;
                    line-height: 30px;
                    color: #333333;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
            .infos{
                display: flex;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                position: relative;
                padding: 0 20px;
                .head-img{
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    display: block;
                    margin-right: 10px;
                    border-radius: 5px;
                    img{
                        width: 100%;
                    }
                }
                .info{
                    .name{
                        color: #333333;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .des{
                        color: #888888;
                        font-size: 14px;
                    }
                }
                .btn{
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
                    position: absolute;
                    right: 20px;
                }
            }

        }
    }
</style>
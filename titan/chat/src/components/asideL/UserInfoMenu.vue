<template>
    <div class="userInfo-menu" @click="ISUSERINFOMENU(false)">
        <div class="box">
            <ul>
                <li @click="go('create_group')">
                    <span class="icon"><img src="../../assets/images/asideL/userInfoMenu/create_group.png" alt=""></span>
                    <span class="label">创建群聊</span>
                </li>
                <li @click="go('add_friend')">
                    <span class="icon"><img src="../../assets/images/asideL/userInfoMenu/add_friend.png" alt=""></span>
                    <span class="label">添加好友</span>
                </li>
                <li @click="go('balance')">
                    <span class="icon"><img src="../../assets/images/asideL/userInfoMenu/balance.png" alt=""></span>
                    <span class="label">我的资产</span>
                </li>
                <li @click="go('login_out')">
                    <span class="icon"><img src="../../assets/images/asideL/userInfoMenu/login_out.png" alt=""></span>
                    <span class="label">退出登录</span>
                </li>
            </ul>
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
            ...mapState(['isUserInfoMenu']),
        },
        methods:{
            ...mapMutations(['ISUSERINFOMENU','STATUS','TOKEN','USERINFO','POPOVER']),
            go(type){
                switch (type){
                    case 'create_group':
                        this.POPOVER('3')
                        break;
                    case 'add_friend':
                        this.POPOVER('5')
                        break;
                    case 'balance':
                        this.STATUS('1')
                        break;
                    case 'login_out':
                        this.TOKEN('')
                        this.USERINFO({})
                        // this.$router.push('/login')
                        window.location.reload();
                        break;

                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.userInfo-menu{
    position: absolute;
    z-index: 11;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .box{
        position: relative;
        width:13vw;
        height: 39vw;
        min-width: 208px;
        min-height: 625px;
        /*border: 1px solid #000;*/
        overflow: hidden;
        box-sizing: border-box;
        /*background: #D5DCE6;*/
        ul{
            background: #fff;
            border-radius: 5px;
            width: 120px;
            position: absolute;
            top: 40px;
            right: 20px;
            li{
                width:120px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-sizing: border-box;
                /*border: 1px solid red;*/
                .icon{
                    display: block;
                    width: 16px;
                    height: 16px;
                    overflow: hidden;
                    margin-right: 6px;
                    img{
                        width: 100%;
                    }
                }
                .label{
                    color: #333333;
                    font-size: 14px;
                }
            }
            li:hover{
                background:rgba(60,60,60,.1);
            }
        }
    }

}
</style>
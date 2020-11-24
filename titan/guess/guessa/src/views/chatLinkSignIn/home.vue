<template>
    <div class="home">
        <span class="home-bg"><img src="../../assets/img/chatLinkSignIn/page1.png" alt=""></span>
        <span class="join" @click="handleLinkToRegister"><img src="../../assets/img/chatLinkSignIn/join.png" alt=""></span>


        <message ref="message"/>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                inviteCode:''
            }
        },
        created:function(){
            this.inviteCode = this.$route.query.inviteCode
        },
        methods:{
            handleLinkToRegister(){
                this.$router.push({
                    path:'/chatLinkSignInRegister',
                    query:{
                        inviteCode:this.inviteCode,
                    }
                })
            }
        },
        mounted:function(){
            if(!!this.inviteCode){}else{
                this.$refs.message.Message('未获取到邀请码');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #3b4cd9;
        .home-bg{
            width: 100%;
            display: block;
            img{
                width: 100%;
            }
        }
        .join{
            display: block;
            width: 277px;
            position: absolute;
            top:545px;
            right: 22px;
            z-index: 50;
            img{
                width: 100%;
            }
        }
        .swiper-container{
            position: absolute;
            bottom: 0;
            z-index: 0;
            .banner-slide{
                position: relative;
                width: 750px;
                display: block;
                box-sizing: border-box;
                overflow: hidden;
                /*border: 1px solid red;*/
                img{
                    width: 150%;
                    position: relative;
                    left:-170px;
                    bottom: -130px;
                }
            }
        }

    }
</style>
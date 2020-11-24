<template>
    <div class="home">
        <span class="home-bg"><img src="../../assets/img/invitationRegister/home-bg.png" alt=""></span>
        <span class="join" @click="handleLinkToRegister"><img src="../../assets/img/invitationRegister/join.png" alt=""></span>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!--<div class="swiper-slide">-->
                    <!--<span class="banner-slide"><img src="../../assets/img/invitationRegister/banner/1.png" alt=""></span>-->
                <!--</div>-->
                <div class="swiper-slide">
                    <span class="banner-slide"><img src="../../assets/img/invitationRegister/banner/2.png" alt=""></span>
                </div>
            </div>
        </div>

        <message ref="message"/>
    </div>
</template>
<script>

    import Swiper from 'swiper';
    // import Cookies from 'js-cookie'
    export default {
        data(){
            return{
                swiper:{},
                inviteCode:''
            }
        },
        created:function(){
            this.inviteCode = this.$route.query.inviteCode

            // Cookies.set('abc','1')
            // alert(Cookies.get('abc'))
        },
        methods:{
            handleLinkToRegister(){
                this.$router.push({
                    path:'/invitationRegisterRegister',
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

            this.swiper = new Swiper ('.swiper-container', {
                threshold : 30,
                direction: 'horizontal',
                hashNavigation: {
                    watchState: true,
                },
            })
        },
    }
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../../assets/img/invitationRegister/bg.png") no-repeat;
        background-size: 100%;
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
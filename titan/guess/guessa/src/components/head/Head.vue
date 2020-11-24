<template>
    <div class="head">
        <div class="title">足球</div>
        <!--<div class="nav">-->
            <!--<router-link to="/" exact>足球</router-link>-->
            <!--<router-link to="/basketball" exact>篮球</router-link>-->
            <!--<a @click="handleBasketball">篮球</a>-->
        <!--</div>-->
        <span class="screen" @click="handleScreen"><img src="../../assets/img/head/screen.png" alt=""></span>
        <!--<span class="menu" @click="handleMenu"><img src="../../assets/img/head/menu.png" alt=""></span>-->
        <Competition v-if="isCompetition"/>
        <transition name="slide-fade">
            <Menu v-if="isMenu"/>
        </transition>
        <div class="bg" v-if="isMenu" @click="handleHideMenu"></div>
    </div>
</template>

<script>
    import Competition from './Competition'
    import Menu from '../../components/head/Menu'
    import {mapState, mapMutations} from 'vuex'
    export default {
        components:{Competition,Menu},
        data(){
            return{
                activeNum:0,
            }
        },
        computed:{
            ...mapState(['isMenu','isCompetition']),
        },
        methods:{
            ...mapMutations(['MESSAGE','ISCOMPETITION','ISMENU']),
            handleScreen(){
                this.ISCOMPETITION(true)
            },
            handleTo(num){
                this.activeNum = num
            },
            handleMenu(){
                this.ISMENU(true)
            },
            handleHideMenu(){
                this.ISMENU(false)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .head{
        width: 100%;
        height: 80px;
        background: #34C47C;
        position: fixed;
        top:0;
        left:0;
        z-index: 10;
        @include flex;
        .title{
            color: #fff;
            font-size: 36px;
        }
        .nav{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            a{
                display: block;
                width: 180px;
                height: 60px;
                border: 1px solid #fff;
                box-sizing: border-box;
                overflow: hidden;
                @include flex;
            }
            a:nth-child(1){
                border-top-left-radius:30px;
                border-bottom-left-radius: 30px;
            }
            a:nth-child(2){
                border-top-right-radius:30px;
                border-bottom-right-radius: 30px;
            }
            .active{
                background: #fff;
                color: #34C47C;
            }
        }
        .screen{
            display: block;
            width: 40px;
            position: absolute;
            right: 100px;
            top:50%;
            transform: translateY(-50%);
            img{
                width: 100%;
            }
        }
        .menu{
            display: block;
            width: 40px;
            position: absolute;
            right: 25px;
            top:50%;
            transform: translateY(-50%);
            img{
                width: 100%;
            }
        }
        .bg{
            position:fixed;
            width: 100%;
            top:0;
            bottom: 0;
            z-index:10;
            background: rgba(0,0,0,.7);
        }
    }
    .slide-fade-enter-active {
        transition: all .3s linear;
    }
    .slide-fade-leave-active {
        transition: all .3s linear;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-200%);
    }
</style>
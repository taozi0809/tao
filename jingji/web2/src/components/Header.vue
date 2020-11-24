<template>
    <div class="header" :class="isPC?'pc-header':'mobile-header'">
        <ul v-if="isPC" class="ul">
            <li @click="goElement('1')" class="logo-img">
                <span><img src="../assets/img/logo1.png" alt=""></span>
                <span><img src="../assets/img/logo2.png" alt=""></span>
            </li>
            <li v-for="(item,index) in menu" :key="item.name" @click="goElement(index+1)" :class="goActiveIndex==index?'active':''">
                <h3>{{item.name}}</h3>
            </li>
        </ul>
        <ul v-if="!isPC" class="ul">
            <li @click="goElement('1')" class="logo-img">
                <span><img src="../assets/img/logo1.png" alt=""></span>
                <span><img src="../assets/img/logo2.png" alt=""></span>
            </li>
            <li @click="handleMenu"><img src="../assets/img/menu.png" alt=""></li>
        </ul>

        <div class="tm" v-if="isTm" @click="isTm=false"></div>
        <transition name="fade" enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight">
            <ul class="tm-ul" v-if="isTm" >
                <li v-for="(item,index) in menu" :key="item.name" @click="goElement(index+1)" :class="goActiveIndex==index?'active':''">
                    <h3>{{item.name}}</h3>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    import {ispc} from "../utils/isPc";
    import {bus} from "../utils/eventBus";
    export default{
        data(){
            return{
                menu:[
                    {
                        name:'首页'
                    },
                    {
                        name:'公司介绍'
                    },
                    {
                        name:'产品介绍'
                    },
                    {
                        name:'我们优势'
                    },
                    {
                        name:'合作对象'
                    },
                    {
                        name:'加盟流程'
                    },
                    {
                        name:'扶持计划'
                    },
                    {
                        name:'联系我们'
                    },

                ],
                isPC:true,
                isTm:false,
                goActiveIndex:0,

            }
        },
        props:["currentIndex"],
        created() {
            this.isPC=ispc()
        },
        mounted() {
            // console.log(this.currentIndex)
        },
        methods:{
            emit(name,data){
                bus.$emit(name,data)
            },
            goElement(index){
                this.$emit('goToElement',index)
                this.goActiveIndex=index-1
                if(!this.isPC){
                    this.isTm=false
                }
            },
            handleMenu(){
                this.isTm=!this.isTm
            },
            onGoToElement(index){
                this.scroll.scrollToElement(document.querySelector(`#item${index}`),300)
            },

        },
        watch:{
            currentIndex(newVal,oldVal){
                this.goActiveIndex = newVal
            }
        }

    }
</script>

<style scoped lang="scss">
.pc-header{
    width: 100%;
    box-sizing: border-box;
    background: #000;
    position: fixed;
    z-index: 2;
    top: 0;
    overflow: hidden;
    ul{
        display: flex;
        width: 80vw;
        min-width: 960px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 auto;
        height: 80px;
        overflow: hidden;
        .logo-img{
            display: flex;
            align-items: center;
            width: 170px;
            flex-shrink: 0;
            img{
                width: 100%;
            }
        }
        li{
            cursor: pointer;
            padding: 0 8px;
            text-align: center;
            h3{
                color: #fff;
                font-size: 18px;
                font-weight: normal;
                font-family: 微软雅黑;
            }
            h4{
                color: #aeaeae;
                font-size: 11px;
                font-weight: normal;
                font-family: 微软雅黑;
            }
        }
        .active{
            background: rgba(212,181,148,.1);
            h3{
                color: #d4b594;
            }

        }
        li:hover{
            background: rgba(212,181,148,.1);
            h3{
                color: #d4b594;
            }
        }
    }
    @media screen and (min-width:960px) and (max-width:1280px) {
        ul{
            .logo-img{
                display: flex;
                align-items: center;
                width:120px;
                flex-shrink: 0;
                img{
                    width: 100%;
                }
            }
            li{
                h3{
                    font-size: 12px;
                }
                h4{
                    font-size: 10px;
                    white-space:nowrap;
                }
            }

        }
    }

}
.mobile-header{
    width: 100%;
    box-sizing: border-box;
    background: #000;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        box-sizing: border-box;
        padding: 0 15px;
        .logo-img{
            display: flex;
            align-items: center;
            width:120px;
            flex-shrink: 0;
            img{
                width: 100%;
            }
        }
        li:nth-child(2){
            width: 10vw;
            position: relative;
            z-index: 99;
            img{
                width: 100%;
            }
        }
    }
    .tm{
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100%;
        bottom: 0;
        background: rgba(0,0,0,.5);
    }
    .tm-ul{
        width: 40%;
        background:#fbf4e7;
        bottom: 0;
        position:fixed;
        top:50px;
        z-index: 999;
        right: 0;
        li{
            width: 100%;
            text-align: center;
            padding: 1vw 0;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            h3{
                font-size: 4vw;
                color: #9D6639;
                font-family: 微软雅黑;
            }
        }
        .active{
            background: #f5e1c5;
        }
    }
}
</style>

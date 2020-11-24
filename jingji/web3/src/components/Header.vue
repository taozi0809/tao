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
    background: #062A4E;
    position: fixed;
    z-index: 2;
    top: 0;
    overflow: hidden;
    ul{
        display: flex;
        width:1200px;
        height: 80px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 auto;
        overflow: hidden;
        .logo-img{
            display: flex;
            align-items: center;
            width: 170px;
            flex-shrink: 0;
            overflow: hidden;
            padding: 0 15px;
            img{
                width: 100%;
            }
        }
        li{
            cursor: pointer;
            text-align: center;
            overflow: hidden;
            h3{
                color: #fff;
                font-size: 18px;
                font-weight: normal;
                font-family: 微软雅黑;
                width:110px;
                height: 80px;
                line-height: 80px;

            }
        }
        .active{
            h3{
                color: #d4b594;
            }

        }
        li:hover{
            h3{
                color: #d4b594;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        ul{
            width:900px;
            height: 60px;
            .logo-img{
                width:120px;
            }
            li{
                h3{
                    height: 60px;
                    line-height: 60px;
                    font-size: 14px;
                }
            }
        }


    }
   

}
.mobile-header{
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #062A4E;
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
        background: #dbecfe;
        bottom: 0;
        position:fixed;
        top:50px;
        z-index: 999;
        right: 0;
        li{
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            height: 50px;
            line-height: 50px;
            h3{
                font-size: 4vw;
                color: #6482B7;
                font-family: 微软雅黑;
            }
        }
        .active{
            background: #5681CD;
            h3{
                /*color:#5682ce;*/
                /*color:#062a4e;*/
                color: #fff;
            }
        }
    }
}
</style>

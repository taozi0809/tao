<template>
    <div class="header" :class="isPC?'pc-header':'mobile-header'">
        <ul v-if="isPC" class="ul">
            <li @click="goElement('1')" class="logo-img">
                <span><img src="../assets/img/logo.png" alt=""></span>
            </li>
            <li v-for="(item,index) in menu" :key="item.name" @click="goElement(index+1)" :class="goActiveIndex==index?'active':''">
                <div class="t1">{{item.name}}</div>
                <div class="t2">{{item.label}}</div>
            </li>
        </ul>
        <ul v-if="!isPC" class="ul">
            <li @click="goElement('1')" class="logo-img">
                <span><img src="../assets/img/logo.png" alt=""></span>
            </li>
            <li @click="handleMenu"><img src="../assets/img/menu.png" alt=""></li>
        </ul>

        <div class="tm" v-if="isTm" @click="isTm=false"></div>
        <transition name="fade" enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight">
            <ul class="tm-ul" v-if="isTm" >
                <li v-for="(item,index) in menu" :key="item.name" @click="goElement(index+1)" :class="goActiveIndex==index?'active':''">
                    <div class="t1">{{item.name}}</div>
<!--                    <div class="t2">{{item.label}}</div>-->
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
                        name:'首页',
                        label:"HOME"
                    },
                    {
                        name:'产品介绍',
                        label:"PRODUCT DESCRIPTION"
                    },
                    {
                        name:'资质展示',
                        label:"QUALIFICATION SHOW"
                    },
                    {
                        name:'新闻资讯',
                        label:"NEWS INFORMATION"
                    },
                    {
                        name:'关于我们',
                        label:"ABOUT US"
                    },
                    {
                        name:'国家政策',
                        label:"NATIONAL POLICY"
                    },
                    {
                        name:'推广中心',
                        label:"PROMOTION CENTER"
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
               if(index==7){
                   window.open("http://caishenhongbao.com/jj/admin/#/login")
               }else{
                   this.$emit('goToElement',index)
                   this.goActiveIndex=index-1
                   if(!this.isPC){
                       this.isTm=false
                   }
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
    background: #fff;
    position: fixed;
    z-index: 2;
    top: 0;
    ul{
        display: flex;
        width:1200px;
        box-sizing: border-box;
        margin: 0 auto;
        overflow: hidden;
        .logo-img{
            display: flex;
            align-items: center;
            width: 150px;
            flex-shrink: 0;
            margin-right: 120px;
            img{
                width: 100%;
            }
        }
        li{
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            height: 80px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            align-content: center;
            .t1{
                color: #333;
                font-size: 18px;
                width: 100%;
                font-weight: 600;
            }
            .t2{
                color: #333;
                font-size: 12px;
                white-space:nowrap;
                width: 100%;
                margin-top: 10px;
            }
        }
        .active{
            .t1,.t2{
                color: #C30B0B;
            }
        }
        li:hover{
            .t1,.t2{
                color: #C30B0B;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        ul{
            width:900px;
            .logo-img{
                width:112px;
                margin-right:30px;
            }
            li{
                height: 60px;
                .t1{
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
    background: #fff;
    .ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 14vw;
        box-sizing: border-box;
        .logo-img{
            display: flex;
            align-items: center;
            width:25vw;
            flex-shrink: 0;
            margin-left: 4vw;
            img{
                width: 100%;
            }
        }
        li:nth-child(2){
            width:8.5vw;
            position: relative;
            z-index: 99;
            right: 3vw;
            img{
                width: 100%;
            }
        }
    }
    .tm{
        position: fixed;
        top: 14vw;
        z-index: 2;
        width: 100%;
        bottom: 0;
        background: rgba(0,0,0,.5);
    }
    .tm-ul{
        width: 40vw;
        background: #fff;
        bottom: 0;
        position:fixed;
        top:14vw;
        z-index: 999;
        right: 0;
        li{
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            height:15vw;
            line-height: 15vw;
            .t1{
                font-size: 4vw;
                color: #333;
            }
        }
        .active{
            background: #C30B0B;
            .t1{
                color: #fff;
            }
        }
    }
}
</style>

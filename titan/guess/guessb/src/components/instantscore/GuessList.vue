<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <ul>
                <li v-for="(item,index) in guessScore">
                    <router-link :to ="{name:'gameDetail',params :{id:index}}">
                        <div class="t1">
                            <span>{{item.name}} <i>{{item.time}}</i></span>
                            <span>{{item.status}}</span>
                        </div>
                        <div class="t2">
                            <span>{{item.l.scroe}}</span>
                            <span>{{item.result}}</span>
                            <span>{{item.r.scroe}}</span>
                        </div>
                        <div class="t3">
                                        <span>
                                <i><img :src="item.l.src" alt=""></i>
                                {{item.l.name}}
                            </span>
                            <span>vs</span>
                            <span>
                                {{item.r.name}}
                                <i><img :src="item.r.src" alt=""></i>
                            </span>
                        </div>
                        <div class="t4">
                            <span>{{item.l.total}}</span>
                            <span>{{item.r.total}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                scroll:null,
            }
        },
        computed:{
            ...mapState(['guessScore']),
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            initScroll(){
                this.scroll = null
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .wrapper{
        width: 100%;
        position: absolute;
        top:0;
        bottom: 0;
        left:0;
        overflow: hidden;
        .content{
            width: 100%;
            box-sizing: border-box;
            padding: 15px 0;
            ul{
                li{
                    a{
                        width: 100%;
                        box-sizing: border-box;
                        padding: 18px 22px;
                        height: 200px;
                        display: block;
                        .t1{
                            @include flexX(space-between);
                            span:nth-child(1){
                                color: #34C47C;
                                font-size: 26px;
                                font-weight: 600;
                                i{
                                    color: #999999;
                                    font-size: 24px;
                                }
                            }
                            span:nth-child(2){
                                color: #999999;
                                font-size: 24px;
                            }
                        }
                        .t2{
                            @include flex;
                            padding-top: 20px;
                            box-sizing: border-box;
                            span{
                                display: block;
                                box-sizing: border-box;
                                @include ellipsis;
                                color: #999999;
                                font-size: 20px;
                                height: 30px;
                                line-height: 30px;
                            }
                            span:nth-child(1){
                                width: 320px;
                                text-align: right;
                                padding-right: 15px;
                            }
                            span:nth-child(2){
                                width: 110px;
                                text-align: center;
                            }
                            span:nth-child(3){
                                width: 320px;
                                text-align: left;
                                padding-left:15px ;
                            }
                        }
                        .t3{
                            @include flex;
                            padding-top: 20px;
                            box-sizing: border-box;
                            span{
                                display: flex;
                                align-items: center;
                                box-sizing: border-box;
                                @include ellipsis;
                                color:#333333;
                                font-size: 24px;
                                i{
                                    display: block;
                                    width: 30px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                            span:nth-child(1){
                                width: 320px;
                                text-align: right;
                                padding-right: 15px;
                                justify-content: flex-end;
                                i{
                                    margin-right: 15px;
                                }
                            }
                            span:nth-child(2){
                                width: 110px;
                                text-align: center;
                                font-size: 36px;
                                justify-content: center;
                                position: relative;
                                top:-6px;
                            }
                            span:nth-child(3){
                                width: 320px;
                                text-align: left;
                                padding-left:15px ;
                                i{
                                    margin-left: 15px;
                                }
                            }
                        }
                        .t4{
                            @include flex;
                            padding-top: 20px;
                            box-sizing: border-box;
                            span{
                                display: block;
                                box-sizing: border-box;
                                @include ellipsis;
                                color: #999999;
                                font-size: 20px;
                                width: 375px;
                            }
                            span:nth-child(1){
                                text-align: right;
                                padding-right: 70px;
                            }
                            span:nth-child(2){
                                text-align: left;
                                padding-left: 70px;

                            }
                        }
                    }
                }
            }
        }
    }
</style>
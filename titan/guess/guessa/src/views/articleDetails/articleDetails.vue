<template>
    <div class="articleDetails">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="title">{{articleRes.title}}</div>
                <div class="fm">
                    <!--<div class="img-box">-->
                        <!--<span><img :src="articleRes.cover" alt=""></span>-->
                        <!--<div class="img-des">-->
                            <!--<p>{{articleRes.subtitle}}</p>-->
                            <!--<p>{{articleRes.createTime | timestampToTime}}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <p class="time">{{articleRes.createTime | timestampToTime}}</p>
                </div>
                <div class="des" v-html="articleRes.content"></div>
            </div>

            <div class="no-data" v-if="!is_data">无内容</div>

        <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {article_details} from "../../service/api";
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                scroll:null,
                articleRes:{},
                id:'',
                is_data:false,
            }
        },
        created:function(){
            this.id = this.$route.params.id
            article_details(this.id).then(res=>{
               console.log(res)
                if(res.code=='0'){
                   this.is_data = true
                   this.articleRes = res.data

                }
            })
        },
        mounted:function(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    pullUpLoad: {
                        threshold: -30
                    },
                })
            })
        },
    }
</script>

<style lang="scss" scoped>
    .articleDetails{
        position: absolute;
        top:0;
        width: 100%;
        bottom: 0;
        box-sizing: border-box;
        .wrapper{
            position: absolute;
            top:0;
            width: 100%;
            bottom: 0;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            overflow: hidden;
            .content{
                width: 100%;
                .title{
                    font-size: 36px;
                    text-align: center;
                    padding-top: 20px;
                }
                .fm{
                    width: 100%;
                    padding:30px 15px;
                    .time{
                        font-size: 24px;
                        color: #999;
                    }
                }
                .des{
                    box-sizing: border-box;
                    padding:0 15px;
                    line-height: 1.4;
                    font-size: 28px;
                    color: #333;
                    padding-bottom: 100px;
                    /*white-space:pre-wrap;*/
                    /*word-wrap:break-word;*/
                    /*word-break:break-all;*/
                }
                .no-data{
                    font-size: 28px;
                    color: #999;
                    text-align: center;
                    padding-top: 100px;
                }
            }
        }
    }
</style>
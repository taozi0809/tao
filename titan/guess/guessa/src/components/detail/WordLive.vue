<template>
    <div class="WordLive" ref="wrapper">
        <div class="content">
            <ul v-if="isShow">
                <li v-for="(item,index) in matchTextLives" :key="index">
                    <div class="time">{{item.elapsed}}'</div>
                    <div class="text">{{item.text}}</div>
                </li>
            </ul>
            <div class="no-data" v-else>
                <span><img src="../../assets/img/detail/no-character.png" alt=""></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {football_match_text_live} from "../../service/api";
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                matchId:'',
                matchTextLives:[],
                isShow:false,
                scroll:null,
            }
        },
        created:function(){
            this.matchId = this.$route.query.matchId

            football_match_text_live(this.matchId).then(res=>{
                if(res.code==0){
                    this.matchTextLives = res.data.matchTextLives
                    if(this.matchTextLives>0){
                        this.isShow = true
                    }
                    console.log('文字直播：',this.matchTextLives)
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
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    .WordLive{

        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        .content{
          width: 100%;
            ul{
                li{
                    width: 100%;
                    box-sizing: border-box;
                    height: 200px;
                    padding:40px 20px;
                    .time{
                        font-size: 40px;
                        font-weight: bold;
                        color: #333;
                        font-style: italic;
                        padding-bottom: 10px;
                    }
                    .text{
                        width: 100%;
                        color: #333;
                        font-size: 14px;
                        padding:20px 10px;
                        background: #f0f0f0;
                        border-radius: 3px;
                        box-sizing: border-box;
                        line-height: 1.2;
                    }
                }
            }
            .no-data{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 800px;
                span{
                    width: 140px;
                    display: block;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
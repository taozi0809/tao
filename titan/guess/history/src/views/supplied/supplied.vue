<template>
    <div class="supplied">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <li v-for="item in data" @click="handleToContent(item.predictionId)">
                    <div class="t">
                        <p>{{item.createTime | timestampToTime}}</p>
                        <p :class="'c'+item.status">{{item.canRefund | toCanRefund}}{{item.status | toStatus}}</p>
                    </div>
                    <div class="c">
                        <p>{{item.title}}</p>
                        <p>{{item.sum}}{{item.coinName}}</p>
                    </div>
                    <div class="b">
                        <p>购买人数：{{item.buyCount}}人</p>
                        <p>总收益：{{(item.sum*item.buyCount).toFixed(2)}}{{item.coinName}}</p>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {userPrediction} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                scroll:null,
                userName:'',
                token:'',
                page:0,
                pageSize:10,
                isMore:true,
                data:[],
                // userName:'uw90998767950723',
                // token:'C47DCB059B6F4604077E2BF9A9190FC8',
            }
        },
        mounted:function(){
            let _this = this
            // //安卓传参
            window['get_android_userName'] = function(e){
               _this.userName = e
                _this.USERNAME(e)
            }
            window['get_android_token'] = function(e){
                _this.token = e
                _this.TOKEN(e)
            }
            var asyncFun = ()=>{
                if(this.userName==''||this.userName===null||this.userName==null){
                    setTimeout(()=>{
                        asyncFun()
                    },300)
                }else{
                    this.getUserPrediction(this.userName,this.token)
                }
            }
            asyncFun()

            // var abc = ()=>{
            //     this.USERNAME(this.userName)
            //     this.TOKEN(this.token)
            //     this.getUserPrediction(this.userName,this.token)
            // }
            // abc()

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
                    }
                })
                this.scroll.on('pullingUp', () => {
                    this.isMore?this.getUserPrediction(this.userName,this.token):''
                    this.scroll.finishPullUp();
                    this.scroll.refresh()
                })
            })
        },
        methods:{
            ...mapMutations(['USERNAME','TOKEN']),
            getUserPrediction(userName,token){
                this.page = this.page+1
                userPrediction(userName,token,this.page,this.pageSize).then(res=>{
                    console.log('我的来料',res)
                    if(res.code==='0'){
                        if(res.data.predictions.length<this.pageSize){
                            this.isMore = false
                        }
                        this.data = [...this.data,...res.data.predictions]
                    }
                })
            },
            handleToContent(predictionId){
                this.$router.push({name:'content',params:{predictionId:predictionId}});
            },
        }

    }
</script>
<style lang="scss" scoped>
    .supplied{
        width: 100%;
        height: 100%;
        .wrapper{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            bottom: 0;
            overflow: hidden;
            .content{
                width: 100%;
                li{
                    width: 100%;
                    height: 190px;
                    border-top: 1px solid #C9C9C9;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    padding: 30px;
                    .t,.c,.b{
                        width: 100%;
                        height: 43.3px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        p{
                            color: #999;
                            font-size: 28px;
                        }
                        .c0,.c1{color: #34C47C;}
                        .c2{color: #EF4E54;}
                    }
                    .c,.b{
                        p{
                            color: #333;
                        }
                    }
                }
                li:last-child{
                    border-bottom: 1px solid #C9C9C9;
                }
            }
        }
    }
</style>
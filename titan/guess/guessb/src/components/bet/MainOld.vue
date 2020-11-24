<template>
    <div class="main">
        <div class="nav">
            <span :class="status==='hot'?'active':''" @click="handleStatus('hot')">热门</span>
            <span :class="status==='score'?'active':''" @click="handleStatus('score')">比分</span>
            <span :class="status==='more'?'active':''" @click="handleStatus('more')">更多</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">

                <div class="card">
                    <div class="title">全场赛果</div>
                    <ul v-if="status1===1">
                        <li v-for="item in list1.slice(0,6)">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                        <div class="more" @click="handleMore('status1')">
                            <p>展开</p>
                            <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
                        </div>
                    </ul>
                    <ul v-if="status1===2">
                        <li v-for="item in list1">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                        <div class="more" @click="handleLess('status1')">
                            <p>收起</p>
                            <span><img src="../../assets/img/arrow-top.png" alt=""></span>
                        </div>
                    </ul>
                    <ul v-if="status1===3">
                        <li v-for="item in list1">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <div class="title">全场赛果</div>
                    <ul v-if="status2===1">
                        <li v-for="item in list2.slice(0,6)">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                        <div class="more" @click="handleMore('status2')">
                            <p>展开</p>
                            <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
                        </div>
                    </ul>
                    <ul v-if="status2===2">
                        <li v-for="item in list2">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                        <div class="more" @click="handleLess('status2')">
                            <p>收起</p>
                            <span><img src="../../assets/img/arrow-top.png" alt=""></span>
                        </div>
                    </ul>
                    <ul v-if="status2===3">
                        <li v-for="item in list2">
                            <p>{{item.name}}</p>
                            <p>{{item.number}}</p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>


        <!--<div class="guess"></div>-->
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                scroll:null,
                status:'hot',
                status1:0,
                status2:0,
                data:{},
                list1:[
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                ],
                list2:[
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                    {
                        name:'主胜',
                        number:1.9,
                    },
                ],
            }
        },
        created:function(){
            this.status1 = this.list1.length>6?1:3
            this.status2 = this.list2.length>6?1:3
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
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleStatus(i){
                this.status = i
            },
            handleMore(i){
                this[i] = 2
            },
            handleLess(i){
                this[i] = 1
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .main{
        position: absolute;
        top:0;
        bottom: 0;
        width: 100%;
        left:0;
        box-sizing: border-box;
        .nav{
            width: 480px;
            height:54px ;
            border: 1px solid #34C47C;
            box-sizing: border-box;
            border-radius: 5px;
            @include flex;
            margin: 20px auto;
            span{
                text-align: center;
                line-height: 54px;
                width: 160px;
                display: block;
                height: 54px;
                border-right: 1px solid #34C47C;
            }
            span:last-child{
                border-right: none;
            }
            .active{
                color: #FFFFFF;
                background: #34C47C;
            }
        }
        .wrapper{
            position: absolute;
            top:100px;
            width: 100%;
            /*bottom: 380px;*/
            bottom: 0;
            box-sizing: border-box;
            overflow: hidden;
            .content{
                .card{
                    width: 100%;
                    padding-bottom: 40px;
                    box-sizing: border-box;
                    .title{
                        color: #333;
                        font-size: 26px;
                        width: 100%;
                        height: 60px;
                        line-height: 40px;
                        padding: 10px 40px;
                        box-sizing: border-box;
                        font-weight: 700;
                        position: relative;
                    }
                    .title:before{
                        position: absolute;
                        top:50%;
                        transform: translateY(-50%);
                        left: 18.75px;
                        content: '';
                        height: 40px;
                        width: 5px;
                        background: #34C47C;
                        border-radius: 3px;
                    }
                    ul{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        box-sizing: border-box;
                        li{
                            width: 225px;
                            height: 76px;
                            box-sizing: border-box;
                            border: 1px solid #CBCBCB;
                            border-radius: 3px;
                            @include flexY(center);
                            margin-top: 20px;
                            margin-left: 18.75px;
                            p{
                                text-align: center;
                            }
                            p:nth-child(1){
                                color: #333;
                                font-size: 24px;
                                font-weight: 700;
                            }
                            p:nth-child(2){
                                font-size: 22px;
                                color: #34C47C;
                                padding-top: 10px;
                            }
                        }
                        .more{
                            width: 100%;
                            height: 40px;
                            margin-top: 20px;
                            @include flex;
                            p{
                                color: #989898;
                                font-size: 22px;
                                height: 40px;
                                line-height: 40px;
                                padding-right: 6px;
                            }
                            span{
                                display: block;
                                width: 14px;
                                height: 40px;
                                @include flexY(center);
                                img{
                                    width: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
        .guess{
            width: 100%;
            height: 380px;
            box-sizing: border-box;
            border: 1px solid red;
            position: fixed;
            bottom: 0;
            left:0;
            background: #fff;
        }
    }
</style>
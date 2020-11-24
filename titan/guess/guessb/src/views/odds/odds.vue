<template>
    <div class="odds">
       <div class="head">欧赔数据</div>
        <div class="title">
            <span>主胜</span>
            <span>平局</span>
            <span>客胜</span>
            <span>变化时间</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="item in data">
                        <span>{{item.zs}}</span>
                        <span>{{item.pj}}</span>
                        <span>{{item.ks}}</span>
                        <span>{{item.time}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                scroll:null,
                data:[
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                    {
                        zs:'11.79',
                        pj:'5.5',
                        ks:'1.2',
                        time:'2018-12-06 17:31:33'
                    },
                ],
            }
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

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    .odds{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .head{
            width: 100%;
            height: 80px;
            background: #34C47C;
            text-align: center;
            line-height: 80px;
            color: #fff;
            font-size: 30px;
        }
        .title{
            width: 100%;
            height: 60px;
            box-sizing: border-box;
            @include borderBottom(#E6E6E6);
            @include flex;
            span{
                width: 20%;
                height: 60px;
                line-height: 60px;
                display: block;
                color: #333;
                font-size: 22px;
                text-align: center;
                font-weight: 700;
            }
            span:last-child{
                width: 40%;
            }
        }
        .wrapper{
            position: absolute;
            top:140px;
            width: 100%;
            left:0;
            bottom: 0;
            overflow: hidden;
            .content{
                width: 100%;
                li{
                    width: 100%;
                    height: 60px;
                    box-sizing: border-box;
                    @include borderBottom(#E6E6E6);
                    @include flex;
                    span{
                        width: 20%;
                        height: 60px;
                        line-height: 60px;
                        display: block;
                        color: #333;
                        font-size: 22px;
                        text-align: center;
                        @include ellipsis;
                    }
                    span:last-child{
                        width: 40%;
                    }
                }

            }
        }
    }
</style>
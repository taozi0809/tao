<template>
   <div class="wrapper" ref="wrapper">
       <div class="content">
            <div class="card" v-for="item in data">
                <div class="head">
                    <p>{{item.head}}</p>
                    <span v-if="!item.show"><img src="../../assets/img/up.png" alt=""></span>
                    <span v-if="item.show"><img src="../../assets/img/down.png" alt=""></span>
                </div>
                <div class="con">
                    <div class="title">
                        <p v-for="itema in item.title">{{itema.name}}</p>
                    </div>
                    <ul>
                        <li v-for="itema in item.list">
                            <p v-for="itemb in itema.arr">{{itemb.name}}</p>
                        </li>
                    </ul>
                </div>
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
                        head:'小组A',
                        show:true,
                        title:[
                            {
                                name:'排名',
                            },
                            {
                                name:'球队',
                            },
                            {
                                name:'胜',
                            },
                            {
                                name:'平',
                            },
                            {
                                name:'负',
                            },
                            {
                                name:'得',
                            },
                            {
                                name:'失',
                            },
                            {
                                name:'净',
                            },
                            {
                                name:'积分',
                            },

                        ],
                        list:[
                            {
                               arr:[
                                   {
                                       name:'1' ,
                                   },
                                   {
                                       name:'巴西' ,
                                   },
                                   {
                                       name:'3' ,
                                   },
                                   {
                                       name:'5' ,
                                   },
                                   {
                                       name:'9' ,
                                   },
                                   {
                                       name:'4' ,
                                   },
                                   {
                                       name:'2' ,
                                   },
                                   {
                                       name:'3' ,
                                   },
                                   {
                                       name:'2' ,
                                   },
                               ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        head:'小组A',
                        show:true,
                        title:[
                            {
                                name:'排名',
                            },
                            {
                                name:'球队',
                            },
                            {
                                name:'胜',
                            },
                            {
                                name:'平',
                            },
                            {
                                name:'负',
                            },
                            {
                                name:'得',
                            },
                            {
                                name:'失',
                            },
                            {
                                name:'净',
                            },
                            {
                                name:'积分',
                            },

                        ],
                        list:[
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                            {
                                arr:[
                                    {
                                        name:'1' ,
                                    },
                                    {
                                        name:'巴西' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'5' ,
                                    },
                                    {
                                        name:'9' ,
                                    },
                                    {
                                        name:'4' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                    {
                                        name:'3' ,
                                    },
                                    {
                                        name:'2' ,
                                    },
                                ]
                            },
                        ]
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
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    .wrapper{
        position: absolute;
        top:0;
        width: 100%;
        bottom: 0;
        left:0;
        overflow: hidden;
        .content{
            width: 100%;
            .card{
                width: 100%;
                box-sizing: border-box;
                padding-top: 20px;
                .head{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    font-size: 22px;
                    color: #333;
                    @include flex;
                    box-sizing: border-box;
                    position: relative;
                    font-weight: 700;
                    @include borderBottom(#E6E6E6);
                    span{
                        @include spanImg(20px,20px);
                    }
                }
                .con{
                    width: 100%;
                    .title{
                        width: 100%;
                        @include flex;
                        box-sizing: border-box;
                        p{
                            font-weight: 700;
                            @include txtCenter(9.1%,60px,22px,#333);
                        }
                        p:nth-child(2){
                            width: 27.2%;
                        }
                    }
                    ul{
                        width: 100%;
                        li{
                            width: 100%;
                            @include borderBottom(#E6E6E6);
                            @include flex;
                            p{
                                @include txtCenter(9.1%,60px,22px,#333);
                            }
                            p:nth-child(2){
                                width: 27.2%;
                            }
                        }
                        li:last-child{
                            border-bottom: none;
                        }
                    }
                }

            }
        }
    }
</style>
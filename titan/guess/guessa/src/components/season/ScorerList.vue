<template>
   <div class="scorer-list">
       <div class="title">
           <p>排名</p>
           <p>球员</p>
           <p>球队</p>
           <p>进球</p>
       </div>
       <div class="wrapper" ref="wrapper">
           <div class="content">
                <ul>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p><span>1</span></p>
                        <p>拉斯-施廷德尔</p>
                        <p>德国</p>
                        <p>3</p>
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
    .scorer-list{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            height: 60px;
            @include flex;
            p{
                @include txtCenter(15%,60px,22px,#333);
                font-weight: 700;
            }
            p:nth-child(2){
                width: 40%;
            }
            p:nth-child(3){
                width: 30%;
            }
        }
        .wrapper{
            position: absolute;
            top:60px;
            width: 100%;
            bottom: 0;
            left:0;
            overflow: hidden;
            .content{
                width: 100%;
                ul{

                    li{
                        width: 100%;
                        height: 60px;
                        @include flex;
                        p{
                            @include txtCenter(15%,60px,22px,#333);
                        }
                        p:nth-child(1){
                            @include flex;
                            span {
                                @include txtCenter(30px,30px,22px,#fff);
                                border-radius: 5px;
                                background: #aaa;
                            }
                        }
                        p:nth-child(2){
                            width: 40%;
                        }
                        p:nth-child(3){
                            width: 30%;
                        }
                    }
                }
            }
        }
    }

</style>
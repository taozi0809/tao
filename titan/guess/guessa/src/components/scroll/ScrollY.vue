<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
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

<style lang="scss" scoped>
    .wrapper{
        width: 100%;
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        overflow: hidden;
        .content{
            width: 100%;
        }
    }
</style>
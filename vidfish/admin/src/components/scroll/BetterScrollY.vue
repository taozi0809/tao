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
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                    mouseWheel: {
                        speed: 20,
                        invert: false,
                        easeTime: 300
                    },
                })
            })

        },
    }
</script>

<style lang="scss" scoped>
    .wrapper{
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        overflow: hidden;
        /*border: 1px solid red;*/
        box-sizing: border-box;
        right: 0;
        .content{
            box-sizing: border-box;
        }
    }
</style>


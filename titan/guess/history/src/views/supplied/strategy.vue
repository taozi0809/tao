<template>
    <div class="strategy">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <span><img src="../../assets/img/supplied/strategy.png" alt=""></span>
            </div>
        </div>

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        mounted:function(){
           new BScroll(this.$refs.wrapper, {
                click:true,
                scrollX: false,
                scrollbar: {
                    fade: true,
                    interactive: false
                },
            })
        },
    }
</script>

<style lang="scss" scoped>
    .strategy{
        width: 100%;


        .wrapper{
            position: absolute;
            top:0;
            left:0;
            bottom: 0;
            right: 0;
            width: 100%;
            overflow: hidden;
            .content{
                width: 100%;
                span{
                    display: block;
                    width: 100%;
                    img{
                        width: 100%;
                    }
                }
            }
        }

    }
</style>
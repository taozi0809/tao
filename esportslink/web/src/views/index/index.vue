<template>
    <div class="home">
        <Head/>
        <zplay/>
        <div class="main">
            <div class="row-l">
                <Eswiper/>
                <allGameList/>
            </div>
            <div class="row-r">
                <gameList/>
            </div>
        </div>
        <Foot/>

        <div class="bg-ad-l" :style="{left: offset}"><span><img src="../../assets/image/index/bg1/ad_01_adl_l.jpg" alt=""></span></div>
        <div class="bg-ad-r" :style="{right:offset}"><span><img src="../../assets/image/index/bg1/ad_01_adl_r.jpg" alt=""></span></div>
    </div>
</template>

<script>
    import Head from '../../components/head'
    import Foot from '../../components/foot'
    import zplay from '../../components/zplay'
    import Eswiper from '../../components/index/Eswiper'
    import gameList from '../../components/index/gameList'
    import allGameList from '../../components/index/allGameList'

    export default {
        components:{Head,zplay,Eswiper,gameList,allGameList,Foot},
        data(){
            return{
                offset:0,
            }
        },
        mounted() {
            let that=this
            this.offset =  (document.body.clientWidth/4 - 395)>0?(document.body.clientWidth/4 - 395)+ 'px':0 + 'px'
            console.log()
            window.onresize = () => {
                return (() => {
                    that.offset =  (document.body.clientWidth/4 - 395)>0?(document.body.clientWidth/4 - 395):0 + 'px'
                })()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home{

        .main{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            position: relative;
            z-index: 1;
            min-height: 726px;
            .row-l{
                width: 870px;
                overflow: hidden;
                padding: 0 10px;
            }
            .row-r{
                width: 300px;
                padding: 0 10px;
            }
        }

        .bg-ad-l,.bg-ad-r{
            position: absolute;
            top:60px;
            z-index: 0;
            overflow: hidden;
            span{
                display: block;
                width: 200px;
                height: 600px;
                flex-shrink: 0;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
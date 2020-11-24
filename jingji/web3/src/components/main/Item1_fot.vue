<template>
    <div :class="isPC?'pc-item1_fot':'mobile-item1_fot'" id="item1_fot">
        <div class="con">
            <div class="des">趣味棋牌产业长期以来一直是群众文娱生活的重要组成部分，是社会“刚需”。然而伴随着互联网科技进步，产业规模迅速扩张，管控难、乱象多等发展中问题不断显现，涉赌、违法等不良现象屡禁不止。逐渐导致从文体监管部门到社会主流舆论都视其为“敏感地带”甚至“洪水猛兽”，极大制约着产业的良性发展。</div>
            <div class="des">从某种意义上讲已经到了“最危险的时刻”，此次相关机构从最容易出现问题的趣味棋牌竞技领域切入，大力推进行业转型和制度建设是破解困境的唯一对策。全行业阳光化、规范化、惠民化发展势在必行。</div>
            <div class="des">趣味棋牌竞技产业在未来突破“灰色地带”束缚 ， 实现阳光化 、科学化发展是必然趋势 。谁先从思想上转变观念，提高觉悟 ，谁将进入改革创新第一梯队，赢得尊重，获得主动。</div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";

    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item1_fot{
        width: 100%;
        height: 500px;
        background-image: url("../../assets/img/main/item1_fot/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding: 40px 0;
        .con{
            width:1200px;
            height: 380px;
            background-image: url("../../assets/img/main/item1_fot/con-bg.png");
            background-size:100% 100%;
            margin: 0 auto;
            box-sizing: border-box;
            overflow: auto;
            padding-top: 50px;
           .des{
               width: 1080px;
               margin: 0 auto;
               color:#6482B7;
               font-size: 20px;
               font-weight: bold;
               line-height: 30px;
               margin-top: 16px;
           }
        }
        @media screen and (max-width: 1024px) {
            .con{
                padding-top: 30px;
                width: 900px;
                height: 340px;
                .des{
                    width: 810px;
                    font-size: 16px;
                }
            }

        }
    }
    .mobile-item1_fot{
        width: 100%;
        background-image: url("../../assets/img/main/item1_fot/bg.png");
        background-size: cover;
        box-sizing: border-box;
        padding-top: 6vw;
        padding-bottom: 6vw;
        .con{
            width: 96vw;
            margin: 0 auto;
            box-sizing: border-box;
            background-image: url("../../assets/img/main/item1_fot/dikuai.png");
            background-size:100% 100%;
            overflow: hidden;
            padding-bottom: 10vw;
            padding-top: 2vw;
            .des{
                font-size: 4vw;
                color:#6482B7;
                line-height: 1.5;
                width:82vw;
                margin: 0 auto;
                margin-top: 5vw;
            }
        }
    }




</style>

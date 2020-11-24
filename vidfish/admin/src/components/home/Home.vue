<template>
    <div class="Home">
        <BetterScrollY>
            <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <Card-data/>
            <line-chart/>
        </BetterScrollY>
    </div>
</template>

<script>
    import BetterScrollY  from '../scroll/BetterScrollY'
    import CardData  from './CardData'
    import LineChart  from './LineChart'
    import PieChart  from './PieChart'
    export default {
        components:{BetterScrollY,CardData,LineChart,PieChart},
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .Home{
       width: 100%;
        height: 100%;
        .breadcrumb{
            width: 100%;
            height: 40px;
            overflow: hidden;
            box-sizing: border-box;
            .el-breadcrumb{
                width: 100%;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                padding:0 10px;
            }
        }
    }
</style>
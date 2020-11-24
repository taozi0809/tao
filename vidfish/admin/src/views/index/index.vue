<template>
    <div class="index">
        <BetterScrollY>
            <Breadcrumb :breadcrumb="breadcrumb"/>
            <Card-data/>
            <line-chart/>
        </BetterScrollY>
    </div>
</template>

<script>
    import BetterScrollY  from '../../components/scroll/BetterScrollY'
    import Breadcrumb from '../../components/Breadcrumb'
    import CardData  from '../../components/home/CardData'
    import LineChart  from '../../components/home/LineChart'
    import PieChart  from '../../components/home/PieChart'
    export default {
        components:{BetterScrollY,CardData,LineChart,PieChart,Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/',
                        name:'首页'
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

    .index{
        width: 100%;
        height: 100%;
    }
</style>
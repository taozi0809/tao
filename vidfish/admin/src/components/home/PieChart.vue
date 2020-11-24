<template>
    <div class="PieChart">
        <div class="pie-chart" id="pieChart"></div>
    </div>
</template>

<script>
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie')

    export default {
        data(){
            return{

            }
        },
        mounted:function(){
            this.initChart()
        },
        methods:{
            initChart(){
                let chartInstance = echarts.init(document.getElementById('pieChart'), null, {renderer: 'svg'});
                let option = {
                    title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                chartInstance.setOption(option)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .PieChart{
        width: 100%;
        min-width: 1020px;
        height: 400px;
        /*border: 1px solid red;*/
        box-sizing: border-box;
        .pie-chart{
            width: 50%;
            min-width: 510px;
            height: 400px;
            box-sizing: border-box;
            /*border: 1px solid red;*/
        }
    }
</style>
<template>
    <div class="userchart"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-background="rgba(255, 255, 255, .5)">
        <div class="top">
            <div class="t">盈利详情</div>
            <div class="menu">
                <div class="item" :class="type=='1'?'active':''" @click="changeDay('1')">过去7天</div>
                <div class="item" :class="type=='2'?'active':''" @click="changeDay('2')">过去30天</div>
                <div class="item" :class="type=='3'?'active':''" @click="changeDay('3')">过去90天</div>
            </div>
        </div>
        <div id="myChart" style="width: 600px;height: 300px;"></div>
        <div class="details">
           <div class="item">
               <span></span>
               <div class="name">机器人收入</div>
               <div class="value">{{data.RobotProfit}}</div>
           </div>
           <div class="item">
               <span></span>
               <div class="name">私人房间抽水</div>
               <div class="value">{{data.PrivateTax}}</div>
           </div>
           <div class="item">
               <span></span>
               <div class="name">匹配房间抽水</div>
               <div class="value">{{data.TotalTax}}</div>
           </div>
        </div>
    </div>
</template>

<script>
    import {pastProfit} from "../../service/api/api";
    import {lastDateArr} from "../../util/tools/lastDateArr";


    //引入基本模板
    let echarts = require('echarts/lib/echarts')

    // 引入折线图等组件
    require('echarts/lib/chart/pie')

    // 引入提示框和title组件，图例
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')


    export default {
        data(){
            return{
                type:'2',
                loading:true,
                lastDateArr:lastDateArr(),
                data:{}
            }
        },
        created:function(){
            this.pastProfit(this.type)

        },
        methods:{
            pastProfit(type){
                this.loading=true
                pastProfit(type).then(res=>{
                    console.log('盈利详情',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.data=res.data
                        this.init(res.data)
                    }else{

                    }
                })
            },
            changeDay(num){
                this.type=num
                this.pastProfit(this.type)
            },
            init(res){
                let pieChart = echarts.init(document.getElementById('myChart'))

                // 初始化数据
                let data = [{name: '机器人收入', value: res.RobotProfit},
                    {name: '私人房间抽水', value: res.PrivateTax},
                    {name: '匹配房间抽水', value: res.TotalTax}]
                let sum = 0

                // 放置需要显示的图例(if you need)
                let legendData = []

                // 循环数据 累计sum值
                data.forEach(item => {
                    sum += item.value * 1 // *1保证sum值为数值
                    legendData.push(item.name)
                })

                // 给数据加上总数sum 通过颜色及透明度设置不显示
                // data.push({name: '总数', value: sum, itemStyle: {normal: {color: '#ECEFF1'}}})

                // 下面给图例加上配置 都是官方的api
                pieChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{a}<br/>{b}:{c}({d}%)'
                        formatter: '{b}:{c}({d}%)'
                    },
                    legend: {
                        orient: 'horizontal', // vertical 设置图例展示方向
                        data: legendData
                    },
                    series: [
                        {
                            name: '', // 上面formatter的a，不显示a可不设置
                            type: 'pie',
                            startAngle: 180, // 重点！这里设置饼图从180°初渲染，刚好从上下将饼图平分成两部分
                            radius: ['50%', '60%'],
                            center: ['50%', '60%'],
                            data: data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })
            },



        }
    }
</script>

<style lang="scss" scoped>
    .userchart{
        width: 100%;
        height: 100%;
    }
    .top{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t{
            color: #455A64;
            font-size: 22px;
        }
        .menu{
            display: flex;
            align-items: center;
            .item{
                cursor: pointer;
                width: 80px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: #777777;
                border:1px solid rgba(230,230,230,1);
            }
            .active{
                background: #4C8BFD;
                color: #fff;
                border:1px solid #4C8BFD;
            }
        }
    }

    .details{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        padding:0 20px;
        .item{
            width: 33.3%;
            height: 50px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            align-items: center;
            /*border: 1px solid red;*/
            span{
                width: 3px;
                height: 30px;
                border-radius: 5px;
                margin-right:6px;
            }
            .name{
                color: #455A64;
                font-size: 18px;
                margin-right: 10px;
            }
            .value{

            }
        }
        .item:nth-child(1){
            span{
                background: #1E88E5;
            }
            .value{
                color: #1E88E5;
            }
        }
        .item:nth-child(2){
            span{
                background: #745AF2;
            }
            .value{
                color: #745AF2;
            }
        }
        .item:nth-child(3){
            span{
                background: #26C6DA;
            }
            .value{
                color: #26C6DA;
            }
        }
    }
</style>
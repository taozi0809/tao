<template>
    <div class="userchart"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-background="rgba(255, 255, 255, .5)">
        <div class="top">
            <div class="t">用户活跃情况</div>
            <div class="menu">
                <div class="item" :class="index=='-7'?'active':''" @click="changeDay('-7')">过去7天</div>
                <div class="item" :class="index=='-30'?'active':''" @click="changeDay('-30')">过去30天</div>
                <div class="item" :class="index=='-90'?'active':''" @click="changeDay('-90')">过去90天</div>
            </div>
        </div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>

<script>
    import {historyData} from "../../service/api";

    export default {
        data(){
            return{
                chartData: {
                    columns: ['日期', '活跃用户数量', '新增用户数量'],
                    rows: []
                },
                index:'-30',
                loading:true,
            }
        },
        created:function(){
            this.historyData(this.getDay(this.index),this.getDay(0))
        },
        methods:{
            historyData(startTime,endTime){
                this.loading=true
                historyData(startTime,endTime).then(res=>{
                    console.log('历史活跃情况',res)
                    this.loading=false
                    if(res.code==0){
                        var rows=[]
                        for(let i in res.data.dates){
                            rows.push({
                                '日期':res.data.dates[i],
                                '活跃用户数量':res.data.activeUserAmounts[i],
                                '新增用户数量':res.data.newUserAmounts[i],
                            })
                        }
                        this.chartData.rows=rows
                    }
                })
            },
            getDay(day){
                var doHandleMonth=function(month){
                    var m = month;
                    if(month.toString().length == 1){
                        m = "0" + month;
                    }
                    return m;
                }

                var today = new Date();
                var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码
                var tYear = today.getFullYear();
                var tMonth = today.getMonth();
                var tDate = today.getDate();
                tMonth = doHandleMonth(tMonth + 1);
                tDate = doHandleMonth(tDate);
                return tYear+"-"+tMonth+"-"+tDate;
            },
            changeDay(num){
                this.index=num
                this.historyData(this.getDay(num),this.getDay(0))
            },

        }
    }
</script>

<style lang="scss" scoped>
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
</style>
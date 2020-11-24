<template>
    <div class="LineChart">
        <div class="head">
            <el-date-picker
                    v-model="newTime"
                    type="month"
                    placeholder="选择日期时间"
                    :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div class="line-chart-box" id="lineChartBox">
            <div class="line-chart" id="lineChart"></div>
        </div>

    </div>
</template>

<script>
    import {dataX} from "../../assets/config/data";
    import {videoStat} from "../../service/api";

    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line')
    require("echarts/lib/component/title");
    require("echarts/lib/component/dataZoom");
    require("echarts/lib/component/grid");
    require("echarts/lib/component/legendScroll");
    require("echarts/lib/component/tooltip");
    export default {
        data(){
            return{
                newTime:this.getYM().year+'-'+this.getYM().month,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    },
                },
                chart:null,
                dataX:dataX(this.getYM().year,(new Date()).getMonth()+1),
                year:'',
                month:'',
            }
        },

        mounted:function(){
            this.videoStat(this.getYM().year,this.getYM().month)
        },
        methods:{
          getYM(){
              var date=new Date;
              var year=date.getFullYear();
              var month=date.getMonth()+1;
              return {year,month}
          },
          initChart(arr1,arr2,arr3,arr4){
              let _this = this
              this.onSize()
              this.chart = echarts.init(document.getElementById('lineChart'), null, {renderer: 'svg'});
              let option = {
                  title : {
                      text: '电影、电视剧播放及下载量',
                      x: 'center',
                      align: 'right'
                  },
                  grid: {
                      left: '1%',
                      right: '1%',
                      bottom: '1%',
                      containLabel: true
                  },
                  legend: {
                      data:['电视剧下载量','电视剧播放量','电影下载量','电影播放量'],
                      top:'8%',
                  },
                  tooltip: {
                      trigger: 'axis'
                  },
                  xAxis: {
                      type: 'category',
                      data:_this.dataX,
                      boundaryGap : false,
                      axisLine: {onZero: false},
                  },
                  yAxis: {
                      type: 'value',
                  },
                  dataZoom: [
                      {
                          show: false,
                          realtime: true,
                          start: 0,
                          end: 50
                      },
                      {
                          type: 'inside',
                          realtime: true,
                          start: 0,
                          end: 50
                      }
                  ],
                  series: [
                      {
                          name:'电视剧下载量',
                          type:'line',
                          data:arr1
                      },
                      {
                          name:'电视剧播放量',
                          type:'line',
                          data:arr2
                      },
                      {
                          name:'电影下载量',
                          type:'line',
                          data:arr3
                      },
                      {
                          name:'电影播放量',
                          type:'line',
                          data:arr4
                      }
                  ]
              };
              this.chart.setOption(option)
          },
          onSize(){
              let _this = this
              window.onresize=function() {
                  let w = document.getElementById("lineChartBox").offsetWidth
                  let chartDom = document.getElementById('lineChart')
                  chartDom.style.width = w+'px'
                  _this.chart.resize()
              }
          },
          videoStat(year,month){
              videoStat(year,month).then(res=>{
                  // console.log(res)
                  if(res.code==='0'){
                      let arr = res.data.videoStatisticsCtoModelList
                      let arr1=[],arr2=[],arr3=[],arr4=[]
                      for(let i in arr){
                          arr1.push(arr[i].dramaDownloadTimes)
                          arr2.push(arr[i].dramaPlayTimes)
                          arr3.push(arr[i].movieDownloadTimes)
                          arr4.push(arr[i].moviePlayTimes)
                      }
                      this.initChart(arr1,arr2,arr3,arr4)
                  }
              })
          }

        },
        watch:{
            newTime(newValue,oldValue){
                if(newValue!=oldValue){
                    if(newValue!=''&&newValue!=undefined&&newValue!=null){
                        this.videoStat(newValue.getFullYear(),newValue.getMonth()+1)
                        this.dataX = dataX(newValue.getFullYear(),newValue.getMonth()+1)
                    }
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    .LineChart{
        width: 100%;
        min-width: 1020px;
        height: 470px;
        box-sizing: border-box;
        .head{
            width: 100%;
            height: 60px;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            position: relative;
            .el-date-editor{
                bottom: -30px;
                left:40px;
                position: absolute;
                z-index: 10;
            }
        }
        .line-chart-box{
            box-sizing: border-box;
            width: 100%;
            min-width: 1020px;
            height: 400px;
            .line-chart{
                box-sizing: border-box;
                min-width: 1020px;
                height: 400px;
            }
        }
    }
</style>
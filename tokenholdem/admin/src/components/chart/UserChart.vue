<template>
    <div class="userchart"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-background="rgba(255, 255, 255, .5)">
        <div class="top">
            <div class="t">用户活跃情况</div>
            <div class="menu">
                <div class="item" :class="type=='1'?'active':''" @click="changeDay('1')">过去7天</div>
                <div class="item" :class="type=='2'?'active':''" @click="changeDay('2')">过去30天</div>
                <div class="item" :class="type=='3'?'active':''" @click="changeDay('3')">过去90天</div>
            </div>
        </div>
        <ve-line :data="chartData"></ve-line>
    </div>
</template>

<script>
    import {pastCount} from "../../service/api/api";
    import {lastDateArr} from "../../util/tools/lastDateArr";

    export default {
        data(){
            return{
                chartData: {
                    columns: ['日期', '活跃用户数量', '新增用户数量'],
                    rows: []
                },
                type:'2',
                loading:true,
                lastDateArr:lastDateArr(),
            }
        },
        created:function(){
            this.pastCount(this.type)
        },
        methods:{
            pastCount(type){
                this.loading=true
                pastCount(type).then(res=>{
                    console.log('用户活跃情况',res)
                    this.loading=false
                    if(res.errcode==2000){
                        var rows=[]
                        for(let i in this.lastDateArr[this.type-1]){
                            rows.push({
                                '日期':this.lastDateArr[this.type-1][i],
                                '活跃用户数量':res.data[i].ActiveUserNum,
                                '新增用户数量':res.data[i].NewUserNum,
                            })
                        }
                        this.chartData.rows=rows
                    }else{

                    }
                })
            },
            changeDay(num){
                this.type=num
                this.pastCount(this.type)
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
</style>
<template>
    <div class="handicap">
<!--        <div class="handicap-l">-->
<!--            <div class="item" :class="lActive=='全部'?'active':''" @click="lActive='全部'">-->
<!--                <div class="l">-->
<!--                    <span><img src="" alt=""></span>-->
<!--                    <div class="name">全部</div>-->
<!--                </div>-->
<!--                <div class="r">{{total}}</div>-->
<!--            </div>-->
<!--            <div class="item" v-for="(item,index) in listA" :key="index"-->
<!--                 :class="lActive==item.name?'active':''"-->
<!--                 @click="lActive=item.name">-->
<!--                <div class="l">-->
<!--                    <span><img src="" alt=""></span>-->
<!--                    <div class="name">{{item.name}}</div>-->
<!--                </div>-->
<!--                <div class="r">{{item.num}}</div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="handicap-r">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="'今日 '+data.matchToday" name="today"><today/></el-tab-pane>
                <el-tab-pane :label="'滚球 '+data.matchRolling" name="rolling"><rolling/></el-tab-pane>
                <el-tab-pane :label="'赛前 '+data.matchBefore" name="before"><before/></el-tab-pane>
                <el-tab-pane :label="'已结束 '+data.matchResult" name="result"><result/></el-tab-pane>
            </el-tabs>
            <div class="refresh" @click="matchStats()">
                <el-button type="text" icon="el-icon-refresh-right">刷新</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import today from '../../components/handicap/today'
    import rolling from '../../components/handicap/rolling'
    import before from '../../components/handicap/before'
    import result from '../../components/handicap/result'

    import {matchStats} from "../../service/api";

    export default {
        components:{today,rolling,before,result},
        data(){
            return{
                listA:[
                    {name:'英雄联盟',num:28},
                    {name:'DOTA2',num:30},
                ],
                lActive:'全部',
                total:58,
                activeName: 'today',
                data:{},
            }
        },
        created(){
            this.matchStats()
        },
        methods:{
            handleClick(tab, event) {},
            matchStats(){
                matchStats().then(res=>{
                    console.log('查询比赛数据统计',res)
                    if(res.code==0){
                        this.data=res.data
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .handicap{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 1;
        .handicap-l{
            width: 200px;
            height: 100%;
            box-sizing: border-box;
            flex-shrink: 0;
            border-right: 1px solid rgba(0,0,0,.1);
            .item{
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 10px;

                .l{
                    display: flex;
                    align-items: center;
                    .name{
                        line-height: 40px;
                        height: 40px;
                        color: #333;
                        font-size: 16px;
                    }
                }
                .r{
                    flex-shrink: 0;
                    height: 40px;
                    line-height: 40px;
                    max-width: 100px;
                    color: #333;
                    font-size: 16px;
                }
            }
            .active{
                background: #00A4CE;
                .l{
                    .name{
                        color: #fff;
                    }
                }

                .r{
                    color: #fff;
                }
            }
        }
        .handicap-r{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 10px 20px;
            position: relative;
            .refresh{
                height: 40px;
                width: 60px;
                display: flex;
                align-items: center;
                left: 400px;
                top: 10px;
                position: absolute;

            }
        }
    }
</style>
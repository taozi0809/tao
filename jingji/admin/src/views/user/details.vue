<template>
    <div class="details">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="战绩详情" name="战绩详情">
                <div class="list">
                    <el-table :data="Rank" style="width: 100%;margin-bottom: 10px;" border height="600" v-loading="loading"
                              element-loading-text="加载中"
                              element-loading-background="rgba(255, 255, 255, .5)">
                        <el-table-column prop="level" label="排名" width="100"></el-table-column>
                        <el-table-column prop="nickname" label="用户昵称" width="150"></el-table-column>
                        <el-table-column prop="count" label="完成局数" width="100"></el-table-column>
                        <el-table-column prop="total" label="总分" width="100"></el-table-column>
                        <el-table-column prop="last" label="尾副得分" width="100"></el-table-column>
                        <el-table-column prop="wins" label="获胜局数" width="100"></el-table-column>
                        <el-table-column label="累计时长" width="100">
                            <template slot-scope="scope">
                                {{(scope.row.period/1000).toFixed(2)}} s
                            </template>
                        </el-table-column>
                        <el-table-column prop="award" label="奖励"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane  :key="item.tabsName" :label="item.tabsTitle" :name="item.tabsName" v-for="(item,index) in MatchRecord" >
                <div class="list">
                    <el-table :data="item" style="width: 100%;margin-bottom: 10px;" border height="600" v-loading="loading"
                              element-loading-text="加载中"
                              element-loading-background="rgba(255, 255, 255, .5)">
                        <el-table-column prop="RoomCount" label="房间桌号" width="100"></el-table-column>
                        <el-table-column prop="UID" label="用户ID" width="100"></el-table-column>
                        <el-table-column label="用户牌型">
                            <template slot-scope="scope">
                                <div class="card-list">
                                    <div class="l">
                                        <div class="item" v-for="(item,index) in scope.row.HandCards" :key="index">
                                            <img :src="item" alt="">
                                        </div>
                                    </div>
                                    <div class="r">
                                        <div class="item" v-for="(item,index) in scope.row.ThreeCards">
                                            <img :src="item" alt="">
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Multiples" label="倍数" width="200"></el-table-column>
                        <el-table-column label="胜负" width="100">
                            <template slot-scope="scope">
                                {{scope.row.Event==0?'负':'胜'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="Score" label="得分" width="100"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {matchDetail} from "../../service/api/api";
    import {pokersToSrc} from "../../util/tools/pokersToSrc";

    export default {
        data() {
            return {
                activeName: '战绩详情',
                Rank:[],
                MatchRecord:[],
                loading:false,
            };
        },
        created() {

            this.matchDetail(this.$route.params.matchid)
        },
        methods: {
            handleClick(tab, event) {

            },
            matchDetail(MatchID){
                matchDetail(MatchID).then(res=>{
                    console.log("赛事详情",res)
                    if(res.code==0){

                        this.Rank=res.resp.Rank
                        const data = {
                            '0': '零',
                            '1': '一',
                            '2': '二',
                            '3': '三',
                            '4': '四',
                            '5': '五',
                            '6': '六',
                            '7': '七',
                            '8': '八',
                            '9': '九',
                        };
                        for(let i in res.resp.MatchRecord){
                            var str = (parseInt(i)+1).toString()
                            res.resp.MatchRecord[i]['tabsName']=str
                            var str2 = str.split('').map(v => data[v] || v).join('');
                            res.resp.MatchRecord[i]['tabsTitle']=`第${str2}局`

                            for(let j =0;j<res.resp.MatchRecord[i].length;j++ ){
                                res.resp.MatchRecord[i][j].HandCards=pokersToSrc(res.resp.MatchRecord[i][j].HandCards)
                                res.resp.MatchRecord[i][j].ThreeCards=pokersToSrc(res.resp.MatchRecord[i][j].ThreeCards)
                            }
                        }
                        this.MatchRecord=res.resp.MatchRecord

                    }
                })
            },
        },
    };
</script>

<style lang="scss" scoped>
    .details{
        box-sizing: border-box;
        padding:10px;
        width: 100%;
    }
    .card-list{
        display: flex;
        .l,.r{
            display: flex;
            .item{
                width: 40px;
                img{
                    width: 100%;
                }
            }
        }
        .l{
            margin-right:40px;
            flex-wrap:wrap;
        }

    }
</style>

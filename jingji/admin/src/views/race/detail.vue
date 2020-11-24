<template>
    <div class="detail">
        <div class="d-box">
            <div class="id">赛事ID：{{$route.params.id}}</div>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="战绩" name="战绩">
                    <div class="list">
                        <el-table :data="Rank" style="width: 100%;margin-bottom: 10px;" border height="600" v-loading="loading"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column prop="level" label="排名" width="100"></el-table-column>
                            <el-table-column prop="nickname" label="用户昵称" width="150"></el-table-column>
<!--                            <el-table-column prop="sort" label="报名顺序" width="150"></el-table-column>-->
                            <el-table-column prop="count" label="完成局数" width="100"></el-table-column>
                            <el-table-column prop="total" label="总分" width="100"></el-table-column>
                            <el-table-column prop="last" label="尾副得分" width="100"></el-table-column>
                            <el-table-column prop="wins" label="获胜局数" width="100"></el-table-column>
                            <el-table-column label="累计时长" width="100">
                                <template slot-scope="scope">
                                    {{(scope.row.period/1000).toFixed(2)}} s
                                </template>
                            </el-table-column>
                            <el-table-column prop="award" label="奖励" width="150"></el-table-column>
                            <el-table-column prop="scoreaward" label="大师分"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane  :key="item.tabsName" v-for="(item,index) in MatchRecord" :label="item.tabsTitle" :name="item.tabsName">
                    <div class="list">
                        <el-table :data="item" style="width: 100%;margin-bottom: 10px;" border height="600" v-loading="loading"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
<!--                            <el-table-column prop="RoomCount" label="房间桌号" width="100"></el-table-column>-->
                            <el-table-column label="用户牌型">
                                <template slot-scope="scope">
                                   <div class="card-list">
                                       <div class="l">
                                           <div class="item" v-for="(item,index) in scope.row.HandCards" :key="index">
                                               <img :src="item" alt="">
                                           </div>
                                       </div>
                                       <div class="r" v-if="scope.row.Identity==1">
                                           <div class="item" v-for="(item,index) in scope.row.ThreeCards">
                                               <img :src="item" alt="">
                                           </div>
                                       </div>
                                   </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="UID" label="昵称ID" width="100"></el-table-column>
                            <el-table-column label="胜负" width="100">
                                <template slot-scope="scope">
                                   {{scope.row.Event==0?'负':'胜'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="Score" label="得分" width="100"></el-table-column>
                            <el-table-column prop="Multiples" label="倍数" width="300"></el-table-column>

                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {matchDetail} from "../../service/api/api";
    import {pokersToSrc} from "../../util/tools/pokersToSrc";


    export default {
        data(){
            return{
                Rank:[],
                MatchRecord:[],
                activeName:"战绩",
                loading:false,
            }
        },
        created(){
            this.matchDetail(this.$route.params.id)
        },
        methods:{
            handleClick(){},
            matchDetail(MatchID){
                matchDetail(MatchID).then(res=>{
                    console.log("单据赛事详情",res)
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .d-box{
        margin-top: 10px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        position: relative;
        .id{
            position: absolute;
            right:20px;
            height: 60px;
            color: #333;
            font-size: 24px;
        }
    }
    .card-list{
        display: flex;
        /*align-items: center;*/
        .l,.r{
            display: flex;
            /*align-items: center;*/
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

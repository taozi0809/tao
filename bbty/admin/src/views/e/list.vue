<template>
    <div class="list">
        <el-tabs type="border-card" v-loading="outLoading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
            <el-tab-pane label="有直播地址的比赛">
                <el-table :data="outList" border style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="时间" width="120">
                        <template slot-scope="scope">
                            {{scope.row.time}}
                        </template>
                    </el-table-column>
                    <el-table-column property="event" label="联赛名称" width="200"></el-table-column>
                    <el-table-column property="homeTeam" label="主队" width="200"></el-table-column>
                    <el-table-column property="awayTeam" label="客队" width="200"></el-table-column>
                    <el-table-column property="liveUrl" label="直播地址"></el-table-column>


                    <!--<el-table-column fixed="right" label="操作" width="100">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button @click="insert(scope.row)" type="primary" size="small">插入</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="大于当前时间的比赛">
                <el-table :data="inList" border style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="时间" width="120">
                        <template slot-scope="scope">
                            {{scope.row.matchTime | timestampToTime}}
                        </template>
                    </el-table-column>
                    <el-table-column property="tournamentName" label="联赛名称" width="200"></el-table-column>
                    <el-table-column property="homeTeam" label="主队" width="200"></el-table-column>
                    <el-table-column property="guestTeam" label="客队" width="200"></el-table-column>
                    <el-table-column label="直播地址">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.url" placeholder="请粘贴直播地址"></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                    <el-button @click="insert(scope.row)" type="primary" size="small">插入</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已匹配直播地址的比赛">
                <el-table :data="allList" border style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column label="时间" width="120">
                        <template slot-scope="scope">
                            {{scope.row.matchTime}}
                        </template>
                    </el-table-column>
                    <el-table-column property="tournamentName" label="联赛名称" width="200"></el-table-column>
                    <el-table-column property="homeTeam" label="主队" width="200"></el-table-column>
                    <el-table-column property="guestTeam" label="客队" width="200"></el-table-column>
                    <el-table-column property="url" label="直播地址"></el-table-column>


                    <!--<el-table-column fixed="right" label="操作" width="100">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-button @click="insert(scope.row)" type="primary" size="small">插入</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {liveAllData,liveMatch,initMatchData,liveDataInsert} from "../../service/hapi";
    import { Message } from 'element-ui';

    export default {
        data(){
            return{
                outList:[],
                allList:[],
                inList:[],
                outLoading:true,
            }
        },
        created:function(){
            this.liveAllData()
            this.liveMatch()
            this.initMatchData()
        },
        methods:{
            liveAllData(){
                liveAllData().then(res=>{
                    console.log('all：',res)
                    if(res.code==0){
                        this.allList=res.data
                    }
                })
            },
            liveMatch(){
                liveMatch().then(res=>{
                    console.log('out：',res)
                    if(res.code==0){
                        this.outList=res.data
                    }
                    this.outLoading=false
                })
            },
            initMatchData(){
                initMatchData().then(res=>{
                    console.log('in：',res)
                    if(res.code==0){
                        this.inList=res.data
                    }
                })
            },
            insert(row){
                if(!!row.url){
                    liveDataInsert(row.matchId,row.tournamentName,this.tTt(row.matchTime),row.homeTeam,row.guestTeam,row.url,1).then(res=>{
                        console.log('插入：',res)
                        if(res.code==0){
                            Message.success('插入成功')
                            this.liveAllData()
                            this.initMatchData()
                        }else{
                            Message.success(res.message)
                        }
                    })
                }else{
                    Message.success('请输入地址')
                }
            },
            tTt(value){
                var date = new Date(value);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return h+':'+minute
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        width: 100%;
        box-sizing: border-box;
        padding:20px 20px;
    }
</style>
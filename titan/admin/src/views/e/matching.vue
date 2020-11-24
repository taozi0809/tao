<template>
    <div class="list">
        <el-tabs type="border-card" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
            <el-tab-pane label="未转化名字的比赛">
                <el-table :data="noList" border style="width: 100%" height="600">
                    <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                    <el-table-column label="比赛开始时间" width="200">
                        <template slot-scope="scope">
                            {{scope.row.matchTime}}
                        </template>
                    </el-table-column>
                    <el-table-column property="homeTeam" label="主队" width="200"></el-table-column>
                    <el-table-column property="guestTeam" label="客队" width="200"></el-table-column>
                    <el-table-column property="dataProviderId" label="数据来源"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="matchNoState(page)"
                        :current-page.sync="page"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="countNum">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="根据名字和数据来源匹配比赛">
                <div class="top">
                    <div class="item"><el-input v-model="name" placeholder="请输入名字"></el-input></div>
                    <div class="item"><el-input v-model="providerId" placeholder="请输入数据来源"></el-input></div>
                    <div class="item"><el-button type="primary" @click="find">查找</el-button></div>
                </div>
                <el-table :data="isList" border style="width: 100%" >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="name" label="名字" width="200"></el-table-column>
                    <el-table-column property="providerId" label="数据来源" width="200"></el-table-column>
                    <el-table-column label="转换后名字">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.switchName" placeholder="请输入转换后名字"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="matching(scope.row)" type="primary" size="small">转换</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="根据时间查找已转换名字的比赛">
                <div class="top">
                    <div class="item"><el-input v-model="time" placeholder="请粘贴时间"></el-input></div>
                    <div class="item"><el-button type="primary" @click="findTime">查找</el-button></div>
                </div>
                <el-table :data="hasList" border style="width: 100%" >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="homeTeamName" label="主队" width="300"></el-table-column>
                    <el-table-column property="guestTeamName" label="客队"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    import { Message } from 'element-ui';
    import {matchNoState,matchIsSwitch,mangerNameSwitch,switchUpOrInsert} from "../../service/hapi";
    export default {
        data(){
            return{
                loading:true,
                noList:[],
                isList:[],
                hasList:[],
                name:'',
                providerId:'',
                time:'',
                page:1,
                pageSize:10,
                countNum:0,

            }
        },
        computed:{
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.matchNoState(this.page)
        },
        methods:{
            matchNoState(page){
                matchNoState(page,this.pageSize).then(res=>{
                    console.log('未转化名字的比赛：',res)
                    this.loading=false
                    if(res.code==0){
                        this.noList=res.data.data
                        this.countNum=res.data.total
                    }

                })
            },
            matchIsSwitch(name,providerId){
                matchIsSwitch(name,providerId).then(res=>{
                    console.log('根据名字和数据来源查询名字是否被转换',res)
                    if(res.code==0){
                        this.isList=res.data.data
                    }
                })
            },
            mangerNameSwitch(date){
                mangerNameSwitch(date).then(res=>{
                    console.log('根据比赛开始时间获得雷达数据的主客队名字',res)
                    if(res.code==0){
                        this.hasList=res.data.data
                    }
                })
            },
            find(){
                this.matchIsSwitch(this.name,this.providerId)
            },
            findTime(){
                this.mangerNameSwitch(this.time)
            },
            matching(row){
                console.log(row)
                switchUpOrInsert(row.providerId,row.switchName,row.name).then(res=>{
                    console.log('转换名字',res)
                    if(res.code==0){
                        Message.success('转换成功')
                    }else{
                        Message.error(res.message)
                    }
                })
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
    .top{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .item{
            width: 200px;
            margin-right: 20px;
        }
    }

</style>
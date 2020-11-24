<template>
    <div class="configuration">
        <div v-if="$route.path=='/robot/configuration'">
            <div class="header">
                <div class="l">
                    <div class="m">
                        <el-select v-model="status" placeholder="请选择" @change="change">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="m"><el-button type="primary" @click="startAll">一键运行</el-button></div>
                    <div class="m"><el-button type="danger" @click="stopAll">一键暂停</el-button></div>
                </div>
            </div>
            <div class="list">
                <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" @selection-change="handleSelectionChange"
                          v-loading="loading"
                          element-loading-text="加载中"
                          element-loading-background="rgba(255, 255, 255, .5)">

                    <el-table-column type="selection" width="60" align="center"></el-table-column>
                    <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                    <el-table-column prop="match_type" label="赛事类型" width="120"></el-table-column>
                    <el-table-column prop="match_num" label="赛事数量" width="120"></el-table-column>
                    <el-table-column prop="robot_total" label="机器人总数量" width="120"></el-table-column>
                    <el-table-column label="机器人参赛总数量" width="140">
                        <template slot-scope="scope">
                            <span style="color: #F56C6C;" v-if="scope.row.robot_join_num/scope.row.robot_total>=0.8">{{scope.row.robot_join_num}}</span>
                            <span v-else>{{scope.row.robot_join_num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="$router.push({name:'robot_details',params:{match_type:scope.row.match_type}})">查看详情</el-button>
                        </template>
                    </el-table-column>


                </el-table>
                <el-pagination
                        @current-change="robotMatch()"
                        :current-page.sync="page"
                        :page-size="per"
                        layout="total, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>

        <router-view />
    </div>
</template>

<script>
    import {robotMatch,startAll,stopAll} from "../../service/api/api";
    import {Message} from "element-ui"

    export default {
        data(){
            return{
                status:"",
                options:[],
                per:10,
                page:1,
                list:[],
                match_types: [],
                count:0,
                loading:false,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.robotMatch()

        },
        methods:{
            change(){
                this.robotMatch()
            },
            handleSelectionChange(val) {
                let arr = []
                for(let i in val){
                    arr.push(val[i].match_type)
                }
                this.match_types = arr;
            },
            robotMatch(){
                let condition={}
                if (this.status != null && this.status != undefined && this.status != '') {
                    condition={
                        matchtype:this.status
                    }
                }else{
                    condition={}
                }
                robotMatch(this.page,this.per,condition).then(res=>{
                    console.log("赛事机器人列表",res)
                    if(res.code==1000){
                        this.list=res.resp.match_robots
                        this.count=res.resp.total
                        let arr=[]
                        arr.push({
                            value:"",
                            label:"全部"
                        })
                        for(let i in res.resp.match_types){
                            arr.push({
                                value:res.resp.match_types[i],
                                label:res.resp.match_types[i],
                            })
                        }
                        this.options=arr
                    }
                })
            },
            stopAll(){
                if(this.match_types.length>0){
                    stopAll(this.match_types).then(res=>{
                        console.log("一键暂停",res)
                        if(res.code==1000){
                            this.match_types=[]
                            Message.success("操作成功")
                            this.robotMatch()
                        }
                    })
                }else{
                    Message.error("请勾选")
                }

            },
            startAll(){
                if(this.match_types.length>0){
                    startAll(this.match_types).then(res=>{
                        console.log("一键启动",res)
                        if(res.code==1000){
                            this.match_types=[]
                            Message.success("操作成功")
                            this.robotMatch()
                        }
                    })
                }else{
                    Message.error("请勾选")
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .dialog-con{
        .d1{
            display: flex;
            align-items: center;
            text-align: right;
            margin-bottom: 20px;
            .t{
                flex-shrink: 0;
                width:70px;
            }
            .v{
                width: 100%;
                text-align: left;
            }
        }
    }
    .dialog-f{
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-top: 50px;

    }
</style>

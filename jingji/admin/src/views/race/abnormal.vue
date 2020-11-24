<template>
    <div class="details">
        <div v-if="$route.path=='/race/abnormal'">
            <div class="list">
                <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700">
                    <el-table-column type="index" width="50"></el-table-column>

                    <el-table-column prop="MatchID" label="赛事ID,场数" width="250">
                        <template slot-scope="scope">
                            <span>{{scope.row.SonMatchID.substring(0,12)}} {{ scope.row.SonMatchID.substring(12,20)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="AccountID" label="玩家ID" width="200"></el-table-column>
                    <el-table-column prop="MatchName" label="赛事昵称" width="200"></el-table-column>
                    <el-table-column prop="MatchType" label="赛事类型" width="200"></el-table-column>

                    <el-table-column label="比赛时间" width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.CreateTime | timestampToTime1}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="CallbackStatus" label="状态" width="120">
                        <template slot-scope="scope">
                            {{scope.row.CallbackStatus==1?'未回调':scope.row.CallbackStatus==2?'回调中':'已回调'}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="Operator" label="操作人" ></el-table-column>

                    <el-table-column fixed="right" label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="dealIllegalMatchCallback(scope.row)" v-if="scope.row.CallbackStatus==1" :loading="loading">数据回调</el-button>
                            <el-button type="warning" size="small" @click="$router.push({name:'race_detail',params:{id:scope.row.SonMatchID}})">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getIllegalMatchRecord,dealIllegalMatchCallback} from "../../service/api/api";

    export default {
        data(){
            return{
                list:[],
                loading:false,
            }
        },
        created(){
            this.getIllegalMatchRecord()
        },
        methods:{
            change(){
                this.getIllegalMatchRecord()
            },
            getIllegalMatchRecord(){
                getIllegalMatchRecord().then(res=>{
                    console.log("赛事列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            },
            dealIllegalMatchCallback(row){
                this.loading=true
                dealIllegalMatchCallback(row.AccountID,row.SonMatchID).then(res=>{
                    console.log("数据回调",res)
                    this.loading=false
                    if(res.code==0){
                        Message.success("回调成功")
                        this.getIllegalMatchRecord()
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";

    .list{
        box-sizing: border-box;
        padding:10px;
    }
    .s{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 600px !important;
        .s1{
            width: 290px;
        }
    }
</style>

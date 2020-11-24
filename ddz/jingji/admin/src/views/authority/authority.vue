<template>
    <div class="authority">
        <div class="header">
            <div class="l">
                <div class="item">
                    <el-select v-model="AgentType" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                <el-table-column prop="TotalCount" label="总人数" width="120"></el-table-column>
                <el-table-column prop="YestodayCount" label="昨日新增人数" width="120"></el-table-column>
                <el-table-column prop="LastMonthCount" label="上月新增人数" width="120"></el-table-column>
                <el-table-column prop="MonthCount" label="本月新增人数" width="120"></el-table-column>
                <el-table-column label="提现总额">
                    <template slot-scope="scope">
                        {{scope.row.Cashed>=0?scope.row.Cashed/100:scope.row.Cashed}}元
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="getAgentTypeLimitsClick(scope.row.AgentType)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getAgentTypeList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialog-box">
            <el-dialog
                    title="修改代理权限"
                    :visible.sync="isDialogAgentType"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item" style>
                        <div class="t">推广类型：{{dialogAgentType}}</div>
                        <div class="v"></div>
                    </div>
                    <div class="item" v-for="(item,index) in list2">
                        <div class="t">{{item.Title}}</div>
                        <div class="v">
                            <el-checkbox v-model="item.OneLimits[index1]" v-for="(item1,index1) in listNames[index]" :key="index1">{{item1}}</el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="editAgentTypeLimits">确认</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
    import {getAgentTypeList,getAgentTypeLimits,editAgentTypeLimits} from "../../service/api/api";
    import {mapState, mapMutations} from 'vuex'
    import {Message} from "element-ui"

    export default {
        data(){
            return{
                options:[],
                AgentType: '',
                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,

                listNames:[],
                list2:[],
                dialogAgentType:"",
                isDialogAgentType:false,
            }
        },
        computed:{
            ...mapState(['agentTypes']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.options.push({
                value:"",
                label:"全部",
            })
            for(let i in this.agentTypes){
                this.options.push({
                    value:this.agentTypes[i],
                    label:this.agentTypes[i],
                })
            }
            this.getAgentTypeList()
        },
        methods:{
            change(){
                this.getAgentTypeList()
            },
            handleClose(){
                this.isDialogAgentType=false
            },
            getAgentTypeLimitsClick(AgentType){
                this.dialogAgentType=AgentType
                getAgentTypeLimits(AgentType).then(res=>{
                    console.log("获取修改权限列表",res)
                    if(res.code==0){
                        this.listNames=res.listNames
                        var list2 = res.list
                        for(let i in list2){
                            for(let j in list2[i].OneLimits){
                                if(list2[i].OneLimits[j]==1){
                                    list2[i].OneLimits[j]=true
                                }else{
                                    list2[i].OneLimits[j]=false
                                }
                            }
                        }
                        this.list2=list2
                        console.log(this.list2)
                        this.isDialogAgentType=true
                    }
                })
            },
            getAgentTypeList(){
                this.loading=true
                getAgentTypeList(this.AgentType,this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("推广权限列表",res)
                    if(res.code==0){
                        this.list= res.list
                        this.count = res.total
                    }
                })
            },
            editAgentTypeLimits(){
                var list2 = this.list2
                for(let i in list2){
                    for(let i in list2){
                        for(let j in list2[i].OneLimits){
                            if(list2[i].OneLimits[j]){
                                list2[i].OneLimits[j]=1
                            }else{
                                list2[i].OneLimits[j]=0
                            }
                        }
                    }
                }
                editAgentTypeLimits(this.dialogAgentType,list2).then(res=>{
                    console.log("修改编辑权限列表",res)
                    if(res.code==0){
                        Message.success("修改成功")
                        this.handleClose()
                    }
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .l{
            display: flex;
            align-items: center;
            .m{
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
    }
    .dialog-con{
        .item{
            margin-bottom: 20px;
            .t{
                font-size:16px;
                color: #999;
                height: 40px;
                line-height: 40px;
            }
            .v{
                font-size: 14px;
                color: #333;
                box-sizing: border-box;
                padding-left: 15px;
                .el-checkbox{
                    margin-bottom: 15px;
                }
            }
        }
        .f{}
    }
</style>

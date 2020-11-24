<template>
    <div class="income">
        <div class="tabs">
            <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
                <el-tab-pane label="授权费返佣" name="授权费返佣">
                    <div class="list">
                        <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column prop="Name" label="授权费直返" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.List.Rates[0]}}%
                                </template>
                            </el-table-column>
                            <el-table-column prop="Name" label="授权费平返" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.List.Rates[1]}}%
                                </template>
                            </el-table-column>
                            <el-table-column prop="Name" label="授权费间返" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.List.Rates[2]}}%
                                </template>
                            </el-table-column>
                            <el-table-column prop="Name" label="授权费">
                                <template slot-scope="scope">
                                    {{scope.row.List.AgentFee>=0?scope.row.List.AgentFee/100:scope.row.List.AgentFee}}
                                </template>
                            </el-table-column>

                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="dialogClick(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="getAgentTypeRates()"
                                :current-page.sync="page"
                                :page-size="per"
                                layout="total, prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="充值费" name="充值费">
                    <div class="list">
                        <el-table :data="list22" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading22"
                                  element-loading-text="加载中"
                                  element-loading-background="rgba(255, 255, 255, .5)">
                            <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                            <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                            <el-table-column label="选手直返" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.List[0]}}%
                                </template>
                            </el-table-column>
                            <el-table-column label="间返到顶级" width="120">
                                <template slot-scope="scope">
                                    {{scope.row.List[1]}}%
                                </template>
                            </el-table-column>


                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="dialogClick22(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change=""
                                :current-page.sync="page22"
                                :page-size="per22"
                                layout="total, prev, pager, next, jumper"
                                :total="count22">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="授权费返佣调整"
                    :visible.sync="isDialogRate"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="t">授权费直返：</div>
                        <div class="v">
                            <el-input v-model.number="list2.Rates[0]" placeholder="请输入内容"></el-input>
                        </div>
                        %
                    </div>
                    <div class="item">
                        <div class="t">授权费平返：</div>
                        <div class="v">
                            <el-input v-model.number="list2.Rates[1]" placeholder="请输入内容"></el-input>
                        </div>
                        %
                    </div>
                    <div class="item">
                        <div class="t">授权费间返：</div>
                        <div class="v">
                            <el-input v-model.number="list2.Rates[2]" placeholder="请输入内容"></el-input>
                        </div>
                        %
                    </div>
                    <div class="item">
                        <div class="t">授权费：</div>
                        <div class="v">
                            <el-input v-model.number="list2.AgentFee" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose" >取 消</el-button>
                    <el-button type="primary" @click="editAgentTypeRate" >确 认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="充值费调整"
                    :visible.sync="isDialogRate2"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="t">玩家直返：</div>
                        <div class="v">
                            <el-input v-model.number="list222[0]" placeholder="请输入内容"></el-input>
                        </div>
                        %
                    </div>
                    <div class="item">
                        <div class="t">间返到顶级：</div>
                        <div class="v">
                            <el-input v-model.number="list222[1]" placeholder="请输入内容"></el-input>
                        </div>
                        %
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose" >取 消</el-button>
                    <el-button type="primary" @click="editAgentChargeRate" >确 认</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getAgentTypeRates,editAgentTypeRate,getAgentChargeRates,editAgentChargeRate} from "../../service/api/api";
    import {Message} from "element-ui"

    export default {
        data(){
            return{
                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,
                isDialogRate:false,
                list2: {
                    Rates: [],
                },
                DialogAgentType:"",

                activeName:"授权费返佣",

                list22:[],
                count22:0,
                loading22:false,
                page22:1,
                per22:10,
                list222:[],
                isDialogRate2:false,
                DialogAgentType2:"",
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.getAgentTypeRates()
        },
        methods:{
            handleClick(){
                if (this.activeName=="充值费"){
                    this.getAgentChargeRates()
                }else{
                    this.getAgentTypeRates()
                }
            },
            handleClose(){
                if (this.activeName=="充值费"){
                    this.isDialogRate2=false
                    this.getAgentChargeRates()
                }else{
                    this.isDialogRate=false
                    this.getAgentTypeRates()
                }
            },
            dialogClick(i){
                this.isDialogRate=true
                this.list2=i.List
                this.list2.AgentFee=this.list2.AgentFee/100
                this.DialogAgentType=i.AgentType

            },
            dialogClick22(i){
                this.isDialogRate2=true
                this.list222=i.List
                this.DialogAgentType2=i.AgentType
            },
            getAgentTypeRates(){
                this.loading=true
                getAgentTypeRates(this.page,this.per).then(res=>{
                    console.log("收益比例列表",res)
                    this.loading=false
                    if(res.code==0){
                        let list = res.list
                        this.list=list
                        this.count=res.total
                    }
                })
            },
            editAgentTypeRate(){
                this.list2.AgentFee=this.list2.AgentFee*100
                editAgentTypeRate(this.DialogAgentType,this.list2).then(res=>{
                    console.log("修改收益比例",res)
                    if(res.code==0){
                        Message.success("修改成功")
                        this.handleClose()
                        this.getAgentTypeRates()
                    }
                })
            },
            getAgentChargeRates(){
                this.loading22=true
                getAgentChargeRates(this.page22,this.per22).then(res=>{
                    console.log("充值费列表",res)
                    this.loading22=false
                    if(res.code==0){
                        let list22 = res.list
                        this.list22=list22
                        this.count22=res.total
                    }
                })
            },
            editAgentChargeRate(){
                editAgentChargeRate(this.DialogAgentType2,this.list222).then(res=>{
                    console.log("修改充值费",res)
                    if(res.code==0){
                        Message.success("修改成功")
                        this.handleClose()
                        this.getAgentChargeRates()
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .tabs{
        box-sizing: border-box;
        width: 100%;
        padding: 0 10px;
        margin-top: 10px;
    }
    .list{
        box-sizing: border-box;
        width: 100%;
        padding: 0 10px;
        margin-top: 10px;
    }
    .dialog-con{
        .item{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .t{
                width: 90px;
            }
            .v{
                margin-right: 10px;
            }
        }

    }
    .f{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 50px;
    }
</style>

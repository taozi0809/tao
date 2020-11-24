<template>
    <div class="proxy">
        <div class="header">
            <div class="l">
                <div class="l1"><el-input placeholder="推广ID" prefix-icon="el-icon-search" v-model.number="AccountID" @input="searchOneAgent()"></el-input></div>
                <div class="l1"><el-input placeholder="推广姓名" prefix-icon="el-icon-search" v-model="Name" @input="searchOneAgent()"></el-input></div>
                <div class="l1"><el-input placeholder="联系方式" prefix-icon="el-icon-search" v-model="Phone" @input="searchOneAgent()" maxLength='11'></el-input></div>
            </div>
            <div class="s">
                <div class="m">
                    <el-button type="primary" @click="isDialogAddProxy=true">添加推广账号</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AccountID" label="推广ID" width="120"></el-table-column>
                <el-table-column prop="Name" label="推广姓名" width="120"></el-table-column>
                <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                <el-table-column prop="AgentType" label="推广类型" width="120"></el-table-column>
                <el-table-column prop="GameID" label="绑定游戏ID" width="120"></el-table-column>
                <el-table-column label="已提现总额" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Cashed>=0?scope.row.Cashed/100:scope.row.Cashed}}元
                    </template>
                </el-table-column>
                <el-table-column label="可提现金额" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}元
                    </template>
                </el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <span :class="scope.row.Status==1?'c1'
                        :scope.row.Status==2?'c2'
                        :scope.row.Status==3?'c3'
                        :scope.row.Status==4?'c4':''">{{scope.row.Status | statusToStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="推广详情" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="getOneAgent(scope.row.AccountID)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getAgents()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="创建推广账号"
                    :visible.sync="isDialogAddProxy"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">手机号码：</div>
                            <div class="v"><el-input v-model="AgentPhone" placeholder="请输入手机号码" size="small" maxLength='11'></el-input></div>
                        </div>
                        <div class="r">
                            <div class="t">姓名：</div>
                            <div class="v"><el-input v-model="AgentName" placeholder="请输入真实姓名" size="small"></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">推广类型：</div>
                            <div class="v">
                                <el-select v-model="AgentRole" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="r">
                            <div class="t">微信号：</div>
                            <div class="v"><el-input v-model="WechatNum" placeholder="请输入微信号" size="small"></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">游戏ID：</div>
                            <div class="v"><el-input v-model.number="GameID" placeholder="请输入游戏ID" size="small"
                                                     oninput="if(isNaN(value)) { value = null }
                                                     if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"></el-input></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">地区：</div>
                        <div class="v">
                            <el-cascader
                                    ref="cascaderAddr"
                                    size="large"
                                    :options="CityOptions"
                                    v-model="selectedOptions"
                                    @change="handleChange">
                            </el-cascader>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="addProxyClick">创建</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="创建成功"
                    :visible.sync="isDialogAddProxy2"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item2">
                        <div class="l">
                            <div class="t">推广账号：</div>
                            <div class="v">{{AgentPhone}}</div>
                        </div>
                        <div class="r">
                            <div class="t">推广密码：</div>
                            <div class="v">{{AgentPhone}}</div>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose">确认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="推广详情"
                    :visible.sync="isDialogAddProxy3"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">推广账号：</div>
                            <div class="v">{{agent.Account}}</div>
                        </div>
                        <div class="r">
                            <div class="t">推广密码：</div>
                            <div class="v">********</div>
                            <div class="p"><el-button type="primary" @click="initPassword(parseInt(agent.AccountID))" size="mini">初始</el-button></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l" >
                            <div class="t">推广账号：</div>
                            <div class="v">
                                <el-select v-model="agent.Status" placeholder="请选择" size="small" :disabled="agent.Status==2||agent.Status==3" @change="changeStatus">
                                    <el-option
                                            v-for="item in options2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">推广ID：</div>
                            <div class="v">{{agent.AccountID}}</div>
                        </div>
                        <div class="r">
                            <div class="t">姓名：</div>
                            <div class="v">{{agent.Name}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">游戏ID：</div>
                            <div class="v">{{agent.GameID}}</div>
                        </div>
                        <div class="r">
                            <div class="t">微信号：</div>
                            <div class="v">{{agent.WechatNum}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">地区：</div>
                            <div class="v">{{agent.Location}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">推荐推广ID：</div>
                            <div class="v">{{agent.Recommend>0?agent.Recommend:agent.UpAgentID}}</div>
                        </div>
                        <div class="r">
                            <div class="t">提现次数：</div>
                            <div class="v">{{agent.CashCount}}</div>
                        </div>
                    </div>
                    <div class="item2">
                        <div class="l">
                            <div class="t">银行：</div>
                            <div class="v">{{agent.BankName}}</div>
                        </div>
                        <div class="r">
                            <div class="t">银行卡号：</div>
                            <div class="v">{{agent.BankID}}</div>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose">关闭</el-button>
                    <el-button type="primary" @click="addProxy2(agent.Account,agent.Name,agent.AgentType,agent.GameID)" v-if="agent.Status==3">重新申请</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="初始成功"
                    :visible.sync="isDialogAddProxy4"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item2">
                        <div class="l">
                            <div class="t">推广账号：</div>
                            <div class="v">{{agent.Phone}}</div>
                        </div>
                        <div class="r">
                            <div class="t">推广密码：</div>
                            <div class="v">{{agent.Phone}}</div>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose">确认</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {addAgent,getAgents,getOneAgent,searchOneAgent,initPassword,optUser} from "../../service/api/api";
    import { provinceAndCityData } from 'element-china-area-data'

    export default {
        data(){
            return{
                CityOptions: provinceAndCityData,
                selectedOptions: [],
                AccountID:null,
                Name:"",
                Phone:"",
                AgentPhone:"",
                AgentName:"",
                AgentRole:"",
                GameID:"",
                GameNickname:"",
                GamePhone:"",
                WechatNum:'',
                Location:'',
                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,
                isDialogAddProxy:false,
                isDialogAddProxy2:false,
                isDialogAddProxy3:false,
                isDialogAddProxy4:false,
                options:[],
                options2:[
                    {
                        value:1,
                        label:"正常",
                    },
                    {
                        value:2,
                        label:"审核中",
                        disabled:true,
                    },
                    {
                        value:3,
                        label:"不通过",
                        disabled:true,
                    },
                    {
                        value:4,
                        label:"封号",
                    },
                ],
                agent:{},

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {

            this.getAgents()
        },
        methods:{
            handleChange (value) {
                // console.log(this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels.join(','))
                this.Location=this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels.join(',')
            },
            handleClose(){
                this.isDialogAddProxy4=false
                this.isDialogAddProxy3=false
                this.isDialogAddProxy2=false
                this.isDialogAddProxy=false

                this.AgentPhone=""
                this.AgentName=""
                this.AgentRole=""
                this.GameID=null
                this.GameNickname=""
                this.GamePhone=""
                this.Location=''
                this.WechatNum=''
                this.selectedOptions=[]
            },
            addProxyClick(){
                if(!!this.AgentPhone){}else{Message.error("请输入推广手机号码");return}
                if(!!this.AgentName){}else{Message.error("请输入推广姓名");return}
                if(!!this.AgentRole){}else{Message.error("请输入推广类型");return}
                if(!!this.Location){}else{Message.error("请输入推广地区");return}
                this.addAgent()
            },
            getAgents(){
                this.loading=true
                getAgents(this.page,this.per).then(res=>{
                    console.log("获取推广列表",res)
                    this.loading=false
                    if(res.code==0){
                        var arr=res.addAgentList
                        this.options=[]
                        for(let i in arr){
                            this.options.push({
                                value:arr[i],
                                label:arr[i],
                            })
                        }
                        this.list=res.agents
                        this.count=res.total
                    }
                })
            },
            addAgent(){
                addAgent(this.AgentPhone,this.AgentName,this.AgentRole,parseInt(this.GameID),this.GameNickname,this.GamePhone,this.WechatNum,this.Location).then(res=>{
                    console.log("新增推广",res)
                    if(res.code==0){
                        this.isDialogAddProxy2=true
                        this.getAgents()
                    }
                })
            },
            addProxy2(AgentPhone,AgentName,AgentRole,GameID){
                addAgent(AgentPhone,AgentName,AgentRole,GameID).then(res=>{
                    console.log("新增推广",res)
                    if(res.code==0){
                        this.isDialogAddProxy3=false
                        this.getAgents()
                        Message.success("申请成功")
                    }
                })
            },
            searchOneAgent(){
                if(!!this.AccountID||!!this.Name||!!this.Phone){
                    searchOneAgent(parseInt(this.AccountID),this.Name,this.Phone).then(res=>{
                        console.log("搜索推广",res)
                        if(res.code==0){
                            if(!!res.agent.AccountID){
                                this.list=[]
                                this.list.push(res.agent)
                                this.count=1
                            }else{
                                this.list=[]
                                this.count=0
                            }
                        }
                    })
                }else{
                    this.getAgents()
                }
            },
            getOneAgent(AccountID){
                getOneAgent(AccountID).then(res=>{
                    console.log("查看推广",res)
                    if(res.code==0){
                        this.isDialogAddProxy3=true
                        this.agent=res.agent
                    }
                })
            },
            initPassword(AccountID){
                initPassword(AccountID).then(res=>{
                    console.log("初始化推广密码",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        this.isDialogAddProxy4=true
                    }
                })
            },
            changeStatus(){
                optUser(this.agent.AccountID,this.agent.Status).then(res=>{
                    console.log("操作推广状态",res)
                    if(res.code==0){
                        Message.success("操作成功")
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top:20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .l{
            display: flex;
            align-items: center;
            .l1{
                width: 250px;
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 20px;
        margin-top:20px;
        .c1{
            color: #409EFF;
        }
        .c2{
            color: #E6A23C;
        }
        .c3{
            color:#F56C6C ;
        }
        .c4{
            color: #909399;
        }
    }
    .dialog-box{
        position: relative;
        .dialog-con{
            position: relative;
            .item{
                width: 100%;
                display: flex;
                align-items: center;
                height: 60px;
                .l,.r{
                    display: flex;
                    align-items: center;
                    width: 300px;
                    .t{
                        flex-shrink: 0;
                    }
                    .v{
                        flex-shrink: 0;
                        width: 150px;
                    }
                }
            }
            .item2{
                .l,.r{
                    display: flex;
                    align-items: center;
                    height: 40px;
                }
            }
        }
        .f{
            margin-top:50px;
            display: flex;
            align-items: center;
            justify-content:space-around;
        }
    }
</style>

<style>
    .el-cascader-menu {
        height: 300px;
    }
</style>

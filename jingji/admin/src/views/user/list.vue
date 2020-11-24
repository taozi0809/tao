<template>
    <div class="lst">
       <div v-if="$route.path=='/user/list'">
           <div class="header">
               <div class="l">
                   <div class="i1">
                       <el-input placeholder="用户ID" prefix-icon="el-icon-search" v-model.number="AccountID" @input="change"></el-input>
                   </div>
                   <div class="i1">
                       <el-input placeholder="用户昵称" prefix-icon="el-icon-search" v-model="Nickname" @input="change"></el-input>
                   </div>
                   <!--          <div class="i1">-->
                   <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="Phone" @input="change"></el-input>
                   <!--          </div>-->

               </div>
           </div>
           <div class="list">
               <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700"
                         @row-click="handRowClick"
                         v-loading="loading"
                         element-loading-text="加载中"
                         element-loading-background="rgba(255, 255, 255, .5)">

                   <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>
                   <el-table-column prop="ShareID" label="邀请人ID" width="120"></el-table-column>
                   <el-table-column prop="AccountID" label="用户ID" width="120"></el-table-column>
                   <el-table-column prop="Nickname" label="昵称" width="150"></el-table-column>
                   <el-table-column prop="Username" label="手机号" width="120"></el-table-column>
                   <el-table-column prop="Coupon" label="点券余额" width="120"></el-table-column>
                   <el-table-column prop="ChargeAmount" label="累计充值金额" width="120"></el-table-column>
                   <el-table-column label="累计获得奖金" width="120">
                       <template slot-scope="scope">
                           {{scope.row.AwardTotal>0?scope.row.AwardTotal:0}}
                       </template>
                   </el-table-column>

                   <el-table-column prop="AwardAvailable" label="可提现奖金" width="120">
                       <template slot-scope="scope">
                           {{scope.row.AwardAvailable>0?scope.row.AwardAvailable:0}}
                       </template>
                   </el-table-column>
                   <el-table-column prop="MatchCount" label="参赛次数" width="120"></el-table-column>

                   <el-table-column label="账户状态" width="120">
                       <template slot-scope="scope">
                           <el-select v-model="scope.row.Role" placeholder="请选择" @change="changRole(scope.row)">
                               <el-option
                                       v-for="item in RoleOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                                       :disabled="item.disabled">
                               </el-option>
                           </el-select>

                       </template>
                   </el-table-column>
                   <el-table-column fixed="right" label="操作" width="350">
                       <template slot-scope="scope">
                           <el-button type="warning" size="small" @click="$router.push({name:'user_info',params:{accountid:scope.row.AccountID}})">个人信息</el-button>
                           <el-button type="warning" size="small" @click="$router.push({name:'user_race',params:{accountid:scope.row.AccountID}})">个人赛事总览</el-button>
                           <el-button type="warning" size="small" @click="$router.push({name:'user_log',params:{accountid:scope.row.AccountID}})">个人操作日志</el-button>
                       </template>
                   </el-table-column>
               </el-table>
               <el-pagination
                       @current-change="getUserList()"
                       :current-page.sync="page"
                       :page-size="per"
                       layout="total, prev, pager, next, jumper"
                       :total="count">
               </el-pagination>
           </div>
           <div class="dialogMatch">
               <el-dialog
                       center
                       :before-close="handleClose"
                       :modal-append-to-body="false"
                       :visible.sync="isDialog"
                       width="900px">
                   <div class="dialog-con">
                       <div class="des">
                            <div class="list1">
                                <div class="name">被邀请人ID</div>
                                <el-table :data="list1" style="width: 100%;margin-bottom: 10px;" border height="600">

                                    <el-table-column type="index" :index="getInIndex1" label="序号" width="50"></el-table-column>
                                    <el-table-column prop="" label="被邀请人ID">
                                        <template slot-scope="scope">
                                            {{scope.row}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        small
                                        @current-change="getMyShareIDs(accountid)"
                                        :current-page.sync="page1"
                                        :page-size="per"
                                        layout="total, prev, pager, next, jumper"
                                        :total="count1">
                                </el-pagination>
                            </div>
                            <div class="list2">
                                <div class="name">当日参赛用户ID</div>
                                <el-table :data="list2" style="width: 100%;margin-bottom: 10px;" border height="600">
                                    <el-table-column type="index" :index="getInIndex2" label="序号" width="50"></el-table-column>
                                    <el-table-column prop="" label="当日参赛用户ID">
                                        <template slot-scope="scope">
                                            {{scope.row}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        small
                                        @current-change="getMyPlayWiths(accountid)"
                                        :current-page.sync="page2"
                                        :page-size="per"
                                        layout="total, prev, pager, next, jumper"
                                        :total="count2">
                                </el-pagination>
                            </div>
                       </div>
                       <div class="t1 tt">
                           <div class="l"></div>
                           <div class="r">
                               <el-button @click="handleClose()">取 消</el-button>
                           </div>
                       </div>
                   </div>
               </el-dialog>
           </div>

       </div>
        <router-view/>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {getUserList,optUser,getOneUser,getMyShareIDs,getMyPlayWiths} from "../../service/api/api";


    export default {
        data(){
            return{
                a1:false,
                AccountID:null,
                Nickname:"",
                Phone:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                RoleOptions:[
                    {
                        value:-2,
                        label:"机器人",
                        disabled:true,
                    },
                    {
                        value:-1,
                        label:"封号",
                    },
                    {
                        value:1,
                        label:"正常",
                    },
                    {
                        value:2,
                        label:"代理",
                        disabled:true,
                    },
                    {
                        value:3,
                        label:"管理员",
                        disabled:true,
                    },
                    {
                        value:4,
                        label:"最高管理员",
                        disabled:true,
                    },
                ],

                page1:1,
                page2:1,
                count1:0,
                count2:0,
                list1:[],
                list2:[],
                accountid:0,

                isDialog:false
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
            getInIndex1(){
                return (this.page1 - 1) * this.per +1
            },
            getInIndex2(){
                return (this.page2 - 1) * this.per +1
            },
        },
        created() {
            this.getUserList()
        },
        methods:{
            handleClose(){
                this.isDialog=false
            },
            handRowClick(row){
                this.accountid=row.AccountID
                this.getMyShareIDs(row.AccountID)
                this.getMyPlayWiths(row.AccountID)
                this.isDialog=true
                this.a1=true
            },
            change(){
                if(!!this.AccountID||!!this.Nickname||!!this.Phone){
                    this.getOneUser(!!this.AccountID?this.AccountID:null,!!this.Nickname?this.Nickname:null,!!this.Phone?this.Phone:null)
                }else{
                    this.getUserList()
                }
            },
            getUserList(){
                this.loading=true
                getUserList(this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("用户列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            },
            changRole(i){
                optUser(i.UserID,i.Role).then(res=>{
                    console.log("修改状态",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        this.getUserList()
                    }
                })
            },
            getOneUser(AccountID,Nickname,Phone){
                getOneUser(AccountID,Nickname,Phone).then(res=>{
                    console.log("更具ID/昵称查询个人信息",res)
                    if(res.code==0){
                        this.list=res.user
                        this.total=res.total
                    }
                })
            },
            getMyShareIDs(AccountID){
                getMyShareIDs(AccountID,this.page1,this.per).then(res=>{
                    console.log("被邀请人ID",res)
                    if(res.code==0){
                        this.list1=res.list
                        this.count1=res.total
                    }
                })
            },
            getMyPlayWiths(AccountID){
                getMyPlayWiths(AccountID,this.page2,this.per).then(res=>{
                    console.log("当日参赛用户ID",res)
                    if(res.code==0){
                        this.list2=res.list
                        this.count2=res.total
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        .l{
            display: flex;
            align-content: center;
            .i1{
                flex-shrink: 0;
                width:300px;
                margin-right: 20px;
            }
        }
    }
    .list{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .dialog-con{
        box-sizing: border-box;
        .des{
            display: flex;
            justify-content: space-between;
            .list1,.list2{
                width: 50%;
                box-sizing: border-box;
                .name{
                    color: #333;
                    font-size: 16px;
                    margin-bottom: 30px;
                }
            }
            .list1{
                padding-right: 10px;
            }
            .list2{
                padding-left: 10px;
            }
        }
    }
</style>

<style>
    .el-notification {
        z-index: 99999999999!important;
    }
</style>

<template>
    <div class="lst">
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
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AccountID" label="用户ID" width="120"></el-table-column>
                <el-table-column prop="Nickname" label="用户实名" width="150"></el-table-column>
                <el-table-column prop="Username" label="手机号" width="120"></el-table-column>

                <el-table-column prop="SportCenter.Ranking" label="排名" width="100"></el-table-column>
                <el-table-column prop="SportCenter.Level" label="等级称号" width="120"></el-table-column>
                <el-table-column prop="SportCenter.GoldScore" label="金分" width="100"></el-table-column>
                <el-table-column prop="SportCenter.SilverScore" label="银分" width="100"></el-table-column>
                <el-table-column prop="SportCenter.RedScore" label="红分" width="100"></el-table-column>
                <el-table-column prop="SportCenter.BlueScore" label="蓝分"></el-table-column>


            </el-table>
            <el-pagination
                    @current-change="getUserList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {getUserList,optUser,getOneUser} from "../../service/api/api";

    export default {
        data(){
            return{
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
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.getUserList()
        },
        methods:{
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
</style>

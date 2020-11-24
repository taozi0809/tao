<template>
    <div class="lst">
        <div class="header">
            <div class="l">
                <div class="i2">
<!--                    状态：-->
                    <el-switch
                            @change="changeOpt"
                            :width="50"
                            v-model="opt"
                            active-text="开 启"
                            inactive-text="关 闭">
                    </el-switch>
                </div>
                <div class="i1">
                    <el-input placeholder="用户ID" prefix-icon="el-icon-search" v-model.number="AccountID" @input="change"></el-input>
                </div>
                <div class="i1">
                    <el-input placeholder="用户昵称" prefix-icon="el-icon-search" v-model="Nickname" @input="change"></el-input>
                </div>
                <div class="i1">
                    <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="Phone" @input="change"></el-input>
                </div>
                <div class="i1">
                    <el-button type="primary" @click="isDialog2=true">添加用户</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AccountID" label="用户ID" width="120"></el-table-column>
                <el-table-column prop="Nickname" label="昵称" width="150"></el-table-column>
                <el-table-column prop="Phone" label="手机号" width="150"></el-table-column>
                <el-table-column prop="Operator"label="操作人"></el-table-column>

                <el-table-column fixed="right" label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" @click="delWhitList(scope.row.AccountID)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getWhitList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialog-white">
            <el-dialog
                    title="确认"
                    center
                    :before-close="handleClose"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="400px">
                <div class="dialog-con">
                    {{opt?"请确认更新无误后，点击确定开启白名单。":"请确认更新无误后，点击确定关闭白名单。"}}
                </div>
                <div class="ft">
                    <el-button @click="handleClose" size="small">取 消</el-button>
                    <el-button type="primary" @click="optWhitList()" size="small">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-white">
            <el-dialog
                    title="添加白名单"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="400px">
                <div class="dialog-con">
                    <div class="item">
                        <div class="t">用户ID：</div>
                        <div class="v"><el-input v-model.number="addAccountID" placeholder="请输入内容"></el-input></div>
                    </div>
                </div>
                <div class="ft">
                    <el-button @click="handleClose2" size="small">取 消</el-button>
                    <el-button type="primary" @click="addWhitList(addAccountID)" size="small">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {optWhitList,getWhitList,addWhitList,delWhitList,sarchWhitList} from "../../service/api/api";

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
                opt:false,

                isDialog1:false,
                isDialog2:false,
                addAccountID:"",

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.getWhitList()
        },
        methods:{
            changeOpt(){
                this.isDialog1=true
            },
            handleClose(){
                this.getWhitList()
                this.isDialog1=false
            },
            handleClose2(){
                this.addAccountID=""
                this.isDialog2=false
            },
            change(){
                if(!!this.AccountID||!!this.Nickname||!!this.Phone){
                    this.sarchWhitList(!!this.AccountID?this.AccountID:null,!!this.Nickname?this.Nickname:null,!!this.Phone?this.Phone:null)
                }else{
                    this.getWhitList()
                }
            },
            getWhitList(){
                getWhitList(this.page,this.per).then(res=>{
                    console.log("白名单列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                        this.opt=res.open
                    }
                })
            },
            optWhitList(){
                optWhitList(this.opt).then(res=>{
                    console.log("状态",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        this.handleClose()
                    }
                })
            },
            sarchWhitList(AccountID,Nickname,Phone){
                sarchWhitList(AccountID,Nickname,Phone).then(res=>{
                    console.log("搜索",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            },
            delWhitList(AccountID){
                delWhitList(AccountID).then(res=>{
                    console.log("删除",res)
                    if(res.code==0){
                        this.getWhitList()
                        Message.success("操作成功")
                    }
                })
            },
            addWhitList(AccountID){
                addWhitList(AccountID).then(res=>{
                    console.log("添加",res)
                    if(res.code==0){
                        this.getWhitList()
                        Message.success("操作成功")
                        this.handleClose2()
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
                width:200px;
                margin-right: 20px;
            }
            .i2{
                display: flex;
                align-items: center;
                margin-right: 20px;
                flex-shrink: 0;
                color:#303133;
                font-size: 15px;
            }
        }
    }
    .list{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .dialog-white{
        .item{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .t{
                width:60px;
            }
            .v{
                margin-right: 10px;
            }
        }
        .ft{
            margin-top: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
        }
    }
</style>

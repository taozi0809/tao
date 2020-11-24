<template>
    <div class="userlist">
        <div class="header">
            <div class="l">
                <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="phoneNumber"
                          @input="change"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="users" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="nickName" label="用户昵称" width="200"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
                <el-table-column prop="phoneNumber" label="手机号" width="200"></el-table-column>
                <el-table-column prop="createTime" label="注册时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime | timestampToTime2}}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="dialog1Click(scope.row)">充值</el-button>
                        <!--                        <el-button type="primary" size="small">竞猜记录</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="userList"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialog">
            <el-dialog
                    title="充值"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="dialog1"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="dialog1Close">
                <div class="con">
                    <div class="item2">
                        <div class="l">
                            <div class="label">高尔夫兑奖球余额：</div>
                            <div class="input">{{balance1}}</div>
                        </div>
                        <div class="l">
                            <div class="label">高尔夫兑奖球-赠球余额：</div>
                            <div class="input">{{balance2}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">货币类型：</div>
                        <div class="input">
                            <el-select v-model="moneyType" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in moneyTypes"
                                        :key="item.moneyTypeCode"
                                        :label="item.moneyTypeName"
                                        :value="item.moneyTypeCode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">原因：</div>
                        <div class="input">
                            <el-select v-model="moneyRecordTemplate" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in moneyRecordTemplates"
                                        :key="item.templateCode"
                                        :label="item.templateContent"
                                        :value="item.templateCode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">数量：</div>
                        <div class="input">
                            <el-input v-model="sum"></el-input>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="dialog1Close">取 消</el-button>
                    <el-button type="primary" @click="groupMoneyAdd(user.userId,sum,moneyType,moneyRecordTemplate,)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {Message} from "element-ui"
    import {userList, byPhonenumber, moneyTypeList, moneyRecordList, groupMoneyAdd,walletServerBalance} from "@/service/config";


    export default {
        data() {
            return {
                phoneNumber: "",
                loading: false,
                page: 1,
                pageSize: 10,
                count: 0,
                users: [],
                moneyType:"",
                moneyTypes:[],
                moneyRecordTemplate:"",
                moneyRecordTemplates:[],
                dialog1:false,
                sum:"",
                user:{},
                balance1:0,
                balance2:0,

            }
        },
        computed: {
            getInIndex() {
                return (this.page - 1) * this.pageSize + 1
            },
        },
        created() {
            this.userList()
            this.moneyTypeList()
            this.moneyRecordList()
        },
        methods: {
            change() {
                if (!!this.phoneNumber) {
                    this.byPhonenumber()
                } else {
                    this.userList()
                }

            },
            dialog1Click(row){
                this.user={...row}
                this.dialog1=true
                walletServerBalance(row.userId,"GOLF_BALL").then(res=>{
                    console.log("高尔夫兑奖球余额",res)
                    if(res.code==0){
                        this.balance1=res.data.balance
                    }
                })
                walletServerBalance(row.userId,"GOLF_BALL_LIMIT").then(res=>{
                    console.log("高尔夫兑奖球赠球余额",res)
                    if(res.code==0){
                        this.balance2=res.data.balance
                    }
                })
            },
            dialog1Close(){
                this.dialog1=false
                this.sum=""
                this.moneyType=""
                this.moneyRecordTemplate=""
            },
            userList() {
                this.loading = true
                userList(this.page, this.pageSize).then(res => {
                    console.log("用户列表", res)
                    this.loading = false
                    if (res.code == 0) {
                        this.users = res.data.users
                        this.count = res.data.total
                    }
                })
            },
            byPhonenumber() {
                byPhonenumber(this.phoneNumber).then(res => {
                    console.log("通过手机号查找用户", res)
                    if (res.code == 0) {
                        this.users = res.data.users
                        this.count = res.data.total
                    }
                })
            },
            moneyTypeList() {
                moneyTypeList().then(res => {
                    console.log("货币类型列表", res)
                    if (res.code == 0) {
                        this.moneyTypes=res.data.moneyTypes
                    }
                })
            },
            moneyRecordList() {
                moneyRecordList().then(res=>{
                    console.log("货币记录模板类型列表",res)
                    if(res.code==0){
                        this.moneyRecordTemplates=res.data.moneyRecordTemplates
                    }
                })
            },
            groupMoneyAdd(userId,sum,moneyCode,templateCode){
                if(!!moneyCode){}else{Message.error("请选择货币类型")}
                if(!!templateCode){}else{Message.error("请选择原因")}
                if(sum*1>0){}else{Message.error("请输入数量")}
                groupMoneyAdd(userId,sum*1,moneyCode,templateCode).then(res=>{
                    console.log("为用户充值",res)
                    if(res.code==0){
                        this.dialog1Close()
                        Message.success("充值成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
  .userlist{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    .header{
      position: relative;
      box-sizing: border-box;
      .l{
        width: 300px;
      }
    }
    .list{
      box-sizing: border-box;
      padding-top: 10px;
    }
    .dialog{
      width: 100%;
      .con{
        width: 100%;
        margin-bottom:80px;
        .item{
          width: 100%;
          height:60px;
          display: flex;
          align-items: center;
          .label{
            width: 70px;
            flex-shrink: 0;
          }
          .input{
            width: 100%;
          }
        }
        .item:last-child{
          margin-top: 10px;
        }
        .item2{
          display: flex;
          align-items: center;
          height: 60px;
          .l{
            width: 50%;
            display: flex;
            align-items: center;
            .input{
              font-size: 18px;
            }
          }
        }
      }
      .foot{
        width: 400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

</style>

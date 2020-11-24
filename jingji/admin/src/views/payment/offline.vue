<template>
    <div class="offline">
        <div class="header">
            <div class="l">
                <div class="m m1">
                    <el-select v-model="status" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="m">
                    <el-date-picker
                            v-model="time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            @change="change">
                    </el-date-picker>
                </div>
                <div class="m">
                    <el-button type="primary" @click="isDialogAdd=true">添加</el-button>
                </div>
            </div>
            <div class="s">
                <el-input placeholder="用户ID" prefix-icon="el-icon-search" v-model.number="condition" @input="change"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="nickname" label="用户昵称" width="150"></el-table-column>
                <el-table-column prop="accountid" label="用户ID" width="120"></el-table-column>
                <el-table-column label="操作类型" width="120">
                    <template slot-scope="scope">
                        {{scope.row.actiontype | actiontypeToS}}
                    </template>
                </el-table-column>
                <el-table-column prop="beforfee" label="操作前数量" width="100"></el-table-column>
                <el-table-column prop="changefee" label="操作数量" width="100"></el-table-column>
                <el-table-column prop="afterfee" label="操作后数量" width="100"></el-table-column>
                <el-table-column label="操作时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.createdat | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="operator" label="操作人" width="120"></el-table-column>
                <el-table-column prop="desc" label="备注"></el-table-column>
            </el-table>
            <el-pagination
                    @current-change="offlinepaymentList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
        <div>
            <el-dialog
                    title="添加"
                    center
                    :modal-append-to-body="false"
                    :visible.sync="isDialogAdd"
                    width="600px"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="d1">
                        <div class="t">用户ID：</div>
                        <div class="v">
                            <el-input v-model.number="accountid" placeholder="请输入用户ID"></el-input>
                        </div>
                    </div>
                    <div class="d1">
                        <div class="t">操作类型：</div>
                        <div class="v">
                            <el-select v-model="action_type" placeholder="请选择">
                                <el-option
                                        v-for="item in action_typOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="d1">
                        <div class="t">操作数量：</div>
                        <div class="v">
                            <el-input v-model.number="change_fee" placeholder="请输入操作数量"></el-input>
                        </div>
                    </div>
                    <div class="d1">
                        <div class="t">备注：</div>
                        <div class="v">
                            <el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="desc" resize="none"></el-input>
                        </div>
                    </div>
                </div>
                <div class="dialog-f">
                    <el-button type="primary" @click="dialogAddClick">确 定</el-button>
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </el-dialog>

        </div>


    </div>
</template>

<script>
    import {offlinepaymentList,offlinepaymentAdd} from "../../service/api/api";
    import {Message} from "element-ui"

    export default {
        data(){
            return{
                options: [
                    {
                        value: "",
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '点券'
                    },
                    {
                        value: 1,
                        label: '税后奖金'
                    },
                    {
                        value: 2,
                        label: '碎片'
                    }
                ],
                action_typOptions:[
                    {
                        value: 0,
                        label: '点券'
                    },
                    {
                        value: 1,
                        label: '税后奖金'
                    },
                    {
                        value: 2,
                        label: '碎片'
                    }
                ],
                status:"",
                time:"",
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                condition:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                accountid:"",
                action_type:0,
                change_fee:"",
                desc:"",

                isDialogAdd:false,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            var t1 = new Date()
            var t2 = new Date()
            this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
            this.offlinepaymentList()
        },
        methods:{
            change(){
                this.offlinepaymentList()
            },
            handleClose(){
                this.isDialogAdd=false
                this.accountid=""
                this.change_fee=""
                this.desc=""
            },
            dialogAddClick(){
                if(!!this.accountid&&!!this.change_fee){
                    this.offlinepaymentAdd(this.accountid, this.action_type, this.change_fee,this.desc)
                }else{
                    Message.error("请填写用户ID和操作数量")
                }
            },
            offlinepaymentList(){
                var condition=[]
                if(this.status===0||this.status===1||this.status===2){
                    condition = this.condition.toString().length>0?{
                        actiontype:this.status,
                        accountid:this.condition
                    }:{
                        actiontype:this.status
                    }
                }else{
                    condition = this.condition.toString().length>0?{
                        accountid:this.condition
                    }:{}
                }
                offlinepaymentList(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,this.per,condition).then(res=>{
                    console.log("线下支付列表",res)
                    if(res.code==1000){
                        this.list = res.resp.offline_payment_datas
                        this.count = res.resp.total
                    }
                })
            },

            offlinepaymentAdd(accountid, action_type, change_fee,desc){
                offlinepaymentAdd(accountid, action_type, change_fee,desc).then(res=>{
                    console.log("添加线下支付",res)
                    if(res.code==1000){
                        this.offlinepaymentList()
                        Message.success("添加成功")
                        this.handleClose()
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

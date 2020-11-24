<template>
    <div class="recording">
        <div class="header">
            <div class="l">
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
                    <el-select v-model="payStatus" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in paySptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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


                <el-table-column prop="Accountid" label="用户ID" width="120"></el-table-column>
                <el-table-column prop="TradeNo" label="订单号" width="150"></el-table-column>
                <el-table-column prop="Merchant" label="商户名称" width="150"></el-table-column>
                <el-table-column prop="TradeNoReceive" label="商户订单号" width="150"></el-table-column>
                <el-table-column prop="GoodsType" label="商品类型" width="120"></el-table-column>
                <el-table-column prop="Amount" label="商品数量" width="120"></el-table-column>
                <el-table-column prop="Fee" label="支付金额" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Fee>=0?scope.row.Fee/100:scope.row.Fee}} 元
                    </template>
                </el-table-column>
                <el-table-column prop="Createdat" label="支付时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.Createdat | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="PayStatus" label="支付状态"></el-table-column>


            </el-table>
            <el-pagination
                    @current-change="orderHistory()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {orderHistory} from "../../service/api/api";
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
                        label: '碎片'
                    }
                ],
                paySptions:[
                    {
                        value:"",
                        label:"全部",
                    },
                    {
                        value:0,
                        label:"支付中",
                    },
                    {
                        value:1,
                        label:"支付成功",
                    },
                    {
                        value:2,
                        label:"支付失败",
                    },
                ],
                status:"",
                payStatus:"",
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
            this.orderHistory()
        },
        methods:{
            change(){
                this.orderHistory()
            },
            orderHistory(){
                let condition={}
                if(this.status===0||this.status===1){
                    if(this.payStatus===0||this.payStatus===1||this.payStatus===2){
                        if(this.condition.toString().length>0){
                            condition={
                                accountid:this.condition,
                                goodstype:this.status,
                                paystatus:this.payStatus,
                            }
                        }else{
                            condition={
                                goodstype:this.status,
                                paystatus:this.payStatus,
                            }
                        }
                    }else{
                        if(this.condition.toString().length>0){
                            condition={
                                accountid:this.condition,
                                goodstype:this.status,
                            }
                        }else{
                            condition={
                                goodstype:this.status,
                            }
                        }
                    }
                }else{
                    if(this.payStatus===0||this.payStatus===1||this.payStatus===2){
                        if(this.condition.toString().length>0){
                            condition={
                                accountid:this.condition,
                                paystatus:this.payStatus,
                            }
                        }else{
                            condition={
                                paystatus:this.payStatus,
                            }
                        }
                    }else{
                        if(this.condition.toString().length>0){
                            condition={
                                accountid:this.condition,
                            }
                        }else{
                            condition={}
                        }
                    }
                }

                this.loading=true
                orderHistory(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,this.per,condition).then(res=>{
                    console.log("支付历史",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.offline_payment_datas
                        this.count=res.resp.total
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

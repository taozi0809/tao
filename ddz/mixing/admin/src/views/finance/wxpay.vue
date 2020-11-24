<template>
    <div class="gact-recharge">
        <div class="top">
            <div class="l">
                <div class="title">用户充值明细</div>
                <div class="time">
                    <Time @selectTime="onSelectTime"/>
                </div>
                <div class="select-qd" v-if="gameName==0">
                    <el-select v-model="channel" placeholder="请选择" @change="changeChannel">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-box">
                <el-input placeholder="用户ID/昵称" v-model="condition" class="input-with-select" @input="playerCondition">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    <template slot="append">查找</template>
                </el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column prop="updatedat" label="时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="下载渠道" v-if="gameName==0">
                    <template slot-scope="scope">
                        {{scope.row.DownChannel==0?'官网':scope.row.DownChannel==1?'搜狗':'IOS'}}
                    </template>
                </el-table-column>
                <el-table-column prop="NickName" label="用户昵称" width="120"></el-table-column>
                <el-table-column prop="AccountID" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="Desc" label="购买商品" width="120"></el-table-column>
                <el-table-column prop="Fee" label="支付金额" width="100"></el-table-column>
                <el-table-column label="充值类型">
                    <template slot-scope="scope">
                        {{scope.row.Channel==1?'微信支付':scope.row.Channel==2?'支付宝支付':scope.row.Channel==3?'苹果支付':'QQ支付'}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="redemptionList(time[0],time[1],condition,channel)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {wxpayList} from "../../service/api/api";
    import {Message} from 'element-ui'
    import Time from '../../components/time/Time'
    import {mapState, mapMutations} from 'vuex'

    export default {
        components:{Time},
        data(){
            return{
                condition:'',
                per:10,
                page:1,
                list:[],
                count:0,
                time:'',
                loading:true,
                channel:'',
                options:[
                    {
                        value:'',
                        label:'全部',
                    },
                    {
                        value:0,
                        label:'官网',
                    },{
                        value:1,
                        label:'搜狗',
                    },
                    {
                        value:2,
                        label:'IOS',
                    },

                ],
            }
        },
        computed:{
            ...mapState(['gameName']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        mounted(){

        },
        methods:{
            onSelectTime(time){
                this.time=time
                this.redemptionList(time[0],time[1],this.condition,this.channel)
            },
            redemptionList(start,end,condition,channel){
                this.loading=true
                wxpayList(start,end,this.page,this.per,condition,channel).then(res=>{
                    console.log('用户充值明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.wxPayRecords
                        this.count=res.data.count
                    }
                })
            },
            playerCondition(){
                wxpayList(this.time[0],this.time[1],this.page,this.per,this.condition,this.channel).then(res=>{
                    console.log('根据condition查询用户充值明细',res)
                    if(res.errcode==2000){
                        this.list=res.data.wxPayRecords
                        this.count=res.data.count
                    }
                })
            },
            changeChannel(){
                wxpayList(this.time[0],this.time[1],this.page,this.per,this.condition,this.channel).then(res=>{
                    console.log('根据channel查询用户充值明细',res)
                    if(res.errcode==2000){
                        this.list=res.data.wxPayRecords
                        this.count=res.data.count
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .gact-recharge{
        box-sizing: border-box;
        padding: 20px;
        .top{
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .l{
                display: flex;
                align-items: center;
                .title{
                    color: #455A64;
                    font-size: 22px;
                    margin-right: 20px;
                }
                .time{
                    margin-right: 20px;
                }
            }

            .search-box{
                width: 300px;
                flex-shrink: 0;
            }
        }
        .list{
            .head-img{
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>

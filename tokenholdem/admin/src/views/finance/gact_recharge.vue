<template>
    <div class="gact-recharge">
        <div class="top">
            <div class="l">
                <div class="title">GACT充值明细</div>
                <div class="time">
                    <Time @selectTime="onSelectTime"/>
                </div>
            </div>
            <div class="search-box">
                <el-input placeholder="用户ID/手机号/昵称" v-model="condition" class="input-with-select" @input="playerCondition">
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
                <el-table-column prop="NickName" label="用户昵称" width="120"></el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="Account" label="绑定手机号" width="180"></el-table-column>
                <el-table-column prop="Action" label="用户操作" width="180"></el-table-column>
                <el-table-column prop="Expend" label="消耗金额" width="100"></el-table-column>
                <el-table-column prop="Obtain" label="获取金额" width="100"></el-table-column>
                <el-table-column prop="updatedat" label="时间">
                    <template slot-scope="scope">
                        {{scope.row.CreateDat | timestampToTime1}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="redemptionList(time[0],time[1],condition)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {redemptionList} from "../../service/api/api";
    import {Message} from 'element-ui'
    import Time from '../../components/time/Time'

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
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        mounted(){

        },
        methods:{
            onSelectTime(time){
                this.time=time
                this.redemptionList(time[0],time[1],this.condition)
            },
            redemptionList(start,end,condition){
                this.loading=true
                redemptionList(start,end,this.page,this.per,condition).then(res=>{
                    console.log('gact充值明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.redemption
                        this.count=res.data.count
                    }
                })
            },
            playerCondition(){
                redemptionList(this.time[0],this.time[1],this.page,this.per,this.condition,).then(res=>{
                    console.log('根据condition查询GACT',res)
                    if(res.errcode==2000){
                        this.list=res.data.redemption
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
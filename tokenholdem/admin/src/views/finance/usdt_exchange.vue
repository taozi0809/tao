<template>
    <div class="usdt-exchange">
        <div class="top">
            <div class="l">
                <div class="title">USDT兑换明细</div>
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
                <el-table-column prop="NickName" label="用户昵称" width="100"></el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="Account" label="绑定手机号" width="100"></el-table-column>
                <el-table-column prop="Action" label="用户操作" width="100"></el-table-column>
                <el-table-column prop="Amount" label="消耗金额" width="100"></el-table-column>
                <el-table-column prop="Amount" label="获取金额" width="100"></el-table-column>
                <el-table-column prop="updatedat" label="时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.CreateDat | timestampToTime1}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="redchargeList(time[0],time[1])"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {redchargeCount} from "../../service/api/api";
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
                this.redchargeCount(time[0],time[1])
            },
            redchargeCount(start,end){
                this.loading=true
                redchargeCount(start,end,this.page,this.per).then(res=>{
                    console.log('usdt兑换明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.recharge
                        this.count=res.data.count
                    }
                })
            },
            playerCondition(){},
        }
    }
</script>

<style lang="scss" scoped>
    .usdt-exchange{
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
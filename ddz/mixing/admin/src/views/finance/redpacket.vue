<template>
    <div class="usdt-recharge">
        <div class="top">
            <div class="l">
                <div class="title">红包发放明细</div>
                <div class="time">
                    <Time @selectTime="onSelectTime"/>
                </div>
                <div class="dc">
                    <el-button type="primary" @click="dcClick">导出</el-button>
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
                        {{scope.row.CreateDat | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="NickName" label="用户昵称" width="120"></el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="Desc" label="发放原因" width="180"></el-table-column>
                <el-table-column label="发放类型" width="180">
                    <template slot-scope="scope">
                        {{scope.row.GrantType==1?'红包任务':scope.row.GrantType==2?'分享赚钱':'红包赛'}}
                    </template>
                </el-table-column>

                <el-table-column prop="RedPacket" label="红包金额"></el-table-column>
            </el-table>
            <el-pagination
                    @current-change="redchargeList(time[0],time[1],condition)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {redpacketList} from "../../service/api/api";
    import {Message} from 'element-ui'
    import Time from '../../components/time/Time'
    import {timestampToTime1} from "../../filter/filters";
    import {JsonToExcel} from "../../util/tools/JsonToExcel";

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
                this.redchargeList(time[0],time[1],this.condition)
            },
            redchargeList(start,end,condition){
                this.loading=true
                redpacketList(start,end,this.page,this.per,condition).then(res=>{
                    console.log('usdt充值明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.redpacketrecord
                        this.count=res.data.count
                    }
                })
            },
            playerCondition(){
                redpacketList(this.time[0],this.time[1],this.page,this.per,this.condition).then(res=>{
                    console.log('根据condition查询GACT',res)
                    if(res.errcode==2000){
                        this.list=res.data.redpacketrecord
                        this.count=res.data.count
                    }
                })
            },
            dcClick(){
                Message.success('导出中')
                this.loading=true
                redpacketList(this.time[0],this.time[1],1,999999,this.condition).then(res=>{
                    if(res.errcode==2000){
                        console.log('导出数据',res)
                        this.loading=false
                        var num = parseInt(res.data.count/10000)+1
                        for(var j=0;j<num;j++){
                            var list = [...res.data.redpacketrecord.slice(j*10000,(j+1)*10000-1)]
                            var list2 = []
                            for(let i in list){
                                list2.push({
                                    CreateDat:timestampToTime1(list[i].CreateDat),
                                    NickName:list[i].NickName,
                                    AccountId:list[i].AccountId,
                                    Desc:list[i].Desc,
                                    GrantType:list[i].GrantType==1?'红包任务':list[i].GrantType==2?'分享赚钱':'红包赛',
                                    RedPacket:list[i].RedPacket,
                                })
                            }
                            JsonToExcel(list2,`红包发放明细-(${j+1})--${this.time[0]}-${this.time[1]}`,'',
                                ["时间","用户昵称","用户ID","发放原因","发放类型","红包金额",])
                        }


                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .usdt-recharge{
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
                    margin-right: 10px;
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

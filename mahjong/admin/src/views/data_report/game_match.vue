<template>
    <div class="userList">
        <div class="top">
            <div class="l">
                <div class="title">游戏对局明细</div>
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
                <el-table-column prop="Desc" label="房间类型" width="180"></el-table-column>
                <el-table-column prop="RoomNumber" label="房间号" width="100"></el-table-column>
                <el-table-column prop="Nickname" label="用户昵称" width="180"></el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="Profit" label="资金变化" width="100"></el-table-column>
                <el-table-column prop="Amount" label="当前余额" width="100"></el-table-column>

                <el-table-column prop="createdat" label="开始时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.StartTimestamp | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="updatedat" label="结束时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.EndTimestamp | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="gameRecord(time[0],time[1],condition)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {gameRecord} from "../../service/api/api";
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
                this.gameRecord(time[0],time[1],this.condition)
            },
            gameRecord(start,end,condition){
                this.loading=true
                gameRecord(start,end,this.page,this.per,condition).then(res=>{
                    console.log('游戏对局明细列表',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.gamerecord
                        this.count=res.data.count
                    }
                })
            },
            handleClick(row){
                const {href}  = this.$router.resolve({
                    path:'/game_match_details',
                    query:{
                        data:JSON.stringify(row)
                    }
                })
                window.open(href, "_blank");

            },
            playerCondition(){
                gameRecord(this.time[0],this.time[1],this.page,this.per,this.condition).then(res=>{
                    console.log('查询condition游戏对局明细列表',res)
                    if(res.errcode==2000){
                        this.list=res.data.gamerecord
                        this.count=res.data.count
                    }
                })
            },
            dcClick(){
                Message.success('导出中')
                this.loading=true
                gameRecord(this.time[0],this.time[1],1,999999,this.condition).then(res=>{
                    if(res.errcode==2000){
                        console.log('导出数据',res)
                        this.loading=false
                        var num = parseInt(res.data.count/10000)+1
                        for(var j=0;j<num;j++){
                            var list = [...res.data.gamerecord.slice(j*10000,(j+1)*10000-1)]
                            var list2 = []
                            for(let i in list){
                                list2.push({
                                    Desc:list[i].Desc,
                                    RoomNumber:list[i].RoomNumber,
                                    Nickname:list[i].Nickname,
                                    AccountId:list[i].AccountId,
                                    Profit:list[i].Profit,
                                    Amount:list[i].Amount,
                                    StartTimestamp:timestampToTime1(list[i].StartTimestamp),
                                    EndTimestamp:timestampToTime1(list[i].EndTimestamp)
                                })
                            }
                            JsonToExcel(list2,`游戏对局明细-(${j+1})-${this.time[0]}-${this.time[1]}`,'',
                                ["房间类型","房间号","用户昵称","用户ID","资金变化","当前余额","开始时间","结束时间"])
                        }


                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .userList{
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

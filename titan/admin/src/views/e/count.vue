<template>
    <div class="count">
        <div class="top">
            <div class="l">
                <div class="t">赛事投注统计</div>
                <div class="item">
                    <el-select v-model="type" placeholder="请选择" @change="changeType">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.moneyCode"
                                :label="item.coinName"
                                :value="item.moneyCode">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <el-select v-model="name" placeholder="请筛选" @change="changeName">
                        <el-option
                                v-for="item in nameOptions"
                                :key="item.tournamentId"
                                :label="item.tournamentName"
                                :value="item.tournamentId">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="r">
                <el-input placeholder="请输入" prefix-icon="el-icon-search" v-model="searchTxt" @input="search"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" border style="width: 100%" height="620" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
                <el-table-column type="index" :index="getIndex" width="60"></el-table-column>

                <el-table-column property="info" label="赛事详情" width="300"></el-table-column>
                <el-table-column label="时间" width="200">
                    <template slot-scope="scope">
                        {{scope.row.matchTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <p :class="'state'+scope.row.state">{{scope.row.state | stateToName}}</p>
                    </template>
                </el-table-column>
                <el-table-column property="limitMoney" label="限制下注" width="100"></el-table-column>
                <el-table-column property="betMoney" label="当前下注"></el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" v-if="scope.row.islock==0" @click="lock(scope.row,'1')">锁定下注</el-button>
                        <el-button type="warning" size="small" v-if="scope.row.islock==1" @click="lock(scope.row,'0')">解除锁定</el-button>
                        <el-button type="primary" size="small" @click="goDetail(scope.row)">投注详情</el-button>
                        <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="pageChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="countNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {allCurrType,allLeagueName,matchDetail,matchLocak,deleteRepeat} from "../../service/hapi";
    import { Message,MessageBox } from 'element-ui';

    export default {
        data(){
            return{
                type:'',
                typeOptions:[],
                name:'',
                nameOptions:[],
                list:[],
                page:1,
                pageSize:10,
                searchTxt:'',
                loading:true,
                countNum:0,
            }
        },
        computed:{
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.allCurrType()
            this.allLeagueName()
        },
        mounted:function(){
            setTimeout(()=>{
                this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
            },1000)
        },
        methods:{
            allCurrType(){
                allCurrType().then(res=>{
                    console.log('typeList:',res)
                    if(res.code==0){
                        this.typeOptions=res.data
                        this.type=res.data[0].moneyCode

                    }
                })
            },
            allLeagueName(){
                allLeagueName().then(res=>{
                    console.log('nameList:',res)
                    if(res.code==0){
                        this.nameOptions=res.data
                        this.name=res.data[0].tournamentId
                    }
                })
            },
            matchDetail(currencyType,leagueId,page,pageSize,queryName){
                this.loading=true
                matchDetail(currencyType,leagueId,page,pageSize,queryName).then(res=>{
                    console.log('详情列表：',res)
                    if(res.code==0){
                        this.list=res.data.listData
                        this.countNum=res.data.countNum
                    }
                    this.loading=false
                })
            },
            matchLocak(matchId,state){
                matchLocak(matchId,state).then(res=>{
                    console.log('锁定/解除锁定',res)
                    if(res.code==0){
                        Message.success('操作成功')
                        this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            changeType(){
                this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
            },
            changeName(){
                this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
            },
            pageChange(val){this.matchDetail(this.type,this.name,val,this.pageSize,null)},
            lock(data,state){
                this.matchLocak(data.matchId,state)
            },
            search(){
                if(!!this.searchTxt){this.matchDetail(null,null,null,null,this.searchTxt)}else{
                    this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
                }

            },
            goDetail(row){
                let routeData = this.$router.resolve({
                    path:"/e_details",
                    query:{
                        matchId:row.matchId
                    }
                });
                window.open(routeData.href, '_blank');
            },
            del(row){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRepeat(row.matchId).then(res=>{
                        console.log('删除比赛',res)
                        if(res.code==='0'){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.matchDetail(this.type,this.name,this.page,this.pageSize,null)
                        }else{
                            Message({
                                message:res.message,
                                type: 'ereror',
                                duration:'1500',
                            })
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .count{
        width: 100%;
        box-sizing: border-box;
        padding:20px 20px;
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 20px;
            .l{
                display: flex;
                align-items: center;
                .item{
                    margin-right: 20px;
                    width: 150px;
                }
                .t{
                    margin-right: 20px;
                    color: #455A64;
                    font-size: 21px;
                }
            }
        }
        .state0{color: #EDAD00;padding: 0;margin: 0;}
        .state1{color: #2A9F93;padding: 0;margin: 0;}
        .state2{color: #FF4851;padding: 0;margin: 0;}
    }
</style>
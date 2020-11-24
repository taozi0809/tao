<template>
    <div class="detail">
        <el-table :data="list" border style="width: 100%" height="600" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
            <el-table-column type="index" :index="getIndex" width="50"></el-table-column>

            <el-table-column property="userId" label="用户ID" width="80"></el-table-column>

            <el-table-column label="交易时间" width="150">
                <template slot-scope="scope">
                    {{scope.row.tradeTime | timestampToTime1}}
                </template>
            </el-table-column>
            <el-table-column property="betMoney" label="竞猜金额" width="120"></el-table-column>
            <el-table-column property="income" label="盈亏情况" width="120"></el-table-column>
            <el-table-column label="竞猜类型" width="120">
                <template slot-scope="scope">
                    {{scope.row.betType | cToName}}
                </template>
            </el-table-column>
            <el-table-column property="content" label="竞猜明细" width="120"></el-table-column>
            <el-table-column property="odd" label="赔率" width="100"></el-table-column>
            <el-table-column property="orderId" label="订单号" width="200"></el-table-column>
            <el-table-column label="交易状态" width="100">
                <template slot-scope="scope">
                    {{scope.row.state==1?'待开奖':scope.row.state==3?'未中奖':'已派奖'}}
                </template>
            </el-table-column>
            <el-table-column property="ms" label="串关详情">
                <template slot-scope="scope">
                    {{scope.row.ms==0?'- - -':'串关详情'}}
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
        <div class="total">
            <div class="item">投注比例：
                <span>{{data.resultRate}} </span>
                <span>{{data.scoreRate}} </span>
                <span>{{data.totalGoalRate}}</span>
                <span>{{data.msRate}} </span>
                <span>{{data.ahRate}} </span>
                <span>{{data.ht2ftRate}} </span>
            </div>
            <div class="item">总计：
                <span>{{data.count}} </span>
            </div>
        </div>

    </div>
</template>

<script>
    import {betDetailId} from "../../service/hapi";

    export default {
        data(){
            return{
                matchId:'',
                list:[],
                page:1,
                pageSize:10,
                countNum:0,
                loading:true,
                data:{}
            }
        },
        computed:{
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.matchId=this.$route.query.matchId
            this.betDetailId(this.matchId,this.page,this.pageSize)
        },
        methods:{
            betDetailId(matchId,page,pageSize){
                this.loading=true
                betDetailId(matchId,page,pageSize).then(res=>{
                    console.log('详情',res)
                    if(res.code==0){
                        this.list=res.data.listData
                        this.data=res.data
                        this.countNum=res.data.count
                    }
                    this.loading=false
                })
            },
            pageChange(val){
                this.betDetailId(this.matchId,val,this.pageSize)
            },
        }
    }
</script>


<style lang="scss" scoped>
    .detail{
        width: 100%;
        box-sizing: border-box;
        padding:20px 20px;
    }
    .total{
        margin-top: 20px;
        .item{
            margin-bottom: 15px;
            color: #455A64;
        }
    }
</style>


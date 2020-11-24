<template>
    <div class="billflow">
        <div class="top">
            <div class="l">
                <div class="t">流水</div>
                <div class="item">
                    <el-select v-model="type" placeholder="请选择" @change="changeType">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="r">
            </div>
        </div>
        <div class="list">
            <el-table :data="list" border style="width: 100%" height="700" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
                <el-table-column type="index" :index="getIndex" width="60"></el-table-column>

                <el-table-column property="matchName" label="赛事" width="300"></el-table-column>

                <el-table-column property="orderNo" label="订单号" width="200"></el-table-column>
                <el-table-column label="交易时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.createTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column property="coinName" label="货币类型" width="80"></el-table-column>

                <el-table-column property="profit" label="返利" width="150"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status==0?'已结算':'未结算'}}
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
    import {profitList} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                typeOptions:[{
                    value:0,
                    label:'全部'
                },{
                    value:1,
                    label:'TITAN'
                },{
                    value:2,
                    label:'USDT'
                },{
                    value:3,
                    label:'ETH'
                }],
                type:0,
                list:[],
                page:1,
                pageSize:10,
                loading:false,
                countNum:0,
            }
        },
        computed:{
            ...mapState(['token']),
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.profitList(this.page)
        },
        methods:{
            changeType(){},
            pageChange(){
                this.profitList(this.page)
            },
            profitList(page){
                profitList(this.token,null,page,this.pageSize).then(res=>{
                    console.log('代理的返利流水记录',res)
                    if(res.code==0){
                        this.list=res.data.agencyProfits
                        this.countNum=res.data.total
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .billflow{
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
    }
</style>
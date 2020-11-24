<template>
    <div class="usdt-recharge">
        <div class="top">
            <div class="l">
                <div class="title">充值渠道明细</div>
                <div class="time">
                    <el-select v-model="condition" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>

        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
<!--                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>-->
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="Channel" label="渠道号">
                    <template slot-scope="scope">
                        {{scope.row.Channel==0?'官网':scope.row.Channel==1?'搜狗':'IOS'}}
                    </template>
                </el-table-column>
                <el-table-column prop="UserNum" label="用户数量"></el-table-column>
                <el-table-column prop="PaySum" label="充值总数"></el-table-column>
            </el-table>
<!--            <el-pagination-->
<!--                    @current-change="redchargeList(time[0],time[1],condition)"-->
<!--                    :current-page.sync="page"-->
<!--                    :page-size="per"-->
<!--                    layout="total, prev, pager, next, jumper"-->
<!--                    :total="count">-->
<!--            </el-pagination>-->
        </div>
    </div>
</template>

<script>
    import {channelRecord} from "../../service/api/api";
    import {Message} from 'element-ui'

    export default {
        data(){
            return{
                condition:'',
                list:[],
                count:0,
                loading:true,
                options:[
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value:0,
                        label:'官网'
                    },
                    {
                        value:1,
                        label:'搜狗'
                    },
                    {
                        value:2,
                        label:'IOS'
                    },
                ],
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.channelRecordList(this.condition)
        },
        methods:{
            channelRecordList(condition){
                this.loading=true
                channelRecord(condition).then(res=>{
                    console.log('充值渠道明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.ChannelRecords
                        // this.count=res.data.count
                    }
                })
            },
            change(){
                this.channelRecordList(this.condition)
            }
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

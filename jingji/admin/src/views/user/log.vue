<template>
    <div class="log">
        <div class="header">
            <div class="l">
                <div class="m m1">
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
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            @change="change">
                    </el-date-picker>
                </div>

            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column label="操作时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="操作类型" width="120">
                    <template slot-scope="scope">
                        {{scope.row.OptType | OptTypeToS}}
                    </template>
                </el-table-column>

                <el-table-column prop="Way" label="操作内容" width="250"></el-table-column>
                <el-table-column prop="Item" label="操作道具" width="150"></el-table-column>

                <el-table-column prop="ShowBefore" label="操作前数量" width="120"></el-table-column>
                <el-table-column prop="ShowAmount" label="操作数量" width="120"></el-table-column>
                <el-table-column prop="ShowAfter" label="操作后数量"></el-table-column>


                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="$router.push({name:'user_details',params:{matchid:scope.row.MatchID}})" v-if="!!scope.row.MatchID">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getUserOptLog(parseInt($route.params.accountid))"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {getUserOptLog} from "../../service/api/api";
    import {getBeforeToday,getToday} from "../../util/tools/startEndTime";

    export default {
        data(){
            return{
                options: [
                    {
                        value: "",
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '常规操作'
                    },
                    {
                        value: 2,
                        label: '赛事操作'
                    },
                    {
                        value: 3,
                        label: '充值操作'
                    },
                    {
                        value: 4,
                        label: '碎片兑换操作'
                    },
                    {
                        value: 5,
                        label: '签到操作'
                    },
                    {
                        value: 6,
                        label: '邮件操作'
                    },
                    {
                        value: 7,
                        label: '活动操作'
                    },
                    {
                        value: 8,
                        label: '平台操作'
                    },




                ],
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
                status:"",
                time:[getBeforeToday(),getToday()],
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
            this.getUserOptLog(parseInt(this.$route.params.accountid))
        },
        methods:{
            change(){
                this.getUserOptLog(parseInt(this.$route.params.accountid))
            },
            getUserOptLog(AccountID){
                this.loading=true
                getUserOptLog(AccountID,this.time[0],this.time[1],this.page,this.per,this.status>0?this.status:null).then(res=>{
                    console.log("操作日志列表",res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>

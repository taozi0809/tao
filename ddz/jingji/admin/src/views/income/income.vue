<template>
    <div class="income">
        <div class="header">
            <div class="l">
                <el-input v-model="Name" placeholder="请输入昵称" prefix-icon="el-icon-search" @input="getProfitList()"></el-input>
            </div>
            <div class="l">
                <el-date-picker
                        @change="change"
                        v-model="time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="Name" label="昵称" width="120"></el-table-column>
                <el-table-column prop="AccountID" label="ID" width="120"></el-table-column>
                <el-table-column prop="ProfitType" label="类型" width="120"></el-table-column>
                <el-table-column prop="Way" label="收益来源" width="150"></el-table-column>
                <el-table-column label="收益比例" width="120">
                    <template slot-scope="scope">
                        {{scope.row.ProfitRate}}%
                    </template>
                </el-table-column>
                <el-table-column label="收益额度" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Amount>=0?scope.row.Amount/100:scope.row.Amount}}元
                    </template>
                </el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime | timestampToTime1}}
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    @current-change="getProfitList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getProfitList} from "../../service/api/api";
    import {formateDate} from "../../util/tools/date";

    export default {
        data(){
            return{
                Name:"",
                time:"",
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
                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            let end = new Date();
            let start = new Date();
            start=start.getTime() - 3600 * 1000 * 24 * 30
            end=end.getTime()
            this.time=[start, end]
            this.getProfitList()
        },
        methods:{
            change(){
                this.getProfitList()
            },
            getProfitList(){
                this.loading=true
                getProfitList(this.Name,formateDate(new Date(this.time[0]),"yyyy-MM-dd"),formateDate(new Date(this.time[1]),"yyyy-MM-dd"),this.page,this.per).then(res=>{
                    console.log("收益列表",res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
        display: flex;
        align-content: center;
        .l{
            margin-right: 20px;

            .l1{
                width: 250px;
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        width: 100%;
        padding: 0 10px;
        margin-top: 10px;
        .list{
            height: 750px;
        }
    }
</style>

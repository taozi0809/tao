<template>
    <div class="bonus">
        <div class="header">
            <div class="l">
                <div class="m">
                    <el-date-picker
                            v-model="time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            @change="change">
                    </el-date-picker>
                </div>
            </div>
            <div class="s">
                <el-input placeholder="用户ID/昵称" prefix-icon="el-icon-search" v-model="condition" @input="change"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column prop="createdat" label="日期" width="180">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Accountid" label="用户ID" width="120"></el-table-column>
                <el-table-column prop="Realname" label="实名昵称" width="150"></el-table-column>
                <el-table-column prop="MatchType" label="赛事类型" width="120"></el-table-column>
                <el-table-column prop="MatchName" label="赛事昵称" width="150"></el-table-column>
                <el-table-column prop="AwardContent" label="奖励" width="250"></el-table-column>
                <el-table-column prop="Desc" label="备注说明"></el-table-column>
            </el-table>
            <el-pagination
                    @current-change="awardRecord()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import {awardRecord, flowdataHistory} from "../../service/api/api";
    import {Message} from "element-ui";
    export default {
        data(){
            return{
                time:"",
                condition:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
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
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            var t1 = new Date()
            var t2 = new Date()
            this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
            this.awardRecord()
        },
        methods:{
            change(){
               this.awardRecord()
            },
            copy(e){
                this.$copyText(e.match_id).then(res=>{
                    Message.success("复制成功")
                },err=>{
                    Message.error("复制失败")
                })
            },
            awardRecord(){
                this.loading=true
                var condition={}

                if(parseInt(this.condition).toString().length==this.condition.length){
                    condition = {
                        accountid:parseInt(this.condition),
                    }
                }else{
                    if(!!this.condition){
                        condition = {
                            realname:this.condition,
                        }
                    }else{
                        condition = {}
                    }
                }
                awardRecord(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,this.per,condition).then(res=>{
                    console.log("比赛获得",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.match_award_records
                        this.count=res.resp.total
                    }
                })
            },




        },
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/header";
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .dialog-con{
        .desc{
            margin-top: 10px;
            .d-t{
                font-size: 16px;
                font-weight: bold;
                height: 40px;
                line-height: 40px;
                font-family: 微软雅黑;
            }
            .b-t{
                color: #333;
                font-size: 14px;
            }
        }
    }
    .dialog-footer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        margin-top:20px;
    }
</style>

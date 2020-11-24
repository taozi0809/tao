
<template>
    <div class="feedback">
        <Breadcrumb :breadcrumb="breadcrumb"/>

        <div class="head">
            <div class="block">
                <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" value-format="timestamp" :picker-options="pickerOptions2" @blur="handleChange"></el-date-picker>
            </div>
            <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出</el-button>
        </div>

        <div class="feedback-list">
            <el-table :data="tableData" style="width: 100%" id="rebateSetTable" height="600px">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                <el-table-column prop="userName" label="用户" width="200"></el-table-column>
                <el-table-column label="语言" width="60">
                    <template slot-scope="scope">
                        <p>{{scope.row.lang,languageCtoModelList| langToName}}</p>
                    </template>
                </el-table-column>

                <el-table-column prop="contry" label="国家" width="100"></el-table-column>
                <el-table-column prop="phoneNumber" label="电话号码" width="180"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column label="时间" width="150">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
            </el-table>
            <el-pagination  background layout="total,prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                            :current-page.sync="currentPage" @current-change="handleChangePage"></el-pagination>

        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {userFeedback,languageSelect,feedbackExport} from "../../service/api";
    import { Message,MessageBox,Loading} from 'element-ui';

    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/feedback',
                        name:'用户反馈'
                    },
                ],
                tableData:[],
                allTableData:[],
                countNum:0,
                currentPage:1,
                pickerOptions2: {
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
                value7: [new Date(this.startTime()[0],this.startTime()[1],this.startTime()[2]),new Date(this.endTime()[0],this.endTime()[1],this.endTime()[2])],
                languageCtoModelList:{},
                pageSize:50,
                startDate:'',
                endDate:'',
            }
        },
        computed:{
            getIndex(){
                return (this.currentPage - 1) * this.pageSize +1
            },
        },
        created:function(){
            languageSelect().then(res=>{
                if(res.code==='0'){
                    console.log('获取语言版本信息：',res)
                    this.userFeedback(null,null,this.currentPage)
                    for(let i in res.data.languageCtoModelList){
                        this.languageCtoModelList[res.data.languageCtoModelList[i].lang] = res.data.languageCtoModelList[i].name
                    }
                }
            })
        },
        methods:{
            userFeedback(startTime,endTime,pageNum){
                userFeedback(startTime,endTime,pageNum,this.pageSize).then(res=>{
                    console.log('用户反馈',res)
                    if(res.code==='0'){
                        this.tableData=[]
                        this.tableData = res.data.userFeedBackList
                        this.countNum = res.data.totalNum
                    }
                })
            },
            handleChangePage(){
                this.tableData = []
                this.userFeedback(null,null,this.currentPage)
            },
            exportExcel () {
                if(!!this.startDate&&!!this.endDate){
                    var loadingInstance = Loading.service({text:'加载中',background:'rgba(0,0,0,.7)'});
                    feedbackExport(this.startDate,this.endDate).then(res=>{
                        console.log('下载excel:',res)
                        if(res.code==0){
                            window.location.href=res.data
                            Message({message:'下载成功', type: 'success', duration:'1500',})
                        }else{
                            Message({message:res.message, type: 'error', duration:'1500',})
                        }
                        loadingInstance.close();
                    })
                }
            },
            handleChange(){
                if(parseInt(this.value7[0])>0&&parseInt(this.value7[1])>0){
                    this.startDate= `${new Date(this.value7[0]).getFullYear()}-${new Date(this.value7[0]).getMonth()+1}-${new Date(this.value7[0]).getDate()}`
                    this.endDate=`${new Date(this.value7[1]).getFullYear()}-${new Date(this.value7[1]).getMonth()+1}-${new Date(this.value7[1]).getDate()}`
                }
            },
            startTime(){
                var date=(new Date())
                date.setMonth(date.getMonth()-1)
                var arr=[]
                arr[0]=date.getFullYear()
                arr[1]=date.getMonth()
                arr[2]=date.getDate()
                return arr
            },
            endTime(){
                var date=new Date()
                var arr=[]
                arr[0]=date.getFullYear()
                arr[1]=date.getMonth()
                arr[2]=date.getDate()
                return arr
            },
        }
    }
</script>

<style lang="scss" scoped>
    .feedback{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .head{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding:0 10px;
        display: flex;
        align-items: center;

    }
    .feedback-list{
        padding:0 10px;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        top:100px;
    }

</style>
<template>
    <div class="promotionManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="add-search">
            <div class="add">
                <div class="input">
                    <el-input v-model="codeValue" placeholder="请输入条数"></el-input>
                </div>
                <div class="input">
                    <el-input v-model="freeDays" placeholder="请输入天数"></el-input>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="add">生成免费码</el-button>
                </div>
                <div class="col date">
                    <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期" value-format="timestamp" :picker-options="pickerOptions2" @blur="handleChange"></el-date-picker>
                    <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出</el-button>
                </div>
            </div>
            <div class="status">
                <el-switch
                        v-model="status"
                        active-text="使用"
                        inactive-text="未使用"
                @change="changeStatus">
                </el-switch>
            </div>
        </div>

        <div class="list">
            <el-table :data="freeCodeCtoModelList" style="width: 100%" height="600" id="rebateSetTableUser">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                <el-table-column prop="code" label="免费码" width="100"></el-table-column>
                <el-table-column prop="freeDays" label="免费天数" width="80"></el-table-column>
                <el-table-column label="创建时间" width="200">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="使用时间" width="200">
                    <template slot-scope="scope">
                        <p>{{scope.row.useTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="canal" label="来源" width="80"></el-table-column>
                <el-table-column prop="email" label="使用者邮箱" width="160"></el-table-column>
                <el-table-column label="状态" width="160">
                    <template slot-scope="scope">
                        <p>{{scope.row.status=='0'?'使用':'未使用'}}</p>
                    </template>
                </el-table-column>


            </el-table>
            <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                            :current-page.sync="pageNum" @current-change="changePage"></el-pagination>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,Loading} from 'element-ui';
    import {freeCodeAddFactory,freeCodeList,freeCodeExport} from "../../service/api";


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
                        path:'/promotionManage',
                        name:'管理员管理'
                    },
                    {
                        path:'/freeManage',
                        name:'免费码管理'
                    },
                ],
                codeValue:'',
                freeDays:'',
                pageNum:1,
                pageSize:50,
                freeCodeCtoModelList:[],
                countNum:0,
                status:false,
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
                value7:[],
                startDate:'',
                endDate:'',
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.freeCodeList(this.pageNum,this.pageSize,null,null,this.status)
        },
        methods:{
            add(){
                if(!!this.codeValue&&!!this.freeDays){
                    freeCodeAddFactory(this.codeValue,this.freeDays).then(res=>{
                        console.log('添加免费码充值码：',res)
                        if(res.code==0){
                            this.freeCodeList(this.pageNum,this.pageSize,null,null,this.status)
                            this.codeValue=''
                            this.freeDays=''
                            Message({
                                message:'添加成功',
                                type: 'success',
                                duration:'1500',
                            })
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                    })
                }
            },
            freeCodeList(pageNum,pageSize,startDate,endDate,status){
                status=status?0:1
                freeCodeList(pageNum,pageSize,startDate,endDate,status).then(res=>{
                    console.log('查询免费码列表:',res)
                    if(res.code==0){
                        this.freeCodeCtoModelList=res.data.freeCodeCtoModelList
                        this.countNum=res.data.totalNum
                    }
                })
            },
            changePage(pageNum){
                this.freeCodeList(pageNum,this.pageSize,null,null,this.status)
            },
            changeStatus(){
                this.freeCodeList(this.pageNum,this.pageSize,null,null,this.status)
            },
            exportExcel () {
                if(!!this.startDate&&!!this.endDate){
                    var loadingInstance = Loading.service({text:'加载中',background:'rgba(0,0,0,.7)'});
                    freeCodeExport(this.startDate,this.endDate).then(res=>{
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
<style scoped lang="scss">
    .add-search{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .add{
            display: flex;
            align-items: center;
            .input{
                margin-right: 20px;
                width: 200px;
            }
            .btn{
                margin-right: 20px;
            }
        }
        .search{
            width: 300px;
        }
    }
</style>
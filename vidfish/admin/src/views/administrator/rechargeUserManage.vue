<template>
    <div class="promotionManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="list">
            <el-table :data="rechargeUseCtoModelList" style="width: 100%" height="600">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                <!--<el-table-column prop="userId" label="userId" width="180"></el-table-column>-->
                <el-table-column prop="email" label="使用者email" width="200"></el-table-column>
                <el-table-column prop="code" label="充值码" width="180"></el-table-column>
                <el-table-column prop="freeDays" label="免费天数" width="80"></el-table-column>
                <el-table-column prop="canal" label="来源" width="100"></el-table-column>
                <el-table-column label="是否激活" width="80">
                    <template slot-scope="scope">
                        <p>{{scope.row.isActive==0?'激活':'未激活'}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template slot-scope="scope">
                        <p>{{scope.row.creatTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="激活时间" width="180">
                    <template slot-scope="scope">
                        <p>{{scope.row.activeTime | timestampToTime}}</p>
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
    import {rechargeUseList} from "../../service/api";

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
                        path:'/rechargeManage',
                        name:'充值码使用管理'
                    },
                ],
                pageNum:1,
                pageSize:50,
                rechargeUseCtoModelList:[],
                countNum:0,
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.rechargeUseList('','',this.pageNum,this.pageSize)
        },
        methods:{

            rechargeUseList(code,email,pageNum,pageSize){
                rechargeUseList(code,email,pageNum,pageSize).then(res=>{
                    console.log('查询充值码使用列表:',res)
                    if(res.code==0){
                        this.rechargeUseCtoModelList=res.data.rechargeUseCtoModelList
                        this.countNum=res.data.totalNum
                    }
                })
            },
            changePage(pageNum){
                this.rechargeUseList('','',pageNum,this.pageSize)
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
            width: 500px;
            display: flex;
            align-items: center;
            .input{
                margin-right: 20px;
                width: 200px;
            }
        }
        .search{
            width: 300px;
        }
    }
</style>
<template>
    <div class="promotionManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="add-search">
            <div class="add">
                <div class="input">
                    <el-input v-model="codeValue" placeholder="请输入充值码"></el-input>
                </div>
                <div class="input">
                    <el-input v-model="freeDays" placeholder="请输入天数"></el-input>
                </div>
                <el-button type="primary" @click="add">添加充值码</el-button>
            </div>
            <div class="search">
                <el-input v-model="searchValue" placeholder="请输入充值码" prefix-icon="el-icon-search" @input="changeSearchValue"></el-input>
           </div>
        </div>

        <div class="list">
            <el-table :data="rechargeCodeCtoModelList" style="width: 100%" height="600">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                <el-table-column label="充值码" width="180">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.code" placeholder="请输入充值码"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="免费天数" width="180">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.freeDays" placeholder="请输入免费天数"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="200">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="200">
                    <template slot-scope="scope">
                        <p>{{scope.row.updateTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeCode(scope.row)">修改</el-button>
                        <!--<el-button size="mini" type="danger" @click="deleteCode(scope.row)">删除</el-button>-->
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
    import { Message} from 'element-ui';
    import {rechargeSaveUpdate,rechargeList} from "../../service/api";

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
                        name:'充值码管理'
                    },
                ],
                codeValue:'',
                freeDays:'',
                searchValue:'',
                pageNum:1,
                pageSize:50,
                rechargeCodeCtoModelList:[],
                countNum:0,

            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.rechargeList('',this.pageNum,this.pageSize)
        },
        methods:{
            add(){
                if(!!this.codeValue&&!!this.freeDays){
                    rechargeSaveUpdate(this.codeValue,this.freeDays,null).then(res=>{
                        console.log('添加/更新充值码：',res)
                        if(res.code==0){
                            this.rechargeList('',this.pageNum,this.pageSize)
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
            rechargeList(code,pageNum,pageSize){
                rechargeList(code,pageNum,pageSize).then(res=>{
                    console.log('查询充值码列表:',res)
                    if(res.code==0){
                        this.rechargeCodeCtoModelList=res.data.rechargeCodeCtoModelList
                        this.countNum=res.data.totalNum
                    }
                })
            },
            changePage(pageNum){
                this.rechargeList('',pageNum,this.pageSize)
            },
            changeSearchValue(){
                this.rechargeList(this.searchValue,this.pageNum,this.pageSize)
            },
            changeCode(item){
                if(!!item.code&&!!item.freeDays){
                    rechargeSaveUpdate(item.code,item.freeDays,item.id).then(res=>{
                        console.log('添加/更新充值码：',res)
                        if(res.code==0){
                            this.rechargeList('',this.pageNum,this.pageSize)
                            Message({
                                message:'修改成功',
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
            deleteCode(item){

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
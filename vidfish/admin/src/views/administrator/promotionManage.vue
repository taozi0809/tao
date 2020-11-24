<template>
    <div class="promotionManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="head">
            <el-row :gutter="20">
                <el-col :span="3">
                   <el-button type="primary" @click="promotionCodeCreate('0')">新增月卡</el-button>
                </el-col>
                <el-col :span="15">
                    <el-button type="primary" @click="promotionCodeCreate('1')">新增年卡</el-button>
                </el-col>

                <el-col :span="6">
                    <el-input v-model="inputText" placeholder="请输入" clearable @input="handleSearch">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="form-box">
            <el-table :data="promotionCodeCtoModelList" style="width: 100%" height="600" @filter-change="handleFilterChange">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>
                <el-table-column prop="promotionCode" label="促销码" min-width="60"></el-table-column>
                <el-table-column prop="account" label="使用者" min-width="100"></el-table-column>

                <el-table-column label="是否使用" min-width="60">
                    <template slot-scope="scope">
                        <p>{{scope.row.isEffective | isPromotionY}}</p>
                    </template>
                </el-table-column>
                <!--<el-table-column label="月卡/年卡" min-width="60" column-key="promotionType" :filters="[{text:'月卡',value:'0'},{text:'年卡',value:'1'}]">-->
                    <!--<template slot-scope="scope">-->
                        <!--<p>{{scope.row.promotionType | cardType}}</p>-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <el-table-column prop="promotionType" label="月卡/年卡" min-width="60" column-key="promotionType" :filters="[{text:'月卡',value:'0'},{text:'年卡',value:'1'}]"></el-table-column>


                <el-table-column label="创建时间" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="过期时间" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.deadline | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="使用时间" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.useTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination  background layout="prev, pager, next, jumper" :total="countNum" class="zdy-pagination" :current-page.sync="currentPage" @current-change="handleChangePage"></el-pagination>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message} from 'element-ui';
    import {promotionCodeList,promotionCodeCreate} from "../../service/api";

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
                        path:'/promotionManage',
                        name:'促销码管理'
                    },
                ],
                inputText:'',
                promotionCodeCtoModelList:[],
                currentPage:1,
                countNum:0,
                isPick:{
                    is:false,
                    type:null
                }
            }
        },
        computed:{
            getIndex(){
                return (this.currentPage - 1) * 10 +1
            },
        },
        created:function(){
            this.promotionCodeList()
        },
        methods:{
            handleSearch(){
                this.promotionCodeList('','','',this.inputText)
            },
            promotionCodeCreate(promotionType){
                promotionCodeCreate(promotionType).then(res=>{
                    console.log('新增月卡/年卡：',res)
                    if(res.code=='0'){
                        Message({
                            message:'新增成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.promotionCodeList()
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            promotionCodeList(promotionType,flag,isEffective,promotionCode,pageNum,pageSize){
                promotionCodeList(promotionType,flag,isEffective,promotionCode,pageNum,pageSize).then(res=>{
                    console.log('查询促销码列表',res)
                    if(res.code=='0'){

                        for(let i in res.data.promotionCodeCtoModelList){
                            if(res.data.promotionCodeCtoModelList[i].promotionType==0){
                                res.data.promotionCodeCtoModelList[i].promotionType='月卡'
                            }else{
                                res.data.promotionCodeCtoModelList[i].promotionType='年卡'
                            }
                        }
                        this.promotionCodeCtoModelList = res.data.promotionCodeCtoModelList
                        this.countNum = res.data.totalNum
                    }
                })
            },
            handleChangePage(){
                this.promotionCodeCtoModelList = []
                if(this.isPick.is){
                    this.promotionCodeList(this.isPick.type,'','','',this.currentPage,'10')
                }else{
                    this.promotionCodeList('','','','',this.currentPage,'10')
                }

            },
            handleFilterChange(filters) {
                if(filters.promotionType!=undefined&&filters.promotionType!=null){
                  if(filters.promotionType.length==1){
                        if(filters.promotionType[0]==0){
                            this.promotionCodeList('0','','','')
                            this.isPick = {
                                is:true,
                                type:0
                            }
                        }else{
                            this.promotionCodeList('1','','','')
                            this.isPick = {
                                is:true,
                                type:1
                            }
                        }
                  }else{
                      this.promotionCodeList()
                      this.currentPage = 1
                      this.isPick = {
                          is:false,
                          type:null
                      }
                  }
                }
            }
        },

    }
</script>
<style scoped lang="scss">
    .promotionManage{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .head{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .form-box{
        padding:0 10px;
    }
</style>
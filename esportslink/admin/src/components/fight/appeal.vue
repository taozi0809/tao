<template>
    <div class="list">
<!--        <el-table :data="list" border style="width: 100%;" v-loading="loading"-->
<!--                  element-loading-text="加载中" element-loading-spinner="el-icon-loading"-->
<!--                  element-loading-background="rgba(255, 255, 255, 0.6)" height="700">-->
<!--            <el-table-column type="index" :index="getIndex" width="60"></el-table-column>-->
<!--        </el-table>-->
<!--        <el-pagination-->
<!--                @current-change="matchList(type,pageNum,pageSize)"-->
<!--                :current-page.sync="pageNum"-->
<!--                :page-size="pageSize"-->
<!--                layout="prev, pager, next, jumper"-->
<!--                :total="totalNum">-->
<!--        </el-pagination>-->
    </div>
</template>

<script>
    import {appealList} from "../../service/api";

    export default{
        data(){
            return{
                loading:true,
                totalNum:0,
                pageNum:1,
                pageSize:10,
                list:[],
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created(){
            this.appealList(null,this.pageNum,this.pageSize)
        },
        methods:{
            appealList(userId,pageNum,pageSize){
                this.loading=true
                appealList(userId,pageNum,pageSize).then(res=>{
                    console.log('用户申诉列表',res)
                    this.loading=false
                    if(res.code==0){
                        // this.list=res.data.userAppealCtoModelList
                        // this.totalNum=res.data.totalNum

                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        min-width: 1000px;
    }
</style>
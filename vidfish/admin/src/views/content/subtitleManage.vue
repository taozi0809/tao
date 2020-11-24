<template>
    <div class="subtitleManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="actor-head">
            <el-button type="primary" class="add" @click="handleAddSubtitle">新增</el-button>
            <div class="box">
                <el-input v-model="subtitleName" placeholder="请输入关键词搜索" clearable @input="handleChange">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
        <div class="actor-list">
            <el-table :data="subtitleList" style="width: 100%" height="96%" id="table">
                <el-table-column  type="index" width="50"></el-table-column>
                <el-table-column prop="lang" label="语言环境" width="100"></el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleActorDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>
<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {subtitleList} from "../../service/api";

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
                        path:'/subtitleManage',
                        name:'内容管理'
                    },
                    {
                        path:'/subtitleManage',
                        name:'字幕管理'
                    },
                ],
                subtitleName:'',
                subtitleList:[],

            }
        },
        created:function(){
            subtitleList(null,null).then(res=>{
                console.log('字幕列表',res)
                if(res.code==='0'){

                }
            })
        },
        methods:{
            handleAddSubtitle(){},
            handleChange(){}
        }
    }
</script>


<style lang="scss" scoped>
    .actor-head{
        width: 100%;
        height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .actor-list{
        width: 100%;
        position: absolute;
        top:100px;
        bottom: 0;
        left:0;
        box-sizing: border-box;
        padding:0 10px;
    }

</style>
<style lang="scss">

</style>
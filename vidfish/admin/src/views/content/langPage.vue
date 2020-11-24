<template>
    <div class="langPage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="actor-list">
            <el-table :data="langList" style="width: 100%" height="96%" id="table">
                <el-table-column label="语言缩写" width="100">
                   <template slot-scope="scope">
                       <el-input type="text" v-model="scope.row.lang"></el-input>
                   </template>
                </el-table-column>
                <el-table-column label="语言中文名称">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="APP展示语言">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.languageType"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="!scope.row.hasOwnProperty('id')" type="primary" @click="languageInsert(scope.row.lang,scope.row.name,scope.row.languageType)">新增</el-button>
                        <el-button size="mini" v-if="scope.row.hasOwnProperty('id')" type="primary" @click="languageUpdate(scope.row.id,scope.row.lang,scope.row.name,scope.row.languageType)">修改</el-button>
                        <el-button size="mini" v-if="scope.row.hasOwnProperty('id')" type="danger" @click="languageDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {languageSelect,languageInsert,languageUpdate,languageDelete} from "../../service/api";
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,MessageBox} from 'element-ui';
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
                        path:'/actorManage',
                        name:'内容管理'
                    },
                    {
                        path:'/langPage',
                        name:'语言管理'
                    },
                ],
                langList:[],
            }
        },
        created:function(){
            this.languageSelect()
            // this.languageInsert('ZH','中文')
            // this.languageDelete('5')
            // this.languageUpdate('6','aaa','111')
        },
        methods:{
            languageSelect(){
                languageSelect().then(res=>{
                    console.log('获取语言列表：',res)
                    if(res.code==='0'){
                        this.langList = res.data.languageCtoModelList

                        let arr = [{
                            lang:'',
                            name:'',
                            languageType:''
                        }]
                        this.langList = [...arr,...this.langList]
                        // console.log(this.langList)

                    }
                })
            },
            languageInsert(lang,name,languageType){
                languageInsert(lang,name,languageType).then(res=>{
                    console.log('新增语言：',res)
                    if(res.code==='0'){
                        this.languageSelect()
                    }
                })
            },
            languageUpdate(id,lang,name,languageType){
                languageUpdate(id,lang,name,languageType).then(res=>{
                    console.log('修改语言：',res)
                    if(res.code==='0'){
                        this.languageSelect()
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
            },
            languageDelete(id){
                languageDelete(id).then(res=>{
                    console.log('删除语言：',res)
                    if(res.code==='0'){
                        this.languageSelect()
                        Message({
                            message:'删除成功',
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
        }

    }
</script>

<style lang="scss" scoped>
    .actor-list{
        width: 100%;
        position: absolute;
        top:60px;
        bottom: 100px;
        left:0;
        box-sizing: border-box;
        padding:0 10px;
    }
</style>
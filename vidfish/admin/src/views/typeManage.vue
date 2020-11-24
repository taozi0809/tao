<template>
    <div class="typeManage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="add">
            <div class="box">
                <div class="item">
                    <el-select v-model="lang" placeholder="请选择语言" @change="change">
                        <el-option
                                v-for="item in languageCtoModelList"
                                :key="item.lang"
                                :label="item.name"
                                :value="item.lang">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <el-input v-model="name" placeholder="请输入类型名"></el-input>
                </div>
                <div class="item">
                    <!--<el-select v-model="type" placeholder="请选择类型" @change="selectGet">-->
                    <el-select v-model="type" placeholder="请选择类型">
                        <el-option
                                v-for="item in videoGenreCtoModelList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <el-button type="primary" @click="add">新增</el-button>
                </div>
            </div>
        </div>

        <div class="list">
            <el-table :data="list" style="width: 100%" height="600">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="lang" label="语言" width="100"></el-table-column>
                <el-table-column prop="name" label="类型" width="100"></el-table-column>
                <el-table-column prop="type" label="type" width="150"></el-table-column>

                <el-table-column label="创建时间" width="150">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="150">
                    <template slot-scope="scope">
                        <p>{{scope.row.updateTime | timestampToTime}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteGenre(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import {genreList,genreAdd,genreDelete} from "../service/api";
    import {getSessionStore} from "../storage";
    import { Message,MessageBox} from 'element-ui';

    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {path:'/index', name:'首页'},
                    {path:'/typeManage', name:'类型管理'},
                ],
                list:[],
                videoGenreCtoModelList:[],
                lang:'',
                name:'',
                type:'',
            }
        },
        created:function(){
            this.languageCtoModelList=JSON.parse(getSessionStore('languageCtoModelList'))
            this.videoGenreCtoModelList=JSON.parse(getSessionStore('videoGenreCtoModelList'))
            this.genreList(null,'ZH')
        },
        methods:{
            genreList(type,lang){
                genreList(type,lang).then(res=>{
                    console.log('查询视频类型列表：',res)
                    if(res.code==0){
                        this.list=res.data.videoGenreCtoModelList
                    }
                })
            },
            change(){
                this.genreList(null,this.lang)
            },
            selectGet(vId){
                let obj = {};
                obj = this.videoGenreCtoModelList.find((item)=>{
                    return item.type === vId;
                });
                this.name=obj.name
            },
            add(){
                if(!!this.lang){}else{Message({message:'请选择语言', type: 'error', duration:'1500'});return}
                if(!!this.name){}else{Message({message:'请输入类型名', type: 'error', duration:'1500'});return}
                if(!!this.type){}else{Message({message:'请选择类型', type: 'error', duration:'1500'});return}
                genreAdd(this.type,this.lang,this.name).then(res=>{
                    console.log('新增视频类型:',res)
                    if(res.code==0){
                        this.genreList(null,this.lang)
                        this.name=''
                        this.type=''
                        Message({
                            message:'新增成功',
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
            deleteGenre(item){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    genreDelete(item.id).then(res=>{
                        console.log('删除视频类型:',res)
                        if(res.code==0){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.genreList(null,item.lang)
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }

    }
</script>

<style lang="scss" scoped>
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .add{
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
        .title{
            font-size: 14px;
            margin-bottom: 10px;
        }
        .box{
            display: flex;
            align-items: center;
            .item{
                width: 150px;
                margin-right: 20px;
            }
        }
    }
</style>
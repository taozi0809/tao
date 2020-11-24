<template>
    <div class="columnMange">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="add">
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
                <el-select v-model="status" placeholder="请选择状态">
                    <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="item l">
                <el-input v-model="name" placeholder="请输入栏目名称"></el-input>
            </div>
            <!--<div class="item">-->
                <!--<el-input v-model="indicate" placeholder="请输入栏目标志"></el-input>-->
            <!--</div>-->
            <div class="item">
                <el-button type="primary" @click="add">添加</el-button>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" height="600">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column label="语言" width="150">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.lang" placeholder="请选择语言">
                            <el-option
                                    v-for="item in languageCtoModelList"
                                    :key="item.lang"
                                    :label="item.name"
                                    :value="item.lang">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="栏目名称" width="350">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入栏目名称"></el-input>
                    </template>
                </el-table-column>
                <!--<el-table-column label="栏目标志" width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-input v-model="scope.row.indicate" placeholder="请输入栏目标志"></el-input>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="是否隐藏" width="150">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.status" placeholder="请选择状态">
                            <el-option
                                    v-for="item in statusOptions"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="save(scope.row)">保存</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

    </div>
</template>

<script>
    import {itemList,itemSaveUpdate} from "../../service/api";
    import Breadcrumb from '../../components/Breadcrumb'
    import {getSessionStore,setSessionStore} from "../../storage";
    import { Message,MessageBox} from 'element-ui';

    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {path:'/index', name:'首页'},
                    {path:'/columnMange', name:'内容管理'},
                    {path:'/columnMange', name:'栏目管理'},
                ],
                list:[],
                lang:'ZH',
                status:0,
                statusOptions:[
                    {value:0,name:'显示'},
                    {value:1,name:'隐藏'},
                ],
                name:'',
                indicate:'',

            }
        },
        created:function(){
            this.languageCtoModelList=JSON.parse(getSessionStore('languageCtoModelList'))

            this.itemList(this.lang)
        },
        methods:{
            itemList(lang){
                itemList(lang,'',1,50,null).then(res=>{
                    console.log('栏目列表：',res)
                    if(res.code==0){
                       this.list=res.data.videoItemCtoModelList
                        var videoItemCtoModelList = JSON.parse(getSessionStore('videoItemCtoModelList'))
                        videoItemCtoModelList[lang]=this.list
                        setSessionStore('videoItemCtoModelList',videoItemCtoModelList)
                    }
                })
            },
            change(){
                this.itemList(this.lang)
            },
            add(){
                if(!!this.name){
                    itemSaveUpdate(this.lang,this.status,this.name,null).then(res=>{
                        console.log('添加栏目：',res)
                        if(res.code==0){
                            this.itemList(this.lang)
                            this.name=''
                            Message({message:'新增成功', type: 'success', duration:'1500'})
                        }else{
                            Message({message:res.message, type: 'error', duration:'1500'})
                        }
                    })

                }
            },
            save(item){
                if(!!item.name){
                    itemSaveUpdate(item.lang,item.status,item.name,item.id).then(res=>{
                        console.log('修改栏目：',res)
                        if(res.code==0){
                            this.itemList(this.lang)
                            Message({message:'修改', type: 'success', duration:'1500'})
                        }else{
                            Message({message:res.message, type: 'error', duration:'1500'})
                        }
                    })
                }
            }

        },
    }
</script>

<style lang="scss" scoped>
    .add{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        align-items: center;
        .item{
            width: 150px;
            margin-right: 20px;
        }
        .l{
            width: 350px;
        }
    }
</style>

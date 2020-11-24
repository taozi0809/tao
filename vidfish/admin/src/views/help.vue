<template>
    <div class="help">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <UgcUploader @uploaderInfo="onUploaderInfo"/>
        <div class="add">
            <div class="type">
                <el-select v-model="lang" placeholder="请选择语言">
                    <el-option
                            v-for="item in languageCtoModelList"
                            :key="item.lang"
                            :label="item.name"
                            :value="item.lang">
                    </el-option>
                </el-select>
            </div>
            <div class="title-box">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </div>
            <div class="remark-box">
                <el-input v-model="remark" placeholder="请输入备注"></el-input>
            </div>
            <div class="type">
                <el-button type="primary" @click="add">新增帮助文档</el-button>
            </div>
        </div>
        <div class="list">
            <el-table :data="helpDocumentCtoModelList" style="width: 100%" height="600">
                <el-table-column type="index" :index="getIndex"  width="60"></el-table-column>
                <el-table-column prop="title" label="标题" width="200"></el-table-column>

                <!--<el-table-column label="主题" width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<p>{{scope.row.theme | isTheme }}</p>-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <!--<el-table-column label="类型" width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<p>{{scope.row.type | isType }}</p>-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <el-table-column label="是否有效" width="80">
                    <template slot-scope="scope">
                        <p>{{scope.row.enable_ | isFilter }}</p>
                    </template>
                </el-table-column>

                <el-table-column label="是否转码" width="80">
                    <template slot-scope="scope">
                        <p>{{scope.row.isTranscode | isFilter }}</p>
                    </template>
                </el-table-column>

                <!--<el-table-column prop="resourceUrl" label="资源路径" width="200"></el-table-column>-->
                <el-table-column prop="lang" label="语言" width="80"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>

                <el-table-column label="创建时间" width="150">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="helpDocumentDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination  background layout="total, prev, pager, next, jumper" :total="totalNum" :page-size="pageSize"
            :current-page.sync="pageSum" @current-change="changePage"></el-pagination>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import UgcUploader from '../components/upload/UgcUploader'
    import {helpDocumentList,helpDocumentAdd,helpDocumentDelete} from "../service/api";
    import { Message,MessageBox} from 'element-ui';
    import {getSessionStore} from "../storage";
    import {bus} from "../assets/config/eventBus";
    export default {
        components:{Breadcrumb,UgcUploader},
        data(){
            return{
                breadcrumb:[
                    {path:'/index', name:'首页'},
                    {path:'/help', name:'帮助文档'},
                ],
                pageSize:50,
                pageSum:1,
                totalNum:0,
                helpDocumentCtoModelList:[],

                typeOptions: [
                    {value: '1', label: '图片'},
                    {value: '2', label: '文档'},
                    {value: '3', label: '视频'}
                ],
                type:'',
                themeOptions: [
                    {value: '1', label: '登录'},
                    {value: '2', label: '注册'},
                    {value: '3', label: '支付'},
                    {value: '3', label: '操作帮助'},
                ],
                theme:'',
                lang:'',
                title:'',
                enable_Options:[
                    {value: '0', label: '是'},
                    {value: '1', label: '否'},
                ],
                enable_:'0',
                remark:'',
                fileId:'',
                resourceUrl:'',

            }
        },
        computed:{
            getIndex(){
                return (this.pageSum - 1) * this.pageSize +1
            },
        },
        created:function(){
            // this.helpDocumentAdd(3,1,'EN',0,'cc','aaa','5')
            this.helpDocumentList(null,null,null,0,this.pageSum,this.pageSize)

            this.languageCtoModelList=JSON.parse(getSessionStore('languageCtoModelList'))

        },
        methods:{
            emit(name,data){
                bus.$emit(name,data)
            },
            changePage(){
                this.helpDocumentList(null,null,null,0,this.pageSum,this.pageSize)
            },
            add(){
                if(!!this.title){}else{Message({message:'请输入标题', type: 'error', duration:'1500'});return}
                // if(!!this.type){}else{Message({message:'请选择类型', type: 'error', duration:'1500'});return}
                // if(!!this.theme){}else{Message({message:'请选择主题', type: 'error', duration:'1500'});return}
                if(!!this.lang){}else{Message({message:'请选择语言', type: 'error', duration:'1500'});return}
                this.emit('uploadVideo')
            },
            onUploaderInfo(info,type){
                if(info.isVideoUploadSuccess){
                    this.fileId = info.fileId
                    this.resourceUrl=info.videoUrl

                    this.helpDocumentAdd(3,null,this.lang,0,this.remark,this.title,this.fileId)
                }
            },
            helpDocumentList(type,theme,lang,enable,pageNum,pageSize){
                helpDocumentList(type,theme,lang,enable,pageNum,pageSize).then(res=>{
                    console.log('查询帮助文档列表:',res)
                    if(res.code==0){
                        this.helpDocumentCtoModelList=res.data.helpDocumentCtoModelList
                        this.totalNum=res.data.totalNum
                    }
                })
            },
            helpDocumentAdd(type,theme,lang,enable,remark,title,fileId){
                helpDocumentAdd(type,theme,lang,enable,remark,title,fileId).then(res=>{
                    console.log('新增帮助文档列表:',res)
                    if(res.code==0){
                        Message({
                            message:'新增成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.type=''
                        this.theme=''
                        this.lang=''
                        this.remark=''
                        this.title=''
                        this.fileId=''
                        this.helpDocumentList(null,null,null,0,this.pageSum,this.pageSize)
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            helpDocumentDelete(id){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    helpDocumentDelete(id).then(res=>{
                        console.log('删除帮助文档列表:',res)
                        if(res.code==0){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.helpDocumentList(null,null,null,0,this.pageSum,this.pageSize)
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

            },


        },
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
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .type{
            width: 120px;
            margin-right: 20px;
        }
        .title-box{
            width: 300px;
            margin-right: 20px;
        }
        .remark-box{
            width: 300px;
            margin-right: 20px;
        }

    }
</style>

<template>
    <div class="actorDetails">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <form id="form1">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="add-actor" id="addActor-file" @change="onFileChange">
        </form>

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="修改头像">
                <el-row>
                    <el-col :span="3"><el-button type="primary" @click="handleAddHeadImg">修改头像</el-button></el-col>
                    <el-col :span="3"><span class="head-img" @click="handleAddHeadImg"><img :src="fullUrl" alt=""></span></el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="演员名称" prop="actorName">
                <el-input v-model="form.actorName"></el-input>
            </el-form-item>
            <el-form-item label="演员描述">
                <el-input v-model="form.actorDesc"></el-input>

                <div class="word-limit"> 字数限制：{{actorDescLength}}/1500</div>
            </el-form-item>
            <el-form-item label="语言环境" prop="lang">
                <el-select v-model="form.lang" placeholder="请选择">
                    <el-option
                            v-for="item in form.langOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="演员所属国家">
                <el-select v-model="form.area" filterable placeholder="请选择">
                    <el-option
                            v-for="item in form.areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="演员演过的电影">
                <el-select v-model="form.movieIds" filterable multiple placeholder="请选择">
                    <el-option
                            v-for="item in form.movieIdsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {jq} from "../../plugins/jquery";jq()
    import {contrynameList,performerAddUpdate,uploadDo,performerDetails,baseCatalog,languageSelect} from "../../service/api";
    import { Message} from 'element-ui';
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
                        name:'演员管理'
                    },
                    {
                        path:'/actorDetails',
                        name:'演员详情'
                    },
                ],
                fullUrl:null,
                form:{
                    actorName:null,
                    actorDesc:null,
                    lang:null,
                    langOptions:[],
                    area:null,
                    areaOptions:[],
                    movieIds:null,
                    movieIdsOptions:[],
                },
                rules: {
                    actorName: { required: true, message: '请输入演员名称', trigger: 'blur' },
                    lang: { required: true, message: '请输入语言环境', trigger: 'blur' },
                },
                id:'',
                lang:'',
            }
        },
        computed:{
            actorDescLength(){
                if(this.form.actorDesc!=null&&this.form.actorDesc!=undefined&&this.form.actorDesc!=''){
                    if(this.form.actorDesc.length>1500){
                        this.form.actorDesc = this.form.actorDesc.slice(0,1500)
                    }
                    return this.form.actorDesc.length
                }else{
                    return '0'
                }
            }
        },
        created:function(){
            this.id = this.$route.query.id
            this.lang = this.$route.query.lang
            this.getPerformerDetails(this.id,this.lang)
            contrynameList().then(res=>{
                console.log('获取国家列表',res)
                if(res.code==='0'){
                    let arr = res.data.contryNameCtoModelList
                    let arr1 = []
                    for(let i in arr){
                        arr1.push({
                            value:arr[i].shortName,
                            label:arr[i].en,
                        })
                    }
                    this.form.areaOptions = arr1
                }
            })
            baseCatalog('').then(res=>{
                console.log('所有视频列表',res)
                if(res.code==='0'){
                    let arr = res.data.videoBaseCtoModelList
                    let arr1 = []
                    for(let i in arr){
                        arr1.push({
                            value:arr[i].id,
                            label:arr[i].videoName
                        })
                    }
                    this.form.movieIdsOptions = arr1
                }
            })
            this.languageSelect()


        },
        methods:{
            getPerformerDetails(id,lang){
                performerDetails(id,lang).then(res=>{
                    console.log('演员信息',res)
                    if(res.code==='0'){
                        this.fullUrl = res.data.photoUrl
                        this.form.actorName = res.data.actorName
                        this.form.actorDesc = res.data.actorDesc
                        this.form.lang = res.data.lang
                        this.form.area = res.data.actorArea
                        let arr = res.data.videoBaseCtoModelList
                        let arr1 = []
                        for(let i in arr){
                            arr1.push(arr[i].id)
                        }
                        this.form.movieIds =arr1
                    }
                })
            },
            handleAddHeadImg(){
                $('#addActor-file').click()
            },
            onFileChange(e){
                let _this = this
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                let createReader = function(file, whenReady) {
                    var reader = new FileReader;
                    reader.onload = function (evt) {
                        var image = new Image();
                        image.onload = function () {
                            var width = this.width;
                            var height = this.height;
                            if (whenReady) whenReady(width, height);
                        };
                        image.src = evt.target.result;
                    };
                    reader.readAsDataURL(file);
                }

                createReader(files[0], function (w, h) {
                    uploadDo('vidfish:photo',files[0]).then(res=>{
                        console.log('添加头像',res)
                        if(res.code==='0'){
                            Message({
                                message:'上传成功',
                                type: 'success',
                                duration:'1500',
                            })
                            _this.fullUrl = res.data.fullUrl
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                        $('#form1')[0].reset();
                    })
                });
            },
            submitForm(){
                if(this.form.actorName==''||this.form.actorName==undefined||this.form.actorName===null){
                    Message({
                        message:'请选择演员名称',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.lang==''||this.form.lang==undefined||this.form.lang===null){
                    Message({
                        message:'请选择语言环境',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }

                performerAddUpdate(this.form.actorName, this.form.area, this.form.actorDesc, this.fullUrl, this.form.movieIds.join(), this.form.lang,this.id).then(res=>{
                    console.log('上传演员信息',res)
                    if(res.code==='0'){
                        Message({
                            message:'修改成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.$router.push('/actorManage')
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            languageSelect(){
                languageSelect().then(res=>{
                    console.log('获取语言环境列表：',res)
                    if(res.code==='0'){
                        let arr = []
                        for(let i in res.data.languageCtoModelList){
                            arr.push({
                                value:res.data.languageCtoModelList[i].lang,
                                label:res.data.languageCtoModelList[i].name
                            })
                        }
                        this.form.langOptions=arr
                    }
                })
            },


        },

    }
</script>

<style lang="scss" scoped>
    .actorDetails{
        box-sizing: border-box;
        padding: 0 15px;
    }
    .add-actor{
        display: none;
    }
    .head-img{
        width: 40px;
        height: 40px;
        display: block;
        overflow: hidden;
        cursor: pointer;
        img{
            width: 100%;
        }

    }
    .word-limit{
        text-align: right;
        color: #999;
    }
</style>
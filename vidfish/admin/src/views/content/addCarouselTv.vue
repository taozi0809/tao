<template>
    <div class="addCarousel">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <form id="form1">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="add-actor" id="addActor-file" @change="onFileChange">
        </form>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="zdy-form">
            <el-form-item label="轮播图">
                <el-button type="primary" @click="handlePosterUrl">上传海报</el-button>
            </el-form-item>
            <el-form-item label="语言版本" prop="lang">
                <el-select v-model="form.lang" placeholder="请选择">
                    <el-option
                            v-for="item in form.langOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联电视剧" prop="movieIds">
                <el-select v-model="form.movieIds" placeholder="请选择">
                    <el-option
                            v-for="item in form.movieIdsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="轮播序号" prop="sort">
                <el-input v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="是否展示" prop="radio">
                <el-radio v-model="form.radio" label="0">展示</el-radio>
                <el-radio v-model="form.radio" label="1">不展示</el-radio>
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
    import {uploadDo,carouselAddUpdate,baseCatalog,languageSelect} from "../../service/api";
    import { Message} from 'element-ui';
    import {getSessionStore} from "../../storage";

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
                        path:'/carousel',
                        name:'轮播图管理'
                    },
                    {
                        path:'/addCarousel',
                        name:'添加轮播图'
                    },
                ],
                fullUrl:null,
                form:{
                    movieIds:null,
                    movieIdsOptions:[],
                    sort:'',
                    radio:'0',
                    langOptions:[],
                    lang:'',
                },
                rules: {
                    radio: { required: true, message: '请选择是否展示', trigger: 'blur' },
                    sort: { required: true, message: '请输入轮播序号', trigger: 'blur' },
                    movieIds: { required: true, message: '请选择关联电影', trigger: 'blur' },
                    lang: { required: true, message: '请选择语言版本', trigger: 'blur' },
                },
            }
        },
        created:function(){
            languageSelect().then(res=>{
                if(res.code==0){
                    let arr = []
                    for(let i in res.data.languageCtoModelList){
                        arr.push({
                            value:res.data.languageCtoModelList[i].lang,
                            label:res.data.languageCtoModelList[i].name,
                        })
                    }
                    this.form.langOptions = arr
                }
            })
            baseCatalog('DRAMA').then(res=>{
                console.log('所有电视剧列表',res)
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
        },
        methods:{
            handlePosterUrl(){
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
                    uploadDo('vidfish:carousel',files[0]).then(res=>{
                        console.log('添加轮播图',res)
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
                if(this.form.lang==''||this.form.lang==undefined||this.form.lang===null){
                    Message({
                        message:'请选择语言版本',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.movieIds==''||this.form.movieIds==undefined||this.form.movieIds===null){
                    Message({
                        message:'请选择关联电影',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.fullUrl==''||this.fullUrl==undefined||this.fullUrl===null){
                    Message({
                        message:'请上传海报',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.sort==''||this.form.sort==undefined||this.form.sort===null){
                    Message({
                        message:'请输入轮播图序号',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.radio==''||this.form.radio==undefined||this.form.radio===null){
                    Message({
                        message:'请选择是否展示',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                carouselAddUpdate(this.form.movieIds,null,this.fullUrl,this.form.sort,'0',this.form.radio,null,this.form.lang).then(res=>{
                    console.log('新增轮播图',res)
                    if(res.code==='0'){
                        Message({
                            message:'添加成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.form.lang = ''
                        this.form.movieIds = ''
                        this.fullUrl = ''
                        this.form.sort = ''
                        this.form.radio = ''
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .add-actor{
        display: none;
    }
    .zdy-form{
        box-sizing: border-box;
        padding-right: 10px;
    }
</style>
<template>
    <div class="tv">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <ImgUploader @imgUploader="onImgUploader"/>
        <div class="row uploadImg">
            <el-button type="primary" @click="emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})">添加横向封面</el-button>
            <span class="coverPhoto"><img :src="coverPhotoUrl" alt=""></span>
        </div>
        <div class="row uploadImg">
            <el-button type="primary" @click="emit('uploadImg',{name:'backPhotoUrl',type:'vidfish:back:photo',})">添加背景</el-button>
            <span class="backPhoto"><img :src="backPhotoUrl" alt=""></span>
        </div>
        <div class="row">
            <el-form ref="form" :model="form" :rules="rules" label-position="left">
                <div class="col">
                    <el-form-item label="类型" prop="generName">
                        <Type @type="onType"/>
                    </el-form-item>
                    <el-form-item label="帧率" prop="frameRate">
                        <FrameRate @frameRate="onFrameRate" :frameRate="form.frameRate"/>
                    </el-form-item>
                    <el-form-item label="限制等级" prop="limitLevel">
                        <LimitLevel @limitLevel="onLimitLevel" :limitLevel="form.limitLevel"/>
                    </el-form-item>
                    <el-form-item label="总集数" prop="total">
                        <el-input v-model.number="form.total" @input="onTotalChange"></el-input>
                    </el-form-item>
                    <el-form-item label="不可见地区">
                        <BlackAreaShortName @blackAreaShortName="onBlackAreaShortName" :blackAreaShortName="form.blackAreaShortName"/>
                    </el-form-item>
                </div>
                <el-form-item label="是否是新视频：" label-width="140px" prop="isNew">
                    <el-radio v-model="form.isNew" label="0">是</el-radio>
                    <el-radio v-model="form.isNew" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="是否是vip资源：" label-width="140px" prop="isVip">
                    <el-radio v-model="form.isVip" label="0">是</el-radio>
                    <el-radio v-model="form.isVip" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="是否热点推荐：" label-width="140px" prop="isRecommend">
                    <el-radio v-model="form.isRecommend" label="0">是</el-radio>
                    <el-radio v-model="form.isRecommend" label="1">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import ImgUploader from '../../components/upload/ImgUploader'
    import {blackAreaShortNameAll} from "../../assets/config/tool";
    import { Message } from 'element-ui';
    import {videoBaseAdd,performerList,uploadDo} from "../../service/api";
    import {bus} from "../../assets/config/eventBus";

    import Type from '../../components/content/Type'
    import FrameRate from '../../components/content/FrameRate'
    import LimitLevel from '../../components/content/LimitLevel'
    import BlackAreaShortName from '../../components/content/BlackAreaShortName'


    export default {
        components:{Breadcrumb,ImgUploader,Type,FrameRate,LimitLevel,BlackAreaShortName},
        data(){
            return{
                breadcrumb:[{path:'/index', name:'首页'},
                    {path:'/tvManage', name:'电视剧管理'},
                    {path:'/addVideo', name:'新增电视剧'},
                ],
                coverPhotoUrl:'',
                backPhotoUrl:'',
                radio: '1',
                fullUrl:'',
                form: {
                    generNameOptions: [],
                    generName: '',
                    total:'',
                    frameRate:720,
                    limitLevel:'PG13',
                    blackAreaShortName:blackAreaShortNameAll(),
                    actorIdsOptions:[],
                    isShow:'',
                    isNew:'',
                    isVip:'0',
                    isRecommend:'',
                    scores:'',
                },
                rules:{
                    isShow:[{required: true,message: '请选择', trigger: 'blur'}],
                    isNew:[{required: true,message: '请选择', trigger: 'blur'}],
                    isVip:[{required: true,message: '请选择', trigger: 'blur'}],
                    isRecommend:[{required: true,message: '请选择', trigger: 'blur'}],
                    generName:[{required: true,message: '请选择', trigger: 'blur'}],
                    frameRate:[{required: true,message: '请选择', trigger: 'blur'}],
                    limitLevel:[{required: true,message: '请选择', trigger: 'blur'}],
                    total:[{required: true,message: '请输入总集数', trigger: 'blur'}],
                },
            }
        },
        methods:{
            emit(name,data){
                bus.$emit(name,data)
            },
            onImgUploader(res){
                this[res.name]=res.url
            },
            onType(type){
                this.form.generName=type
            },
            onSubmit() {
                if(!!this.coverPhotoUrl){}else{
                    Message({message:'请上传横向封面', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.backPhotoUrl){}else{
                    Message({message:'请上传背景', type: 'error', duration:'1500'})
                    return
                }
                if(this.form.generName.length=='0'){
                    Message({message:'请选择视频类型', type: 'error', duration:'1500',})
                    return
                }
                if(!!this.form.total){}else{
                    Message({message:'请输入总集数', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.form.isNew){}else{
                    Message({message:'请选择是否是新视频', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.form.isRecommend){}else{
                    Message({message:'请选择是否是热点推荐', type: 'error', duration:'1500'})
                    return
                }

                let generName = this.form.generName.join()
                let blackAreaShortName = this.form.blackAreaShortName.join()

                videoBaseAdd('DRAMA',null,generName,this.posterUrl,this.form.frameRate,blackAreaShortName,'0',
                    this.form.isNew,this.form.isVip,'0', this.form.isRecommend,null,this.form.scores,null,
                    this.form.limitLevel,'',this.form.total,'0','0',this.coverPhotoUrl,this.backPhotoUrl).then(res=>{
                    console.log('新增电视剧目录',res)
                    if(res.code==='0'){
                        Message({
                            message:'新增成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.$router.push('/tvManage')
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
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
                        console.log('添加电视剧海报封面',res)
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
            handleAddHeadImg(){
                $('#addActor-file').click()
            },
            handleScoresChange(){
                if(this.form.scores>10){this.form.scores = 10}
                if(this.form.scores<0){this.form.scores = 0}
            },
            onTotalChange(){
                if(this.form.total<0){this.form.total = 0}
            },
            getPerformerList(lange){
                performerList(null,lange,'1',null,null).then(res=>{
                    console.log('演员列表',res)
                    if(res.code==='0'){
                        let arr = res.data.performerCtoModelList
                        let arr1 = []
                        for(let i in arr){
                            arr1.push({
                                value:arr[i].id,
                                label:arr[i].actorName
                            })
                        }
                        this.form.actorIdsOptions = arr1
                    }
                })
            },

            onType(type){
                this.form.generName=type
                // console.log(this.form.generName)
            },
            onFrameRate(frameRate){
                this.form['frameRate']=frameRate
                // console.log(this.form.frameRate)
            },
            onLimitLevel(limitLevel){
                this.form['limitLevel']=limitLevel
                // console.log(this.form.frameRate)
            },
            onBlackAreaShortName(blackAreaShortName){
                this.form.blackAreaShortName=blackAreaShortName
            },
        },
    }
</script>

<style lang="scss" scoped>
    .tv{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .row{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 20px;
        .steps{
            margin-bottom: 10px;
            width:400px;
        }
        .col{
            display: flex;
            align-items: center;
            .el-form-item {
                margin-right: 20px;
            }
        }
    }
    .uploadImg{
        display: flex;
        align-items: center;
        span{
            margin-left: 20px;
        }
    }
    .backPhoto{
        width: 100px;
        display: block;
        img{
            width: 100%;
        }
    }
    .coverPhoto{
        width: 200px;
        display: block;
        img{
            width: 100%;
        }
    }
</style>
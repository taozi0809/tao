<template>
    <div class="addVideo">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <UgcUploader @uploaderInfo="onUploaderInfo"/>
        <ImgUploader @imgUploader="onImgUploader"/>
        <div class="row">
            <el-steps :active="active" finish-status="success" class="steps">
                <el-step title="1.添加视频"></el-step>
                <el-step title="2.添加横向封面"></el-step>
                <el-step title="3.添加背景"></el-step>
            </el-steps>
            <el-button type="primary" @click="next" :disabled="disabled">下一步</el-button>
            <el-button type="danger"  @click="handleReset">重置</el-button>
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
                <el-form-item label="是否添加水印：" label-width="140px" prop="isWater">
                    <el-radio v-model="form.isWater" label="0">是</el-radio>
                    <el-radio v-model="form.isWater" label="1">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import UgcUploader from '../../components/upload/UgcUploader'
    import ImgUploader from '../../components/upload/ImgUploader'
    import Type from '../../components/content/Type'
    import FrameRate from '../../components/content/FrameRate'
    import LimitLevel from '../../components/content/LimitLevel'
    import BlackAreaShortName from '../../components/content/BlackAreaShortName'
    import { Message } from 'element-ui';
    import {videoBaseAdd} from "../../service/api";
    import {bus} from "../../assets/config/eventBus";
    import {blackAreaShortNameAll} from "../../assets/config/tool";

    export default {
        components:{Breadcrumb,UgcUploader,ImgUploader,Type,FrameRate,LimitLevel,BlackAreaShortName},
        data(){
            return{
                breadcrumb:[
                    {path:'/index', name:'首页'},
                    {path:'/videoManage', name:'电影管理'},
                    {path:'/addVideo', name:'新增电影'}
                ],
                active: 0,
                disabled:false,
                form: {
                    frameRate:720,
                    limitLevel:'PG13',
                    blackAreaShortName:blackAreaShortNameAll(),
                    isShow:'',
                    isNew:'',
                    isVip:'0',
                    isRecommend:'',
                    isWater:'0',
                },
                rules:{
                    isNew:[{required: true,message: '请选择', trigger: 'blur'}],
                    isWater:[{required: true,message: '请选择', trigger: 'blur'}],
                    isVip:[{required: true,message: '请选择', trigger: 'blur'}],
                    isRecommend:[{required: true,message: '请选择', trigger: 'blur'}],
                    generName:[{required: true,message: '请选择', trigger: 'blur'}],
                    frameRate:[{required: true,message: '请选择', trigger: 'blur'}],
                    limitLevel:[{required: true,message: '请选择', trigger: 'blur'}],
                },

                resourceUrl:'',
                fileId:'',
                coverPhotoUrl:'',
                backPhotoUrl:'',
                loading:false,
            }
        },

        methods:{
            next(){
                switch (this.active){
                    case 0:
                        this.emit('uploadVideo')
                        this.active++
                        break
                    case 1:
                        this.emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})
                        break
                    case 2:
                        this.emit('uploadImg',{name:'backPhotoUrl',type:'vidfish:back:photo'})
                        break
                }
            },
            handleReset(){
                this.active=0
                this.disabled=false
                this.emit('uploadVideo','reset')
            },
            emit(name,data){
                bus.$emit(name,data)
            },
            onUploaderInfo(info,type){
                if(info.isVideoUploadSuccess){
                    this.fileId = info.fileId
                    this.resourceUrl=info.videoUrl
                }
            },
            onImgUploader(res){
                this[res.name]=res.url
                this.active++
                if(this.active==3){
                    this.disabled=true
                }
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
            onSubmit() {
                if(!!this.resourceUrl&&!!this.fileId){}else{
                    Message({message:'请上传视频', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.coverPhotoUrl){}else{
                    Message({message:'请上传横向封面', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.backPhotoUrl){}else{
                    Message({message:'请上传背景', type: 'error', duration:'1500'})
                    return
                }
                if(this.form.generName.length==0){
                    Message({message:'请选择视频类型', type: 'error', duration:'1500'})
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
                console.log(blackAreaShortName)
                this.loading=true
                videoBaseAdd('MOVIE',null,generName,null,this.form.frameRate,blackAreaShortName,0,
                    this.form.isNew,this.form.isVip,0,this.form.isRecommend,this.resourceUrl,null,null,
                    this.form.limitLevel,null, null,0,this.fileId,this.coverPhotoUrl,this.backPhotoUrl,this.form.isWater).then(res=>{
                    console.log('新增视频',res)
                    if(res.code==='0'){
                        this.$router.push('/videoManage')
                        Message({message:'添加成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                    this.loading=false
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .addVideo{
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
            width:600px;
        }
        .col{
            display: flex;
            align-items: center;
            .el-form-item {
                margin-right: 20px;
            }
        }
    }

</style>
<template>
    <div class="tv">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <UgcUploader @uploaderInfo="onUploaderInfo"/>
        <ImgUploader @imgUploader="onImgUploader"/>

        <el-form ref="form" :model="form" label-position="left" class="row">
            <div class="col">
                <el-button type="primary" @click="emit('uploadVideo')">上传分集</el-button>
                <el-button type="danger" @click="emit('uploadVideo','reset')">取消上传</el-button>
            </div>
            <div class="col">
                <el-button type="primary" @click="emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})">上传横版封面</el-button>
                <span class="coverPhoto"><img :src="coverPhotoUrl" alt=""></span>
            </div>
            <div class="col">
                <el-form-item label="帧率">
                    <br>
                    <el-select v-model="form.frameRate" placeholder="请选择">
                        <el-option
                                v-for="item in form.frameRateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第几集">
                    <br>
                    <el-input v-model.number="form.episode"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="是否是vip资源：" label-width="140px" prop="isVip">
                <el-radio v-model="form.isVip" label="0">是</el-radio>
                <el-radio v-model="form.isVip" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否展示：" label-width="140px" prop="isShow">
                <el-radio v-model="form.isShow" label="0">是</el-radio>
                <el-radio v-model="form.isShow" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否添加水印：" label-width="140px" prop="isWater">
                <el-radio v-model="form.isWater" label="0">是</el-radio>
                <el-radio v-model="form.isWater" label="1">否</el-radio>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" class="save" :loading="loading">保存</el-button>
        </el-form>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message} from 'element-ui';
    import {videoBaseDetails,videoBaseAdd} from "../../service/api";
    import UgcUploader from '../../components/upload/UgcUploader'
    import ImgUploader from '../../components/upload/ImgUploader'
    import {bus} from "../../assets/config/eventBus";
    import {frameRateOptions} from "../../assets/config/tool";

    export default {
        components:{Breadcrumb,UgcUploader,ImgUploader},
        data(){
            return{

                form:{
                    isVip:'',
                    isShow:'',
                    frameRate:'',
                    frameRateOptions:frameRateOptions,
                    episode:'',
                    isWater:'0',
                },
                id:'',
                data:{},
                resourceUrl:'',
                fileId:'',
                coverPhotoUrl:'',
                loading:false,
            }
        },
        created:function(){
            this.id = this.$route.params.id
            this.breadcrumb = [{path:'/index', name:'首页'},
                {path:'/tvManage', name:'电影剧管理'},
                {path:'/tvDetails/'+this.id, name:'电影剧详情'},
                {path:'/addTvs/'+this.id, name:'添加子集'},
            ],

            videoBaseDetails(this.id).then(res=>{
                console.log('电视剧详情',res)
                if(res.code==='0'){
                    this.data = res.data
                    let arr = []
                    if(res.data.performerCtoModelList!=null&&res.data.performerCtoModelList!=''&&res.data.performerCtoModelList!=undefined){
                        for(let i in res.data.performerCtoModelList){
                            for(let j in res.data.performerCtoModelList[i]){
                                for(let o in res.data.performerCtoModelList[i][j]){
                                    arr.push(res.data.performerCtoModelList[i][j][o].id)
                                }
                            }

                        }
                        this.data.actorIds = arr.join()
                    }
                }
            })
        },
        mounted:function(){

        },
        methods:{
            emit(name,data){
                bus.$emit(name,data)
            },
            onUploaderInfo(info,type){
                if(info.isVideoUploadSuccess){
                    this.fileId=info.fileId
                    this.resourceUrl = info.videoUrl
                }
            },
            onImgUploader(res){
                this.coverPhotoUrl = res.url

            },
            onSubmit(){
                if(!!this.resourceUrl&&!!this.fileId){}else{
                    Message({message:'请上传电视剧分集', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.coverPhotoUrl){}else{
                    Message({message:'请上传横版封面', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.form.frameRate){}else{
                    Message({message:'请选择帧率', type: 'error', duration:'1500'})
                    return
                }
                if(!!this.form.episode){}else{
                    Message({message:'请选择第几集', type: 'error', duration:'1500'})
                    return
                }
                if(this.form.isVip.length=='0'){
                    Message({message:'请选择是否是vip资源', type: 'error', duration:'1500'})
                    return
                }
                if(this.form.isShow.length=='0'){
                    Message({message:'请选择是否展示', type: 'error', duration:'1500'})
                    return
                }
                this.loading=true
                videoBaseAdd('DRAMA',this.form.episode,this.data.genreName,this.data.posterUrl,this.form.frameRate,this.data.blackAreaShortName,
                    this.form.isShow,this.data.isNew,this.form.isVip,'0',this.data.isRecommend,this.resourceUrl,this.data.scores,null,
                    this.data.limitLevel,this.data.actorIds,this.data.total,this.id,this.fileId,this.coverPhotoUrl,this.data.backPhotoUrl,this.form.isWater).then(res=>{
                    console.log('新增电视剧剧集',res)
                    if(res.code==='0'){
                        Message({message:'新增成功', type: 'success', duration:'1500'})
                        this.$router.push({
                            name:'tvDetails',
                            params:{id:this.id},
                            query:{activeName:'second'},
                        })
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
    .row{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        .col{
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            .el-form-item{
                margin-right: 20px;
            }
        }
    }
    .coverPhoto{
        width: 200px;
        display: block;
        margin-left: 20px;
        img{
            width: 100%;
        }
    }
</style>
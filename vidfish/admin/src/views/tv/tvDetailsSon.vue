<template>
    <div class="videoDetails">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <Breadcrumb :breadcrumb="breadcrumb"/>
                <UgcUploader @uploaderInfo="onUploaderInfo"/>
                <ImgUploader @imgUploader="onImgUploader"/>
                <SubtitleUploader @subtitleUploader="onSubtitleUploader"/>

                <div class="row flex">
                    <div class="button">
                        <el-button type="primary" @click="emit('uploadVideo','changeVideo')">修改视频</el-button>
                    </div>
                    <p class="url">{{data.resourceUrl}}</p>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary" @click="emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})">修改横版海报</el-button>
                    </div>
                    <span class="coverPhotoUrl"><img :src="data.coverPhotoUrl" alt=""></span>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary" @click="videoBaseEditFun(data,{'isVip':isVip})">修改vip资源</el-button>
                    </div>
                    <el-radio v-model="isVip" label="0">是</el-radio>
                    <el-radio v-model="isVip" label="1">否</el-radio>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary" @click="videoBaseEditFun(data,{'isShow':isShow})">修改是否展示</el-button>
                    </div>
                    <el-radio v-model="isShow" label="0">是</el-radio>
                    <el-radio v-model="isShow" label="1">否</el-radio>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary" disabled>修改是否添加水印</el-button>
                    </div>
                    <el-radio v-model="isWater" label="0" disabled>是</el-radio>
                    <el-radio v-model="isWater" label="1" disabled>否</el-radio>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary">fileId</el-button>
                    </div>
                    <p>{{data.fileId}}</p>
                </div>
                <div class="row flex">
                    <div class="button">
                        <el-button type="primary">集数</el-button>
                    </div>
                    <p>第{{data.episode}}集</p>
                </div>

                <div class="row">
                    <el-collapse v-model="activeName" accordion >
                        <el-collapse-item name="4">
                            <template slot="title"><el-button type="primary">字幕</el-button></template>
                            <div>
                                <el-table :data="addSubtitleList" style="width: 100%">
                                    <el-table-column  label="语言环境" width="150">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.lang" placeholder="请选择">
                                                <el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="终端环境" width="150">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.type" placeholder="请选择">
                                                <el-option v-for="item in scope.row.typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="handleSubtitleUpload(scope.row)">上传</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <el-table :data="subtitleListArr" style="width: 100%">
                                    <el-table-column  prop="lang" label="语言环境" width="150"></el-table-column>
                                    <el-table-column label="终端环境" width="150">
                                        <template slot-scope="scope">
                                            {{scope.row.type==0?'app':'pc'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="realName" label="文件名" width="200"></el-table-column>
                                    <el-table-column  prop="fileUrl" label="文件地址"></el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="danger" @click="handleSubtitleDelete(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="5">
                            <template slot="title"><el-button type="primary">帧率</el-button></template>
                            <el-table :data="addFramerateList" style="width: 100%">
                                <el-table-column  label="视频帧率">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.frameRate" placeholder="请选择">
                                            <el-option v-for="item in scope.row.frameRateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="handleFramerateListAdd(scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table :data="framerateList" style="width: 100%">
                                <el-table-column  prop="frameRate" label="视频帧率" ></el-table-column>

                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger" @click="handleFramerateListDelete(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,MessageBox} from 'element-ui';
    import {videoBaseEdit,videoBaseDetails,genreList,contrynameList,performerList,framerateList,subtitleAddUpdate,
        framerateDelete,subtitleList,subtitleDelete,trailerList,trailerAddUpdate,framerateAddUpdate,
        trailerDelete,dramaAddUpdate,dramaDelete,languageSelect} from "../../service/api";
    import UgcUploader from '../../components/upload/UgcUploader'
    import ImgUploader from '../../components/upload/ImgUploader'
    import SubtitleUploader from '../../components/upload/SubtitleUploader'
    import {bus} from "../../assets/config/eventBus";
    import {limitLevelOptions,frameRateOptions} from "../../assets/config/tool";

    export default {
        components:{Breadcrumb,UgcUploader,ImgUploader,SubtitleUploader},
        data(){
            return{
                breadcrumb:[{path:'/index', name:'首页'},
                    {path:'/tvManage',name:'电视剧管理'},
                    {path:'/tvDetails', name:'电视剧详情'},
                    {path:'/tvDetailsSon', name:'分集详情'},
                ],
                id:'',
                parentId:'',
                data:{},
                descriptionList:[],
                genreNameOptions:[],
                genreName:'',
                limitLevelOptions: limitLevelOptions,
                limitLevel:'',
                scores:'',
                blackAreaShortName:'',
                blackAreaShortNameOptions: [],
                isShow:'',
                isNew:'',
                isVip:'',
                isWater:'',
                isRecommend:'',
                activeName: '0',
                addDescriptionList:[],
                performerList:[],
                addPerformerList:[],
                framerateList:[],
                addFramerateList:[{
                        frameRateOptions:frameRateOptions,
                        frameRate:'',
                }],
                addSubtitleList:[],
                subtitleListArr:[],
                trailerListCtoModelList:[],
                AddtrailerListCtoModelList:[{
                        lang:'',
                        langOptions:[],
                        frameRate:'',
                        frameRateOptions:frameRateOptions,
                        trailerName:'',
                        trailerDesc:'',
                }],
                loadingInstance:null,
                msg:{
                    show:false,
                    type:'',
                    res:'',
                    sha:'',
                    plan:'',
                },
                uploadCos:'',
                uploadTaskId:'',
                msg1:{
                    show:false,
                    type:'',
                    res:'',
                    sha:'',
                    plan:'',
                },
                uploadCos1:'',
                uploadTaskId1:'',
                isVip:'',
                coverPhotoUrl:'',
                backPhotoUrl:'',
            }
        },
        created:function(){
            this.id = this.$route.params.id
            this.parentId = this.$route.params.parentId

           console.log(this.$route)
            this.coverPhotoUrl = this.$route.params.coverPhotoUrl
            this.backPhotoUrl = this.$route.params.backPhotoUrl

            this.breadcrumb = [{path:'/index', name:'首页'},
                {path:'/tvManage', name:'电视剧管理'},
                {path:'/tvDetails/'+this.parentId, name:'电视剧详情'},
                {path:'/tvDetailsSon/'+this.id, name:'分集详情'},
            ],

            this.languageSelect()
            this.getVideoBaseDetails(this.id)
            this.getPerformerList('EN')
            this.getPerformerList('ZH')
            this.getFramerateList(this.id)
            this.getSubtitleList(this.id,null)
            this.getTrailerList(this.id)
        },
        methods: {
            emit(name,data){
                bus.$emit(name,data)
            },
            onUploaderInfo(info,type){
                if(info.isVideoUploadSuccess){
                    if(type=='changeVideo'){
                        let data = {
                            fileId:info.fileId,
                            resourceUrl:info.videoUrl,
                        }
                        this.videoBaseEditFun(this.data,data)
                    }
                    if(type=='addFramerate'){
                        this.framerateAddUpdate(this.id,info.videoUrl,this.addFramerateList[0].frameRate,null,null,info.fileId)
                    }
                }
            },
            onImgUploader(res){
                let data={}
                data[res.name]=res.url
                if(res.name=='posterUrl'){
                    this.posterAddUpdate(this.data.id,res.url,(new Date()).getTime(),null,res.lang,null)
                }else{
                    this.videoBaseEditFun(this.data,data)
                }

            },
            onSubtitleUploader(data){
                let subtitleName = ''
                let arr = this.addSubtitleList[0].langOptions
                let value = this.addSubtitleList[0].lang
                for(let i in arr){
                    if(arr[i].value==value){
                        subtitleName = arr[i].languageType
                    }
                }
                subtitleAddUpdate(this.id,data.fullUrl,data.httpsUrl,this.addSubtitleList[0].lang,subtitleName,this.addSubtitleList[0].type,data.realName).then(res=>{
                    console.log('新增',res)
                    if(res.code==='0'){
                        this.getSubtitleList(this.id,null)
                        this.addSubtitleList[0].lang = ''
                        Message({message:'添加成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            },

            getVideoBaseDetails(id){
                videoBaseDetails(id).then(res=>{
                    console.log('电视剧详情',res)
                    if(res.code==='0'){
                        this.data = res.data
                        this.data.parentId = '0'
                        this.genreName = res.data.genreName.split(",")
                        this.limitLevel = res.data.limitLevel
                        this.scores = res.data.scores
                        this.blackAreaShortName = res.data.blackAreaShortName.split(",")
                        this.isShow = res.data.isShow.toString()
                        this.isNew = res.data.isNew.toString()
                        this.isVip = res.data.isVip.toString()
                        this.isWater = res.data.isWater.toString()
                        this.isRecommend = res.data.isRecommend.toString()

                        this.descriptionList = res.data.dramaDetailsListCtoModel.detailsCtoModelList
                        let arractorIds = []
                        let objactorIds = {}
                        for(let i in res.data.performerCtoModelList){
                            arractorIds.push(res.data.performerCtoModelList[i].id)
                            objactorIds['lang'] = res.data.performerCtoModelList[i].lang
                        }
                        if(objactorIds.lang=='ZH'){
                            this.addPerformerList[0].actorIds = arractorIds
                        }else{
                            this.addPerformerList[1].actorIds = arractorIds
                        }
                    }
                })
            },
            getPerformerList(lang){
                performerList(null,lang,'0').then(res=>{
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
                        if(lang==='EN'){
                            this.addPerformerList[1].actorIdsOptions = arr1
                        }else{
                            this.addPerformerList[0].actorIdsOptions = arr1
                        }
                    }
                })
            },
            getFramerateList(id){
                framerateList(id).then(res=>{
                    console.log('视频帧率',res)
                    if(res.code==='0'){
                        this.framerateList = res.data.frameRateCtoModelList
                    }
                })
            },
            getSubtitleList(videoBaseId,lang){
                subtitleList(videoBaseId,lang).then(res=>{
                    console.log('字幕列表',res)
                    if(res.code==='0'){
                        this.subtitleListArr = res.data.subtitleCtoModelList
                    }
                })
            },
            getTrailerList(id){
                trailerList(id).then(res=>{
                    console.log('片花信息',res)
                    if(res.code==='0'){
                        this.trailerListCtoModelList = res.data.trailerListCtoModelList
                    }
                })
            },
            changeTrailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc, lang, id,fileId){
                trailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc, lang, id,fileId).then(res=>{
                    console.log('新增/修改片花',res)
                    if(res.code==='0'){
                        Message({
                            message:'上传成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.getTrailerList(this.id)
                        this.AddtrailerListCtoModelList[0].trailerName = ''
                        this.AddtrailerListCtoModelList[0].frameRate = ''
                        this.AddtrailerListCtoModelList[0].trailerDesc=''
                        this.AddtrailerListCtoModelList[0].lang=''
                    }else{
                        Message({
                            message:res.message,
                            type: 'success',
                            duration:'1500',
                        })
                    }
                })
            },

            handleAddDescriptionList(e){
                if(e.name==''||e.name==undefined||e.name===null||e.des==''||e.des==undefined||e.des===null||e.lang==''||e.lang==undefined||e.lang===null){return}
                dramaAddUpdate(e.name, e.des, this.id,null,e.lang).then(res=>{
                    console.log('添加电视剧详情详情',res)
                    if(res.code==='0'){
                        Message({
                            message:'添加成功',
                            type: 'success',
                            duration:'1500',
                        })
                        e.name = ''
                        e.des=''
                        e.lang=''
                        this.getVideoBaseDetails(this.id)
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })

            },
            handleDescriptionListAmend(e){
                if(e.dramaName==''||e.dramaName==undefined||e.dramaName===null||e.description==''||e.description==undefined||e.description===null||e.lang==''||e.lang==undefined||e.lang===null||e.id==''||e.id==undefined||e.id===null){return}
                dramaAddUpdate(e.dramaName, e.description, this.id, e.id,e.lang).then(res=>{
                    console.log('修改电影详情',res)
                    if(res.code==='0'){
                        Message({
                            message:'修改成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.getVideoBaseDetails(this.id)
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            handleDescriptionListDelete(e){
                if(e.id==''||e.id==undefined||e.id===null){return}
                dramaDelete(e.id).then(res=>{
                    console.log('删除电视剧详情',res)
                    if(res.code==='0'){
                        Message({
                            message:'删除成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.getVideoBaseDetails(this.id)
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            handleFramerateListAdd(){
                if(this.addFramerateList[0].frameRate.length=='0'){
                    Message({message:'请选择视频帧率', type: 'error', duration:'1500'})
                    return
                }
                this.emit('uploadVideo','addFramerate')
            },
            handleFramerateListDelete(e){
                framerateDelete(e.id).then(res=>{
                    console.log('删除帧率',res)
                    if(res.code==='0'){
                        this.getFramerateList(this.id)
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
            },
            handleSubtitleUpload(){
                if(!!this.addSubtitleList[0].lang){
                    this.emit('addSubtitle')
                }else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500',})

                }
            },
            handleSubtitleDelete(e){
                console.log(e)
                subtitleDelete(e.id).then(res=>{
                    console.log('删除字幕',res)
                    if(res.code==='0'){
                        Message({
                            message:'删除成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.getSubtitleList(this.id,null)
                    }else{
                        Message({
                            message:res.message,
                            type: 'ereror',
                            duration:'1500',
                        })
                    }
                })
            },
            handleTrailerAddUpdate(e){
                if(e.lang==''||e.lang==undefined||e.lang===null){
                    Message({
                        message:'请选择语言环境',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(e.frameRate==''||e.frameRate==undefined||e.frameRate===null){
                    Message({
                        message:'请选择语言环境',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(e.trailerName==''||e.trailerName==undefined||e.trailerName===null){
                    Message({
                        message:'请输入片花名称',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(e.trailerDesc==''||e.trailerDesc==undefined||e.trailerDesc===null){
                    Message({
                        message:'请输入片花描述',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                $('#addTrailer-file').click()
            },
            handleTrailerDelete(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    trailerDelete(e.id).then(res=>{
                        console.log('删除成功',res)
                        if(res.code==='0'){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.getTrailerList(this.id)
                        }else{
                            Message({
                                message:res.message,
                                type: 'ereror',
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


            languageSelect(){
                languageSelect().then(res=>{
                    console.log('获取语言环境列表：',res)
                    if(res.code==='0'){
                        let arr = []
                        let arr1=[]
                        for(let i in res.data.languageCtoModelList){
                            arr.push({
                                value:res.data.languageCtoModelList[i].lang,
                                label:res.data.languageCtoModelList[i].name,
                                languageType:res.data.languageCtoModelList[i].languageType,
                            })
                            arr1.push({
                                lang:res.data.languageCtoModelList[i].name,
                                actorIdsOptions:[{}],
                                actorIds:[],
                            })
                        }
                        this.addDescriptionList = [{
                                langOptions:arr,
                                lang:'',
                                name:'',
                                des:''
                            }]
                        this.addPerformerList = arr1
                        this.AddtrailerListCtoModelList[0].langOptions = arr
                        this.addSubtitleList = [{
                                langOptions:arr,
                                lang:'',
                                type:0,
                                typeOptions:[
                                    {
                                        label:'app',
                                        value:0,
                                    },
                                    {
                                        label:'pc',
                                        value:1,
                                    }
                                ],
                            }]

                    }
                })
            },

            videoBaseEditFun(data,obj){
                for(let i in  obj){
                    data[i] = obj[i]
                }
                if(!!data.fileId){
                    videoBaseEdit(data.typeName, data.episode, data.genreName, data.posterUrl, data.frameRate,
                        data.blackAreaShortName, data.isShow, data.isNew, data.isVip, data.status, data.isRecommend,
                        data.resourceUrl, data.scores, data.fileSize, data.limitLevel, data.actorIds, data.total,
                        data.parentId, data.id,data.fileId,data.coverPhotoUrl,data.backPhotoUrl).then(res=>{
                        console.log('修改视频信息',res)
                        if(res.code==='0'){
                            this.getVideoBaseDetails(this.id)
                            Message({message:'修改成功', type: 'success', duration:'1500'})
                        }else{
                            Message({message:res.message, type: 'error', duration:'1500'})
                        }
                    })
                }else{
                    Message({message:'fileId错误', type: 'error', duration:'1500'})
                }
            },
            framerateAddUpdate(videoBaseId,resourceUrl,frameRate,fileSize,id,fileId){
                framerateAddUpdate(videoBaseId,resourceUrl,frameRate,fileSize,id,fileId).then(res=>{
                    console.log('添加视频帧率',res)
                    if(res.code==='0'){
                        this.getFramerateList(this.id)
                        this.addFramerateList[0].frameRate = ''
                        Message({message:'添加成功', type: 'success', duration:'1500'})

                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .wrapper{
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        /*overflow: hidden;*/
        /*border: 1px solid red;*/
        box-sizing: border-box;
        right: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        .content{
            box-sizing: border-box;
        }
    }

    .row{
        margin-bottom: 20px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .coverPhotoUrl{
        display: block;
        width: 200px;
        img{
            width: 100%;
        }
    }
    .backPhotoUrl,.posterUrl{
        display: block;
        width: 100px;
        img{
            width: 100%;
        }
    }
    .flex{
        display: flex;
        align-items: center;
    }
    .button{
        width: 200px;
    }
</style>
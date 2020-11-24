<template>
    <div class="videoDetails">
        <div class="wrapper">
            <div class="content">
                <Breadcrumb :breadcrumb="breadcrumb"/>
                <section class="box">
                    <UgcUploader @uploaderInfo="onUploaderInfo"/>
                    <ImgUploader @imgUploader="onImgUploader"/>
                    <SubtitleUploader @subtitleUploader="onSubtitleUploader"/>
                    <div class="row">
                        <div class="button">
                            <el-button type="primary" @click="emit('uploadVideo','changeVideo')">修改视频</el-button>
                        </div>
                        <p>{{data.resourceUrl}}</p>
                    </div>
                    <div class="row">
                        <div class="button">
                            <el-button type="primary" @click="emit('uploadVideo','addTrailer')">新增片花</el-button>
                        </div>
                        <p>{{trailerUrl}}</p>
                    </div>
                    <div>
                        <el-table :data="addSubtitleList" style="width: 100%">
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button  type="primary" @click="addPosterUrl(scope.row)">新增封面</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column  label="语言环境" width="150">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.lang" placeholder="请选择">
                                        <el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-table :data="videoPosterCtoModelList" style="width: 100%">
                            <el-table-column  prop="lang" label="语言环境" width="200"></el-table-column>
                            <el-table-column  label="封面" width="200">
                                <template slot-scope="scope">
                                    <span class="posterUrl"><img :src="scope.row.posterUrl" alt=""></span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="deletePoster(scope.row)">删除封面</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="row">
                        <div class="button">
                            <el-button type="primary" @click="emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})">修改横向封面</el-button>
                        </div>
                        <span class="coverPhotoUrl"><img :src="data.coverPhotoUrl" alt=""></span>
                    </div>
                    <div class="row">
                        <div class="button">
                            <el-button type="primary" @click="emit('uploadImg',{name:'backPhotoUrl',type:'vidfish:back:photo',})">修改背景</el-button>
                        </div>
                        <span class="backPhotoUrl"><img :src="data.backPhotoUrl" alt=""></span>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{genreName:genreName.join(',')})">修改类型</el-button></div>
                        <el-select v-model="genreName" filterable multiple placeholder="请选择">
                            <el-option
                                    v-for="item in genreNameOptions"
                                    :key="item.type"
                                    :label="item.name"
                                    :value="item.type">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{limitLevel:limitLevel})">修改限制等级</el-button></div>
                        <el-select v-model="limitLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in limitLevelOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{blackAreaShortName:delteAllE(blackAreaShortName)})">修改不可见地区</el-button></div>
                        <BlackAreaShortName @blackAreaShortName="onBlackAreaShortName" :blackAreaShortName="blackAreaShortName" />
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{'isNew':isNew})">修改新视频</el-button></div>
                        <el-radio v-model="isNew" label="0">是</el-radio>
                        <el-radio v-model="isNew" label="1">否</el-radio>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{'isVip':isVip})">修改vip资源</el-button></div>
                        <el-radio v-model="isVip" label="0">是</el-radio>
                        <el-radio v-model="isVip" label="1">否</el-radio>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" @click="videoBaseEditFun(data,{'isRecommend':isRecommend})">修改热点推荐</el-button></div>
                        <el-radio v-model="isRecommend" label="0">是</el-radio>
                        <el-radio v-model="isRecommend" label="1">否</el-radio>
                    </div>
                    <div class="row">
                        <div class="button"><el-button type="primary" disabled>修改是否添加水印</el-button></div>
                        <el-radio v-model="isWater" label="0" disabled>是</el-radio>
                        <el-radio v-model="isWater" label="1" disabled>否</el-radio>
                    </div>
                    <div class="row flex">
                        <div class="button">
                            <el-button type="primary">fileId</el-button>
                        </div>
                        <p>{{data.fileId}}</p>
                    </div>
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item name="1">
                            <template slot="title"><el-button type="primary">电影名称及描述</el-button></template>
                            <div>
                                <el-table :data="addDescriptionList" style="width: 100%">
                                    <el-table-column  label="语言环境" width="150">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.lang" placeholder="请选择">
                                                <el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="电影名称" width="300">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="电影描述">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.des" placeholder="请输入内容"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="handleAddDescriptionList(scope.row)">添加</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-table :data="descriptionList" style="width: 100%">
                                    <el-table-column  prop="lang" label="语言环境" width="150"></el-table-column>
                                    <el-table-column  label="电影名称" width="300">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.movieName" placeholder="请输入内容"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="电影描述">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.description" placeholder="请输入内容"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="descriptionListAmend(scope.row)">修改</el-button>
                                            <el-button size="mini" type="danger" @click="descriptionListDelete(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template slot="title"><el-button type="primary">主演</el-button></template>
                            <div>
                                <el-table :data="addPerformerList" style="width: 100%">
                                    <el-table-column  label="语言环境" width="150" prop="lang"></el-table-column>
                                    <el-table-column  label="主演名称">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.actorIds" filterable multiple placeholder="请选择">
                                                <el-option
                                                        v-for="item in scope.row.actorIdsOptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="videoBaseEditFun(data,{'actorIds':performer()})">修改</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item name="3">
                            <template slot="title"><el-button type="primary">栏目</el-button></template>
                            <div>
                                <el-table :data="itemIdsList" style="width: 100%">
                                    <el-table-column label="语言环境" width="150">
                                        <template slot-scope="scope">
                                            {{scope.row.lang | langToNameA}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="栏目名称" width="360">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.itemIds" filterable multiple placeholder="请选择" style="width: 350px;">
                                                <el-option
                                                        v-for="item in scope.row.itemIdsOptions"
                                                        :key="item.indicate"
                                                        :label="item.name"
                                                        :value="item.indicate">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="videoBaseEditFun(data,{'itemIds':itemIdsFun()})">修改</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>

                        <!--<el-collapse-item name="4">-->
                            <!--<template slot="title"><el-button type="primary">片花</el-button></template>-->
                            <!--<div>-->
                                <!--<el-table :data="AddtrailerListCtoModelList" style="width: 100%">-->
                                    <!--<el-table-column label="语言环境" width="150">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-select v-model="scope.row.lang" placeholder="请选择">-->
                                                <!--<el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column label="片花帧率" width="150">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-select v-model="scope.row.frameRate" placeholder="请选择">-->
                                                <!--<el-option v-for="item in scope.row.frameRateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column label="片花名称" width="300">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-input v-model="scope.row.trailerName" placeholder="请输入内容"></el-input>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column label="片花描述">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-input v-model="scope.row.trailerDesc" placeholder="请输入内容"></el-input>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column label="操作" width="100">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-button size="mini" type="primary" @click="addTrailerAddUpdate(scope.row)">新增</el-button>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                <!--</el-table>-->

                                <!--<el-table :data="trailerListCtoModelList" style="width: 100%">-->
                                    <!--<el-table-column label="语言环境" width="150" prop="lang"></el-table-column>-->
                                    <!--<el-table-column label="片花帧率" width="150" prop="frameRate"></el-table-column>-->
                                    <!--<el-table-column label="片花名称" width="300" prop="trailerName"></el-table-column>-->
                                    <!--<el-table-column label="片花描述" prop="trailerDesc"></el-table-column>-->

                                    <!--<el-table-column label="操作" width="100">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-button size="mini" type="danger" @click="
                                            (scope.row)">删除</el-button>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                <!--</el-table>-->
                            <!--</div>-->
                        <!--</el-collapse-item>-->

                        <el-collapse-item name="5">
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
                                            <el-button size='mini' type="primary" @click="subtitleUpload(scope.row)">上传字幕</el-button>
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
                                            <el-button type="danger" @click="subtitleDelete(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>

                        <el-collapse-item name="6">
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
                                        <el-button size="mini" type="primary" @click="framerateListAdd(scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table :data="framerateList" style="width: 100%">
                                <el-table-column  prop="frameRate" label="视频帧率" ></el-table-column>

                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger" @click="framerateListDelete(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>



                    </el-collapse>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import {jq} from "../../plugins/jquery";jq()
    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,MessageBox} from 'element-ui';
    import {videoBaseEdit,movieAddUpdate,movieDelete,videoBaseDetails,performerList,framerateList,posterAddUpdate,posterDelete,
        framerateDelete,subtitleList,subtitleDelete,trailerList,trailerAddUpdate, trailerDelete,subtitleAddUpdate,
    framerateAddUpdate,itemList} from "../../service/api";
    import {getSessionStore} from "../../storage";
    import {limitLevelOptions,frameRateOptions} from "../../assets/config/tool";
    import UgcUploader from '../../components/upload/UgcUploader'
    import ImgUploader from '../../components/upload/ImgUploader'
    import SubtitleUploader from '../../components/upload/SubtitleUploader'
    import {bus} from "../../assets/config/eventBus";
    import BlackAreaShortName from '../../components/content/BlackAreaShortName'

    export default {
        components:{Breadcrumb,UgcUploader,ImgUploader,SubtitleUploader,BlackAreaShortName},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/videoManage',
                        name:'电影管理'
                    },
                    {
                        path:'/videoDetails',
                        name:'电影详情'
                    },
                ],
                isBlackAreaShortName:false,
                id:'',
                data:{},
                descriptionList:[],
                genreName:'',
                limitLevelOptions: limitLevelOptions,
                limitLevel:'',
                scores:'',
                blackAreaShortName:[],
                blackAreaShortNameOptions: [],
                isShow:'',
                isNew:'',
                isVip:'',
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
                isSelecteAll:false,
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
                isLast:0,

                languageCtoModelList:[],
                videoPosterCtoModelList:[],
                itemIdsList:[],
                trailerUrl:'',
                trailerId:'',
                isWater:'',
            }
        },

        created:function(){
            this.id = this.$route.params.id
            this.getFramerateList(this.id)
            this.getSubtitleList(this.id,null)
            this.getTrailerList(this.id)

            this.breadcrumb=[{path:'/index', name:'首页'},
                {path:'/videoManage', name:'电影管理'},
                {path:'/videoDetails/'+this.id, name:'电影详情'}]
            this.languageCtoModelList = JSON.parse(getSessionStore('languageCtoModelList'))
            let arr = []
            let arr1=[]
            for(let i in this.languageCtoModelList){
               this.getPerformerList(this.languageCtoModelList[i].lang)
               arr.push({
                   value:this.languageCtoModelList[i].lang,
                   label:this.languageCtoModelList[i].name,
                   languageType:this.languageCtoModelList[i].languageType,
               })
               arr1.push({
                   lang:this.languageCtoModelList[i].name,
                   value:this.languageCtoModelList[i].lang,
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
            this.getVideoBaseDetails(this.id)

            this.genreNameOptions = JSON.parse(getSessionStore('videoGenreCtoModelList'))
            this.blackAreaShortNameOptions =JSON.parse(getSessionStore('contryNameCtoModelList'))


        },
        methods: {
            addPosterUrl(item){
                if(!!item.lang){
                    this.emit('uploadImg',{name:'posterUrl',lang:item.lang,type:'vidfish:poster'})
                }else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500'})
                }
            },
            deletePoster(item){
                posterDelete(item.id).then(res=>{
                    console.log('删除海报：',res)
                    if(res.code==0){
                        this.getVideoBaseDetails(this.id)
                        Message({message:'删除成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            },
            descriptionListAmend(e){
                movieAddUpdate(this.id, e.movieName, e.description, e.id,e.lang).then(res=>{
                    console.log('修改电影详情',res)
                    if(res.code==='0'){
                        Message({message:'修改成功', type: 'success', duration:'1500'})
                        this.getVideoBaseDetails(this.id)
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            },
            descriptionListDelete(e){
                if(e.id==''||e.id==undefined||e.id===null){return}
                movieDelete(e.id).then(res=>{
                    console.log('删除电影详情',res)
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

            onBlackAreaShortName(blackAreaShortName){
                this.blackAreaShortName=blackAreaShortName
            },
            addTrailerAddUpdate(e){
                if(!!e.lang&&!!e.frameRate&&!!e.trailerName&&!!e.trailerDesc){
                    this.emit('uploadVideo','addTrailer')
                }else{
                    Message({
                        message:'内容不全',
                        type: 'error',
                        duration:'1500',
                    })
                }

            },
            trailerDelete(e){
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
            subtitleUpload(){
                if(!!this.addSubtitleList[0].lang){
                    this.emit('addSubtitle')
                }else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500',})
                }
            },
            subtitleDelete(e){
                subtitleDelete(e.id).then(res=>{
                    console.log('删除字幕',res)
                    if(res.code==='0'){
                        this.getSubtitleList(this.id,null)
                        Message({message:'删除成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:res.message, type: 'ereror', duration:'1500'})
                    }
                })
            },
            framerateListAdd(){
                if(this.addFramerateList[0].frameRate.length=='0'){
                    Message({message:'请选择视频帧率', type: 'error', duration:'1500',})
                }else{
                    this.emit('uploadVideo','addFramerate')
                }
            },
            framerateListDelete(e){
                framerateDelete(e.id).then(res=>{
                    console.log('删除帧率',res)
                    if(res.code==='0'){
                        this.getFramerateList(this.id)
                        Message({message:'删除成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
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


            selectAll(e){
                let arr = []
                for(let i in e){arr.push(e[i].value)}
                return arr
            },
            delteAllE(e){
                let arr = []
                for(let i in e){if(e[i]!='ALL'){arr.push(e[i])}}
                return arr.join(',')
            },
            performer(){
                let actorIds = []
                for(let i in this.addPerformerList){
                    actorIds = [...actorIds,...this.addPerformerList[i].actorIds]
                }
                actorIds = actorIds.join()
                return actorIds
            },
            itemIdsFun(){
                var itemIds=[]
                for(let i in this.itemIdsList){
                    itemIds=[...itemIds,...this.itemIdsList[i].itemIds]
                }
                itemIds=itemIds.join()
                return itemIds
            },
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
                    if(type=='addTrailer'){
                        console.log('111',info.fileId)
                        this.trailerAddUpdate(this.id, null, info.videoUrl, null, null,null, null,this.trailerId,info.fileId)
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
            posterAddUpdate(videoBaseId,posterUrl,createTime,updateTime,lang,id){
                posterAddUpdate(videoBaseId,posterUrl,createTime,updateTime,lang,id).then(res=>{
                    console.log('保存/更新海报:',res)
                    if(res.code==0){
                        Message({message:'修改成功', type: 'success', duration:'1500'})
                        this.getVideoBaseDetails(this.id)
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
                    }
                })
            },
            trailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc,id,fileId){
                trailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc,id,fileId).then(res=>{
                    console.log('新增/修改片花',res)
                    if(res.code==='0'){
                        this.getTrailerList(this.id)
                        Message({message:'上传成功', type: 'success', duration:'1500',})
                    }else{
                        Message({message:res.message, type: 'error', duration:'1500'})
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
                        data.parentId, data.id,data.fileId,data.coverPhotoUrl,data.backPhotoUrl,data.itemIds).then(res=>{
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

            getVideoBaseDetails(id){
                videoBaseDetails(id).then(res=>{
                    console.log('电影详情',res)
                    if(res.code==='0'){
                        this.data = res.data
                        this.descriptionList = res.data.movieDetailsListCtoModel.movieDetailsCtoModelList
                        this.limitLevel = res.data.limitLevel
                        this.scores = res.data.scores
                        this.isShow = res.data.isShow.toString()
                        this.isNew = res.data.isNew.toString()
                        this.isVip = res.data.isVip.toString()
                        this.isWater = res.data.isWater.toString()
                        this.isRecommend = res.data.isRecommend.toString()
                        this.videoPosterCtoModelList = res.data.videoPosterListCtoModel.videoPosterCtoModelList
                        this.genreName = res.data.genreName.split(',')

                        if(!!res.data.blackAreaShortName){
                            this.blackAreaShortName = res.data.blackAreaShortName.split(',')
                        }else{
                            this.blackAreaShortName=[]
                        }
                        if(this.blackAreaShortName.length=='228'){
                            this.blackAreaShortName = [...['ALL'],...this.blackAreaShortName]
                        }
                        this.isBlackAreaShortName=true
                        let arr0 = []
                        let index=0
                        let asyncFun = ()=>{
                            if(this.isLast==this.addPerformerList.length&&this.isLast!=0){
                                if(!!res.data.performerCtoModelList){
                                    for(let i in this.addPerformerList){
                                        let arr = res.data.performerCtoModelList[i]
                                        for(let j in arr){
                                            if(this.addPerformerList[i].value==j){
                                                let arro = []
                                                for(let o in arr[j]){
                                                    arro.push(arr[j][o].id)

                                                    arr0.push(arr[j][o].id)
                                                }
                                                this.addPerformerList[i].actorIds = arro
                                            }


                                        }
                                    }
                                    this.data.actorIds = arr0.join()
                                }
                            }else{
                                setTimeout(()=>{
                                    if(index==100){return}
                                    index++
                                    asyncFun()
                                },100)
                            }
                        }
                        asyncFun()

                        this.itemIdsList=[]
                        var videoItemCtoModelList=JSON.parse(getSessionStore('videoItemCtoModelList'))
                        var itemIdsList = !!res.data.videoItemCtoModelList?res.data.videoItemCtoModelList:[]
                        var itemIdsListC=[]
                        var getId=(arr)=>{
                            var arr0=[]
                            for(let i in arr){
                                arr0.push(arr[i].indicate)
                            }
                            return arr0
                        }
                        for(let i in itemIdsList){
                            itemIdsListC[Object.keys(itemIdsList[i])]=getId(itemIdsList[i][Object.keys(itemIdsList[i])])
                        }

                        for(let i in videoItemCtoModelList){
                            this.itemIdsList.push({
                                itemIds:!!itemIdsListC[i]?itemIdsListC[i]:[],
                                itemIdsOptions:videoItemCtoModelList[i],
                                lang:i
                            })
                        }


                    }
                })
            },
            getPerformerList(lang){
                performerList(null,lang,'1',null,null).then(res=>{
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
                        for(let i in this.addPerformerList){
                            if(this.addPerformerList[i].value==lang){
                                this.addPerformerList[i].actorIdsOptions = arr1
                            }
                        }
                        this.isLast++

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
                        if(res.data.trailerListCtoModelList.length>0){
                            this.trailerUrl = res.data.trailerListCtoModelList[0].resourceUrl
                            this.trailerId = res.data.trailerListCtoModelList[0].id
                        }
                    }
                })
            },
            handleAddDescriptionList(e){
                if(e.name==''||e.name==undefined||e.name===null||e.des==''||e.des==undefined||e.des===null||e.lang==''||e.lang==undefined||e.lang===null){return}
                movieAddUpdate(this.id, e.name, e.des, null,e.lang).then(res=>{
                    console.log('添加电影详情',res)
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
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper{
        position: absolute;
        top:0;
        left:0;
        bottom: 0;
        overflow: hidden;
        box-sizing: border-box;
        right: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        .content{
            box-sizing: border-box;
            .box{
                margin-top: 20px;
                width: 100%;
                box-sizing: border-box;
                padding:0 15px;
                .row{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    .button{
                        width: 200px;
                    }
                    .url{
                        display: flex;
                        align-items: center;
                        height: 40px;
                        line-height: 1.5;
                        word-wrap:break-word;
                        word-break:break-all;
                    }
                    .coverPhotoUrl{
                        display: block;
                        width: 200px;
                        img{
                            width: 100%;
                        }
                    }
                    .backPhotoUrl{
                        display: block;
                        width: 100px;
                        img{
                            width: 100%;
                        }
                    }
                }
                .posterUrl{
                    display: block;
                    width: 100px;
                    img{
                        width: 100%;
                    }
                }
            }

        }
    }


</style>

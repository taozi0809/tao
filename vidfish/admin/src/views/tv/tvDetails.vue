<template>
    <div class="tvDetails">
        <div class="wrapper">
            <div class="content">
                <Breadcrumb :breadcrumb="breadcrumb"/>
                <UgcUploader @uploaderInfo="onUploaderInfo"/>
                <ImgUploader @imgUploader="onImgUploader"/>
                <div class="video-list">
                    <el-tabs v-model="activeName" type="card" @tab-click="onTab">
                        <el-tab-pane label="基本信息" name="first">
                            <div class="row">
                                <el-table :data="AddtrailerListCtoModelList" style="width: 100%">
                                    <el-table-column  label="语言环境" width="200">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.lang" placeholder="请选择">
                                                <el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button type="primary" @click="addPosterUrl(scope.row)">新增封面</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-table :data="videoPosterCtoModelList" style="width: 100%">
                                    <el-table-column  prop="lang" label="语言环境" width="150"></el-table-column>
                                    <el-table-column  label="封面" width="300">
                                        <template slot-scope="scope">
                                            <span class="posterUrl"><img :src="scope.row.posterUrl" alt=""></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <!--<el-button size="mini" type="primary" @click="handleChangePoster(scope.row)">修改</el-button>-->
                                            <el-button size="mini" type="danger" @click="handleDeletePoster(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="emit('uploadImg',{name:'coverPhotoUrl',type:'vidfish:cover'})">修改横向封面</el-button>
                                </div>
                                <span class="coverPhotoUrl"><img :src="data.coverPhotoUrl" alt=""></span>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="emit('uploadImg',{name:'backPhotoUrl',type:'vidfish:back:photo'})">修改背景</el-button>
                                </div>
                                <span class="backPhotoUrl"><img :src="data.backPhotoUrl" alt=""></span>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="emit('uploadVideo','addTrailer')">新增片花</el-button>
                                </div>
                                <span class="backPhotoUrl">{{trailerUrl}}</span>
                            </div>
                            <div class="row">
                                <el-collapse accordion>
                                    <el-collapse-item name="1">
                                        <template slot="title"><el-button type="primary">电视剧名称及描述</el-button></template>
                                        <div>
                                            <el-table :data="addDescriptionList" style="width: 100%">
                                                <el-table-column  label="语言环境" width="150">
                                                    <template slot-scope="scope">
                                                        <el-select v-model="scope.row.lang" placeholder="请选择">
                                                            <el-option v-for="item in scope.row.langOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                                        </el-select>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column  label="电视剧名称" width="300">
                                                    <template slot-scope="scope">
                                                        <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="电视剧描述">
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
                                                <el-table-column  label="电视剧名称" width="300">
                                                    <template slot-scope="scope">
                                                        <el-input v-model="scope.row.dramaName" placeholder="请输入内容"></el-input>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="电视剧描述">
                                                    <template slot-scope="scope">
                                                        <el-input v-model="scope.row.description" placeholder="请输入内容"></el-input>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="操作" width="200">
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="primary" @click="handleDescriptionListAmend(scope.row)">修改</el-button>
                                                        <el-button size="mini" type="danger" @click="handleDescriptionListDelete(scope.row)">删除</el-button>
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
                                                        <!--<el-button size="mini" type="primary" @click="handleAddPerformer(scope.row)">修改</el-button>-->
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
                                </el-collapse>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{genreName:genreName.join()})">修改类型</el-button>
                                </div>
                                <el-select v-model="genreName" filterable multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in genreNameOptions"
                                            :key="item.type"
                                            :label="item.name"
                                            :value="item.type">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{limitLevel:limitLevel})">修改限制等级</el-button>
                                </div>
                                <el-select v-model="limitLevel" placeholder="请选择">
                                    <el-option
                                            v-for="item in limitLevelOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="row flex">
                                <div class="button">

                                </div>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{total:total})">修改总集数</el-button>
                                </div>
                                <el-input v-model.number="total" style="width: 220px;"></el-input>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{blackAreaShortName:delteAllE(blackAreaShortName).join()})">修改不可见地区</el-button>
                                </div>
                                <el-select v-model="blackAreaShortName" filterable multiple collapse-tags placeholder="请选择" @change="onChangeBlackAreaShortName">
                                    <el-option
                                            v-for="item in blackAreaShortNameOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{isNew:isNew})">修改新视频</el-button>
                                </div>
                                <el-radio v-model="isNew" label="0">是</el-radio>
                                <el-radio v-model="isNew" label="1">否</el-radio>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{isVip:isVip})">修改vip资源</el-button>
                                </div>
                                <el-radio v-model="isVip" label="0">是</el-radio>
                                <el-radio v-model="isVip" label="1">否</el-radio>
                            </div>
                            <div class="row flex">
                                <div class="button">
                                    <el-button type="primary" @click="videoBaseEditFun(data,{isRecommend:isRecommend})">修改热点推荐</el-button>
                                </div>
                                <el-radio v-model="isRecommend" label="0">是</el-radio>
                                <el-radio v-model="isRecommend" label="1">否</el-radio>
                            </div>
                            <!--<div class="row">-->
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
                                            <!--<el-button size="mini" type="primary" @click="handleTrailerAddUpdate(scope.row)" :loading="loading">新增片花</el-button>-->
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
                                            <!--<el-button size="mini" type="danger" @click="handleTrailerDelete(scope.row)">删除</el-button>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                <!--</el-table>-->
                            <!--</div>-->
                        </el-tab-pane>
                        <el-tab-pane label="分集列表" name="second">
                            <el-table :data="videoBaseCtoModelList" style="width: 100%" height="600">
                                    <el-table-column label="第几集">
                                        <template slot-scope="scope">
                                            <p>{{'第 '+scope.row.episode+' 集'}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="是否热门">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.isRecommend | isFilter}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="是否VIP" >
                                        <template slot-scope="scope">
                                            <p>{{scope.row.isVip | isFilter}}</p>
                                        </template>
                                    </el-table-column>
                                <el-table-column label="是否展示" >
                                    <template slot-scope="scope">
                                        <p>{{scope.row.isShow | isFilter}}</p>
                                    </template>
                                </el-table-column>
                                    <el-table-column label="下载次数" >
                                        <template slot-scope="scope">
                                            <p>{{scope.row.downloadTimes | timesFilter}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="播放次数" >
                                        <template slot-scope="scope">
                                            <p>{{scope.row.playTimes | timesFilter}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="收藏次数" >
                                        <template slot-scope="scope">
                                            <p>{{scope.row.likeTimes | timesFilter}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="点击率" >
                                        <template slot-scope="scope">
                                            <p>{{scope.row.clickTimes | timesFilter}}</p>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="scores" label="分数" ></el-table-column>
                                    <el-table-column prop="frameRate" label="帧率" ></el-table-column>
                                    <el-table-column prop="limitLevel" label="限制等级" ></el-table-column>
                                    <el-table-column label="更新时间" min-width="150">
                                        <template slot-scope="scope">
                                            <p>{{scope.row.updateTime | timestampToTime}}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" fixed="right" min-width="150">
                                        <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="handleToDetails(scope.row)">详情</el-button>
                                            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :pageSize="pageSize"
                                            :current-page.sync="pageSum" @current-change="handleChangePage"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="添加子集" name="third"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {videoBaseDetails,dramaList,videoBaseDelete,videoBaseEdit,genreList,contrynameList,dramaAddUpdate,dramaDelete,
        performerList,languageSelect,trailerList, trailerAddUpdate,trailerDelete,posterAddUpdate,posterDelete} from "../../service/api";
    import { Message,MessageBox} from 'element-ui';
    import UgcUploader from '../../components/upload/UgcUploader'
    import ImgUploader from '../../components/upload/ImgUploader'
    import SubtitleUploader from '../../components/upload/SubtitleUploader'
    import {bus} from "../../assets/config/eventBus";
    import {getSessionStore} from "../../storage";
    import {limitLevelOptions,frameRateOptions} from "../../assets/config/tool";

    export default {
        components:{Breadcrumb,UgcUploader,ImgUploader,SubtitleUploader},
        data(){
            return{
                countNum:0,
                id:'',
                videoBaseCtoModelList:[],
                pageSum:1,
                pageSize:100,
                activeName:'first',

                data:{},
                genreName:'',
                limitLevelOptions:limitLevelOptions,
                limitLevel:'',
                scores:'',
                blackAreaShortName:'',
                blackAreaShortNameOptions: [],
                isShow:'',
                isNew:'',
                isVip:'',
                isRecommend:'',
                total:'',
                isSelecteAll:false,
                addDescriptionList:[],
                descriptionList:[],
                performerList:[],
                addPerformerList:[],
                isLast:0,
                AddtrailerListCtoModelList:[
                    {
                        lang:'',
                        langOptions:[],
                        frameRate:'',
                        frameRateOptions:frameRateOptions,
                        trailerName:'',
                        trailerDesc:'',
                    }
                ],
                trailerListCtoModelList:[],
                activeName1: '0',

                videoPosterCtoModelList:[],
                posterUrlLang:'',
                posterId:-1,
                loading:false,

                itemIdsList:[],
                trailerUrl:'',
                trailerId:'',
            }
        },
        created:function(){
            this.id = this.$route.params.id
            this.breadcrumb = [{path:'/index', name:'首页'},
                {path:'/tvManage',name:'电视剧管理'},
                {path:'/tvDetails/'+this.id, name:'电视剧详情'},
            ]
            this.languageSelect()
            this.getVideoBaseDetails(this.id)
            this.getDramaList(this.id,this.pageSum,this.pageSize)
            this.getTrailerList(this.id)

            this.genreNameOptions = JSON.parse(getSessionStore('videoGenreCtoModelList'))

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
                    let arr0 = [{
                        value:'ALL',
                        label:'ALL'
                    }]
                    arr1 = [...arr0,...arr1]
                    this.blackAreaShortNameOptions = arr1
                }
            })

            if(!!this.$route.query.activeName){
                this.activeName=this.$route.query.activeName
            }

        },
        methods:{
            onTab(){
              if(this.activeName=='third'){
                  this.$router.push({
                      name:'addTvs',
                      params:{
                          id:this.id,
                      },
                  })
              }
            },
            emit(name,data){
                bus.$emit(name,data)
            },
            onUploaderInfo(info,type){
                // if(info.isVideoUploadSuccess){
                //     this.changeTrailerAddUpdate(this.id, type.trailerName, info.videoUrl, null, null, type.frameRate, type.trailerDesc, type.lang, null,info.fileId)
                // }
                if(type=='addTrailer'){
                    this.trailerAddUpdate(this.id, null, info.videoUrl, null, null,null, null,this.trailerId,info.fileId)
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

            onChangeBlackAreaShortName(){
                if(this.isSelecteAll){
                    if(this.blackAreaShortName.find((value)=>{if(value==='ALL'){return  true}})==='ALL'){}else{
                        this.isSelecteAll = false
                        this.blackAreaShortName = []
                    }
                    if(this.blackAreaShortName.length<229){
                        this.blackAreaShortName = this.delteAllE(this.blackAreaShortName)
                        this.isSelecteAll = false
                    }
                }else{
                    if(this.blackAreaShortName.find((value)=>{if(value==='ALL'){return  true}})==='ALL'|| this.blackAreaShortName.length=='228'){
                        this.isSelecteAll = true
                        this.blackAreaShortName = this.selectAll(this.blackAreaShortNameOptions)
                    }
                }
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
            getDramaList(parentId,pageNum,pageSize){
                dramaList(parentId,pageNum,pageSize).then(res=>{
                    console.log('电视剧列表',res)
                    if(res.code==='0'){
                        this.countNum = res.data.countNum
                        this.videoBaseCtoModelList = res.data.videoBaseCtoModelList
                    }
                })
            },
            getVideoBaseDetails(id){
                videoBaseDetails(id).then(res=>{
                    console.log('电视剧详情',res)
                    if(res.code==='0'){
                        this.data = res.data
                        this.data.parentId = '0'
                        this.limitLevel = res.data.limitLevel
                        this.scores = res.data.scores
                        this.total = res.data.total



                        this.isShow = res.data.isShow.toString()
                        this.isNew = res.data.isNew.toString()
                        this.isVip = res.data.isVip.toString()
                        this.isRecommend = res.data.isRecommend.toString()
                        this.descriptionList = res.data.dramaDetailsListCtoModel.detailsCtoModelList

                        this.videoPosterCtoModelList = res.data.videoPosterListCtoModel.videoPosterCtoModelList


                        // this.genreName = JSON.parse(res.data.genreName)
                        // if(res.data.blackAreaShortName==''){
                        //     this.blackAreaShortName=[]
                        // }else{
                        //     this.blackAreaShortName = JSON.parse(res.data.blackAreaShortName)
                        // }
                        // if(this.blackAreaShortName.length=='228'){
                        //     this.blackAreaShortName = [...['ALL'],...this.blackAreaShortName]
                        // }
                        // this.isBlackAreaShortName=true


                        this.genreName = res.data.genreName.split(',')
                        this.blackAreaShortName = res.data.blackAreaShortName.split(",")
                        if(this.blackAreaShortName.length=='228'){
                            this.blackAreaShortName = [...['ALL'],...this.blackAreaShortName]
                        }

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
                            // console.log(itemIdsList[i][Object.keys(itemIdsList[i])])
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

            addPosterUrl(item){
                if(!!item.lang){
                    this.emit('uploadImg',{name:'posterUrl',lang:item.lang,type:'vidfish:poster'})
                }else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500'})
                }
            },
            handleDeletePoster(item){
                posterDelete(item.id).then(res=>{
                    console.log('删除海报：',res)
                    if(res.code==0){
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
            handleTrailerAddUpdate(e){
                if(!!e.lang){}else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500'})
                    return
                }
                if(!!e.frameRate){}else{
                    Message({message:'请选择语言环境', type: 'error', duration:'1500'})
                    return
                }
                if(!!e.trailerName){}else{
                    Message({message:'请输入片花名称', type: 'error', duration:'1500'})
                    return
                }
                if(!!e.trailerDesc){}else{
                    Message({message:'请输入片花描述', type: 'error', duration:'1500'})
                    return
                }
                this.loading=true
                this.emit('uploadVideo',{lang:e.lang,frameRate:e.frameRate,trailerName:e.trailerName,trailerDesc:e.trailerDesc})

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

            handleToDetails(e){
                // console.log(e)
                this.$router.push({
                    name:'tvDetailsSon',
                    params:{
                        id:e.id,
                        parentId:this.id,
                        coverPhotoUrl:e.coverPhotoUrl,
                        backPhotoUrl:e.backPhotoUrl
                    },
                })
            },
            handleDelete(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    videoBaseDelete(e).then(res=>{
                        console.log('删除电视剧子集',res)
                        if(res.code==='0'){
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
                            this.getDramaList(this.id,this.pageSum,this.pageSize)
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
            handleChangePage(){
                this.getDramaList(this.id,this.pageSum,this.pageSize)
            },
            handleAddDescriptionList(e){
                if(e.name==''||e.name==undefined||e.name===null||e.des==''||e.des==undefined||e.des===null||e.lang==''||e.lang==undefined||e.lang===null){return}
                dramaAddUpdate( e.name, e.des, this.id,null,e.lang).then(res=>{
                    console.log('添加电视剧详情',res)
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
                dramaAddUpdate( e.dramaName, e.description, this.id,e.id,e.lang).then(res=>{
                    console.log('修改电视剧详情',res)
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
            performer(){
                let actorIds =  []
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
            selectAll(e){
                let arr = []
                for(let i in e){arr.push(e[i].value)}
                return arr
            },
            delteAllE(e){
                let arr = []
                for(let i in e){if(e[i]!='ALL'){arr.push(e[i])}}
                return arr
            },
            languageSelect(){
                languageSelect().then(res=>{
                    console.log('获取语言环境列表：',res)
                    if(res.code==='0'){
                        let arr = []
                        let arr1 = []
                        for(let i in res.data.languageCtoModelList){
                            this.getPerformerList(res.data.languageCtoModelList[i].lang)
                            arr.push({
                                value:res.data.languageCtoModelList[i].lang,
                                label:res.data.languageCtoModelList[i].name
                            })
                            arr1.push({
                                lang:res.data.languageCtoModelList[i].name,
                                value:res.data.languageCtoModelList[i].lang,
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

                    }
                })
            },
            posterAddUpdate(videoBaseId,posterUrl,createTime,updateTime,lang,id){
                posterAddUpdate(videoBaseId,posterUrl,createTime,updateTime,lang,id).then(res=>{
                    console.log('保存/更新海报:',res)
                    if(res.code==0){
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
            // changeTrailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc, id,fileId){
            //     trailerAddUpdate(videoBaseId, trailerName, resourceUrl, status, fileSize, frameRate, trailerDesc, id,fileId).then(res=>{
            //         console.log('新增/修改片花',res)
            //         if(res.code==='0'){
            //             Message({message:'上传成功', type: 'success', duration:'1500'})
            //             this.getTrailerList(this.id)
            //             this.AddtrailerListCtoModelList[0].trailerName = ''
            //             this.AddtrailerListCtoModelList[0].frameRate = ''
            //             this.AddtrailerListCtoModelList[0].trailerDesc=''
            //             this.AddtrailerListCtoModelList[0].lang=''
            //         }else{
            //             Message({message:res.message, type: 'success', duration:'1500'})
            //         }
            //         this.loading=false
            //     })
            // },
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
                videoBaseEdit(data.typeName, data.episode, data.genreName, data.posterUrl, data.frameRate,
                    data.blackAreaShortName, 0, data.isNew, data.isVip, data.status, data.isRecommend,
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
            },

        }
    }
</script>

<style lang="scss" scoped>
    .tvDetails{
        position: relative;
        width: 100%;
        height: 100%;
        .wrapper{
            position:absolute;
            top:0;
            left:0;
            bottom: 10px;
            box-sizing: border-box;
            right: 0;
            overflow-y: scroll;
            overflow-x: hidden;
            .content{
                box-sizing: border-box;
                width: 100%;
                .video-head{
                    box-sizing: border-box;
                    padding: 0 10px;
                }
                .video-list{
                    width: 100%;
                    margin-top: 20px;
                    top:20px;
                    left:0;
                    box-sizing: border-box;
                    padding:0 10px;

                }
                .add-actor{
                    display: none;
                }
                .url{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    line-height: 1.5;
                    word-wrap:break-word;
                    word-break:break-all;
                }
                .el-row{
                    margin-top: 20px;
                }
                .el-form{
                    margin-top: 20px;
                }
            }
        }
        .row{
            margin-bottom: 20px;
        }
        .coverPhotoUrl{
            display: block;
            width: 200px;
            margin-left: 20px;
            img{
                width: 100%;
            }
        }
        .backPhotoUrl,.posterUrl{
            display: block;
            width: 100px;
            margin-left: 20px;
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

    }

</style>
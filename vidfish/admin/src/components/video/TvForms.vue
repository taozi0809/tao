<template>
    <div class="VideoForm">
        <el-form ref="form" :model="form" :rules="rules" label-position="left">
            <el-row :gutter="20">
                <!--<el-col :span="5">-->
                    <!--<el-form-item label="主演" prop="actorIds" class="zy-box">-->
                        <!--<div class="zy-lange">-->
                            <!--<el-radio v-model="radio" label="1">中文</el-radio>-->
                            <!--<el-radio v-model="radio" label="2">英文</el-radio>-->
                        <!--</div>-->
                        <!--<el-select v-model="form.actorIds" multiple placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in form.actorIdsOptions"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->

                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="3">-->
                    <!--<el-form-item label="类型" prop="generName">-->
                        <!--<el-select v-model="form.generName" multiple placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in form.generNameOptions"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="3">
                    <el-form-item label="帧率" prop="frameRate">
                        <el-select v-model="form.frameRate" placeholder="请选择">
                            <el-option
                                    v-for="item in form.frameRateOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="3">-->
                    <!--<el-form-item label="限制等级" prop="limitLevel">-->
                        <!--<el-select v-model="form.limitLevel" placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in form.limitLevelOptions"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="2">-->
                    <!--<el-form-item label="评分" prop="scores">-->
                        <!--<el-input v-model.number="form.scores" max="10" min="0" maxlength="3" minlength="0" @input="handleScoresChange"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="2">
                    <el-form-item label="第几集" prop="episode">
                        <el-input v-model.number="form.episode"  @input="onEpisodeChange"></el-input>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="2">-->
                    <!--<el-form-item label="总集数" prop="total">-->
                        <!--<el-input v-model.number="form.total" @input="onTotalChange"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="3">-->
                    <!--<el-form-item label="不可见地区">-->
                        <!--<el-select v-model="form.blackAreaShortName" multiple placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in form.blackAreaShortNameOptions"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            </el-row>
            <!--<el-form-item label="是否在app展示：" label-width="140px" prop="isShow">-->
                <!--<el-radio v-model="form.isShow" label="0">是</el-radio>-->
                <!--<el-radio v-model="form.isShow" label="1">否</el-radio>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否是新视频：" label-width="140px" prop="isNew">-->
                <!--<el-radio v-model="form.isNew" label="0">是</el-radio>-->
                <!--<el-radio v-model="form.isNew" label="1">否</el-radio>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否是vip资源：" label-width="140px" prop="isVip">-->
                <!--<el-radio v-model="form.isVip" label="0">是</el-radio>-->
                <!--<el-radio v-model="form.isVip" label="1">否</el-radio>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否热点推荐：" label-width="140px" prop="isRecommend">-->
                <!--<el-radio v-model="form.isRecommend" label="0">是</el-radio>-->
                <!--<el-radio v-model="form.isRecommend" label="1">否</el-radio>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {limitNumber} from "../../assets/config/tool";
    import {mapState, mapMutations} from 'vuex'
    import { Message } from 'element-ui';
    import {videoBaseAdd,performerList,genreList,contrynameList} from "../../service/api";

    export default {
        data(){
            return{
                radio: '1',
                form: {
                    generNameOptions: [],
                    generName: '',
                    episode:'',
                    total:'',
                    frameRateOptions: [{
                        value: '480',
                        label: '480'
                    }, {
                        value: '720',
                        label: '720'
                    },{
                        value: '1080',
                        label: '1080'
                    }],
                    frameRate:'',
                    limitLevelOptions: [{
                        value: 'G',
                        label: 'G级别'
                    }, {
                        value: 'PG',
                        label: 'PG级别'
                    },{
                        value: 'PG13',
                        label: 'PG13级别'
                    },{
                        value: 'NC16',
                        label: 'NC16级别'
                    },{
                        value: 'M18',
                        label: 'M18级别'
                    },{
                        value: 'R21',
                        label: 'R21级别'
                    }],
                    limitLevel:'',
                    actorIdsOptions:[],
                    actorIds: '',
                    blackAreaShortNameOptions: [],
                    blackAreaShortName:'',

                    isShow:'',
                    isNew:'',
                    isVip:'',
                    isRecommend:'',
                    scores:'',
                },
                rules:{
                    isShow:[{required: true,message: '请选择', trigger: 'blur'}],
                    isNew:[{required: true,message: '请选择', trigger: 'blur'}],
                    isVip:[{required: true,message: '请选择', trigger: 'blur'}],
                    isRecommend:[{required: true,message: '请选择', trigger: 'blur'}],
                    actorIds:[{required: true,message: '请选择', trigger: 'blur'}],
                    generName:[{required: true,message: '请选择', trigger: 'blur'}],
                    frameRate:[{required: true,message: '请选择', trigger: 'blur'}],
                    limitLevel:[{required: true,message: '请选择', trigger: 'blur'}],
                    scores:[{required: true,message: '请输入评分', trigger: 'blur'}],
                    episode:[{required: true,message: '请输入第几集', trigger: 'blur'}],
                    total:[{required: true,message: '请输入总集数', trigger: 'blur'}],
                },
                id:'',
            }
        },
        computed:{
            ...mapState(['posterUrl','resourceUrl'])
        },
        created:function(){
            this.id = this.$route.params.id
            this.getPerformerList('ZH')
            genreList().then(res=>{
                console.log('视频类型列表',res)
                if(res.code==='0'){
                    let arr = res.data.videoGenreCtoModelList
                    let arr1 = []
                    for(let i in arr){
                        arr1.push({
                            value:arr[i].type,
                            label:arr[i].name,
                        })
                    }
                    this.form.generNameOptions = arr1
                }
            })
            contrynameList().then(res=>{
                console.log('获取国家列表',res)
                if(res.code==='0'){
                    let arr = res.data.contryNameCtoModelList
                    let arr1 = []
                    for(let i in arr){
                        arr1.push({
                            value:arr[i].shortName,
                            label:arr[i].cn,
                        })
                    }
                    this.form.blackAreaShortNameOptions = arr1
                }
            })
        },
        methods: {
            ...mapMutations(['POSTERURL','RESOURCEURL']),
            onSubmit() {
                if(this.posterUrl==''||this.resourceUrl==''||this.posterUrl==undefined||this.resourceUrl==undefined){
                    Message({
                        message:'请上传视频及封面',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.actorIds.length=='0'){
                    Message({
                        message:'请选择主演',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.generName.length=='0'){
                    Message({
                        message:'请选择视频类型',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.frameRate.length=='0'){
                    Message({
                        message:'请选择视频帧率',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.limitLevel.length=='0'){
                    Message({
                        message:'请选择限制等级',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.scores==''||this.form.scores==undefined||this.form.scores===null){
                    Message({
                        message:'请输入评分',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.episode==''||this.form.episode==undefined||this.form.episode===null){
                    Message({
                        message:'请输入第集数',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.total==''||this.form.total==undefined||this.form.total===null){
                    Message({
                        message:'请输入总集数',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.isShow.length=='0'){
                    Message({
                        message:'请选择是否在app展示',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.isNew.length=='0'){
                    Message({
                        message:'请选择是否是新视频',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.isVip.length=='0'){
                    Message({
                        message:'请选择是否是vipzi资源',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }
                if(this.form.isRecommend.length=='0'){
                    Message({
                        message:'请选择是否是热点推荐',
                        type: 'error',
                        duration:'1500',
                    })
                    return
                }

                let actorIds = this.form.actorIds.join()
                let generName = this.form.generName.join()
                let frameRate = this.form.frameRate
                let limitLevel = this.form.limitLevel
                let scores = this.form.scores
                let episode = this.form.episode
                let total = this.form.total
                let blackAreaShortName = this.form.blackAreaShortName.join()
                let isShow = this.form.isShow
                let isNew = this.form.isNew
                let isVip = this.form.isVip
                let isRecommend = this.form.isRecommend

                // console.log(actorIds,generName,frameRate,limitLevel,scores,blackAreaShortName,isShow,isNew,isVip,isRecommend)
                videoBaseAdd('DRAMA',episode,generName,this.posterUrl,frameRate,blackAreaShortName,isShow,isNew,isVip,'0',isRecommend,this.resourceUrl,scores,null,limitLevel,actorIds,total,this.id).then(res=>{
                    console.log('新增电视剧剧集',res)
                    if(res.code==='0'){
                        Message({
                            message:'新增成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.POSTERURL('')
                        this.RESOURCEURL('')
                        this.$router.push({
                            name:'tvDetails',
                            params:{
                                id:this.id
                            },
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
            handleScoresChange(){
                if(this.form.scores>10){this.form.scores = 10}
                if(this.form.scores<0){this.form.scores = 0}
            },
            onEpisodeChange(){
                if(this.form.episode<0){this.form.episode = 0}
                this.form.episode =  parseInt(this.form.episode)
            },
            onTotalChange(){
                if(this.form.total<0){this.form.total = 0}
            },
            getPerformerList(lange){
                performerList(null,lange,'0').then(res=>{
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
            }
        },
        watch:{
            radio(newValue,oldValue){
                if(newValue!=oldValue){
                    newValue==='1'?this.getPerformerList('ZH'):this.getPerformerList('EN')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .VideoForm{
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
    }
    #a{
        .el-form-item{
            display: flex;
        }
    }
    .save{
        width: 100%;
        height: 60px;
    }
    .add-actor{
        display: none;
    }
</style>
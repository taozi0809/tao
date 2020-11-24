<template>
    <div class="VideoForm">
        <el-form ref="form" :model="form" :rules="rules" label-position="left">
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-form-item label="类型" prop="generName">
                        <el-select v-model="form.generName" filterable multiple placeholder="请选择">
                            <el-option
                                    v-for="item in form.generNameOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
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
                <el-col :span="3">
                    <el-form-item label="限制等级" prop="limitLevel">
                        <el-select v-model="form.limitLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in form.limitLevelOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="总集数" prop="total">
                        <el-input v-model.number="form.total" @input="onTotalChange"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="不可见地区">
                        <el-select v-model="form.blackAreaShortName" filterable multiple collapse-tags placeholder="请选择" @change="onChangeBlackAreaShortName">
                            <el-option
                                    v-for="item in form.blackAreaShortNameOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="是否在app展示：" label-width="140px" prop="isShow">
                <el-radio v-model="form.isShow" label="0">是</el-radio>
                <el-radio v-model="form.isShow" label="1">否</el-radio>
            </el-form-item>
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
</template>

<script>
    import {limitNumber} from "../../assets/config/tool";
    import { Message } from 'element-ui';
    import {videoBaseAdd,performerList,genreList,contrynameList,uploadDo} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                radio: '1',
                fullUrl:'',
                form: {
                    generNameOptions: [],
                    generName: '',
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
                    frameRate:'720',
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
                    limitLevel:'PG13',
                    actorIdsOptions:[],
                    blackAreaShortNameOptions: [],
                    blackAreaShortName:'',

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
                isSelecteAll:false,
            }
        },
        computed:{
            ...mapState(['posterUrl','coverUrl','backUrl']),
        },
        created:function(){
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
                    let arr2 = []
                    for(let i in arr){
                        arr1.push({
                            value:arr[i].shortName,
                            label:arr[i].en,
                        })
                        arr2.push(arr[i].shortName)
                    }
                    let arr0 = [{
                        value:'ALL',
                        label:'ALL'
                    }]
                    let arr20 = ['ALL']
                    arr1 = [...arr0,...arr1]
                    arr2 = [...arr20,...arr2]
                    this.form.blackAreaShortNameOptions = arr1
                    this.form.blackAreaShortName = arr2
                }
            })
        },
        methods: {
            onSubmit() {
                if(this.posterUrl==''||this.resourceUrl==''||this.posterUrl==undefined){
                    Message({
                        message:'请上传电视剧封面及背景',
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
                if(this.form.limitLevel==''||this.form.limitLevel==undefined||this.form.limitLevel==null){
                    Message({
                        message:'请选择限制等级',
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
                        message:'请选择是否是vip资源',
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
                let generName = this.form.generName.join()
                let frameRate = this.form.frameRate
                let limitLevel = this.form.limitLevel
                let scores = this.form.scores
                let total = this.form.total
                let blackAreaShortName = this.form.blackAreaShortName.join()
                let isShow = this.form.isShow
                let isNew = this.form.isNew
                let isVip = this.form.isVip
                let isRecommend = this.form.isRecommend

                videoBaseAdd('DRAMA',null,generName,this.posterUrl,frameRate,blackAreaShortName,isShow,isNew,isVip,'0',isRecommend,null,scores,null,limitLevel,'',total,'0','0',this.coverUrl,this.backUrl).then(res=>{
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
            onChangeBlackAreaShortName(){
                if(this.isSelecteAll){
                    if(this.form.blackAreaShortName.find((value)=>{if(value==='ALL'){return  true}})==='ALL'){}else{
                        this.isSelecteAll = false
                        this.form.blackAreaShortName = []
                    }
                    if(this.form.blackAreaShortName.length<229){
                        this.form.blackAreaShortName = this.delteAllE(this.form.blackAreaShortName)
                        this.isSelecteAll = false
                    }
                }else{
                    if(this.form.blackAreaShortName.find((value)=>{if(value==='ALL'){return  true}})==='ALL' || this.form.blackAreaShortName.length=='228'){
                        this.isSelecteAll = true
                        this.form.blackAreaShortName = this.selectAll(this.form.blackAreaShortNameOptions)
                    }
                }
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
<template>
    <div class="UploadVideo">
        <form id="form2">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="addVideo" id="addCover-file" @change="onFileChange">
        </form>
        <form id="form3">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="addVideo" id="addCover1-file" @change="onFileChange1">
        </form>
        <form id="form4">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="addVideo" id="addCover2-file" @change="onFileChange2">
        </form>

        <el-steps :active="active" finish-status="success">
            <el-step title="1.添加封面"></el-step>
            <el-step title="2.添加横向封面"></el-step>
            <el-step title="3.添加背景"></el-step>
        </el-steps>
        <el-button type="primary" style="margin-top: 12px;" @click="next" v-if="isShow">下一步</el-button>
        <el-button type="danger" style="margin-top: 12px;" @click="handleReset">重置</el-button>
    </div>
</template>

<script>
    import {jq} from "../plugins/jquery";jq()
    import {getSignature,getAntiLeechUrl} from "../assets/config/upload";
    import {mapState, mapMutations} from 'vuex'
    import {uploadDo} from "../service/api";
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                msg:{
                    show:false,
                    type:'',
                    res:'',
                    sha:'',
                    plan:'',
                },
                active: 0,
                isShow:true,
                videoFileList:[],
                coverFileList:[],
                coverFileList1:[],
                coverFileList2:[],
                uploadCos:'',
                uploadTaskId:'',
            }
        },
        mounted:function(){
            this.init_upload()
        },
        methods:{
            ...mapMutations(['POSTERURL','RESOURCEURL','FILEID','COVERURL','BACKURL']),
            next() {
                if(this.active=='0'){
                    $('#addCover-file').click();
                }
                else if(this.active=='1'){
                    $('#addCover1-file').click();
                }
                else if(this.active=='2'){
                    $('#addCover2-file').click();
                }
            },
            init_upload(){
                let _this = this
                $('#addCover-file').on('change', function (e) {
                    var coverFile = this.files[0];
                    _this.coverFileList[0] = coverFile;
                    _this.active++
                });
                $('#addCover1-file').on('change', function (e) {
                    var coverFile1 = this.files[0];
                    _this.coverFileList1[0] = coverFile1;
                    _this.active++
                });
                $('#addCover2-file').on('change', function (e) {
                    var coverFile2 = this.files[0];
                    _this.coverFileList2[0] = coverFile2;
                    _this.active++
                    _this.isShow = false
                });
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
                    uploadDo('vidfish:poster',files[0]).then(res=>{
                        console.log('添加电视剧封面',res)
                        if(res.code==='0'){
                            _this.POSTERURL(res.data.fullUrl)
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                        $('#form2')[0].reset();
                    })
                });
            },
            onFileChange1(e){
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
                    uploadDo('vidfish:cover',files[0]).then(res=>{
                        console.log('添加电视剧横向封面',res)
                        if(res.code==='0'){
                            _this.COVERURL(res.data.fullUrl)
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                        $('#form3')[0].reset();
                    })
                });
            },
            onFileChange2(e){
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
                    uploadDo('vidfish:back:photo',files[0]).then(res=>{
                        console.log('添加电视剧背景',res)
                        if(res.code==='0'){
                            _this.BACKURL(res.data.fullUrl)
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                        $('#form4')[0].reset();
                    })
                });
            },

            handleReset(){
                this.active=0
                $('#form2')[0].reset();
                $('#form3')[0].reset();
                $('#form4')[0].reset();
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/mixin";
    .UploadVideo{
        width: 100%;
        box-sizing: border-box;
        padding:15px;
        /*border: 1px solid red;*/
        height: 140px;
        .addVideo{
            box-sizing: border-box;
            position: absolute;
            left:0;
            height: 40px;
            width: 120px;
            display: none;
            cursor: pointer;
        }

        .success{
            color:#67C23A ;
        }
        .danger{
            color: #F56C6C;
        }
        .res-msg{
            box-sizing: border-box;
            /*padding-left: 20px;*/
            padding-right: 20px;
        }
    }
</style>
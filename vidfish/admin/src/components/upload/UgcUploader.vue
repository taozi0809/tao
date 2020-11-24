<template>
    <div class="ucg-uploader">
        <form ref="vExample">
            <input type="file" accept="" class="vExampleFile" ref="vExampleFile" @change="vExampleUpload" />
        </form>

        <div class="uploaderMsgBox" v-for="uploaderInfo in uploaderInfos">
            <div v-if="uploaderInfo.videoInfo">
                视频名称：{{uploaderInfo.videoInfo.name + '.' + uploaderInfo.videoInfo.type}}；
                上传进度：{{Math.floor(uploaderInfo.progress * 100) + '%'}}；
                <!--fileId：{{uploaderInfo.fileId}}；-->
                上传结果：{{uploaderInfo.isVideoUploadCancel ? '已取消' : uploaderInfo.isVideoUploadSuccess ? '上传成功' : '上传中'}}
                <!--<a href="javascript:void(0);" class="cancel-upload" v-if="!uploaderInfo.isVideoUploadSuccess && !uploaderInfo.isVideoUploadCancel" @click="uploaderInfo.cancel()">取消上传</a><br>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {YXB} from "../../assets/config/YXB";
    import axios from 'axios'
    import {bus} from "../../assets/config/eventBus";
    export default {
        data(){
            return{
                uploaderInfos: [],
                isEmit:false,
                data:'',
                uploader:null,
            }
        },
        created: function () {
            this.tcVod = new TcVod.default({
                getSignature: this.getSignature
            })
        },
        mounted:function(){

            bus.$on('uploadVideo',(data)=>{
                if(data=='reset'){
                    for(var item in this.uploaderInfos){
                        var uploaderInfo = this.uploaderInfos[item]
                        if(!uploaderInfo.isVideoUploadSuccess && !uploaderInfo.isVideoUploadCancel){
                            uploaderInfo.cancel()
                        }
                    }
                }else{
                    this.data=data
                    this.$refs.vExampleFile.click()
                }

            })
        },
        methods:{
            getSignature:function(){
                return axios.post(YXB.url.service+'/qcloudSignature/getQcloudSign').then(function (response) {
                    return response.data.sign;
                })
            },
            vExampleUpload: function () {
                this.isEmit=false
                this.uploaderInfos=[]
                var self = this;
                var mediaFile = this.$refs.vExampleFile.files[0]
                var uploader = this.tcVod.upload({
                    mediaFile: mediaFile,
                })
                uploader.on('media_progress', function (info) {
                    uploaderInfo.progress = info.percent;
                })
                uploader.on('media_upload', function (info) {
                    uploaderInfo.isVideoUploadSuccess = true;
                    let asyncFun = ()=>{
                        if(self.isEmit){
                            self.$emit('uploaderInfo',uploaderInfo,self.data)
                        }else{
                            setTimeout(()=>{
                                asyncFun()
                            },100)
                        }
                    }
                    asyncFun()

                })
                var uploaderInfo = {
                    videoInfo: uploader.videoInfo,
                    isVideoUploadSuccess: false,
                    isVideoUploadCancel: false,
                    progress: 0,
                    fileId: '',
                    videoUrl: '',
                    cancel: function() {
                        uploaderInfo.isVideoUploadCancel = true;
                        uploader.cancel()
                        self.$emit('uploaderInfo',uploaderInfo)
                        self.$refs.vExample.reset();
                    },
                }
                this.uploaderInfos.push(uploaderInfo)
                uploader.done().then(function(doneResult) {
                    uploaderInfo.fileId = doneResult.fileId;
                    uploaderInfo.videoUrl = doneResult.video.url;
                    self.isEmit=true
                    self.$refs.vExample.reset();
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    .ucg-uploader{
        width: 100%;
        margin-bottom: 20px;
        position:fixed;
        z-index: 9999;
        top: 0;
        .vExampleFile{
            display: none;
        }
        .uploaderMsgBox{
            width: 100%;
            color: #666;
            display: flex;
            align-items: center;
            height:60px;
            margin-left: 60px;
            .cancel-upload{
                color: #fff;
                background: #66b1ff;
                box-sizing: border-box;
                padding: 5px 10px;
                overflow: hidden;
                border-radius: 5px;
                text-decoration: none;
            }
        }
    }

</style>
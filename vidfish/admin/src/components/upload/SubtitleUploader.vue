<template>
    <div class="subtitle-uploader">
        <form ref="vExample">
            <input type="file" accept="vtt/webvtt" class="vExampleFile" ref="vExampleFile" @change="vExampleUpload" />
        </form>
    </div>
</template>

<script>
    import {bus} from "../../assets/config/eventBus";
    import {uploadDo} from "../../service/api";

    export default {
        mounted:function(){
            bus.$on('addSubtitle',()=>{
                this.$refs.vExampleFile.click()
            })
        },
        methods:{
            vExampleUpload(e){
                var that = this
                var files = e.target.files || e.dataTransfer.files;
                uploadDo('vidfish:subtitle',files[0]).then(res=>{
                    console.log('字幕上传',res)
                    if(res.code==0){
                        that.$emit('subtitleUploader',res.data)
                    }
                    that.$refs.vExample.reset();
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    .vExampleFile{
        display: none;
    }
</style>
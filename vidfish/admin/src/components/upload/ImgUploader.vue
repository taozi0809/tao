<template>
    <div class="img-upload">
        <form ref="vExample">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="vExampleFile" ref="vExampleFile" @change="vExampleUpload" />
        </form>

    </div>
</template>

<script>
    import {bus} from "../../assets/config/eventBus";
    import {uploadDo} from "../../service/api";

    export default {
        data(){
            return{
                data:'',
            }
        },
        mounted:function(){
            bus.$on('uploadImg',(data)=>{
                this.data=data
                this.$refs.vExampleFile.click()
            })
        },
        methods:{
            vExampleUpload(e){
                var that = this
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
                    uploadDo(that.data.type,files[0]).then(res=>{
                        console.log('修改图片',res)
                        if(res.code==='0'){
                            if(!!that.data){
                                that.data.url = res.data.fullUrl
                                that.$emit('imgUploader',that.data)
                            }else{
                                that.$emit('imgUploader',res.data.fullUrl)
                            }

                        }
                        that.$refs.vExample.reset();
                    })
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .vExampleFile{
        display: none;
    }
</style>
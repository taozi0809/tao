<template>
    <div class="startPage">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <form id="form1">
            <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="add-actor" id="addActor-file" @change="onFileChange">
        </form>
        <div class="box">
            <span><img :src="photoUrl" alt=""></span>
            <el-button type="primary" @click="handleAdd">增加</el-button>
            <el-button type="danger" @click="handleDelete">删除</el-button>
        </div>
    </div>
</template>

<script>
    import BetterScrollY  from '../../components/scroll/BetterScrollY'
    import Breadcrumb from '../../components/Breadcrumb'
    import VideoList from '../../components/video/VideoList'
    import VideoHead from '../../components/video/VideoHead'
    import { Message} from 'element-ui';
    import {jq} from "../../plugins/jquery";jq()
    import {startupPageSearch,startupPageAdd,uploadDo,startupPageDelete} from "../../service/api";

    export default {
        components:{BetterScrollY,Breadcrumb,VideoList,VideoHead},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/startPage',
                        name:'内容管理'
                    },
                    {
                        path:'/startPage',
                        name:'启动页管理'
                    },
                ],
                id:'',
                photoUrl:'',
            }
        },
        created:function(){
            this.getStartupPageSearch()
        },
        methods: {
            handleAdd(){
              $('#addActor-file').click()
            },
            getStartupPageSearch(){
                startupPageSearch().then(res=>{
                    console.log('查询启动页',res)
                    if(res.code==='0'){
                        this.id=res.data.id
                        this.photoUrl = res.data.photoUrl
                    }
                })
            },
            handleDelete(){
                startupPageDelete(this.id).then(res=>{
                    console.log('删除',res)
                    if(res.code==='0'){
                        Message({
                            message:'删除成功',
                            type: 'success',
                            duration:'1500',
                        })
                        this.getStartupPageSearch()
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
                    uploadDo('vidfish:startup',files[0]).then(res=>{
                        console.log('添加启动页',res)
                        if(res.code==='0'){
                            startupPageAdd(res.data.fullUrl).then(res=>{
                                console.log('添加启动页',res)
                                if(res.code==='0'){
                                    Message({
                                        message:'上传成功',
                                        type: 'success',
                                        duration:'1500',
                                    })
                                    _this.getStartupPageSearch()
                                }else{
                                    Message({
                                        message:res.message,
                                        type: 'error',
                                        duration:'1500',
                                    })
                                }
                            })

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
        }
    }
</script>

<style lang="scss" scoped>
    .startPage{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        .box{
            position: absolute;
            top:50%;
            transform: translate(-50%,-50%);
            left:50%;
            span{
                display: block;
                width: 300px;
                min-height: 534px;
                border-radius: 5px;
                border: 1px solid #333;
                margin: 0 auto;
                img{
                    width: 100%;
                }
            }
        }
        .el-button{
            margin-top: 20px;
        }
        .add-actor{
            display: none;
        }


    }
</style>
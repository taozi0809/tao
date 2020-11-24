<template>
    <div class="video-head">
        <el-button type="primary" class="add" @click="handleAddVideo">新增</el-button>
        <div class="box">
            <el-input v-model="videoName" placeholder="请输入关键词搜索" clearable @input="handleChange">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
    </div>
</template>

<script>
    import {videoBaseList} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                videoName:'',
            }
        },
        methods:{
            ...mapMutations(['VIDEOBASECTOMODELLIST']),
            handleAddVideo(){
                this.$router.push('/addVideo')
            },
            handleChange(){
                if(this.videoName==''||this.videoName==undefined||this.videoName==undefined){this.videoName=null}
                videoBaseList('MOVIE',this.videoName).then(res=>{
                    console.log('基本信息',res)
                    if(res.code==='0'){
                        this.VIDEOBASECTOMODELLIST(res.data.videoBaseCtoModelList)
                    }
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    .video-head{
        width: 100%;
        height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        /*border: 1px solid red;*/
        display: flex;
        align-items: center;
    }
</style>
<style lang="scss">
    .video-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .add{
            width:150px;
        }
        .box{
            .el-input{
                width: 30%;
                min-width: 300px;
            }
            .search{
                margin-left: 20px;
            }

        }

    }
</style>
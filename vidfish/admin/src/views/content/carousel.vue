<template>
    <div class="content">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <el-row class="row-t">
            <el-col :span="18">
                <el-button type="primary" class="add" @click="handleAddCarousel">新增</el-button>
            </el-col>

            <el-col :span="3">
                <el-radio-group v-model="radio" @change="handleChange">
                    <el-radio-button label="电影"></el-radio-button>
                    <el-radio-button label="电视剧"></el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="3">
                <el-select v-model="value" placeholder="语言环境" @change="handleChange">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <div class="carouse-box">
            <el-table :data="carouselData" style="width: 100%">
                <el-table-column prop="sort" label="序号" width="100"></el-table-column>
                <el-table-column label="海报地址" width="100">
                    <template slot-scope="scope">
                        <span class="thumbnail-x-box"><img :src="scope.row.posterUrl" alt=""></span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>

    import Breadcrumb from '../../components/Breadcrumb'
    import {carouselList,carouselDelete,languageSelect} from "../../service/api";
    import { Message,MessageBox} from 'element-ui';
    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/carousel',
                        name:'内容管理'
                    },
                    {
                        path:'/carousel',
                        name:'轮播图管理'
                    },
                ],
                radio:'电影',
                genre:'',
                genreOptions:[],
                carouselData: [],
                options: [],
                value:''
            }
        },
        created:function(){

            languageSelect().then(res=>{
                if(res.code==0){
                    let arr = []
                      for(let i in res.data.languageCtoModelList){
                          arr.push({
                              value:res.data.languageCtoModelList[i].lang,
                              label:res.data.languageCtoModelList[i].name,
                          })
                      }
                    this.options = arr
                    this.value = arr[0].value
                    this.getCarouselList(null,this.radio==='电影'?'MOVIE':'DRAMA',null,null,'0',this.value)
                    console.log('获取语言版本:',this.options)
                }
            })
        },
        methods:{
            handleAddCarousel(){
                this.radio==='电影'?this.$router.push('/addCarousel'):this.$router.push('/addCarouselTv')
            },
            getCarouselList(genreName,typeName,videoBaseId,videoName,isShow,lang){
                carouselList(genreName,typeName,videoBaseId,videoName,isShow,lang).then(res=>{
                    console.log('查询轮播图',res)
                    if(res.code==='0'){
                        this.carouselData = res.data.carouselCtoModelList
                    }
                })
            },
            handleDelete(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    carouselDelete(e.id).then(res=>{
                        console.log('删除轮播',res)
                        if(res.code==='0'){
                            let typeName = this.radio==='电影'?'MOVIE':'DRAMA'
                            this.getCarouselList(this.genre,typeName,null,null,'0')
                            Message({
                                message:'删除成功',
                                type: 'success',
                                duration:'1500',
                            })
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
            handleChange(){
                this.carouselData = []
                this.getCarouselList(null,this.radio==='电影'?'MOVIE':'DRAMA',null,null,'0',this.value)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        width: 100%;
        height:100%;
    }

    .row-t{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .thumbnail-x-box{
        display: block;
        width: 100px;
        height: auto;
        img{
            width: 100%;
        }

    }
    .carouse-box{
        width: 100%;
        /*height: 100%;*/
        box-sizing: border-box;
        position: absolute;
        top:100px;
        bottom: 0;
        left:0;
        overflow-y: scroll;
    }
</style>
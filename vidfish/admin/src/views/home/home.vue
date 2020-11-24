<template>
    <div class="home">
        <Head/>
        <Aside/>
        <div class="main" :class="isCollapse?'main-pack-up':'main-unfold'">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import Aside from '../../components/aside/Aside'
    import Home from '../../components/home/Home'
    import BetterScrollY from '../../components/scroll/BetterScrollY'
    import {mapState, mapMutations} from 'vuex'
    import {setSessionStore} from "../../storage";
    import {contrynameList,genreList,languageSelect,itemList} from "../../service/api";

    export default {
        components:{Head,Aside,Home,BetterScrollY},
        computed:{
            ...mapState(['isCollapse']),
        },
        created:function(){
            setSessionStore('radio','电影')

            this.getContrynameList()
            this.getGenreList()
            this.getLanguageSelect()
        },
        methods:{
            getContrynameList(){
                contrynameList().then(res=>{
                    // console.log('获取国家列表',res)
                    if(res.code==0){
                        let arr = [{shortName:'ALL',en:'ALL',cn:'全部'}]
                        var contryNameCtoModelList = [...arr,...res.data.contryNameCtoModelList]
                        setSessionStore('contryNameCtoModelList',contryNameCtoModelList)
                    }
                })
            },
            getGenreList(){
                genreList(null,'DEFAULT').then(res=>{
                    // console.log('视频类型列表',res)
                    if(res.code==='0'){
                        setSessionStore('videoGenreCtoModelList',res.data.videoGenreCtoModelList)
                    }
                })
            },
            getLanguageSelect(){
                const asyncFun = (lang)=>{
                    return new Promise((resolve, reject) => {
                        itemList(lang,0,null,null,null).then(res=>{
                            if(res.code==0){
                                resolve(res.data.videoItemCtoModelList)
                            }
                        })
                    } )
                }
                languageSelect().then(res=>{
                    if(res.code==0){
                        // console.log('语言环境列表：',res)
                        setSessionStore('languageCtoModelList',res.data.languageCtoModelList)
                        var videoItemCtoModelList={}
                        async function getvideoItemCtoModelList(){
                            for(let i in res.data.languageCtoModelList){
                                videoItemCtoModelList[res.data.languageCtoModelList[i].lang]= await asyncFun(res.data.languageCtoModelList[i].lang)
                            }
                            setSessionStore('videoItemCtoModelList',videoItemCtoModelList)
                        }
                        getvideoItemCtoModelList()

                    }
                })
            },


        }
    }
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        .main{
            position: fixed;
            right: 0;
            top:60px;
            left:180px;
            bottom: 0px;
            min-width: 1020px;
            background: #f5f5f5;
            overflow: hidden;
            box-sizing: border-box;
            transition:left 0.3s;
        }
        .main-pack-up{
            left:60px;
        }
        .main-unfold{
            left:180px;
        }
    }
</style>
<template>
    <div class="search reuse-page">
        <Head/>
        <div class="top"></div>
        <section class="contain">
            <p class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].search.title:''}}</p>
            <div class="list">
                <ul>
                    <li v-for="item in allList" :key="item.id" @click="handleLinkTo(item)">
                        <span><img :src="item.posterUrl" :alt="item.videoName"></span>
                        <i class="vip-tag" v-if="item.isVip==0">vip</i>
                        <div class="hover">
                            <div class="txt">
                                <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].home.watch:''}}</p>
                                <span><img src="../assets/img/icon-triangle.png" alt=""></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <Foot class="foot"/>
        <load ref="load"/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../assets/data/langCon";
    import {userSearchVideo} from "../service/api";
    import {getLocalStore} from "../storage";

    export default {
        metaInfo: {
            title: 'Search - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese entertainment, chinese news, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
            {
                name: 'description',
                content: 'Search for all the hottest and most popular TV dramas and movies from China!'
            }],
        },
        components:{Head,Foot},
        data(){
            return{
                ip:'',
                lon:null,
                lat:null,
                langCon:{},
                allList:[],
                videoName:'',
            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo','country','search']),
        },
        created:function(){

            this.token=(!!this.userInfo)?this.userInfo.token:''

            this.ip = getLocalStore('ip')
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lon
            }
            this.langCon = langCon
            this.videoName = this.$route.query.videoName
        },
        mounted:function(){
            if(!!this.videoName){
                this.userSearchVideo(this.lon,this.lat,null,null,this.videoName,this.ip,this.country,this.lang.lang,this.token)
            }
        },
        methods:{
            ...mapMutations(['LOGINTYPE']),
            handleLinkTo(item){
                if(!this.isLogin){
                    this.LOGINTYPE('loginPage')
                }else{
                    this.$router.push({
                        path: '/details',
                        query: {
                            id:item.id,
                            fileId:item.fileId,
                            typeName:item.typeName
                        }
                    })
                }
            },
            userSearchVideo(lon,lat,typeName,genreName,videoName,ip,country,lang,token){
                this.$refs.load.Load(true)
                userSearchVideo(lon,lat,typeName,genreName,videoName,ip,country,lang,token).then(res=>{
                    console.log('关键词搜索：',res)
                    if(res.code==0){
                        this.allList = res.data.videoBaseCtoModelList
                    }
                    this.$refs.load.Load(false)
                })
            },
        },
        watch:{
            search(newValue,oldValue){
                if(newValue!=oldValue){
                    this.videoName = newValue.videoName
                    if(!!this.videoName){
                        this.userSearchVideo(this.lon,this.lat,null,null,this.videoName,this.ip,this.country,this.lang.lang,this.token)
                    }
                }
            },
            '$route' (to, from) {
                if (to.name === 'search') {
                    this.videoName = to.query.videoName
                    if(!!this.videoName){
                        this.userSearchVideo(this.lon,this.lat,null,null,this.videoName,this.ip,this.country,this.lang.lang,this.token)
                    }
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/reuse";

    .foot{
        position: absolute;
        bottom: 0;
    }
</style>
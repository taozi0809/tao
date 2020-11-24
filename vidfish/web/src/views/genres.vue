<template>
    <div class="genres reuse-page">
        <Head/>
        <div class="top"></div>
        <section class="contain">
            <p class="title">{{name}}</p>
            <div class="list">
                <ul>
                    <li v-for="item in allList" @click="handleLinkTo(item)">
                        <span><img :src="item.posterUrl" :alt="item.genreName"></span>
                        <i class="vip-tag" v-if="item.isVip==0">vip</i>
                        <div class="hover">
                            <div class="txt">
                                <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].home.watch:''}}</p>
                                <span><img src="../assets/img/icon-triangle.png" alt="vip"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <Foot/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../assets/data/langCon";
    import {baseList} from "../service/api";
    import {getLocalStore} from "../storage";

    export default {
        metaInfo: {
            title: 'Watch The Best of Chinese Idol Dramas and Movies Online - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese idol dramas, free asia drama, full asian dramas, watch chinese drama online, popular chinese drama 2019, school dramas'
            },
                {
                    name: 'description',
                    content: 'Watch the latest and popular Chinese Idol Dramas and Movies in multi-language subtitles. Discover and stream the best of Chinese shows with Vidfish.'
                }],
        },
        components:{Head,Foot},
        data(){
            return{
                ip:'',
                lon:null,
                lat:null,
                type:'',
                langCon:{},
                allList:[],
                pageNum:0,
                pageSize:10,
                name:'',

            }
        },
        computed:{
            ...mapState(['lang','isLogin','country','videoGenreList']),
        },
        created:function(){
            this.ip = getLocalStore('ip')
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lon
            }

            this.langCon = langCon
            this.type = this.$route.params.type

            var list = this.videoGenreList[this.lang.lang]
            for(let i in list){if(list[i].type==this.type){this.name=list[i].name}}

        },
        mounted:function(){
            const serialFun = async()=>{
                let res = await this.getBaseList(this.lang.lang)
                this.pageNum=Math.ceil(res.data.totalNum/10)

                for(let i =1;i<=this.pageNum;i++){
                    let arrRes = await this.getBaseList(this.lang.lang,i)
                    this.allList=[...this.allList,...arrRes.data.videoBaseCtoModelList]
                }

            }
            serialFun()
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
            async getBaseList(lang,i) {
                return await new Promise((resolve, reject) => {
                    baseList(this.ip,this.lon,this.lat,null,this.type,null,null,null,lang,i,this.pageSize,this.country).then((res)=>{
                        console.log('类型--电影:',res)
                        if(res.code==0){
                            resolve(res)
                        }
                    })
                })
            },
        },

        watch:{
            $route(to,from){
                this.type = this.$route.params.type
                var list = this.videoGenreList[this.lang.lang]
                for(let i in list){if(list[i].type==this.type){this.name=list[i].name}}

                const serialFun = async()=>{
                    let res = await this.getBaseList(this.langCurrent)
                    this.pageNum=Math.ceil(res.data.totalNum/10)
                    this.allList=[]
                    for(let i =1;i<=1;i++){
                        let arrRes = await this.getBaseList(this.lang.lang,i)
                        this.allList=[...this.allList,...arrRes.data.videoBaseCtoModelList]
                    }

                }
                serialFun()
            }

        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/reuse";
</style>
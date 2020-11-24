<template>
    <div class="history reuse-page">
        <Head/>
        <div class="top"></div>
        <section class="contain">
            <p class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].watchHistory.name:''}}</p>
            <div class="list">
                <ul>
                    <li v-for="item in allList" :key="item.id" @click="handleLinkTo(item)">
                        <span><img :src="item.photoUrl" :alt="item.videoName"></span>
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
    import {playbackRecords} from "../service/api";
    import {getLocalStore} from "../storage";

    export default {
        metaInfo: {
            title: 'Watch History - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
                {
                    name: 'description',
                    content: 'Continue from where you left off with a copy of your viewing history. Streaming with Vidfish is just so easy!'
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
                token:'',
                pageNum:0,
                pageSize:10,
            }
        },
        computed:{
            ...mapState(['lang','isLogin']),
        },
        created:function(){
            this.ip = getLocalStore('ip')
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lon
            }
            this.langCon = langCon

            if(!this.isLogin){
                this.LOGINTYPE('loginPage')
                setTimeout(()=>{
                    $("#demo").intlTelInput({
                        preferredCountries: ['sg','cn','us'],
                    });
                    $('.intl-tel-input').css({
                        'display':'none'
                    })
                },0)
            }
        },
        mounted:function(){
            this.token = getLocalStore('token')

            const serialFun = async()=>{
                let res = await this.getPlaybackRecords(this.token,this.lang.lang,'1',this.pageSize)
                this.pageNum=Math.ceil(res.data.totalNum/10)

                for(let i =1;i<=this.pageNum;i++){
                    let arrRes = await this.getPlaybackRecords(this.token,this.lang.lang,i,this.pageSize)
                    this.allList=[...this.allList,...arrRes.data.playBackRecordListModel]
                }

            }
            serialFun()
        },
        methods:{
            ...mapMutations(['LOGINTYPE']),
            handleLinkTo(item){
                console.log(item)
                this.$router.push({
                    path: '/details',
                    query: {
                        id:item.resourceId,
                        fileId:item.fileId,
                        typeName:item.typeName
                    }
                })
            },
            async getPlaybackRecords(token,lang,pageSize,pageSum) {
                return await new Promise((resolve, reject) => {
                    playbackRecords(token,lang,pageSize,pageSum).then(res=>{
                        if(res.code==0){
                            resolve(res)
                        }
                    })
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/reuse";
</style>
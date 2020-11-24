<template>
    <div class="all reuse-page">
        <Head/>
        <div class="top"></div>
        <section class="contain">
            <p class="title">{{type.name}}</p>
            <div class="list">
                <ul>
                    <li v-for="item in allList" :key="item.id" @click="handleLinkTo(item)">
                        <span><img :src="item.posterUrl" :alt="item.genreName"></span>
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
        <Foot/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../assets/data/langCon";
    import {videoItemList} from "../service/api";


    export default {
        components:{Head,Foot},
        data(){
            return{
                type:{},
                langCon:{},
                allList:[],
            }
        },
        computed:{
            ...mapState(['lang','isLogin','country','startLoad']),
        },
        created:function(){
            this.langCon = langCon
            this.type = JSON.parse(this.$route.query.type)
        },
        mounted:function(){
            const serialFun = async()=>{
                let res = await this.videoItemList('1')
                this.pageNum=Math.ceil(res.data.videoItemCtoModelList[0].videoBaseListCtoModel.totalNum/10)
                for(let i =1;i<=this.pageNum;i++){
                    let arrRes = await this.videoItemList(i)
                    this.allList=[...this.allList,...arrRes.data.videoItemCtoModelList[0].videoBaseListCtoModel.videoBaseCtoModelList]
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
            async videoItemList(i) {
                return await new Promise((resolve, reject) => {
                    videoItemList(null,null,this.country,10,i,this.lang.lang,this.type).then(res=>{
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
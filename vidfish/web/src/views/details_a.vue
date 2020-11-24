<template>
    <div class="details">
        <Head/>
        <section class="top">
            <video-play :fileId="fileId" :id="childId" :typeName="typeName" :subtitleList="subtitleList"  v-if="watchType=='0'"></video-play>

            <div class="not-vip-box" v-if="watchType=='1'">
                <div class="con">
                    <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.notVipP1:''}}</p>
                    <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.notVipP2:''}}</p>
                    <p @click="handleSignUp">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.notVipP3:''}}</p>
                </div>
            </div>
            <div class="not-vip-box" v-if="watchType=='-1'"></div>

            <div class="swiper-box-tv" v-if="typeName=='DRAMA'">
                <div class="swiper-container-tv">
                    <div class="swiper-wrapper" >
                        <div class="swiper-slide" v-for="(item,index) in videoBaseCtoModelList" :key="item.id" :class="playEp==index?'active':''" @click="handleToDetails(item,index)">
                            <span class="img-box">
                                <img :src="item.coverPhotoUrl" :alt="item.genreName">
                                <i class="vip-tag" v-if="item.isVip==0">vip</i>
                            </span>
                            <p v-if="playEp==index">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.nowShowing:''}}</p>
                            <p v-if="playEp!=index">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.subsetName1:''}}{{item.episode}}{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.subsetName2:''}}</p>
                        </div>
                    </div>
                    <div class="swiper-scrollbar"></div>
                </div>
                <!-- 如果需要导航按钮 -->
                <!--<div class="swiper-button-prev" id="swiper-button-prev-tv"></div>-->
                <!--<div class="swiper-button-next" id="swiper-button-next-tv"></div>-->
            </div>
        </section>
        <section class="video-des">
            <p class="video-name">{{details.videoName}}</p>
            <div class="video-meta">
                <ul>
                    <li>{{details.limitLevel}}</li>
                    <li>|</li>
                    <li>{{genreText}}</li>
                </ul>
            </div>
            <p class="video-des-des">{{typeName=='MOVIE'?(details.hasOwnProperty('movieDetailsCtoModel')?details.movieDetailsCtoModel.description:''):(details.hasOwnProperty('dramaDetailsCtoModel')?details.dramaDetailsCtoModel.description:'')}}</p>
            <!--<div class="starring">-->
            <!--<p class="starring-title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.starring:''}}</p>-->
            <!--<ul class="starring-list">-->
            <!--<li v-for="item in details.performerCtoModelList" :key="item.id">-->
            <!--<div class="l">-->
            <!--<span><img :src="item.photoUrl" alt=""></span>-->
            <!--<p>{{item.actorName}}</p>-->
            <!--</div>-->
            <!--<p class="starring-des">{{item.actorDesc}}</p>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--<div class="youMayLike">-->
            <!--<p class="youMayLike-title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.youMayLike:''}}</p>-->
            <!--<div class="youMayLike-list">-->
            <!--<div class="swiper-box">-->
            <!--<div class="swiper-container">-->
            <!--<div class="swiper-wrapper">-->
            <!--<div class="swiper-slide" v-for="item in carouselCtoModelList" :key="item.id">-->
            <!--<span class="img-box"><img :src="item.posterUrl" alt=""></span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
            <!--<div class="swiper-pagination"></div>-->
            <!--</div>-->
            <!--</div>-->

            <!--</div>-->
        </section>
        <load ref="load"/>
        <message ref="message"/>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import Head from '../components/Head'
    import VideoPlay from '../components/VideoPlay'
    import {movieBaseDetails,dramaBaseDetails,videoClickTimes} from "../service/api";
    import {langCon} from "../assets/data/langCon";
    import {getLocalStore,getSessionStore} from "../storage";
    import {mapState, mapMutations} from 'vuex'

    export default {
        metaInfo: {
            title: 'Watch All Episodes With English Subtitles - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, free chinese drama, full chinese dramas, watch chinese drama online, popular chinese drama 2019, chinese drama streaming'
            },
                {
                    name: 'description',
                    content: 'Watch full episodes free online of the tv series with multilanguage subtitles.'
                }],
        },
        components:{Head,VideoPlay},
        data(){
            return{
                id:'',
                childId:'',
                fileId:'',
                typeName:'',
                langCon:{},
                ip:'',
                lon:null,
                lat:null,
                langCurrent:'',
                details:{},
                videoGenreCtoModelList:[],
                carouselCtoModelList:[],
                videoBaseCtoModelList:[],
                swiper:{},
                swiperTv:{},
                subtitleList:[],
                watchType:-1,
                playEp:0,
                genreText:'',

            }
        },
        computed:{
            ...mapState(['lang','userInfo','isLogin','country']),
        },
        created:function(){
            this.id = this.$route.query.id
            this.fileId = this.$route.query.fileId
            this.typeName = this.$route.query.typeName
            this.langCon = langCon
            this.ip = getLocalStore('ip')
            let coordinate = JSON.parse(getLocalStore('coordinate'))
            if(!!coordinate){
                this.lon = coordinate.lon
                this.lat = coordinate.lon
            }
            this.langCurrent = !!this.lang.lang?this.lang.lang:'EN'
            this.videoGenreCtoModelList = JSON.parse(getSessionStore('videoGenreCtoModelList'))



            videoClickTimes(this.id).then(res=>{
                console.log('点击率累计：',res)
            })


        },
        mounted:function(){
            if(!this.isLogin){
                switch (this.lang.lang) {
                    case 'ZH':
                        // this.$refs.message.Message('您尚未登录。立即登录！');
                        alert('您尚未登录。立即登录！');
                        break;
                    case 'EN':
                        // this.$refs.message.Message('You are not logged in. Login now! ');
                        alert('You are not logged in. Login now! ');
                        break;
                    case 'IND':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'ES':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'PT':
                        // this.$refs.message.Message('Você não está logado. Entre agora!');
                        alert('Você não está logado. Entre agora!');
                        break;
                    default:
                        alert('You are not logged in. Login now! ');
                }
                if(this.typeName=='MOVIE'){this.$router.push({path:'/movie'})}
                if(this.typeName=='DRAMA'){this.$router.push({path:'/tv'})}
            }else{
                this.swiper = new Swiper('.swiper-container', {
                    direction : 'horizontal',
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    slidesPerView :'auto',
                })

                this.swiperTv = new Swiper('.swiper-container-tv', {
                    direction : 'vertical',
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    slidesPerView :'auto',
                    initialSlide :0,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        hide: true,
                        draggable: true,
                        dragSize: 50,
                    },
                    mousewheel: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })

                if(this.typeName=="MOVIE"){
                    this.$refs.load.Load(true)
                    movieBaseDetails(this.country,this.id,this.lang.lang).then(res=>{
                        console.log('电影详情:',res)
                        if(res.code==0){
                            // baseList(this.ip,this.lon,this.lat,res.data.genreName,null,null,null,null,this.lang.lang).then(res=>{
                            //     console.log('猜你喜欢:',res)
                            //     if(res.code==0){
                            //         this.carouselCtoModelList = res.data.carouselListCtoModel.carouselCtoModelList
                            //     }
                            // })
                            this.details = res.data
                            // this.details.genreName =this.genreNameToName(this.videoGenreCtoModelList,res.data.genreName,this.lang.lang)
                            this.genreText=''
                            let arr = this.details.videoGenreCtoModelList.splice(0,3)
                            for(let i in arr){
                                if(this.lang.lang=='ZH'){this.genreText+=arr[i].name+', '}
                                if(this.lang.lang=='EN'){this.genreText+=arr[i].englishName+', '}
                                if(this.lang.lang=='IND'){this.genreText+=arr[i].indonesiaName+', '}
                            }
                            this.genreText = this.genreText.substr(0,this.genreText.length-2)

                            this.childId=this.details.id
                            if(this.userInfo.isVip==0){
                                this.watchType=0
                            }else{
                                if(this.details.isVip==0){
                                    this.watchType=1
                                }else{
                                    this.watchType=0
                                }
                            }
                        }
                        this.$refs.load.Load(false)
                    })
                }else if(this.typeName=="DRAMA"){
                    this.$refs.load.Load(true)
                    dramaBaseDetails(this.ip,this.lon,this.lat,this.id,this.lang.lang,null,null).then(res=>{
                        console.log('电视剧详情:',res)
                        if(res.code==0){
                            this.details = res.data.videoBaseCtoModelList[0]
                            this.videoBaseCtoModelList = res.data.videoBaseCtoModelList
                            // this.details.genreName =this.genreNameToName(this.videoGenreCtoModelList,res.data.videoBaseCtoModelList[0].genreName,this.lang.lang)
                            this.fileId = this.details.fileId
                            this.childId=this.details.id
                            this.subtitleList = this.details.subtitleCtoModelList

                            this.genreText=''
                            let arr = this.details.videoGenreCtoModelList.splice(0,3)
                            for(let i in arr){
                                if(this.lang.lang=='ZH'){this.genreText+=arr[i].name+', '}
                                if(this.lang.lang=='EN'){this.genreText+=arr[i].englishName+', '}
                                if(this.lang.lang=='IND'){this.genreText+=arr[i].indonesiaName+', '}
                            }
                            this.genreText = this.genreText.substr(0,this.genreText.length-2)


                            if(this.userInfo.isVip==0){
                                this.watchType=0
                            }else{
                                if(this.details.isVip==0){
                                    this.watchType=1
                                }else{
                                    this.watchType=0
                                }
                            }
                            setTimeout(() => {
                                this.swiperTv.slideTo(0, 0, false);
                            },100);
                        }
                        this.$refs.load.Load(false)
                    })
                }
            }

        },
        methods:{
            ...mapMutations(['LOGINTYPE']),

            handleToDetails(item,index){
                this.fileId=item.fileId
                this.childId=item.id
                this.playEp = index
                this.subtitleList = item.subtitleCtoModelList
                if(item.isVip==0){
                    if(this.userInfo.isVip==0){
                        this.watchType=-1
                        setTimeout(()=>{
                            this.watchType=0
                        },0)
                    }else{
                        this.watchType=1
                    }
                }else{
                    this.watchType=-1
                    setTimeout(()=>{
                        this.watchType=0
                    },0)
                }
            },
            handleSignUp(){
                if(this.isLogin){
                    this.$router.push({
                        path:`/accountSet/${'1'}`
                    })
                }else{
                    this.LOGINTYPE('loginPage')
                }
            }
        },
        watch:{
            lang(newValue,oldValue){
                if(newValue!=oldValue){
                    if(this.typeName=="MOVIE"){
                        movieBaseDetails(this.country,this.id,this.lang.lang).then(res=>{
                            console.log('电影详情:',res)
                            if(res.code==0){
                                // baseList(this.ip,this.lon,this.lat,res.data.genreName,null,null,null,null,this.lang.lang).then(res=>{
                                //     console.log('猜你喜欢:',res)
                                //     if(res.code==0){
                                //         this.carouselCtoModelList = res.data.carouselListCtoModel.carouselCtoModelList
                                //     }
                                // })
                                this.details = res.data
                                // this.details.genreName =this.genreNameToName(this.videoGenreCtoModelList,res.data.genreName,this.lang.lang)

                                this.genreText=''
                                let arr = this.details.videoGenreCtoModelList.splice(0,3)
                                for(let i in arr){
                                    if(this.lang.lang=='ZH'){this.genreText+=arr[i].name+', '}
                                    if(this.lang.lang=='EN'){this.genreText+=arr[i].englishName+', '}
                                    if(this.lang.lang=='IND'){this.genreText+=arr[i].indonesiaName+', '}
                                }
                                this.genreText = this.genreText.substr(0,this.genreText.length-2)

                                if(this.userInfo.isVip==0){
                                    this.watchType=0
                                }else{
                                    if(this.details.isVip==0){
                                        this.watchType=1
                                    }else{
                                        this.watchType=0
                                    }
                                }
                            }
                        })
                    }else if(this.typeName=="DRAMA"){
                        dramaBaseDetails(this.ip,this.lon,this.lat,this.id,this.lang.lang,null,null).then(res=>{
                            console.log('电视剧详情:',res)
                            if(res.code==0){
                                this.details = res.data.videoBaseCtoModelList[0]
                                this.videoBaseCtoModelList = res.data.videoBaseCtoModelList
                                // this.details.genreName =this.genreNameToName(this.videoGenreCtoModelList,res.data.videoBaseCtoModelList[0].genreName,this.lang.lang)
                                this.subtitleList = this.details.subtitleCtoModelList

                                this.genreText=''
                                let arr = this.details.videoGenreCtoModelList.splice(0,3)
                                for(let i in arr){
                                    if(this.lang.lang=='ZH'){this.genreText+=arr[i].name+', '}
                                    if(this.lang.lang=='EN'){this.genreText+=arr[i].englishName+', '}
                                    if(this.lang.lang=='IND'){this.genreText+=arr[i].indonesiaName+', '}
                                }
                                this.genreText = this.genreText.substr(0,this.genreText.length-2)

                                if(this.userInfo.isVip==0){
                                    this.watchType=0
                                }else{
                                    if(this.details.isVip==0){
                                        this.watchType=1
                                    }else{
                                        this.watchType=0
                                    }
                                }
                                setTimeout(() => {
                                    this.swiperTv.slideTo(0, 0, false);
                                },100);
                            }
                        })
                    }
                }
            },
            isLogin(newValue,oldValue){
                if(newValue!=oldValue){
                    if(newValue){
                        this.watchType=0
                    }else{
                        this.watchType=1
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .details{
        #swiper-button-prev-tv{
            left:50%;
            transform: translateX(-50%) rotate(90deg);
            top: 20px;
            outline:none;
        }
        #swiper-button-next-tv{
            left: 50%;
            transform: translateX(-50%) rotate(90deg);
            top:400px;
            outline:none;
        }

        .top{
            width: 100%;
            height: 750px;
            /*background: url("../assets/img/bg-banner-home.png") no-repeat;*/
            background: url("../assets/img/bg.png") no-repeat;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            /*border: 1px solid red;*/


            .play{
                box-sizing: border-box;
                border: 1px solid red;
                width: 930px;
                height: 584px;
            }
            .not-vip-box{
                width: 930px;
                height: 584px;
                background: #000;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                /*border: 1px solid red;*/
                .con{
                    p:nth-child(1){
                        color: #fff;
                        font-size: 18px;
                        display: inline-block;
                        border-bottom: 1px solid #fff;
                        margin-bottom: 6px;
                        padding-bottom: 6px;
                    }
                    p:nth-child(2){
                        color: #a28c5d;
                        font-size: 16px;
                        margin-bottom: 12px;
                    }
                    p:nth-child(3){
                        color: #000;
                        padding: 8px 20px;
                        font-size: 18px;
                        display: inline-block;
                        background: #a28c5d;
                        border-radius: 30px;
                        cursor: pointer;
                    }
                }
            }
            .swiper-box-tv{
                /*border: 1px solid red;*/
                width: 340px;
                height: 584px;
                background: #000;
                box-sizing: border-box;
                /*border: 1px solid red;*/
                overflow: hidden;
                position: relative;
                display: flex;
                align-items: center;
                .swiper-container-tv{
                    width: 340px;
                    height: 584px;
                    /*border: 1px solid red;*/
                    overflow: hidden;
                    margin: 0 auto;
                    position: relative;
                    .swiper-slide{
                        height: 146px;
                        width: 340px;
                        box-sizing: border-box;
                        padding-left: 15px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        span{
                            display: block;
                            height:120px;
                            width: 212px;
                            position: relative;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                            .vip-tag{
                                position: absolute;
                                width: 25px;
                                height: 25px;
                                background: #358dfe;
                                overflow: hidden;
                                border-radius: 50%;
                                color: #fff;
                                font-size: 14px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 10;
                                right: 5px;
                                top: 5px;
                            }
                        }
                        p{
                            display: block;
                            width: 100px;
                            margin-left: 10px;
                            font-size: 14px;
                        }

                    }
                    .active{
                        background: #333;
                    }
                }
                .swiper-button-next-tv,.swiper-button-prev-tv{}
            }
        }
        .video-des{
            width: 100%;
            min-width: 1200px;
            .video-name{
                font-weight: bold;
                font-size: 36px;
                color: #fff;
                box-sizing: border-box;
                padding: 0 50px;
                margin-bottom: 25px;
            }
            .video-meta{
                width: 100%;
                min-width: 1200px;
                margin-bottom: 40px;
                ul{
                    width: 100%;
                    padding: 0 50px;
                    display: flex;
                    align-items: center;
                    li{
                        color: #fff;
                        font-size: 16px;
                        position: relative;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-right: 16px;
                    }
                    /*li:after{*/
                    /*content: '';*/
                    /*display: block;*/
                    /*width: 10px;*/
                    /*height: 10px;*/
                    /*!*position: absolute;*!*/
                    /*!*right:0;*!*/
                    /*position: relative;*/
                    /*left: 4px;*/
                    /*background: #666;*/
                    /*overflow: hidden;*/
                    /*border-radius: 50%;*/

                    /*}*/
                }
            }
            .video-des-des{
                width: 100%;
                min-width: 1200px;
                box-sizing: border-box;
                padding: 0 50px;
                color: #999;
                line-height: 24px;
                font-size: 16px;
            }
            .starring{
                width: 100%;
                min-width: 1200px;
                box-sizing: border-box;
                padding: 0 50px;
                margin-bottom: 25px;
                .starring-title{
                    width: 100%;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                    margin-bottom: 25px;
                    margin-top: 30px;
                    padding-bottom: 8px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #5d5d5d;

                }
                .starring-list{
                    width: 100%;
                    li{
                        display: flex;
                        align-items: center;
                        /*justify-content: space-between;*/
                        margin-bottom: 30px;
                        .l{
                            display: flex;
                            align-items: center;
                            span{
                                display: block;
                                width: 50px;
                                overflow: hidden;
                                margin-right: 15px;
                                img{
                                    width: 100%;
                                }
                            }
                            p{
                                color: #fff;
                                font-size:16px;
                                width: 300px;
                                white-space:nowrap;
                            }
                        }
                        .starring-des{
                            font-size: 16px;
                            line-height: 24px;
                            color: #999;
                        }

                    }
                }
            }
            .youMayLike{
                width: 100%;
                min-width: 1200px;
                .youMayLike-title{
                    width: 100%;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                    padding: 0 50px;
                    margin-bottom: 25px;
                }
                .youMayLike-list{
                    width: 100%;
                    min-width: 1200px;
                    box-sizing: border-box;
                    padding: 0 50px;
                    .swiper-box{
                        width: 100%;
                        .swiper-container{
                            width: 100%;
                            .swiper-wrapper{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .swiper-slide{
                                    width: 30vw;
                                    min-width: 360px;
                                    .img-box{
                                        display: block;
                                        width: 100%;
                                        img{
                                            width: 100%;
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .swiper-scrollbar{
        background: rgba(255,255,255,.5);
    }
</style>
<template>
    <div class="head" :class="isBackground?'is-bg':'bg'" v-if="!!videoGenreList">
        <section class="menu-l">
            <router-link to="/"><img src="../assets/img/logo.png" alt=""></router-link>

            <li v-for="(item,index) in  lang.hasOwnProperty('lang')?langCon[lang.lang].head.menuL:[]">
                <router-link :to="item.path!='/genres'?item.path:''" exact class="menu-a">
                    <p class="name" v-if="item.path!='/genres'">{{item.name}}</p>
                    <div class="genres-name" v-if="item.path=='/genres'">
                        <p>{{item.name}}</p>
                        <span class="arrow"><img src="../assets/img/arrow.png" alt=""></span>
                    </div>
                    <div class="genresList" v-if="item.path=='/genres'">
                        <ul>
                            <router-link v-for="item1 in videoGenreList[lang.lang]" :key="item1.id" class="genresList-a" :class="genresListActive==item1.type1?'active':''" :to="item.path+'/'+item1.type">
                               {{item1.name}}
                            </router-link>
                        </ul>
                    </div>
                </router-link>
            </li>
            <li><router-link class="menu-a" to="/blog"><p class="name">Latest Blog Articles</p></router-link></li>

        </section>
        <section class="menu-r">
            <div class="search2">
                <input type="text" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].head.search:''" v-model="videoName" id="search" @keyup.enter="handleSearch">
                <div class="r" @click="handleSearch">
                    <span><img src="../assets/img/search-icon.png" alt=""></span>
                    <!--<p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].head.search:''}}</p>-->
                </div>
            </div>

            <div class="nationalFlag">
                <div class="nationalFlag-selected">
                    <p>{{lang.languageType}}</p>
                    <span class="arrow"><img src="../assets/img/arrow.png" alt=""></span>
                </div>
                <div class="nationalFlagList">
                    <ul>
                        <li v-for="item in langList" :key="item.id" @click="handleChangeLang(item)" v-if="item.languageType!=lang.languageType">{{item.languageType}}</li>
                    </ul>
                </div>
            </div>
            <div class="join-as-vip" v-if="userInfo.isVip!=0" @click="handleJoinAsVip">{{lang.hasOwnProperty('lang')?langCon[lang.lang].head.join:''}}</div>

            <li class="login" v-if="!isLogin">
                <div @click="handleLoginPage">{{lang.hasOwnProperty('lang')?langCon[lang.lang].head.login:''}}</div>
            </li>
            <li class="sing-up" v-if="!isLogin">
                <div @click="handleRegisterPage">{{lang.hasOwnProperty('lang')?langCon[lang.lang].head.register:''}}</div>
            </li>
            <div class="user-info" v-if="isLogin" @click="handleAccountSet">
                <span v-if="userInfo.isVip==0" class="head-img-box"><img :src="userInfo.photoUrl==null?'':userInfo.photoUrl" alt="" :onerror="headimg1"></span>
                <span v-if="userInfo.isVip!=0" class="head-img-box"><img :src="userInfo.photoUrl==null?'':userInfo.photoUrl" alt="" :onerror="headimg2"></span>
            </div>
        </section>
        <LoginPage v-if="loginType=='loginPage'"/>
        <RegisterPage v-if="loginType=='registerPage'"/>

    </div>
</template>

<script>
    import {langCon} from "../assets/data/langCon";
    import {languageSelect, videoGenre} from "../service/api";
    import {mapState, mapMutations} from 'vuex'
    import {setLocalStore,getLocalStore,getSessionStore,setSessionStore} from "../storage";
    import LoginPage from '../components/LoginPage'
    import RegisterPage from '../components/RegisterPage'

    export default {
        components:{LoginPage,RegisterPage},
        data(){
            return{
                langCon:{},
                genresListActive:'',
                isLoginType:'',
                headimg1:'this.src="'+ require('../assets/img/headimg-vip.png') +'"',
                headimg2:'this.src="'+ require('../assets/img/headimg-notVip.png') +'"',
                isBackground:false,
                videoName:'',
            }
        },
        computed:{
            ...mapState(['lang','isLogin','loginType','userInfo','langList','videoGenreList']),
        },
        created:function(){
            this.langCon = langCon
            if(!!this.$route.params.type){
                this.genresListActive = this.$route.params.type
            }
            this.videoName = this.$route.query.videoName
        },
        mounted:function(){
            window.addEventListener('scroll', this.handleScroll)
        },
        methods:{
            ...mapMutations(['LANG','ISLOGIN','LOGINTYPE','SEARCH']),
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop>100?this.isBackground=true:this.isBackground=false
            },
            handleSearch(){
                if(this.$route.path=='/search'){
                    var a=0
                    var search={
                        number:a++,
                        videoName:this.videoName
                    }
                    this.SEARCH(search)
                    this.$router.push({path:`/search`})
                }else{
                    let routeUrl = this.$router.resolve({path: "/search", query:{videoName:this.videoName}});
                    window.open(routeUrl.href, '_self');
                }
            },
            handleChangeLang(item){
                this.LANG(item)
                this.$router.push({path:`/`})
                window.location.reload();
            },

            handleLoginPage(){
                this.LOGINTYPE('loginPage')
            },
            handleRegisterPage(){
                this.LOGINTYPE('registerPage')
            },
            handleLogout(){
                this.ISLOGIN(false)
                setLocalStore('token','')
            },
            handleAccountSet(){
                this.$router.push({path:'/account'})
            },
            handleJoinAsVip(){
                if(this.isLogin){
                    this.$router.push({path:'/pay'})
                }else{
                    this.LOGINTYPE('loginPage')
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.head{
    width: 100%;
    min-width: 1200px;
    height: 80px;
    position: fixed;
    z-index: 99;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .menu-l{
        display: flex;
        align-items: center;
        position: absolute;
        left: 60px;
        .menu-a{
            padding: 0 15px;
            height: 80px;
            display: flex;
            align-items: center;
            position: relative;
            .name{
                font-size: 17px;
                font-weight: bold;
            }
            .genres-name{
                /*width: 100px;*/
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 10px;
                p{
                    color: #fff;
                    font-size: 17px;
                    font-weight: bold;
                    padding-right: 5px;
                }
                .arrow{
                    display: block;
                    width: 15px;
                    transform:rotate(90deg);
                    transition: 0.3s;
                    img{
                        width: 100%;
                    }
                }
            }
            .genres-name:hover{
                .arrow{
                    transform:rotate(-90deg);
                }
            }
            .genresList{
                display: none;
                position: absolute;
                top: 80px;
                cursor: pointer;
                /*background: #000;*/
                background:#191919;
                border: 1px solid rgba(0,0,0,.15);
                ul{
                    .genresList-a{
                        /*color: #fff;*/
                        padding: 10px;
                        display: block;
                        color: #888;
                    }
                    .genresList-a:hover{
                        color: #358dfe;
                    }
                    .active{
                        color: #358dfe;
                    }
                }
            }
        }
        a:hover{
            p{
                color: #358dfe;
            }
            .genresList{
                display: block;
            }
        }
        .active{
            color: #358dfe;
        }
    }
    .menu-r{
        display: flex;
        align-items: center;
        height: 80px;
        position: absolute;
        /*border: 1px solid red;*/
        right: 60px;

        .search {
            position:absolute;
            top:50%;
            transform:translate(-100%,-50%);
            width:60px;
            height:40px;
            background:transparent;
            border-radius:4px;
            transition: .5s;
            overflow:hidden;
            input {
                position:absolute;
                top:0px;
                left:20px;
                width:calc(100% - 90px);
                height:40px;
                border:none;
                outline:none;
                font-size:15px;
                padding:0;
                color:#5d5d5d;

            }
            .icon {
                position: absolute;
                top: 5px;
                right: 0px;
                width: 40px;
                height: 40px;
                cursor: pointer;
                transition: .5s;
                border-radius: 0px;
            }
            .icon:before {
                content:'';
                position:absolute;
                top:4px;
                left:12px;
                width:20px;
                height:20px;
                background:transparent;
                border:2px solid #ffffff;
                border-radius:50%;
                transition:.5s;
            }
            .icon:after {
                content:'';
                position:absolute;
                top:10px;
                left:29px;
                width:18px;
                height:10px;
                background:transparent;
                border-left:2px solid #ffffff;
                border-radius:0;
                transform:rotate(-45deg);
                transition:.5s;
            }
        }
        .active-search{
            width:260px;
            border-radius: 50px;
            background:#fff;
            padding: 0 10px;
            .icon {
                background: transparent;
            }
            .icon:before {
                content:'';
                position:absolute;
                top:4px;
                left:7px;
                width:9px;
                height:15px;
                background:transparent;
                border:none;
                border-right:2px solid #5d5d5d;
                border-radius:0;
                transition:.5s;
                transform:rotate(45deg);
            }
            .icon:after {
                content:'';
                position:absolute;
                top:10px;
                left:7px;
                width:9px;
                height:15px;
                background:transparent;
                border:none;
                border-right:2px solid #5d5d5d;
                border-radius:0;
                transition:.5s;
                transform:rotate(-45deg);
            }
        }

        .search2{
            width: 300px;
            height: 40px;
            overflow: hidden;
            margin-right: 15px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            input{
                border: none;
                outline: none;
                box-sizing: border-box;
                width: 220px;
                height: 40px;
                overflow: hidden;
                padding-left: 20px;
                font-size: 16px;
                color: #5d5d5d;
            }
            .r{
                width: 80px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #358dfe;
                cursor: pointer;
                span{
                    display: block;
                    width: 20px;
                    position: relative;
                    top: 2px;
                    left: -2px;
                    img{
                        width: 100%;
                    }
                }
                p{
                    font-size: 15px;
                    color: #fff;
                }
            }
        }
        .nationalFlag{
            height: 80px;
            margin-right: 20px;
            position: relative;
            left:0;
            .nationalFlag-selected{
                height: 100%;
                cursor: pointer;
                display: flex;
                align-items: center;
                padding-left: 10px;
                p{
                    color: #fff;
                    font-weight: bold;
                    font-size: 15px;
                    padding-right: 5px;
                }
                .arrow{
                    display: block;
                    width: 15px;
                    transform:rotate(90deg);
                    transition: 0.3s;
                    img{
                        width: 100%;
                    }
                }
            }
            .nationalFlag-selected:hover{
                .arrow{
                    transform:rotate(-90deg);
                }
            }
            .nationalFlagList{
                display: none;
                cursor: pointer;
                background: #191919;
                width: 160px;
                position: absolute;
                ul{
                    li{
                        color: #888;
                        padding: 10px;
                    }
                    li:hover{
                        color: #358dfe;
                    }
                }
            }

        }
        .nationalFlag:hover{
            .nationalFlagList{
                display: block;
            }
        }
        .login{
            /*border: 1px solid red;*/
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
            color: #fff;
            padding: 10px 15px;
            margin-right: 20px;
        }
        .login:hover{
            a{
                color: #358dfe;
            }
        }
        .sing-up{
            font-size: 17px;
            font-weight: bold;
            background: #358dfe;
            box-sizing: border-box;
            position: relative;
            z-index:99;
            cursor: pointer;
            color: #fff;
            /*border: 1px solid red;*/
            overflow: hidden;
            border-radius: 30px;
            padding: 10px 15px;
        }
        .user-info{
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            height: 80px;
            .head-img-box{
                display: block;
                width: 36px;
                height: 36px;
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid #688a7e;
                img{
                    width: 100%;
                }
            }
            p{
                font-weight: bold;
                color: #fff;
                font-size: 16px;
                margin-left: 6px;
                width: 80px;
                overflow: hidden;
                text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
            }
            .icon-sj{
                width:25px;
                display: block;
                img{
                    width: 100%;
                }
            }
            .user-tab{
                display: none;
                cursor: pointer;
                background: #191919;
                position: absolute;
                width: 120px;
                top:80px;
                border-radius: 2px;
                ul{
                    li{
                        color: #888;
                        padding: 10px;
                        white-space:nowrap;

                    }
                    li:hover{
                        color: #358dfe;
                    }
                }
            }
        }
        .user-info:hover{
            .user-tab{
                display: block;
            }
        }
        .join-as-vip{
            width: 100px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #358dfe;
            border-radius: 30px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            margin-right: 20px;
        }
    }

}
.is-bg{
    background: #000;
}
.bg{
    background: none;
}

</style>
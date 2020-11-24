<template>
    <div class="detail">
        <Head/>
        <div class="banner"></div>
        <section class="list">
            <h1 class="h1">{{article[activeIndex].title}}</h1>
            <ul>
                <li v-for="item in article[activeIndex].content">
                    <span class="card-img"><img :src="item.src" alt=""></span>
                    <div class="card">
                        <h2 class="h2">{{item.title}}</h2>
                        <p class="des">{{item.des}}</p>
                    </div>
                </li>
            </ul>
        </section>
        <Foot/>
    </div>
</template>

<script>
    import {article} from "../../assets/data/vidfish/article";
    import Head from '../../components/Head'
    import Foot from '../../components/Foot'
    export default {
        metaInfo: {
            title: 'Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
            {
                name: 'description',
                content: ''
            }],
        },
        components:{Head,Foot},
        data(){
            return{
                article:article,
                activeIndex:-1,
            }
        },
        created:function(){
            this.activeIndex=this.$route.query.index
            if(!!this.activeIndex){}else{
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
                this.$router.push({path:'/home'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .detail{
        .banner{
            width: 100%;
            height: 750px;
            background: url("../../assets/img/bg.png") no-repeat;
            background-size: cover;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }
        .list{
            width: 1000px;
            margin: 0 auto;
            min-height:860px;
            position: relative;
            z-index: 1;
            box-sizing: border-box;
            padding-top:80px;
            .h1{
                color: #fff;
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 20px;
                margin-top: 40px;
                text-align: center;
                height: 80px;
                /*line-height: 80px;*/
            }
            ul{
                li{
                    margin-bottom: 60px;
                    .card-img{
                        width: 100%;
                        display: flex;
                        margin-bottom: 10px;
                        img{
                            width: 100%;
                        }
                    }
                    .card{
                        .h2{
                            color: #fff;
                            font-size: 18px;
                            margin-bottom: 10px;
                        }
                        .des{
                            color: #fff;
                            font-size: 16px;
                            line-height: 1.5;
                        }
                    }
                }
            }

        }
    }
</style>
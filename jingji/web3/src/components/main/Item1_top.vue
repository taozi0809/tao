<template>
    <div :class="isPC?'pc-item1_top':'mobile-item1_top'" id="item1_top">
        <div class="con">
            <Title :title="title"/>
            <div class="des">
                <div class="l"><img src="../../assets/img/main/item1_top/l.png" alt=""></div>
                <div class="r" v-if="isPC">
                    <img src="../../assets/img/main/item1_top/r.png" alt="">
                    <p>扫码下载APP</p>
                </div>
                <div class="r" v-if="!isPC">
<!--                    线上-->
<!--                    <img src="../../assets/img/main/item1_top/m-r.png" alt="">-->

<!--                    测试-->
                    <img src="../../assets/img/main/item1_top/m-r-test.png" alt="">
                </div>
                <a v-if="!isPC" :href="url" @click="skip(is_ios?'1':'2')"><img src="../../assets/img/main/item1_top/btn.png" alt=""></a>
            </div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    import Title from '../../components/Title'
    import {isIos,isWeiXin} from "../../utils/tool";
    import {isYouxibi,downloadApk} from "../../utils/app";

    export default {
        components:{Title},
        data(){
            return{
                isPC:true,
                title:{
                    name:"下载",
                    des:"DOWNLOAD",
                },
                is_ios:'',
                is_android:'',
                is_weixin:'',
                // android_url:"http://caishenhongbao.com/jjddz_client-release.apk",//线上
                android_url:"http://caishenhongbao.com/jjddz_client-release-test.apk",//测试
                ios_url:"javascript:void(0);",
            }
        },
        created() {
            this.isPC=ispc()
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
            this.is_ios?this.url=this.ios_url:this.url=this.android_url
        },
        methods:{
            skip:function(e){
                if(e==2){
                    if(this.is_weixin){
                        this.$store.commit('edit')
                    }
                    if (isYouxibi()) {downloadApk(this.android_url)}
                }
            },
        }
    }
</script>


<style lang="scss" scoped>
    .pc-item1_top{
        width: 100%;
        height:700px;
        background-image: url("../../assets/img/main/item1_top/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        overflow: hidden;
        .con{
            .des{
                width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 50px;
                .l{
                    width: 890px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 270px;
                    flex-shrink: 0;
                    position: relative;
                    img{
                        width: 100%;
                    }
                    p{
                        position: absolute;
                        bottom: 30px;
                        text-align: center;
                        width: 100%;
                        font-size:24px;
                        font-weight:bold;
                        font-style:italic;
                        color:rgba(86,130,206,1);
                        text-shadow:2px 3px 4px rgba(0,48,108,0.32);
                        text-stroke:2px undefined;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .con{
                .des{
                    width: 900px;
                    .l{
                        width: 667px;
                    }
                    .r{
                        width: 202px;
                        p{
                            font-size: 20px;
                            bottom: 24px;
                        }
                    }
                }

            }
        }
    }

    .mobile-item1_top{
        width: 100%;
        background-image: url("../../assets/img/main/item1_top/bg.png");
        background-size:cover;
        background-position:-2vw 0;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con{
            .des{
                width: 90vw;
                margin: 0 auto;
                .l{
                    width: 90vw;
                    margin-top: 10vw;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:50vw;
                    margin: 0 auto;
                    margin-top: 5vw;
                    img{
                        width: 100%;
                    }
                }
                a{
                    display:block;
                    width: 40vw;
                    margin: 0 auto;
                    margin-top: 5vw;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }




</style>

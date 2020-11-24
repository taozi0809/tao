<template>
    <div class="mark" :class="isPC?'pc-item1':'mobile-item1'" id="item1">
        <div class="banner"><img src="../../assets/img/main/item1/bg.png" alt=""></div>
        <div class="ewm">
            <div class="img"><img src="../../assets/img/main/item1/ewm.png" alt=""></div>
            <p>扫一扫，关注公众号</p>
        </div>

<!--        <a href="http://caishenhongbao.com/download/" class="download-btn" v-if="!isPC"><img src="../../assets/img/main/item1/download_btn.png" alt=""></a>-->
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
.pc-item1{
    width: 100%;
    overflow: hidden;
    background: black;
    position: relative;
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .ewm{
        position: absolute;
        z-index: 0;
        right:15vw;
        bottom:7vw;
        width: 15.6vw;
        min-width: 150px;
        .img{
            width: 15.6vw;
            min-width: 150px;
            img{
                width: 100%;
            }
        }
        p{
            color: #fff;
            font-family: PingFang-SC-Heavy;
            font-size:20px;
            text-align: center;
            font-weight:bold;
            white-space:nowrap;
            padding-top: 20px;
        }
        @media screen and (min-width:1024px) and (max-width: 1024px){
            p{
                font-size:14px;
            }
        }
    }

}
.mobile-item1{
    width: 100%;
    background:#00438a;
    position: relative;
    box-sizing: border-box;
    padding-top:40px;
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .ewm{
        position: absolute;
        z-index: 1;
        right: 6vw;
        bottom:6vw;
        text-align: center;
        .img{
            margin: 0 auto;
            width: 20vw;
            margin-bottom: 2vw;
            img{
                width: 100%;
            }
        }
        p{
            font-size: 10px;
            color: #fff;

        }
    }
    .download-btn{
        position: absolute;
        bottom:2vw;
        left: 50%;
        transform: translateX(-50%);
        width:30vw;
        img{
            width: 100%;
        }
    }

}
</style>

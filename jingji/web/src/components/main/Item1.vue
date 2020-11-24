<template>
    <div class="Item1" :class="isPC?'pc-item1':'mobile-item1'" id="item1">
        <div class="banner"><img src="../../assets/img/main/item1/banner.png" alt=""></div>
        <div class="ewm">
            <div class="img"><img src="../../assets/img/main/item1/ewm.png" alt=""></div>
            <p>扫一扫，下载手机客户端</p>
        </div>
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
        right: 10.5vw;
        bottom: 7.2vw;
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
    background: black;
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
        right: 10vw;
        bottom: 10vw;
        text-align: center;
        .img{
            margin: 0 auto;
            width: 20vw;
            img{
                width: 100%;
            }
        }
        p{
            font-size: 10px;
            color: #fff;

        }
    }

}
</style>

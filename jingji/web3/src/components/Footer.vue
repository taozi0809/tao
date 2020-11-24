<template>
    <div class="footer" :class="isPC?'pc-footer':'mobile-footer'" id="item1">
        <div class="des">
            <div class="d1">网络文化经营许可证： 粤网文[2016]5694-1371号</div>
            <div class="d2">粤ICP备16033307号-5</div>
            <div class="d3"><a href="https://www.youxibi.com/apple/quanmin/privacy_policy.html" target="_blank">《隐私政策》</a> | <a href="https://www.youxibi.com/apple/quanmin/license_agreement.html" target="_blank">《用户协议》</a></div>
            <div class="d4">万康兴体育文化发展（海南）有限公司</div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../utils/isPc";

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
    .pc-footer{
        display: flex;
        align-items: center;
        width: 100%;
        height: 180px;
        background: #05294D;
        .des{
            box-sizing: border-box;
            width: 1200px;
            margin: 0 auto;
            .d1,.d2,.d4{
                font-size: 14px;
                color: #fff;
                padding: 10px 0;
            }
            .d3{
                color: #fff;
                font-size: 18px;
                padding: 10px 0;
                a{
                    color: #2D86FF;
                    font-size: 14px;
                    text-decoration: none;
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .des {
                width: 900px;
            }

        }

    }
    .mobile-footer{
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        background: #05294D;
        padding:4vw;
        .des{
            box-sizing: border-box;
            .d1,.d2,.d4{
                font-size: 3vw;
                color: #fff;
                margin-bottom: 1.5vw;
            }
            .d3{
                color: #fff;
                font-size: 3vw;
                margin-bottom: 1.5vw;
                a{
                    color: #2D86FF;
                    font-size: 3vw;
                    text-decoration: none;
                }
            }
        }
    }
</style>

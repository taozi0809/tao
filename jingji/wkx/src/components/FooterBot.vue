<template>
    <div class="footer-bot" :class="isPC?'pc-footer-bot':'mobile-footer-bot'">
        <div class="con">
            <div class="des-box">
                <div class="l"><img src="../assets/img/footerbot/l.png" alt=""></div>
                <div class="c">低于任何一个实体店的投入 加入万康兴</div>
                <a class="r" href="https://h5.ebdan.net/ls/u4mk7sDR?from=singlemessage" target="_blank">立即参与</a>
            </div>
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
    .pc-footer-bot{
        width: 100%;
        background: rgba(0,0,0,.47);
        bottom: 0;
        z-index: 10;
        position: fixed;
        .con{
            width: 100%;
            .des-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 1200px;
                margin: 0 auto;
                height:100px;
                .l{
                    width:274px ;
                    position: relative;
                    top: -40px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .c{
                    color: #fff;
                    font-size: 30px;
                    font-weight: bold;
                }
                .r{
                    width:200px;
                    height:57px;
                    background:rgba(237,59,59,1);
                    border-radius:5px;
                    font-size:30px;
                    color:rgba(255,255,255,1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                }
            }

        }
    }
    @media screen and (max-width: 1024px) {
        .pc-footer-bot{
            .con{
                .des-box{
                    width:900px;
                    height:75px;
                    .l{
                        width:200px;
                        top: -30px;
                        flex-shrink: 0;
                    }
                    .c{
                        font-size: 22px;
                    }
                    .r{
                        width:150px;
                        height:42px;
                        border-radius:5px;
                        font-size:22px;
                        flex-shrink: 0;
                    }
                }

            }
        }
    }
    .mobile-footer-bot{
        width: 100%;
        background: rgba(0,0,0,.47);
        bottom: 0;
        z-index: 10;
        position: fixed;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 15vw;
                width: 90vw;
                margin: 0 auto;
                .l{
                    width:20vw;
                    position: relative;
                    top: -0vw;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .c{
                    color: #fff;
                    font-size: 4vw;
                    box-sizing: border-box;
                    padding: 0 3vw;
                    line-height: 1.5;
                    font-weight: bold;
                }
                .r{
                    flex-shrink: 0;
                    width: 20vw;
                    height: 8vw;
                    background:rgba(237,59,59,1);
                    border-radius:5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 4vw;
                }
            }

        }
    }
</style>

<template>
    <div class="Item5" :class="isPC?'pc-item5':'mobile-item5'" id="item5">
        <div class="title" v-if="isPC"><img src="../../assets/img/main/item5/title.png" alt=""></div>
        <div class="title" v-if="!isPC"><img src="../../assets/img/main/item5/m-title.png" alt=""></div>
        <div class="con">
            <div class="list1">
                <div class="img"><img src="../../assets/img/main/item5/1.png" alt=""></div>
                <div class="d1">了解加盟信息</div>
            </div>
            <div class="list2">
                <div class="img"><img src="../../assets/img/main/item5/2.png" alt=""></div>
                <div class="d1">确定加盟意向</div>
            </div>
            <div class="list3">
                <div class="img"><img src="../../assets/img/main/item5/3.png" alt=""></div>
                <div class="d1">签署合同</div>
            </div>
            <div class="list4">
                <div class="img"><img src="../../assets/img/main/item5/4.png" alt=""></div>
                <div class="d1">缴纳款项</div>
            </div>
            <div class="list5">
                <div class="img"><img src="../../assets/img/main/item5/5.png" alt=""></div>
                <div class="d1">权限部署</div>
            </div>
            <div class="list6">
                <div class="img"><img src="../../assets/img/main/item5/6.png" alt=""></div>
                <div class="d1">运营支持</div>
            </div>
            <div class="hx" v-if="isPC"><img src="../../assets/img/main/item5/hx.png" alt=""></div>
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
    .pc-item5{
        width: 100%;
        height: 550px;
        position: relative;
        box-sizing: border-box;
        padding-top: 100px;
        .title{
            margin: 0 auto;
            width: 75vw;
            img{
                width: 100%;
            }
        }
        .con{
            width: 75vw;
            margin: 0 auto;
            background: #EDDABF;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 80px;
            box-sizing: border-box;
            padding-top: 80px;
            padding-bottom: 120px;
            position: relative;
            .list1,.list2,.list3,.list4,.list4,.list5,.list6{
                flex: 1;
                width: 100%;
                .img{
                    width: 87px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                    img{
                        width: 100%;
                    }
                }
                .d1{
                    color: #9D6639;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                }

            }
            .hx{
                position: absolute;
                top:110px;
                left: 20px;
                width:72vw;
                margin: 0 auto;
                z-index: 0;
                img{
                    width: 100%;
                }
            }

        }

    }
    .mobile-item5{
        padding-top: 40px;
        .title{
            width:100vw;
            margin: 0 auto;
            margin-top: 4vw;
            img{
                width: 100%;
            }
        }
        .con{
            width: 90%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            flex-wrap:wrap;
            .list1,.list2,.list3,.list4,.list4,.list5,.list6{
                width: 30vw;
                margin-top: 6vw;
                .img{
                    width: 12vw;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .d1{
                    color: #9D6639;
                    font-size: 4vw;
                    font-weight: bold;
                    text-align: center;

                }
            }

        }
    }
</style>

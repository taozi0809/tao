<template>
    <div class="card-data">
        <div class="card">
            <div class="box">
                <div class="l">
                    <i><img src="../../assets/img/cardData/user.png" alt=""></i>
                </div>
                <div class="r">
                    <p>{{userNum}}</p>
                    <p>用户总数</p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="box">
                <div class="l">
                    <i><img src="../../assets/img/cardData/moive.png" alt=""></i>
                </div>
                <div class="r">
                    <p>{{movieNum}}</p>
                    <p>电影总数</p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="box">
                <div class="l">
                    <i><img src="../../assets/img/cardData/drama.png" alt=""></i>
                </div>
                <div class="r">
                    <p>{{dramaNum}}</p>
                    <p>电视剧总数</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {appStat} from "../../service/api";

    export default {
        data(){
            return{
                dramaNum:'',
                movieNum:'',
                userNum:'',
            }
        },
        created:function(){
            appStat().then(res=>{
                if(res.code==='0'){
                    this.dramaNum = res.data.dramaNum
                    this.movieNum = res.data.movieNum
                    this.userNum = res.data.userNum
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .card-data{
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        /*border: 1px solid red;*/
        .card{
            width:25%;
            min-width: 400px;
            height: 120px;
            box-sizing: border-box;
            @include flex;
            .box{
                width:96%;
                min-width: 380px;
                height: 80px;
                box-sizing: border-box;
                border-radius: 5px;
                overflow: hidden;
                @include flex;
                @include boxShadow;
                .l{
                    width: 30%;
                    height: 80px;
                    background: #1ebfae;
                    @include flex;
                    i{
                        display: block;
                        width: 50px;
                        img{
                            width: 100%;
                        }
                    }

                }
                .r{
                    width: 70%;
                    height: 80px;
                    background: #fff;
                    @include flexY(center);
                    p:nth-child(1){
                        color: #5f6468;
                        font-size: 20px;
                        padding-left: 10px;
                        box-sizing: border-box;
                    }
                    p:nth-child(2){
                        color:#9fadbb;
                        font-size: 14px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        padding-top: 10px;
                    }
                }
            }
        }
    }
</style>
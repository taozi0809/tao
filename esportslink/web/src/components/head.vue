<template>
    <div class="head">
        <div class="head-c">
            <div class="head-l"><router-link title="logo"  to="/index"><img src="../assets/image/head/logo.png" alt=""></router-link></div>
            <div class="head-r">
                <ul>
                    <li><router-link title="主页" to="/index" exact>主页</router-link></li>
                    <li><router-link title="比分" to="/score">比分</router-link></li>
                    <li><router-link title="赛程" to="/schedule">赛程</router-link></li>
                    <li><router-link title="赛事" to="/league">赛事</router-link></li>
                    <li><router-link title="直播" to="/live">直播</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .head{
        width: 100%;
        height: 52px;
        background-color: #18212b;
        border-bottom: 2px #f83b3b solid;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
        .head-c{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            .head-l{
                height: 36px;
                flex-shrink: 0;
                img{
                    height: 100%;
                }
            }
            .head-r{
                ul{
                    display: flex;
                    align-items: center;
                    li{

                        a{
                            display: block;
                            width: 80px;
                            height: 50px;
                            text-align: center;
                            line-height: 50px;
                            font-size: 16px;
                        }
                        a:hover{
                            color: #f83b3b;
                        }
                        .active{
                            background: #f83b3b;
                            color: #fff;
                        }
                        .active:hover{
                            color: #fff;
                        }
                    }
                }
            }
        }

    }
</style>

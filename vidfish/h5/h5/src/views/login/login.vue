<template>
    <div class="login">
        <div class="top"><img src="../../assets/images/login/clip_group_.png" alt=""></div>
        <span @click="$router.back(-1)" class="vidfish-back"><img src="../../assets/images/login/back.png" alt=""></span>

        <div class="login-main">

        </div>
    </div>
</template>


<style lang="scss" scoped>
.top{
    width: 750px;
    height: 210px;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 0;
    img{
        width: 100%;
    }
}
.login-main{
    width: 750px;
    height: 1000px;
    position: absolute;
    top: 0;
    z-index: 1;
}
</style>
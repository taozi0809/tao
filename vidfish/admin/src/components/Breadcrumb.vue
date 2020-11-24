<template>
    <div class="breadcrumb">
        <!--<i class="icon-box"><img src="../assets/img/home.png" alt=""></i>-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.path }" v-for="item in breadcrumb">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        props: ['breadcrumb'],
    }
</script>
<style lang="scss" scoped>
    @import "../assets/css/mixin";
    .breadcrumb{
        width: 100%;
        height: 40px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 10px;
        /*.icon-box{*/
            /*width: 20px;*/
            /*margin-left: 10px;*/
            /*display: block;*/
            /*img{*/
                /*width: 100%;*/
            /*}*/
        /*}*/
        .el-breadcrumb{
            width: 100%;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
    }
</style>
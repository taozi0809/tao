<template>
    <div class="home">
        <div class="btn" @click="handleClick"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            handleClick(){
                this.$toast('即将上线，敬请期待！');
            },
        }
    }
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 1315px;
        background: url("../../assets/img/bg.jpg");
        background-size: 100% 100%;
        .btn{
            width: 150px;
            height: 50px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 1205px;
            z-index: 9;
            /*border: 1px solid red;*/
        }

    }

</style>
<style>

</style>

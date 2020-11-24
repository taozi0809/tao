<template>
    <div class="user">
        <div class="top-bg"><img src="../../assets/images/user/vip_bgg.png" alt=""></div>
        <div class="vidfish-content">

        </div>
        <Nav/>
    </div>
</template>


<script>
    import Nav from '../../components/nav'
    export default {
        components:{Nav},
        data(){
            return{

            }
        },
        created:function(){

        }
    }
</script>
<style lang="scss" scoped>
    .user{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        .top-bg{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .vidfish-content{
            position: absolute;
            top: 0;
            z-index: 2;
            left: 0;
            width: 100%;
            height: 2000px;
            border: 1px solid red;
            box-sizing: border-box;
        }
    }
</style>
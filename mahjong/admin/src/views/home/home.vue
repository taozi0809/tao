<template>
    <div class="home">
        <Head/>
        <Aside/>
        <div class="main" :class="isCollapse?'main-pack-up':'main-unfold'">
            <overview v-if="$route.path=='/home'"/>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import Aside from '../../components/aside/Aside'
    import {mapState, mapMutations} from 'vuex'
    import overview from "../data_report/overview";

    export default {
        components:{Head,Aside,overview},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['isCollapse']),
        },

    }

</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        .main{
            position: fixed;
            right: 0;
            top:60px;
            left:180px;
            bottom: 0;
            min-width: 1020px;
            background: #f0f2f5;
            box-sizing: border-box;
            transition:left 0.3s;
            overflow-x: hidden;
            overflow-y: auto;
            z-index: 2001;
        }
        .main-pack-up{
            left:60px;
        }
        .main-unfold{
            left:180px;
        }
    }
</style>
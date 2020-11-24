<template>
    <div class="tv">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <tv-head/>
        <tv-list/>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import TvList from '../../components/video/TvList'
    import TvHead from '../../components/video/TvHead'
    export default {
        components:{Breadcrumb,TvList,TvHead},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/tvManage',
                        name:'电视剧管理'
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .tv{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
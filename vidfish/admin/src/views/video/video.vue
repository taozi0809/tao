<template>
    <div class="video">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <video-head/>
        <video-list/>
    </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import VideoList from '../../components/video/VideoList'
    import VideoHead from '../../components/video/VideoHead'
    export default {
        components:{Breadcrumb,VideoList,VideoHead},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/videoManage',
                        name:'电影管理'
                    },
                    {
                        path:'/videoManage',
                        name:'电影详情'
                    }
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .video{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
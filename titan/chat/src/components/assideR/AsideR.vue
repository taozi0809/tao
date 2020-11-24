<template>
    <div class="aside-r">
        <FriendInfo v-if="chatStatus==1"/>
        <GroupInfo v-if="chatStatus==2"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import FriendInfo from './FriendInfo'
    import GroupInfo from './GroupInfo'
    import GroupManage from './GroupManage'

    export default {
        components:{FriendInfo,GroupInfo,GroupManage},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['chatStatus'])
        },
    }
</script>

<style scoped lang="scss">
    .aside-r{
        width:14vw;
        height: 39vw;
        min-width: 224px;
        min-height: 625px;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        background: #fff;
        box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
        border-left: 1px solid #D0D0D0;
    }
</style>
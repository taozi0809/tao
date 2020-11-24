<template>
    <div class="list">
        <Nav/>
        <MessageItem v-if="nav=='0'"/>
        <FriendItem v-if="nav=='1'"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import MessageItem from './MessageItem'
    import Nav from './Nav'
    import FriendItem from './FriendItem'
    export default {
        components:{MessageItem,Nav,FriendItem},
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['nav']),
        },

    }
</script>

<style lang="scss" scoped>
    .list{
        width:13vw ;
        min-width: 208px;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        position: absolute;
        top: 114px;
        left: 0;
        bottom: 0;
        /*border: 1px solid red;*/
    }
    .list::-webkit-scrollbar {display:none}
</style>
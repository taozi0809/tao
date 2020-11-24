<template>
    <div class="nav">
        <div v-if="nav=='0'" class="box">
            <div class="item active"><img :src="ma" alt=""></div>
            <div class="item" @click="NAV('1')"><img :src="f" alt=""></div>
        </div>
        <div v-if="nav=='1'" class="box">
            <div class="item" @click="NAV('0')"><img :src="m" alt=""></div>
            <div class="item active"><img :src="fa" alt=""></div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                m:require('../../assets/images/asideL/nav/message.png'),
                ma:require('../../assets/images/asideL/nav/message_active.png'),
                f:require('../../assets/images/asideL/nav/friend.png'),
                fa:require('../../assets/images/asideL/nav/friend_active.png'),
            }
        },
        computed:{
            ...mapState(['nav']),
        },
        methods:{
            ...mapMutations(['NAV']),
        }
    }
</script>

<style lang="scss" scoped>
.nav{
    width: 100%;
    height: 56px;
    background: #E8E9EE;
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .item{
            width: 50%;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 30px;
            }
        }
        .active{
            img{
                width: 34px;
            }
        }
    }
}
</style>
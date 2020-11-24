<template>
    <div class="start">
        <div class="main" @click="START('1')"></div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        methods:{
            ...mapMutations(['START']),
        },
    }
</script>

<style lang="scss" scoped>
.start{
    .main {
        background: url("../assets/img/game-start.jpg") no-repeat center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
</style>
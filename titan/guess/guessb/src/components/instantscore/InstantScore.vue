<template>
    <div class="main-list">
        <all-list/>
    </div>
</template>

<script>
    import AllList from '../../components/instantscore/AllList'
    export default {
        components:{AllList},
    }
</script>

<style lang="scss">
    @import "../../assets/css/mixin";
    .main-list{
        position:fixed;
        width: 100%;
        top:88px;
        bottom: 0;
        left:0;
        box-sizing: border-box;
        overflow: hidden;
    }
</style>
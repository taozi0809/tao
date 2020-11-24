<template>
    <div class="exponent">
        <Banner/>
        <detail-list/>
    </div>
</template>

<script>
    import Banner from '../../components/detail/BasketballBanner'
    import DetailList from '../../components/detail/BasketballDetailList'
    export default {
        components:{Banner,DetailList}
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .exponent{
        width: 100%;
        height: 100%;
    }
</style>
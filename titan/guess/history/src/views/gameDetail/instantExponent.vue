<template>
    <div class="instant-exponent">
        <Head/>
        <div class="instant-exponent-box">
            <instant-exponent-list/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import InstantExponentList from '../../components/instantExponent/InstantExponentList'
    export default {
        components:{Head,InstantExponentList}
    }
</script>

<style lang="scss" scoped>
    .instant-exponent{
        width: 100%;
        height: 100%;
        .instant-exponent-box{
            width: 100%;
            position: fixed;
            box-sizing: border-box;
            top:88px;
            bottom: 0;
            left:0;
        }
    }
</style>
<template>
    <div class="home">
        <Head/>
        <div class="instant-score-box">
            <instant-score/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import InstantScore from '../../components/instantscore/InstantScore'
    export default {
        components:{Head,InstantScore}
    }
</script>
<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        .instant-score-box{
            width: 100%;
            position: fixed;
            top:88px;
            left:0;
            bottom: 0;
            box-sizing: border-box;
        }
    }
</style>
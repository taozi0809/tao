<template>
    <div class="instant-score">
        <Head/>
        <instant-score/>
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
    .instant-score{
        width: 100%;
        height: 100%;
    }
</style>
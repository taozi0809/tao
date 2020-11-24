<template>
    <div class="game-result">
        <Head/>
        <Date/>
        <div class="GameResultList-box">
            <GameResultList/>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/head/Head'
    import Date from '../../components/gameResult/Date'
    import GameResultList from '../../components/gameResult/GameResultList'
    export default {
        components:{Head,Date,GameResultList}
    }
</script>
<style lang="scss" scoped>
    .game-result{
        width: 100%;
        height: 100%;
        .GameResultList-box{
            width: 100%;
            position: fixed;
            top:208px;
            bottom: 0;
            left:0;
            box-sizing: border-box;
        }
    }
</style>
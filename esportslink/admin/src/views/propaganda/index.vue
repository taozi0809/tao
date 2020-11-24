<template>
    <div class="propaganda">
        <div class="propaganda-head">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="'比赛'" name="game"><game/></el-tab-pane>
                <el-tab-pane :label="'约战'" name="fight"><fight/></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import fight from '../../components/propaganda/fight'
    import game from '../../components/propaganda/game'
    export default {
        components:{game,fight},
        data(){
            return{
                activeName: 'game'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .propaganda-head{
        width: 100%;
        box-sizing: border-box;
        padding:0px 10px;
    }
</style>
<template>
    <div class="fight">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'待处理 '+fightFirstNum" name="pending"><pending/></el-tab-pane>
            <el-tab-pane :label="'待申诉 '+fightFirstbNum" name="pendingAppeal"><pendingAppeal/></el-tab-pane>
            <el-tab-pane :label="'待结算 '+fightSecondNum" name="settlement"><settlement/></el-tab-pane>
            <el-tab-pane :label="'已完成 '+fightThirdNum" name="completed"><completed/></el-tab-pane>
            <el-tab-pane :label="'申诉 '+fightFourthNum" name="appeal"><appeal/></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import pending from '../../components/fight/pending'
    import pendingAppeal from '../../components/fight/pendingAppeal'
    import settlement from '../../components/fight/settlement'
    import completed from '../../components/fight/completed'
    import appeal from '../../components/fight/appeal'
    import {mapState,mapMutations} from 'vuex'

    export default {
        components:{pending,pendingAppeal,settlement,completed,appeal},
        data(){
            return{
                activeName:'pending',
            }
        },
        computed:{
            ...mapState(['fightFirstNum','fightSecondNum','fightThirdNum','fightFourthNum','fightFirstbNum']),
        },
        methods:{
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .fight{
        box-sizing: border-box;
        padding: 10px 20px;
    }
</style>
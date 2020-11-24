<template>
    <div class="aside-l">
        <HeadItem/>
        <Search/>
        <listItem v-if="status=='0'"/>
        <Balance v-if="status=='1'"/>
    </div>
</template>

<script>
    import HeadItem from '../../components/asideL/HeadItem'
    import Search from '../../components/asideL/Search'
    import ListItem from '../../components/asideL/ListItem'
    import Balance from '../../components/asideL/Balance'
    import {mapState, mapMutations} from 'vuex'
    export default {
        components:{HeadItem,Search,ListItem,Balance},
        computed:{
            ...mapState(['status']),
        },

    }
</script>

<style lang="scss" scoped>
    .aside-l{
        width:13vw;
        height: 39vw;
        min-width: 208px;
        min-height: 625px;
        overflow: hidden;
        box-sizing: border-box;
        background: #D5DCE6;
        position: relative;
        box-shadow: 0 2px 4px 1px rgba(40, 120, 255, 0.08), 0 0 6px 1px rgba(0, 0, 0, 0.08);
        border-right: none;
    }

</style>
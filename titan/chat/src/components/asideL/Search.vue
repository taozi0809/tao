<template>
    <div class="search">
        <div class="input" @click="goSearch">搜索</div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        created:function(){

        },
        methods:{
            ...mapMutations(['POPOVER']),
            goSearch(){
                this.POPOVER('14')
            }
        }

    }
</script>

<style lang="scss" scoped>
    .search{
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        background: #E8E9EE;
        box-sizing: border-box;
        padding: 0 10px;
        position: relative;
        margin-bottom: 2px;
        .input{
            display: block;
            width: 100%;
            background: #D5DCE6;
            font-size: 14px;
            /*color: #818E9E;*/
            border-radius: 5px;
            height:30px;
            line-height: 30px;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 10px;
            color: #888;
            text-align: center;
        }
        /*input::-webkit-input-placeholder { !* WebKit, Blink, Edge *!*/
            /*text-align: center;*/
        /*}*/
        /*input:-moz-placeholder { !* Mozilla Firefox 4 to 18 *!*/
            /*text-align: center;*/
        /*}*/
        /*input::-moz-placeholder { !* Mozilla Firefox 19+ *!*/
            /*text-align: center;*/
        /*}*/
        /*input:-ms-input-placeholder { !* Internet Explorer 10-11 *!*/
            /*text-align: center;*/
        /*}*/
    }
</style>
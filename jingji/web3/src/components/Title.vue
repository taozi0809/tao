<template>
    <div class="title" :class="isPC?'pc-title':'mobile-title'">
        <div class="t1">{{title.name}}</div>
        <div class="t2">{{title.des}}</div>
    </div>
</template>

<script>
    import {ispc} from "../utils/isPc";

    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        },
        props:["title"],
    }
</script>

<style lang="scss" scoped>
    .pc-title{
        .t1{
            text-align: center;
            color:#5581CD;
            font-size: 32px;
            font-weight: bold;
            line-height: 24px;
        }
        .t2{
            text-align: center;
            color:#5C88D3;
            font-size: 18px;
            line-height: 22px;
            margin-top: 15px;
        }
    }
    .mobile-title{
        .t1{
            text-align: center;
            color:#5581CD;
            font-size: 5vw;
            font-weight: bold;
        }
        .t2{
            text-align: center;
            color:#5C88D3;
            font-size: 4vw;
            margin-top: 3vw;
        }
    }
</style>

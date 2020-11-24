<template>
    <div class="mark" :class="isPC?'pc-item1':'mobile-item1'" id="item1">
        <div class="banner"><img src="../../assets/img/main/item1/bg.png" alt=""></div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
.pc-item1{
    width: 100%;
    overflow: hidden;
    background: black;
    position: relative;
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
}
.mobile-item1{
    width: 100%;
    background:#1a2856;
    position: relative;
    box-sizing: border-box;
    padding-top:14vw;
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
}
</style>

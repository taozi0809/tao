<template>
    <div class="getten">
        <div class="twt-tabs">
            <div class="twt-ten"></div>
            <div class="twt-tube" @click="PRIZETYPE('7-2')"></div>
            <div class="twt-strip" @click="PRIZETYPE('7-3')"></div>
        </div>

        <img src="../../../assets/img/sendOrget/ten.png" alt="" class="sg-top">
        <img src="../../../assets/img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="../../../assets/img/close.png" alt="" class="sg-close" @click="PRIZETYPE('-1')">
        <div><img src="../../../assets/img/sendOrget/grid.png" alt="" class="sg-grid"></div>
        <div class="item-box">
            <li class="item-list" v-for="(item,index) in getmjarr" :key="index" @click="">
                <img :src="item | areaResW(index)" alt="">
            </li>
        </div>
        <div class="sg-tBtn">
            <p>{{gettext}}</p>
            <div class="logview-btn-box">
                <img src="../../../assets/img/logview.png" alt="" class="btn btn-left" @click="">
                <img src="../../../assets/img/sendOrget/get-btn.png" alt="" class="btn btn-right" @click="">
            </div>
        </div>
        <div class="hint">必须点“去索取”按钮，分享才生效。</div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {getmjarr} from "../../../utils/tool";

    export default {
        data(){
            return{
                gettext:"",
                getmjarr:getmjarr,
            }
        },
        computed:{
            ...mapState(['loginInfo']),
        },
        methods:{
            ...mapMutations(['PRIZETYPE']),
        },
    }
</script>


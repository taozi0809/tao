<template>
    <div class="sendten">
        <div class="twt-tabs">
            <div class="twt-ten"></div>
            <div class="twt-tube" @click="PRIZETYPE('6-2')"></div>
            <div class="twt-strip" @click="PRIZETYPE('6-3')"></div>
        </div>

        <img src="../../../assets/img/sendOrget/ten.png" alt="" class="sg-top">
        <img src="../../../assets/img/sendOrget/content-box.png" alt="" class="sg-bottom">
        <img src="../../../assets/img/close.png" alt="" class="sg-close" @click="PRIZETYPE('-1')">
        <div><img src="../../../assets/img/sendOrget/grid.png" alt="" class="sg-grid"></div>

        <div class="item-box">
            <li class="item-list" v-for="(item,index) in loginInfo.Num.slice(0,9)" :key="index">
                <img :src="item | areaResW(index)" alt="">
            </li>
        </div>

        <div class="item-box">
            <li class="item-list item-list-ten" v-for="(item,index) in loginInfo.Num.slice(0,6)" :key="index" @click="">
                <span class="item-list-num" v-if="item>0">{{item>0?item:0}}</span>
            </li>
        </div>

        <div class="sg-tBtn">
            <p>{{sendTxtnew}}</p>
            <div class="logview-btn-box">
                <img src="../../../assets/img/logview.png" alt="" class="btn btn-left" @click="">
                <img src="../../../assets/img/sendOrget/send-btn.png" alt="" class="btn btn-right" @click="">
            </div>
        </div>

        <div class="hint">必须点“赠送”按钮，分享才生效。</div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{
                sendTxtnew:"",
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
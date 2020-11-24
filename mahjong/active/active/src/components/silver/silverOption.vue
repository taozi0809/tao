<template>
    <div class="silverOption">
        <div class="claim-box">
            <img src="../../assets/img/close.png" alt="" class="acr-close" @click="PRIZETYPE('-1')">
            <img src="../../assets/img/claim/silver.png" alt="" class="claim-parti">
            <div class="mj-box-claim">
                <div class="show-allmj show-allmj-awa">
                    <div class="show-allmj-item" v-for="(item,index) in loginInfo.Num" :key="index">
                        <img :src="item | mjTosrc(index)" alt="">
                    </div>
                </div>
                <div class="show-allmj show-allmj-number show-allmj-number-awa">
                    <div class="show-allmj-item" v-for="(item,index) in loginInfo.Num" :key="index" @click="">
                        <span class="red-circle" v-if="item>0">{{item>0?item:0}}</span>
                    </div>
                </div>
            </div>
            <div class="partiClaim-txt">
                <p>*点击上方麻将添加到兑奖区，点击下方将麻将放回</p>
            </div>
            <div class="giving">
                <li v-for="(item,index) in sendInit(9)" :key="index">
                    <img :src="item | areares" alt="" class="full" @click="">
                </li>
            </div>
            <div class="btn-box btn-box-top">
                <img src="../../assets/img/claim/claim-btn.png" alt="" class="claim-btn claim-btn-get" @click="">
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {sendInit} from "../../utils/tool";

    export default {
        data(){
            return{
                sendInit:sendInit,
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
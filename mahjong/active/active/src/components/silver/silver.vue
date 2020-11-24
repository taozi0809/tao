<template>
    <div class="silver">
        <div class="claim-box">
            <img src="../../assets/img/close.png" alt="" class="acr-close" @click="PRIZETYPE('-1')">
            <img src="../../assets/img/claim/silver.png" alt="" class="claim-parti">
            <img src="../../assets/img/claim/silver-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="../../assets/img/claim/claim-btn.png" alt="" class="claim-btn" @click="PRIZETYPE('2-1')">
            </div>
            <div class="claim-txt">
                <p>条件：</p>
                <p>收集任意完整花色的牌，共9张。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    export default {
        data(){
            return{

            }
        },
        methods:{
            ...mapMutations(['PRIZETYPE']),
        },
    }
</script>
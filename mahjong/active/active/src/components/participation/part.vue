<template>
    <div class="part">
        <div class="claim-box">
            <img src="../../assets/img/close.png" alt="" class="acr-close" @click="PRIZETYPE('-1')">
            <img src="../../assets/img/claim/participation.png" alt="" class="claim-parti">
            <img src="../../assets/img/claim/parti-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="../../assets/img/claim/claim-btn.png" alt="" class="claim-btn" @click="PRIZETYPE('4-1')">
            </div>
            <div class="claim-txt">
                <p>条件：</p>
                <p>收集任意9张不重复的牌。</p>
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

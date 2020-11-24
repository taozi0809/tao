<template>
    <div class="special">
        <div class="claim-box">
            <img src="../../assets/img/close.png" alt="" class="acr-close" @click="PRIZETYPE('-1')">
            <img src="../../assets/img/claim/special.png" alt="" class="claim-parti">
            <img src="../../assets/img/claim/special-awa.png" alt="" class="acr-parti">
            <div class="btn-box">
                <img src="../../assets/img/claim/claim-btn.png" alt="" class="claim-btn" @click="PRIZETYPE('0-1')">
            </div>

            <div class="claim-txt">
                <p>条件：</p>
                <p>收集全部花色的牌，共27张</p>
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
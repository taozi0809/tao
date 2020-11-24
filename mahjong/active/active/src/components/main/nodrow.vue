<template>
    <div class="nodrow">
        <div class="cardNum-bj">
            <div class="nodrow-header">
                <img src="../../assets/img/close.png" alt="" @click="PRIZETYPE('-1')">
            </div>

            <div class="content-box">
                <div class="card-list">
                    <li class="card-list-top">1.“财神麻将”内将会发布取牌码，使用取牌码，在首页即可兑换抽奖次数。</li>
                    <li>
                        <img src="" alt="">
                        <a href="https://www.shenzhouxing.com/hnzz/dl/">
                            <span class="download-game">下载游戏</span>
                        </a>
                    </li>
                    <li class="card-list-top">2.邀请好友加入游戏，每邀请一位好友加入，增加一次抽奖次数。</li>

                    <li class="card-list-top">3.在“麻将全家福”首页，填写取牌码。</li>
                    <li><img src="../../assets/img/card-dh.png" alt="" class="gzh"></li>

                    <li class="card-list-top">点击兑换后翻牌次数随后增加。</li>
                    <li><img src="../../assets/img/card-mp.png" alt="" class="card-mp"></li>
                </div>

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
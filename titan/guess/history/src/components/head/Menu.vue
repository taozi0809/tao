<template>
    <div class="menu-page">
        <ul>
            <li @click="handleInstantScore">
                <span><img src="../../assets/img/head/menu/instant-score.png" alt=""></span>
                <p>即时比分</p>
            </li>
            <li @click="handleInstantExponent">
                <span><img src="../../assets/img/head/menu/instant-index.png" alt=""></span>
                <p>即时指数</p>
            </li>
            <li @click="handleGameResult">
                <span><img src="../../assets/img/head/menu/game-result.png" alt=""></span>
                <p>赛程赛果</p>
            </li>
            <li @click="handleDataBank">
                <span><img src="../../assets/img/head/menu/data-bank.png" alt=""></span>
                <p>资料库</p>
            </li>
            <li @click="handleTradingIndex">
                <span><img src="../../assets/img/head/menu/trading-index.png" alt=""></span>
                <p>交易指数</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        methods:{
            ...mapMutations(['MESSAGE','ISMENU']),
            handleInstantScore(){
                this.ISMENU(false)
                this.$router.push('/')
            },
            handleInstantExponent(){
                this.ISMENU(false)
                this.$router.push('/instantExponent')
            },
            handleGameResult(){
                this.ISMENU(false)
                this.$router.push('/gameResult')
            },
            handleDataBank(){
                this.ISMENU(false)
                this.$router.push('/dataBank')
            },
            handleTradingIndex(){
                this.ISMENU(false)
                this.$router.push('/trading')
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .menu-page{
        position: fixed;
        z-index: 11;
        top:90px;
        left:0;
        width: 100%;

        ul{
            width: 100%;
            height: 330px;
            display: flex;
            flex-wrap: wrap;
            background: #fff;
            overflow: hidden;
            li{
               @include flexY(center);
                width: 25%;
                box-sizing: border-box;
                span{
                  display: block;
                  width: 72px;
                  margin: 0 auto;
                  margin-bottom: 18px;
                    img{
                        width: 100%;
                    }
                }
                p{
                    color: #999999;
                    font-size: 24px;
                    text-align: center;
                }
            }
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-200%);
    }
</style>


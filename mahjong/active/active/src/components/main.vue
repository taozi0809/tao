<template>
    <div class="main">
        <div class="header">
            <div class="user-box">
                <img :src="loginInfo.Headimgurl" alt="" class="user-w">
                <div class="user-info">
                    <div class="user-id">{{loginInfo.AccountID}}</div>
                    <div class="user-name">{{loginInfo.Nickname}}</div>
                </div>
            </div>
            <img src="../assets/img/aclogo.png" alt="" class="activity-logo" @click="START('3')">
        </div>
        <div class="home-content">
            <div class="home-content-awa">
                <div class="home-content-item home-awa0" @click="PRIZETYPE('0')">
                    <img src="../assets/img/gou.png" alt="" v-if="topP">
                </div>
                <div class="home-content-item home-awa1" @click="PRIZETYPE('1')">
                    <img src="../assets/img/gou.png" alt="" v-if="topF">
                </div>
                <div class="home-content-item home-awa2" @click="PRIZETYPE('2')">
                    <img src="../assets/img/gou.png" alt="" v-if="topS">
                </div>
                <div class="home-content-item home-awa3" @click="PRIZETYPE('3')">
                    <img src="../assets/img/gou.png" alt="" v-if="topT">
                </div>
                <div class="home-content-item home-awa4" @click="PRIZETYPE('4')">
                    <img src="../assets/img/gou.png" alt="" v-if="topL" @click="goPart">
                </div>
            </div>
            <div class="message">
                <img src="../assets/img/ad.png" alt="">
            </div>
            <div class="ad-text">
                <div class="ad-text-cont">
                    <div class="ad-text-pos"></div>
                </div>
            </div>
            <div class="show-allmj">
                <div class="show-allmj-item" v-for="(item,index) in loginInfo.Num" :key="index">
                    <img :src="item | mjTosrc(index)" alt="">
                </div>
            </div>
            <div class="show-allmj show-allmj-number">
                <div class="show-allmj-item" v-for="(item,index) in loginInfo.Num" :key="index">
                    <span class="red-circle" v-if="item>0">{{item>0?item:0}}</span>
                </div>
            </div>
        </div>
        <div class="home-deputy">
            <div class="home-deputy-left">
                <img src="../assets/img/btn-acr.png" alt="" class="add-details" @click="PRIZETYPE('5')">
                <img src="../assets/img/hand.png" alt="" class="hand" @click="goGetmj">
                <span class="red-circle addnumber">{{loginInfo.CollectTimes}}</span>
            </div>

            <div class="home-deputy-right">
                <input type="text" placeholder="填写取牌码" maxlength="5" class="input-code" v-model="code"
                       onfocus="this.placeholder=''" onblur="this.placeholder='填写取牌码'">
                <img src="../assets/img/conv.png" alt="" class="conv" @click="getTodayCode">
            </div>
        </div>
        <div class="footer">
            <img src="../assets/img/send-acr.png" alt="" class="footer-left" @click="PRIZETYPE('6-1')">
            <img src="../assets/img/focus.png" alt="" class="footer-main" @click="PRIZETYPE('8')">
            <img src="../assets/img/get-acr.png" alt="" class="footer-right" @click="PRIZETYPE('7-1')">
        </div>

        <part v-if="prizeType=='4'"/>
        <bronze v-if="prizeType=='3'"/>
        <silver v-if="prizeType=='2'"/>
        <gold v-if="prizeType=='1'"/>
        <special v-if="prizeType=='0'"/>

        <partOption v-if="prizeType=='4-1'"/>
        <bronzeOption v-if="prizeType=='3-1'"/>
        <silverOption v-if="prizeType=='2-1'"/>
        <goldOption v-if="prizeType=='1-1'"/>
        <specialOption v-if="prizeType=='0-1'"/>

        <partSuccess v-if="prizeType=='4-0'"/>
        <bronzeSuccess v-if="prizeType=='3-0'"/>
        <silverSuccess v-if="prizeType=='2-0'"/>
        <goldSuccess v-if="prizeType=='1-0'"/>
        <specialSuccess v-if="prizeType=='0-0'"/>

        <nodrow v-if="prizeType=='5'"/>
        <rank v-if="prizeType=='8'"/>

        <sendW v-if="prizeType=='6-1'"/>
        <sendT v-if="prizeType=='6-2'"/>
        <sendS v-if="prizeType=='6-3'"/>
        <askW v-if="prizeType=='7-1'"/>
        <askT v-if="prizeType=='7-2'"/>
        <askS v-if="prizeType=='7-3'"/>


    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    import part from '../components/participation/part'
    import bronze from '../components/bronze/bronze'
    import silver from '../components/silver/silver'
    import gold from '../components/gold/gold'
    import special from '../components/special/special'

    import partOption from '../components/participation/partOption'
    import bronzeOption from '../components/bronze/bronzeOption'
    import silverOption from '../components/silver/silverOption'
    import goldOption from '../components/gold/goldOption'
    import specialOption from '../components/special/specialOption'

    import partSuccess from '../components/participation/partSuccess'
    import bronzeSuccess from '../components/bronze/bronzeSuccess'
    import silverSuccess from '../components/silver/silverSuccess'
    import goldSuccess from '../components/gold/goldSuccess'
    import specialSuccess from '../components/special/specialSuccess'

    import nodrow from '../components/main/nodrow'
    import rank from '../components/main/rank'

    import sendW from '../components/main/send/w'
    import sendT from '../components/main/send/t'
    import sendS from '../components/main/send/s'
    import askW from '../components/main/ask/w'
    import askT from '../components/main/ask/t'
    import askS from '../components/main/ask/s'


    export default {
        components:{part,bronze,silver,gold,special,
            partOption,bronzeOption,silverOption,goldOption,specialOption,
            partSuccess,bronzeSuccess,silverSuccess,goldSuccess,specialSuccess,
            nodrow,sendW,sendT,sendS,rank,askW,askT,askS,
        },
        data(){
            return{
                topP:false,
                topF:false,
                topS:false,
                topT:false,
                topL:false,
                code:"",
            }
        },
        computed:{
            ...mapState(['loginInfo','prizeType']),
        },
        methods:{
            ...mapMutations(['START','PRIZETYPE']),
            goGetmj(){},
            getTodayCode(){},
            goSendten(){},
            goRecopyrank(){},
            goGetten(){},
        },
    }
</script>
<template>
    <div class="competition">
        <div class="head">
            <span class="back" @click="handleBack"><i><img src="../../assets/img/back.png" alt=""></i></span>
            <h2>赛事</h2>
            <!--<span class="btn"  @click="handleConfirm">确认</span>-->
            <span class="btn" v-if="hideNumbers!=totalHideNumbers" @click="handleConfirm">确认</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="item in competitionList" :class="item.selected?'selected':''" @click="handleSelect(item)">
                        <span>{{item.leagueName}}</span>
                        <span>（{{item.startCount}}场）</span>
                        <span v-if="item.selected"><i><img src="../../assets/img/selected.png" alt=""></i></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bot">
            <div class="all-selected" @click="handleSelectedAll">
                <span v-if="activeIndex!='selectedAll'"><img src="../../assets/img/select.png" alt=""></span>
                <span v-if="activeIndex==='selectedAll'"><img src="../../assets/img/select-active.png" alt=""></span>
                全选
            </div>
            <div class="invert-selected" @click="handleSelectedInvert">
                <span v-if="activeIndex!='selectedInvert'"><img src="../../assets/img/select.png" alt=""></span>
                <span v-if="activeIndex==='selectedInvert'"><img src="../../assets/img/select-active.png" alt=""></span>
                反选
            </div>
            <div class="league-selected" @click="handleSelectedLeague">
                <span v-if="activeIndex!='selectedLeague'"><img src="../../assets/img/select.png" alt=""></span>
                <span v-if="activeIndex==='selectedLeague'"><img src="../../assets/img/select-active.png" alt=""></span>
                五大联赛
            </div>
            <div class="hide-numbers">
                隐藏比赛<span>{{hideNumbers}}</span>场
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                competitionList:[],
                activeIndex:'selectedAll',
                totalHideNumbers:0,
            }
        },
        computed:{
            ...mapState(['competitionFiltrate']),
            hideNumbers(){
                let number = 0
                for(let i in this.competitionList){
                    if(!this.competitionList[i].selected){
                        number = this.competitionList[i].startCount+number
                    }
                }
                return number
            }
        },
        created:function(){
            let arr = this.competitionFiltrate
            for(let i in arr){
                arr[i].selected = true
                this.totalHideNumbers = arr[i].startCount + this.totalHideNumbers
            }
            this.competitionList = arr
            // console.log(arr,this.totalHideNumbers)
        },
        mounted:function(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    },
                })
            })
        },
        methods:{
            ...mapMutations(['ISCOMPETITION','ALLSCORE','GUESSSCORE','BEIDGSSCORE','FOOTBALLSCORE','COMPETITIONFILTRATEIDARR']),
            handleBack(){
                this.ISCOMPETITION(false)
            },
            handleConfirm(){
                this.ISCOMPETITION(false)
               // if(this.hideNumbers==0){return}
                let arr = []
                for(let i in this.competitionList){
                    if(this.competitionList[i].selected){
                     arr.push(this.competitionList[i].leagueId)
                    }
                }
               this.COMPETITIONFILTRATEIDARR(arr)
            },
            handleSelect(item){
                this.activeIndex = ''
                for(let i in this.competitionList){
                    if(this.competitionList[i].leagueName==item.leagueName){
                        this.competitionList[i].selected= !this.competitionList[i].selected
                    }
                }
                this.competitionList = JSON.parse(JSON.stringify(this.competitionList))
            },
            handleSelectedAll(){
                if(this.activeIndex=='selectedAll'){return}
                this.activeIndex = 'selectedAll'
                for(let i in this.competitionList){
                    this.competitionList[i].selected = true
                }
            },
            handleSelectedInvert(){
                if(this.activeIndex == 'selectedInvert'){return}
                this.activeIndex = 'selectedInvert'
                for(let i in this.competitionList){
                    this.competitionList[i].selected = !this.competitionList[i].selected
                }
                this.competitionList = JSON.parse(JSON.stringify(this.competitionList))
            },
            handleSelectedLeague(){
                if(this.activeIndex === 'selectedLeague'){return}
                this.activeIndex = 'selectedLeague'
                for(let i in this.competitionList){
                    if( this.competitionList[i].leagueName=='英超'||
                        this.competitionList[i].leagueName=='意甲'||
                        this.competitionList[i].leagueName=='德甲'||
                        this.competitionList[i].leagueName=='西甲'||
                        this.competitionList[i].leagueName=='法甲')
                    {
                        this.competitionList[i].selected = true
                    }else{
                        this.competitionList[i].selected = false
                    }
                }
                this.competitionList = JSON.parse(JSON.stringify(this.competitionList))
            },

        },
        watch:{
            competitionFiltrate(newValue,oldValue){
                if(newValue!=oldValue){
                    let arr = newValue
                    for(let i in arr){
                        arr[i].selected = true
                    }
                    this.competitionList = arr
                }
            }

        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
.competition{
   @include fixed(10);
    .head{
        width: 100%;
        height: 80px;
        background: #34C47C;
        position: relative;
        @include flex;
        font-size: 36px;
        color: #fff;
        .back{
            position: absolute;
            left: 20px;
            width: 40px;
            height: 100%;
            @include flex;
            i{
                display: block;
                width: 20px;
                height: 40px;
                img{
                    width: 100%;
                }
            }
        }
        .btn{
            display: block;
            font-size: 32px;
            color: #fff;
            position: absolute;
            right: 18px;
            box-sizing: border-box;
            width: 100px;
            height:80px;
            line-height: 80px;
            text-align: center;

        }
    }
    .wrapper{
        width: 100%;
        top:80px;
        bottom: 90px;
        left:0;
        box-sizing: border-box;
        position: absolute;
        padding: 10px 0;
        overflow: hidden;
        .content{
            width: 100%;
            ul{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                box-sizing: border-box;
                padding: 0 20px;
                li{
                    width: 345px;
                    height: 50px;
                    box-sizing: border-box;
                    background: #BEBEBE;
                    border-radius: 8px;
                    color: #333333;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    margin-top: 20px;
                    padding: 0 20px;
                    span{
                        width: 33.3%;
                        display: block;
                    }
                    span:nth-child(1){
                        text-align: left;
                    }
                    span:nth-child(2){
                      text-align: center;
                    }
                    span:nth-child(3){
                        @include flexX(flex-end);
                        i{
                            display: block;
                            width:28px;
                            img{
                                width: 100%;
                            }
                        }
                    }
                }
                li:nth-of-type(odd){ margin-right: 10px;}
                li:nth-of-type(even){ margin-left: 10px;}
                .selected{
                    color: #fff;
                    background: #34C47C;
                }
            }
        }
    }
    .bot{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 90px;
        box-sizing: border-box;
        overflow: hidden;
        @include flexX(flex-start);
        padding: 0 20px;
        .all-selected,.invert-selected,.league-selected{
            padding-right: 40px;
            height: 100%;
            font-size: 24px;
            color: #999999;
            @include flex;
            span{
                display: block;
                width: 24px;
                margin-right: 16px;
                img{
                    width: 100%;
                }
            }
        }
        .hide-numbers{
            color: #999;
            font-size: 20px;
            position: absolute;
            right: 20px;
            span{
                color: #34C47C;
            }
        }
    }
}
</style>
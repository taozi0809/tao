<template>
    <div class="competition">
        <div class="head">
            <span class="back" @click="handleBack"><i><img src="../../assets/img/back.png" alt=""></i></span>
            <h2>赛事</h2>
            <span class="btn" v-if="hideNumbers!=competition.length" @click="handleConfirm">确认</span>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <ul>
                    <li v-for="item in competitionList" :class="item.data[0].selected?'selected':''" @click="handleSelect(item)">
                        <span>{{item.name}}</span>
                        <span>（{{item.data.length}}场）</span>
                        <span v-if="item.data[0].selected"><i><img src="../../assets/img/selected.png" alt=""></i></span>
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
    import {mapState, mapMutations} from 'vuex'
    import {attributeGroup,attributeAdd} from "../../assets/js/tool";

    export default {
        data(){
            return{
                competitionList:[],
                arr:[],
                activeIndex:'selectedAll',
                hideNumbers:0,
            }
        },
        computed:{
            ...mapState(['competition']),
        },
        created:function(){
            this.arr = attributeAdd(this.competition,'selected',true)
            this.competitionList = attributeGroup(this.arr,'name')
        },
        methods:{
            ...mapMutations(['ISCOMPETITION','COMPETITION','ALLSCORE','GUESSSCORE','BEIDGSSCORE','FOOTBALLSCORE']),
            handleBack(){
                this.ISCOMPETITION(false)
            },
            handleConfirm(){
                this.ISCOMPETITION(false)
                let arr = []
                for(let i in this.arr){
                    if(this.arr[i].selected){
                        arr.push(this.arr[i])
                    }
                }
                if(this.$route.hash==='#slide2'){
                    this.GUESSSCORE(arr)
                }
                else if(this.$route.hash==='#slide3'){
                    this.BEIDGSSCORE(arr)
                }
                else if(this.$route.hash==='#slide4'){
                    this.FOOTBALLSCORE(arr)
                }
                else {
                    this.ALLSCORE(arr)
                }
            },
            handleSelect(item){
                let arr = this.arr
                for(let i in arr){
                    if(arr[i].name===item.name){
                        arr[i].selected= !arr[i].selected
                    }
                }
                this.competitionList = attributeGroup(arr,'name')
            },
            handleSelectedAll(){
                this.activeIndex === 'selectedAll'?'':(this.activeIndex = 'selectedAll',this.attributeAmend(this.arr),this.competitionList = attributeGroup(this.arr,'name'))
            },
            handleSelectedInvert(){
                this.activeIndex = 'selectedInvert'
                this.attributeInvert(this.arr)
            },
            handleSelectedLeague(){
                this.activeIndex === 'selectedLeague'?'':(this.activeIndex = 'selectedLeague',this.attributeScreen(this.arr),this.competitionList = attributeGroup(this.arr,'name'))

            },
            attributeAmend(arr){
                for(let i in arr){
                    arr[i].selected=true
                }
            },
            attributeInvert(arr){
                for(let i in arr){
                    arr[i].selected = !arr[i].selected
                }
                this.competitionList = attributeGroup(arr,'name')

            },
            attributeScreen(arr){
                for(let i in arr){
                    if(arr[i].name==='英超'||arr[i].name==='意甲'||arr[i].name==='德甲'||arr[i].name==='西甲'||arr[i].name==='法甲'){
                        arr[i].selected= true
                    }else{
                        arr[i].selected= false
                    }
                }
            },
        },
        watch:{
            competitionList(newValue,oldValue){
                let n = 0
                for(let i in this.arr){
                    if(!this.arr[i].selected){
                        n++
                    }
                }
                this.hideNumbers = n
            },
            hideNumbers(newValue,oldValue){
                if(newValue!=oldValue){
                    if(newValue===0){
                        this.activeIndex === 'selectedAll'
                    }
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
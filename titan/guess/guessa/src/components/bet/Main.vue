<template>
    <div class="main">

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import BetInput from './BetInput'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_odds} from "../../service/api";

    export default {
        components:{BetInput},
        data(){
            return{
                scroll:null,
                activeIndex:'',
                results:[],
                score:[],
                totalGoal:[],
                scoreData:{},
            }
        },
        computed:{
            ...mapState(['isBetInput','betInfo']),
        },
        created:function(){

            football_match_odds(this.betInfo.matchId).then(res=>{
                // console.log(res)
                if(res.code==='0'){
                    this.results = JSON.parse(res.data.results)
                    let obj1 = JSON.parse(res.data.results)
                    let obj2 = JSON.parse(res.data.score)
                    let obj3 = JSON.parse(res.data.totalGoal)
                    let arr1=[],arr2=[],arr3=[]
                    for(let i in obj1){
                        arr1.push({name:i,number:obj1[i],index:'a'+i})
                    }
                    for(let i in obj2){
                        arr2.push({name:i,number:obj2[i],index:'b'+i})
                    }
                    for(let i in obj3){
                        arr3.push({name:i,number:obj3[i],index:'c'+i})
                    }
                    console.log(arr1)
                    let arr11 = []
                    for(let i in arr1){
                       if(arr1[i].name=='draw'){
                           arr11[1] = arr1[i]
                       }
                       if(arr1[i].name=='guest'){
                           arr11[2] = arr1[i]
                       }
                       if(arr1[i].name=='home'){
                           arr11[0] = arr1[i]
                       }
                    }
                    this.results = arr11
                    this.score = arr2
                    this.totalGoal = arr3
                    this.scoreData = this.dispose(this.score)
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)
                }
            })
        },
        mounted:function(){
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods:{
            ...mapMutations(['ISBETINFO','GUESSINPUTDATA']),
            initScroll(){
                this.scroll = null
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollX: false,
                })
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            dispose(arr){
                if(arr.length>6){
                    return {
                        list:arr.slice(0,6),
                        isMore:'open'
                    }
                }
            },
            handleMore(){
                this.scoreData={
                    list:this.score,
                    isMore:'close'
                }
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleLess(){
                this.scoreData={
                    list:this.score.slice(0,6),
                    isMore:'open'
                }
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleClick(item,index){
                this.activeIndex=index
                this.GUESSINPUTDATA({
                    name:item.name,
                    number:item.number,
                    index:index
                })
                this.isBetInput?'':this.ISBETINFO(true)
            },


        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .main{
        position: absolute;
        top:0;
        bottom: 0;
        width: 100%;
        left:0;
        box-sizing: border-box;


    }
</style>
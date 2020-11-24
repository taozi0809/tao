<template>
  <div class="bet">
    <div class="wrapper" ref="wrapper" :class="isBetInput?'is-bet-input-active':'is-bet-input'">
      <div class="content">
        <Banner/>
        <div class="card">
          <div class="title">胜平负</div>
          <ul>
            <li v-for="item in results" @click="handleClick(item,item.index,item.pid)" :class="activeIndex==item.index?'active':''">
              <p>{{item.name | toName}}</p>
              <p>{{item.number}}</p>
            </li>
          </ul>
        </div>
        <div class="card">
          <div class="title">比分</div>
          <ul>
            <li v-for="item in scoreData.list" @click="handleClick(item,item.index,item.pid)" :class="activeIndex==item.index?'active':''">
              <p>{{item.name}}</p>
              <p>{{item.number}}</p>
            </li>
            <div class="more" @click="handleMore(scoreData.isMore)" v-if="scoreData.isMore==='open'">
              <p>展开</p>
              <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
            </div>
            <div class="more" @click="handleLess(scoreData.isMore)" v-if="scoreData.isMore==='close'">
              <p>收起</p>
              <span><img src="../../assets/img/arrow-top.png" alt=""></span>
            </div>
          </ul>
        </div>
        <div class="card">
          <div class="title">总进球</div>
          <ul>
            <li v-for="item in totalGoal" @click="handleClick(item,item.index,item.pid)" :class="activeIndex==item.index?'active':''">
              <p>{{item.name | toName}}</p>
              <p>{{item.number}}</p>
            </li>
          </ul>
        </div>

        <!--<div class="add-playing" v-if="testAccount.indexOf(userName)!=-1">-->
        <div class="add-playing">
          <div class="title">进球大小盘</div>
          <ul>
            <li v-for="item in ouCopy">
              <div class="item" :class="activeIndex==item.index+'l'?'active':''" @click="handleOuPour(item,item.index+'l')">
                <p>大于{{item.dparam}}</p>
                <p>{{item.overOdd}}</p>
              </div>
              <div class="item" :class="activeIndex==item.index+'r'?'active':''" @click="handleOuPour(item,item.index+'r')">
                <p>小于{{item.dparam}}</p>
                <p>{{item.underOdd}}</p>
              </div>
            </li>
            <div class="more" @click="handleMoreOu()" v-if="isOuMore=='open'">
              <p>展开</p>
              <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
            </div>
            <div class="more" @click="handleLessOu()" v-if="isOuMore=='close'">
              <p>收起</p>
              <span><img src="../../assets/img/arrow-top.png" alt=""></span>
            </div>
          </ul>
        </div>

        <!--<div class="add-playing" v-if="testAccount.indexOf(userName)!=-1">-->
        <div class="add-playing">
          <div class="title">亚洲让分</div>
          <ul>
            <li v-for="item in ahCopy">
              <div class="item" :class="activeIndex==item.index+'l'?'active':''" @click="handleAhPour(item,'1',item.index+'l')">
                <p>主队{{item.type=='1'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score}}</p>
                <p>{{item.odd}}</p>
              </div>
              <div class="item" :class="activeIndex==item.index+'r'?'active':''" @click="handleAhPour(item,'2',item.index+'r')">
                <p>客队{{item.type=='2'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score}}</p>
                <p>{{item.guestOdd}}</p>
              </div>
            </li>

            <div class="more" @click="handleMoreAh()" v-if="isAhMore=='open'">
              <p>展开</p>
              <span><img src="../../assets/img/arrow-bot.png" alt=""></span>
            </div>
            <div class="more" @click="handleLessAh()" v-if="isAhMore=='close'">
              <p>收起</p>
              <span><img src="../../assets/img/arrow-top.png" alt=""></span>
            </div>
          </ul>
        </div>
        <!--<div class="card" v-if="testAccount.indexOf(userName)!=-1">-->
        <div class="card">
          <div class="title">半/全场</div>
          <ul>
            <li v-for="item in ht" @click="handleHtPour(item,item.index)" :class="activeIndex==item.index?'active':''">
              <p>{{item.description}}</p>
              <p>{{item.odd}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <betInput v-if="isBetInput"/>
  </div>
</template>

<script>
    import Banner from '../../components/bet/Banner'
    import BScroll from 'better-scroll'
    import BetInput from '../../components/bet/BetInput'
    import {mapState, mapMutations} from 'vuex'
    import {football_match_odds,football_match_ah_odd,football_match_ou_odd,football_match_ht_odd} from "../../service/api";
    import {testAccount} from "../../assets/js/testAccount";

    export default {
        components:{Banner,BetInput},
        data(){
            return{
                scroll:null,
                activeIndex:'',
                results:[],
                score:[],
                totalGoal:[],
                scoreData:{},
                scoreData1:{},
                ah:[],
                isAhMore:'close',
                ahCopy:[],
                ou:[],
                isOuMore:'close',
                ouCopy:[],
                ht:[],
                testAccount:[],
            }
        },
        computed:{
            ...mapState(['isBetInput','betInfo','userName']),
        },
        created:function(){
            this.testAccount= testAccount
            football_match_odds(this.betInfo.matchId).then(res=>{
                console.log('胜平负/比分/总进球：',res)
                if(res.code==='0'){
                    this.results = JSON.parse(res.data.results)
                    let obj1 = JSON.parse(res.data.results)
                    let obj2 = JSON.parse(res.data.score)
                    let obj3 = JSON.parse(res.data.totalGoal)
                    let arr1=[],arr2=[],arr3=[]

                    for(let i in obj1){
                        arr1.push({name:i,number:obj1[i],index:'a'+i,pid:res.data.resultsPid})
                    }
                    for(let i in obj2){
                        arr2.push({name:i,number:obj2[i],index:'b'+i,pid:res.data.scorePid})
                    }
                    for(let i in obj3){
                        arr3.push({name:i,number:obj3[i],index:'c'+i,pid:res.data.totalGoalPid})
                    }
                    // console.log(arr3)
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
                    if(this.scoreData==undefined){
                        this.scoreData={list:[]}
                    }
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)

                }
            })

            football_match_ah_odd(this.betInfo.matchId).then(res=>{
                console.log('让分赔率:',res)
                if(res.code==0){
                    let arr1 = JSON.parse(res.data.oddAh)
                    let arr3 = []
                    for(let i in arr1){
                        arr1[i].index ='ah'+i
                        arr3.push(arr1[i])
                    }
                    this.ah = arr3

                    if(this.ah.length>2){
                        let arrCopy = [...this.ah]
                        this.ahCopy=arrCopy.slice(0,2)
                        this.isAhMore='open'
                    }else{
                        this.ahCopy=this.ah
                        this.isAhMore='close'
                    }
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)
                }
            })
            football_match_ou_odd(this.betInfo.matchId).then(res=>{
                console.log('大小分赔率:',res)
                if(res.code==0){
                    let arr2 = JSON.parse(res.data.ouOdd)
                    let arr4 = []
                    for(let i in arr2){
                        arr2[i].index ='ou'+i
                        arr4.push(arr2[i])
                    }
                    this.ou = arr4
                    if(this.ou.length>2){
                        let arrCopy = [...this.ou]
                        this.ouCopy=arrCopy.slice(0,2)
                        this.isOuMore='open'
                    }else{
                        this.ouCopy=this.ou
                        this.isOuMore='close'
                    }
                    setTimeout(()=>{
                        this.scroll.refresh()
                    },0)
                }
            })
            football_match_ht_odd(this.betInfo.matchId,this.betInfo.homeTeamId,this.betInfo.guestTeamId).then(res=>{
                console.log('半全场赔率:',res)
                if(res.code==0){
                    let arr1 = JSON.parse(res.data.hfAndFtOdd)
                    let arr3 = []
                    for(let i in arr1){
                        arr1[i].index ='ht'+i
                        arr3.push(arr1[i])
                    }
                    this.ht = arr3
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

            handleMoreAh(){
                this.isAhMore='close'
                this.ahCopy=this.ah
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleLessAh(){
                this.isAhMore='open'
                let arrCopy = [...this.ah]
                this.ahCopy=arrCopy.slice(0,2)
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },

            handleMoreOu(){
                this.isOuMore='close'
                this.ouCopy=this.ou
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },
            handleLessOu(){
                this.isOuMore='open'
                let arrCopy = [...this.ou]
                this.ouCopy=arrCopy.slice(0,2)
                setTimeout(()=>{
                    this.scroll.refresh()
                },0)
            },

            handleClick(item,index,pid){
                // console.log(item,index,pid)
                this.activeIndex=index
                this.GUESSINPUTDATA({
                    name:item.name,
                    number:item.number,
                    index:index,
                    mold:0,
                    pid:pid
                })
                this.isBetInput?'':this.ISBETINFO(true)
            },
            handleOuPour(item,index){
                console.log(item,index)
                this.activeIndex=index
                let info = ''
                index.indexOf('l')!=-1?info='over':info='under'
                this.GUESSINPUTDATA({
                    type:'ou',
                    info:info,
                    dparam:item.dparam,
                    mold:1,
                    odd:info=='over'?item.overOdd:item.underOdd,
                    pid:item.pid
                })
                this.isBetInput?'':this.ISBETINFO(true)
            },
            handleAhPour(item,numberIndex,index){
                console.log(item,index)
                this.activeIndex=index
                let info = ''
                let number = 0

                if(index.indexOf('l')!=-1){
                    info='home'
                    number=item.type=='1'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score
                }else{
                    info='guest'
                    number=item.type=='2'?item.score>0?'+'+item.score:item.score:item.score>0?'-'+item.score:'+'+-item.score
                }
                this.GUESSINPUTDATA({
                    type:'ah',
                    info:info,
                    // number:item.type,
                    number:numberIndex,
                    mold:2,
                    odd:info=='home'?item.odd:item.guestOdd,
                    dparam:number,
                    pid:item.pid
                })
                this.isBetInput?'':this.ISBETINFO(true)

            },
            handleHtPour(item,index){
                console.log(item,index)
                this.activeIndex=index
                this.GUESSINPUTDATA({
                    type:'ht2ft',
                    info:item.onlyType,
                    iparam:item.iparam,
                    iparam2:item.iparam2,
                    subtype:item.subtype,
                    mold:3,
                    odd:item.odd,
                    pid:item.pid
                })
                this.isBetInput?'':this.ISBETINFO(true)
            },
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  .bet{
    width: 100%;
    height: 100%;
    .wrapper{
      position: absolute;
      top:0;
      width: 100%;
      bottom: 0;
      box-sizing: border-box;
      overflow: hidden;
      .content{
        .card{
          width: 100%;
          padding-bottom: 40px;
          box-sizing: border-box;
          .title{
            color: #333;
            font-size: 26px;
            width: 100%;
            height: 60px;
            line-height: 40px;
            padding: 10px 40px;
            box-sizing: border-box;
            font-weight: 700;
            position: relative;
          }
          .title:before{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            left: 18.75px;
            content: '';
            height: 40px;
            width: 5px;
            background: #34C47C;
            border-radius: 3px;
          }
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            li{
              width: 225px;
              height: 76px;
              box-sizing: border-box;
              border: 1px solid #CBCBCB;
              border-radius: 3px;
              @include flexY(center);
              margin-top: 20px;
              margin-left: 18.75px;
              p{
                text-align: center;
              }
              p:nth-child(1){
                color: #333;
                font-size: 24px;
                font-weight: 700;
              }
              p:nth-child(2){
                font-size: 22px;
                color: #34C47C;
                padding-top: 6px;
              }
            }
            .active{
              background: #34C47C;
              color: #fff;
              p{
                color: #fff !important;
              }
            }
            .more{
              width: 100%;
              height: 40px;
              margin-top: 20px;
              @include flex;
              p{
                color: #989898;
                font-size: 22px;
                height: 40px;
                line-height: 40px;
                padding-right: 6px;
              }
              span{
                display: block;
                width: 14px;
                height: 40px;
                @include flexY(center);
                img{
                  width: 100%;
                }
              }
            }
          }
        }

        .add-playing{
          width: 100%;
          padding-bottom: 40px;
          box-sizing: border-box;
          .title{
            color: #333;
            font-size: 26px;
            width: 100%;
            height: 60px;
            line-height: 40px;
            padding: 10px 40px;
            box-sizing: border-box;
            font-weight: 700;
            position: relative;
            margin-top: 20px;
          }
          .title:before{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            left: 18.75px;
            content: '';
            height: 40px;
            width: 5px;
            background: #34C47C;
            border-radius: 3px;
          }
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            li{
              width: 100%;
              display: flex;
              align-items: center;
              .item{
                width: 352.5px;
                height: 76px;
                box-sizing: border-box;
                border: 1px solid #CBCBCB;
                border-radius: 3px;
                //@include flexY(space-around);
                @include flexY(center);
                margin-top: 20px;
                margin-left: 15px;
                p:nth-child(1){
                  text-align: center;
                  font-size: 24px;
                  color: #000;
                  font-weight: bold;
                }
                p:nth-child(2){
                  text-align: center;
                  font-size: 22px;
                  color: #34C47C;
                  font-weight: bold;
                }
              }
              .active{
                background: #34C47C;
                color: #fff;
                p{
                  color: #fff !important;
                }
              }

            }
            .more{
              width: 100%;
              height: 40px;
              margin-top: 20px;
              @include flex;
              p{
                color: #989898;
                font-size: 22px;
                height: 40px;
                line-height: 40px;
                padding-right: 6px;
              }
              span{
                display: block;
                width: 14px;
                height: 40px;
                @include flexY(center);
                img{
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
    .is-bet-input-active{
      bottom: 380px;
    }
    .is-bet-input{
      bottom:0;
    }
    .guess{
      width: 100%;
      height: 380px;
      box-sizing: border-box;
      border: 1px solid red;
      position: fixed;
      bottom: 0;
      left:0;
      background: #fff;
    }
  }
</style>

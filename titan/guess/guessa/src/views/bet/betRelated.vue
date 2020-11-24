<template>
    <div class="BetInput" id="pos-bot">
        <div class="head">
            <div class="coin-type">请选择竞猜币种:</div>
            <ul>
                <li :class="coinName==item.name?'active':''" v-for="item in coin_list" @click="handleCoin(item.name,item.moneyCode,item.balance)" >
                    <span><img :src="item.icon" alt=""></span>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>

        <div class="input-box">
            <div class="check">
                <div class="show" @click="handlePassWay">
                    <p>{{multipleSelectionType.length | passWayToName}}</p>
                    <span><img src="../../assets/img/bet/triangle.png" alt=""></span>
                </div>
                <div class="check-data" :class="passWay?'passWay':'passWayNot'">
                    <p class="check-title">过关方式</p>
                    <ul>
                        <li v-for="item in checkListShow" :class="item.isSelected?'active':''" @click="handlePassWayType(item)">{{item.label}}</li>
                    </ul>

                    <div class="passway-btn" @click="handlePassWay">确认</div>
                </div>
            </div>
            <div class="multiple">
                <p>设置倍数</p>
                <input type="tel" maxlength="3" v-model="multiple">
            </div>
            <div class="balance">
                余额：<span class="im">{{balance}}</span> {{coinName}}
            </div>
        </div>
        <div class="total-money">总投注金额：<span class="im">{{sum}}</span> {{coinName}}</div>
        <div class="betDes">
            <p>2{{coinName}}为一注，共计<span class="im">{{note}}</span>注</p>
            <p>预计奖金：{{note>1?minBonus:0}}~{{maxBonus}} {{coinName}}</p>
        </div>
        <div class="btn">
            <span v-if="!quizing" @click="handleGuessBet">立即竞猜</span>
            <span :class="quizing?'loading':''" v-if="quizing">立即竞猜</span>
        </div>

        <message ref="message"/>
    </div>
</template>
<script>
    import {football_ms_bet,coin_balance_list} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    import {get_zuhe} from "../../assets/js/get_zuhe";
    import {minN,maxN,get_max_zuhe,arrMultiply} from "../../assets/js/tool";

    export default {
        data(){
            return{
                checkList1:[
                    {
                        label:'2串1',
                        value:'ONE',
                        isSelected:false,
                    },
                    {
                        label:'3串1',
                        value:'TWO',
                        isSelected:false,
                    },
                    {
                        label:'4串1',
                        value:'FIVE',
                        isSelected:false,
                    },
                    {
                        label:'5串1',
                        value:'TEN',
                        isSelected:false,
                    },
                    {
                        label:'6串1',
                        value:'SEVENTEEN',
                        isSelected:false,
                    },
                    {
                        label:'7串1',
                        value:'TWENTY_SEVEN',
                        isSelected:false,
                    },
                    {
                        label:'8串1',
                        value:'THIRTY_THREE',
                        isSelected:false,
                    },
                ],
                checkList:[],
                note:0,
                minMoney:0,
                maxMoney:0,
                minArr:0,
                checkListShow:[],
                passWay:false,
                multiple:1,
                coin_list:[],
                coin_arr:{},
                balance:0,
                coinName:'',
                moneyCode:'',
                multipleSelection:[],
                matchIdAndInfo:[],
                isClick:true,
                quizing:false,
            }
        },
        computed:{
            ...mapState(['userName','token','matchIdAndInfos','requestEd','betRelatedRandom','guessActiveDataList']),
            multipleSelectionType(){
                if(this.matchIdAndInfos.length>1){
                    this.checkListShow = this.checkList.slice(0,this.matchIdAndInfos.length-1)
                }else{
                    for(let i in this.checkListShow){
                        this.checkListShow[i].isSelected=false
                    }
                    this.checkListShow=[]
                }
               return this.matchIdAndInfos
            },
            sum(){
                return this.note*2*this.multiple>0?this.note*2*this.multiple:0
            },
            minBonus(){
                if(this.checkListShow.length>0){
                    return this.minMoney*this.multiple>0?(this.minMoney*this.multiple*2).toFixed(2):0
                }else{
                    return 0
                }

            },
            maxBonus(){
                if(this.checkListShow.length>0){
                    return this.maxMoney*this.multiple>0?(this.maxMoney*this.multiple*2).toFixed(2):0
                }else{
                    return 0
                }
            },
        },
        created:function(){
            this.getCoinBalanceList(this.userName,this.token)
            this.checkList=[...this.checkList1]
        },
        methods:{
            ...mapMutations(['MATCHIDANDINFOS']),
            getCoinBalanceList(userName,token){
                coin_balance_list(userName,token).then(res=>{
                    console.log('钱包余额：',res)
                    if(res.code==='0'){
                        this.coin_arr  = res.data.coinBalanceCtoModels
                        this.coin_list = res.data.coinBalanceCtoModels
                        this.coinName = res.data.coinBalanceCtoModels[0].name
                        this.moneyCode = res.data.coinBalanceCtoModels[0].moneyCode
                        this.balance = res.data.coinBalanceCtoModels[0].balance
                    }
                })
            },
            handleCoin(type,moneyCode,balance){
                this.coinName = type
                this.moneyCode = moneyCode
                this.balance = balance>0?balance:0
            },
            handlePassWay(){
                this.passWay = !this.passWay
            },
            handlePassWayType(item) {
                this.isClick=false
                item.isSelected = !item.isSelected
                let arr1 = []
                let arr2 = [0,0,0]
                for (let i in this.checkListShow) {
                    if (this.checkListShow[i].isSelected) {
                        arr1.push(parseInt(i)+2)
                    }
                }
                for(let i in this.matchIdAndInfos){
                    let num=0
                    if(this.matchIdAndInfos[i].c1){num++}
                    if(this.matchIdAndInfos[i].c2){num++}
                    if(this.matchIdAndInfos[i].c3){num++}
                    if(num==1){arr2[0]=arr2[0]+1}
                    if(num==2){arr2[1]=arr2[1]+1}
                    if(num==3){arr2[2]=arr2[2]+1}
                }
                let note = 0
                for(let i=0;i<arr1.length;i++){
                   note =  get_zuhe(arr2,arr1[i])+note
                }
                this.note = note
                this.multipleSelection = this.numberTotype(arr1)
                this.maxMin(arr1)
            },
            handleGuessBet(){
                if(this.sum>10000){
                    this.$refs.message.Message('投注金额不能超过10000');
                    return
                }
                if(this.sum>0&&this.multipleSelection.length>0&&this.matchIdAndInfos.length>0){
                    this.quizing=true
                    // console.log(this.userName,this.token,this.coinName,this.moneyCode,this.sum,'multipleSelection',this.multiple,'2',this.multipleSelection,this.matchIdAndInfos)
                    console.log(this.matchIdAndInfos)
                    let matchIdAndInfos=[]
                    for(let i in this.matchIdAndInfos){
                        let info =[]
                        if(this.matchIdAndInfos[i].c1){info.push('home')}
                        if(this.matchIdAndInfos[i].c2){info.push('draw')}
                        if(this.matchIdAndInfos[i].c3){info.push('guest')}
                        matchIdAndInfos.push({
                            info:info,
                            matchId:this.matchIdAndInfos[i].matchId
                        })
                    }
                    football_ms_bet(this.userName,this.token,this.coinName,this.moneyCode,this.sum,'multipleSelection',this.multiple,'2',this.multipleSelection,matchIdAndInfos).then(res=>{
                        console.log('立即竞猜:',res)
                        if(res.code==0){
                            this.$refs.message.Message('竞猜成功');
                            this.MATCHIDANDINFOS([])
                            this.checkList=[...this.checkList1]
                            for(let i in this.checkListShow){
                                this.checkListShow[i].isSelected=false
                            }
                            this.checkListShow = []
                            this.note = 0
                            this.minMoney=0
                            this.maxMoney=0
                            let arr=[...this.guessActiveDataList]
                            for(let i in arr){
                                arr[i].c1=false
                                arr[i].c2=false
                                arr[i].c3=false
                            }
                            this.getCoinBalanceList(this.userName,this.token)
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                        this.quizing=false
                    })
                }
            },
            numberTotype(arr){
                let arr1 = []
                for(let i in arr){
                    switch (arr[i]){
                        case 2:
                            arr1.push('ONE')
                            break;
                        case 3:
                            arr1.push('TWO')
                            break;
                        case 4:
                            arr1.push('FIVE')
                            break;
                        case 5:
                            arr1.push('TEN')
                            break;
                        case 6:
                            arr1.push('SEVENTEEN')
                            break;
                        case 7:
                            arr1.push('TWENTY_SEVEN')
                            break;
                        case 8:
                            arr1.push('THIRTY_THREE')
                            break;
                    }
                }
                return arr1
            },
            maxMin(arrA){
                console.log(arrA)
                let arra = []
                for(let i in this.matchIdAndInfos){
                    arra[i]=[]
                    if(this.matchIdAndInfos[i].c1){arra[i].push(JSON.parse(this.matchIdAndInfos[i].oddStr).home)}
                    if(this.matchIdAndInfos[i].c2){arra[i].push(JSON.parse(this.matchIdAndInfos[i].oddStr).draw)}
                    if(this.matchIdAndInfos[i].c3){arra[i].push(JSON.parse(this.matchIdAndInfos[i].oddStr).guest)}
                }
                console.log('取出arr',arra)
                let arrb=[]
                for(let i in arra){
                    if(parseInt(minN(arra[i]))>0){
                        arrb.push(minN(arra[i]))
                    }
                }
                arrb.sort(function(a,b){
                    return  a-b;
                })
                console.log('min:',arrb)
                this.minMoney = (arrb[0]*arrb[1])

                let arrc = []
                for(let i in arra){
                    if(parseInt(maxN(arra[i]))>0){
                        arrc.push(maxN(arra[i]))
                    }
                }
                arrc.sort(function(a,b){
                    return  b-a;
                })
                // console.log('max:',arrc)
                let maxMoney=0
                let arrC = []
                for(let i in arrA){
                    let arrB = get_max_zuhe(arrc,arrA[i])
                    arrC=[...arrC,...arrB]
                }
                for(let i in arrC){
                    maxMoney +=arrMultiply(arrC[i])
                }
                this.maxMoney = maxMoney
            }
        },
        watch:{
            betRelatedRandom(newValue,oldValue){
                if(newValue!=oldValue){
                    let arr1 = []
                    for (let i in this.checkListShow) {
                        if (this.checkListShow[i].isSelected) {
                            arr1.push(parseInt(i)+2)
                        }
                    }
                    console.log('arr1',arr1)
                    if(arr1.length>0){
                        let arr2 = [0,0,0]
                        for(let i in this.matchIdAndInfos){
                            let num=0
                            if(this.matchIdAndInfos[i].c1){num++}
                            if(this.matchIdAndInfos[i].c2){num++}
                            if(this.matchIdAndInfos[i].c3){num++}
                            if(num==1){arr2[0]=arr2[0]+1}
                            if(num==2){arr2[1]=arr2[1]+1}
                            if(num==3){arr2[2]=arr2[2]+1}
                        }
                        let note = 0
                        for(let i=0;i<arr1.length;i++){
                            note  +=get_zuhe(arr2,arr1[i])
                        }
                        this.note = note
                        this.multipleSelection = this.numberTotype(arr1)
                        this.maxMin(arr1)
                    }else{
                        for(let i in this.checkListShow){
                            this.checkListShow[i].isSelected=false
                        }
                        this.checkListShow=[]
                    }
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    .BetInput{
        position: absolute;
        width: 100%;
        height: 380px;
        /*background: #f1f1f1;*/
        background: #fff;
        overflow: hidden;
        bottom: 0;
        z-index: 1;
        box-sizing: border-box;
        box-shadow: 0  0 5px 1px rgba(0,0,0,.1);
        /*border: 1px solid red;*/
        .head{
            display: flex;
            align-items: center;
            width: 100%;
            height: 70px;
            box-sizing: border-box;

            /*border: 1px solid red;*/
            .coin-type{
                width:210px;
                height:70px;
                line-height: 70px;
                color: #4D4D4D;
                font-size: 24px;
                padding-left:30px;
                box-sizing: border-box;
            }
            ul{
                display: flex;
                align-items: center;
                li{
                    width:180px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    border-left: 1px solid #DFDFDF;
                    span{
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        width:44px;
                        height: 44px;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        color: #4D4D4D;
                        font-size: 24px;
                        padding-left: 10px;
                    }
                }
                .active{
                    background: #fff;
                }
            }
        }
        .input-box{
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            padding: 0 30px;
            background: #fff;
            /*border: 1px solid red;*/

            display: flex;
            align-items: center;
            justify-content: space-between;
            .check{
                width: 200px;
                height: 50px;
                background: #f1f1f1;
                /*overflow: hidden;*/
                /*border-radius: 5px;*/
                .show{
                    box-sizing: border-box;
                    padding:0 20px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    p{
                        font-size: 28px;
                        color:#000;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap

                    }
                    span{
                        position: absolute;
                        display: block;
                        width: 20px;
                        right: 10px;
                        img{
                            width: 100%;
                        }
                    }

                }
                .check-data{
                    width:750px;
                    left:0;
                    position:absolute;
                    top: 80px;
                    bottom: 0;
                    background: #fff;
                    overflow: hidden;
                    z-index: 10;
                    box-sizing: border-box;
                    padding: 20px 0;
                    .check-title{
                        font-size: 26px;
                        color: #000;
                        margin-left: 30px;
                        margin-bottom: 20px;
                    }
                    ul{
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        li{
                            width: 150px;
                            height: 50px;
                            font-size: 28px;
                            background:#f1f1f1;
                            box-sizing: border-box;
                            margin-left: 30px;
                            margin-bottom: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .actived{
                            background: #34c474 ;
                            color: #fff;
                        }
                    }

                    .passway-btn{
                        position: absolute;
                        bottom: 30px;
                        width: 690px;
                        left:50%;
                        transform: translateX(-50%);
                        background:#34C47C ;
                        height: 60px;
                        border-radius: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        color: #fff;

                    }
                }
                .passWay{
                    display: block;
                    .active{
                        background:#34C47C ;
                        color: #fff;
                    }
                }
                .passWayNot{
                    display: none;
                }
            }
            .multiple{
                display: flex;
                align-items: center;
                p{
                    color: #999;
                    font-size: 24px;
                    padding-right: 10px;
                }
                input{
                    width:80px;
                    height: 50px;
                    display: block;
                    background: #f1f1f1;
                    overflow: hidden;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 28px;
                    color: #000;
                }
            }
            .balance{
                font-size: 24px;
                color: #999;
            }
        }
        .total-money{
            font-size: 24px;
            color: #999;
            /*margin-bottom: 20px;*/
            box-sizing: border-box;
            padding: 0 30px;
            padding-bottom: 20px;

            background: #fff;
        }
        .betDes{
            display: flex;
            align-items: center;
            justify-content: space-between;
            /*box-sizing: border-box;*/
            padding: 0 30px;
            background: #fff;
            padding-bottom: 20px;
            p{
                font-size: 24px;
                color: #999;
                white-space:nowrap;
            }
            p:nth-child(1){
                margin-right: 10px;
            }
        }
        .im{
            color: #34C47C;
        }
        .btn{
            width: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 30px;
            position: absolute;
            bottom: 50px;
            left:50%;
            transform: translateX(-50%);

            span{
                display: block;
                width:100%;
                margin:  0 auto;
                height: 70px;
                line-height: 70px;
                border-radius: 5px;
                background: #34C47C;
                text-align: center;
                color: #fff;
                font-size:36px;
            }
            .loading{
                background: #bfbfbf;
            }
        }


    }
</style>
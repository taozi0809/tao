<template>
    <div class="time">
        <el-date-picker
                v-model="time"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="change">
        </el-date-picker>
    </div>
</template>
<script>
    import {bus} from "../../util/tools/eventBus";
    import {activeData} from "../../service/api";
    import {oneyDetail,betUser,betNum} from "../../service/hapi";

    export default {
        data(){
            return{
                time:[this.getToday(),this.getToday()],
                otc:{},
                user:{},
                totalNum:0,
                titanCoin:{},
                ethCoin:{},
                usdtCoin:{},

            }
        },
        created:function(){
            this.init()
        },
        methods:{
            getToday(){
                var nowDate = new Date();
                var year = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
                    : nowDate.getMonth() + 1;
                var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
                    .getDate();
                var dateStr = year + "-" + month + "-" + day;
                return dateStr
            },
            emit(name,data){
                bus.$emit(name,data)
            },
            change(){this.init()},
            toEmit(){
                this.$emit('selectTime',{
                    otc:this.otc,
                    user:this.user,
                    totalNum:this.totalNum,
                    titanCoin:this.titanCoin,
                    ethCoin:this.ethCoin,
                    usdtCoin:this.usdtCoin,
                })
            },
            init(){
                this.activeData(this.time)
                this.betNum(this.time)
                this.betUser(this.time)
                this.getCoin()
            },

            activeData(time){
                activeData(time[0],this.time[1]).then(res=>{
                    console.log('用户情况：',res)
                    this.user=res.data
                    this.toEmit()
                })
            },
            betUser(time){
                betUser([{startTime:time[0],endTime:time[1]}]).then(res=>{
                    console.log('根据时间查询用户活跃数:',res)
                    if(res.code==0){
                        this.otc=res.data
                    }
                })
            },
            betNum(time){
                betNum(time[0],time[1]).then(res=>{
                    console.log('指定时间投注的笔数',res)
                    if(res.code==0){
                        this.totalNum=res.data
                        this.toEmit()
                    }
                })
            },
            async getCoin(){
                this.$emit('loading',true)
                this.titanCoin = await this.oneyDetail(this.time,'TITAN')
                this.ethCoin = await this.oneyDetail(this.time,'ETH')
                this.usdtCoin = await this.oneyDetail(this.time,'USDT')
                this.toEmit()
                this.$emit('loading',false)
            },
            oneyDetail(time,type){
                return new Promise((resolve, reject) => {
                    oneyDetail(time[0],time[1],type).then(res=>{
                        resolve (res)
                    })
                })
            },


        },

    }
</script>
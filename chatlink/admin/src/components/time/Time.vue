<template>
    <div class="time">
        <el-date-picker
                v-model="time"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                @change="change">
        </el-date-picker>
    </div>
</template>
<script>
    import {bus} from "../../util/tools/eventBus";
    import {tradeData,activeData} from "../../service/api";

    export default {
        data(){
            return{
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                time:this.getToday(),
                otc:{},
                user:{},
            }
        },
        created:function(){
            this.tradeData(this.time)
            this.activeData(this.time)
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
            change(){
                this.tradeData(this.time)
                this.activeData(this.time)
            },
            tradeData(time){
                tradeData(time).then(res=>{
                    console.log('otc交易情况：',res)
                    this.otc=res.data
                    this.$emit('selectTime',{
                        otc:this.otc,
                        user:this.user,
                    })
                })
            },
            activeData(time){
                activeData(time).then(res=>{
                    console.log('用户情况：',res)
                    this.user=res.data
                    this.$emit('selectTime',{
                        time:this.time,
                        otc:this.otc,
                        user:this.user,
                    })
                })
            }
        },

    }
</script>
<template>
    <div class="date">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in data">
                    <p>{{item.weekday}}</p>
                    <p :class="activeIndex==index?'active':''">{{index===7?'今天':item.day}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        data(){
            return{
               data:[],
                activeIndex:7,
            }
        },
        created:function(){
            this.data = this.getdata(-7)
        },
        mounted:function(){
            this.swiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                initialSlide :4,
                slidesPerView : 7,
            })
        },
        methods:{
            getdata(day){
                function getDay(day){
                    var today = new Date();
                    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                    today.setTime(targetday_milliseconds); //注意，这行是关键代码
                    var tDate = today.getDate();
                    var tweekday = today.getDay();
                    return {tDate,tweekday};
                }
                function doHandleMonth(month){

                    var m = month;

                    if(month.toString().length == 1){

                        m = "0" + month;

                    }

                    return m;

                }
                function mGetDate(year, month){
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = today.getMonth();

                    var d = new Date(year, month, 0);
                    return d.getDate();
                }
                var total = mGetDate()
                var newday = getDay(day).tDate
                var newweekday = getDay(day).tweekday
                var week = ['日','一','二','三','四','五','六']


                var arr = []
                for(let i =0;i<15;i++){
                   let day =  newday+i>total?newday+i-total:newday+i
                   let weekday = 0
                    if(newweekday+i>=21){
                        weekday =  newweekday+i-21
                    }else if(newweekday+i>=14){
                        weekday =  newweekday+i-14
                    }else if(newweekday+i>=7){
                        weekday =  newweekday+i-7
                    }else{
                        weekday =  newweekday+i
                    }
                    arr.push({
                        day:day,
                        weekday:week[weekday]
                    })
                }
                return arr
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .date{
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        position: fixed;
        top:90px;
        left:0;
        .swiper-container{
            .swiper-wrapper{
                .swiper-slide{
                    box-sizing: border-box;
                    height: 120px;
                    padding: 10px 0;
                    @include flexY(space-around);
                    p{
                        margin: 0 auto;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 24px;
                        width: 80px;
                    }
                    p:nth-child(1){
                        color: #999;
                    }
                    p:nth-child(2){
                        color: #333;
                        box-sizing: border-box;
                        border: 1px solid rgba(0,0,0,0);
                    }
                    .active{
                        color: #fff !important;
                        background: #34C47C;
                        border-radius: 40px;
                    }
                }
            }
        }
    }
</style>
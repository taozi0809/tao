<template>
    <div class="title" :class="isPC?'pc-title':'mobile-title'">
       <div class="l" v-if="title.color!=2"><img src="../assets/img/title/l.png" alt=""></div>
       <div class="l" v-if="title.color==2"><img src="../assets/img/title/l2.png" alt=""></div>
       <div class="c" :class="title.color==2?'w':''">
           <div class="t1">{{title.name}}</div>
           <div class="t2">{{title.des}}</div>
       </div>
       <div class="r" v-if="title.color!=2"><img src="../assets/img/title/r.png" alt=""></div>
       <div class="r" v-if="title.color==2"><img src="../assets/img/title/r2.png" alt=""></div>
    </div>
</template>

<script>
    import {ispc} from "../utils/isPc";

    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        },
        props:["title"],
    }
</script>

<style lang="scss" scoped>
    .pc-title{
        display: flex;
        align-content: center;
        justify-content: center;
        .l,.r{
            width: 123px;
            img{
                width: 100%;
            }
        }
        .c{
            margin: 0 40px;
            .t1{
                text-align: center;
                color:#333;
                font-size: 32px;
                font-weight: bold;
                line-height: 24px;
            }
            .t2{
                text-align: center;
                color:#333;
                font-size:16px;
                line-height: 22px;
                margin-top: 15px;
            }
        }
        .w{
            .t1,.t2{
                color: #fff;
            }
        }

    }
    .mobile-title{
        display: flex;
        align-content: center;
        justify-content: center;
        .l,.r{
            width:15vw;
            img{
                width: 100%;
            }
        }
        .c{
            margin: 0 4vw;
            .t1{
                text-align: center;
                color:#333;
                font-size:5vw;
                font-weight: bold;
            }
            .t2{
                text-align: center;
                color:#333;
                font-size:2vw;
                margin-top:1.6vw;
            }
        }
        .w{
            .t1,.t2{
                color: #fff;
            }
        }
    }
</style>

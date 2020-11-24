<template>
  <div class="agenda-list">
      <nav-list/>
      <div class="head">
          <p>时间</p>
          <p>主队</p>
          <p>比分</p>
          <p>客队</p>
          <p>
              <span>半场</span>
              <span></span>
          </p>
      </div>
      <div class="wrapper">
          <scroll-y>
              <ul>
                 <li v-for="item in data">
                     <p>{{item.a}}</p>
                     <p>{{item.b}}</p>
                     <p>{{item.c}}</p>
                     <p>{{item.d}}</p>
                     <p>
                         <span>{{item.e}}</span>
                         <span><img src="../../assets/img/arrow-right.png" alt=""></span>
                     </p>
                 </li>
              </ul>
          </scroll-y>
      </div>
  </div>
</template>

<script>
    import NavList from './NavList'
    import ScrollY from '../scroll/ScrollY'
    export default {
        components:{NavList,ScrollY},
        data(){
            return{
                data:[
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                    {
                        a:'12-02  00:00',
                        b:'俄罗斯',
                        c:'2:0',
                        d:'新西兰',
                        e:'1:0',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .agenda-list{
        width: 100%;
        height: 100%;
        .head{
            width: 100%;
            height: 60px;
            @include flex;
            box-sizing: border-box;
            p{
                display: block;
                width: 18%;
                box-sizing: border-box;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #333;
                font-size:22px ;
                font-weight: 700;
                @include borderBottom(#E6E6E6);
            }
            p:nth-child(1){
                width: 28%;
            }
            p:last-child{
                @include flexX(space-around);
                span:nth-child(2){
                    display: block;
                    width: 14px;
                }
            }
        }
        .wrapper{
            position: fixed;
            top:160px;
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
            li{
                width: 100%;
                height: 60px;
                @include flex;
                box-sizing: border-box;
                p{
                    display: block;
                    width: 18%;
                    box-sizing: border-box;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    color: #333;
                    font-size:22px ;
                    @include borderBottom(#E6E6E6);
                }
                p:nth-child(1){
                    width: 28%;
                }
                p:nth-child(3){
                    color: #FF4E4E;
                }
                p:last-child{
                    @include flexX(space-around);
                    span{
                        color: #34C47C;
                    }
                    span{
                        display: block;
                        width: 14px;
                        @include flexY(center);
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
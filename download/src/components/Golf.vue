<template>
    <div class="golf">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="page page1">
                      <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                      <div class="d1-c"><img src="../assets/img/golf/version.1.2/page1/title.png" alt=""></div>
                      <div class="d1-b"><img src="../assets/img/golf/version.1.2/page1/qiu.png" alt=""></div>
                      <div class="d1-d1" @click="goGolfLink">立即体验</div>
                      <div class="d1-d2" @click="goNext">了解详情</div>
                      <div class="d1-d1-l"><img :src="imgsrc+'d1-d1-l.png'" alt=""></div>
                      <div class="d1-d2-r"><img :src="imgsrc+'d1-d2-r.png'" alt=""></div>
                    </div>
                </div>
                <div class="swiper-slide">
                  <div class="page page2">
                    <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                    <div class="title">平<span></span>台<span></span>特<span></span>色</div>
                    <div class="des">
                      <div class="l1">
                        <div class="t1">高尔夫旅游</div>
                        <div class="t2">主打多款优质高尔夫旅行（购买即送高旅兑奖球）</div>
                      </div>
                      <div class="l1">
                        <div class="t1">娱乐玩法</div>
                        <div class="t2">使用高旅兑奖球参与高尔夫娱乐虚拟竞猜</div>
                      </div>
                      <div class="l1">
                        <div class="t1">兑奖球兑换</div>
                        <div class="t2">兑换高旅实体兑奖球（TITLEIST PRO V1） <br>与三大特色旅程</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                <div class="page page3">
                  <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                  <div class="title">高尔夫旅途</div>
                  <div class="des">
                    <a href="http://www.golf.link/home/#/store/detail/hxXXXDxB/1" target="_blank" class="item">
                      <div class="t1">15800<span>元</span></div>
                      <div class="t2">泰国普吉岛<span>六天四球</span>之旅 </div>
                      <div class="t3">赠送<span>500球</span></div>
                    </a>
                    <a href="http://www.golf.link/home/#/store/detail/SKu1wRQG/1" target="_blank" class="item">
                      <div class="t1">9800<span>元</span></div>
                      <div class="t2">泰国普吉岛<span>四天二球</span>之旅 </div>
                      <div class="t3">赠送<span>300球</span></div>
                    </a>
                    <a href="http://www.golf.link/home/#/store/detail/QcvVYzY1/1" target="_blank" class="item">
                      <div class="t1">3800<span>元</span></div>
                      <div class="t2">泰国普吉岛<span>二天一球</span>之旅 </div>
                      <div class="t3">赠送<span>100球</span></div>
                    </a>
                  </div>
                </div>
              </div>
                <div class="swiper-slide">
                <div class="page page4">
                  <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                  <div class="sj"></div>
                  <div class="des">
                    <div class="title">娱乐玩法</div>
                    <div class="t1">娱乐虚拟竞猜，打球闲暇之余，与职业选手携手共赢</div>
                    <div class="t2">赛事丰富，各类大型赛事一应俱全 <br>身临其境，娱乐刺激</div>
                  </div>
                </div>
              </div>
                <div class="swiper-slide">
                  <div class="page page5">
                  <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                  <div class="des">
                    <div class="title">兑奖球兑换</div>
                    <div class="item">
                      <div class="t1">兑换</div>
                      <div class="t2">高旅实体兑奖球</div>
                      <div class="t3">TITLEIST PRO V1<span>价值30元</span></div>
                    </div>
                    <div class="item">
                      <div class="t4"><span>500</span>球兑换</div>
                      <div class="t5">泰国普吉岛<span>六天四球</span>之旅</div>
                    </div>
                    <div class="item">
                      <div class="t4"><span>300</span>球兑换</div>
                      <div class="t5">泰国普吉岛<span>四天二球</span>之旅</div>
                    </div>
                    <div class="item">
                      <div class="t4"><span>100</span>球兑换</div>
                      <div class="t5">泰国普吉岛<span>二天一球</span>之旅</div>
                    </div>
                  </div>
                </div>
                </div>
              <div class="swiper-slide">
                <div class="page page6">
                  <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
                  <div class="des">
                    <div class="title">更多精彩详情，敬请登录体验</div>
                    <div class="btn" @click="goGolfLink">立即体验 >></div>
<!--                    <div class="phone-box">-->
<!--                      <div class="btn1">IPhone下载</div>-->
<!--                      <div class="btn2">Android下载</div>-->
<!--                    </div>-->
                  </div>
                </div>
              </div>

            </div>
            <div class="swiper-pagination" id="swiper-pagination"></div>
        </div>



    </div>
</template>

<script>
    import Swiper from 'swiper';

    export default {
        data(){
            return{
              swiper:null,
              imgsrc:"https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/"
            }
        },
        mounted() {
            this.swiper=new Swiper ('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                },
              autoHeight: true,
            })
        },
        methods:{
            goGolfLink(){
                window.location.href="http://www.golf.link/home/"
            },
            goNext(){
                this.swiper.slideNext()
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/font/NotoSerifCJKsc-Black/NotoSerifCJKsc-Black.css";
    .golf{
      font-family: 宋体;
        .swiper-container{
            position: absolute;
            width: 100%;
            height: auto;
            top: 0;
            left: 0;
            overflow-x: hidden;
            overflow-y: auto;
            background: #fff;
            .swiper-wrapper{
                width: 100%;
                .swiper-slide {
                    width: 100%;
                    overflow: auto;
                    .page{
                        width: 100%;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                      .logo{
                        width: 207px;
                        position: absolute;
                        top: 67px;
                        left: 69px;
                        img{
                          width: 100%;
                        }
                      }
                    }
                    .page1{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg1.jpg");
                      .d1-c{
                        position: absolute;
                        top: 542px;
                        width: 713px;
                        left: 50%;
                        transform: translateX(-50%);
                        img{
                          width: 100%;
                        }
                      }
                      .d1-b{
                        position: absolute;
                        top: 840px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 228px;
                        img{
                          width: 100%;
                        }
                      }
                      .d1-d1{
                        position: absolute;
                        top: 1094px;
                        left: 80px;
                        width: 283px;
                        height: 109px;
                        text-align: center;
                        line-height: 109px;
                        color: #fff;
                        font-size: 32px;
                        font-weight: 900;
                        background: #479ec2;
                        border-radius: 10px;
                      }
                      .d1-d2{
                        position: absolute;
                        top: 1094px;
                        right:80px;
                        width: 283px;
                        height: 109px;
                        text-align: center;
                        line-height: 109px;
                        color: #343434;
                        font-size: 32px;
                        font-weight: 900;
                        background: #fff;
                        border-radius: 10px;
                      }
                      .d1-d1-l{
                        position: absolute;
                        width: 62px;
                        left: 16px;
                        top: 1126px;
                        img{
                          width: 100%;
                        }
                      }
                      .d1-d2-r{
                        position: absolute;
                        width: 62px;
                        right: 16px;
                        top: 1126px;
                        img{
                          width: 100%;
                        }
                      }
                    }
                    .page2{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg2.jpg");
                      .title{
                        color: #fff;
                        font-size: 50px;
                        position: absolute;
                        top: 659px;
                        left: 50px;
                        font-weight: 900;
                        font-family: NotoSerifCJKsc-Black;
                        span{
                          display: inline-block;
                          height: 40px;
                          overflow: hidden;
                          position: relative;
                          top: 2px;
                          background: #fff;
                          width: 1px;
                          margin: 0 20px;
                        }
                      }
                      .des{
                        position: absolute;
                        top: 769px;
                        left: 50px;
                        width: 100%;
                        .l1{
                          width: 100%;
                          margin-bottom: 44px;
                          .t1{
                            color: #fff;
                            font-size: 32px;
                            margin-bottom: 25px;
                            font-weight: 900;
                            font-family: NotoSerifCJKsc-Black;
                          }
                          .t2{
                            color: #fff;
                            font-size: 30px;
                            line-height: 1.5;
                          }
                        }
                      }
                    }
                    .page3{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg5.jpg");
                      .title{
                        color: #fff;
                        font-size: 50px;
                        position: absolute;
                        top: 313px;
                        left: 72px;
                        font-family: NotoSerifCJKsc-Black;
                        font-weight: 900;
                      }
                      .des{
                        position: absolute;
                        top: 444px;
                        left: 76px;
                        width: 100%;
                        .item{
                          display: block;
                          width: 594px;
                          background-repeat: no-repeat;
                          background-size: 100% 100%;
                          height: 204px;
                          background-image: url("../assets/img/golf/version.1.2/page3/lf.png");
                          margin-bottom: 47px;
                          position: relative;
                          box-sizing: border-box;
                          padding-right: 41px;
                          .t1{
                              box-sizing: border-box;
                              text-align: right;
                              padding-top:40px;
                              color: #FF8B1A;
                              font-size: 48px;
                              font-weight: bold;
                              span{
                                font-size: 32px;
                              }
                          }
                          .t2{
                            box-sizing: border-box;
                            text-align: right;
                            padding-top: 20px;
                            color: #4D7313;
                            font-size: 27px;
                            font-weight: bold;
                            span{
                              font-size: 32px;
                            }
                          }
                          .t3{
                            box-sizing: border-box;
                            text-align: right;
                            padding-top: 12px;
                            color: #4D7313;
                            font-size: 24px;
                            font-weight: bold;
                            span{
                              font-size: 30px;
                              color: #FF8B1A;
                            }
                          }
                        }
                      }
                    }
                    .page4{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg2.jpg");
                      .sj{
                        width: 361px;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        height: 722px;
                        background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/r.png");
                        position: absolute;
                        top: 185px;
                        left: 322px;
                      }
                      .des{
                        position: absolute;
                        top: 920px;
                        left: 50px;
                        width: 100%;
                        .title{
                          color: #fff;
                          font-size: 50px;
                          font-weight: bold;
                          margin-bottom: 64px;
                          font-family: NotoSerifCJKsc-Black;
                        }
                        .t1,.t2{
                            color: #F7FFF5;
                            font-size: 30px;
                            margin-bottom: 44px;
                            width: 598px;
                            line-height: 1.5;
                            position: relative;
                            left: 40px;
                        }
                        .t1:before,.t2:before{
                          position: absolute;
                          content: "";
                          display: block;
                          width: 13px;
                          height: 13px;
                          overflow: hidden;
                          background: #fff;
                          border-radius: 50%;
                          top: 15px;
                          left: -40px;
                        }

                      }
                  }
                    .page5{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg5.jpg");
                      .des{
                        position: absolute;
                        top:238px;
                        left: 52px;
                        background-image: url("../assets/img/golf/version.1.2/page5/bg.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        width: 598px;
                        height: 1026px;
                        box-sizing: border-box;
                        padding: 47px 54px;
                        .title{
                          font-size: 58px;
                          color: #fff;
                          font-weight: bold;
                          margin-bottom: 46px;
                          font-family: NotoSerifCJKsc-Black;
                        }
                        .item{
                          width: 484px;
                          background-repeat: no-repeat;
                          background-size: 100% 100%;
                          height: 196px;
                          background-image: url("../assets/img/golf/version.1.2/page5/dh.png");
                          position: relative;
                          box-sizing: border-box;
                          margin-bottom: 20px;
                          .t1{
                            box-sizing: border-box;
                            padding-top: 10px;
                            padding-left: 13px;
                            font-size: 24px;
                            font-weight: bold;
                            color: #FDB36B;
                            margin-bottom: 23px;

                          }
                          .t2{
                            box-sizing: border-box;
                            color: #3B6009;
                            font-size: 36px;
                            margin-bottom: 24px;
                            font-weight: bold;
                            padding-left: 47px;
                          }
                          .t3{
                            box-sizing: border-box;
                            color: #FF8B1A;
                            font-size: 24px;
                            font-weight: bold;
                            padding-left: 47px;
                            span{
                              font-size: 30px;
                            }
                          }
                          .t4{
                              box-sizing: border-box;
                              padding-top: 53px;
                              padding-left: 46px;
                              margin-bottom: 30px;
                              color: #FF8B1A;
                              font-size: 33px;
                              font-weight: bold;
                              span{
                                font-size: 45px;
                              }
                          }
                          .t5{
                            box-sizing: border-box;
                            padding-left: 46px;
                            color: #3B6009;
                            font-size: 28px;
                            font-weight: bold;
                            span{
                              font-size: 32px;
                            }
                          }
                        }
                      }
                  }
                    .page6{
                      height: 1460px;
                      background-image: url("https://golf-1252055543.cos.ap-shanghai.myqcloud.com/web_pic/bg8.jpg");
                      .des{
                        position: absolute;
                        top:793px;
                        width: 100%;
                        .title{
                          font-size: 42px;
                          width: 100%;
                          color: #fff;
                          font-weight: bold;
                          text-align: center;
                          line-height: 2;
                          margin-bottom: 67px;
                          font-family: NotoSerifCJKsc-Black;
                        }
                        .btn{
                          width: 604px;
                          background: #479ec2;
                          height: 91px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 32px;
                          font-family: 微软雅黑;
                          color: #fff;
                          margin: 0 auto;
                          border-radius: 8px;
                          font-weight: bold;
                          margin-bottom: 114px;
                        }
                        .phone-box{
                          display: flex;
                          align-items: center;
                          width: 604px;
                          margin: 0 auto;
                          justify-content: space-between;
                          .btn1,.btn2{
                            width: 290px;
                            height: 90px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            font-size: 32px;
                            font-weight: bold;
                            border-radius: 8px;
                            background: #5CA22B;
                            font-family: 微软雅黑;

                          }
                          .btn2{

                          }
                        }

                    }
                  }
                }
            }
        }
    }
</style>
<style>
    #swiper-pagination .swiper-pagination-bullet{
        width: 54px;
        height: 8px;
        background: rgba(240,240,240,1);
        border-radius: 5px;

    }
</style>

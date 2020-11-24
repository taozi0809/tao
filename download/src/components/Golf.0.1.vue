<template>
  <div class="golf">
    <div class="swiper-container">
      <div class="swiper-wrapper">

        <div class="swiper-slide">
          <div class="page page1">
            <div class="bg"><img :src="imgsrc+'bg1.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="d1-c"><img :src="imgsrc+'page1_1.png'" alt=""></div>
              <div class="d1-b"><img :src="imgsrc+'page1_2.png'" alt=""></div>
              <div class="d1-d1" @click="goGolfLink">立即体验</div>
              <div class="d1-d2" @click="goNext">了解详情</div>
              <div class="d1-d1-l"><img :src="imgsrc+'d1-d1-l.png'" alt=""></div>
              <div class="d1-d2-r"><img :src="imgsrc+'d1-d2-r.png'" alt=""></div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page2">
            <div class="bg"><img :src="imgsrc+'bg2.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="r"><img :src="imgsrc+'r.png'" alt=""></div>
            <div class="des">
              <div class="t1">全新设计滚球竞猜玩法</div>
              <div class="t2">实时滚球玩法，各式各样虚拟竞猜，惊险刺激，给予你一种身临其境的感觉</div>
              <div class="t2">赛事丰富，各类大型赛事一应俱全</div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page3">
            <div class="bg"><img :src="imgsrc+'bg3.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="r"><img :src="imgsrc+'page3_1.png'" alt=""></div>
            <div class="des">
              <div class="d3-1">高尔夫球的获得与兑换</div>
              <div class="d3-2"></div>
              <div class="d3-b">
                <div class="d3-3">统一使用TITLEIST PRO V1高尔夫球进行竞猜 <div class="d3-3_1">（全新正品市场价30RMB/个）</div></div>
                <div class="d3-4">01 如何获取？</div>
                <div class="d3-5">竞猜高尔夫球可以在合作方进行消费后免费获赠</div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page3 page3_2">
            <div class="bg"><img :src="imgsrc+'bg3.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="r"><img :src="imgsrc+'page3_1_2.png'" alt=""></div>
            <div class="des">
              <div class="d3-1">高尔夫球的获得与兑换</div>
              <div class="d3-2"></div>
              <div class="d3-b">
                <div class="d3-4">02 如何使用？</div>
                <div class="d3-5">可以在投注界面进行投注，亦可在合作方进行消费，包括购买果岭券、球具、教学等服务；兑换泰国普吉岛高尔夫之旅。</div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page4">
            <div class="bg"><img :src="imgsrc+'bg4.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="d4-1">豪华 <div class="line"></div> 泰国</div>
              <div class="d4-2">普吉岛6天4球名门场</div>
              <div class="d4-3">
                <div class="d4-3_1"><img :src="imgsrc+'page4_1.png'" alt=""></div>
                <div class="d4-3_2">地点：普吉岛球场</div>
              </div>
              <div class="d4-4">
                <div class="d4-4_1"><img :src="imgsrc+'page4_2.png'" alt=""></div>
                <div class="d4-4_2">场数：四场</div>
              </div>
              <div class="d4-5">
                <div class="d4-5_1"><img :src="imgsrc+'page4_3.png'" alt=""></div>
                <div class="d4-5_2">兑换：500个TITLEIST <div class="d4-5_2_1">PRO V1高尔夫球</div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page5">
            <div class="bg"><img :src="imgsrc+'bg5.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="d5-1">
                <div class="d5-1_1">DAY 1</div>
                <div class="d5-1_2">国内 - 普吉岛</div>
                <div class="d5-1_3">
                  <div class="d5-1_31"><img :src="imgsrc+'page5_6.png'" alt=""></div>
                  <div class="d5-1_32">抵达普吉岛机场</div>
                </div>
                <div class="d5-1_4">
                  <div class="d5-1_41"><img :src="imgsrc+'page5_7.png'" alt=""></div>
                  <div class="d5-1_42b">
                    <div class="d5-1_42">机场迎接，赴酒店（50分钟）</div>
                    <div class="d5-1_43">时间50分钟｜公里数40公里</div>
                  </div>
                </div>
                <div class="d5-1_5">
                  <div class="d5-1_51"><img :src="imgsrc+'page5_8.png'" alt=""></div>
                  <div class="d5-1_52">到酒店办理入住手续</div>
                </div>
                <div class="d5-1_6">
                  <div class="d5-1_61">全程住宿</div>
                  <div class="d5-1_62"><img :src="imgsrc+'page5_9.png'" alt=""></div>
                  <div class="d5-1_62"><img :src="imgsrc+'page5_9.png'" alt=""></div>
                  <div class="d5-1_62"><img :src="imgsrc+'page5_9.png'" alt=""></div>
                  <div class="d5-1_62"><img :src="imgsrc+'page5_9.png'" alt=""></div>
                  <div class="d5-1_62"><img :src="imgsrc+'page5_9.png'" alt=""></div>
                </div>
                <div class="d5-1_7">普吉诺富特度假酒店 （当地5星）</div>
                <div class="d5-1_8"><img :src="imgsrc+'page5_2.png'" alt=""></div>
              </div>
              <div class="d5-1-l">
                <img :src="imgsrc+'page5_5.png'" alt="">
              </div>
              <div class="d5-1-l1"></div>
              <div class="d5-1-l2"></div>
              <div class="d5-1-l3"></div>
              <div class="d5-2"><img :src="imgsrc+'page5_1.png'" alt=""></div>
              <div class="d5-3">
                <div class="d5-3_1">DAY 2</div>
                <div class="d5-3_2">普吉岛</div>
                <div class="d5-3_3">
                  <div class="d5-3_31"><img :src="imgsrc+'page5_10.png'" alt=""></div>
                  <div class="d5-3_32b">
                    <div class="d5-3_32">酒店早餐，前往球场</div>
                    <div class="d5-3_33">时间50分钟｜公里数40公里</div>
                  </div>
                </div>
                <div class="d5-3_4">
                  <div class="d5-3_41"><img :src="imgsrc+'page5_11.png'" alt=""></div>
                  <div class="d5-3_42b">
                    <div class="d5-3_42">热身普吉城市球场，</div>
                    <div class="d5-3_43"><span>普吉岛乡村高尔夫俱乐部</span>  18洞</div>
                  </div>
                </div>
                <div class="d5-3_5">
                  <div class="d5-3_51"><img :src="imgsrc+'page5_12.png'" alt=""></div>
                  <div class="d5-3_52">晚餐后入住酒店</div>
                </div>
                <div class="d5-3_6"><img :src="imgsrc+'page5_3.png'" alt=""></div>
                <div class="d5-3_7"><img :src="imgsrc+'page5_4.png'" alt=""></div>

              </div>
              <div class="d5-4-l"><img :src="imgsrc+'page5_5.png'" alt=""></div>
              <div class="d5-4-l1"></div>
              <div class="d5-4-l2"></div>
              <div class="d5-4-l3"></div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page6">
            <div class="bg"><img :src="imgsrc+'bg5.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="d6-1">
                <div class="d6-1_1">DAY 3</div>
                <div class="d6-1_2">普吉岛</div>
                <div class="d6-1_3">
                  <div class="d6-1_31"><img :src="imgsrc+'page5_10.png'" alt=""></div>
                  <div class="d6-1_32b">
                    <div class="d6-1_32">酒店早餐，前往球场</div>
                    <div class="d6-1_33">时间25分钟｜公里数10公里</div>
                  </div>
                </div>
                <div class="d6-1_4">
                  <div class="d6-1_41"><img :src="imgsrc+'page5_11.png'" alt=""></div>
                  <div class="d6-1_42b">
                    <div class="d6-1_42">热身“普吉最难推的果岭”</div>
                    <div class="d6-1_43"><span>棕榈湖高尔夫乡村俱乐部</span>  18洞</div>
                  </div>
                </div>
                <div class="d6-1_5">
                  <div class="d6-1_51"><img :src="imgsrc+'page5_12.png'" alt=""></div>
                  <div class="d6-1_52">晚餐后入住酒店</div>
                </div>
                <div class="d6-1_8"><img :src="imgsrc+'page6_1.png'" alt=""></div>
                <div class="d6-1_9"><img :src="imgsrc+'page6_2.png'" alt=""></div>
              </div>
              <div class="d6-1-l"><img :src="imgsrc+'page5_5.png'" alt=""></div>
              <div class="d6-1-l1"></div>
              <div class="d6-1-l2"></div>
              <div class="d6-1-l3"></div>

              <div class="d6-3">
                <div class="d6-3_1">DAY 4</div>
                <div class="d6-3_2">普吉岛</div>
                <div class="d6-3_3">
                  <div class="d6-3_31"><img :src="imgsrc+'page5_10.png'" alt=""></div>
                  <div class="d6-3_32b">
                    <div class="d6-3_32">酒店早餐，前往球场</div>
                    <div class="d6-3_33">时间50分钟｜公里数30公里</div>
                  </div>
                </div>
                <div class="d6-3_4">
                  <div class="d6-3_41"><img :src="imgsrc+'page5_11.png'" alt=""></div>
                  <div class="d6-3_42b">
                    <div class="d6-3_42">挑战泰戈尔.伍兹抓老鹰的</div>
                    <div class="d6-3_43"><span>蓝峡谷高尔夫俱乐部</span>  18洞</div>
                  </div>
                </div>
                <div class="d6-3_5">
                  <div class="d6-3_51"><img :src="imgsrc+'page5_12.png'" alt=""></div>
                  <div class="d6-3_52">晚餐后入住酒店</div>
                </div>
              </div>
              <div class="d6-4-l"><img :src="imgsrc+'page5_5.png'" alt=""></div>
              <div class="d6-4-l1"></div>
              <div class="d6-4-l2"></div>
              <div class="d6-4-l3"></div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page7">
            <div class="bg"><img :src="imgsrc+'bg4.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="d7-1">
                <div class="d7-1_1">DAY 5</div>
                <div class="d7-1_2">普吉岛-国内</div>
                <div class="d7-1_3">
                  <div class="d7-1_31"><img :src="imgsrc+'page5_10.png'" alt=""></div>
                  <div class="d7-1_32b">
                    <div class="d7-1_32">酒店早餐，前往球场</div>
                    <div class="d7-1_33">时间20分钟｜公里数10公里</div>
                  </div>
                </div>
                <div class="d7-1_4">
                  <div class="d7-1_41"><img :src="imgsrc+'page5_11.png'" alt=""></div>
                  <div class="d7-1_42b">
                    <div class="d7-1_42">比拼“普吉岛最好的品质球场”</div>
                    <div class="d7-1_43"><span>红色山高尔夫俱乐部 </span>    18洞</div>
                  </div>
                </div>
                <div class="d7-1_5">
                  <div class="d7-1_51"><img :src="imgsrc+'page5_12.png'" alt=""></div>
                  <div class="d7-1_52">晚餐后入住酒店</div>
                </div>
                <div class="d7-1_6"><img :src="imgsrc+'page7_1.png'" alt=""></div>
                <div class="d7-1_7"><img :src="imgsrc+'page7_2.png'" alt=""></div>
                <div class="d7-1_8"><img :src="imgsrc+'page7_3.png'" alt=""></div>
                <div class="d7-1_9"><img :src="imgsrc+'page7_4.png'" alt=""></div>
              </div>
              <div class="d7-1-l"><img :src="imgsrc+'page5_5.png'" alt=""></div>
              <div class="d7-1-l1"></div>
              <div class="d7-1-l2"></div>
              <div class="d7-1-l3"></div>

              <div class="d7-2"><img :src="imgsrc+'page7_5.png'" alt=""></div>
              <div class="d7-3">
                <div class="d7-3_1">DAY 6</div>
                <div class="d7-3_2">抵达国内</div>
                <div class="d7-3_3">
                  <div class="d7-3_31"><img :src="imgsrc+'page5_6.png'" alt=""></div>
                  <div class="d7-3_32">前往机场，飞回国内</div>
                </div>
              </div>
              <div class="d7-4-l"><img :src="imgsrc+'page5_5.png'" alt=""></div>
              <div class="d7-4-l1"></div>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="page page8">
            <div class="bg"><img :src="imgsrc+'bg8.jpg'" alt=""></div>
            <div class="logo"><img :src="imgsrc+'logo.png'" alt=""></div>
            <div class="des">
              <div class="t2">更多精彩详情,敬请登录体验 </div>
              <div class="btna" @click="goGolfLink">立即体验 >></div>
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
  .swiper-container{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .swiper-wrapper{
      width: 100%;
      .swiper-slide {
        width: 100%;
        .page{
          width: 100%;
          height: 100%;
          position: relative;
          .bg{
            width: 100%;
            img{
              width: 100%;
            }
          }
          .logo{
            width: 208px;
            position: absolute;
            top: 69px;
            left: 68px;
            img{
              width: 100%;
            }
          }
          .des{
            box-sizing: border-box;
            .t1{
              font-weight: 900;
              font-size: 50px;
              color: #fff;
              font-family: 'NotoSerifCJKsc-Black';
              margin-bottom: 58px;

            }
            .t2{
              font-weight: 400;
              font-size: 29px;
              color: #F7FFF5;
              font-family: 'NotoSerifCJKsc-Black';
              margin-bottom: 41px;
              line-height: 42px;
            }
          }
        }
        .page1{
          .des{
            .d1-c{
              position: absolute;
              bottom: 550px;
              width: 713px;
              left: 13px;
              img{
                width: 100%;
              }
            }
            .d1-b{
              position: absolute;
              /*top: 981px;*/
              bottom: -5px;
              left: 269px;
              width: 223px;
              margin: 0 auto;
              img{
                width: 100%;
              }
            }
            .d1-d{
              position: absolute;
              /*top: 1238px;*/
              bottom: 45px;
              left: 147px;
              width: 469px;
              height: 48px;
              text-align: center;
              line-height: 48px;
              color: #fff;
              font-size: 28px;
              font-weight: 900;
              font-family: NotoSerifCJKsc-Black;
              background: #c9a062;
            }
            .d1-d1{
              position: absolute;
              /*top: 1238px;*/
              bottom:80px;
              left: 80px;
              width: 283px;
              height: 109px;
              text-align: center;
              line-height: 109px;
              color: #fff;
              font-size: 32px;
              font-weight: 900;

              background: #c9a062;
              border-radius: 15px;
            }
            .d1-d2{
              position: absolute;
              /*top: 1238px;*/
              bottom:80px;
              right:80px;
              width: 283px;
              height: 109px;
              text-align: center;
              line-height: 109px;
              color: #343434;
              font-size: 32px;
              font-weight: 900;

              background: #ccc;
              border-radius: 15px;
            }
            .d1-d1-l{
              position: absolute;
              width: 62px;
              left: 16px;
              bottom: 110px;
              img{
                width: 100%;
              }
            }
            .d1-d2-r{
              position: absolute;
              width: 62px;
              right: 16px;
              bottom: 110px;
              img{
                width: 100%;
              }
            }
          }
        }
        .page2{
          .r{
            width: 344px;
            position: absolute;
            top: 187px;
            left: 336px;
            img{
              width: 100%;
            }
          }
          .des{
            position: absolute;
            width: 100%;
            top: 924px;
            padding: 0 73px;
          }
        }
        .page3{
          .r{
            width: 263px;
            position: absolute;
            top:176px;
            left: 415px;
            img{
              width: 100%;
            }
          }
          .des{
            .d3-1{
              font-family: NotoSerifCJKsc-Black;
              width: 100%;
              color: #fff;
              font-size: 50px;
              font-weight: 900;
              position: absolute;
              left: 40px;
              top: 670px;
            }
            .d3-2{
              width: 578px;
              height: 6px;
              background: #fff;
              position: absolute;
              left: 0;
              top: 748px;
            }
            .d3-b{
              width: 600px;
              position: absolute;
              height: 408px;
              top: 822px;
              left: 44px;
              /*border: 1px solid red;*/
              box-sizing: border-box;
              .d3-3{
                color:#F7FFF5;
                font-family: NotoSerifCJKsc-Black;
                font-size: 27px;
                font-weight: 400;
                line-height: 40px;
                margin-bottom: 30px;
                .d3-3_1{
                  margin-left: -16px;
                  margin-top:5px;
                }
              }
              .d3-4{
                color: #FFEB41;
                font-family: NotoSerifCJKsc-Black;
                font-size: 31px;
                font-weight: 900;
                line-height: 40px;
              }
              .d3-5{
                color: #F7FFF5;
                font-family: NotoSerifCJKsc-Black;
                font-size: 27px;
                font-weight: 400;
                line-height: 40px;
                margin-bottom: 20px;
                position: relative;
                left: 45px;
              }
            }

          }
        }
        .page3_2{
          .r{
            width: 344px;
            position: absolute;
            top:90px;
            left: 330px;
            img{
              width: 100%;
            }
          }
          .des{
            .d3-1{
              top: 770px;
            }
            .d3-2{
              top: 848px;
            }
            .d3-b{

              top: 922px;

            }

          }
        }
        .page4{
          .des{
            .d4-1{
              position: absolute;
              left: 90px;
              top: 397px;
              color: #fff;
              font-size: 71px;
              font-family: NotoSerifCJKsc-Black;
              text-shadow: 0px 6px 6px rgba(6, 45, 18, 0.3);
              font-weight: 900;
              display: flex;
              align-items: center;
              .line{
                display: inline-block;
                width: 5px;
                height: 54px;
                position: relative;
                top: 5px;
                background: #fff;
                box-sizing: border-box;
                margin:0 25px ;
              }
            }
            .d4-2{
              position: absolute;
              left: 90px;
              top: 497px;
              color: #fff;
              font-size: 58px;
              font-family: NotoSerifCJKsc-Black;
              text-shadow: 0px 6px 6px rgba(6, 45, 18, 0.3);
              font-weight: 900;
            }
            .d4-3{
              position: absolute;
              top: 646px;
              left: 336px;
              display: flex;
              align-items: center;
              .d4-3_1{
                width: 31px;
                margin-right: 19px;
                height: 40px;
                img{
                  width: 100%;
                }
              }
              .d4-3_2{
                color: #fff;
                font-size: 31px;
                font-family: NotoSerifCJKsc-Black;
                font-weight: 900;
                position: relative;
                top: -5px;
              }
            }
            .d4-4{
              position: absolute;
              top: 716px;
              left: 336px;
              display: flex;
              align-items: center;
              .d4-4_1{
                width: 33px;
                margin-right: 19px;
                height: 40px;
                img{
                  width: 100%;
                }
              }
              .d4-4_2{
                color: #fff;
                font-size: 31px;
                font-family: NotoSerifCJKsc-Black;
                font-weight: 900;
                position: relative;
                top: -5px;
              }
            }
            .d4-5{
              position: absolute;
              top: 780px;
              left: 336px;
              display: flex;
              align-items: center;
              .d4-5_1{
                width: 34px;
                margin-right: 19px;
                height: 40px;
                flex-shrink: 0;
                position: relative;
                top: -18px;
                img{
                  width: 100%;
                }
              }
              .d4-5_2{
                color: #fff;
                font-size: 31px;
                line-height:46px;
                font-family: NotoSerifCJKsc-Black;
                font-weight: 900;
                position: relative;
                top: -5px;
                .d4-5_2_1{
                  padding-left: 96px;
                }
              }
            }
          }
        }
        .page5{
          .des{
            .d5-1{
              width:576px;
              height: 638px;
              background: rgb(95,134,34);
              position: absolute;
              top: 201px;
              left: 49px;
              border-radius: 15px;
              .d5-1_1{
                position: absolute;
                top:32px;
                left:23px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d5-1_2{
                position: absolute;
                top:50px;
                left:239px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d5-1_3{
                position: absolute;
                top:125px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-1_31{
                  width: 35px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-1_32{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
              .d5-1_4{
                position: absolute;
                top:175px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-1_41{
                  width: 29px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-1_42b{
                  position: relative;
                  top: 20px;
                  .d5-1_42{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    margin-bottom: 16px;
                  }
                  .d5-1_43{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                  }
                }

              }
              .d5-1_5{
                position: absolute;
                top:306px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-1_51{
                  width: 24px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-1_52{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
              .d5-1_6{
                position: absolute;
                top:364px;
                left:113px;
                display: flex;
                align-items: center;
                .d5-1_61{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                }
                .d5-1_62{
                  width: 27px;
                  margin-right: 5px;
                  img{
                    width: 100%;
                  }
                }
              }
              .d5-1_7{
                position: absolute;
                top:405px;
                left:113px;
                color: #FAFFA2;
                font-size: 28px;
                font-family: NotoSerifCJKsc-Black;
              }
              .d5-1_8{
                position: absolute;
                top:457px;
                left:120px;
                width: 266px;
                img{
                  width: 100%;
                }
              }

            }
            .d5-2{
              width:67px;
              position: absolute;
              top: 782px;
              left: 610px;
              z-index: 10;
              img{
                width: 100%;
              }
            }
            .d5-1-l{
              position: absolute;
              top: 297px;
              left: 72px;
              width: 2px;
              height: 360px;
              /*background:#f0f3ba;*/
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d5-1-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 338px;
              left: 67.5px;
              z-index: 9;
            }
            .d5-1-l2{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 402px;
              left: 67.5px;
              z-index: 9;
            }
            .d5-1-l3{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 517px;
              left: 67.5px;
              z-index: 9;
            }
            .d5-3{
              width:604px;
              height: 439px;
              background: rgb(95,134,34);
              position: absolute;
              top: 862px;
              left: 92px;
              border-radius: 15px;
              z-index: 9;
              .d5-3_1{
                position: absolute;
                top:30px;
                left:28px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d5-3_2{
                position: absolute;
                top:50px;
                left:243px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d5-3_3{
                position: absolute;
                top:110px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-3_31{
                  width: 23px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-3_32b{
                  position: relative;
                  top: 6px;
                  .d5-3_32{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 0px;
                  }
                  .d5-3_33{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                  }
                }
              }
              .d5-3_4{
                position: absolute;
                top:200px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-3_41{
                  width: 23px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-3_42b{
                  position: relative;
                  top: 17px;
                  .d5-3_42{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    margin-bottom: 16px;
                  }
                  .d5-3_43{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    span{
                      font-weight: 900;
                    }
                  }
                }

              }
              .d5-3_5{
                position: absolute;
                top:320px;
                left:73px;
                display: flex;
                align-items: center;
                .d5-3_51{
                  width: 24px;
                  margin-right: 20px;
                  img{
                    width: 100%;
                  }
                }
                .d5-3_52{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
              .d5-3_6{
                position: absolute;
                top:310px;
                left:346px;
                width: 114px;
                img{
                  width: 100%;
                }
              }
              .d5-3_7{
                position: absolute;
                top:310px;
                left:468px;
                width: 114px;
                img{
                  width: 100%;
                }
              }
            }

            .d5-4-l{
              position: absolute;
              top: 942px;
              left: 123px;
              width: 2px;
              height: 340px;
              z-index: 9;
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d5-4-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 989px;
              left: 119px;
              z-index: 9;
            }
            .d5-4-l2{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 1086px;
              left: 119px;
              z-index: 9;
            }
            .d5-4-l3{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 1192px;
              left: 119px;
              z-index: 9;
            }
          }
        }
        .page6{
          .des{
            .d6-1{
              width:598px;
              height: 615px;
              background: rgb(95,134,34);
              position: absolute;
              top: 225px;
              left: 75px;
              border-radius: 15px;
              .d6-1_1{
                position: absolute;
                top:32px;
                left:23px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d6-1_2{
                position: absolute;
                top:50px;
                left:239px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d6-1_3{
                position: absolute;
                top:125px;
                left:77px;
                display: flex;
                align-items: center;
                .d6-1_31{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-1_32b{
                  position: relative;
                  top: 10px;
                  .d6-1_32{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                  }
                  .d6-1_33{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                  }
                }

              }
              .d6-1_4{
                position: absolute;
                top:230px;
                left:77px;
                display: flex;
                align-items: center;
                .d6-1_41{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-1_42b{
                  position: relative;
                  top: 10px;
                  .d6-1_42{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                  }
                  .d6-1_43{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                    span{
                      font-weight: 900;
                    }
                  }
                }

              }
              .d6-1_5{
                position: absolute;
                top:547px;
                left:77px;
                display: flex;
                align-items: center;
                .d6-1_51{
                  width: 24px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-1_52{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
              .d6-1_8{
                position: absolute;
                top:333px;
                left:78px;
                width: 239px;
                img{
                  width: 100%;
                }
              }
              .d6-1_9{
                position: absolute;
                top:333px;
                left:326px;
                width: 244px;
                img{
                  width: 100%;
                }
              }
            }
            .d6-1-l{
              position: absolute;
              top: 325px;
              left: 99px;
              width: 2px;
              height: 510px;
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d6-1-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 372px;
              left: 95px;
              z-index: 9;
            }
            .d6-1-l2{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 473px;
              left: 95px;
              z-index: 9;
            }
            .d6-1-l3{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 782px;
              left: 95px;
              z-index: 9;
            }
            .d6-3{
              width:598px;
              height: 422px;
              background: rgb(95,134,34);
              position: absolute;
              top: 860px;
              left: 75px;
              border-radius: 15px;
              z-index: 9;
              .d6-3_1{
                position: absolute;
                top:30px;
                left:28px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d6-3_2{
                position: absolute;
                top:50px;
                left:243px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d6-3_3{
                position: absolute;
                top:110px;
                left:73px;
                display: flex;
                align-items: center;
                .d6-3_31{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-3_32b{
                  position: relative;
                  top: 6px;
                  .d6-3_32{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 0px;
                  }
                  .d6-3_33{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                  }
                }
              }
              .d6-3_4{
                position: absolute;
                top:200px;
                left:73px;
                display: flex;
                align-items: center;
                .d6-3_41{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-3_42b{
                  position: relative;
                  top: 17px;
                  .d6-3_42{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    margin-bottom: 16px;
                  }
                  .d6-3_43{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    span{
                      font-weight: 900;
                    }
                  }
                }

              }
              .d6-3_5{
                position: absolute;
                top:320px;
                left:73px;
                display: flex;
                align-items: center;
                .d6-3_51{
                  width: 24px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d6-3_52{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }

            }

            .d6-4-l{
              position: absolute;
              top: 966px;
              left: 98px;
              width: 2px;
              height: 297px;
              z-index: 9;
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d6-4-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 989px;
              left: 94px;
              z-index: 9;
            }
            .d6-4-l2{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 1086px;
              left: 94px;
              z-index: 9;
            }
            .d6-4-l3{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 1192px;
              left: 94px;
              z-index: 9;
            }
          }
        }
        .page7{
          .des{
            .d7-1{
              width:598px;
              height: 808px;
              background: rgb(95,134,34);
              position: absolute;
              top: 245px;
              left: 43px;
              border-radius: 15px;
              .d7-1_1{
                position: absolute;
                top:32px;
                left:23px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d7-1_2{
                position: absolute;
                top:50px;
                left:239px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d7-1_3{
                position: absolute;
                top:120px;
                left:73px;
                display: flex;
                align-items: center;
                .d7-1_31{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d7-1_32b{
                  position: relative;
                  top: 10px;
                  .d7-1_32{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                  }
                  .d7-1_33{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                  }
                }
              }
              .d7-1_4{
                position: absolute;
                top:230px;
                left:73px;
                display: flex;
                align-items: center;
                .d7-1_41{
                  width: 23px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d7-1_42b{
                  position: relative;
                  top: 10px;
                  .d7-1_42{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                  }
                  .d7-1_43{
                    color: #FAFFA2;
                    font-size: 28px;
                    font-family: NotoSerifCJKsc-Black;
                    position: relative;
                    top: 15px;
                    span{
                      font-weight: 900;
                    }
                  }
                }

              }
              .d7-1_5{
                position: absolute;
                top:730px;
                left:73px;
                display: flex;
                align-items: center;
                .d7-1_51{
                  width: 24px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d7-1_52{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
              .d7-1_6{
                position: absolute;
                top:333px;
                left:78px;
                width: 239px;
                img{
                  width: 100%;
                }
              }
              .d7-1_7{
                position: absolute;
                top:333px;
                left:326px;
                width: 242px;
                img{
                  width: 100%;
                }
              }
              .d7-1_8{
                position: absolute;
                top:508px;
                left:78px;
                width: 239px;
                img{
                  width: 100%;
                }
              }
              .d7-1_9{
                position: absolute;
                top:508px;
                left:326px;
                width: 242px;
                img{
                  width: 100%;
                }
              }

            }
            .d7-2{
              width:102px;
              position: absolute;
              top: 1022px;
              left: 154px;
              z-index: 10;
              img{
                width: 100%;
              }
            }
            .d7-1-l{
              position: absolute;
              top:344px;
              left: 66px;
              width: 2px;
              height: 678px;
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d7-1-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 391px;
              left: 61.5px;
              z-index: 9;
            }
            .d7-1-l2{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 493px;
              left: 61.5px;
              z-index: 9;
            }
            .d7-1-l3{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 982px;
              left: 61.5px;
              z-index: 9;
            }

            .d7-3{
              width:464px;
              height: 185px;
              background: rgb(95,134,34);
              position: absolute;
              top: 1081px;
              left: 241px;
              border-radius: 15px;
              z-index: 9;
              .d7-3_1{
                position: absolute;
                top:30px;
                left:28px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size: 59px;
                width: 250px;
              }
              .d7-3_2{
                position: absolute;
                top:50px;
                left:243px;
                color: #fff;
                font-weight: 900;
                font-family: NotoSerifCJKsc-Black;
                font-size:34px;
                width: 250px;
              }
              .d7-3_3{
                position: absolute;
                top:125px;
                left:73px;
                display: flex;
                align-items: center;
                .d7-3_31{
                  width: 35px;
                  margin-right: 25px;
                  img{
                    width: 100%;
                  }
                }
                .d7-3_32{
                  color: #FAFFA2;
                  font-size: 28px;
                  font-family: NotoSerifCJKsc-Black;
                  position: relative;
                  top: -3px;
                }
              }
            }

            .d7-4-l{
              position: absolute;
              top: 1182px;
              left: 266px;
              width: 2px;
              height: 71px;
              z-index: 9;
              img{
                width: 2px;
                height: 100%;
              }
            }
            .d7-4-l1{
              position: absolute;
              width: 11px;
              height: 11px;
              overflow: hidden;
              background: rgb(216,225,78);
              border-radius: 50%;
              top: 1216px;
              left: 262px;
              z-index: 9;
            }
          }
        }
        .page8{
          .des{
            .t1{
              position: absolute;
              width: 100%;
              /*top: 759px;*/
              top: 50%;
              transform: translateY(-50%);
              text-align: center;
              font-size: 42px;

            }
            .t2{
              position: absolute;
              width: 100%;
              top: calc(50% + 80px);
              transform: translateY(-50%);
              text-align: center;
              font-size: 42px;
            }
            .btna{
              width: 605px;
              height: 92px;
              overflow: hidden;
              background: #479ec2;
              line-height: 92px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              color: #fff;
              border-radius: 15px;
              margin-bottom: 26px;
              position: absolute;
              left: 73px;
              /*top: 971px;*/
              bottom: 250px;
            }
            .btn{
              width: 292px;
              height: 92px;
              overflow: hidden;
              background: #5CA22B;
              line-height: 92px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              color: #fff;
              border-radius: 15px;
              margin-bottom: 26px;
            }
            .btn1{
              position: absolute;
              left: 73px;
              bottom: 70px;
            }
            .btn2{
              position: absolute;
              right: 73px;
              bottom: 70px;
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

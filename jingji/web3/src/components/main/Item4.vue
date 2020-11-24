<template>
    <div :class="isPC?'pc-item4':'mobile-item4'">
        <div class="con">
            <Title :title="title1"/>

            <div class="m1-des">
                <div class="des"><span>01</span> 国家体育总局棋牌运动管理中心颁发的《竞技二打一扑克赛事管理办法》</div>
                <div class="des"><span>02</span> 国家体育总局棋牌运动管理中心颁发的《竞技二打一扑克竞赛规则》</div>
                <div class="des"><span>03</span> 国家体育总局棋牌运动管理中心颁发的《竞技二打一扑克技术等级条例实施细则》</div>
                <div class="des"><span>04</span> 国家体育总局棋牌运动管理中心颁发的《竞技二打一扑克技术等级条例》</div>
                <div class="des"><span>05</span> 趣味棋牌竞技化项目公共政策撰写规范</div>
                <div class="des"><span>06</span> 趣味棋牌竞技化项目宣传要求</div>
                <div class="des"><span>07</span> 国家体育总局棋牌运动管理中心公告《竞技趣味棋牌服务管理平台上线公告书》</div>
                <div class="des"><span>08</span> 中国智力运动网竞技趣味棋牌服务管理平台，对竞技二打一扑克的赛事组织者及所举办的赛事，提供统一服务与监管。</div>
                <div class="des"><span>09</span> 趣味棋牌管理服务平台API厂商接口</div>
                <div class="des"><span>10</span> 中国互联网上网服务行业协会发布《趣味棋牌竞技场馆运营服务规范》</div>
                <div class="des"><span>11</span> 中国互联网上网服务行业协会发布《趣味棋牌竞技赛事组织与管理规范》</div>
                <div class="des"><span>12</span> 《趣味棋牌竞技场馆运营服务规范》和《趣味棋牌竞技赛事组织与管理规范》两项标准归口单位全国协会，受国家标准化管理委员会、文化和旅游部委托，承担全国网络文化标准化技术委员会秘书工作。</div>
                <div class="des"><span>13</span> 中国智力运动产业基地管理中心授权委托书</div>
                <div class="des"><span>14</span> 万康兴获得趣味竞技棋牌项目《竞技二打一》联合运营的公告</div>
                <div class="des"><span>15</span> 国务院印发《关于加快发展体育产业促进体育消费的若干意见》</div>
            </div>
        </div>
        <div class="con4 mark" id="item4">
            <Title :title="title2"/>
            <div class="m2-box">
                <div class="l1">
                    <div class="box1">
                        <div class="l">01</div>
                        <div class="r">
                            <div class="des1">资质授权合法合规</div>
                            <div class="des2">依法取得主管单位的联合运营授权</div>
                        </div>
                    </div>
                    <div class="box2" v-if="isPC"><img src="../../assets/img/main/item4/xt.png" alt=""></div>
                </div>
                <div class="l2">
                    <div class="box1">
                        <div class="l">02</div>
                        <div class="r">
                            <div class="des1">行业经验丰富</div>
                            <div class="des2">对支付、游戏、赛事、海外、棋牌、东南亚文化等拥有独到的见解</div>
                        </div>
                    </div>
                    <div class="box2">
                        <div class="l">05</div>
                        <div class="r">
                            <div class="des1">团队结构完整</div>
                            <div class="des2">核心成员全部来自支付、棋牌、赛事、游戏、文化等领域</div>
                        </div>
                    </div>
                </div>
                <div class="l3">
                    <div class="box1">
                        <div class="l">03</div>
                        <div class="r">
                            <div class="des1">资金安全有保障</div>
                            <div class="des2">正规第三方支付 充值方便 派奖快捷 官方监管 安全透明 依法纳税</div>
                        </div>
                    </div>
                    <div class="box2">
                        <div class="l">06</div>
                        <div class="r">
                            <div class="des1">运营规范</div>
                            <div class="des2">接入趣味竞技棋牌管理服务平台API完全按照竞技二打一 扑克竞赛规则和赛制及计分规则运营</div>
                        </div>
                    </div>
                </div>
                <div class="l4">
                    <div class="box1">
                        <div class="l">04</div>
                        <div class="r">
                            <div class="des1">相关资源丰富</div>
                            <div class="des2">顾问成员主要来自网监、文旅部、公安部、国家体育总局等单位成员</div>
                        </div>
                    </div>
                    <div class="box2">
                        <div class="l">07</div>
                        <div class="r">
                            <div class="des1">投资人阵容强大</div>
                            <div class="des2">核心战略投资人全部来游戏棋牌行业、区块链行业以及流量领域</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m2-box2">
                <div class="l">
                    <div class="b-box">
                        <div class="img-box"><img src="../../assets/img/main/item4/l.png" alt=""></div>
                        <div class="des">
                            <div class="t1">流量优势</div>
                            <div class="t2">
                                <p>多社交产品引流</p>
                                <p>多平台直播裂变</p>
                                <p>多渠道合作推广</p>
                                <p>多KOL分享营销</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c">
                    <div class="b-box">
                        <div class="img-box"><img src="../../assets/img/main/item4/c.png" alt=""></div>
                        <div class="des">
                            <div class="t1">产品优势</div>
                            <div class="t2">
                                <p>发牌记录公开上链，公平公正</p>
                                <p>真人参赛全程备案，绝无虚假</p>
                                <p>超经典玩法二打一，欢乐竞技</p>
                                <p>24小时赛事不间断，随时参赛</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r">
                    <div class="b-box">
                        <div class="img-box"><img src="../../assets/img/main/item4/r.png" alt=""></div>
                        <div class="des">
                            <div class="t1">运营优势</div>
                            <div class="t2">
                                <p>顶尖运营专家运营培训</p>
                                <p>客服全程在线全程答疑</p>
                                <p>专业赛事人员在线指导</p>
                                <p>完善的推广和运营体系</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="con4_1">
            <Title :title="title3"/>
            <div class="m3-box">
                <div class="l">
                    <div class="l-img-logo"><img src="../../assets/img/main/item4/1.png" alt=""></div>
                    <div class="list">
                        <div class="l-t">合规赛事</div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>国家主管部门组织</p>
                        </div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>有完善的公共政策体系支撑</p>
                        </div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>赛事严格审批、全程监管</p>
                        </div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>奖金与报名费脱钩，奖金预存</p>
                        </div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>按照名次和大师分发放奖金</p>
                        </div>
                        <div class="l-t1">
                            <span><img src="../../assets/img/main/item4/2.png" alt=""></span>
                            <p>正规第三方支付通道，充值实时到账奖金实时派发</p>
                        </div>
                    </div>
                </div>
                <div class="c">VS</div>
                <div class="r">
                    <div class="list">
                        <div class="r-t">不合规赛事</div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>主办方无相关主管部门授权</p>
                        </div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>主办方自己制定的赛制规则</p>
                        </div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>随意组织、缺少监管</p>
                        </div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>奖金根据收取报名费多少浮动</p>
                        </div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>用筹码兑换奖金或者积分兑换实物</p>
                        </div>
                        <div class="r-t1">
                            <span><img src="../../assets/img/main/item4/3.png" alt=""></span>
                            <p>违法违规面对法律风险</p>
                        </div>
                </div>
            </div>

            </div>
            <div class="m4-box">
                <div class="list" v-if="isPC">
                    <div class="lt">
                        <div class="l">趣味棋牌游戏</div>
                        <div class="c">对比</div>
                        <div class="r">趣味棋牌竞技化项目</div>
                    </div>
                    <div class="l1">
                        <div class="l">广大棋牌爱好者熟悉的棋牌游戏</div>
                        <div class="c"><div class="c-c">性质</div></div>
                        <div class="r">国家认可的智力运动项目，同围棋、国际象棋、桥牌等性质相同，有多项国家认可的体育赛事</div>
                    </div>
                    <div class="l1">
                        <div class="l">大众熟悉的游戏玩法，且同桌者相互比较成绩，得分高低与运气成分相关联—运气好，手牌好，得分就会高</div>
                        <div class="c"><div class="c-c">规则</div></div>
                        <div class="r">出牌方式与传统棋牌游戏大体相同，但计分方式完全不同。趣味棋牌竞技化项目采用复式计分方式，即将同场比赛中所坐方位相同、拿相同初始手牌的人横向比较成绩，根据胜率 确定排名，在人人赛中明确使用瑞士移位的复式编排方式，最大程度摒除运气成分，充分体现牌手的竞技水平</div>
                    </div>
                    <div class="l1">
                        <div class="l">休闲娱乐的棋牌游戏，参与的方式多种多样，可以朋友相约线下打纸牌，也可以通过游戏软件参与</div>
                        <div class="c"><div class="c-c">参与方式</div></div>
                        <div class="r">去纸牌化，统一采用官方认证的竞技软件参与比赛，其中官方网站为中国智力运动网</div>
                    </div>
                    <div class="l1">
                        <div class="l">属于棋牌娱乐游戏，没有什么正规比赛</div>
                        <div class="c"><div class="c-c">赛事类型</div></div>
                        <div class="r">国家认可的智力体育运动项目，具有严格的赛事等级划分， 每个赛事等级的比赛，所发放的大师分不同，赛事等级越高，发放的大师分等级，每个赛事等级的比赛，所发放的大师分不同，赛事等级越高，发放的大师分等级越高。趣味棋牌竞技化项目拥有以大师分为依据的完整的技术认证体系，牌手获得一定数量的大师分，会得到官方认定的大师称号。此外，有专业的组织机构，职业的裁判和赛事组委会</div>
                    </div>
                    <div class="l1">
                        <div class="l">虚拟货币、话费、购物卡、实物奖品等形式</div>
                        <div class="c"><div class="c-c">奖励机制</div></div>
                        <div class="r">国家认可的智力运动项目，参赛选手可获得赛事奖金（赛事奖金需缴纳个人所得税）和大师分，赛事奖金和大师分奖励由竞技平台统一发放</div>
                    </div>
                </div>
                <div class="list" v-if="!isPC">
                    <div class="lt">趣味棋牌游戏</div>
                    <div class="l1">
                        <div class="c">性质</div>
                        <div class="l">广大棋牌爱好者熟悉的棋牌游戏</div>
                    </div>
                    <div class="l1">
                        <div class="c">规则</div>
                        <div class="l">大众熟悉的游戏玩法，且同桌者相互比较成绩，得分高低与运气成分相关联—运气好，手牌好，得分就会高</div>
                    </div>
                    <div class="l1">
                        <div class="c">参与方式</div>
                        <div class="l">休闲娱乐的棋牌游戏，参与的方式多种多样，可以朋友相约线下打纸牌，也可以通过游戏软件参与</div>
                    </div>
                    <div class="l1">
                        <div class="c">赛事类型</div>
                        <div class="l">属于棋牌娱乐游戏，没有什么正规比赛</div>
                    </div>
                    <div class="l1">
                        <div class="c">奖励机制</div>
                        <div class="l">虚拟货币、话费、购物卡、实物奖品等形式</div>
                    </div>
                </div>
                <div class="c-box" v-if="!isPC">对比</div>
                <div class="list" v-if="!isPC">
                    <div class="lt">趣味棋牌竞技化项目</div>
                    <div class="l1">
                        <div class="c">性质</div>
                        <div class="l">国家认可的智力运动项目，同围棋、国际象棋、桥牌等性质相同，有多项国家认可的体育赛事</div>
                    </div>
                    <div class="l1">
                        <div class="c">规则</div>
                        <div class="l">出牌方式与传统棋牌游戏大体相同，但计分方式完全不同。趣味棋牌竞技化项目采用复式计分方式，即将同场比赛中所坐方位相同、拿相同初始手牌的人横向比较成绩，根据胜率 确定排名，在人人赛中明确使用瑞士移位的复式编排方式，最大程度摒除运气成分，充分体现牌手的竞技水平</div>
                    </div>
                    <div class="l1">
                        <div class="c">参与方式</div>
                        <div class="l">去纸牌化，统一采用官方认证的竞技软件参与比赛，其中官方网站为中国智力运动网</div>
                    </div>
                    <div class="l1">
                        <div class="c">赛事类型</div>
                        <div class="l">国家认可的智力体育运动项目，具有严格的赛事等级划分， 每个赛事等级的比赛，所发放的大师分不同，赛事等级越高，发放的大师分等级，每个赛事等级的比赛，所发放的大师分不同，赛事等级越高，发放的大师分等级越高。趣味棋牌竞技化项目拥有以大师分为依据的完整的技术认证体系，牌手获得一定数量的大师分，会得到官方认定的大师称号。此外，有专业的组织机构，职业的裁判和赛事组委会</div>
                    </div>
                    <div class="l1">
                        <div class="c">奖励机制</div>
                        <div class="l">国家认可的智力运动项目，参赛选手可获得赛事奖金（赛事奖金需缴纳个人所得税）和大师分，赛事奖金和大师分奖励由竞技平台统一发放</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    import Title from '../../components/Title'

    export default {
        components:{Title},
        data(){
            return{
                isPC:true,
                title1:{
                    name:"国家相关政策披露",
                    des:"RELEVANT NATIONAL POLICIES",
                },
                title2:{
                    name:"我们的优势",
                    des:"OUR ADVANTAGE",
                },
                title3:{
                    name:"赛事对比",
                    des:"CONTRAST",
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item4{
        width: 100%;
        height: 3460px;
        background-image: url("../../assets/img/main/item4/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top:60px;
        .con,.con4,.con4_1{
            .m1-des{
                width:1200px;
                margin: 0 auto;
                margin-top: 45px;
                box-sizing: border-box;
                overflow: hidden;
                .des{
                    width:1200px;
                    margin: 0 auto;
                    font-size:20px;
                    font-weight: bold;
                    color:#6381B7;
                    line-height: 36px;
                    margin-top:6px;
                    text-indent: -2em;
                    margin-left: 2em ;

                }
            }
        }
        .con4{
            box-sizing: border-box;
            padding-top: 100px;
            .m2-box{
                width:1200px;
                margin: 0 auto;
                margin-top: 90px;
                .l1{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    .box1{
                        width:600px;
                        flex-shrink: 0;
                        display: flex;
                        box-sizing: border-box;
                        padding-right: 20px;
                        .l{
                            color:#A3B9DD;
                            font-size: 36px;
                            font-weight: bold;
                            margin-right: 35px;
                        }
                        .r{
                            position: relative;
                            top: 5px;
                            .des1{
                                color:#6381B7;
                                font-size: 26px;
                                font-weight: bold;
                            }
                            .des2{
                                color:#6381B7;
                                font-size: 20px;
                                font-weight: bold;
                                margin-top: 15px;
                                line-height: 26px;
                            }
                        }
                    }
                    .box2{
                        position: absolute;
                        right: 0;
                        width: 863px;
                        flex-shrink: 0;
                        top: 0;
                        img{
                            width: 100%;
                        }
                    }
                }
                .l2,.l3,.l4{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 36px;
                    .box1,.box2{
                        width: 40vw;
                        flex-shrink: 0;
                        display: flex;
                        .l{
                            color:#A3B9DD;
                            font-size: 36px;
                            font-weight: bold;
                            margin-right: 35px;
                        }
                        .r{
                            position: relative;
                            top: 5px;
                            .des1{
                                color:#6381B7;
                                font-size: 26px;
                                font-weight: bold;
                            }
                            .des2{
                                color:#6381B7;
                                font-size: 20px;
                                font-weight: bold;
                                margin-top: 15px;
                                line-height: 26px;
                            }
                        }
                    }
                    .box1{
                        box-sizing: border-box;
                        padding-right: 20px;
                    }
                    .box2{
                        box-sizing: border-box;
                        padding-left: 20px;
                    }
                }
            }
            .m2-box2{
                width:1200px;
                margin: 0 auto;
                margin-top: 74px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .l,.c,.r{
                    width: 372px;
                    height: 224px;
                    border:2px solid #9AB9F0;
                    background: #C5D9F5;
                    border-radius:8px;
                    box-sizing: border-box;
                    overflow: hidden;
                    padding: 4px;
                    .b-box{
                        background:#DBEBFD;
                        width: 360px;
                        height: 212px;
                        margin: 0 auto;
                        display: flex;
                        box-sizing: border-box;
                        .img-box{
                            width: 42px;
                            margin-top: 24px;
                            margin-left: 32px;
                            margin-right: 28px;
                            flex-shrink: 0;
                            img{
                                width: 100%;
                            }
                        }
                        .des{
                            margin-top: 34px;
                            .t1{
                                color:#6381B7 ;
                                font-size: 24px;
                                font-weight: bold;
                                white-space:nowrap;
                            }
                            .t2{
                                margin-top: 15px;
                                p{
                                    color:#6381B7 ;
                                    font-size: 18px;
                                    white-space:nowrap;
                                    margin: 0;
                                    padding: 0;
                                    margin-top: 6px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .con4_1{
            box-sizing: border-box;
            padding-top: 160px;
            .m3-box{
                width: 1200px;
                margin: 0 auto;
                height: 480px;
                margin-top: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                .l,.r{
                    width: 584px;
                    height: 480px;
                    background: #DBEBFD;
                    box-sizing: border-box;
                    border:4px solid #99B9EF;
                    overflow: hidden;
                    .list{
                        margin-top: 50px;
                        .l-t,.r-t{
                            color:#6381B7;
                            font-size: 28px;
                            line-height: 30px;
                            font-weight: bold;
                            margin-bottom:40px;
                        }
                        .l-t1,.r-t1{
                            margin-top: 20px;
                            span{
                                display: block;
                                width:30px ;
                                height: 30px;
                                img{
                                    width: 100%;
                                }
                            }
                            p{
                                margin: 0;
                                padding: 0;
                            }
                        }
                    }
                }
                .l{
                    position: relative;
                    border-right: 0;
                    border-bottom-left-radius:8px ;
                    border-top-left-radius:8px ;
                    .l-img-logo{
                        position: absolute;
                        top: 38px;
                        left: 48px;
                        width: 80px;
                        img{
                            width: 100%;
                        }
                    }
                    .list{
                        box-sizing: border-box;
                        padding-right: 80px;
                        .l-t{
                            display: flex;
                            align-items: center;
                            flex-direction:row-reverse;
                        }
                        .l-t1{
                            display: flex;
                            align-items: center;
                            flex-direction:row-reverse;
                            span{
                                margin-left: 20px;
                            }
                            p{
                                color:#6381B7;
                                font-size: 20px;
                                font-weight: bold;
                            }
                        }
                    }
                }
                .r{
                    border-bottom-right-radius:8px ;
                    border-top-right-radius:8px ;
                    border-left: 0;
                    .list{
                        box-sizing: border-box;
                        padding-left: 80px;
                        .r-t{
                            color:#8CA4CA;
                        }
                        .r-t1{
                            display: flex;
                            align-items: center;
                            span{
                                margin-right: 20px;
                            }
                            p{
                                color:#8CA4CA;
                                font-size: 20px;
                                font-weight: bold;
                                height: 30px;
                            }
                        }
                    }
                }
                .c{
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-sizing: border-box;
                    border:4px solid #5581CD;
                    background:#95B4EB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 30px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #fff;
                }
            }
            .m4-box{
                width: 1200px;
                padding: 0 20px;
                margin: 0 auto;
                height: 700px;
                margin-top: 30px;
                box-sizing: border-box;
                border:4px solid #99B9EF;
                border-radius: 8px;
                overflow: hidden;
                background: #DBEBFD;
                .list{
                    .lt{
                        display: flex;
                        align-items: center;
                        margin-top: 45px;
                        padding-bottom: 20px;
                        .l,.r{
                            width: 480px;
                            color:#6381B7;
                            font-size: 28px;
                            font-weight: bold;
                        }
                        .l{
                            display: flex;
                            flex-direction: row-reverse;
                        }
                        .c{
                            width: 240px;
                            color:#5581CD;
                            font-size: 26px;
                            font-weight: bold;
                            text-align: center;
                        }
                    }
                    .l1{
                        display: flex;
                        align-items: center;
                        margin-top: 20px;
                        .l,.r{
                            width: 480px;
                            color:#5581CD;
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .l{
                            display: flex;
                            flex-direction: row-reverse;
                            text-align: right;
                        }
                        .c{
                            width:240px;
                            .c-c{
                                width: 160px;
                                margin: 0 auto;
                                height: 60px;
                                line-height: 60px;
                                color:#fff;
                                font-size: 26px;
                                font-weight: bold;
                                text-align: center;
                                background:#5681CD;
                                border-radius: 8px;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 1024px) {
            .con{
                .m1-des{
                    width: 900px;
                    .des{
                        font-size:16px;
                    }
                }
            }
            .con4{
                .m2-box{
                    width:900px;
                    .l1{
                        .box1{
                            width:450px;
                            .l{
                                font-size: 30px;

                            }
                            .r{
                                position: relative;
                                top: 5px;
                                .des1{
                                    font-size: 20px;
                                }
                                .des2{
                                    font-size: 14px;
                                    margin-top:10px;
                                    line-height: 20px;
                                }
                            }
                        }
                        .box2{
                            width: 647px;
                        }
                    }
                    .l2,.l3,.l4{
                        .box1,.box2{
                            .l{
                                font-size: 30px;
                            }
                            .r{
                                position: relative;
                                top: 5px;
                                .des1{
                                    font-size: 20px;
                                }
                                .des2{
                                    font-size: 14px;
                                    margin-top:10px;
                                    line-height: 20px;
                                }
                            }
                        }
                    }
                }
                .m2-box2{
                    width:900px;
                    .l,.c,.r{
                        width: 280px;
                        height: 180px;
                        .b-box{
                            width: 266px;
                            height: 168px;
                            .img-box{
                                width: 22.5px;
                                flex-shrink: 0;
                                margin-top: 18px;
                                margin-left:10px;
                                margin-right:10px;
                            }
                            .des{
                                margin-top: 20px;
                                .t1{
                                    font-size: 22px;
                                }
                                .t2{
                                    p{
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }

                }
            }
            .con4_1{
                .m3-box{
                    width:900px;
                    .l,.r{
                        width: 434px;
                        .list{
                            margin-top: 50px;
                            .l-t,.r-t{
                                font-size:20px;
                                margin-bottom:40px;
                            }
                            .l-t1,.r-t1{
                                margin-top: 20px;
                                span{
                                    display: block;
                                    width:30px ;
                                    img{
                                        width: 30px;
                                    }
                                }
                                p{
                                    margin: 0;
                                    padding: 0;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    .l{
                        .list{
                            padding-right: 60px;
                            .l-t1{
                                p{
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    .r{
                        .list{
                            padding-left: 60px;
                            .r-t1{
                                p{
                                    font-size:16px;
                                }
                            }
                        }
                    }
                    .c{
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        overflow: hidden;
                        box-sizing: border-box;
                        border:4px solid #5581CD;
                        background:#95B4EB;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 30px;
                        font-size: 30px;
                        font-weight: bold;
                        color: #fff;
                    }
                }
                .m4-box{
                    width: 900px;
                    height:600px ;
                    .list{
                        .lt{
                            .l,.r{
                                width: 360px;
                                font-size: 22px;
                            }
                            .c{
                                width: 180px;
                                font-size: 20px;
                            }
                        }
                        .l1{
                            .l,.r{
                                width: 360px;
                                font-size:14px;
                            }
                            .c{
                                width:180px;
                                .c-c{
                                    width: 120px;
                                    height: 50px;
                                    line-height: 50px;
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    .mobile-item4{
        width: 100%;
        background-image: url("../../assets/img/main/item4/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con{
            .m1-des{
                width: 90vw ;
                margin: 0 auto;
                margin-top: 6vw;
                .des{
                    font-size: 4vw;
                    color:#6382B7;
                    line-height: 1.5;
                    margin-top: 4vw;
                    text-indent: -1.5em ;
                    margin-left: 1.5em ;
                    font-family: 微软雅黑;
                }
            }

        }
        .con4{
            box-sizing: border-box;
            padding-top: 60px;

            .m2-box{
                margin-top: 8vw;
                .l1,.l2,.l3,.l4{
                    width: 90%;
                    margin: 0 auto;
                    .box1,.box2{
                        display: flex;
                        .l{
                            color:#A3B9DD;
                            font-size: 5vw;
                            font-weight: bold;
                            margin-right: 4vw;
                            font-family: 微软雅黑;
                        }
                        .r{
                            position: relative;
                            top: 0.6vw;
                            .des1{
                                color:#6381B7;
                                font-size: 4vw;
                                font-weight: bold;
                            }
                            .des2{
                                color:#6381B7;
                                font-size: 4vw;
                                margin-top: 1vw;
                                line-height: 1.5;
                            }
                        }
                    }
                    .box1{
                        box-sizing: border-box;
                        margin-top: 6vw;
                    }
                    .box2{
                        box-sizing: border-box;
                        margin-top: 6vw;
                    }
                }
            }
            .m2-box2{
                margin-top: 10vw;
                .l,.c,.r{
                    width: 80vw;
                    margin: 0 auto;
                    margin-top: 6vw;
                    border:2px solid #9AB9F0;
                    background: #C5D9F5;
                    border-radius:8px;
                    box-sizing: border-box;
                    overflow: hidden;
                    padding: 1vw 0;
                    .b-box{
                        background:#DBEBFD;
                        width: 77vw;
                        margin: 0 auto;
                        display: flex;
                        box-sizing: border-box;
                        padding-bottom:3vw ;
                        .img-box{
                            width: 8vw;
                            margin-top:3vw;
                            margin-left: 6vw;
                            margin-right: 6vw;
                            flex-shrink: 0;
                            img{
                                width: 100%;
                            }
                        }
                        .des{
                            margin-top: 4vw;
                            .t1{
                                color:#6381B7 ;
                                font-size: 5vw;
                                font-weight: bold;
                                white-space:nowrap;
                            }
                            .t2{
                                margin-top: 15px;
                                p{
                                    color:#6381B7 ;
                                    font-size: 4vw;
                                    white-space:nowrap;
                                    margin: 0;
                                    padding: 0;
                                    margin-top: 2vw;
                                }
                            }
                        }
                    }
                }
            }
        }
        .con4_1{
            box-sizing: border-box;
            padding-top: 60px;
            .m3-box{
                position: relative;
                .l,.r{
                    position: relative;
                    box-sizing: border-box;
                    padding: 5vw 2vw;
                    width: 80%;
                    margin: 0 auto;
                    border:1vw solid #99B9EF;
                    margin-top: 6vw;
                    background: #DBEBFD;
                    .l-img-logo{
                        position: absolute;
                        right:5vw;
                        top: 2vw;
                        width: 14vw;
                        img{
                           width: 100%;
                        }
                    }
                    .list{
                        .l-t,.r-t{
                            font-size: 5vw;
                            font-weight: bold;
                            margin-top: 2vw;
                            padding-bottom: 3vw;
                        }
                        .l-t1,.r-t1{
                            display: flex;
                            align-items: center;
                            margin-top: 4vw;
                            span{
                                display: block;
                                width: 5vw;
                                height: 5vw;
                                margin-right: 2vw;
                                flex-shrink: 0;
                                img{
                                    width: 100%;
                                }
                            }
                            p{
                                font-size: 4vw;
                                margin: 0 ;
                                padding: 0;
                            }
                        }
                    }
                }
                .l{
                    .list{
                        .l-t{
                            color: #6381B7;
                        }
                        .l-t1{
                            color:#6381B7;
                        }
                    }
                }
                .r{
                    .list{
                        .r-t{
                           color: #8CA4CA;
                        }
                        .r-t1{
                            color:#8CA4CA;
                        }
                    }
                }
                .c{
                    width: 15vw;
                    height:15vw;
                    border-radius: 50%;
                    overflow: hidden;
                    box-sizing: border-box;
                    border:1vw solid #5581CD;
                    background:#95B4EB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    left: 50%;
                    top: 3vw;
                    transform: translateX(-50%);
                    font-size: 5vw;
                    font-weight: bold;
                    color: #fff;
                    font-family: 微软雅黑;
                }
            }
            .m4-box{
               margin-top:20vw;
               .list{
                   width: 80vw;
                   margin: 0 auto;
                   border:4px solid #99B9EF;
                   border-radius: 8px;
                   overflow: hidden;
                   box-sizing: border-box;
                   padding: 4vw 2vw;
                   margin-top: 6vw;
                   background: #DBEBFD;
                   .lt{
                        font-size: 5vw;
                        color:#6381B7;
                        font-weight: bold;
                        box-sizing: border-box;
                        padding-bottom: 4vw;
                   }
                   .l1{
                       display: flex;
                       align-items: center;
                       margin-top: 4vw;
                       .c{
                           background:#5681CD;
                           color: #fff;
                           font-size: 3.6vw;
                           overflow: hidden;
                           border-radius: 8px;
                           width: 20vw;
                           flex-shrink: 0;
                           height: 7vw;
                           line-height: 7vw;
                           text-align: center;
                           margin-right: 2vw;
                           font-weight: bold;
                       }
                       .l{
                           font-size: 4vw;
                           color:#6381B7;
                       }
                   }
               }
                .c-box{
                    width: 15vw;
                    height:15vw;
                    border-radius: 50%;
                    overflow: hidden;
                    box-sizing: border-box;
                    border:1vw solid #5581CD;
                    background:#95B4EB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    left: 50%;
                    top: 3vw;
                    transform: translateX(-50%);
                    font-size: 4vw;
                    font-weight: bold;
                    color: #fff;
                    font-family: 微软雅黑;
                }
            }
        }
    }




</style>

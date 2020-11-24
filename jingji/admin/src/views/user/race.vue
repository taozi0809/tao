<template>
    <div class="race">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="赛事总览" name="赛事总览">
                <div class="con">
                    <div class="l">
                        <div class="l1">
                            <div class="t">参加赛事总局数：</div>
                            <div class="v">{{all.matchtotal}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">胜局数：</div>
                            <div class="v">{{all.matchwins}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">败局数：</div>
                            <div class="v">{{all.matchfails}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">平均胜率：</div>
                            <div class="v">{{all.winrate}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">消耗总点券：</div>
                            <div class="v">{{all.coupon}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">赢得总奖金：</div>
                            <div class="v">{{all.awardmoney}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">个人总盈亏：</div>
                            <div class="v">{{all.personalprofit}}</div>
                        </div>
                    </div>
                    <div class="r">
                        <div class="title">赛事总览</div>
                        <div class="list-box">
                            <div class="list">
                                <el-card class="box-card card" v-for="item in list">
                                    <div class="r-t">{{item.matchtype}}</div>
                                    <div class="r1">
                                        <div class="t">参加赛事总局数：</div>
                                        <div class="v">{{item.matchtotal}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">胜局数：</div>
                                        <div class="v">{{item.matchwins}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">败局数：</div>
                                        <div class="v">{{item.matchfails}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">平均胜率：</div>
                                        <div class="v">{{item.winrate}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">消耗总点券：</div>
                                        <div class="v">{{item.coupon}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">赢得总奖金：</div>
                                        <div class="v">{{item.awardmoney}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">个人总盈亏：</div>
                                        <div class="v">{{item.personalprofit}}</div>
                                    </div>
                                </el-card>
                            </div>
                            <el-pagination
                                    @current-change="getMatchReview(parseInt($route.params.accountid))"
                                    :current-page.sync="page"
                                    :page-size="per"
                                    layout="total, prev, pager, next, jumper"
                                    :total="count">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="item" :name="item" v-for="item in matchTypes">
                <div class="con">
                    <div class="l">
                        <div class="l1">
                            <div class="t">参加赛事总局数：</div>
                            <div class="v">{{all.matchtotal}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">胜局数：</div>
                            <div class="v">{{all.matchwins}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">败局数：</div>
                            <div class="v">{{all.matchfails}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">平均胜率：</div>
                            <div class="v">{{all.winrate}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">消耗总点券：</div>
                            <div class="v">{{all.coupon}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">赢得总奖金：</div>
                            <div class="v">{{all.awardmoney}}</div>
                        </div>
                        <div class="l1">
                            <div class="t">个人总盈亏：</div>
                            <div class="v">{{all.personalprofit}}</div>
                        </div>
                    </div>
                    <div class="r">
                        <div class="title">{{item}}</div>
                        <div class="list-box">
                            <div class="list">
                                <el-card class="box-card card" v-for="item in list1">
                                    <div class="r-t">{{item.matchname}}</div>
                                    <div class="r1">
                                        <div class="t">参加赛事总局数：</div>
                                        <div class="v">{{item.matchtotal}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">胜局数：</div>
                                        <div class="v">{{item.matchwins}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">败局数：</div>
                                        <div class="v">{{item.matchfails}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">平均胜率：</div>
                                        <div class="v">{{item.winrate}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">消耗总点券：</div>
                                        <div class="v">{{item.coupon}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">赢得总奖金：</div>
                                        <div class="v">{{item.awardmoney}}</div>
                                    </div>
                                    <div class="r1">
                                        <div class="t">个人总盈亏：</div>
                                        <div class="v">{{item.personalprofit}}</div>
                                    </div>
                                </el-card>
                            </div>
                            <el-pagination
                                    @current-change="getMatchReviewByName()"
                                    :current-page.sync="page1"
                                    :page-size="per1"
                                    layout="total, prev, pager, next, jumper"
                                    :total="count1">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getMatchReview,getMatchReviewByName} from "../../service/api/api";

    export default {
        data() {
            return {
                activeName:'赛事总览',
                per:6,
                page:1,
                list:[],
                count:0,
                all:{},
                matchTypes:[],

                page1:1,
                per1:6,
                count1:0,
                list1:[],
            };
        },
        created() {
            this.getMatchReview(parseInt(this.$route.params.accountid))
        },
        methods: {
            handleClick() {
                if(this.activeName=="赛事总览"){
                    this.getMatchReview(parseInt(this.$route.params.accountid))
                }else{
                    this.getMatchReviewByName()
                }

            },
            getMatchReview(AccountID){
                getMatchReview(AccountID,this.page,this.per).then(res=>{
                    console.log("个人赛事",res)
                    if(res.code==0){
                        if(JSON.stringify(res.all) != "{}"){
                            res.all.winrate = (res.all.matchwins*100/res.all.matchtotal).toFixed(2)+'%'
                        }
                        for(let i in res.list){
                            res.list[i].winrate = (res.list[i].matchwins*100/res.list[i].matchtotal).toFixed(2)+'%'
                        }
                        this.list=res.list

                        this.all=res.all
                        this.matchTypes=res.matchTypes
                        this.count=res.total
                    }
                })
            },
            getMatchReviewByName(){
                getMatchReviewByName(parseInt(this.$route.params.accountid),this.activeName,this.page1,this.per1).then(res=>{
                    console.log(this.activeName,res)
                    if(res.code==0){
                        if(JSON.stringify(res.all) != "{}"){
                            res.all.winrate = (res.all.matchwins*100/res.all.matchtotal).toFixed(2)+'%'
                        }
                        for(let i in res.list){
                            res.list[i].winrate = (res.list[i].matchwins*100/res.list[i].matchtotal).toFixed(2)+'%'
                        }
                        this.list1=res.list
                        this.all=res.all
                        this.count1=res.total
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .race{
        box-sizing: border-box;
        padding:10px;
        width: 100%;
        .con{
            display: flex;
            height:700px;
            box-sizing: border-box;
            .l{
                border: 1px solid #DCDFE6;
                margin-top: 40px;
                box-sizing: border-box;
                padding-left: 20px;
                height:625px;
                .l1{
                    width: 300px;
                    flex-shrink: 0;
                    display: flex;
                    align-content: center;
                    overflow: hidden;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    .t{
                        flex-shrink: 0;
                        font-size: 14px;
                        color: #999;
                    }
                    .v{
                        font-size: 16px;
                        color: #333;
                    }
                }
            }
            .r{
                box-sizing: border-box;
                width: 100%;
                padding-left:20px;
                .title{
                    font-size: 16px;
                    color: #000;
                    font-weight: bold;
                    height:40px;
                    text-align: center;
                    line-height: 30px;
                }
                .list-box{
                    height:600px;
                    .list{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: left;
                        width: 100%;
                        min-width:820px;
                        height:600px;
                        .card{
                            min-width:250px;
                            width:30%;
                            margin-right: 20px;
                            height:280px;
                            .r-t{
                                font-size: 15px;
                                color: #000;
                                font-weight: bold;
                                height:40px;
                                text-align: center;
                            }
                            .r1{
                                width: 400px;
                                flex-shrink: 0;
                                display: flex;
                                align-content: center;
                                overflow: hidden;
                                height: 30px;
                                .t{
                                    flex-shrink: 0;
                                    font-size: 14px;
                                    color: #999;
                                }
                                .v{
                                    font-size: 16px;
                                    color: #333;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
</style>

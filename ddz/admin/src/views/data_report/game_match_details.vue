<template>
    <div class="game-details">
        <div class="top">
            <div class="l">
                <div class="title">游戏对局明细</div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" :span-method="objectSpanMethod">
                <el-table-column label="房间类型" width="180">
                    <template slot-scope="scope">{{GameType}}</template>
                </el-table-column>
                <el-table-column prop="createdat" label="开始时间" width="180">
                    <template slot-scope="scope">
                        {{StartTimestamp | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="updatedat" label="结束时间" width="180">
                    <template slot-scope="scope">
                        {{EndTimestamp | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="180"></el-table-column>
                <el-table-column prop="Pokers" label="玩家手牌">
                    <template slot-scope="scope">
                        <div class="pokers">
                            <div class="p-l">
                                <img :src="scope.row.Headimgurl" alt="" class="img">
                                <div class="zhuang" v-if="scope.row.Dealer"><img src="../../assets/images/gamematchDdetails/3.png" alt=""></div>
                            </div>
                            <div class="p-c">
                                <div class="nickname">{{scope.row.Nickname}}</div>
                                <div class="pp">
                                    <div class="Hands">
                                        <div class="item" v-for="(item,index) in scope.row.Hands" :key="index">
                                            <img :src="item" alt="">
                                        </div>
                                    </div>
                                    <div class="LastTile" v-if="scope.row.Dealer">
                                        <div class="item" v-for="(item,index) in LastThree">
                                            <img :src="item" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-r">
                                <div class="name">金额</div>
                                <div class="value">{{scope.row.Chips}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    import {pokersToSrc} from "../../util/tools/pokersToSrc";
    export default {
        data(){
            return{
                GameType:'',
                list:[],
                StartTimestamp:'',
                EndTimestamp:'',
                RoomNumber:'',
                LastThree:[],
            }
        },
        created() {
            console.log(JSON.parse(this.$route.query.data))
            this.GameType=JSON.parse(this.$route.query.data).Desc
            this.StartTimestamp=JSON.parse(this.$route.query.data).StartTimestamp
            this.EndTimestamp=JSON.parse(this.$route.query.data).EndTimestamp
            this.LastThree=JSON.parse(this.$route.query.data).LastThree

            let list = JSON.parse(this.$route.query.data).Results

            for(let i in list){
                list[i].Hands = pokersToSrc(list[i].Hands)
            }


            this.LastThree=pokersToSrc(this.LastThree)

            this.list = list
        },
        methods:{
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 3 === 0) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .game-details{
        box-sizing: border-box;
        padding: 20px;
        .top{
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .l{
                display: flex;
                align-items: center;
                .title{
                    color: #455A64;
                    font-size: 22px;
                    margin-right: 20px;
                }
            }
            .search-box{
                width: 300px;
                flex-shrink: 0;
            }
        }
        .list{
            .pokers{
                display: flex;
                align-items: center;
                height: 120px;
                width: 100%;
                padding-left: 10px;
                box-sizing: border-box;
                .p-l{
                    width: 80px;
                    height: 80px;
                    flex-shrink: 0;
                    border-radius: 5px;
                    position: relative;
                    margin-right: 10px;
                    .img{
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                    }
                    .zhuang{
                        position: absolute;
                        top: -15px;
                        left: -15px;
                        width: 40px;
                        z-index: 20;
                        img{
                            width: 100%;
                        }
                    }
                }
                .p-c{
                    width: 100%;
                    margin-right: 10px;
                    .nickname{
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                    }
                    .pp{
                        height: 70px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        /*border: 1px solid red;*/
                        .Claims{
                            display: flex;
                            align-items: center;
                            height: 70px;
                            box-sizing: border-box;
                            margin-right: 20px;
                            .item-box{
                                display: flex;
                                align-items: center;
                                position: relative;
                                .item{
                                    display: flex;
                                    align-items: center;
                                    width: 40px;
                                    height: 54px;
                                    img{
                                        width: 100%;
                                        transform: scale(1.15);
                                    }
                                }
                                .item:nth-child(4){
                                    position: absolute;
                                    top: -12px;
                                    left:40px;
                                    z-index: 2;
                                }
                            }

                        }
                        .Hands{
                            display: flex;
                            align-items: center;
                            height: 70px;
                            box-sizing: border-box;
                            margin-right: 20px;
                            .item{
                                width: 30px;
                                position: relative;
                                img{
                                    width: 100%;
                                }
                                .pi{
                                    position: absolute;
                                    z-index: 2;
                                    width: 25px;
                                    top: -6px;
                                    right: 3px;
                                    transform: rotate(90deg);
                                    img{
                                        width: 100%;
                                    }
                                }
                                .lai{
                                    position: absolute;
                                    z-index: 3;
                                    width: 15px;
                                    top: -3px;
                                    right: 0px;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                        }
                        .LastTile{
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            .item{
                                width: 30px;
                                img{
                                    width: 100%;
                                }
                            }
                            .win-type{
                                width: 60px;
                                position: relative;
                                right: 20px;
                                img{
                                    width: 50px;
                                }
                            }
                        }
                    }
                }
                .p-r{
                    width: 180px;
                    height: 100px;
                    flex-shrink: 0;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                    .name{
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                    }
                    .value{
                        height: 70px;
                        line-height: 70px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>

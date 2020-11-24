<template>
    <div class="game-details">
        <div class="top">
            <div class="l">
                <div class="title">游戏对局明细</div>
<!--                <div class="time">-->
<!--                    <Time @selectTime="onSelectTime"/>-->
<!--                </div>-->
            </div>
            <div class="search-box">
                <!--                <el-input placeholder="用户ID/手机号/昵称" v-model="condition" class="input-with-select" @input="playerCondition">-->
                <!--                    <el-button slot="append" icon="el-icon-search"></el-button>-->
                <!--                    <template slot="append">查找</template>-->
                <!--                </el-input>-->
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" :span-method="objectSpanMethod">
                <el-table-column  label="房间类型" width="180">
                    <template slot-scope="scope">
                        {{GameType}}
                    </template>
                </el-table-column>
                <el-table-column prop="NickName" label="参与用户" width="180"></el-table-column>
                <el-table-column prop="AccountId" label="用户ID" width="180"></el-table-column>
                <el-table-column prop="Pokers" label="玩家手牌" width="400">
                    <template slot-scope="scope">
                        <div class="pokers">
                            <div class="brand" v-for="(item,index) in scope.row.Pokers" :key="index">
<!--                                <img src="../../assets/images/brand/1.png" alt="">-->
                                <img :src="item" alt="">
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PokerType" label="玩家手牌类型"></el-table-column>
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
            }
        },
        created() {
            // console.log(JSON.parse(this.$route.query.data))
            let list = JSON.parse(this.$route.query.data).Details
            for(let i in list){
                list[i].Pokers = pokersToSrc(list[i].Pokers)
            }
            this.list = list
            console.log(this.list)
            this.GameType=JSON.parse(this.$route.query.data).GameType
        },
        methods:{
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 10 === 0) {
                        return {
                            rowspan: 4,
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
                .brand{
                    width: 42px;
                    margin-right: 6px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
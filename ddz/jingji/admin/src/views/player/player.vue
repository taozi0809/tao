<template>
    <div class="proxy">
        <div class="header">
            <div class="l">
                <div class="l1"><el-input placeholder="选手ID" prefix-icon="el-icon-search" v-model="AccountID" @input="getDownPlayers()"></el-input></div>
                <div class="l1"><el-input placeholder="选手姓名" prefix-icon="el-icon-search" v-model="Name" @input="getDownPlayers()"></el-input></div>
                <div class="l1"><el-input placeholder="联系方式" prefix-icon="el-icon-search" v-model="Phone" maxLength='11' @input="getDownPlayers()"></el-input></div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="RecommendID" label="推荐人ID" width="120"></el-table-column>
                <el-table-column prop="AccountID" label="选手ID" width="120"></el-table-column>
                <el-table-column prop="Name" label="选手昵称" width="120"></el-table-column>
                <el-table-column prop="Phone" label="联系方式" width="120"></el-table-column>
                <el-table-column prop="ChargeAmount" label="充值额度" width="120">
                    <template slot-scope="scope">
                        {{scope.row.ChargeAmount>=0?scope.row.ChargeAmount/100:scope.row.ChargeAmount}}元
                    </template>
                </el-table-column>
                <el-table-column label="已提现总额" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Cashed>=0?scope.row.Cashed/100:scope.row.Cashed}}元
                    </template>
                </el-table-column>
                <el-table-column label="可提现金额" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Cash>=0?scope.row.Cash/100:scope.row.Cash}}元
                    </template>
                </el-table-column>
                <el-table-column prop="MatchCount" label="参赛次数" width="120"></el-table-column>
                <el-table-column label="注册时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.CreateTIme | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="DownPlayerCount" label="分享人数"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="cc(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getDownPlayers"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="选手详情"
                    :visible.sync="isDialogPlayer"
                    width="600px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l">
                            <div class="t">游戏ID：</div>
                            <div class="v">{{player.AccountID}}</div>
                        </div>
                        <div class="r">
                            <div class="t">游戏昵称：</div>
                            <div class="v">{{player.Name}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">充值额度：</div>
                            <div class="v">{{player.ChargeAmount>=0?player.ChargeAmount/100:player.ChargeAmount}}元</div>
                        </div>
                        <div class="r">
                            <div class="t">绑定手机：</div>
                            <div class="v">{{player.Phone}}</div>
                        </div>
                    </div>
                    <div class="item3">
                        <div class="l">
                            <div class="t">注册时间：</div>
                            <div class="v">{{player.CreateTIme | timestampToTime1}}</div>
                        </div>
                    </div>
                </div>
                <div class="f">
                    <el-button type="primary" @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleClose">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getDownPlayers} from "../../service/api/api";




    export default {
        data(){
            return{
                AccountID:null,
                Name:"",
                Phone:"",

                list:[],
                count:0,
                loading:false,
                page:1,
                per:10,

                isDialogPlayer:false,
                status:2,
                isPass:false,
                pass:"13556413659",
                player:{}

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.getDownPlayers()
        },
        methods:{
            handleClose(){
                this.isDialogPlayer=false
            },
            cc(i){
                this.player=i
                this.isDialogPlayer=true
            },
            getDownPlayers(){
                this.loading=true
                getDownPlayers(parseInt(this.AccountID),this.Name,this.Phone,this.page,this.per).then(res=>{
                    console.log("分享选手列表",res)
                    this.loading=false
                    if(res.code==0){
                        this.list=res.players
                        this.count=res.total
                    }
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .l{
            display: flex;
            align-items: center;
            .l1{
                width: 250px;
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 20px;
    }
    .dialog-box{
        .dialog-con{
            .item{
                width: 100%;
                display: flex;
                align-items: center;
                height: 60px;
                .l,.r{
                    display: flex;
                    align-items: center;
                    width: 300px;
                    .t{
                        flex-shrink: 0;
                    }
                    .v{
                        flex-shrink: 0;
                        width: 150px;
                    }
                }
            }
            .item2{
                .l,.r{
                    display: flex;
                    align-items: center;
                    height: 40px;
                }
            }
            .item3{
                .l{
                    display: flex;
                    align-items: center;
                    height: 40px;
                }
            }
        }
        .f{
            margin-top:50px;
            display: flex;
            align-items: center;
            justify-content:space-around;
        }
    }
</style>

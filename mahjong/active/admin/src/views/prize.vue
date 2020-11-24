<template>
    <div class="prize">
        <div class="row head">
            <div class="l">
                <el-date-picker
                        v-model="time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="change">
                </el-date-picker>
            </div>
            <div class="search-box">
                <div class="search-box-1">
                    <el-select v-model="awards" placeholder="请选择" @change="changeAwards">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="search-box-2">
                    <el-input placeholder="用户ID/昵称" v-model="condition" class="input-with-select" @input="change">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        <template slot="append">查找</template>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="row update">
            <div class="item">
                <div class="label">用户账号</div>
                <el-input placeholder="请输入用户账号" v-model="accountid"></el-input>
            </div>
            <div class="item">
                <div class="label">兑换码</div>
                <el-input placeholder="请输入兑换码" v-model="code"></el-input>
            </div>
            <el-button type="primary" style="height: 40px;" @click="prizeUpdate(accountid,code)">确认</el-button>
        </div>
        <div class="row">
            <el-table :data="gamerecord" style="width: 100%" border height="650" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column label="用户头像" width="80">
                    <template slot-scope="scope">
                        <div class="head-img">
                            <img :src="scope.row.Headimgurl" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="AccountID" label="用户账号" width="100"></el-table-column>
                <el-table-column prop="Nickname" label="用户昵称" width="180"></el-table-column>
                <el-table-column label="兑奖类型" width="100">
                    <template slot-scope="scope">
                        {{scope.row.Kind | king2Name}}
                    </template>
                </el-table-column>
                <el-table-column prop="PrizeCode" label="兑奖码" width="120"></el-table-column>
                <el-table-column label="是否兑奖" width="60">
                    <template slot-scope="scope">
                        {{scope.row.Use?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="兑奖牌">
                    <template slot-scope="scope">
                        {{scope.row.Cards | cards2name}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="prizeList(time[0],time[1],page,per,isCondition(awards)?awards:condition)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {prizeList,prizeUpdate} from "../service/api/api";
    import {Message} from 'element-ui'

    export default {
        data(){
            return{
                time:['2020-1-1',this.getToday()],
                page:1,
                per:10,
                condition:'',
                gamerecord:[],
                loading:false,
                count:0,
                awards:'0',
                accountid:'',
                code:'',
                options:[{
                    value: '0',
                    label: '全部'
                },{
                    value: 'LastPrize',
                    label: '参与奖'
                },
                    {
                        value: 'ThirdPrize',
                        label: '三等奖'
                    },
                    {
                        value: 'SecondPrize',
                        label: '二等奖'
                    },
                    {
                        value: 'FirstPrize',
                        label: '一等奖'
                    },
                    {
                        value: 'TopPrize',
                        label: '特等奖'
                    },],
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        mounted(){
            this.prizeList(this.time[0],this.time[1],this.page,this.per,this.condition)
        },
        methods:{
            getToday(){
                var nowDate = new Date();
                var year = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
                    : nowDate.getMonth() + 1;
                var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
                    .getDate();
                var dateStr = year + "-" + month + "-" + day;
                return dateStr
            },
            change(){
                this.awards='0'
                this.prizeList(this.time[0],this.time[1],this.page,this.per,this.condition)
            },
            changeAwards(){
                if(this.awards=='0'){
                    this.prizeList(this.time[0],this.time[1],this.page,this.per,this.condition)
                }else{
                    this.prizeList(this.time[0],this.time[1],this.page,this.per,this.awards)
                }

            },
            prizeList(start,end,page,per,condition){
                this.loading=true
                prizeList(start,end,page,per,condition).then(res=>{
                    console.log('获取礼物列表',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.gamerecord=res.data.gamerecord
                        this.count=res.data.count
                    }
                })
            },
            prizeUpdate(accountid,code){
                if(!!accountid&&!!code){
                    prizeUpdate(accountid,code).then(res=>{
                        console.log('兑奖',res)
                        if(res.errcode==2000){
                            this.accountid=""
                            this.code=""
                            this.prizeList(this.time[0],this.time[1],this.page,this.per,this.condition)
                            Message.success('兑奖成功')
                        }else{
                            Message.error(res.errmsg)
                        }
                    })
                }
            },
            isCondition(condition){
                if(condition=='LastPrize'||condition=='ThirdPrize'||condition=='SecondPrize'||condition=='FirstPrize'||condition=='TopPrize'){
                  return true
                }else{
                   return  false
                }
            },


        },
    }
</script>

<style lang="scss" scoped>
    .prize{
        box-sizing: border-box;
        padding: 10px;
        .row{
            width: 100%;
            margin-bottom: 20px;

        }
        .head{
            display: flex;
            align-content: center;
            justify-content: space-between;

            .search-box{
                display: flex;
                .search-box-1{
                    margin-right: 20px;
                }
            }
        }
        .update{
            display: flex;
            align-items: flex-end;
            .item{
                width: 200px;
                margin-right: 40px;
                .label{
                    margin-bottom: 10px;
                }
            }
        }
        .head-img{
            width: 50px;
            height: 50px;
            overflow: hidden;
            margin: 0 auto;
            img{
                width: 100%;
            }
        }
    }
</style>

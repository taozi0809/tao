<template>
    <div class="userList">
        <div class="top">
            <div class="title">用户列表</div>
            <div class="search-box">
                <el-input placeholder="用户ID/昵称" v-model="condition" class="input-with-select" @input="playerCondition">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    <template slot="append">查找</template>
                </el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column label="头像地址" width="60">
                    <template slot-scope="scope">
                        <div class="head-img"><img :src="scope.row.headimgurl" alt=""></div>
                    </template>
                </el-table-column>

                <el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
                <el-table-column prop="accountid" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="chips" label="金币余额" width="100"></el-table-column>
<!--                <el-table-column prop="roomcards" label="房卡" width="100"></el-table-column>-->
<!--                <el-table-column prop="diamonds" label="钻石数量" width="100"></el-table-column>-->

                <el-table-column label="账户状态" width="60">
                    <template slot-scope="scope">
                        {{scope.row.role==-1?'禁用':'正常'}}
                    </template>
                </el-table-column>
<!--                <el-table-column label="账户级别" width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                        {{scope.row.role | roleToName}}-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="createdat" label="注册时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.createdat | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="updatedat" label="最后一次登录时间">
                    <template slot-scope="scope">
                        {{scope.row.updatedat | timestampToTime1}}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="playerRole(scope.row)" v-if="scope.row.role!=-2">{{scope.row.role==-1?'解禁':'禁用'}}</el-button>
                        <el-button type="text" size="small" @click="userDetails(scope.row)" v-if="scope.row.role!=-2">查看详情</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    @current-change="playerList"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {playerCondition,playerList,playerRole} from "../../service/api/api";
    import {Message} from 'element-ui'

    export default {
        data(){
            return{
                condition:'',
                per:10,
                page:1,
                list:[],
                count:0,
                loading:true,
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            this.playerList()
        },
        methods:{
            playerList(){
                this.loading=true
                playerList(this.page,this.per).then(res=>{
                    console.log('用户列表',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.players
                        this.count=res.data.count
                    }
                })
            },
            playerCondition(){
                if(!!this.condition){
                    playerCondition(this.condition).then(res=>{
                        console.log('搜索',res)
                        if(res.errcode==2000){
                            this.list=[]
                            this.list.push(res.data)
                            this.count=1
                        }else{
                            this.list=[]
                            this.count=0
                            // Message.error(res.errmsg)
                        }
                    })
                }else{
                    this.playerList()
                }

            },
            playerRole(row){
                playerRole(row.accountid,'',row.role==-1?'1':'-1').then(res=>{
                    console.log('解禁/禁言',res)
                    if(res.errcode==2000){
                        this.playerList()
                        Message.success('操作成功')
                    }else{
                        Message.error(res.errmsg)
                    }
                })
            },
            userDetails(row){
                this.$router.push({path:'/user_details',query:{accountid:row.accountid}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userList{
        box-sizing: border-box;
        padding: 20px;
        .top{
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .title{
                color: #455A64;
                font-size: 22px;
            }
            .search-box{
                width: 300px;
                flex-shrink: 0;
            }
        }
        .list{
            .head-img{
                width: 40px;
                height: 40px;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>

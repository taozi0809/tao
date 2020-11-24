<template>
    <div class="user">
        <div class="top">
            <div class="l">
                <div class="t">用户管理</div>
                <div class="item">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="change">
                    </el-date-picker>
                </div>
            </div>
            <div class="r">
                <el-input placeholder="用户昵称" prefix-icon="el-icon-search" v-model="searchTxt" @input="search"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" border style="width: 100%" height="700" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>

                <el-table-column property="userId" label="用户ID" width="100"></el-table-column>
                <el-table-column property="nickName" label="用户昵称" width="150"></el-table-column>
                <el-table-column property="phoneNumber" label="注册手机号" width="150"></el-table-column>
                <!--<el-table-column property="" label="用户身份" width="120"></el-table-column>-->
                <!--<el-table-column property="agent" label="直属代理" width="150"></el-table-column>-->
                <el-table-column label="注册时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.registTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="最近登录时间" >
                    <template slot-scope="scope">
                        {{scope.row.lastLoginTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <!--<el-table-column property="promote" label="推广人数" width="80"></el-table-column>-->
                <!--<el-table-column property="consumption" label="消费记录"></el-table-column>-->
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="billflow(scope.row.userId)">查看流水</el-button>
                        <!--<el-button type="primary" size="small" @click="billflow" v-if="scope.row.id==11139401">查看流水</el-button>-->
                        <!--<div v-if="scope.row.id!=11139401">无流水</div>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="pageChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="countNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {userList} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                time:[this.getToday(),this.getToday()],
                list:[],
                page:1,
                pageSize:10,
                loading:false,
                countNum:0,
                searchTxt:'',
            }
        },
        computed:{
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
            ...mapState(['token']),
        },
        created:function(){
            this.userList(this.page)
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

            },
            search(){},
            pageChange(){
                this.userList(this.page)
            },
            billflow(userId){
                this.$router.push({path:'/a_billflow_user',query: {
                        userId:userId
                    }});
            },
            userList(page){
                userList(this.token,page,this.pageSize).then(res=>{
                    console.log('代理用户列表',res)
                    if(res.code==0){
                        this.list=res.data.agencyUsers
                        this.countNum=res.data.total
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .user{
        width: 100%;
        box-sizing: border-box;
        padding:20px 20px;
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 20px;
            .l{
                display: flex;
                align-items: center;
                .item{
                    margin-right: 20px;
                    width: 150px;
                }
                .t{
                    margin-right: 20px;
                    color: #455A64;
                    font-size: 21px;
                }
            }
        }
    }
</style>
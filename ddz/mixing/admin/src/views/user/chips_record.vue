<template>
    <div class="userList">
        <div class="top">
            <div class="l">
                <div class="title">金币明细</div>
                <div class="time">
                    <Time @selectTime="onSelectTime"/>
                </div>
            </div>
            <div class="search-box">
                <el-select v-model="condition" placeholder="请选择" @change="change">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50" label="序号"></el-table-column>

                <el-table-column label="操作时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.created_at | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="nick_name" label="用户昵称" width="140"></el-table-column>
                <el-table-column prop="account_id" label="用户ID" width="100"></el-table-column>
                <el-table-column label="操作原因" width="100">
                    <template slot-scope="scope">
                        {{scope.row.action_type==1?'充值明细':scope.row.action_type==2?'破产补助':'每日签到'}}
                    </template>
                </el-table-column>
                <el-table-column prop="add_chips" label="操作金币数" width="100"></el-table-column>
                <el-table-column prop="chips" label="操作后金币数" ></el-table-column>

            </el-table>
            <el-pagination
                    @current-change="chipsRecord(time[0],time[1],condition)"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {chipsRecord} from "../../service/api/api";
    import {Message} from 'element-ui'
    import Time from '../../components/time/Time'


    export default {
        components:{Time},
        data(){
            return{
                condition:'',
                per:10,
                page:1,
                list:[],
                count:0,
                time:'',
                loading:true,
                options:[
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value:1,
                        label:'充值明细'
                    },
                    {
                        value:2,
                        label:'破产补助'
                    },
                    {
                        value:3,
                        label:'每日签到'
                    },
                ],
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        mounted(){

        },
        methods:{
            onSelectTime(time){
                this.time=time
                this.chipsRecord(time[0],time[1],this.condition)
            },
            chipsRecord(start,end,condition){
                this.loading=true
                chipsRecord(start,end,this.page,this.per,condition).then(res=>{
                    console.log('金币明细',res)
                    this.loading=false
                    if(res.errcode==2000){
                        this.list=res.data.chips_records
                        this.count=res.data.count
                    }
                })
            },
            change(){
                this.chipsRecord(this.time[0],this.time[1],this.condition)
            },
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

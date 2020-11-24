<template>
    <div class="index" ref="refName">
        <div class="top">
            <div class="l">
                <div class="t">所有代理</div>
                <div class="item">
                    <el-select v-model="type" placeholder="请选择" @change="changeType">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <!--<el-button type="primary">添加代理</el-button>-->
                    <el-popover placement="right" width="300" trigger="click">
                        <div class="add-agent">
                           <div class="t">添加代理</div>
                            <div class="search">
                                <el-input placeholder="请输入用户手机号" prefix-icon="el-icon-search" v-model="searchTxt2">
                                    <el-button slot="append" @click="search2">搜索</el-button>
                                </el-input>
                            </div>
                            <div class="user-info" v-if="loading2">
                                <div class="user-row">
                                    <div class="name">昵称</div>
                                    <div class="value">{{userInfo.nickName}}</div>
                                </div>
                                <div class="user-row">
                                    <div class="name">注册时间</div>
                                    <div class="value">{{userInfo.createTime | timestampToTime1}}</div>
                                </div>
                                <div class="user-row">
                                    <div class="name">返利比例</div>
                                    <div class="rebate">
                                        <el-select v-model="rebate" placeholder="请选择" @change="changeType" size="mini" style="width: 100px;margin-right: 10px;">
                                            <el-option
                                                    v-for="item in rebateOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-input placeholder="请输入" v-model="rebatePercent" min="0" max="100" size="mini" style="width: 80px;" @input="changeRebate"></el-input>
                                        <div class="percent">%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="user-info" v-if="loading3" style="color: #f56c6c;">
                                {{message}}
                            </div>

                            <div class="row">
                                <el-button type="primary" :disabled="isDisabled" @click="addAgentConfig">确认</el-button>
                                <el-button @click="cancel">取消</el-button>
                            </div>
                        </div>
                        <el-button  type="primary" slot="reference">添加代理</el-button>
                    </el-popover>
                </div>

            </div>
            <div class="r">
                <el-input placeholder="用户ID/手机号/昵称" prefix-icon="el-icon-search" v-model="searchTxt" @input="search"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" border style="width: 100%" height="700" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
                <el-table-column type="index" :index="getIndex" width="50"></el-table-column>

                <el-table-column property="agencyId" label="代理ID" width="100"></el-table-column>
                <el-table-column property="phoneNumber" label="注册手机号" width="150"></el-table-column>
                <el-table-column label="创建时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.registTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="最近登录时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.lastLoginTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column property="rebatePercent" label="返利比例(%)" width="100"></el-table-column>
                <el-table-column property="remark" label="备注" width="200"></el-table-column>
                <el-table-column label="账号状态">
                    <template slot-scope="scope">
                        <div :class="scope.row.status==1?'':'z-red'">{{scope.row.status==1?'正常':'封禁'}}</div>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="350" trigger="click">
                            <div class="show-content">
                                <div class="t">查看</div>
                                <div class="row">
                                    <div class="name">昵称</div>
                                    <div class="value">{{scope.row.nickName}}</div>
                                </div>
                                <div class="row">
                                    <div class="name">代理ID</div>
                                    <div class="value">{{scope.row.agencyId}}</div>
                                </div>
                                <div class="row">
                                    <div class="name">注册手机号</div>
                                    <div class="value">{{scope.row.phoneNumber}}</div>
                                </div>
                                <div class="row">
                                    <div class="name">注册时间</div>
                                    <div class="value">{{scope.row.registTime | timestampToTime1}}</div>
                                </div>
                                <div class="row">
                                    <div class="name">最近登录时间</div>
                                    <div class="value">{{scope.row.lastLoginTime | timestampToTime1}}</div>
                                </div>
                                <div class="row">
                                    <div class="name">返利比例</div>
                                    <!--<div class="value" contenteditable="true">{{scope.row.rebate}}</div>-->

                                    <div class="rebate">
                                        <el-select v-model="rebate" placeholder="请选择" @change="changeType" size="mini" style="width: 100px;margin-right: 10px;">
                                            <el-option
                                                    v-for="item in rebateOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-input placeholder="请输入" v-model="scope.row.rebatePercent" min="0" max="100" size="mini" style="width: 80px;" @input="changeRebate"></el-input>
                                        <div class="percent">%</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="name">备注</div>
                                    <VEditDiv v-model='scope.row.remark' class="note"/>
                               </div>
                                <div class="row">
                                    <div class="name">账号状态</div>
                                    <div class="value">
                                        <el-select v-model="scope.row.status" placeholder="请选择" @change="changeType" size="mini">
                                            <el-option
                                                    v-for="item in typeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="btn">
                                    <el-button type="primary" size="small" @click="confirm(scope.row.agencyId,scope.row.rebatePercent,scope.row.remark)">确定</el-button>
                                    <el-button type="danger" size="small" @click="del">删除</el-button>
                                    <el-button size="small" @click="cancel">取消</el-button>
                                </div>
                            </div>
                            <el-button  type="primary" size="small"  slot="reference">查看</el-button>
                        </el-popover>

                        <el-button type="primary" size="small" @click="billflow(scope.row.agencyId)" class="b-btn">查看流水</el-button>
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
    import {phoneNumber,createAgency,agencyList,updateAgency} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'
    import { Message,Loading } from 'element-ui';
    import VEditDiv from '../../components/other/VEditDiv'

    export default {
        components:{VEditDiv},
        data(){
            return{
                typeOptions:[
                    {
                        value:0,
                        label:'封禁'
                    },
                    {
                        value:1,
                        label:'正常'
                    }
                ],
                type:1,
                rebateOptions:[
                    {
                        value:0,
                        label:'盘口返利'
                    }
                ],
                rebate:0,
                page:1,
                pageSize:10,
                loading:false,
                countNum:0,
                list:[],
                // dialogVisible:false,
                searchTxt:'',
                searchTxt2:'',
                isDisabled:true,
                loading2:false,
                loading3:false,
                message:'',
                userInfo:{},
                rebatePercent:'',
            }
        },
        computed:{
            getIndex(){
                return (this.page - 1) * this.pageSize +1
            },
            ...mapState(['token']),
        },
        created:function(){
            this.agencyList(this.page)
        },
        methods:{
            changeType(){},
            billflow(agencyId){
                this.$router.push({path:'/a_billflow',query: {agencyId:agencyId}});
            },
            confirm(agencyId,rebatePercent,remark){
                this.$confirm('确认保存修改？').then(_ => {
                    console.log(this.token,agencyId,rebatePercent,remark)
                    updateAgency(this.token,agencyId,rebatePercent,remark).then(res=>{
                        console.log('修改代理',res)
                        if(res.code==0){
                            Message.success('修改成功')
                        }else{
                            Message.error(res.message)
                        }
                    })
                }).catch(_ => {});
            },
            del(){
                this.$confirm('确认删除该代理？该代理的所有信息将不会保存').then(_ => {

                }).catch(_ => {});
            },
            cancel(){
                this.searchTxt2=''
                this.loading2=false
                this.loading3=false
                this.$refs.refName.click();
            },
            search(){},
            search2(){
                if(!!this.searchTxt2){
                    phoneNumber(this.searchTxt2).then(res=>{
                        console.log('通过手机号搜索',res)
                        if(res.code==0){
                            this.loading3=false
                            this.loading2=true
                            this.userInfo=res.data
                            // this.isDisabled=false
                        }else{
                            this.loading2=false
                            this.loading3=true
                            this.isDisabled=true
                            this.message=res.message
                        }
                    })
                }
            },
            addAgentConfig(){
                this.$confirm('确定添加新的代理').then(_ => {
                    createAgency(this.token,this.userInfo.idCode,this.rebatePercent).then(res=>{
                        console.log('添加代理',res)
                        if(res.code==0){
                            Message.success('添加成功')
                            this.searchTxt2=''
                            this.loading2=false
                            this.loading3=false
                        }else{
                            Message.error(res.message)
                        }
                    })
                }).catch(_ => {
                    this.searchTxt2=''
                    this.loading2=false
                    this.loading3=false
                });
            },
            changeRebate(){
               if(this.rebatePercent>=0&&this.rebatePercent<=100){
                   this.isDisabled=false
               }else{
                   this.isDisabled=true
               }
            },

            agencyList(page){
                agencyList(this.token,page,this.pageSize).then(res=>{
                    console.log('代理列表',res)
                    if(res.code==0){
                        this.list=res.data.agencys
                        this.countNum=res.data.total
                    }

                })
            },
            pageChange(){
                this.agencyList(this.page)
            },

        }
    }
</script>

<style lang="scss" scoped>
    .index{
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
        .b-btn{
            margin-left: 20px;
        }
    }
</style>

<style lang="scss">
    .show-content{
        width: 100%;
        box-sizing: border-box;
        .t{
            color: #455A64;
            font-size: 21px;
        }
        .row{
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;
            .name{
                width: 120px;
                box-sizing: border-box;
                margin-right: 15px;
                text-align: right;
            }
            .value{
                font-weight: bold;
                border: none;
            }
            .note{
                width:190px;
                font-weight: bold;
                border: none;
            }
            [contenteditable]:focus{outline: none;}
            .rebate{
                display: flex;
                align-items: center;
                position: relative;
                .percent{
                    position: absolute;
                    top: 0;
                    right: 8px;
                }
            }
        }
        .btn{
            margin-top: 40px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
    .add-agent{
        width: 100%;
        height: 300px;
        box-sizing: border-box;
        position: relative;
        .t{
            color: #455A64;
            font-size: 21px;
        }
        .search{
            margin-top: 20px;
        }
        .user-info{
            width: 100%;
            height: 100px;
            /*border: 1px solid red;*/
            margin-top: 20px;
            .user-row{
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                .name{
                    width:60px;
                    box-sizing: border-box;
                    margin-right: 15px;
                    text-align: right;
                }
                .value{
                    font-weight: bold;
                }
                .rebate{
                    display: flex;
                    align-items: center;
                    position: relative;
                    .percent{
                        position: absolute;
                        top: 0;
                        right: 8px;
                    }
                }
            }
        }
        .row{
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: absolute;
            bottom: 20px;
            width: 100%;
        }
    }
</style>
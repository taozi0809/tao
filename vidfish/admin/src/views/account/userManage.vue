<template>
    <div class="account">
        <Breadcrumb :breadcrumb="breadcrumb"/>
        <div class="head">
            <div class="row">
                <div class="col">
                    <el-input v-model="inputUserName" placeholder="请输入用户名搜索" clearable @input="handleUserName">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
                <div class="col">
                    <el-input v-model="inputEmail" placeholder="请输入邮箱搜索" clearable @input="handleEmail">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
                <div class="col">
                    <el-input v-model="inputPhoneNumber" placeholder="请输入电话号码搜索" clearable @input="handlePhoneNumber">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
                <div class="col date">
                    <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期" value-format="timestamp" :picker-options="pickerOptions2" @blur="handleChange"></el-date-picker>
                    <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出</el-button>
                </div>
            </div>
        </div>
        <div class="form-box">
            <el-table :data="userList" ref="userList" style="width: 100%" height="650" @filter-change="handleFilterChange" id="rebateSetTableUser">
                <el-table-column type="index" :index="getIndex" width="100"></el-table-column>
                <!--<el-table-column label="头像" width="60">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span class="head-img"><img :src="scope.row.photoUrl" alt=""></span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="userName" label="用户名" min-width="200"></el-table-column>
                <el-table-column label="性别" min-width="50">
                    <template slot-scope="scope">
                        <p>{{scope.row.gender | gender}}</p>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="phoneNumber" label="电话号码" min-width="150"></el-table-column>-->
                <el-table-column prop="email" label="邮箱" min-width="250"></el-table-column>
                <el-table-column label="生日" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.birthday | timestampToTime1}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="地区" min-width="150"></el-table-column>
                <!--<el-table-column label="是否vip" width="100" prop="isVip" column-key="isVip" :filters="[{text:'是',value:'0'},{text:'否',value:'1'}]">-->
                    <!--<template slot-scope="scope">-->
                        <!--<p>{{scope.row.isVip | isFilter}}</p>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="过期日期" min-width="160">
                    <template slot-scope="scope">
                        <!--<div>{{scope.row.deadline | timestampToTime1}}</div>-->
                        <div class="dead-line" v-if="!!scope.row.deadline">
                            <el-date-picker
                                    v-model="scope.row.deadline"
                                    type="date"
                                    @change="deadlineChange(scope.row)"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="是否黑名单" width="130" prop="isBlack" column-key="isBlack" :filters="[{text:'是',value:'0'},{text:'否',value:'1'}]">
                    <template slot-scope="scope">
                        <p>{{scope.row.isBlack | isFilter}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="注册日期" min-width="140">
                    <template slot-scope="scope">
                        <p>{{scope.row.createTime | timestampToTime}}</p>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button  @click.native.prevent="userDetails(scope.row)" type="primary" size="small">详情</el-button>
                        <el-button  @click.native.prevent="handleGiftMC(scope.row.id)" type="primary" size="small">赠送月卡</el-button>
                        <el-button  @click.native.prevent="handleGiftYC(scope.row.id)" type="primary" size="small">赠送年卡</el-button>
                        <!--<el-button v-if="scope.row.isBlack=='0'" @click.native.prevent="handleEnable(scope.row.id)" type="success" size="small">取消拉黑</el-button>-->
                        <!--<el-button v-if="scope.row.isBlack=='1'" @click.native.prevent="handleDisable(scope.row.id)" type="danger" size="small">拉黑</el-button>-->

                        <el-button @click.native.prevent="handleUserVipDelete(scope.row.id)" type="danger" size="small" disabled v-if="scope.row.deadline<(new Date()).getTime()">取消VIP</el-button>
                        <el-button @click.native.prevent="handleUserVipDelete(scope.row.id)" type="danger" size="small" v-if="scope.row.deadline>=(new Date()).getTime()">取消VIP</el-button>
                        <el-button @click.native.prevent="handleUserDelete(scope.row.id)" type="danger" size="small">删除用户</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination  background layout="total, prev, pager, next, jumper" :total="countNum" :page-size="pageSize"
                            :current-page.sync="currentPage" @current-change="handleChangePage"></el-pagination>
        </div>
    </div>
</template>

<script>

    import Breadcrumb from '../../components/Breadcrumb'
    import { Message,MessageBox,Loading} from 'element-ui';

    import {appUserList,appUserDisable,appUserEnable,appUserGift,userDelete,userVipDelete,
    editVipExpired} from "../../service/api";
    import {exportUserInfo} from "../../service/api";

    export default {
        components:{Breadcrumb},
        data(){
            return{
                breadcrumb:[
                    {
                        path:'/index',
                        name:'首页'
                    },
                    {
                        path:'/userManage',
                        name:'用户管理'
                    },
                ],
                userList:[],
                inputUserName:'',
                inputEmail:'',
                inputPhoneNumber:'',
                currentPage:1,
                countNum:0,
                userList1:[],
                pageSize:50,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7:[],
                startDate:'',
                endDate:'',
            }
        },
        computed:{
            getIndex(){
                return (this.currentPage - 1) * this.pageSize +1
            },
        },
        created:function(){
            this.getUserList()
        },

        methods:{
            getUserList(isBlack,isVip,userName,email,phoneNumber){
                appUserList(isBlack,isVip,userName,email,phoneNumber,this.currentPage,this.pageSize).then(res=>{
                    console.log('用户列表',res)
                    if(res.code==='0'){
                        this.countNum = res.data.countNum
                        this.userList = res.data.userCtoModelList
                        this.userList1 = res.data.userCtoModelList

                    }
                })
            },
            handleGiftMC(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    appUserGift(e,'0').then(res=>{
                        console.log('赠送月卡',res)
                        if(res.code==='0'){
                            Message({
                                message:'赠送成功',
                                type: 'success',
                                duration:'1500',
                            })
                            if(!!this.inputUserName){
                                this.getUserList(null,null,this.inputUserName,null,null)
                            }else if(!!this.inputEmail){
                                this.getUserList(null,null,null,this.inputEmail,null)
                            }else if(!!this.inputPhoneNumber){
                                this.getUserList(null,null,null,null,this.inputPhoneNumber)
                            }else{
                                this.getUserList(null,null,null,null,null)
                            }
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleGiftYC(e){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    appUserGift(e,'1').then(res=>{
                        console.log('赠送年卡',res)
                        if(res.code==='0'){
                            Message({
                                message:'赠送成功',
                                type: 'success',
                                duration:'1500',
                            })
                            if(!!this.inputUserName){
                                this.getUserList(null,null,this.inputUserName,null,null)
                            }else if(!!this.inputEmail){
                                this.getUserList(null,null,null,this.inputEmail,null)
                            }else if(!!this.inputPhoneNumber){
                                this.getUserList(null,null,null,null,this.inputPhoneNumber)
                            }else{
                                this.getUserList(null,null,null,null,null)
                            }
                        }else{
                            Message({
                                message:res.message,
                                type: 'error',
                                duration:'1500',
                            })
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            handleDisable(e){
               appUserDisable(e).then(res=>{
                   console.log('拉黑',res)
                   if(res.code==='0'){
                       Message({
                           message:'操作成功',
                           type: 'success',
                           duration:'1500',
                       })
                       if(!!this.inputUserName){
                           this.getUserList(null,null,this.inputUserName,null,null)
                       }else if(!!this.inputEmail){
                           this.getUserList(null,null,null,this.inputEmail,null)
                       }else if(!!this.inputPhoneNumber){
                           this.getUserList(null,null,null,null,this.inputPhoneNumber)
                       }else{
                           this.getUserList(null,null,null,null,null)
                       }
                   }else{
                       Message({
                           message:res.message,
                           type: 'error',
                           duration:'1500',
                       })
                   }
               })
            },
            handleEnable(e){
                appUserEnable(e).then(res=>{
                    console.log('取消拉黑',res)
                    if(res.code==='0'){
                        Message({
                            message:'操作成功',
                            type: 'success',
                            duration:'1500',
                        })
                        if(!!this.inputUserName){
                            this.getUserList(null,null,this.inputUserName,null,null)
                        }else if(!!this.inputEmail){
                            this.getUserList(null,null,null,this.inputEmail,null)
                        }else if(!!this.inputPhoneNumber){
                            this.getUserList(null,null,null,null,this.inputPhoneNumber)
                        }else{
                            this.getUserList(null,null,null,null,null)
                        }
                    }else{
                        Message({
                            message:res.message,
                            type: 'error',
                            duration:'1500',
                        })
                    }
                })
            },
            handleUserName(){
                this.inputEmail = ''
                this.inputPhoneNumber = ''
                if(this.inputUserName==''||this.inputUserName==undefined||this.inputUserName==undefined){this.inputUserName=null}

                this.getUserList(null,null,this.inputUserName,null,null)
            },
            handleEmail(){
                this.inputUserName = ''
                this.inputPhoneNumber = ''
                this.getUserList(null,null,null,this.inputEmail,null)
            },
            handlePhoneNumber(){
                this.inputUserName = ''
                this.inputEmail = ''
                this.getUserList(null,null,null,null,this.inputPhoneNumber)

            },
            handleChangePage(){
                this.getUserList(null,null,null,null,null)
            },
            handleFilterChange(filters) {
                if(filters.isVip!=undefined&&filters.isVip!=null){
                    this.$refs.userList.clearFilter('isBlack');
                    if(filters.isVip.length=='1'){
                        if(filters.isVip[0]=='0'){
                            let arr = this.userList1
                            let arr1 = []
                            for(let i in arr){
                                if(arr[i].isVip=='0'){
                                    arr1.push(arr[i])
                                }
                            }
                            this.userList = arr1
                        }else{
                            let arr = this.userList1
                            let arr1 = []
                            for(let i in arr){
                                if(arr[i].isVip=='1'){
                                    arr1.push(arr[i])
                                }
                            }
                            this.userList = arr1
                        }

                    }else{
                        this.userList = this.userList1
                    }
                }
                if(filters.isBlack!=undefined&&filters.isBlack!=null){
                    this.$refs.userList.clearFilter('isVip');
                    if(filters.isBlack.length=='1'){
                        if(filters.isBlack[0]=='0'){
                            let arr = this.userList1
                            let arr1 = []
                            for(let i in arr){
                                if(arr[i].isBlack=='0'){
                                    arr1.push(arr[i])
                                }
                            }
                            this.userList = arr1
                        }else{
                            let arr = this.userList1
                            let arr1 = []
                            for(let i in arr){
                                if(arr[i].isBlack=='1'){
                                    arr1.push(arr[i])
                                }
                            }
                            this.userList = arr1
                        }
                    }else{
                        this.userList = this.userList1
                    }
                }


            },
            handleUserVipDelete(id){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userVipDelete(id).then(res=>{
                        if(res.code==0){
                            Message({
                                message:'操作成功',
                                type: 'success',
                                duration:'1500',
                            })
                            if(!!this.inputUserName){
                                this.getUserList(null,null,this.inputUserName,null,null)
                            }else if(!!this.inputEmail){
                                this.getUserList(null,null,null,this.inputEmail,null)
                            }else if(!!this.inputPhoneNumber){
                                this.getUserList(null,null,null,null,this.inputPhoneNumber)
                            }else{
                                this.getUserList(null,null,null,null,null)
                            }
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleUserDelete(id){
                MessageBox('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userDelete(id).then(res=>{
                        if(res.code==0){
                            Message({
                                message:'操作成功',
                                type: 'success',
                                duration:'1500',
                            })
                            if(!!this.inputUserName){
                                this.getUserList(null,null,this.inputUserName,null,null)
                            }else if(!!this.inputEmail){
                                this.getUserList(null,null,null,this.inputEmail,null)
                            }else if(!!this.inputPhoneNumber){
                                this.getUserList(null,null,null,null,this.inputPhoneNumber)
                            }else{
                                this.getUserList(null,null,null,null,null)
                            }
                        }
                    })
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            userDetails(item){
                this.$router.push({
                    name: 'userDetails',
                    params: {
                        id:item.id,
                        idCode:item.idCode
                    }
                })
            },
            exportExcel () {
                if(!!this.startDate&&!!this.endDate){
                    var loadingInstance = Loading.service({text:'加载中',background:'rgba(0,0,0,.7)'});
                    exportUserInfo(this.startDate,this.endDate).then(res=>{
                        console.log('下载excel:',res)
                        if(res.code==0){
                            window.location.href=res.data
                            Message({message:'下载成功', type: 'success', duration:'1500',})
                        }else{
                            Message({message:res.message, type: 'error', duration:'1500',})
                        }
                        loadingInstance.close();
                    })
                }
            },
            handleChange(){
                if(parseInt(this.value7[0])>0&&parseInt(this.value7[1])>0){
                    this.startDate= `${new Date(this.value7[0]).getFullYear()}-${new Date(this.value7[0]).getMonth()+1}-${new Date(this.value7[0]).getDate()}`
                    this.endDate=`${new Date(this.value7[1]).getFullYear()}-${new Date(this.value7[1]).getMonth()+1}-${new Date(this.value7[1]).getDate()}`
                }
            },
            startTime(){
                var date=(new Date())
                date.setMonth(date.getMonth()-1)
                var arr=[]
                arr[0]=date.getFullYear()
                arr[1]=date.getMonth()
                arr[2]=date.getDate()
                return arr
            },
            endTime(){
                var date=new Date()
                var arr=[]
                arr[0]=date.getFullYear()
                arr[1]=date.getMonth()
                arr[2]=date.getDate()
                return arr
            },

            deadlineChange(row){
                const d = new Date(row.deadline)
                const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
                editVipExpired(row.id,resDate).then(res=>{
                    console.log('修改vip到期时间',res)
                    if(res.code==0){
                        Message({message:'操作成功', type: 'success', duration:'1500'})
                    }else{
                        Message({message:'操作失败', type: 'error', duration:'1500'})
                    }
                })
            },
            p(s) {
                return s < 10 ? '0' + s : s
            },
        }
    }
</script>

<style lang="scss" scoped>
    .account{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .head{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding-left: 10px;
        /*box-sizing: border-box;*/
        /*border: 1px solid red;*/
    }
    .form-box{
        padding:0 10px;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        top:100px;
    }
    .head-img{
        width: 30px;
        display: block;
        height: 30px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .row{
        display: flex;
        align-items: center;
        .col{
            width: 200px;
            margin-right: 20px;
        }
        .date{
            display: flex;
            align-items: center;
            width: 350px;
        }
    }
    .dead-line{
        width: 160px;
        box-sizing: border-box;

        .el-date-editor{
            width: 140px;
            box-sizing: border-box;
            input{
                box-sizing: border-box;
            }
        }
    }
</style>
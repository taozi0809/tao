<template>
    <div class="sysAccount">
        <div class="header">
            <div class="l">
                <div class="l1">
                    <el-select v-model="status" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="l1">
                    <el-button type="primary" @click="handClick1">添 加</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50" label="序号"></el-table-column>

                <el-table-column prop="Role" label="账号角色" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Role==1">BOSS</span>
                        <span v-if="scope.row.Role==2">运营</span>
                        <span v-if="scope.row.Role==3">客服</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Owner" label="角色拥有者" width="150"></el-table-column>
                <el-table-column prop="Account" label="联系方式" width="180"></el-table-column>
                <el-table-column prop="LastIp" label="登录IP" width="180"></el-table-column>
                <el-table-column prop="LastLoginedAt" label="最近登录时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.LastLoginedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="操作人" width="150"></el-table-column>
                <el-table-column prop="Status" label="状态" width="150">
                    <template slot-scope="scope">
                        <el-switch
                                @change="adminUpdate(scope.row.ID,scope.row.Account,scope.row.PlaintextPass,scope.row.Role,scope.row.Owner,scope.row.Power,scope.row.Status==0?1:0)"
                                v-model="scope.row.Status==0?true:false"
                                active-text="开启"
                                inactive-text="关闭">
                        </el-switch>
                    </template>
                </el-table-column>
<!--                <el-table-column prop="Operator" label="操作人" min-width="150"></el-table-column>-->
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handClick2(scope.row)">权限编辑</el-button>
                        <el-button type="primary" size="small" @click="handClick3(scope.row)">账号信息修改</el-button>
                        <el-button type="danger" size="small" @click="handClick4(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="adminLlist()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="添加"
                    center
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">账号角色：</div>
                        <div class="r">
                            <el-select v-model="Role" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in RoleOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">角色拥有者：</div>
                        <div class="r">
                            <el-input v-model="Owner"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">手机号码：</div>
                        <div class="r">
                            <el-input v-model="Account"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">登录密码：</div>
                        <div class="r">
                            <el-input v-model="PlaintextPass"></el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1()">取 消</el-button>
                            <el-button type="primary" @click="adminInsert">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="修改"
                    center
                    :before-close="handleClose3"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog3"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">账号角色：</div>
                        <div class="r">
                            <el-select v-model="obj.Role" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in RoleOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">角色拥有者：</div>
                        <div class="r">
                            <el-input v-model="obj.Owner"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">手机号码：</div>
                        <div class="r">
                            <el-input v-model="obj.Account"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">登录密码：</div>
                        <div class="r">
                            <el-input v-model="obj.PlaintextPass"></el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                            <el-button type="primary" @click="adminUpdate(obj.ID,obj.Account,obj.PlaintextPass,obj.Role,obj.Owner,obj.Power,obj.Status)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="权限编辑"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="900px">
                <div class="dialog-con">
                    <div class="des">
                        <div class="item" v-for="(item,index) in menuOptions">
                            <div class="t">{{item.Name}}</div>
                            <div class="v">
                                <el-checkbox  v-if="reFresh"
                                              :value="item1.check==1"
                                              @change="selectAllFunc(index,index1)"
                                              v-for="(item1,index1) in item.Power"
                                              :key="index1">{{item1.Name}}
                                </el-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="handUpload">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="确定"
                    center
                    :before-close="handleClose4"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog4"
                    width="600px">
                <div class="dialog-con">
                    <div class="des">
                        您确定要删除此账号？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose4()">取 消</el-button>
                            <el-button type="primary" @click="adminDelete(obj.ID)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {adminInsert,adminDelete,adminLlist,adminUpdate} from "../../service/api/api";
    import {menuOptions} from "../../util/tools/menu";

    export default {
        data(){
            return{
                checkAll: false,
                status:-1,
                statusOptions:[
                    {
                        value:-1,
                        label:"全部",
                    },
                    {
                        value:1,
                        label:"BOSS",
                    },
                    {
                        value:2,
                        label:"运营",
                    },
                    {
                        value:3,
                        label:"客服",
                    },
                ],
                RoleOptions:[
                    {
                        value:1,
                        label:"BOSS",
                    },
                    {
                        value:2,
                        label:"运营",
                    },
                    {
                        value:3,
                        label:"客服",
                    },
                ],

                isDialog1:false,
                isDialog2:false,
                isDialog3:false,
                isDialog4:false,
                obj:{},
                condition:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                Account:"",
                PlaintextPass:"",
                Role:"",
                Owner:"",
                menuOptions:menuOptions,

                reFresh:true
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.adminLlist()
        },
        methods:{
            change(){
                this.adminLlist()
            },
            handClick1(){
                this.isDialog1=true
            },
            handClick2(i){
                this.obj={...i}
                let z=0
                for(let i in this.menuOptions){
                    if(i!=0){z = parseInt(this.menuOptions[i-1].Power.length) + parseInt(z)}
                    for(let j in this.menuOptions[i].Power){
                        this.menuOptions[i].Power[j].check=this.obj.Power[z+parseInt(j)]
                    }
                }
                this.isDialog2=true
            },
            selectAllFunc(index,index1){
                this.menuOptions[index].Power[index1].check=this.menuOptions[index].Power[index1].check==1?0:1
                this.reFresh= false
                this.$nextTick(()=>{
                    this.reFresh = true
                })
            },
            handClick3(i){
                this.obj={...i}
                this.isDialog3=true
            },
            handClick4(i){
                this.obj={...i}
                this.isDialog4=true
            },

            handleClose1(){
                this.isDialog1=false
                this.Account=""
                this.PlaintextPass=""
                this.Role=""
                this.Owner=""
            },
            handleClose2(){
                this.isDialog2=false
            },
            handleClose3(){
                this.isDialog3=false
            },
            handleClose4(){
                this.isDialog4=false
            },
            handUpload(){
                let arr = [...this.menuOptions]
                let arr1 = []
                for(let i in arr){
                    for(let j in arr[i].Power){
                        arr1.push(arr[i].Power[j].check?1:0)
                    }
                }
                this.adminUpdate(this.obj.ID,this.obj.Account,this.obj.PlaintextPass,this.obj.Role,this.obj.Owner,arr1,this.obj.Status)
            },
            adminLlist(){
                let Condition={}
                if(this.status!=-1){Condition={role:this.status}}
                adminLlist(this.page,this.per,Condition).then(res=>{
                    console.log("列表",res)
                    if(res.code==1000){
                        this.list=res.resp.Users
                        this.count=res.resp.Total
                    }
                })
            },
            adminUpdate(ID,Account,PlaintextPass,Role,Owner,Power,Status){
                adminUpdate(ID,Account,PlaintextPass,Role,Owner,Power,Status).then(res=>{
                    console.log("修改",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.adminLlist()
                        this.handleClose2()
                        this.handleClose3()
                    }
                })
            },
            adminInsert(){
                adminInsert(this.Account,this.PlaintextPass,this.Role,this.Owner).then(res=>{
                    console.log("添加",res)
                    if(res.code==1000){
                        Message.success("添加成功")
                        this.adminLlist()
                        this.handleClose1()
                    }
                })
            },
            adminDelete(ID){
                adminDelete(ID).then(res=>{
                    console.log("删除",res)
                    if(res.code==1000){
                       Message.success("删除成功")
                        this.adminLlist()
                        this.handleClose4()
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        box-sizing: border-box;
        padding: 20px;
        .l{
            display: flex;
            align-items: center;
            width: 300px;
            .l1{
                margin-right: 20px;
            }
        }
    }
    .list{
        box-sizing: border-box;
        padding:0 20px;
    }
    .dialog-con{
        .t1{
            display: flex;
            align-items: center;
            margin-top: 15px;
            width: 100%;
            box-sizing: border-box;
            padding-right: 80px;
            .l{
                width: 90px;
                flex-shrink: 0;
            }
            .r{
                width: 100%;
            }
        }
        .item{
            margin-bottom: 20px;
            .t{
                font-size:16px;
                color: #999;
                height: 40px;
                line-height: 40px;
            }
            .v{
                font-size: 14px;
                color: #333;
                box-sizing: border-box;
                padding-left: 15px;
                .el-checkbox{
                    margin-bottom: 15px;
                }
            }
        }
        .tt{
            margin-top:40px;
            .r{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>

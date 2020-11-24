<template>
    <div class="email">
        <div class="header">
            <div class="l">
                <div class="m">
                    <el-button type="primary" @click="handleClick1">新邮件</el-button>
                </div>
                <div class="m">
                    <el-button type="primary" @click="mailcontrolSendall">发送</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;"
                      @selection-change="handleSelectionChange"
                      border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="selection" width="40" disabled='true' :selectable='checkboxT'></el-table-column>
                <el-table-column type="index" :index="getInIndex" width="50" label="序号"></el-table-column>

                <el-table-column prop="TargetID" label="用户ID" width="150" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.TargetID[0]==-1||scope.row.TargetID[0]==0">全部</span>
                        <span v-else>{{scope.row.TargetID.join(',')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Title" label="标题" width="200"></el-table-column>
                <el-table-column prop="Annexes" label="附件" width="200" >
                    <template slot-scope="scope">
                        {{scope.row.Annexes | configToStr(configOptions)}}
                    </template>
                </el-table-column>
                <el-table-column prop="CreatedAt" label="发送时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.UpdatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Expire" label="过期时间(分钟)" width="150" >
                    <template slot-scope="scope">
                        {{scope.row.Expire}}
                    </template>
                </el-table-column>
                <el-table-column prop="Status" label="状态" width="120">
                    <template slot-scope="scope">
                        {{scope.row.Status==0?'未发':'已发'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="添加人" width="150" ></el-table-column>
                <el-table-column prop="UpdatedAt" label="添加时间">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>


                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleClick2(scope.row)" v-if="scope.row.Status!=1">修改</el-button>
                        <el-button type="primary" size="small" @click="handleClick2_1(scope.row)" v-if="scope.row.Status==1">查看</el-button>
                        <el-button type="danger" size="small" @click="handleClick3(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="mailcontrolList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="新邮件"
                    center
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">用户类型：</div>
                        <div class="r">
                            <el-radio v-model="TargetIDType" label="1">指定用户</el-radio>
                            <el-radio v-model="TargetIDType" label="2">全部用户</el-radio>
                        </div>
                    </div>
                    <div class="t1" v-if="TargetIDType==1">
                        <div class="l">用户ID：</div>
                        <div class="r">
                            <el-input v-model="TargetID" placeholder="多用户以','隔开"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">过期时间：</div>
                        <div class="r">
                            <el-input v-model="Expire" type="number"></el-input>
                            <div class="r-r">分钟</div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">标题：</div>
                        <div class="r">
                            <el-input v-model="Title"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件类型：</div>
                        <div class="r">
                            <el-select v-model="MailServiceType" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in MailTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    resize="none"
                                    v-model="Content">
                            </el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">附件物品：</div>
                        <div class="r">
                            <el-button type="primary" @click="handleClick1_1" size="small">配置附件</el-button>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l"></div>
                        <div class="r">
                            <el-card class="box-card">
                                <div class="r-list" v-for="(item,index) in Annexes">
                                    <div class="n1">{{item.PropType | PropTypeToStr(configOptions)}}</div>
                                    <div class="n2">x{{item.Num}}</div>
                                    <div class="n3"><el-button type="text" @click="Annexes.splice(index,1)">删除</el-button></div>
                                </div>
                            </el-card>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1()">取 消</el-button>
                            <el-button type="primary" @click="mailcontrolInsert">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="修改邮件"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">用户类型：</div>
                        <div class="r">
                            <el-radio v-model="TargetIDType" label="1">指定用户</el-radio>
                            <el-radio v-model="TargetIDType" label="2">全部用户</el-radio>
                        </div>
                    </div>
                    <div class="t1" v-if="TargetIDType==1">
                        <div class="l">用户ID：</div>
                        <div class="r">
                            <el-input v-model="obj.TargetID" placeholder="多用户以','隔开"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">过期时间：</div>
                        <div class="r">
                            <el-input v-model="obj.Expire"></el-input>
                            <div class="r-r">分钟</div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">标题：</div>
                        <div class="r">
                            <el-input v-model="obj.Title"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件类型：</div>
                        <div class="r">
                            <el-select v-model="obj.MailServiceType" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in MailTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    resize="none"
                                    v-model="obj.Content">
                            </el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">附件物品：</div>
                        <div class="r">
                            <el-button type="primary" @click="handleClick1_2" size="small">配置附件</el-button>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l"></div>
                        <div class="r">
                            <el-card class="box-card">
                                <div class="r-list" v-for="(item,index) in obj.Annexes">
                                    <div class="n1">{{item.PropType | PropTypeToStr(configOptions)}}</div>
                                    <div class="n2">x{{item.Num}}</div>
                                    <div class="n3"><el-button type="text" @click="obj.Annexes.splice(index,1)">删除</el-button></div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="mailcontrolUpdate">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="配置附件"
                    center
                    :before-close="handleClose1_1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1_1"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">配置附件：</div>
                        <div class="r">
                            <el-select v-model="PropType" placeholder="请选择">
                                <el-option
                                        v-for="item in configOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">数量：</div>
                        <div class="r">
                            <el-input v-model="Num" type="number"></el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1_1()">取 消</el-button>
                            <el-button type="primary" @click="addConfig">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="配置附件"
                    center
                    :before-close="handleClose1_2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1_2"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">配置附件：</div>
                        <div class="r">
                            <el-select v-model="PropType" placeholder="请选择">
                                <el-option
                                        v-for="item in configOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">数量：</div>
                        <div class="r">
                            <el-input v-model="Num" type="number"></el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1_2()">取 消</el-button>
                            <el-button type="primary" @click="addConfig1_2">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="确定"
                    center
                    :before-close="handleClose3"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog3"
                    width="600px">
                <div class="dialog-con">
                    <div class="des">
                        您确定要删除此邮件吗？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                            <el-button type="primary" @click="mailcontrolDelete(obj.ID)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="查看邮件"
                    center
                    :before-close="handleClose2_1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2_1"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">用户类型：</div>
                        <div class="r">
                            <el-radio v-model="TargetIDType" label="1" disabled>指定用户</el-radio>
                            <el-radio v-model="TargetIDType" label="2" disabled>全部用户</el-radio>
                        </div>
                    </div>
                    <div class="t1" v-if="TargetIDType==1">
                        <div class="l">用户ID：</div>
                        <div class="r">
                            {{obj.TargetID}}
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">过期时间：</div>
                        <div class="r">
                            {{obj.Expire}}
                            <div class="r-r">分钟</div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">标题：</div>
                        <div class="r">
                            {{obj.Title}}
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件类型：</div>
                        <div class="r">
                            <el-select v-model="obj.MailServiceType" placeholder="请选择" style="width: 100%;" disabled>
                                <el-option
                                        v-for="item in MailTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">邮件内容：</div>
                        <div class="r">
                            {{obj.Content}}
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">附件物品：</div>
                        <div class="r">
                            <el-card class="box-card">
                                <div class="r-list" v-for="(item,index) in obj.Annexes">
                                    <div class="n1" style="height: 30px;line-height: 30px;">{{item.PropType | PropTypeToStr(configOptions)}}</div>
                                    <div class="n2" style="height: 30px;line-height: 30px;">x{{item.Num}}</div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2_1()">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {configList, mailcontrolList,mailcontrolInsert,mailcontrolDelete,mailcontrolUpdate,mailcontrolSendall} from "../../service/api/api";
    import {Message} from "element-ui";
    import {MailTypeOptions} from "../../filter/filters";

    export default {
        data(){
            return{
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                multipleSelection:[],
                configOptions:[],
                MailTypeOptions:MailTypeOptions,
                MailServiceType:0,

                isDialog1:false,
                TargetIDType:"1",
                TargetID:"",
                Title:"",
                Content:"",
                Annexes:[],
                Expire:"",

                isDialog1_1:false,
                isDialog1_2:false,
                PropType:"",
                Num:"",

                isDialog2:false,
                isDialog2_1:false,
                isDialog3:false,
                obj:{},
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        filters: {
            configToStr: function (arr,arrOpt) {
                let arr1 = ''
                let funA = function(PropType,Num){
                    for(let i in arrOpt){
                        if(arrOpt[i].value==PropType){
                            return arrOpt[i].label+'x'+Num
                        }
                    }
                }
                for(let i in arr){
                    arr1+=funA(arr[i].PropType,arr[i].Num)+','
                }
                arr1= arr1.substring(0, arr1.lastIndexOf(','));
                return arr1
            },
            PropTypeToStr:function(val,arrOpt){
                for(let i in arrOpt){
                    if(arrOpt[i].value==val){
                        return arrOpt[i].label
                    }
                }
            }
        },
        created() {
            this.configList()

        },
        methods:{
            checkboxT(row,index){
                if(row.Status == 0){
                    return 1
                }else {
                    return 0
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick1(){
                this.isDialog1=true
            },
            handleClose1(){
                this.isDialog1=false

                this.TargetIDType="1"
                this.TargetID=""
                this.Title=""
                this.Content=""
                this.Annexes=[]
                this.Expire=""
            },
            handleClick1_1(){
                this.isDialog1_1=true
            },
            handleClick1_2(){
                this.isDialog1_2=true
            },
            handleClose1_1(){
                this.isDialog1_1=false
                this.PropType=""
                this.Num=""
            },
            handleClose1_2(){
                this.isDialog1_2=false
                this.PropType=""
                this.Num=""
            },
            addConfig(){
                if(this.PropType>0&&this.Num>0){
                    this.Annexes.push({
                        PropType:this.PropType,
                        Num:parseInt(this.Num)
                    })
                    this.PropType=""
                    this.Num=""
                }else{
                    Message.error("请选择")
                }

            },
            addConfig1_2(){
                if(this.PropType>0&&this.Num>0){
                    this.obj.Annexes.push({
                        PropType:this.PropType,
                        Num:parseInt(this.Num)
                    })
                    this.PropType=""
                    this.Num=""
                }else{
                    Message.error("请选择")
                }

            },
            handleClick2(row){
                if(row.Status==1){
                    Message.error("已发送邮件不能修改")
                }else{
                    this.obj={...row}
                    this.obj.TargetID = row.TargetID.join(',')
                    this.isDialog2=true
                }
            },
            handleClick2_1(row){
                this.obj={...row}
                this.obj.TargetID = row.TargetID.join(',')
                this.isDialog2_1=true
            },
            handleClose2(){
                this.isDialog2=false
            },
            handleClose2_1(){
                this.isDialog2_1=false
            },
            handleClick3(row){
                if(row.Status==1){
                    Message.error("已发送邮件不能删除")
                }else{
                    this.obj={...row}
                    this.isDialog3=true
                }
            },
            handleClose3(){
                this.isDialog3=false
            },
            configList(){
                configList(this.page,10000).then(res=>{
                    console.log("道具列表",res)
                    if(res.code==1000){
                        let list =res.resp.PropBaseConfigs
                        for(let i in list){
                            this.configOptions.push({
                                value:list[i].PropType,
                                label:list[i].Name
                            })
                        }
                        this.mailcontrolList()
                    }
                })
            },
            mailcontrolList(){
                mailcontrolList(this.page,this.per).then(res=>{
                    console.log("邮件列表",res)
                    if(res.code==1000){
                        this.list=res.resp.Mailcontrols
                        this.count=res.resp.Total
                    }
                })
            },
            mailcontrolInsert(){
                let id=''
                if(this.TargetIDType==2){
                    id=[-1]
                }else{
                    id = this.TargetID.split(",")
                    id=id.map(item => {
                        return +item;
                    });
                }
                mailcontrolInsert(id,this.Title,this.Content,this.Annexes,parseInt(this.Expire),parseInt(this.MailServiceType)).then(res=>{
                    console.log("添加邮件",res)
                    if(res.code==1000){
                        Message.success("添加成功")
                        this.mailcontrolList()
                        this.handleClose1()
                    }
                })
            },
            mailcontrolDelete(ID){
                mailcontrolDelete(ID).then(res=>{
                    console.log("删除邮件",res)
                    if(res.code==1000){
                        Message.success("删除成功")
                        this.handleClose3()
                        this.mailcontrolList()
                    }
                })
            },
            mailcontrolUpdate(){
                let id=''
                if(this.TargetIDType==2){
                    id=[-1]
                }else{
                    id = this.obj.TargetID.split(",")
                    id=id.map(item => {
                        return +item;
                    });
                }
                mailcontrolUpdate(parseInt(this.obj.ID),id,this.obj.Title,this.obj.Content,this.obj.Annexes,parseInt(this.obj.Expire),this.obj.Status,parseInt(this.obj.MailServiceType)).then(res=>{
                    console.log("修改邮件",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.handleClose2()
                        this.mailcontrolList()
                    }
                })
            },
            mailcontrolSendall(){
                if(this.multipleSelection.length>0){
                    let ids=[]
                    for(let i in this.multipleSelection){
                        ids.push(parseInt(this.multipleSelection[i].ID))
                    }
                    mailcontrolSendall(ids).then(res=>{
                        console.log("发送",res)
                        if(res.code==1000){
                            Message.success("已发送")
                            this.mailcontrolList()
                        }
                    })
                }else{
                    Message.error("请选择")
                }

            },

        },

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";

    .email{
        box-sizing: border-box;
        padding: 0 10px;
        .img-icon{
            margin: 0 auto;
            width: 60px;
        }
        .sort{
            display: flex;
            align-content: center;
            justify-content: space-between;
            .s-t{
                width: 100%;
            }
            .btn{
                margin-left: 20px;
            }

        }
    }
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .dialog-con{
        .t1{
            display: flex;
            margin-top: 20px;
            width: 100%;
            box-sizing: border-box;
            padding-right: 80px;
            .l{
                width: 80px;
                flex-shrink: 0;
            }
            .r{
                width: 100%;
                display: flex;
                align-items: center;
                .r-r{
                    flex-shrink: 0;
                    margin-left: 20px;
                }
                .box-card {
                    width: 100%;
                    .r-list{
                        display: flex;
                        align-items: center;
                        .n1{
                            width: 150px;
                        }
                        .n2{
                            width: 100px;
                        }
                        .n3{
                            width: 100px;
                        }
                    }
                }
            }
        }
        .tt{
            margin-top:100px;
            .r{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>

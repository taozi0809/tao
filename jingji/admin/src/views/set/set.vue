<template>
    <div class="set">
        <div class="header">
            <div class="l">
                <div class="m">
                    <el-date-picker
                            v-model="time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            unlink-panels
                            format="yyyy-MM-dd HH:mm"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            @change="getRestartList()">
                    </el-date-picker>
                </div>

                <div class="m">
                    <el-button type="primary" @click="isDialog1=true">添 加</el-button>
                </div>
            </div>
            <div class="s">
                <div class="item">
                    <div class="t">在线人数：</div>
                    <div class="v">{{online}}</div>
                </div>
                <div class="item">
                    <div class="t">参赛人数：</div>
                    <div class="v">{{match}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                <el-table-column label="提示时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.TipsTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.RestartTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column  label="结束时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.EndTime | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="RestartTitle" label="更新标题" width="200"></el-table-column>
                <el-table-column prop="RestartType" label="更新方式" width="120"></el-table-column>
                <el-table-column prop="" label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Status==1">等待中</span>
                        <span v-if="scope.row.Status==2" style="color:#F56C6C ;">进行中</span>
                        <span v-if="scope.row.Status==3" style="color:#E6A23C ;">完成</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="操作人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editRestartClick(scope.row)" v-if="scope.row.Status==1||scope.row.Status==2">编辑内容</el-button>
                        <el-button type="warning" size="small" @click="optRestartClick(scope.row.ID)" v-if="scope.row.Status==2">完成</el-button>
                        <el-button type="primary" size="small" @click="showView(scope.row)" v-if="scope.row.Status==3">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="getRestartList()"
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
                    :before-close="handleClose"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">提示时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="TipsTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="RestartTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">结束时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="EndTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新标题：</div>
                        <div class="r">
                            <el-input v-model="RestartTitle" placeholder="请输入更新标题"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新方式：</div>
                        <div class="r">
                            <el-input v-model="RestartType" placeholder="请输入更新方式"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    resize="none"
                                    placeholder="请输入内容"
                                    v-model="RestartContent">
                            </el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose()">取 消</el-button>
                            <el-button type="primary" @click="addRestart">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="编辑"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">提示时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="edit.TipsTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="edit.RestartTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">结束时间：</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="edit.EndTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新标题：</div>
                        <div class="r">
                            <el-input v-model="edit.RestartTitle" placeholder="请输入更新标题"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新方式：</div>
                        <div class="r">
                            <el-input v-model="edit.RestartType" placeholder="请输入更新方式"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">更新内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    resize="none"
                                    placeholder="请输入内容"
                                    v-model="edit.RestartContent">
                            </el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="editRestart(edit.ID,edit.TipsTime,edit.RestartTime,edit.EndTime,edit.RestartTitle,edit.RestartType,edit.RestartContent)">确 定</el-button>
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
                        您确定要完成此状态的操作？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                            <el-button type="primary" @click="optRestart(ID,3)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="编辑"
                    center
                    :before-close="handleClose4"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog4"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">更新内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    :disabled="true"
                                    resize="none"
                                    placeholder="请输入内容"
                                    v-model="view.RestartContent">
                            </el-input>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose4()">关 闭</el-button></div>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {getRestartList,addRestart,editRestart,optRestart} from "../../service/api/api";
    import {Message} from "element-ui";

    export default {
        data(){
            return{
                time:"",
                condition:"",
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                pickerOptions: {
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
                isDialog1:false,
                TipsTime:"",
                RestartTime:"",
                EndTime:"",
                RestartTitle:"",
                RestartType:"",
                RestartContent:"",
                match:0,
                online:0,
                edit:{},
                isDialog2:false,
                isDialog3:false,
                ID:"",

                isDialog4:false,
                view:{},
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            // var t1 = new Date()
            // var t2 = new Date()
            // this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
            this.getRestartList()
        },
        methods:{
            handleClose(){
                this.isDialog1=false
                this.TipsTime=""
                this.RestartTime=""
                this.EndTime=""
                this.RestartTitle=""
                this.RestartType=""
                this.RestartContent=""
            },
            handleClose2(){
                this.isDialog2=false
                this.edit={}
            },
            handleClose3(){
                this.isDialog3=false
                this.ID=""
            },
            editRestartClick(i){
                let {...obj2}=i
                this.edit=obj2
                this.edit.TipsTime = this.edit.TipsTime*1000
                this.edit.RestartTime = this.edit.RestartTime*1000
                this.edit.EndTime = this.edit.EndTime*1000
                this.isDialog2=true
            },
            optRestartClick(ID){
                this.isDialog3=true
                this.ID=ID
            },
            showView(i){
                this.isDialog4=true
                this.view={...i}
            },
            handleClose4(){
                this.isDialog4=false
            },
            getRestartList(){
                this.loading=true
                getRestartList(this.page,this.per,parseInt(this.time[0]/1000),parseInt(this.time[1]/1000)).then(res=>{
                    this.loading=false
                    console.log("更新提示列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.count=res.total
                        this.match=res.match
                        this.online=res.online
                    }
                })
            },
            addRestart(){
                if(!!this.TipsTime && !!this.RestartTime && !!this.EndTime && this.RestartTitle.length>0 && this.RestartType.length>0 && this.RestartContent.length>0){
                    addRestart(this.TipsTime/1000,this.RestartTime/1000,this.EndTime/1000,this.RestartTitle,this.RestartType,this.RestartContent).then(res=>{
                        console.log("添加",res)
                        if(res.code==0){
                            Message.success("添加成功")
                            this.handleClose()
                            this.getRestartList()
                        }
                    })
                }else{
                    Message.error("请全部填写")
                }
            },
            optRestart(ID,Opt){
                optRestart(ID,Opt).then(res=>{
                    console.log("完成",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        this.getRestartList()
                        this.handleClose3()
                    }
                })
            },
            editRestart(ID,TipsTime,RestartTime,EndTime,RestartTitle,RestartType,RestartContent){
                if(!!RestartTitle && !!RestartType && !!RestartContent){
                    editRestart(ID,TipsTime/1000,RestartTime/1000,EndTime/1000,RestartTitle,RestartType,RestartContent).then(res=>{
                        console.log("编辑",res)
                        if(res.code==0){
                            Message.success("操作成功")
                            this.handleClose2()
                            this.getRestartList()
                        }
                    })
                }else{
                    Message.error("请全部填写")
                }

            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";
    .s{
        display: flex;
        align-items: center;
        flex-direction:  row-reverse;
        .item{
            display: flex;
            align-items: center;
            margin-right: 20px;
            .t{
                font-size: 14px;
                color: #909399;
            }
            .v{
                font-size: 14px;
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
            align-items: center;
            margin-top: 15px;
            width: 100%;
            box-sizing: border-box;
            padding-right: 80px;
            .l{
                width: 80px;
                flex-shrink: 0;
            }
            .r{
                width: 100%;
            }
        }
        .t2{
            .r{
                display: flex;
                align-items: center;
                .r1,.r2{
                    display: flex;
                    align-items: center;
                    width:245px;
                    margin-right:50px;
                    p{
                        margin-left: 10px;
                    }
                }
            }
        }
        .t3{
            .r{
                display: flex;
                align-items: center;
                .r1,.r2{
                    display: flex;
                    align-items: center;
                    width:200px;
                    margin-right:10px;
                }
            }
        }
        .t4{
            .r{
                position: relative;
                display: flex;
                align-items: center;
                .r1{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .r1-c{
                        width: 60px;
                        margin: 0 5px;
                    }
                }
                .r2,.r3{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .r2-des{
                        flex-shrink: 0;
                    }
                    .r-c{
                        width:60px;
                        margin: 0 5px;
                    }
                }
                .r4{
                    position: absolute;
                    right: 0;
                }
            }
        }
        .t5{
            align-items: inherit;
            .r{
                border: 1px solid #DCDFE6;
                box-sizing: border-box;
                padding: 10px;
                .rc{
                    display: flex;
                    align-items: center;
                    .r1{
                        width: 150px;
                    }
                    .r2{
                        width: 200px;
                    }
                    .r3{
                        width: 300px;
                    }
                }
            }
        }
        .t6{
            .r{
                display: flex;
                align-items: center;
                .r1{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .r-c{
                        width: 80px;
                        margin-left: 10px;
                    }
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

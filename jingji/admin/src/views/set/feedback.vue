<template>
    <div class="details">
        <div class="header">
            <div class="l">
                <div class="m">
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
                <div class="m">
                    <el-select v-model="ReadStatus" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in ReadStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="s">
                <el-input placeholder="ID" prefix-icon="el-icon-search" v-model="accountid" @input="change" style="margin-right: 20px;"></el-input>
                <el-input placeholder="联系方式" prefix-icon="el-icon-search" v-model="phonenum" @input="change"></el-input>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="AccountID" label="ID" width="120"></el-table-column>
                <el-table-column prop="Nickname" label="昵称" width="150"></el-table-column>
                <el-table-column prop="PhoneNum" label="联系方式" width="150"></el-table-column>
                <el-table-column prop="CreatedAt" label="反馈时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Title" label="标题" width="250"></el-table-column>
                <el-table-column prop="Content" label="详情描述" width="300"></el-table-column>
                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        {{scope.row.ReadStatus?'已查看':'未查看'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="操作人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="showView(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="feedbackList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <el-dialog
                title="反馈详情"
                :visible.sync="dialogView"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="closeView">
            <div class="dialog-con">
                <div class="con">

                    <div class="l">
                        <div class="item">
                            <div class="t">ID：</div>
                            <div class="v">{{viewdata.AccountID}}</div>
                        </div>
                        <div class="item">
                            <div class="t">昵称：</div>
                            <div class="v">{{viewdata.Nickname}}</div>
                        </div>
                        <div class="item">
                            <div class="t">联系方式：</div>
                            <div class="v">{{viewdata.PhoneNum}}</div>
                        </div>
                        <div class="item">
                            <div class="t">反馈标题：</div>
                            <div class="v">{{viewdata.Title}}</div>
                        </div>
                        <div class="item">
                            <div class="t">反馈时间：</div>
                            <div class="v">{{viewdata.CreatedAt | timestampToTime1}}</div>
                        </div>
                        <div class="item">
                            <div class="t">反馈描述：</div>
                            <div class="v">{{viewdata.Content}}</div>
                        </div>
                    </div>
                    <div class="r" v-if="viewdata.ReplyStatus">
                        <div class="item">
                            <div class="t">ID：</div>
                            <div class="v">{{viewdata.AccountID}}</div>
                        </div>
                        <div class="item">
                            <div class="t">昵称：</div>
                            <div class="v">{{viewdata.Nickname}}</div>
                        </div>
                        <div class="item">
                            <div class="t">联系方式：</div>
                            <div class="v">{{viewdata.PhoneNum}}</div>
                        </div>
                        <div class="item">
                            <div class="t">邮件类型：</div>
                            <div class="v">{{viewdata.MailServiceType | MailTypeToStr}}</div>
                        </div>
                        <div class="item">
                            <div class="t">反馈标题：</div>
                            <div class="v">{{viewdata.Title}}</div>
                        </div>
                        <div class="item">
                            <div class="t">奖励类型：</div>
                            <div class="v">{{viewdata.AwardType | AwardTypeToStr(AwardTypeOptions)}}</div>
                        </div>
                        <div class="item">
                            <div class="t">奖励数量：</div>
                            <div class="v">{{viewdata.AwardNum}}</div>
                        </div>
                        <div class="item">
                            <div class="t">邮件内容：</div>
                            <div class="v">{{viewdata.MailContent}}</div>
                        </div>
                    </div>
                </div>
                <div class="f-bot">
                    <el-button type="primary" @click="dialogReply=true">回 复</el-button>
                    <el-button @click="closeView">关 闭</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog
                title="回复邮件"
                :visible.sync="dialogReply"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="closeReply">
            <div class="dialog-con1">
                <div class="item">
                    <div class="t">ID：</div>
                    <div class="v">{{viewdata.AccountID}}</div>
                </div>
                <div class="item">
                    <div class="t">昵称：</div>
                    <div class="v">{{viewdata.Nickname}}</div>
                </div>
                <div class="item">
                    <div class="t">联系方式：</div>
                    <div class="v">{{viewdata.PhoneNum}}</div>
                </div>
                <div class="item">
                    <div class="t">邮件类型：</div>
                    <div class="v">
                        <el-select v-model="MailType" placeholder="请选择">
                            <el-option
                                    v-for="item in MailTypOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">标题：</div>
                    <div class="v">
                        <el-input v-model="ReplyTitle" placeholder="请输入标题"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">奖励类型：</div>
                    <div class="v">
                        <el-select v-model="AwardType" placeholder="请选择">
                            <el-option
                                    v-for="item in AwardTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">奖励数量：</div>
                    <div class="v">
                        <el-input v-model.number="AwardNum" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入奖励数量"></el-input>
                    </div>
                </div>
                <div class="item item1">
                    <div class="t">邮件内容：</div>
                    <div class="v">
                        <el-input
                                resize="none"
                                clearable
                                type="textarea"
                                :rows="5"
                                placeholder="请输入邮件内容"
                                v-model="MailContent">
                        </el-input>
                    </div>
                </div>

                <div class="f-bot">
                    <el-button type="primary" @click="feedbackUpdate">提 交</el-button>
                    <el-button @click="closeReply">取 消</el-button>
                </div>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getToday,getBeforeToday,timeToTimestamp} from "../../util/tools/startEndTime";
    import {configList, feedbackList, feedbackUpdate} from "../../service/api/api";
    import {MailTypeOptions} from "../../filter/filters";

    export default {
        data(){
            return{
                time:[getBeforeToday(),getToday()],
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                phonenum:"",
                accountid:"",
                ReadStatus:"0",
                ReadStatusOptions:[
                    {
                      value:"0",
                      label:"全部",
                    },
                    {
                        value:"1",
                        label:"已查看",
                    },
                    {
                        value:"2",
                        label:"未查看",
                    },
                ],

                dialogView:false,
                viewdata:{},

                dialogReply:false,
                MailType:0,
                MailTypOptions:MailTypeOptions,
                AwardType:0,
                AwardTypeOptions:[{
                    value:0,
                    label:"无"
                }],
                AwardNum:"",
                MailContent:"",
                ReplyTitle:"",
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){

            this.configList()
        },
        methods:{
            change(){
                this.feedbackList()
            },
            showView(i){
                feedbackUpdate(
                    i.ID,
                    parseInt(i.MailServiceType),
                    i.ReplyTitle,
                    parseInt(i.AwardType),
                    parseInt(i.AwardNum),
                    i.MailContent,
                    true,
                    i.ReplyStatus).then(res=>{
                    console.log("查看",res)
                    if(res.code==1000){
                        this.loading=true
                        let Condition= {}

                        if(this.ReadStatus==0){
                            if(this.accountid.length>0){
                                Condition= {
                                    accountid:this.accountid
                                }
                            }
                            if(this.phonenum.length>0){
                                Condition= {
                                    phonenum:this.phonenum
                                }
                            }
                            if(this.accountid.length>0&&this.phonenum.length>0){
                                Condition= {
                                    accountid:this.accountid,
                                    phonenum:this.phonenum
                                }
                            }
                        }else if(this.ReadStatus==1){
                            if(this.accountid.length>0&&!this.phonenum.length>0){
                                Condition= {
                                    accountid:this.accountid,
                                    ReadStatus:true,
                                }
                            }
                            if(this.phonenum.length>0&&!this.accountid.length>0){
                                Condition= {
                                    phonenum:this.phonenum,
                                    ReadStatus:true,
                                }
                            }
                            if(!this.accountid.length>0&&!this.phonenum.length>0){
                                Condition= {
                                    ReadStatus:true,
                                }
                            }
                            if(this.accountid.length>0&&this.phonenum.length>0){
                                Condition= {
                                    accountid:this.accountid,
                                    phonenum:this.phonenum,
                                    ReadStatus:true,
                                }
                            }
                        }else if(this.ReadStatus==2){
                            if(this.accountid.length>0&&!this.phonenum.length>0){
                                Condition= {
                                    accountid:this.accountid,
                                    ReadStatus:false
                                }
                            }
                            if(this.phonenum.length>0&&!this.accountid.length>0){
                                Condition= {
                                    phonenum:this.phonenum,
                                    ReadStatus:false
                                }
                            }
                            if(!this.accountid.length>0&&!this.phonenum.length>0){
                                Condition= {
                                    ReadStatus:true,
                                }
                            }
                            if(this.accountid.length>0&&this.phonenum.length>0){
                                Condition= {
                                    accountid:this.accountid,
                                    phonenum:this.phonenum,
                                    ReadStatus:false
                                }
                            }
                        }
                        let start=new Date(this.time[0])
                        let end=new Date(this.time[1])
                        feedbackList(this.page,this.per,start/1000,end/1000,Condition).then(res=>{
                            console.log("反馈列表",res)
                            this.loading=false
                            if(res.code==1000){
                                this.list=res.resp.Feedbacks
                                this.count=res.resp.Total
                                this.dialogView=true
                                this.viewdata=i
                            }
                        })
                    }
                })
            },
            closeView(){
                this.dialogView=false
            },

            closeReply(){
                this.dialogReply=false
                this.dialogView=false
                this.MailType=0
                this.AwardType=0
                this.AwardNum=""
                this.MailContent=""
            },

            configList(){
                configList(this.page,10000).then(res=>{
                    console.log("道具列表",res)
                    if(res.code==1000){
                        let list =res.resp.PropBaseConfigs
                        for(let i in list){
                            this.AwardTypeOptions.push({
                                value:list[i].PropType,
                                label:list[i].Name
                            })
                        }
                        this.feedbackList()
                    }
                })
            },
            feedbackList(){
                this.loading=true
                let Condition= {}

                if(this.ReadStatus==0){
                    if(this.accountid.length>0){
                        Condition= {
                            accountid:this.accountid
                        }
                    }
                    if(this.phonenum.length>0){
                        Condition= {
                            phonenum:this.phonenum
                        }
                    }
                    if(this.accountid.length>0&&this.phonenum.length>0){
                        Condition= {
                            accountid:this.accountid,
                            phonenum:this.phonenum
                        }
                    }
                }else if(this.ReadStatus==1){
                    if(this.accountid.length>0&&!this.phonenum.length>0){
                        Condition= {
                            accountid:this.accountid,
                            ReadStatus:true,
                        }
                    }
                    if(this.phonenum.length>0&&!this.accountid.length>0){
                        Condition= {
                            phonenum:this.phonenum,
                            ReadStatus:true,
                        }
                    }
                    if(!this.accountid.length>0&&!this.phonenum.length>0){
                        Condition= {
                            ReadStatus:true,
                        }
                    }
                    if(this.accountid.length>0&&this.phonenum.length>0){
                        Condition= {
                            accountid:this.accountid,
                            phonenum:this.phonenum,
                            ReadStatus:true,
                        }
                    }
                }else if(this.ReadStatus==2){
                    if(this.accountid.length>0&&!this.phonenum.length>0){
                        Condition= {
                            accountid:this.accountid,
                            ReadStatus:false
                        }
                    }
                    if(this.phonenum.length>0&&!this.accountid.length>0){
                        Condition= {
                            phonenum:this.phonenum,
                            ReadStatus:false
                        }
                    }
                    if(!this.accountid.length>0&&!this.phonenum.length>0){
                        Condition= {
                            ReadStatus:true,
                        }
                    }
                    if(this.accountid.length>0&&this.phonenum.length>0){
                        Condition= {
                            accountid:this.accountid,
                            phonenum:this.phonenum,
                            ReadStatus:false
                        }
                    }
                }
                let start=new Date(this.time[0])
                let end=new Date(this.time[1])
                feedbackList(this.page,this.per,start/1000,end/1000,Condition).then(res=>{
                    console.log("反馈列表",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.Feedbacks
                        this.count=res.resp.Total
                    }
                })
            },

            feedbackUpdate(){

                feedbackUpdate(
                    this.viewdata.ID,
                    parseInt(this.MailType),
                    this.ReplyTitle,
                    parseInt(this.AwardType),
                    parseInt(this.AwardNum),
                    this.MailContent,
                    true,
                    true).then(res=>{
                    console.log("回复",res)
                    if(res.code==1000){
                        Message.success("已回复")
                        this.feedbackList()
                        this.closeReply()
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        .l{
            display: flex;
            align-items: center;
            .m{
                margin-right: 20px;
            }
            .m1{
                min-width: 100px;
            }
        }
        .s{
            flex-shrink: 0;
            width: 500px;
            display: flex;
            align-items: center;

        }
    }

    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .dialog-con{
        .con{
            display: flex;
            .l,.r{
                /*border: 1px solid red;*/
                width: 50%;
                box-sizing: border-box;
                padding-right: 20px;
                .item{
                    margin-top: 20px;
                    display: flex;
                    .t{
                        flex-shrink: 0;
                        font-size: 14px;
                        color: #999;
                    }
                    .v{
                        font-size: 14px;
                        color: #333;
                        width: 100%;
                    }
                }
            }
        }
        .f-bot{
            width: 400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            margin-top: 50px;
        }
    }
    .dialog-con1{
        .item{
            margin-top: 20px;
            display: flex;
            align-items: center;
            .t{
                flex-shrink: 0;
                font-size: 14px;
                color: #999;
            }
            .v{
                font-size: 14px;
                color: #333;
                width: 100%;
            }
        }
        .item1{
            align-items: normal;
        }
        .f-bot{
            width: 400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            margin-top: 50px;
        }
    }
</style>

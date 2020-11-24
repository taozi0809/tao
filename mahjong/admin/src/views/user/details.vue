<template>
    <div class="details">
        <div class="main">
            <div class="l">
                <div class="top">
                    <div class="top-r">
                        <el-button type="primary" size="small"
                                   @click="$refs.descTextarea.focus(),descDisabled=false,
                                   options[0].disabled=false,
                                   options[1].disabled=false,
                                   options[2].disabled=false,
                                   options[3].disabled=false,
                                   options[4].disabled=false">编辑</el-button>
                        <el-button type="primary" size="small" @click="playerRole" :disabled="descDisabled">保存</el-button>
                    </div>
                </div>
                <div class="user-label">用户详情</div>
                <div class="head-info-box">
                    <div class="head-img"><img :src="info.headimgurl" alt=""></div>
                    <div class="head-info">
                        <div class="nickName">{{info.nickname}}</div>
                        <div class="time createdat">用户注册时间 {{info.createdat | timestampToTime1}}</div>
                        <div class="time updatedat">最后登录时间 {{info.updatedat | timestampToTime1}}</div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">用户ID</div>
                    <div class="info">{{info.accountid}}</div>
                </div>
                <div class="item">
                    <div class="label">账号级别</div>
                    <div class="info">
                        <el-select v-model="info.role" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>

                </div>
                <div class="item">
                    <div class="label">绑定手机号</div>
                    <div class="info">{{info.account}}</div>
                </div>
                <div class="item-box">
                    <div class="label">备注信息</div>
                    <div class="des-box">
                        <el-input type="textarea" :rows="6" placeholder="请输入" v-model="info.desc" ref="descTextarea" :disabled="descDisabled"></el-input>
                    </div>
                </div>

            </div>
            <div class="r">
                <div class="top">
                    <div class="title">资产列表</div>
                    <div class="item">
                        <div class="item-l">
                            <span class="line lin1"></span>
                            <div class="coin">钻石</div>
                        </div>
                        <div class="item-r"><div class="value">{{info.diamonds}}</div></div>
                    </div>
                    <div class="item">
                        <div class="item-l">
                            <span class="line lin2"></span>
                            <div class="coin">金币</div>
                        </div>
                        <div class="item-r"><div class="value">{{info.chips}}</div></div>
                    </div>
                    <div class="item">
                        <div class="item-l">
                            <span class="line lin3"></span>
                            <div class="coin">房卡</div>
                        </div>
                        <div class="item-r"><div class="value">{{info.roomcards}}</div></div>
                    </div>
                </div>

            </div>
        </div>
        <div class="bot"></div>
    </div>
</template>

<script>
    import {playerRole,playerCondition,paySet} from "../../service/api/api";
    import {Message} from 'element-ui'
    export default {
        data(){
            return{
              info:{},
              accountid:'',
              options:[
                  // {
                  //     label:'机器人',
                  //     value:-2,
                  //     disabled:true,
                  // },
                  {
                      label:'禁用',
                      value:-1,
                      disabled:true,
                  },
                  {
                      label:'正常',
                      value:1,
                      disabled:true,
                  },
                  {
                      label:'一级代理',
                      value:3,
                      disabled:true,
                  },
                  {
                      label:'二级代理',
                      value:2,
                      disabled:true,
                  },
                  {
                      label:'超级管理员',
                      value:4,
                      disabled:true,
                  },
              ],
              alipay:{
                  PayAccount:'',
                  PayName: '',
                  PayType: '1',
                  PayUrl: '',
              },
              wechatpay:{
                  PayAccount:'',
                  PayName: '',
                  PayType: '2',
                  PayUrl: '',
              },
              alipayAction:1,
              wechatpayAction:1,
              alipayFile:null,
              wechatpayFile:null,

              descDisabled:true,
            }
        },
        created() {
            this.accountid=this.$route.query.accountid
            this.playerCondition(this.accountid)
        },
        methods:{
            playerCondition(condition){
                playerCondition(condition).then(res=>{
                    console.log('查询用户详情',res)
                    if(res.errcode==2000){
                        this.info=res.data

                        if(this.info.payinfo!=null){
                            if(this.info.payinfo.length==1){
                                if(this.info.payinfo[0].PayType==1){
                                    this.alipay=this.info.payinfo[0]
                                    this.alipayAction=2
                                }
                                if(this.info.payinfo[0].PayType==2){
                                    this.wechatpay=this.info.payinfo[0]
                                    this.wechatpayAction=2
                                }
                            }
                            if(this.info.payinfo.length==2){
                                for(let i in this.info.payinfo){
                                    if(this.info.payinfo[i].PayType==1){
                                        this.alipay=this.info.payinfo[i]
                                        this.alipayAction=2
                                    }
                                    if(this.info.payinfo[i].PayType==2){
                                        this.wechatpay=this.info.payinfo[i]
                                        this.wechatpayAction=2
                                    }
                                }
                            }
                        }
                    }
                })
            },
            playerRole(){
                playerRole(this.info.accountid,this.info.desc,this.info.role).then(res=>{
                    console.log('编辑备注',res)
                    if(res.errcode==2000){
                        this.playerCondition(this.accountid)
                        Message.success('操作成功')
                        this.descDisabled=true
                        this.options[0].disabled=true
                        this.options[1].disabled=true
                        this.options[2].disabled=true
                        this.options[3].disabled=true
                        this.options[4].disabled=true
                    }else{
                        Message.error(res.errmsg)
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .details{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        .main{
            width: 100%;
            display: flex;
            align-items: center;
            .l{
                width: 600px;
                height: 560px;
                margin-right: 20px;
                background: #fff;
                border-radius: 5px;
                overflow: hidden;
                box-sizing: border-box;
                padding: 20px;
                flex-shrink: 0;
                .top{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-direction: row-reverse;
                }
                .user-label{
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    font-size: 21px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .head-info-box{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    .head-img{
                        width: 120px;
                        height: 120px;
                        overflow: hidden;
                        flex-shrink: 0;
                        margin-right: 20px;
                        border-radius: 5px;
                        img{
                            width: 100%;
                        }
                    }
                    .head-info{
                        .nickName{
                            width: 100%;
                            height: 20px;
                            line-height: 20px;
                            font-size: 16px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .time{
                            width: 100%;
                            height: 20px;
                            line-height: 20px;
                            font-size: 14px;
                            margin-bottom: 10px;
                        }
                    }
                }
                .item{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    .label{
                        font-size: 16px;
                        color: #333;
                        flex-shrink: 0;
                        width: 80px;
                        margin-right: 20px;
                    }
                    .info{
                        font-size: 16px;
                        color: #455A64;
                    }

                }
                .item-box{
                    width: 100%;
                    display: flex;
                    .label{
                        font-size: 16px;
                        color: #333;
                        flex-shrink: 0;
                        width: 80px;
                        /*border: 1px solid red;*/
                        margin-right: 20px;
                        height: 40px;
                        line-height: 40px;
                    }
                    .info-box{
                        width: 300px;
                        height: 170px;
                        box-sizing: border-box;
                        border-radius: 5px;
                        border: 1px solid #D9D9D9;
                        position: relative;
                        top: 10px;
                        padding: 10px;
                        overflow: hidden;
                        line-height: 1.2;
                    }
                    .des-box{
                        width: 300px;
                        height: 170px;
                        overflow: hidden;
                    }
                }
            }
            .r{
                width: 100%;
                .top{
                    background: #fff;
                    width: 100%;
                    height:560px ;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding: 20px;

                    .title{
                        width: 100%;
                        height:30px;
                        line-height: 30px;
                        font-size: 21px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .item{
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        /*justify-content: space-between;*/
                        .item-l{
                            display: flex;
                            align-items: center;
                            width: 400px;
                            .line{
                                width: 5px;
                                height: 50px;
                                margin-right:50px;
                                border-radius: 5px;
                                display: block;
                            }
                            .lin1{
                                background: #1E88E5;
                            }
                            .lin2{
                                background: #745AF2;
                            }
                            .lin3{
                                background: #26C6DA;
                            }
                            .lin4{
                                background: #26C6DA;
                            }
                        }
                        .item-r{
                            .value{
                                color: #333;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .details{
        .des-box{
            .el-textarea{
                font-size: 16px;
                color: #455A64;
            }
            .el-textarea .el-textarea__inner{
                resize: none;
            }

            .el-textarea__inner::-webkit-scrollbar {display:none;}
        }
        .qr-img{
            .avatar-uploader .el-upload {
                /*border: 1px dashed #d9d9d9;*/
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
            .avatar {
                width: 40px;
                height: 40px;
                display: block;
            }
        }
    }

</style>
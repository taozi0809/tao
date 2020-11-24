<template>
    <div class="personal">
        <div class="t-box t-box1">
            <div class="i3-box">
                <div class="i3-l">
                    <div class="t-t">提现</div>
                    <div class="t1">
                        <div class="t">可提现余额：</div>
                        <div class="v">{{user.Cash>=0?(user.Cash/100).toFixed(2):user.Cash}}元</div>
                        <div class="btn"><el-button type="primary" size="mini" @click="isDialogCash=true">申请提现</el-button></div>
                    </div>
                    <div class="t1">
                        <div class="t">已提现额度：</div>
                        <div class="v">{{user.Cashed>=0?user.Cashed/100:user.Cashed}}元</div>
                    </div>
                    <div class="t1">
                        <div class="t">已提现次数：</div>
                        <div class="v">{{user.CashCount}}</div>
                    </div>
                </div>
                <div class="i3-r">
                    <div class="t-t"></div>
                    <div class="t1">
                        <div class="t">银行名称：</div>
                        <div class="v">{{user.BankName}}</div>
                    </div>
                    <div class="t1">
                        <div class="t">银行卡号：</div>
                        <div class="v">{{user.BankID}}</div>
                        <div class="btn"><el-button type="primary" size="mini" @click="isDialogBank=true">修改</el-button></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="t-box">
            <div class="i-box">
                <div class="t-t2">
                    <div class="l">账号信息</div>
                    <div class="r">
                        <div class="t">上级ID：</div>
                        <div class="v">{{user.UpAgentID}}</div>
                    </div>
                </div>

                <div class="t1">
                    <div class="t">后台账号ID：</div>
                    <div class="v">{{user.AccountID}}</div>
                </div>
                <div class="t1">
                    <div class="t">姓名：</div>
                    <div class="v">{{user.Name}}</div>
                </div>
                <div class="t1">
                    <div class="t">推广类型：</div>
                    <div class="v">{{user.AgentType}}</div>
                </div>
                <div class="t1">
                    <div class="t">手机号码：</div>
                    <div class="v">{{user.Phone}}</div>
                </div>
            </div>
            <div class="i-box">
                <div class="t-t">绑定游戏</div>
                <div class="t1">
                    <div class="t">游戏ID：</div>
                    <div class="v" v-if="!isChangeId">{{user.GameID}}</div>
                    <div class="v" v-if="isChangeId" style="width: 150px;">
                        <el-input v-model.number="user.GameID" placeholder="请输入游戏ID" size="mini"></el-input>
                    </div>
                    <div class="btn"><el-button type="primary" size="mini" @click="isChangeId=true" v-if="!isChangeId">修改</el-button></div>
                    <div class="btn"><el-button type="primary" size="mini" @click="editGameInfo" v-if="isChangeId">确认</el-button></div>
                    <div class="btn1"><el-button type="danger" size="mini" @click="editGameInfo1">解绑</el-button></div>
                </div>
                <div class="t1">
<!--                    <div class="t">游戏昵称：</div>-->
<!--                    <div class="v">{{user.GameNickname}}</div>-->
                </div>
                <div class="t1">
<!--                    <div class="t">游戏绑定手机：</div>-->
<!--                    <div class="v">{{user.GamePhone}}</div>-->
                </div>
                <div class="t1"></div>
            </div>
        </div>
        <div class="t-box" v-if="typeof user.ShareCode != 'undefined' && user.ShareCode != null && user.ShareCode != ''">
            <div class="i4-box">
                <div class="i4-l">
                    <div class="t-t">推广号</div>
                    <div class="t1">
                        <div class="t">推广号：</div>
                        <div class="v">{{user.ShareCode}}</div>
                    </div>
                    <div class="t1">
                        <div class="t">邀请链接：</div>
                        <div class="v">{{user.ShareURL}}</div>
                        <div class="btn"><el-button type="primary" size="mini" v-clipboard:copy="user.ShareURL" v-clipboard:success="onCopy">复制</el-button></div>
                    </div>
                </div>
                <div class="i4-r">
                    <div class="qr-box">
                        <div class="img-box">
                            <div id="qrcode" ref="qrcode" class="qrcode"></div>
                        </div>
                        <div class="desb">
                            <div class="t">推广号</div>
                            <div class="v">{{user.ShareCode}}</div>
                        </div>
                    </div>
                    <div class="btn-box">
                        <div class="btn"><el-button type="primary" size="mini" @click="downImg">保存二维码</el-button></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dialog-box">
            <el-dialog
                    title="申请提现"
                    :visible.sync="isDialogCash"
                    width="400px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="n">可提现余额</div>
                        <div class="v">{{user.Cash>0?user.Cash/100:user.Cash}}元</div>
                    </div>
                    <div class="item">
                        <div class="n">提现额度</div>
                        <div class="v">
                            <el-input v-model="Amount" placeholder="请输入提现额度" size="small"
                                      oninput="if(isNaN(value)) { value = null }
                                      if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="n">银行名称</div>
                        <div class="v">{{user.BankName}}</div>
                    </div>
                    <div class="item">
                        <div class="n">银行卡号</div>
                        <div class="v">{{user.BankID}}</div>
                    </div>
                    <div class="item item2">
                        请核对银行名称以及卡号
                    </div>
                </div>
                <div class="f">
                    <el-button @click="handleClose">取 消 申 请</el-button>
                    <el-button type="primary" @click="isDialogCash2 = true">提 交 申 请</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="确认提现"
                    :visible.sync="isDialogCash2"
                    width="400px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="n">提现额度</div>
                        <div class="v">{{Amount}}</div>
                    </div>
                    <div class="item">
                        <div class="n">银行名称</div>
                        <div class="v">{{user.BankName}}</div>
                    </div>
                    <div class="item">
                        <div class="n">银行卡号</div>
                        <div class="v">{{user.BankID}}</div>
                    </div>
                    <div class="item item2">
                        请核对提现额度银行名称以及卡号
                    </div>
                </div>
                <div class="f">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="isDialogCash2Click">确认</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog-box">
            <el-dialog
                    title="修改银行卡"
                    :visible.sync="isDialogBank"
                    width="400px"
                    center
                    :modal-append-to-body="false"
                    :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="n">银行名称</div>
                        <div class="v">
                            <el-input v-model="user.BankName" placeholder="请输入银行名称"></el-input>
                        </div>
                    </div>
                    <div class="item" style="margin-top: 20px;">
                        <div class="n">银行卡号</div>
                        <div class="v">
                            <el-input v-model="user.BankID" placeholder="请输入银行卡号"></el-input>
                        </div>
                    </div>
                    <div class="item item2" style="margin-top: 20px;">
                        请核对银行名称以及卡号
                    </div>
                </div>
                <div class="f">
                    <el-button @click="isDialogBank = false">取 消</el-button>
                    <el-button type="primary" @click="isDialogBankClick">确 认</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import QRCode from 'qrcodejs2'
    import {cashout,editBank,editGameInfo,getUser} from "../../service/api/api";

    export default {
        data(){
            return{
                isDialogCash:false,
                isDialogCash2:false,
                isDialogBank:false,
                isChangeId:false,
                input:"",
                value:"1",
                user:{},
                bankCard:"",
                Amount:"",
                shareUrl:"http://caishenhongbao.com/download/",
                isShowQrCode:false,
                GmaeIdRecording:"",
            }
        },
        created() {
            this.getUser()
        },
        mounted() {},
        methods:{
            handleClose(){
                this.isDialogCash=false
                this.isDialogCash2=false
                this.isDialogBank=false
                this.Amount=""
            },
            isDialogCash2Click(){
                if(!!this.user.BankName&&!!this.user.BankID&&this.user.Cash>0){
                    this.cashout()
                }else{
                    Message.error("填写信息有误或余额不足")
                }
            },
            isDialogBankClick(){
                if(!!this.user.BankName&&!!this.user.BankID){
                    this.editBank(this.user.BankName,this.user.BankID)
                }else{
                    Message.error("填写信息有误")
                }
            },
            onCopy(){
                Message.success("复制成功")
            },
            downImg(){
                var imgUrl = this.$refs.qrcode.getElementsByTagName("img")[0].src
                var a = document.createElement('a')
                a.download = name || '推广号'
                a.href = imgUrl;
                a.click()
            },

            getUser(){
                getUser().then(res=>{
                    console.log("获取账号信息",res)
                    if(res.code==0){
                        this.user=res.user
                        this.GmaeIdRecording=this.user.GameID
                        if(typeof res.user.ShareCode != 'undefined' && res.user.ShareCode != null && res.user.ShareCode != ''){
                            if(!this.isShowQrCode){
                                this.$nextTick(function () {
                                    let qrcode = new QRCode("qrcode", {
                                        width: 210,
                                        height:210,
                                        text:this.user.ShareURL,
                                        colorDark: "#000",
                                        colorLight: "#fff"
                                    });
                                });
                                this.isShowQrCode=true
                            }

                        }
                    }
                })
            },
            cashout(){
                cashout(parseInt(this.Amount*100)).then(res=>{
                    console.log("申请提现",res)
                    if(res.code==0){
                        this.getUser()
                        this.handleClose()
                        Message.success("已提交申请")
                    }
                })
            },
            editBank(BankName,BankID){
                editBank(BankName,BankID).then(res=>{
                    console.log("修改银行账户信息",res)
                    if(res.code==0){
                        this.getUser()
                        this.handleClose()
                        Message.success("操作成功")
                    }
                })
            },
            editGameInfo(){
                if(this.GmaeIdRecording!=this.user.GameID){
                    editGameInfo(parseInt(this.user.GameID)).then(res=>{
                        console.log("修改绑定游戏信息",res)
                        if(res.code==0){
                            this.isChangeId=false
                            this.getUser()
                            Message.success("修改成功")
                        }
                    })
                }else{
                    this.isChangeId=false
                }

            },
            editGameInfo1(){
                editGameInfo(0).then(res=>{
                    console.log("解绑",res)
                    if(res.code==0){
                        this.getUser()
                        Message.success("解绑成功")
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .t-box{
        box-sizing: border-box;
        padding:0 20px;
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .i-box,.i2-box{
            width:30vw;
            min-width: 350px;
            border: 1px solid #DCDFE6;
            box-sizing: border-box;
            padding:20px;
            margin-right: 20px;
            position: relative;
            .t-t{
                font-size: 16px;
                color: #000;
                font-weight: bold;
                height:40px;
            }
            .t-t2{
                display: flex;
                justify-content: space-between;
                width: 100%;
                .l{
                    font-size: 16px;
                    color: #000;
                    font-weight: bold;
                    height:40px;
                }
                .r{
                    display: flex;
                    .t{
                        font-size: 14px;
                        color: #999;
                    }
                    .v{
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
            .t1{
                display: flex;
                align-items: center;
                height: 30px;
                .t{
                    font-size: 14px;
                    color: #999;
                }
                .v{
                    font-size: 16px;
                    color: #333;
                }
                .btn1{
                    position: absolute;
                    right: 20px;
                }
                .btn{
                    position: absolute;
                    right:88px;
                }
            }
        }
        .i3-box{
            width:calc(60vw + 20px);;
            min-width:720px;
            display: flex;
            border: 1px solid #DCDFE6;
            box-sizing: border-box;
            position: relative;
            .i3-l,.i3-r{
                width:30vw;
                min-width:350px;
                position: relative;
                box-sizing: border-box;
                padding: 20px;
                .t-t{
                    font-size: 16px;
                    color: #000;
                    font-weight: bold;
                    height:40px;
                }
                .t1{
                    display: flex;
                    align-items: center;
                    height: 30px;
                    .t{
                        font-size: 14px;
                        color: #999;
                    }
                    .v{
                        font-size: 16px;
                        color: #333;
                    }
                    .btn{
                        position: absolute;
                        right: 20px;
                    }
                }
            }
            .i3-r{
                .t1{
                    .btn{
                        right: 0;
                    }
                }
            }
        }
        .i4-box{
            width:calc(60vw + 20px);;
            min-width:720px;
            display: flex;
            border: 1px solid #DCDFE6;
            box-sizing: border-box;
            position: relative;
            .i4-l{
                width: 30vw;
                min-width: 350px;
                position: relative;
                box-sizing: border-box;
                padding: 20px;
                flex-shrink: 0;
                .t-t{
                    font-size: 16px;
                    color: #000;
                    font-weight: bold;
                    height:40px;
                }
                .t1{
                    display: flex;
                    /*align-items: center;*/
                    height: 30px;
                    width: 100%;
                    .t{
                        font-size: 14px;
                        color: #999;
                        flex-shrink: 0;
                    }
                    .v{
                        font-size: 16px;
                        color: #333;
                        word-wrap:break-word;
                        word-break:normal;
                        width:calc(100% - 150px);
                        /*border: 1px solid red;*/
                        height: 80px;
                    }
                    .btn{
                        position: absolute;
                        right: 20px;
                    }
                }
            }
            .i4-r{
                width: 30vw;
                min-width: 350px;
                box-sizing: border-box;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                .qr-box{
                    background: #fff;
                    width:250px;
                    height:300px;
                    border: 1px solid #ebebeb;
                    margin-right:20px;
                    box-sizing: border-box;
                    padding: 20px;
                    .img-box{
                        margin: 0 auto;
                        width:210px;
                        height: 210px;
                    }
                    .desb{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 60px;
                        .t,.v{
                            color: #000;
                            font-size:20px;
                        }
                        .t{
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
    .t-box1{
        margin-top: 20px;
    }
    .dialog-box{
        .dialog-con{
            .item{
                display: flex;
                align-items: center;
                height: 40px;
                .n,.v{
                    font-size: 16px;
                    width: 90px;
                    flex-shrink: 0;
                }
                .v{
                    width:200px;
                }

            }
            .item2{
                color: #F56C6C;
                font-size: 14px;
                text-align: center;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

        }
        .f{
            margin-top:50px;
            display: flex;
            align-items: center;
            justify-content:space-around;

        }
    }

</style>

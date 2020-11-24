<template>
    <div class="info">
        <div class="t-box t-box-h">
            <div class="t-t">个人信息</div>
            <div class="t-box-m">
                <div class="i1">
                    <div class="t">ID：</div>
                    <div class="v">{{user.AccountID}}</div>
                </div>
                <div class="i1">
                    <div class="t">昵称：</div>
                    <div class="v">{{user.Nickname}}</div>
                </div>
                <div class="i1">
                    <div class="t">注册手机号：</div>
                    <div class="v">{{user.Username}}</div>
                </div>
                <div class="i1">
                    <div class="t">注册时间：</div>
                    <div class="v">{{user.CreatedAt | timestampToTime1}}</div>
                </div>
                <div class="i1">
                    <div class="t">最后登录时间：</div>
                    <div class="v">{{user.LoginTime | timestampToTime1}}</div>
                </div>
                <div class="i1">
                    <div class="t">用户状态：</div>
                    <div class="v">{{user.Role | roleToName}}</div>
                </div>
                <div class="i1 i2">
                    <div class="t">备注信息：</div>
                    <div class="v">
                        <el-input
                                ref="inputRef"
                                type="textarea"
                                :rows="5"
                                resize="none"
                                :disabled="isDisabled"
                                placeholder="请输入内容"
                                v-model="user.Remark">
                        </el-input>
                        <div class="v-btn">
                            <el-button type="text" @click="editRemarkClick">修改</el-button>
                            <el-button type="text" @click="editRemark">确认</el-button>
                        </div>
                    </div>
                </div>
                <div class="i1">
                    <div class="t">钱包状态：</div>
                    <div class="v"></div>
                </div>
                <div class="i1"></div>
                <div class="i1 i3">
                    <div class="t">邀请人ID：</div>
                    <div class="v">{{user.ShareID}}</div>
                </div>
            </div>
        </div>
        <div class="t-box1">
            <div class="i-box">
                <div class="t-t">实名信息</div>
                <div class="t1">
                    <div class="t">姓名：</div>
                    <div class="v">{{user.RealName}}</div>
                </div>
                <div class="t1">
                    <div class="t">身份证号：</div>
                    <div class="v">{{user.IDCardNo}}</div>
                </div>
                <div class="t1"></div>
                <div class="t1"></div>
                <div class="btn"><el-button type="primary" size="mini" @click="isDialog1=true">修改实名信息</el-button></div>
            </div>
            <div class="i-box">
                <div class="t-t">银行卡信息</div>
                <div class="t1">
                    <div class="t">银行名称：</div>
                    <div class="v">{{user.BankCard.BankName}}</div>
                </div>
                <div class="t1">
                    <div class="t">银行卡号：</div>
                    <div class="v">{{user.BankCard.BankCardNo}}</div>
                </div>
                <div class="t1">
                    <div class="t">开户省/市：</div>
                    <div class="v">{{user.BankCard.City}}</div>
                </div>
                <div class="t1">
                    <div class="t">开户行：</div>
                    <div class="v">{{user.BankCard.OpeningBank}}</div>
                </div>
                <div class="t1">
                    <div class="t">联行号：</div>
                    <div class="v">{{user.BankCard.OpeningBankNo}}</div>
                </div>
                <div class="t1"></div>
                <div class="t1"></div>
                <div class="btn" v-if="user.BankCard.BankName.length>0"><el-button type="warning" size="mini" @click="clearRealInfo(2)">清空银行卡信息</el-button></div>
                <div class="btn" v-if="!user.BankCard.BankName.length>0"><el-button type="primary" size="mini" @click="bankcardSetClick">添加银行卡信息</el-button></div>
            </div>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="添加"
                    center
                    :before-close="handleClose"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">银行名称：</div>
                        <div class="r">
                            <el-input v-model.number="BankName"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">银行卡号：</div>
                        <div class="r">
                            <el-input v-model="BankCardNo"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">开户省：</div>
                        <div class="r">
                            <el-input v-model="Province"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">开户市：</div>
                        <div class="r">
                            <el-input v-model="City"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">开户行：</div>
                        <div class="r">
                            <el-input v-model="OpeningBank"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">联行号：</div>
                        <div class="r">
                            <el-input v-model="OpeningBankNo"></el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose">取 消</el-button>
                            <el-button type="primary" @click="bankcardSet">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="修改实名信息"
                    center
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">姓名：</div>
                        <div class="r">
                            <el-input v-model="user.RealName"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">身份证号：</div>
                        <div class="r">
                            <el-input v-model="user.IDCardNo"></el-input>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1">取 消</el-button>
                            <el-button type="primary" @click="realnameUpdate">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from "element-ui";
    import {getOneUser,clearRealInfo,editRemark,bankcardSet,realnameUpdate} from "../../service/api/api";

    export default {
         data(){
             return{
                 user:{
                     BankCard:{
                         BankCardNo: "",
                         BankName: "",
                         City: "",
                         OpeningBank: "",
                         Province: "",
                         Userid: 0,
                     }
                 },
                 Remark:"",
                 isDisabled:true,


                 isDialog:false,
                 isDialog1:false,
                 BankName:"",
                 BankCardNo:"",
                 Province:"",
                 City:"",
                 OpeningBank:"",
                 OpeningBankNo:"",
             }
         },
        created() {
            this.getOneUser(parseInt(this.$route.params.accountid))
        },
        methods:{
            bankcardSetClick(){
                this.isDialog=true
            },
            handleClose(){
                this.isDialog=false
                this.BankName=""
                this.BankCardNo=""
                this.Province=""
                this.City=""
                this.OpeningBank=""
                this.OpeningBankNo=""
            },
            handleClose1(){
              this.isDialog1=false
            },
            editRemarkClick(){
                this.isDisabled=false
                this.$refs.inputRef.focus();
            },
            getOneUser(AccountID){
                getOneUser(AccountID).then(res=>{
                    console.log("个人信息",res)
                    if(res.code==0){
                        this.user=res.user[0]
                        this.Remark=this.user.Remark
                    }
                })
            },
            clearRealInfo(n){
                clearRealInfo(this.user.UserID,n).then(res=>{
                    console.log("清除信息",res)
                    if(res.code==0){
                        this.getOneUser(parseInt(this.$route.params.accountid))
                        Message.success("操作成功")
                    }
                })
            },
            editRemark(){
                if(this.user.Remark!=this.Remark){
                    editRemark(parseInt(this.$route.params.accountid),this.user.Remark).then(res=>{
                        console.log("备注",res)
                        if(res.code==0){
                            Message.success("修改成功")
                            this.isDisabled=true
                            this.getOneUser(parseInt(this.$route.params.accountid))
                        }
                    })
                }else{
                    this.isDisabled=true
                }
            },
            bankcardSet(){
                bankcardSet(parseInt(this.$route.params.accountid),this.BankName,this.BankCardNo,this.Province,this.City,this.OpeningBank,this.OpeningBankNo).then(res=>{
                    console.log("增加银行卡",res)
                    if(res.code==1000){
                        Message.success("新增成功")
                        this.handleClose()
                        this.getOneUser(parseInt(this.$route.params.accountid))
                    }
                })
            },
            realnameUpdate(){
                realnameUpdate(this.user.AccountID,this.user.RealName,this.user.IDCardNo).then(res=>{
                    console.log("修改实名信息",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.handleClose1()
                        this.getOneUser(parseInt(this.$route.params.accountid))
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .info{
        box-sizing: border-box;
        padding:0 10px;
        .t-box{
            box-sizing: border-box;
            width:calc(60vw + 20px);
            min-width:720px;
            margin-bottom: 20px;
            border: 1px solid #DCDFE6;
            padding: 20px;
            .t-t{
                font-size: 16px;
                color: #000;
                font-weight: bold;
                height:40px;
            }
            .t-box-m{
                display: flex;
                flex-wrap: wrap;
                .i1{
                    width:50%;
                    min-width:330px;
                    box-sizing: border-box;
                    height: 30px;
                    display: flex;
                    .t{
                        font-size: 14px;
                        color: #999;
                        flex-shrink: 0;
                    }
                    .v{
                        font-size: 16px;
                        color: #333;
                    }
                }
                .i2{
                    height: 120px;
                    .v{
                        width:60%;
                        position: relative;

                    }
                    .v-btn{
                        position: absolute;
                        bottom: 0;
                        right: 10px;
                    }
                }
                .i3{
                    position: relative;
                    top: -90px;
                }
            }
        }
        .t-box1{
            box-sizing: border-box;
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            .i-box{
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
                }
                .btn{
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

        }
        .t-box-h{
            margin-top:10px;
        }
    }
</style>

<style lang="scss">
   .info{
       .i2{
            .el-textarea__inner{
                font-size: 16px;
                color: #333;
            }
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
   }
</style>

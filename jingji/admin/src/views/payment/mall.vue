<template>
    <div class="mall">
        <div v-if="$route.path=='/payment/mall'">
            <div class="header">
                <div class="l">
                    <div class="i1">
                        <el-button type="primary" @click="isDialog=true">添加通道</el-button>
                    </div>
                    <div class="m m1">
                        <el-switch
                                @change="changeOpt"
                                :width="50"
                                v-model="opt"
                                active-text="支付宝"
                                inactive-text="体总">
                        </el-switch>
                    </div>
                </div>
            </div>
            <div class="list">
                <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                          element-loading-text="加载中"
                          element-loading-background="rgba(255, 255, 255, .5)">
                    <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                    <el-table-column label="排序" width="150">
                        <template slot-scope="scope">
                            <div class="sort">
                                <div class="s-t">
                                    <el-input v-model.number="scope.row.Order" size="small" @focus="changeFocus(scope.row)"></el-input>
                                </div>
                                <div class="btn"><el-button type="text" size="small" v-if="scope.row.isSort" @click="merchantUpdateClick4(scope.row)">确认</el-button></div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="MerchantNo" label="编号" width="150"></el-table-column>
                    <el-table-column label="支付名称" width="150">
                        <template slot-scope="scope">
                            {{scope.row.MerchantType | MerchantTypeToStr}}
                        </template>
                    </el-table-column>
                    <el-table-column label="支付平台" width="150">
                        <template slot-scope="scope">
                            {{scope.row.UpPayBranchs | payArrToStr(scope.row.DownPayBranchs)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="支付金额" width="120">
                        <template slot-scope="scope">
                            {{scope.row.PayMin>0?scope.row.PayMin/100:scope.row.PayMin}} - {{scope.row.PayMax>0?scope.row.PayMax/100:scope.row.PayMax}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PublicKey" label="公钥" width="150"></el-table-column>
                    <el-table-column prop="PrivateKey" label="私钥" width="150"></el-table-column>
                    <el-table-column label="最近操作时间" width="180">
                        <template slot-scope="scope">
                            {{scope.row.UpdatedAt | timestampToTime2}}
                        </template>
                    </el-table-column>


                    <el-table-column fixed="right" label="操作" width="350">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" v-if="scope.row.UpPayBranchs.length==0" @click="merchantUpdateClick1(scope.row)">上架</el-button>
                            <el-button type="warning" size="small" v-if="scope.row.UpPayBranchs.length>0" @click="merchantUpdateClick2(scope.row)">下架</el-button>
                            <el-button type="primary" size="small" @click="$router.push({name:'payment_config',params:{id:scope.row.ID}})">商城配置</el-button>
                            <el-button type="primary" size="small" @click="merchantUpdateClick3(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="merchantDeleteClick(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="merchantList()"
                        :current-page.sync="page"
                        :page-size="per"
                        layout="total, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>
        <router-view/>

        <el-dialog
                title="添加通道"
                :visible.sync="isDialog"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="handleClose">
                <div class="dialog-con">
                    <div class="item">
                        <div class="t">编号：</div>
                        <div class="v">
                            <el-input v-model="MerchantNo" placeholder="请输入编号"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">支付名称：</div>
                        <div class="v">
                            <el-select v-model="MerchantType" placeholder="请选择" style="width:100%">
                                <el-option
                                        v-for="item in MerchantTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">支付类型：</div>
                        <div class="v">
                            <el-select v-model="DownPayBranchs" placeholder="请选择" multiple style="width:100%">
                                <el-option
                                        v-for="item in payOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">支付限额：</div>
                        <div class="v v1">
                            <el-input v-model="PayMin" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入最小额度"></el-input>
                            <span style="box-sizing: border-box;padding: 0 20px;">—</span>
                            <el-input v-model="PayMax" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入最大额度"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">公钥：</div>
                        <div class="v">
                            <el-input v-model="PublicKey" placeholder="请输入编号"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">私钥：</div>
                        <div class="v">
                            <el-input v-model="PrivateKey" placeholder="请输入编号"></el-input>
                        </div>
                    </div>
                    <div class="f-bot">
                        <el-button type="primary" @click="merchantInsert">确 定</el-button>
                        <el-button @click="handleClose">取 消</el-button>
                    </div>
                </div>


        </el-dialog>
        <el-dialog
                title="编辑通道"
                :visible.sync="isDialog3"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="handleClose3">
            <div class="dialog-con">
                <div class="item">
                    <div class="t">编号：</div>
                    <div class="v">
                        <el-input v-model="payData.MerchantNo" placeholder="请输入编号"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">支付名称：</div>
                    <div class="v">
                        <el-select v-model="payData.MerchantType" placeholder="请选择" style="width:100%">
                            <el-option
                                    v-for="item in MerchantTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">支付类型：</div>
                    <div class="v">
                        <el-select v-model="payData.DownPayBranchs" placeholder="请选择" multiple style="width:100%">
                            <el-option
                                    v-for="item in payOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">支付限额：</div>
                    <div class="v v1">
                        <el-input v-model="payData.PayMin" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入最小额度"></el-input>
                        <span style="box-sizing: border-box;padding: 0 20px;">—</span>
                        <el-input v-model="payData.PayMax" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入最大额度"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">公钥：</div>
                    <div class="v">
                        <el-input v-model="payData.PublicKey" placeholder="请输入编号"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">私钥：</div>
                    <div class="v">
                        <el-input v-model="payData.PrivateKey" placeholder="请输入编号"></el-input>
                    </div>
                </div>
                <div class="f-bot">
                    <el-button type="primary" @click="merchantUpdate3">确 定</el-button>
                    <el-button @click="handleClose3">取 消</el-button>
                </div>
            </div>


        </el-dialog>
        <el-dialog
            title="上架"
            :visible.sync="isDialog1"
            width="600px"
            center
            :modal-append-to-body="false"
            :before-close="handleClose1">
        <div class="dialog-con">
            <div class="item">
                <div class="t">支付类型：</div>
                <div class="v">
                    <el-select v-model="payData.UpPayBranchs" placeholder="请选择" multiple style="width:100%">
                        <el-option
                                v-for="item in payOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="f-bot">
                <el-button type="primary" @click="merchantUpdate1">确 定</el-button>
                <el-button @click="handleClose1">取 消</el-button>
            </div>
        </div>
    </el-dialog>
        <el-dialog
            title="下架"
            :visible.sync="isDialog2"
            width="600px"
            center
            :modal-append-to-body="false"
            :before-close="handleClose2">
        <div class="dialog-con">
            <div class="item">
                <div class="t">支付类型：</div>
                <div class="v">
                    <el-select v-model="payData.UpPayBranchs" placeholder="请选择" multiple style="width:100%">
                        <el-option
                                v-for="item in payOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="item">
                <div class="l"></div>
                <div class="r"></div>
            </div>
            <div class="f-bot">
                <el-button type="primary" @click="merchantUpdate2">确 定</el-button>
                <el-button @click="handleClose2">取 消</el-button>
            </div>
        </div>
    </el-dialog>
        <el-dialog
                title="确认删除"
                :visible.sync="isDialogCon"
                width="600px"
                center
                :modal-append-to-body="false">
            <div class="dialog-con">
                <div class="del">删除数据后，包含所有子界面都会被删除，请慎重考虑！</div>
                <div class="f-bot">
                    <el-button type="danger" @click="merchantDelete">确 定</el-button>
                    <el-button @click="isDialogCon=false">取 消</el-button>
                </div>
            </div>


        </el-dialog>
    </div>
</template>

<script>
    import {payOptions} from "../../filter/filters";
    import {
        merchantInsert,
        merchantDelete,
        merchantList,
        merchantUpdate,
        getPayConfig,
        editPayConfig,
        statusLimit, switchLimit
    } from "../../service/api/api";
    import {Message} from "element-ui"
    import {MerchantTypeOptions} from "../../filter/filters";

    export default {
        data(){
            return{
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                isDialog:false,
                MerchantNo:"",
                MerchantType:1,
                MerchantTypeOptions:MerchantTypeOptions,
                DownPayBranchs:[1,2,3],
                PayMin:"",
                PayMax:"",
                PublicKey:"",
                PrivateKey:"",
                payOptions:payOptions,

                isDialogCon:false,
                id:'',

                isDialog1:false,
                isDialog2:false,
                isDialog3:false,
                payData:{},

                opt:false,


            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.merchantList()
            this.getPayConfig()
        },
        methods:{
            changeOpt(){
                this.editPayConfig()
            },
            handleClose(){
                this.isDialog=false
                this.MerchantNo=""
                this.MerchantType=1
                this.DownPayBranchs=[1,2,3]
                this.PayMin=""
                this.PayMax=""
                this.PublicKey=""
                this.PrivateKey=""
            },
            merchantUpdateClick1(i){
                this.isDialog1=true
                this.payData={...i}
            },
            handleClose1(){
                this.isDialog1=false
                this.payData={}
            },
            merchantUpdateClick2(i){
                this.isDialog2=true
                this.payData={...i}
                this.payData.up=this.payData.UpPayBranchs
            },
            handleClose2(){
                this.isDialog2=false
                this.payData={}
            },
            merchantUpdateClick3(i){
                if(i.UpPayBranchs.length){
                    Message.error("请先下架通道")
                }else{
                    this.isDialog3=true
                    i.PayMin=i.PayMin/100
                    i.PayMax=i.PayMax/100
                    this.payData={...i}
                }

            },
            merchantUpdateClick4(i){
                merchantUpdate(
                    i.ID,
                    i.MerchantNo,
                    i.MerchantType,
                    i.DownPayBranchs,
                    i.UpPayBranchs,
                    i.PayMin,
                    i.PayMax,
                    i.PublicKey,
                    i.PrivateKey,
                    i.Order).then(res=>{
                    console.log("编辑",res)
                    if(res.code==1000){
                        this.merchantList()
                        Message.success("修改成功")
                    }
                })
            },
            handleClose3(){
                this.isDialog3=false
                this.payData={}
            },
            merchantDeleteClick(i){
                if(i.UpPayBranchs.length){
                    Message.error("请先下架通道")
                }else{
                    this.isDialogCon=true
                    this.id=i.ID
                }
            },
            changeFocus(i){
                i.isSort=true
            },
            merchantList(){
                this.loading=true
                merchantList(this.page,this.per).then(res=>{
                    console.log("通道列表",res)
                    this.loading=false
                    if(res.code==1000){
                        for(let i in res.resp.ShopMerchants){
                            res.resp.ShopMerchants[i]["isSort"]=false
                        }

                        this.list=res.resp.ShopMerchants
                        this.count=res.resp.Total
                    }
                })
            },
            merchantInsert(){
                merchantInsert(this.MerchantNo,
                    this.MerchantType,
                    this.DownPayBranchs,
                    this.PayMin*100,
                    this.PayMax*100,
                    this.PublicKey,
                    this.PrivateKey,
                    0).then(res=>{
                    console.log("添加通道",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.merchantList()
                        this.handleClose()
                    }
                })
            },
            merchantDelete(){
                merchantDelete(this.id).then(res=>{
                    console.log("删除通道",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.merchantList()
                        this.isDialogCon=false
                    }
                })
            },

            merchantUpdate1(){
                let arr1 = this.payData.DownPayBranchs
                let arr2 = [...this.payData.UpPayBranchs]
                this.payData.DownPayBranchs  = arr1.filter(item=>!arr2.includes(item))

                merchantUpdate(this.payData.ID,
                    this.payData.MerchantNo,
                    this.payData.MerchantType,
                    this.payData.DownPayBranchs,
                    this.payData.UpPayBranchs,
                    this.payData.PayMin,
                    this.payData.PayMax,
                    this.payData.PublicKey,
                    this.payData.PrivateKey,
                    this.payData.Order).then(res=>{
                    console.log("上架",res)
                    if(res.code==1000){
                        this.merchantList()
                        Message.success("上架成功")
                        this.handleClose1()

                    }
                })
            },
            merchantUpdate2(){
                let arr1 = [...this.payData.up]
                let arr2 = [...this.payData.DownPayBranchs]
                this.payData.DownPayBranchs=[...new Set([...arr1,...arr2])]
                merchantUpdate(this.payData.ID,
                    this.payData.MerchantNo,
                    this.payData.MerchantType,
                    this.payData.DownPayBranchs,
                    this.payData.UpPayBranchs,
                    this.payData.PayMin,
                    this.payData.PayMax,
                    this.payData.PublicKey,
                    this.payData.PrivateKey,
                    this.payData.Order).then(res=>{
                    console.log("下架",res)
                    if(res.code==1000){
                        this.merchantList()
                        Message.success("下架成功")
                        this.handleClose2()

                    }
                })
            },
            merchantUpdate3(){
                merchantUpdate(this.payData.ID,
                    this.payData.MerchantNo,
                    this.payData.MerchantType,
                    this.payData.DownPayBranchs,
                    this.payData.UpPayBranchs,
                    this.payData.PayMin*100,
                    this.payData.PayMax*100,
                    this.payData.PublicKey,
                    this.payData.PrivateKey,
                    this.payData.Order).then(res=>{
                        console.log("编辑",res)
                        if(res.code==1000){
                            this.merchantList()
                            Message.success("编辑成功")
                            this.handleClose3()

                        }
                })
            },
            editPayConfig(){
                editPayConfig(this.opt?2:1).then(res=>{
                    console.log("修改支付状态",res)
                    if(res.code==0){
                        this.getPayConfig()
                    }
                })
            },
            getPayConfig(){
                getPayConfig().then(res=>{
                    console.log("获取支付状态",res)
                    if(res.code==0){
                        this.opt=res.payConfig.PayType==1?false:true
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        .t{
            font-size: 24px;
            color: #303133;
        }
        .s{
            flex-shrink: 0;
            width: 200px;
        }
        .l{
            display: flex;
            align-items: center;
            .i1{
                margin-right: 20px;
            }
            .m1{
                min-width: 200px !important;
                flex-shrink: 0;
            }
        }
    }
    .list{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
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
    .dialog-con{
        width: 100%;
        .item{
            display: flex;
            align-items: center;
            margin-top: 20px;
            width: 100%;
            .t{
                flex-shrink: 0;
                font-size: 14px;
                color: #999;
                width:70px;
                flex-shrink: 0;
            }
            .v{
                font-size: 14px;
                color: #333;
                width: 100%;
            }
            .v1{
                display: flex;
                align-items: center;
            }
        }
        .f-bot{
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            margin-top: 50px;
        }
    }
</style>

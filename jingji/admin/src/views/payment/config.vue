<template>
    <div class="mall">
        <div class="header">
            <div class="l">
                <div class="i1">
                    <el-button type="primary" @click="isDialog=true">添 加</el-button>
                </div>
            </div>
        </div>

        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="Order" label="排序" width="100"></el-table-column>
                <el-table-column prop="TypeName" label="类型" width="180"></el-table-column>
                <el-table-column prop="" label="图标" width="120">
                    <template slot-scope="scope">
                        <el-image style="width:60px; height: 60px" :src="scope.row.ImgUrl">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="Num" label="数量"></el-table-column>


                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="goodstypeUpdateClick(scope.row)">编辑</el-button>
                        <el-button type="primary" size="small" @click="$router.push({name:'payment_goods',params:{id:scope.row.ID}})">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="goodstypeList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <el-dialog
                title="添加商品类型"
                :visible.sync="isDialog"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="handleClose">
            <div class="dialog-con">
                <div class="item">
                    <div class="t">排序：</div>
                    <div class="v">
                        <el-input v-model.number="Order" placeholder="请输入排序"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">类型：</div>
                    <div class="v">
                        <el-input v-model="TypeName" placeholder="请输入类型"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">图标：</div>
                    <div class="v">
                        <el-upload
                                class="avatar-uploader"
                                action="123"
                                :show-file-list="false"
                                :before-upload="beforeUpload">
                            <img v-if="ImgUrl" :src="ImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>


                <div class="f-bot">
                    <el-button type="primary" @click="goodstypeInsert">确 定</el-button>
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </div>


        </el-dialog>

        <el-dialog
                title="编辑商品类型"
                :visible.sync="isDialog1"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="handleClose1">
            <div class="dialog-con">
                <div class="item">
                    <div class="t">排序：</div>
                    <div class="v">
                        <el-input v-model.number="goodsData.Order" placeholder="请输入排序"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">类型：</div>
                    <div class="v">
                        <el-input v-model="goodsData.TypeName" placeholder="请输入类型"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">图标：</div>
                    <div class="v">
                        <el-upload
                                class="avatar-uploader"
                                action="123"
                                :show-file-list="false"
                                :before-upload="beforeUpload">
                            <img v-if="goodsData.ImgUrl" :src="goodsData.ImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>


                <div class="f-bot">
                    <el-button type="primary" @click="goodstypeUpdate">确 定</el-button>
                    <el-button @click="handleClose1">取 消</el-button>
                </div>
            </div>


        </el-dialog>
    </div>
</template>

<script>
    import {goodstypeInsert,goodstypeDelete,goodstypeList,goodstypeUpdate} from "../../service/api/api";
    import {Message} from "element-ui"
    import {baseUrl} from "../../service/base";
    import axios from "axios"
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                isDialog:false,
                id:'',
                MerchantID:"",
                TypeName:"",
                ImgUrl:"",
                Order:"",

                goodsData:{},
                isDialog1:false,
            }
        },
        computed:{
            ...mapState(['token']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.id=this.$route.params.id
            this.goodstypeList()
        },
        methods:{
            beforeUpload(file){
                let fd = new FormData();
                fd.append('image', file, 'fileName')

                axios.post(`${baseUrl.jingji}/upload/matchIcon`, fd, {
                    headers: {
                        token:this.token
                    }
                }).then(response=> {
                    console.log("图标上传",response.data);
                    if(response.data.code==0){
                        Message.success("上传成功")
                        this.ImgUrl=response.data.url
                        this.goodsData.ImgUrl=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            handleClose(){
                this.isDialog=false
                this.TypeName=''
                this.ImgUrl=''
                this.Order=''
            },
            goodstypeUpdateClick(i){
                this.goodsData={...i}
                this.isDialog1=true
            },
            handleClose1(){
                this.isDialog1=false
            },
            goodstypeList(){
                let Condition = {
                    merchantid:parseInt(this.id)
                }
                this.loading=true
                goodstypeList(this.page,this.per,Condition).then(res=>{
                    console.log("商品类型列表",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.GoodsTypes
                        this.count=res.resp.Total
                    }
                })
            },
            goodstypeInsert(){
                goodstypeInsert(parseInt(this.id),this.TypeName,this.ImgUrl,this.Order).then(res=>{
                    console.log("添加商品类型",res)
                    if(res.code==1000){
                        this.goodstypeList()
                        this.handleClose()
                        Message.success("添加成功")
                    }
                })
            },
            goodstypeUpdate(){
                goodstypeUpdate(this.goodsData.ID,this.goodsData.TypeName,this.goodsData.ImgUrl,parseInt(this.goodsData.Order)).then(res=>{
                    console.log("编辑商品类型",res)
                    if(res.code==1000){
                        this.goodstypeList()
                        this.handleClose1()
                        Message.success("修改成功")
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
    }
    .list{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
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
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
        line-height:60px;
        text-align: center;
        width: 60px;
        height: 60px;
    }
    .avatar {
        width: 60px;
        height: 60px;
        display: block;
    }
</style>

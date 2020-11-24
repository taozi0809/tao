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
                <el-table-column label="花费类型" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.TakenType==1">RMB</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Price" label="花费数量" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.TakenType==1">{{scope.row.Price/100}}</span>
                        <span v-if="scope.row.TakenType!=1">{{scope.row.Price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="TypeName" label="道具类型" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.PropType==1">点券</span>
                    </template>
                </el-table-column>
                <el-table-column label="图标" width="120">
                    <template slot-scope="scope">
                        <el-image style="width:60px; height: 60px" :src="scope.row.ImgUrl">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="GetAmount" label="获得数量" width="120"></el-table-column>
                <el-table-column prop="GiftAmount" label="赠送数量" width="120"></el-table-column>
                <el-table-column label="时长">
                    <template slot-scope="scope">
                        {{scope.row.Expire | timestampToTime3}}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="goodsupdateClick(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="goodsDelete(scope.row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="goodsList()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <el-dialog
                title="添加商品"
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
                    <div class="t">花费类型：</div>
                    <div class="v">
                        <el-select v-model="TakenType" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in TakenTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">花费数量：</div>
                    <div class="v">
                        <el-input v-model="Price" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入花费数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">道具类型：</div>
                    <div class="v">
                        <el-select v-model="PropType" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in PropTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">道具图标：</div>
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
                <div class="item">
                    <div class="t">道具数量：</div>
                    <div class="v">
                        <el-input v-model="GetAmount" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入获得数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">赠送数量：</div>
                    <div class="v">
                        <el-input v-model="GiftAmount" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入赠送数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">时长：</div>
                    <div class="v">
                        <el-select v-model="Expire" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in ExpireOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="f-bot">
                    <el-button type="primary" @click="goodsInsert">确 定</el-button>
                    <el-button @click="handleClose">取 消</el-button>
                </div>
            </div>


        </el-dialog>

        <el-dialog
                title="编辑商品"
                :visible.sync="isDialog1"
                width="600px"
                center
                :modal-append-to-body="false"
                :before-close="handleClose1">
            <div class="dialog-con">
                <div class="item">
                    <div class="t">排序：</div>
                    <div class="v">
                        <el-input v-model.number="goods.Order" placeholder="请输入排序"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">花费类型：</div>
                    <div class="v">
                        <el-select v-model="goods.TakenType" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in TakenTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="t">花费数量：</div>
                    <div class="v">
                        <el-input v-model="goods.Price" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入花费数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">道具类型：</div>
                    <div class="v">
                        <el-select v-model="goods.PropType" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in PropTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
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
                            <img v-if="goods.ImgUrl" :src="goods.ImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="item">
                    <div class="t">道具数量：</div>
                    <div class="v">
                        <el-input v-model="goods.GetAmount" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入获得数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">花费数量：</div>
                    <div class="v">
                        <el-input v-model="goods.GiftAmount" oninput ="value=value.replace(/[^0-9.]/g,'')" placeholder="请输入赠送数量"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="t">时长：</div>
                    <div class="v">
                        <el-select v-model="goods.Expire" placeholder="请选择" style="width: 100%;">
                            <el-option
                                    v-for="item in ExpireOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="f-bot">
                    <el-button type="primary" @click="goodsupdate">确 定</el-button>
                    <el-button @click="handleClose1">取 消</el-button>
                </div>
            </div>


        </el-dialog>
    </div>
</template>

<script>
    import {goodsInsert, goodsDelete, goodsList, goodsupdate} from "../../service/api/api";
    import {Message} from "element-ui"
    import {baseUrl} from "../../service/base";
    import axios from "axios"
    import {TakenTypeOptions,PropTypeOptions,ExpireOptions} from "../../filter/filters";
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

                TakenType:1,
                Price:"",
                PropType:1,
                GetAmount:"",
                GiftAmount:"",
                Expire:-1,
                ImgUrl:"",
                Order:"",

                TakenTypeOptions:TakenTypeOptions,
                PropTypeOptions:PropTypeOptions,
                ExpireOptions:ExpireOptions,

                isDialog1:false,
                goods:{},

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
            this.goodsList()
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
                        this.goods.ImgUrl=response.data.url
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
                this.TakenType=1
                this.Price=""
                this.PropType=1
                this.GetAmount=""
                this.GiftAmount=""
                this.Expire=-1
                this.ImgUrl=""
                this.Order=""
            },
            goodsupdateClick(i){
                this.isDialog1=true
                this.goods={...i}
                if(this.goods.TakenType==1){
                    this.goods.Price = this.goods.Price/100
                }
            },
            handleClose1(){
                this.isDialog1=false
                this.goods={}
            },
            goodsList(){
                let Condition = {
                    goodstypeid:parseInt(this.id)
                }
                this.loading=true
                goodsList(this.page,this.per,Condition).then(res=>{
                    console.log("商品列表",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.Goodses
                        this.count=res.resp.Total
                    }
                })
            },
            goodsInsert(){
                goodsInsert(parseInt(this.id),
                    this.TakenType,
                    this.TakenType==1?this.Price*100:this.Price,
                    this.PropType,
                    parseInt(this.GetAmount),
                    parseInt(this.GiftAmount),
                    this.Expire,
                    this.ImgUrl,
                    this.Order).then(res=>{
                    console.log("添加商品",res)
                    if(res.code==1000){
                        Message.success("添加商品成功")
                        this.goodsList()
                        this.handleClose()
                    }
                })
            },
            goodsDelete(ID){
                goodsDelete(ID).then(res=>{
                    console.log("删除",res)
                    if(res.code==1000){
                        Message.success("删除成功")
                        this.goodsList()
                    }
                })
            },
            goodsupdate(){
                goodsupdate(
                    this.goods.ID,
                    this.goods.TakenType,
                    this.goods.TakenType==1?this.goods.Price*100:this.goods.Price,
                    this.goods.PropType,
                    parseInt(this.goods.GetAmount),
                    parseInt(this.goods.GiftAmount),
                    this.goods.Expire,
                    this.goods.ImgUrl,
                    this.goods.Order).then(res=>{
                    console.log("更新",res)
                    if(res.code==1000){
                        Message.success("更新成功")
                        this.handleClose1()
                        this.goodsList()
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

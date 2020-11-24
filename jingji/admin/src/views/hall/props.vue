<template>
    <div class="set">
        <div class="header">
            <div class="l">
                <div class="m">
                    <el-button type="primary" @click="isDialog1=true">添 加</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="PropID" label="道具ID" width="120"></el-table-column>
                <el-table-column prop="Name" label="道具昵称" width="180"></el-table-column>
                <el-table-column label="道具图标" width="120">
                    <template slot-scope="scope">
                        <div class="img-box">
                            <el-image
                                    style="width: 60px; height: 60px;"
                                    :src="scope.row.ImgUrl">
                            </el-image>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.UpdatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="操作人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editClick(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="delClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="configList()"
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
                        <div class="l">道具ID：</div>
                        <div class="r">
                            <el-input v-model="PropID" placeholder="请输入道具ID"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">道具昵称：</div>
                        <div class="r">
                            <el-input v-model="Name" placeholder="请输入道具昵称"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">道具图标：</div>
                        <div class="r">
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
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose()">取 消</el-button>
                            <el-button type="primary" @click="configInsert">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="编辑"
                    center
                    :before-close="handleClose3"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog3"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">道具ID：</div>
                        <div class="r">
                            <el-input v-model="obj.PropID" placeholder="请输入道具ID" :disabled="true"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">道具昵称：</div>
                        <div class="r">
                            <el-input v-model="obj.Name" placeholder="请输入道具昵称"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">道具图标：</div>
                        <div class="r">
                            <el-upload
                                    class="avatar-uploader"
                                    action="123"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload3">
                                <img v-if="obj.ImgUrl" :src="obj.ImgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                            <el-button type="primary" @click="configUpdate">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="确定"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">
                    <div class="des">
                        您确定要删除此道具吗？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="configDelete(obj.ID)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {configInsert,configDelete,configList,configUpdate} from "../../service/api/api";
    import {Message} from "element-ui";
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

                isDialog1:false,
                isDialog2:false,
                obj:{},
                PropType:'',
                PropID:"",
                Name:"",
                ImgUrl:"",
                isDialog3:false,
            }
        },
        computed:{
            ...mapState(['token']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.configList()
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
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            beforeUpload3(file){
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
                        this.obj.ImgUrl=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            handleClose(){
                this.isDialog1=false
                this.PropType=''
                this.PropID=""
                this.Name=""
                this.ImgUrl=""
            },
            delClick(i){
                this.obj=i
                this.isDialog2=true
            },
            handleClose2(){
                this.isDialog2=false
            },
            editClick(i){
                this.obj={...i}
                this.isDialog3=true
            },
            handleClose3(){
                this.isDialog3=false
            },
            configList(){
                this.loading=true
                configList(this.page,this.per).then(res=>{
                    console.log("道具列表",res)
                    this.loading=false
                    if(res.code==1000){
                        this.list=res.resp.PropBaseConfigs
                        this.count=res.resp.Total
                    }
                })
            },
            configDelete(id){
                configDelete(id).then(res=>{
                    console.log("删除道具",res)
                    if(res.code==1000){
                        Message.success("删除成功")
                        this.configList()
                        this.handleClose2()
                    }
                })
            },
            configInsert(){
                if(this.PropID.length>0&&this.Name.length>0&&this.ImgUrl.length>0){
                    configInsert(parseInt(this.PropID),this.Name,this.ImgUrl).then(res=>{
                        console.log("添加",res)
                        if(res.code==1000){
                            Message.success("添加成功")
                            this.handleClose()
                            this.configList()
                        }
                    })
                }else{
                    Message.error("请填写完整")
                }
            },
            configUpdate(){
                configUpdate(parseInt(this.obj.ID),this.obj.Name,this.obj.ImgUrl).then(res=>{
                    console.log("编辑",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.handleClose3()
                        this.configList()
                    }
                })
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
    .img-box{
        display: flex;
        align-items: center;
        justify-content: center;

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

<template>
    <div class="home">
        <div class="head">
            <el-button type="primary" @click="addDialog=true">添加区块</el-button>
        </div>
        <div class="list">
            <el-table :data="indexPageConfigs" style="width: 100%;margin-bottom: 10px;" border height="800" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column prop="blockId" width="100" label="区域序号"></el-table-column>
                <el-table-column prop="blockTitle" width="250" label="标题"></el-table-column>
                <el-table-column prop="matchStartTime" width="200" label="开赛时间">
                    <template slot-scope="scope">
                        {{scope.row.matchStartTime | timestampToTime2}}
                    </template>
                </el-table-column>
                <el-table-column prop="imgUrl" width="350" label="图片">
                  <template slot-scope="scope">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="scope.row.imgUrl"
                        fit="contain"></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="skipId" label="跳转点"></el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="edit(scope.row)">设置</el-button>
                        <el-button type="danger" size="small"  @click="del(scope.row.configId)" :disabled="scope.row.blockId==1">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="dialog">
            <el-dialog
                    title="添加区块"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="addDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="addDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">是否公开：</div>
                        <div class="input">
                            <el-select v-model="publish" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in publishOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">区域序号：</div>
                        <div class="input">
                            <el-input v-model="blockId" type="number"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">标题：</div>
                        <div class="input">
                            <el-input v-model="title"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">开始时间：</div>
                        <div class="input">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="matchStartTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm:ss"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">跳转点：</div>
                        <div class="input">
                            <el-input v-model="skipId"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">图片：</div>
                        <div class="input">
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                                    :before-upload="beforeUpload">
                                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="addDialogClose">取 消</el-button>
                    <el-button type="primary" @click="configAdd(publish, blockId*1, title, matchStartTime, skipId*1, imgUrl)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="确定"
                    :close-on-click-modal="false"
                    center
                    :before-close="delDialogClose"
                    :modal-append-to-body="false"
                    :visible.sync="delDialog"
                    width="600px">
                <div class="con">
                    <div class="des">
                        您确定要删除此项吗？
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="delDialogClose">取 消</el-button>
                    <el-button type="primary" @click="configDelete(configId)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="修改区块"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="editDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="editDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">是否公开：</div>
                        <div class="input">
                            <el-select v-model="editData.publish" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in publishOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">区域序号：</div>
                        <div class="input">
                            <el-input v-model="editData.blockId" type="number"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">标题：</div>
                        <div class="input">
                            <el-input v-model="editData.blockTitle"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">开始时间：</div>
                        <div class="input">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="editData.matchStartTime"
                                    type="datetime"
                                    range-separator="至"
                                    unlink-panels
                                    format="yyyy-MM-dd HH:mm:ss"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">跳转点：</div>
                        <div class="input">
                            <el-input v-model="editData.skipId"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">图片：</div>
                        <div class="input">
                            <el-upload
                                    class="avatar-uploader"
                                    action="123"
                                    :show-file-list="false"
                                    :before-upload="editbeforeUpload">
                                <img v-if="editData.imgUrl" :src="editData.imgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="editDialogClose">取 消</el-button>
                    <el-button type="primary" @click="configUpdate(editData.publish, editData.blockId, editData.blockTitle, editData.matchStartTime, editData.skipId, editData.imgUrl,editData.configId)">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {configList,configAdd,configUpdate,configDelete,upload} from "../../../service/config";
    import {Message} from 'element-ui'

    export default {
        data(){
            return{
                addDialog:false,
                editDialog:false,
                delDialog:false,
                configId:"",
                editData:{},

                publish:1,
                blockId:"",
                title:"",
                matchStartTime:"",
                skipId:"",
                imgUrl:"",
                publishOptions:[
                    {
                        value:0,
                        label:"不公开",
                    },
                    {
                        value:1,
                        label:"公开",
                    },
                ],

                indexPageConfigs:[],
                loading:false,


            }
        },
        created() {
            this.configList()
        },
        methods:{
          beforeUpload(file){
            upload(file).then((res)=>{
              console.log('上传图片',res)
              if(res.code==0){
                this.imgUrl=res.data.fullUrl
                Message.success("上传成功")
              }else{
                Message.error(res.message)
              }
            })
          },
          editbeforeUpload(file){
            upload(file).then((res)=>{
              console.log('上传图片',res)
              if(res.code==0){
                this.editData.imgUrl=res.data.fullUrl
                Message.success("上传成功")
              }else{
                Message.error(res.message)
              }
            })
          },
            addDialogClose(){
                this.addDialog=false
                this.publish=1
                this.blockId=""
                this.title=""
                this.matchStartTime=""
                this.skipId=""
                this.imgUrl=""
            },

            del(configId){
                this.configId=configId
                this.delDialog=true
            },
            delDialogClose(){
                this.delDialog=false
            },
            edit(row){
                this.editData={...row}
                this.editDialog=true
            },
            editDialogClose(){
                this.editDialog=false
            },
            configList(){
                this.loading=true
                configList().then(res=>{
                    this.loading=false
                    console.log("首页配置列表",res)
                    if(res.code==0){
                        this.indexPageConfigs=res.data.indexPageConfigs
                    }
                })
            },
            configDelete(configId){
                configDelete(configId).then(res=>{
                    console.log("删除",res)
                    if(res.code==0){
                        this.configList()
                        this.delDialogClose()
                        Message.success("删除成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            configAdd(publish, blockId, title, matchStartTime, skipId, imgUrl){
                if(!!blockId){}else{ Message.error("请输入区域序号");return;}
                if(!!matchStartTime){}else{ Message.error("请输入开始时间");return}
                matchStartTime = new Date(matchStartTime).getTime()
                configAdd(publish, blockId, title, matchStartTime, skipId, imgUrl).then(res=>{
                    console.log("添加",res)
                    if(res.code==0){
                        this.configList()
                        this.addDialogClose()
                        Message.success("删除成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            configUpdate(publish, blockId, title, matchStartTime, skipId, imgUrl,configId){
                if(!!blockId){}else{ Message.error("请输入区域序号");return;}
                if(!!matchStartTime){}else{ Message.error("请输入开始时间");return}
                matchStartTime = new Date(matchStartTime).getTime()
                configUpdate(publish, blockId, title, matchStartTime, skipId, imgUrl,configId).then(res=>{
                    console.log("修改",res)
                    if(res.code==0){
                        this.configList()
                        this.editDialogClose()
                        Message.success("修改成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },

        },
    }
</script>


<style lang="scss" scoped>
    .home{
        box-sizing: border-box;
        width: 100%;
        padding:10px;
        .list{
            box-sizing: border-box;
            padding-top: 10px;
        }
        .dialog{
            width: 100%;
            .con{
                width: 100%;
                margin-bottom:80px;
                .item{
                    width: 100%;
                    height:60px;
                    display: flex;
                    align-items: center;
                    .label{
                        width: 70px;
                        flex-shrink: 0;
                    }
                    .input{
                        width: 100%;
                    }
                }
                .item:last-child{
                    margin-top: 10px;
                }
            }
            .foot{
                width: 400px;
                margin: 0 auto;
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

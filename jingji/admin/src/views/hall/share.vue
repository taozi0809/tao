<template>
    <div class="share">
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;">

                <el-table-column prop="SharePic" label="图片" width="450" align="center">
                    <template slot-scope="scope">
                        <el-image style="width:410px;" :src="scope.row.SharePic" :fit="'scale-down'"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="ItemID" label="奖励" width="150" >
                    <template slot-scope="scope">
                      {{scope.row.ItemName}}
                    </template>
                </el-table-column>
                <el-table-column prop="AwardNum" label="数量" width="150" ></el-table-column>
                <el-table-column prop="DailyLimit" label="每日获得次数"></el-table-column>

                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handClick(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="新邮件"
                    center
                    :before-close="handleClose"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog"
                    width="600px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">奖励：</div>
                        <div class="r">
                            <el-select v-model="row.ItemID" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in configs"
                                        :key="item.PropID"
                                        :label="item.Name"
                                        :value="item.PropID">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">奖励数量：</div>
                        <div class="r">
                            <el-input v-model.number="row.AwardNum" type="number"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">每日获得次数：</div>
                        <div class="r">
                            <el-input v-model.number="row.DailyLimit"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">上传图：</div>
                        <div class="r">
                            <el-upload
                                    class="avatar-uploader"
                                    action="123"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload">
                                <img v-if="row.SharePic" :src="row.SharePic" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>


                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose()">取 消</el-button>
                            <el-button type="primary" @click="editShareAward">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getShareAward,editShareAward,configList} from "../../service/api/api";
    import {baseUrl} from "../../service/base";
    import {mapState, mapMutations} from 'vuex'
    import axios from "axios"
    import {Message} from "element-ui";

    export default {
        data(){
            return{
                list:[],
                configs:[],
                isDialog:false,
                row:{},
            }
        },
        computed:{
            ...mapState(['token']),
        },
        created(){
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

                        this.row.SharePic=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            handClick(row){
                this.row={...row}
                this.isDialog=true
            },
            handleClose(){
                this.isDialog=false
            },
            configList(){
                configList().then(res=>{
                    console.log("道具列表",res)
                    if(res.code==1000){
                        this.getShareAward()
                        this.configs=res.resp.PropBaseConfigs
                    }
                })
            },
            getShareAward(){
                getShareAward().then(res=>{
                    console.log("获取奖励列表",res)
                    if(res.code==0){
                        this.configs.map((item) =>{
                            if(item.PropID==res.config.ItemID){
                                res.config['ItemName']=item.Name
                            }
                        })
                        this.list=[]
                        this.list.push(res.config)
                    }
                })
            },
            editShareAward(){
                editShareAward(this.row.SharePic,this.row.ItemID,this.row.AwardNum,this.row.DailyLimit).then(res=>{
                    console.log("编辑",res)
                    if(res.code==0){
                        Message.success("修改成功")
                        this.getShareAward()
                        this.handleClose()
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .list{
        box-sizing: border-box;
        padding: 20px;
    }
    .dialog-con{
        .t1{
            display: flex;
            align-items: center;
            margin-top: 20px;
            width: 100%;
            box-sizing: border-box;
            padding-right: 80px;
            .l{
                width: 100px;
                flex-shrink: 0;
                text-align-last: justify;
                text-align: justify;
            }
            .r{
                width: 100%;
                display: flex;
                align-items: center;
                .r-r{
                    flex-shrink: 0;
                    margin-left: 20px;
                }
                .box-card {
                    width: 100%;
                    .r-list{
                        display: flex;
                        align-items: center;
                        .n1{
                            width: 150px;
                        }
                        .n2{
                            width: 100px;
                        }
                        .n3{
                            width: 100px;
                        }
                    }
                }
            }
        }
        .tt{
            margin-top:100px;
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
        width:100px;
        height: 60px;
    }
    .avatar {
        width:100px;
        height: 60px;
        display: block;
    }
</style>

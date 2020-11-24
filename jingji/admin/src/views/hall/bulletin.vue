<template>
    <div class="marquee">
        <div class="header">
            <div class="item">
                <div class="m">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="change">
                    </el-date-picker>
                </div>
            </div>
            <div class="item">
                <div class="m">
                    <el-select v-model="status" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="m">
                    <el-button type="primary" @click="handClick1">添 加</el-button>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
<!--                <el-table-column type="index" :index="getInIndex" width="50" label="排序"></el-table-column>-->
                <el-table-column prop="Order" label="排序" width="50"></el-table-column>
                <el-table-column prop="Img" label="公告图片" width="100">
                    <template slot-scope="scope">
                        <el-image style="width:100px;" :src="scope.row.Img" :fit="'scale-down'"></el-image>
                    </template>
                </el-table-column>
<!--                <el-table-column prop="ColTitle" label="栏目标题" width="200"></el-table-column>-->
<!--                <el-table-column prop="NoticeTitle" label="公告标题" width="200"></el-table-column>-->
                <el-table-column prop="Status" label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Status==1">上架中</span>
                        <span v-if="scope.row.Status==2">已下架</span>
                    </template>
                </el-table-column>
                <el-table-column prop="PrevUpedAt" label="上架时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.PrevUpedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="PrevDownedAt" label="下架时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.PrevDownedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Operator" label="操作人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="280">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" @click="noticeUpdate(scope.row.ID,scope.row.Order,scope.row.ColTitle,scope.row.NoticeTitle,scope.row.PrevUpedAt,scope.row.PrevDownedAt,scope.row.Content,scope.row.Signature,2,scope.row.Img)" v-if="scope.row.Status==1">下架</el-button>
                        <el-button type="success" size="small" @click="noticeUpdate(scope.row.ID,scope.row.Order,scope.row.ColTitle,scope.row.NoticeTitle,scope.row.PrevUpedAt,scope.row.PrevDownedAt,scope.row.Content,scope.row.Signature,1,scope.row.Img)" v-if="scope.row.Status==2">上架</el-button>
                        <el-button type="primary" size="small" @click="handClick3(scope.row)">查看</el-button>
                        <el-button type="primary" size="small" @click="handClick2(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handClick4(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="activityList()"
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
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">排序：</div>
                        <div class="r">
                            <el-input v-model.number="Order"></el-input>
                        </div>
                    </div>
<!--                    <div class="t1">-->
<!--                        <div class="l">栏目标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="ColTitle"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="NoticeTitle"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告内容：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input-->
<!--                                    type="textarea"-->
<!--                                    :rows="3"-->
<!--                                    resize="none"-->
<!--                                    v-model="Content">-->
<!--                            </el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告落款：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="Signature" placeholder="分行用“，”隔开"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="t1">
                        <div class="l">活动图片：</div>
                        <div class="r">
                            <el-upload
                                    class="avatar-uploader"
                                    action="1a"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload">
                                <img v-if="Img" :src="Img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>

                    <div class="t1">
                        <div class="l">上架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="PrevUpedAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">下架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="PrevDownedAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>


                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1()">取 消</el-button>
                            <el-button type="primary" @click="noticeInsert">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="编辑"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">排序：</div>
                        <div class="r">
                            <el-input v-model.number="obj.Order"></el-input>
                        </div>
                    </div>
<!--                    <div class="t1">-->
<!--                        <div class="l">栏目标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.ColTitle"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.NoticeTitle"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告内容：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input-->
<!--                                    type="textarea"-->
<!--                                    :rows="3"-->
<!--                                    resize="none"-->
<!--                                    v-model="obj.Content">-->
<!--                            </el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告落款：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.Signature" placeholder="分行用“，”隔开"></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="t1">
                        <div class="l">活动图片：</div>
                        <div class="r">
                            <el-upload
                                    class="avatar-uploader"
                                    action="1a"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload1">
                                <img v-if="obj.Img" :src="obj.Img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">上架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.PrevUpedAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">下架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.PrevDownedAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>


                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="noticeUpdate(obj.ID,obj.Order,obj.ColTitle,obj.NoticeTitle,parseInt(obj.PrevUpedAt/1000),parseInt(obj.PrevDownedAt/1000),obj.Content,obj.Signature,obj.Status,obj.Img)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="查看"
                    center
                    :before-close="handleClose3"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog3"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">排序：</div>
                        <div class="r">
                            <el-input v-model.number="obj.Order" disabled></el-input>
                        </div>
                    </div>
<!--                    <div class="t1">-->
<!--                        <div class="l">栏目标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.ColTitle" disabled></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告标题：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.NoticeTitle" disabled></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告内容：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input-->
<!--                                    disabled-->
<!--                                    type="textarea"-->
<!--                                    :rows="3"-->
<!--                                    resize="none"-->
<!--                                    v-model="obj.Content">-->
<!--                            </el-input>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="t1">-->
<!--                        <div class="l">公告落款：</div>-->
<!--                        <div class="r">-->
<!--                            <el-input v-model="obj.Signature" placeholder="分行用“，”隔开" disabled></el-input>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="t1">
                        <div class="l">活动图片：</div>
                        <div class="r">
<!--                            <el-upload-->
<!--                                    :disabled="true"-->
<!--                                    class="avatar-uploader"-->
<!--                                    action="1a"-->
<!--                                    :show-file-list="false"-->
<!--                                    :before-upload="beforeUpload">-->
<!--                                <img v-if="obj.Img" :src="obj.Img" class="avatar">-->
<!--                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                            </el-upload>-->
                            <el-image style="width:200px;" :src="obj.Img" :fit="'scale-down'"></el-image>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">上架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.PrevUpedAt"
                                    type="datetime"
                                    disabled
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">下架时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.PrevDownedAt"
                                    type="datetime"
                                    disabled
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>


                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

        <div class="dialogMatch">
            <el-dialog
                    title="确定"
                    center
                    :before-close="handleClose4"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog4"
                    width="600px">
                <div class="dialog-con">
                    <div class="des">
                        您确定要删除此公告？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose4()">取 消</el-button>
                            <el-button type="primary" @click="noticeDelete(obj.ID)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {
        noticeInsert,
        noticeDelete,
        noticeList,
        noticeUpdate,
    } from "../../service/api/api";
    import {mapState, mapMutations} from 'vuex'
    import axios from "axios"
    import {baseUrl} from "../../service/base";

    export default {
        data(){
            return{
                time:[],
                status:-1,
                statusOptions:[
                    {
                        value:-1,
                        label:"全部"
                    },
                    {
                        value:1,
                        label:'上架中'
                    },
                    {
                        value:2,
                        label:'已下架'
                    },
                ],
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,
                StatusOptions:[
                    {
                        value:1,
                        label:'上架中'
                    },
                    {
                        value:2,
                        label:'已下架'
                    },
                ],

                isDialog1:false,
                isDialog2:false,
                isDialog3:false,
                isDialog4:false,
                obj:{},

                Order:1,
                ColTitle:"",
                NoticeTitle:"",
                PrevUpedAt:"",
                PrevDownedAt:"",
                Content:"",
                Signature:"",
                Img:""

            }
        },
        computed:{
            ...mapState(['token']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            var t1 = new Date()
            var t2 = new Date()
            this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
            this.noticeList()
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
                        this.Img=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            beforeUpload1(file){
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
                        this.obj.Img=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                    console.log(error);
                });
                return false
            },
            change(){
                this.noticeList()
            },
            handClick1(){
                this.isDialog1=true
                this.Order=""
                this.ColTitle=""
                this.NoticeTitle=""
                this.PrevUpedAt=""
                this.PrevDownedAt=""
                this.Content=""
                this.Signature=""
            },
            handClick2(i){
                this.obj={...i}
                this.obj.PrevUpedAt=this.obj.PrevUpedAt*1000
                this.obj.PrevDownedAt=this.obj.PrevDownedAt*1000
                this.isDialog2=true
            },
            handClick3(i){
                this.obj={...i}
                this.obj.PrevUpedAt=this.obj.PrevUpedAt*1000
                this.obj.PrevDownedAt=this.obj.PrevDownedAt*1000
                this.isDialog3=true
            },
            handClick4(i){
                if(i.Status==1){
                    Message.error("上架中不能删除")
                }else{
                    this.obj={...i}
                    this.isDialog4=true
                }
            },

            handleClose1(){
                this.isDialog1=false
            },
            handleClose2(){
                this.isDialog2=false
            },
            handleClose3(){
                this.isDialog3=false
            },
            handleClose4(){
                this.isDialog4=false
            },

            noticeList(){
                this.loading=true
                let Condition = {status:this.status}
                if(this.status==-1){Condition={}}
                noticeList(this.page,this.per,parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),Condition).then(res=>{
                    this.loading=false
                    console.log("公告列表",res)
                    if(res.code==1000){
                        this.list=res.resp.NoticeControls
                        this.count=res.resp.Total
                    }
                })
            },
            noticeUpdate(ID,Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Status,Img){
                noticeUpdate(ID,Order,ColTitle,NoticeTitle,PrevUpedAt,PrevDownedAt,Content,Signature,Status,Img).then(res=>{
                    console.log("编辑",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.noticeList()
                        this.handleClose2()
                    }
                })
            },
            noticeDelete(id){
                noticeDelete(id).then(res=>{
                    console.log("删除",res)
                    if(res.code==1000){
                        Message.success("删除成功")
                        this.noticeList()
                        this.handleClose4()
                    }
                })
            },
            noticeInsert(){
                noticeInsert(this.Order,this.ColTitle,this.NoticeTitle,parseInt(this.PrevUpedAt/1000),parseInt(this.PrevDownedAt/1000),this.Content,this.Signature,this.Img).then(res=>{
                    console.log("添加",res)
                    if(res.code==1000){
                        Message.success("新增成功")
                        this.noticeList()
                        this.handleClose1()
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        .item{
            margin-right: 20px;
        }
    }
    .list{
        box-sizing: border-box;
        padding:0 20px;
        width: 100%;
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
                width:84px;
                flex-shrink: 0;
            }
            .r{
                width: 100%;
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

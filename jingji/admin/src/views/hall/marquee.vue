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
                    <el-select v-model="level" placeholder="请选择" @change="change">
                        <el-option
                                v-for="item in levelOptions"
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
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="Name" label="通告名称" width="200"></el-table-column>
                <el-table-column prop="Level" label="等级排序" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Level==1">A</span>
                        <span v-if="scope.row.Level==2">B</span>
                        <span v-if="scope.row.Level==3">C</span>
                        <span v-if="scope.row.Level==4">D</span>
                    </template>
                </el-table-column>
                <el-table-column prop="CreatedAt" label="创建时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.CreatedAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="TakeEffectAt" label="发布时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.TakeEffectAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Duration" label="时间间隔(s)" width="120"></el-table-column>
                <el-table-column prop="ExpiredAt" label="结束时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.ExpiredAt | timestampToTime1}}
                    </template>
                </el-table-column>
                <el-table-column prop="LinkMatchID" label="关联赛事ID" width="150"></el-table-column>
                <el-table-column prop="Content" label="内容" width="200"></el-table-column>

                <el-table-column prop="Operator" label="操作人" width="150"></el-table-column>
                <el-table-column prop="UpdatedAt" label="操作时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.UpdatedAt | timestampToTime1}}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handClick2(scope.row)">修改</el-button>
                        <el-button type="warning" size="small" @click="handClick3(scope.row)" v-if="scope.row.Status==0">暂停</el-button>
                        <el-button type="warning" size="small" @click="handClick3(scope.row)" v-if="scope.row.Status==1">启动</el-button>
                        <el-button type="danger" size="small" @click="handClick4(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="horseLampList()"
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
                        <div class="l">通告名称：</div>
                        <div class="r">
                            <el-input v-model="Name"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">通告等级：</div>
                        <div class="r">
                            <el-select v-model="Level" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in LevelOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">发布时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="TakeEffectAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">结束时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="ExpiredAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">时长间隔：</div>
                        <div class="r">
                            <el-input v-model.number="Duration"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">关联赛事ID：</div>
                        <div class="r">
                            <el-input v-model="LinkMatchID"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">通告内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    resize="none"
                                    placeholder="(限30汉字已内)"
                                    v-model="Content">
                            </el-input>
                        </div>
                    </div>


                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1()">取 消</el-button>
                            <el-button type="primary" @click="horseLampInsert">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="修改"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">

                    <div class="t1">
                        <div class="l">通告名称：</div>
                        <div class="r">
                            <el-input v-model="obj.Name"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">通告等级：</div>
                        <div class="r">
                            <el-select v-model="obj.Level" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in LevelOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">发布时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.TakeEffectAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">结束时间：</div>
                        <div class="r">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="obj.ExpiredAt"
                                    type="datetime"
                                    value-format="timestamp"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">时长间隔：</div>
                        <div class="r">
                            <el-input v-model.number="obj.Duration"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">关联赛事ID：</div>
                        <div class="r">
                            <el-input v-model="obj.LinkMatchID"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">通告内容：</div>
                        <div class="r">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    resize="none"
                                    placeholder="(限30汉字已内)"
                                    v-model="obj.Content">
                            </el-input>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="horseLampUpdate">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="确定"
                    center
                    :before-close="handleClose3"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog3"
                    width="600px">
                <div class="dialog-con">
                    <div class="des">
                        您确定要{{obj.Status==0?'暂停':'启动'}}此公告？
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose3()">取 消</el-button>
                            <el-button type="primary" @click="timeoutUpdate(obj.ID,obj.Name,obj.Level,obj.ExpiredAt,obj.TakeEffectAt,obj.Duration,obj.LinkMatchID,obj.Content,obj.Status==0?1:0)">确 定</el-button>
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
                            <el-button type="primary" @click="horseLampDelete(obj.ID)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {horseLampList,horseLampDelete,horseLampInsert,horseLampUpdate} from "../../service/api/api";


    export default {
        data(){
            return{
                time:[],
                level:-1,
                levelOptions:[
                    {
                        value:-1,
                        label:"全部"
                    },
                    {
                        value:1,
                        label:'A'
                    },
                    {
                        value:2,
                        label:'B'
                    },
                    {
                        value:3,
                        label:'C'
                    },
                    {
                        value:4,
                        label:'D'
                    },
                ],
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                isDialog1:false,
                isDialog2:false,
                isDialog3:false,
                isDialog4:false,
                obj:{},

                Name:"",
                Level:"",
                ExpiredAt:"",
                TakeEffectAt:"",
                Duration:"",
                LinkMatchID:"",
                Content:"",

                LevelOptions:[
                    {
                        value:1,
                        label:'A'
                    },
                    {
                        value:2,
                        label:'B'
                    },
                    {
                        value:3,
                        label:'C'
                    },
                    {
                        value:4,
                        label:'D'
                    },
                ],
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created(){
            var t1 = new Date()
            var t2 = new Date()
            this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
            this.horseLampList()
        },
        methods:{
            change(){
                this.horseLampList()
            },
            handClick1(){
                this.isDialog1=true
            },
            handClick2(i){
                this.obj={...i}
                this.obj.ExpiredAt= this.obj.ExpiredAt*1000
                this.obj.TakeEffectAt= this.obj.TakeEffectAt*1000
                this.isDialog2=true
            },
            handClick3(i){
                this.obj={...i}
                this.isDialog3=true
            },
            handClick4(i){
                this.obj={...i}
                this.isDialog4=true
            },
            handleClose1() {
                this.isDialog1=false
                this.Name=""
                this.Level=""
                this.ExpiredAt=""
                this.TakeEffectAt=""
                this.Duration=""
                this.LinkMatchID=""
                this.Content=""
            },
            handleClose2() {
                this.isDialog2=false
            },
            handleClose3() {
                this.isDialog3=false
            },
            handleClose4() {
                this.isDialog4=false
            },

            horseLampList(){
                this.loading=true
                let Condition = {level:this.level}
                if(this.level==-1){Condition={}}
                horseLampList(this.page,this.per,parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),Condition).then(res=>{
                    this.loading=false
                    console.log("跑马灯列表",res)
                    if(res.code==1000){
                        this.list=res.resp.HorseLamp
                        this.count=res.resp.Total
                    }
                })
            },
            horseLampDelete(ID){
                horseLampDelete(ID).then(res=>{
                    console.log("删除跑马灯",res)
                    if(res.code==1000){
                        this.handleClose4()
                        Message.success("删除成功")
                        this.horseLampList()
                    }
                })
            },
            timeoutUpdate(ID,Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content,Status){
                horseLampUpdate(ID,Name,Level,ExpiredAt,TakeEffectAt,Duration,LinkMatchID,Content,Status).then(res=>{
                    console.log("暂停跑马灯",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.handleClose3()
                        this.horseLampList()

                    }
                })
            },
            horseLampInsert(){
                horseLampInsert(this.Name,this.Level,parseInt(this.ExpiredAt/1000),parseInt(this.TakeEffectAt/1000),this.Duration,this.LinkMatchID,this.Content).then(res=>{
                    console.log("添加跑马灯",res)
                    if(res.code==1000){
                        Message.success("添加成功")
                        this.handleClose1()
                        this.horseLampList()
                    }
                })
            },
            horseLampUpdate(){
                horseLampUpdate(this.obj.ID,this.obj.Name,this.obj.Level,parseInt(this.obj.ExpiredAt/1000),parseInt(this.obj.TakeEffectAt/1000),this.obj.Duration,this.obj.LinkMatchID,this.obj.Content,this.obj.Status).then(res=>{
                    console.log("修改跑马灯",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.handleClose2()
                        this.horseLampList()
                    }
                })
            },
        }
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

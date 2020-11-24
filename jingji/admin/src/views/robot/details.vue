<template>
    <div class="details">
        <div class="header">
            <div class="l">
                <div class="m"><el-button type="primary" @click="isDialog=true">添 加</el-button></div>
            </div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700"
                      v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">
                <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                <el-table-column prop="matchid" label="赛事ID" width="120"></el-table-column>
                <el-table-column label="赛事昵称" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.robotstatus==0" style="color: #67C23A;">{{scope.row.matchname}}</span>
                        <span v-if="scope.row.robotstatus==1" style="color: #F56C6C;">{{scope.row.matchname}}</span>
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="机器人数量" width="120"></el-table-column>
                <el-table-column label="机器人参赛数量" width="120">
                    <template slot-scope="scope">
                        <span style="color: #F56C6C;" v-if="scope.row.joinnum/scope.row.total>=0.8">{{scope.row.joinnum}}</span>
                        <span v-else>{{scope.row.joinnum}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="permaxnum" label="每场机器人上限" width="120"></el-table-column>
                <el-table-column prop="desc" label="温馨提示"></el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" v-if="scope.row.robotstatus==0" @click="robotStop(scope.row.matchid)">暂停机器人</el-button>
                        <el-button type="primary" size="small" v-if="scope.row.robotstatus==1" @click="robotStart(scope.row.matchid)">启动机器人</el-button>
                        <el-button type="primary" size="small" @click="change(scope.row)">修改</el-button>
                        <el-button type="danger"  size="small" @click="open(scope.row.matchid)">删除</el-button>
                    </template>
                </el-table-column>


            </el-table>
            <el-pagination
                    @current-change="robotMatchDetail()"
                    :current-page.sync="page"
                    :page-size="per"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <el-dialog
                title="添加"
                center
                :modal-append-to-body="false"
                :visible.sync="isDialog"
                width="600px"
                :before-close="handleClose">
            <div class="dialog-con">
                <div class="d1">
                    <div class="t">赛事ID：</div>
                    <div class="v">
                        <el-input v-model="match_id" placeholder="请输入赛事ID"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">机器人数量：</div>
                    <div class="v">
                        <el-input v-model.number="robot_num" placeholder="请输入机器人数量"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">每场赛事机器人上限：</div>
                    <div class="v">
                        <el-input v-model.number="per_match_num" placeholder="请输入每场赛事机器人上限"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">温馨提示：</div>
                    <div class="v">
                        <el-input type="textarea" :rows="5" placeholder="请输入温馨提示" v-model="desc" resize="none"></el-input>
                    </div>
                </div>
            </div>
            <div class="dialog-f">
                <el-button type="primary" @click="robotSave">确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="修改"
                center
                :modal-append-to-body="false"
                :visible.sync="isDialog2"
                width="600px"
                :before-close="handleClose">
            <div class="dialog-con">
                <div class="d1">
                    <div class="t">赛事ID：</div>
                    <div class="v">
                        <el-input v-model="info.matchid" placeholder="请输入赛事ID"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">机器人数量：</div>
                    <div class="v">
                        <el-input v-model.number="info.total" placeholder="请输入机器人数量"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">每场赛事机器人上限：</div>
                    <div class="v">
                        <el-input v-model.number="info.permaxnum" placeholder="请输入每场赛事机器人上限"></el-input>
                    </div>
                </div>
                <div class="d1">
                    <div class="t">温馨提示：</div>
                    <div class="v">
                        <el-input type="textarea" :rows="5" placeholder="请输入温馨提示" v-model="info.desc" resize="none"></el-input>
                    </div>
                </div>
            </div>
            <div class="dialog-f">
                <el-button type="primary" @click="changeRobotSave">确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </div>
        </el-dialog>

        <el-popconfirm title="此操作将会删除机器人，是否继续？">
            <el-button slot="reference">删除</el-button>
        </el-popconfirm>
    </div>
</template>

<script>
    import {robotMatchDetail,robotSave,robotStop,robotStart,robotDelete} from "../../service/api/api";
    import {Message,MessageBox} from "element-ui"
    import Vue from "vue"
    Vue.prototype.$message = MessageBox
    Vue.prototype.$prompt = MessageBox.prompt
    export default {
        data(){
            return{
                per:10,
                page:1,
                list:[],
                count:0,
                loading:false,

                isDialog:false,
                isDialog2:false,
                match_id:"",
                robot_num:"",
                per_match_num:"",
                desc:"",
                info:{},
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.robotMatchDetail()
        },
        methods:{
            handleClose(){
                this.isDialog=false
                this.isDialog2=false
                this.match_id=""
                this.robot_num=""
                this.per_match_num=""
                this.desc=""
            },
            open(match_id) {
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass:'zZindex',
                }).then(() => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                    this.robotDelete(match_id)
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            change(row){
                this.info=row
                this.isDialog2=true
            },
            robotMatchDetail(){
                let condition={
                    matchtype:this.$route.params.match_type
                }
                robotMatchDetail(this.page,this.per,condition).then(res=>{
                    console.log("赛事机器人数量详情",res)
                    if(res.code==1000){
                        this.list=res.resp.match_robot_nums
                        this.count=res.resp.total
                    }
                })
            },
            robotStop(match_id){
                robotStop(match_id).then(res=>{
                    console.log("暂停机器人",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.robotMatchDetail()
                    }
                })
            },
            robotStart(match_id){
                robotStart(match_id).then(res=>{
                    console.log("启动机器人",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.robotMatchDetail()
                    }
                })
            },
            robotDelete(match_id){
                robotDelete(match_id).then(res=>{
                    console.log("删除机器人",res)
                    if(res.code==1000){
                        Message.success("操作成功")
                        this.robotMatchDetail()
                    }
                })
            },
            robotSave(){
                if(!!this.match_id){}else{Message.error("请输入赛事ID"); return}
                if(!!this.robot_num){}else{Message.error("请输入机器人数量"); return}
                if(!!this.per_match_num){}else{Message.error("请输入每场赛事机器人上限"); return}
                robotSave(this.match_id,this.robot_num,this.per_match_num,this.desc,1).then(res=>{
                    console.log("新增机器人",res)
                    if(res.code==1000){
                        Message.success("新增成功")
                        this.handleClose()
                        this.robotMatchDetail()
                    }
                })
            },
            changeRobotSave(){
                if(!!this.info.matchid){}else{Message.error("请输入赛事ID"); return}
                if(!!this.info.total){}else{Message.error("请输入机器人数量"); return}
                if(!!this.info.permaxnum){}else{Message.error("请输入每场赛事机器人上限"); return}
                robotSave(this.info.matchid,this.info.total,this.info.permaxnum,this.info.desc,2).then(res=>{
                    console.log("修改机器人",res)
                    if(res.code==1000){
                        Message.success("修改成功")
                        this.handleClose()
                        this.robotMatchDetail()
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/header";
    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .dialog-con{
        .d1{
            display: flex;
            align-items: center;
            text-align: right;
            margin-bottom: 20px;
            .t{
                flex-shrink: 0;
                width:140px;
            }
            .v{
                width:340px;
                text-align: left;
            }
        }
    }
    .dialog-f{
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding:0 140px;
        padding-top: 50px;
    }
</style>
<style>
    .zZindex {
        z-index:9999999999999999 !important;
    }
</style>

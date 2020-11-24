<template>
    <div class="playconfighome">
        <div class="head">
            <el-button type="primary" @click="addDialog=true">添加玩法</el-button>
            <div class="r">
                <div class="r1">
                    <div class="label">跳转点：</div>
                    <div class="value">{{skipId}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="betTypes" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="rank" label="阶级" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.rank==1">普通</span>
                        <span v-if="scope.row.rank==2">推荐</span>
                        <span v-if="scope.row.rank==3">热门</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">常规玩法</span>
                        <span v-if="scope.row.type==2">特殊玩法</span>
                    </template>
                </el-table-column>
                <el-table-column prop="betTypeName" label="玩法" width="300"></el-table-column>

                <el-table-column prop="betMoney" label="投入球数" width="120"></el-table-column>
                <el-table-column prop="betUserCount" label="人数" width="120"></el-table-column>
                <el-table-column prop="status" label="玩法状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">结束</span>
                        <span v-if="scope.row.status==1">进行中</span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editDialogClick(scope.row)">修改</el-button>
                        <el-button type="primary" size="small" @click="$router.push({name:'bet',params:{betTypeId:scope.row.betTypeId,betTypeName:scope.row.betTypeName,type:scope.row.type}})">配置</el-button>
                        <el-button type="danger" size="small" @click="delDialogClick(scope.row)" :disabled="scope.row.status==0">结束</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="typeList(afterMatchId)"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialog">
            <el-dialog
                    title="添加"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="addDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="addDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">玩法类型：</div>
                        <div class="input">
                            <el-select v-model="type" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">玩法阶级：</div>
                        <div class="input">
                            <el-select v-model="rank" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in rankOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">玩法名称：</div>
                        <div class="input">
                            <el-input v-model="name"></el-input>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="addDialogClose">取 消</el-button>
                    <el-button type="primary" @click="typeAdd(afterMatchId,name,rank,type)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="修改"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="editDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="editDialogClose">
                <div class="con">
                    <div class="item" >
                        <div class="label">玩法类型：</div>
                        <div class="input">
                            <el-select v-model="editObj.type" placeholder="请选择" style="width: 100%;" disabled>
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">玩法阶级：</div>
                        <div class="input">
                            <el-select v-model="editObj.rank" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in rankOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">玩法名称：</div>
                        <div class="input">
                            <el-input v-model="editObj.betTypeName"></el-input>
                        </div>
                    </div>

                </div>
                <div class="foot">
                    <el-button @click="editDialogClose">取 消</el-button>
                    <el-button type="primary" @click="typeUpdate(editObj.betTypeId,editObj.betTypeName,editObj.rank,editObj.sort)">确 定</el-button>
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
                        您确定要结束此项吗？
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="delDialogClose">取 消</el-button>
                    <el-button type="primary" @click="typeFinish(delObj.betTypeId)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {typeList,typeAdd,typeUpdate,typeFinish} from "@/service/config";
    import {Message} from "element-ui";

    export default {
        data(){
            return{
                betTypes:[],
                loading:false,
                page:1,
                pageSize:10,
                count:0,
                afterMatchId:0,
                skipId:"",
                addDialog:false,
                name:"",
                rank:"",
                type:"",
                startTime:"",
                rankOptions:[
                    {
                        value:1,
                        label:"普通"
                    },
                    {
                        value:2,
                        label:"推荐"
                    },
                    {
                        value:3,
                        label:"热门"
                    },
                ],
                typeOptions:[
                    {
                        value:1,
                        label:"常规玩法"
                    },
                    {
                        value:2,
                        label:"特殊玩法"
                    },
                ],

                editDialog:false,
                editObj:{},

                delDialog:false,
                delObj:{},
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created() {
            this.afterMatchId=this.$route.params.matchId
            this.typeList(this.afterMatchId)
        },
        methods:{
            addDialogClose(){
                this.addDialog=false
                this.name=""
                this.rank=""
                this.type=""
                this.startTime=""
            },
            editDialogClick(row){
                this.editObj={...row}
                this.editDialog=true
            },
            editDialogClose(){
                this.editDialog=false
                this.editObj={}
            },
            delDialogClick(row){
                this.delObj={...row}
                this.delDialog=true
            },
            delDialogClose(){
                this.delDialog=false
                this.delObj={}
            },

            typeList(matchId){
                this.loading=true
                typeList(matchId,this.page,this.pageSize).then(res=>{
                    this.loading=false
                    console.log("玩法列表",res)
                    if(res.code==0){
                        this.betTypes=res.data.betTypes
                        this.count=res.data.total
                        this.skipId=res.data.skipId
                    }
                })
            },
            typeAdd(matchId,name,rank,type,startTime){
                if(!!name){}else{ Message.error("请输入玩法名称");return}
                if(!!rank){}else{ Message.error("请输入玩法阶级");return}
                if(!!type){}else{ Message.error("请输入玩法类型");return}
                // if(!!startTime){}else{ Message.error("请输入开始时间");return}
                // startTime = new Date(startTime).getTime()
                typeAdd(matchId,name,rank,type,startTime).then(res=>{
                    console.log("添加玩法",res)
                    if(res.code==0){
                        this.typeList(this.afterMatchId)
                        this.addDialogClose()
                        Message.success("添加成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            typeUpdate(betTypeId,name,rank,sort){
                typeUpdate(betTypeId,name,rank,sort).then(res=>{
                    console.log("修改玩法",res)
                    if(res.code==0){
                        this.typeList(this.afterMatchId)
                        this.editDialogClose()
                        Message.success("操作成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            typeFinish(betTypeId){
                typeFinish(betTypeId).then(res=>{
                    console.log("结束玩法",res)
                    if(res.code==0){
                        this.typeList(this.afterMatchId)
                        this.delDialogClose()
                        Message.success("操作成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
  .playconfighome{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    .head{
      position: relative;
      box-sizing: border-box;
      .r{
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        right: 0;
        height: 40px;
        .r1{
          display: flex;
          align-items: center;
          margin-left: 20px;
          .label{
            color: #909399;
            font-size: 18px;
          }
          .value{
            color: #333;
            font-size: 18px;
          }
        }
      }
    }
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

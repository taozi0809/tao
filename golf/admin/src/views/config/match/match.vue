<template>
    <div class="configmatchhome">
        <div class="head">
            <el-button type="primary" @click="addDialog=true">添加赛事</el-button>
            <div class="r">
                <div class="r1">
                    <div class="label">总竞猜额：</div>
                    <div class="value">{{betMoney }}</div>
                </div>
                <div class="r1">
                    <div class="label">总竞猜人数：</div>
                    <div class="value">{{ betUserCount }}</div>
                </div>
                <div class="r1">
                    <div class="label">跳转点：</div>
                    <div class="value">{{ skipId }}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="golfMatchs" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="matchName" label="赛事昵称" width="250"></el-table-column>
                <el-table-column prop="matchStartTime" label="开赛时间" width="200">
                    <template slot-scope="scope">
                        {{scope.row.matchStartTime | timestampToTime2}}
                    </template>
                </el-table-column>
                <el-table-column prop="matchBetMoney" label="投入球数" width="120"></el-table-column>
                <el-table-column prop="matchBetUserCount" label="人数" width="120"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status==0?'已结束':'未结束'}}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="exportDialogClick(scope.row.matchId)">导出</el-button>
                        <el-button type="primary" size="small" @click="$router.push({name:'guess',params:{matchId:scope.row.matchId}})">竞猜配置</el-button>
                        <el-button type="danger" size="small" @click="del(scope.row.matchId)" :disabled="scope.row.status!=1">结束</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="matchList()"
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
                        <div class="label">赛事昵称：</div>
                        <div class="input">
                            <el-input v-model="matchName"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">开赛时间：</div>
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
                </div>
                <div class="foot">
                    <el-button @click="addDialogClose">取 消</el-button>
                    <el-button type="primary" @click="matchAdd(matchName,matchStartTime)">确 定</el-button>
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
                        您确定要结束此赛事？
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="delDialogClose">取 消</el-button>
                    <el-button type="primary" @click="matchFinish(matchId)">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="dialog">
            <el-dialog
                    title="导出"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="exportDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="exportDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">玩法：</div>
                        <div class="input">
                            <el-select v-model="typeName" placeholder="请选择" style="width: 100%;" @change="typeNameChange">
                                <el-option
                                        v-for="item in typeNameOptions"
                                        :key="item.typeId"
                                        :label="item.typeName"
                                        :value="item.typeId">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">子项：</div>
                        <div class="input">
                            <el-select v-model="subitems" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in subitemsOptions"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="exportDialogClose">取 消</el-button>
                    <el-button type="primary" @click="exportBbetCensus(matchId,typeName,subitems)">导 出</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {matchList,matchAdd,matchFinish,exportSelection,exportBbetCensus} from "@/service/config";
    import {Message} from "element-ui";
    import {baseUrl} from "@/service/config/base";


    export default {
        data(){
            return{
                page:1,
                pageSize:10,
                betMoney:0,
                betUserCount:0,
                golfMatchs:[],
                loading:false,
                count:0,
                matchName:"",
                matchStartTime:"",
                skipId:"",

                addDialog:false,
                delDialog:false,
                matchId:"",

                exportDialog:false,
                typeName:"",
                typeNameOptions:[],
                subitems:"",
                subitemsOptions:[],

            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created() {
            this.matchList()
        },
        methods:{
            typeNameChange(){
                this.subitems=""
                this.subitemsOptions=[]
                this.subitemsOptions = this.typeNameOptions.find(item=>item.typeId==this.typeName).subitems
            },
            addDialogClose(){
                this.addDialog=false
                this.matchName=""
                this.matchStartTime=""
            },
            del(matchId){
                this.matchId=matchId
                this.delDialog=true
            },
            delDialogClose(){
                this.delDialog=false
            },
            exportDialogClick(matchId){
                this.matchId=matchId
                exportSelection(matchId).then(res=>{
                    console.log("比赛竞猜数据导出选项",res)
                    if(res.code==0){
                        this.typeNameOptions = res.data.matchCensusSelections

                    }
                })
                this.exportDialog=true
            },
            exportDialogClose(){
                this.exportDialog=false
                this.typeName=""
                this.typeNameOptions=[]
                this.subitems=""
                this.subitemsOptions=[]
            },

            matchList(){
                this.loading=true
                matchList(this.page,this.pageSize).then(res=>{
                    console.log("赛事列表",res)
                    this.loading=false
                    if(res.code==0){
                        this.golfMatchs=res.data.golfMatchs
                        this.betMoney=res.data.betMoney
                        this.betUserCount=res.data.betUserCount
                        this.count=res.data.total
                        this.skipId=res.data.skipId
                    }else{Message.error(res.message)}
                })
            },
            matchAdd(matchName,matchStartTime){
                if(!!matchName){}else{ Message.error("请输入赛事昵称");return;}
                if(!!matchStartTime){}else{ Message.error("请输入开始时间");return}
                matchStartTime = new Date(matchStartTime).getTime()
                matchAdd(matchName,matchStartTime).then(res=>{
                    console.log("添加赛事",res)
                    if(res.code==0){
                        this.matchList()
                        this.addDialogClose()
                        Message.success("添加成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            matchFinish(matchId){
                matchFinish(matchId).then(res=>{
                    console.log("结束",res)
                    if(res.code==0){
                        this.matchList()
                        this.delDialogClose()
                        Message.success("操作成功")
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            exportBbetCensus(matchId,typeId,code){
                if(!!matchId&&!!typeId&&!!code){
                    const href = `${baseUrl.bet}/export/bet_census?matchId=${matchId}&typeId=${typeId}&code=${code}`
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = href
                    document.body.appendChild(link);
                    link.click();
                    Message.success("导出成功")
                    this.exportDialogClose()
                }else{
                    Message.error("请选择")
                }

                // let typeName = this.typeNameOptions.find(item=>item.typeId==typeId).typeName
                // let name = this.subitemsOptions.find(item=>item.code==code).name
                // exportBbetCensus(matchId,typeId,code).then(res=>{
                //     // console.log('比赛竞猜数据导出（get方法请求）',res)
                //     //创建一个隐藏的a连接，
                //     const link = document.createElement('a');
                //     // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'});
                //     // link.style.display = 'none';
                //     //设置连接
                //     link.href = URL.createObjectURL(blob);
                //     link.download = `${typeName}-${name}`
                //     document.body.appendChild(link);
                //     //模拟点击事件
                //     link.click();
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .configmatchhome{
    box-sizing: border-box;
    width: 100%;
    padding:10px;
    .head{
      position: relative;
      width: 100%;
      box-sizing: border-box;
      .r{
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        right: 0;
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

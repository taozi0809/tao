<template>
    <div class="betdetail">
        <div class="head">
            <div class="l">竞猜详情-{{afterBetTypeName}}</div>
            <div class="r">
                <div class="r1">
                    <div class="label">竞猜项：</div>
                    <div class="value">{{afterBetSelectionName}}</div>
                </div>
                <div class="r2">
                    <div class="label">ID：</div>
                    <div class="value">{{afterBetSelectionId}}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <el-table :data="betRecords" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="50"></el-table-column>

                <el-table-column prop="userId" label="ID" width="150"></el-table-column>
                <el-table-column prop="nickName" label="昵称" width="200"></el-table-column>
                <el-table-column prop="betType" label="竞猜项" width="200"></el-table-column>
                <el-table-column prop="betMoney" label="下单球数" width="120"></el-table-column>
                <el-table-column prop="betTime" label="下单时间">
                    <template slot-scope="scope">
                        {{scope.row.betTime | timestampToTime2}}
                    </template>
                </el-table-column>


                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="betRecord(this.afterBetSelectionId)"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {betRecord} from "@/service/config";
    import {mapState,mapMutations} from "vuex"

    export default {
        data(){
            return{
                loading:false,
                page:1,
                pageSize:10,
                afterBetSelectionId:"",
                betRecords:[],
                count:0,
                afterBetSelectionName:"",
                afterBetTypeName:""
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.pageSize +1
            },
        },
        created() {
            this.afterBetSelectionId=this.$route.params.betSelectionId
            this.afterBetTypeName=this.$route.params.betTypeName
            this.betRecord(this.afterBetSelectionId)

            this.CURRENTDATA(this.$route.query)
        },
        methods:{
            ...mapMutations(['CURRENTDATA']),
            betRecord(betSelectionId){
                this.loading=true
                betRecord(betSelectionId,this.page,this.pageSize).then(res=>{
                    this.loading=false
                    console.log("投注列表",res)
                    if(res.code==0){
                        this.betRecords=res.data.betRecords
                        this.count=res.data.totle
                        if(res.data.betRecords.length>0){
                            this.afterBetSelectionName=res.data.betRecords[0].betType
                        }

                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .betdetail{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    .head{
      position: relative;
      box-sizing: border-box;
      .l{
        font-size: 24px;
        color: #909399;
      }
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
        .r2{
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
            margin-right: 10px;
          }
        }
      }
    }
    .head2{
      display: flex;
      align-items: center;
      margin-top: 20px;
      .item{
        margin-right: 20px;
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
        .list-odds{
          padding-top: 20px;
          height: inherit;
          .input{
            border: 1px solid #909399;
            box-sizing: border-box;
            padding:10px;
            .list-item{

              width: 100%;
              display: flex;
              align-items: center;
              .l1{
                width: 200px;
                flex-shrink: 0;
              }
              .l2{
                width: 100px;
                flex-shrink: 0;
              }
              .l3{
                width: 100%;
                box-sizing: border-box;
                padding-right: 10px;
                text-align: right;
              }
            }
          }

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


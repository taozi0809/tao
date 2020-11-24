<template>
  <div class="bonus">
    <div class="header">
      <div class="l">
        <div class="m m1">
          <el-select v-model="status" placeholder="请选择" @change="change">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="m">
          <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  unlink-panels
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  @change="change">
          </el-date-picker>
        </div>
        <div class="m">
          <el-button type="warning" @click="flowdataPaymentsClick">批量打款</el-button>
        </div>
        <div class="m">
          <el-button type="warning" @click="flowdataRefundsClick">批量退款</el-button>
        </div>
        <div class="m">
          <el-button type="primary" @click="dcClick">导出XLSX</el-button>
        </div>
        <div class="m">
          <div class="m m1">
            <el-switch
                    @change="changeOpt"
                    :width="40"
                    v-model="opt"
                    active-text="限额开启"
                    inactive-text="限额关闭">
            </el-switch>
          </div>
        </div>
      </div>
      <div class="s">
        <el-input placeholder="用户ID/昵称" prefix-icon="el-icon-search" v-model="condition" @input="change"></el-input>
      </div>
    </div>
    <div class="list">
      <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                element-loading-text="加载中"
                element-loading-background="rgba(255, 255, 255, .5)">
        <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
        <el-table-column prop="createdat" label="日期" width="180">
          <template slot-scope="scope">
            {{scope.row.created_at | timestampToTime1}}
          </template>
        </el-table-column>
        <el-table-column prop="accountid" label="用户ID" width="120"></el-table-column>
        <el-table-column prop="realname" label="实名昵称" width="150"></el-table-column>
        <el-table-column prop="taken_fee" label="已提现金额" width="120"></el-table-column>
        <el-table-column prop="atfer_tax_fee" label="税后奖金" width="120"></el-table-column>
        <el-table-column prop="change_amount" label="变动金额" width="120"></el-table-column>
        <el-table-column prop="act_money" label="体总下发金额" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" style="color: #66b1ff;cursor: pointer;" @click="copy(scope.row)">比赛获得</span>
            <span v-if="scope.row.status==1" style="color: #67c23a;">提奖中</span>
            <span v-if="scope.row.status==2" style="color: #e6a23c;">已提奖</span>
            <span v-if="scope.row.status==3" style="color: #f56c6c;">已退款</span>
            <span v-if="scope.row.status==4" style="color: #e6a23c;">平台赠送</span>
            <span v-if="scope.row.status==5" style="color: #67c23a;">签到获得</span>
          </template>
        </el-table-column>

        <el-table-column prop="desc" label="备注说明"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="flowdataPass(scope.row.id)" v-if="scope.row.status==1&&scope.row.pass_status==0">通过</el-button>
            <el-button type="warning" size="small" v-if="scope.row.status==1&&scope.row.pass_status==1" disable>已通过</el-button>
            <el-button type="warning" size="small" @click="flowdataPaymentClick(scope.row.id)" v-if="scope.row.status==1">打款</el-button>
            <el-button type="warning" size="small" @click="flowdataRefundClick(scope.row.id)" v-if="scope.row.status==1">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @current-change="flowdataHistory()"
              :current-page.sync="page"
              :page-size="per"
              layout="total, prev, pager, next, jumper"
              :total="count">
      </el-pagination>
    </div>
    <div class="dialogFlowdata">
      <el-dialog
              title="状态处理"
              center
              :modal-append-to-body="false"
              :visible.sync="dialogFlowdata"
              width="30%">
        <div class="dialog-con">
          <div class="dialog-radio" v-if="flowdata=='payments'||flowdata=='refunds'">
            <el-radio v-model="flowdata" label="payments" :disabled="flowdata!='payments'">已打款</el-radio>
            <el-radio v-model="flowdata" label="refunds" :disabled="flowdata!='refunds'">已退款</el-radio>
          </div>
          <div class="dialog-radio" v-if="flowdata=='payment'||flowdata=='refund'">
            <el-radio v-model="flowdata" label="payment" :disabled="flowdata!='payment'">已打款</el-radio>
            <el-radio v-model="flowdata" label="refund" :disabled="flowdata!='refund'">已退款</el-radio>
          </div>
          <div class="desc">
            <div class="d-t">备注</div>
            <div class="d-b">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="desc" resize="none">
              </el-input>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" @click="flowdataClick">确 定</el-button>
          <el-button @click="dialogFlowdata=false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {flowdataHistory,flowdataPayment,flowdataRefund,flowdataPayments,
    flowdataRefunds,flowdataExport,flowdataPass,switchLimit,statusLimit} from "../../service/api/api";
  import {Message} from "element-ui";
  import {JsonToExcel} from "../../util/tools/JsonToExcel";

  export default {
    data(){
      return{
        options: [{
          value: "",
          label: '全部'
        },
          //     {
          //     value: '0',
          //     label: '比赛获得'
          // },
          {
            value: '1',
            label: '提奖中'
          }, {
            value: '2',
            label: '已打款'
          }, {
            value: '3',
            label: '已退款'
          },
          // {
          //     value: '5',
          //     label: '签到获得'
          // }
        ],
        status:"",
        time:"",
        condition:"",
        per:10,
        page:1,
        list:[],
        count:0,
        loading:false,
        dialogFlowdata:false,
        flowdata:"",
        desc:"",
        id:"",
        isJsonToExcel:false,
        opt:false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    computed:{
      getInIndex(){
        return (this.page - 1) * this.per +1
      },
    },
    created() {
      var t1 = new Date()
      var t2 = new Date()
      this.time=[t1.setTime(t1.getTime() - 3600 * 1000 * 24 * 30),t2]
      this.flowdataHistory()
      this.statusLimit()
    },
    methods:{
      change(){
        if(!!this.time){
          this.flowdataHistory()
        }
      },
      copy(e){
        this.$copyText(e.match_id).then(res=>{
          Message.success("复制成功")
        },err=>{
          Message.error("复制失败")
        })
      },
      changeOpt(){
        this.switchLimit()
      },
      statusLimit(){
        statusLimit().then(res=>{
          console.log("限额状态",res)
          if(res.code==1000){
              this.opt=res.resp
          }
        })
      },
      switchLimit(){
        switchLimit().then(res=>{
          console.log("限额开关",res)
          if(res.code==1000){
            this.statusLimit()
          }
        })
      },
      flowdataHistory(){
        this.loading=true
        var condition=[]
        if(!!this.status){
          condition = this.condition.length>0?[this.status,this.condition]:[this.status]
        }else{
          condition = this.condition.length>0?[this.condition]:[]
        }
        flowdataHistory(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,this.per,condition).then(res=>{
          console.log("流水记录",res)
          this.loading=false
          if(res.code==1000){
            this.list=res.resp.flow_datas
            this.count=res.resp.total
          }
        })
      },
      flowdataPaymentClick(id){
        this.id=id
        this.dialogFlowdata=true
        this.flowdata='payment'
        this.desc=''

      },
      flowdataRefundClick(id){
        this.id=id
        this.dialogFlowdata=true
        this.flowdata='refund'
        this.desc=''

      },
      flowdataPaymentsClick(){
        if(!!this.isJsonToExcel){
          this.dialogFlowdata=true
          this.flowdata='payments'
          this.desc=''
        }
      },
      flowdataRefundsClick(){
        if(!!this.isJsonToExcel){
          this.dialogFlowdata=true
          this.flowdata='refunds'
          this.desc=''
        }else{
          Message.error("导出XLSX才可批量处理")
        }
      },
      flowdataPass(id){
        flowdataPass(id).then(res=>{
          console.log("通过",res)
          if(res.code==1000){
            Message.success("操作成功")
            this.flowdataHistory()
          }
        })
      },
      flowdataClick(){
        this.loading=true
        if(this.flowdata=='payment'){
          flowdataPayment(this.id,this.desc).then(res=>{
            this.loading=false
            if(res.code==1000){
              Message.success("操作成功")
              this.flowdataHistory()
              this.dialogFlowdata=false
              this.desc=""
            }
          })
        }
        if(this.flowdata=='refund'){
          flowdataRefund(this.id,this.desc).then(res=>{
            this.loading=false
            if(res.code==1000){
              Message.success("操作成功")
              this.flowdataHistory()
              this.dialogFlowdata=false
              this.desc=""
            }
          })
        }
        if(this.flowdata=='payments'){
          this.loading=true
          var condition=[]
          if(!!this.status){
            condition = this.condition.length>0?[this.status,this.condition]:[this.status]
          }else{
            condition = this.condition.length>0?[this.condition]:[]
          }

          flowdataHistory(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,20000,condition).then(res=>{
            console.log("流水记录",res)
            if(res.code==1000){
              var arr= res.resp.flow_datas
              var arrIds=[]
              for(let i in arr){
                if(arr[i].status==1){
                  arrIds.push(arr[i].id)
                }
              }
              flowdataPayments(arrIds,this.desc).then(res=>{
                this.loading=false
                if(res.code==1000){
                  this.dialogFlowdata=false
                  this.desc=""
                  Message.success("批量打款成功")
                  this.flowdataHistory()
                }
              })
            }
          })
        }
        if(this.flowdata=='refunds'){
          this.loading=true
          var condition=[]
          if(!!this.status){
            condition = this.condition.length>0?[this.status,this.condition]:[this.status]
          }else{
            condition = this.condition.length>0?[this.condition]:[]
          }
          flowdataHistory(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),this.page,20000,condition).then(res=>{
            console.log("流水记录",res)
            if(res.code==1000){
              var arr= res.resp.flow_datas
              var arrIds=[]
              for(let i in arr){
                if(arr[i].status==1){
                  arrIds.push(arr[i].id)
                }
              }
              flowdataRefunds(arrIds,this.desc).then(res=>{
                this.loading=false
                if(res.code==1000){
                  this.dialogFlowdata=false
                  this.desc=""
                  Message.success("批量退款成功")
                  this.flowdataHistory()
                }
              })
            }
          })
        }
      },
      dcClick(){
        this.loading=true
        var condition=[]
        if(!!this.status){
          condition = this.condition.length>0?[this.status,this.condition]:[this.status]
        }else{
          condition = this.condition.length>0?[this.condition]:[]
        }
        flowdataExport(parseInt(this.time[0]/1000),parseInt(this.time[1]/1000),condition).then(res=>{
          this.loading=false
          if(res.code==1000){
            console.log('导出数据',res)
            if(res.resp instanceof Array){
              if(res.resp.length>0){
                this.isJsonToExcel=true

                JsonToExcel(res.resp,
                        `奖金提现表-${this.time[0]}-${this.time[1]}`, "",
                        ["用户ID","用户手机号","用户实名认证名称","用户银行卡号","银行名称","用户开户行昵称","提现金额"])
              }else{
                Message.error("没有可导出数据")
              }
            }else{
              Message.error("没有可导出数据")
            }
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/header";
  .m1{
    min-width: 200px !important;
    flex-shrink: 0;
  }
  .list{
    box-sizing: border-box;
    padding: 0 10px;
  }
  .dialog-con{
    .desc{
      margin-top: 10px;
      .d-t{
        font-size: 16px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        font-family: 微软雅黑;
      }
      .b-t{
        color: #333;
        font-size: 14px;
      }
    }
  }
  .dialog-footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-top:20px;
  }
</style>

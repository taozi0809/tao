<template>
    <div class="set">
       <div class="list">
           <el-tabs v-model="activeName">

               <el-tab-pane label="参赛时长" name="参赛时长">
                   <div class="btn"><el-button type="primary" @click="edit1">修 改</el-button></div>
                   <el-table :data="list1" style="width: 100%;margin-bottom: 10px;" border>
                       <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                       <el-table-column label="时长（分钟）" width="180">
                           <template slot-scope="scope">
                               {{scope.row.TargetAmount/60}}
                           </template>
                       </el-table-column>
                       <el-table-column prop="Item" label="奖励类型" width="180">
                           <template slot-scope="scope">
                               {{scope.row.Item | ItemToStr(ItemOptions)}}
                           </template>
                       </el-table-column>
                       <el-table-column prop="AwardAmount" label="奖励数量" width="120"></el-table-column>
                       <el-table-column prop="Operator" label="操作人"></el-table-column>
                   </el-table>

               </el-tab-pane>

               <el-tab-pane label="额外奖励" name="额外奖励">
                  <div class="btn"><el-button type="primary" @click="edit2">修 改</el-button></div>
                   <el-table :data="list2" style="width: 100%;margin-bottom: 10px;" border>
                       <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                       <el-table-column prop="TargetAmount" label="参赛数（次）" width="180"></el-table-column>
                       <el-table-column prop="Item" label="奖励类型" width="180">
                           <template slot-scope="scope">
                               {{scope.row.Item | ItemToStr(ItemOptions)}}
                           </template>
                       </el-table-column>
                       <el-table-column prop="AwardAmount" label="奖励数量" width="120"></el-table-column>
                       <el-table-column prop="Operator" label="操作人"></el-table-column>
                   </el-table>
               </el-tab-pane>

           </el-tabs>
       </div>


        <div class="dialogMatch">
            <el-dialog
                    title="修改参赛时长"
                    center
                    :before-close="handleClose1"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog1"
                    width="600px">
                <div class="dialog-con">
                    <el-table :data="list1" style="width: 100%;margin-bottom: 10px;" border>
                        <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                        <el-table-column label="时长（秒）" width="150">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.TargetAmount" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Item" label="奖励类型" width="150">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.Item" placeholder="请选择">
                                    <el-option
                                            v-for="item in ItemOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="AwardAmount" label="奖励数量">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.AwardAmount" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose1()">取 消</el-button>
                            <el-button type="primary" @click="editDailyWelfareConfig(1 ,list1)">确 定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="修改额外奖励"
                    center
                    :before-close="handleClose2"
                    :modal-append-to-body="false"
                    :visible.sync="isDialog2"
                    width="600px">
                <div class="dialog-con">
                    <el-table :data="list2" style="width: 100%;margin-bottom: 10px;" border>
                        <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>
                        <el-table-column label="参赛数（次）" width="150">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.TargetAmount" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Item" label="奖励类型" width="150">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.Item" placeholder="请选择">
                                    <el-option
                                            v-for="item in ItemOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="AwardAmount" label="奖励数量">
                            <template slot-scope="scope">
                                <el-input v-model.number="scope.row.AwardAmount" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button @click="handleClose2()">取 消</el-button>
                            <el-button type="primary" @click="editDailyWelfareConfig(2,list2)">确 定</el-button>
                        </div>
                    </div>

                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {getDailyWelfareConfig,editDailyWelfareConfig,configList} from "../../service/api/api";
    import {Message} from "element-ui";

    export default {
        data(){
            return{
                page:1,
                per:10,
                list1:[],
                list2:[],
                list:[],
                activeName: '参赛时长',
                isDialog1:false,
                isDialog2:false,
                ItemOptions:[],
            }
        },
        computed:{
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.configList()

        },
        methods:{
            configList(){
                configList(this.page,10000).then(res=>{
                    console.log("道具列表",res)
                    if(res.code==1000){
                        for(let i in res.resp.PropBaseConfigs){
                            this.ItemOptions.push({
                                value:res.resp.PropBaseConfigs[i].PropID,
                                label:res.resp.PropBaseConfigs[i].Name
                            })
                        }
                        this.getDailyWelfareConfig()
                    }
                })
            },
            edit1(){
                this.isDialog1=true
            },
            edit2(){
                this.isDialog2=true
            },
            handleClose1(){
                this.isDialog1=false
                this.getDailyWelfareConfig()
            },
            handleClose2(){
                this.isDialog2=false
                this.getDailyWelfareConfig()
            },
            getDailyWelfareConfig(){
                getDailyWelfareConfig().then(res=>{
                    console.log("每日福利列表",res)
                    if(res.code==0){
                        this.list=res.list
                        this.list1=res.list.ConfigList[0].AwardList
                        this.list2=res.list.ConfigList[1].AwardList
                        for(let i in this.list1){
                            this.list1[i]['Operator']=res.list.ConfigList[0].Operator
                        }
                        for(let i in this.list2){
                            this.list2[i]['Operator']=res.list.ConfigList[1].Operator
                        }
                    }
                })
            },
            editDailyWelfareConfig(type,list){
                editDailyWelfareConfig({
                    AwardList:list,
                    WelfareType:type
                }).then(res=>{
                    console.log("编辑",res)
                    if(res.code==0){
                        Message.success("编辑成功")
                        this.handleClose1()
                        this.handleClose2()
                        this.getDailyWelfareConfig()
                    }
                })
            }

        },
        filters: {
            ItemToStr: function (value,list) {
                var s=''
                for(let i in list){
                    if(value==list[i].value){
                        s=list[i].label
                    }
                }
                return s
            }
        }
    }
</script>

<style lang="scss" scoped>

    .list{
        box-sizing: border-box;
        padding: 0 10px;
    }
    .btn{
        box-sizing: border-box;
        padding-bottom: 10px;
    }
    .dialog-con{
        .tt{
            margin: 0 auto;
            margin-top:40px;
            width: 400px;
            .r{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>

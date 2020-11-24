<template>
    <div class="bethomehome">
        <div class="head">
            <div class="l">{{ afterBetTypeName }}</div>
            <div class="r">
                <div class="r1">
                    <div class="label">跳转点：</div>
                    <div class="value">{{ skipId }}</div>
                </div>
                <div class="r2">
                    <div class="label">下单截止时间：</div>
                    <div class="value">
                        <el-date-picker
                                style="width: 100%;"
                                v-model="deadlineTime"
                                type="datetime"
                                range-separator="至"
                                unlink-panels
                                format="yyyy-MM-dd HH:mm:ss"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </div>
                    <div class="v">
                        <el-button type="primary" @click="deadlineUpdate(deadlineTime)">修改</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="head2">
            <div class="item">
                <el-button type="primary">导入数据</el-button>
            </div>
            <div class="item">
                <el-button type="primary">结算</el-button>
            </div>
            <div class="item">
                <el-button type="primary">全部退单</el-button>
            </div>
            <div class="item">
                <el-button type="primary" @click="addDialogBet=true">添加竞猜项</el-button>
            </div>
            <div class="item">
                <el-button type="primary" @click="desDialog=true">玩法说明</el-button>
            </div>
            <div class="item">
                <el-button type="primary" @click="batchDialog=true" v-if="afterType==2">批处理</el-button>
            </div>
            <div class="item">
                <el-button type="primary" @click="setTopDialogClick" v-if="afterType==2">置顶</el-button>
            </div>

            <div class="r" v-if="afterType==2">
                <div class="label">筛选</div>
                <div class="value">
                    <el-select v-model="customize3" placeholder="请选择" style="width: 100%;" @change="selectCustomize3">
                        <el-option
                                v-for="item in customizeOptions3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>

        <div class="list">
            <el-table :data="betSelections" style="width: 100%;margin-bottom: 10px;" border height="700"
                      v-loading="loading"
                      element-loading-text="加载中"
                      element-loading-background="rgba(255, 255, 255, .5)">

                <el-table-column type="index" :index="getInIndex" label="序号" width="60"></el-table-column>

                <el-table-column prop="customize" label="自定义" width="200" v-if="afterType==2"></el-table-column>
                <el-table-column prop="betSelectionName" label="竞猜项" width="200"></el-table-column>
                <el-table-column prop="betSelectionEnName" label="Quiz item" width="200"></el-table-column>
                <el-table-column prop="matchStartTime" label="开赛时间" width="200" v-if="afterType==2">
                    <template slot-scope="scope">
                        {{ scope.row.matchStartTime | timestampToTime2 }}
                    </template>
                </el-table-column>
                <el-table-column prop="odds" label="赔率" width="120"></el-table-column>
                <el-table-column prop="betMoney" label="球数" width="120"></el-table-column>
                <el-table-column prop="betUserCount" label="人数" width="120"></el-table-column>
                <el-table-column prop="" label="结算状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">未结算</span>
                        <span v-if="scope.row.status==1">胜</span>
                        <span v-if="scope.row.status==2">并列</span>
                        <span v-if="scope.row.status==3">退单</span>
                        <span v-if="scope.row.status==4">负</span>
                    </template>
                </el-table-column>

                <el-table-column prop="scope.row.hot" label="设置人气选手" width="150" v-if="afterType==1">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.hot" placeholder="请选择" @change="hotChange(scope.row)">
                            <el-option
                                    v-for="item in hotOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">

                        <el-button type="primary" size="small" @click="editDialogBetClick(scope.row)">修改</el-button>
                        <el-button type="primary" size="small"
                                   @click="$router.push({name:'betdetail',params:{betSelectionId:scope.row.betSelectionId,betTypeName:afterBetTypeName},query:{page:page,customize3:customize3=='全部'?'全部':customizeOptions3[customize3*1+1].label}})">
                            查看
                        </el-button>
                        <el-button type="warning" size="small"
                                   @click="openSet(scope.row.betSelectionId,scope.row.open==0?1:0)">
                            {{ scope.row.open == 1 ? '关闭' : '开启' }}
                        </el-button>
                        <el-button type="danger" size="small" @click="settlementClick(scope.row)"
                                   :disabled="scope.row.status!=0">结算
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="selectionList(afterBetTypeId,customize3=='全部'?undefined:customizeOptions3[customize3*1+1].label)"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </div>

        <div class="dialog">
            <el-dialog
                    title="添加竞猜项"
                    center
                    :close-on-click-modal="false"
                    :visible.sync="addDialogBet"
                    :modal-append-to-body="false"
                    :width="afterType==2?'900px':'600px'"
                    :before-close="addDialogBetClose">
                <div class="con">
                    <div class="item" v-if="afterType==2">
                        <div class="label">自定义：</div>
                        <div class="input">
                            <el-input v-model="customize"></el-input>
                        </div>
                    </div>
                    <div class="item" v-if="afterType==2">
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
                    <div class="item">
                        <div class="label">竞猜项：</div>
                        <div class="input">
                            <el-input v-model="betSelectionName"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">Quiz item：</div>
                        <div class="input">
                            <el-input v-model="betSelectionEnName"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">赔率：</div>
                        <div class="input">
                            <el-input v-model="betSelectionOdds" type="number"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label"></div>
                        <div class="input">
                            <el-button type="primary" @click="addBetSelection">添 加</el-button>
                        </div>
                    </div>

                    <div class="item list-odds" v-if="betSelection.length>0">
                        <div class="label"></div>
                        <div class="input">
                            <div class="list-item">
                                <div class="l1" v-if="afterType==2">自定义</div>
                                <div class="l1" v-if="afterType==2">开赛时间</div>
                                <div class="l1">竞猜项</div>
                                <div class="l1-1">Quiz item</div>
                                <div class="l2">赔率</div>
                                <div class="l3">操作</div>
                            </div>
                            <div class="list-item" v-for="(item,index) in betSelection">
                                <div class="l1" v-if="afterType==2">{{ item.customize }}</div>
                                <div class="l1" v-if="afterType==2">{{ item.matchStartTime | timestampToTime2 }}</div>
                                <div class="l1">{{ item.betSelectionName }}</div>
                                <div class="l1-1">{{ item.betSelectionEnName }}</div>
                                <div class="l2">{{ item.betSelectionOdds }}</div>
                                <div class="l3">
                                    <el-button type="text" @click="delBetSelection(index)">删除</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="addDialogBetClose">取 消</el-button>
                    <el-button type="primary" @click="selectionAdd(afterBetTypeId,betSelection)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="修改竞猜项"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="editDialogBet"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="editDialogBetClose">
                <div class="con">
                    <div class="item">
                        <div class="label">竞猜项：</div>
                        <div class="input">
                            <el-input v-model="editObj.betSelectionName" disabled></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">赔率：</div>
                        <div class="input">
                            <el-input v-model="editObj.odds" type="number"></el-input>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="editDialogBetClose">取 消</el-button>
                    <el-button type="primary" @click="selectionUpdate(editObj.betSelectionId,editObj.odds*1)">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="结算"
                    :close-on-click-modal="false"
                    center
                    :visible.sync="settlementDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="settlementDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">胜负：</div>
                        <div class="input">
                            <el-select v-model="settlement" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in settlementOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item" v-if="settlement==4">
                        <div class="label">并列：</div>
                        <div class="input">
                            <el-input v-model="settlementCount" type="number"></el-input>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="settlementDialogClose">取 消</el-button>
                    <el-button type="primary"
                               @click="selectionSettlement(settlementObj.betSelectionId,settlement,settlementCount)">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="玩法说明"
                    :close-on-click-modal="false"
                    center
                    :before-close="desDialogClose"
                    :modal-append-to-body="false"
                    :visible.sync="desDialog"
                    width="600px">
                <div class="con">
                    <div class="des">
                        <el-input
                                type="textarea"
                                :rows="10"
                                resize="none"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="desDialogClose">取 消</el-button>
                    <el-button type="primary" @click="tipsUpdate(afterBetTypeId,textarea)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                    title="批处理"
                    center
                    :close-on-click-modal="false"
                    :visible.sync="batchDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="batchDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">自定义：</div>
                        <div class="input">
                            <el-select v-model="customize2" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in customizeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">开赛时间：</div>
                        <div class="input">
                            <el-date-picker
                                    style="width: 100%;"
                                    v-model="matchStartTime2"
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

                        <el-radio-group v-model="radio">
                            <el-radio @click.native.prevent="clickitem('1')" label="1">开 启</el-radio>
                            <el-radio @click.native.prevent="clickitem('2')" label="2">关 闭</el-radio>
                            <el-radio @click.native.prevent="clickitem('3')" label="3">隐 藏</el-radio>
                            <el-radio @click.native.prevent="clickitem('4')" label="4">展 示</el-radio>
                            <el-radio @click.native.prevent="clickitem('5')" label="5">删 除</el-radio>
                        </el-radio-group>

                    </div>
                </div>
                <div class="foot">
                    <el-button @click="batchDialogClose">取 消</el-button>
                    <el-button type="primary" @click="batchDialogSubmit">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="dialog">
            <el-dialog
                    title="置顶"
                    center
                    :close-on-click-modal="false"
                    :visible.sync="setTopDialog"
                    :modal-append-to-body="false"
                    width="600px"
                    :before-close="setTopDialogClose">
                <div class="con">
                    <div class="item">
                        <div class="label">轮数：</div>
                        <div class="input">
                            <el-select v-model="round" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in roundOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">洞数：</div>
                        <div class="input">
                            <el-select v-model="topType" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in topTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <el-button @click="setTopDialogClose">取 消</el-button>
                    <el-button type="primary" @click="setTop(round,topType)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        selectionList, selectionAdd, selectionUpdate, selectionSettlement, deadlineUpdate, tipsUpdate, openSet,
        openBatchSet, showBatchSet, starttimeBatchSet,selectionHotSet,setTop,
    } from "@/service/config";
    import {Message} from "element-ui";
    import {mapState,mapMutations} from "vuex"

    export default {
        data() {
            return {
                afterMatchId: 0,
                afterBetTypeId: 0,
                afterBetTypeName: "",
                deadlineTime: "",
                skipId: "",
                afterType: "",

                page: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                betSelections: [],

                addDialogBet: false,
                betSelectionName: "",
                betSelectionOdds: "",
                betSelection: [],
                customize: "",
                matchStartTime: "",
                betSelectionEnName: "",

                editDialogBet: false,
                editObj: {},

                settlementDialog: false,
                settlementObj: {},
                settlement: "",
                settlementOptions: [
                    {
                        value: 1,
                        label: "胜"
                    },
                    {
                        value: 2,
                        label: "负"
                    },
                    {
                        value: 3,
                        label: "退单"
                    },
                    {
                        value: 4,
                        label: "并列"
                    },
                ],
                settlementCount: "",

                desDialog: false,
                textarea: "",

                batchDialog: false,
                customize2: '0',
                customizeOptions: [],
                matchStartTime2: "",

                customize3: "全部",
                customizeOptions3: [],

                radio: "",
                hotOptions:[
                    {
                        value:0,
                        label:"普通"
                    },
                    {
                        value:1,
                        label:"人气"
                    },
                ],

                setTopDialog:false,
                round:1,
                topType:1,
                roundOptions:[
                    {
                        value:1,
                        label:"第一轮"
                    },
                    {
                        value:2,
                        label:"第二轮"
                    },
                    {
                        value:3,
                        label:"第三轮"
                    },
                    {
                        value:4,
                        label:"第四轮"
                    },
                ],
                topTypeOptions:[
                    {
                        value:1,
                        label:"置顶前9洞"
                    },
                    {
                        value:2,
                        label:"置顶后9洞"
                    },
                ],

            }
        },
        computed: {
            ...mapState(['currentdata']),
            getInIndex() {
                return (this.page - 1) * this.pageSize + 1
            },
        },

        created() {
            this.afterMatchId = this.$route.params.matchId
            this.afterBetTypeId = this.$route.params.betTypeId
            this.afterBetTypeName = this.$route.params.betTypeName
            this.afterType = this.$route.params.type

            if(this.currentdata && Object.keys(this.currentdata).length){
                this.page=this.currentdata.page>0?this.currentdata.page:1
                this.customize3=typeof (this.currentdata.customize3)=='string'?this.currentdata.customize3:undefined
                this.selectionList(this.afterBetTypeId,this.customize3=='全部'?undefined:this.customize3)
            }else{
                this.selectionList(this.afterBetTypeId)
            }
        },
        methods: {
            ...mapMutations(['CURRENTDATA']),
            addDialogBetClose() {
                this.addDialogBet = false
                this.betSelectionName = ""
                this.betSelectionOdds = ""
                this.betSelection = []
                this.customize = ""
                this.matchStartTime = ""
                this.betSelectionEnName = ""
            },
            addBetSelection() {
                if (!!this.betSelectionOdds) {
                } else {
                    Message.error("请输入赔率");
                    return;
                }
                if (this.afterType == 2) {
                    this.betSelection.push({
                        customize: this.customize,
                        matchStartTime: new Date(this.matchStartTime).getTime(),
                        betSelectionName: this.betSelectionName,
                        betSelectionEnName: this.betSelectionEnName,
                        betSelectionOdds: this.betSelectionOdds,
                    })
                } else {
                    this.betSelection.push({
                        betSelectionName: this.betSelectionName,
                        betSelectionEnName: this.betSelectionEnName,
                        betSelectionOdds: this.betSelectionOdds,
                    })
                }

                this.betSelectionName = ""
                this.betSelectionEnName = ""
                this.betSelectionOdds = ""
            },
            delBetSelection(index) {
                this.betSelection.splice(index, 1)
            },
            editDialogBetClick(row) {
                this.editObj = {...row}
                this.editDialogBet = true
            },
            editDialogBetClose() {
                this.editDialogBet = false
                this.editObj = {}
            },
            settlementClick(row) {
                this.settlementObj = {...row}
                this.settlementDialog = true
            },
            settlementDialogClose() {
                this.settlementDialog = false
                this.settlementObj = {}
            },
            desDialogClose() {
                this.desDialog = false
                this.textarea = ""
            },
            batchDialogClose() {
                this.batchDialog = false
                this.radio = 0
                this.matchStartTime2 = ""
            },
            clickitem(e) {
                e == this.radio ? this.radio = 0 : this.radio = e
            },
            batchDialogSubmit() {
                var customize = this.customizeOptions[this.customize2].label
                var startTime = new Date(this.matchStartTime2).getTime()
                if (!!this.matchStartTime2) {
                    this.starttimeBatchSet(customize, startTime)
                }
                if (this.radio == 1) {
                    this.openBatchSet(customize, 1)
                }
                if (this.radio == 2) {
                    this.openBatchSet(customize, 0)
                }
                if (this.radio == 3) {
                    this.showBatchSet(customize, 0)
                }
                if (this.radio == 4) {
                    this.showBatchSet(customize, 1)
                }
                if (this.radio == 5) {

                }
                this.batchDialog = false
                this.matchStartTime2 = ""
                this.radio = "0"

            },
            selectCustomize3() {
                this.page=1
                if (this.customize3 == '全部') {
                    this.selectionList(this.afterBetTypeId, undefined)
                } else {
                    this.selectionList(this.afterBetTypeId, this.customizeOptions3[this.customize3 * 1 + 1].label)
                }
            },
            setTopDialogClick(){
                this.setTopDialog=true
            },
            setTopDialogClose(){
                this.setTopDialog=false
                this.round=1
                this.topType=1
            },
            selectionList(betTypeId, customize,page=this.page) {
                this.loading = true
                selectionList(betTypeId, page, this.pageSize, customize).then(res => {
                    console.log("竞猜项列表", res)
                    this.loading = false
                    if (res.code == 0) {
                        this.count = res.data.total
                        this.betSelections = res.data.betSelections
                        this.deadlineTime = res.data.deadlineTime
                        this.tips = res.data.tips
                        this.skipId = res.data.skipId
                        var customizes = res.data.customizes
                        this.customizeOptions = []
                        for (let i in customizes) {
                            this.customizeOptions.push({
                                value: i,
                                label: customizes[i]
                            })
                        }
                        this.customizeOptions3 = [...[{
                            value: '全部',
                            label: "全部",
                        }], ...this.customizeOptions]

                        if(this.currentdata && Object.keys(this.currentdata).length){
                            let customize3 = this.customizeOptions3.find(item=>{
                                return item.label==this.customize3
                            })
                            this.customize3 = customize3.value
                            this.CURRENTDATA({})
                        }
                    }
                })
            },
            selectionAdd(betTypeId, betSelections) {
                if (!!betSelections.length > 0) {
                    selectionAdd(betTypeId, betSelections).then(res => {
                        console.log("添加竞猜项", res)
                        if (res.code == 0) {
                            this.selectionList(this.afterBetTypeId)
                            this.addDialogBetClose()
                            Message.success("新增成功")
                        } else {
                            Message.error(res.message)
                        }
                    })
                }
            },
            selectionUpdate(betSelectionId, betSelectionOdds) {
                selectionUpdate(betSelectionId, betSelectionOdds).then(res => {
                    console.log("修改竞猜项", res)
                    if (res.code == 0) {
                        this.selectionList(this.afterBetTypeId)
                        this.editDialogBetClose()
                        Message.success("操作成功")
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            selectionSettlement(betSelectionId, betSelectionStatus, parallelCount) {
                if (betSelectionStatus != 4) {
                    parallelCount = null
                } else {
                    betSelectionStatus = null
                    parallelCount = parallelCount * 1
                }
                selectionSettlement(betSelectionId, betSelectionStatus, parallelCount).then(res => {
                    console.log("竞猜结算", res)
                    if (res.code == 0) {
                        let customize3 = this.customize3=='全部'?undefined:this.customizeOptions3[this.customize3 * 1 + 1].label

                        this.selectionList(this.afterBetTypeId,customize3)
                        this.settlementDialogClose()
                        Message.success("操作成功")
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            deadlineUpdate(deadlineTime) {
                deadlineTime = new Date(deadlineTime).getTime()
                deadlineUpdate(this.afterBetTypeId, deadlineTime).then(res => {
                    console.log("修改下单截至时间", res)
                    if (res.code == 0) {
                        this.selectionList(this.afterBetTypeId)
                        Message.success("操作成功")
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            tipsUpdate(betTypeId, tips) {
                tipsUpdate(betTypeId, tips).then(res => {
                    console.log("修改玩法说明", res)
                    if (res.code == 0) {
                        Message.success("操作成功")
                        this.desDialogClose()
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            openSet(betSelectionId, open) {
                openSet(betSelectionId, open).then(res => {
                    console.log("开启/关闭", res)
                    if (res.code == 0) {
                        Message.success("操作成功")
                        this.selectionList(this.afterBetTypeId)
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            openBatchSet(customize, open) {
                openBatchSet(this.afterBetTypeId, customize, open).then(res => {
                    console.log("批处理 开启/关闭", res)
                    if (res.code == 0) {
                        Message.success("操作成功")
                        // this.selectionList(this.afterBetTypeId)
                        let customize3 = this.customize3=='全部'?undefined:this.customizeOptions3[this.customize3 * 1 + 1].label
                        this.selectionList(this.afterBetTypeId, customize3)
                        this.batchDialog = false
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            showBatchSet(customize, show) {
                showBatchSet(this.afterBetTypeId, customize, show).then(res => {
                    console.log("批处理 隐藏/展示", res)
                    if (res.code == 0) {
                        Message.success("操作成功")
                        // this.selectionList(this.afterBetTypeId)
                        this.selectionList(this.afterBetTypeId, this.customizeOptions3[this.customize3 * 1 + 1].label)
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            starttimeBatchSet(customize, matchStartTime) {
                starttimeBatchSet(this.afterBetTypeId, customize, matchStartTime).then(res => {
                    console.log("批处理 时间", res)
                    if (res.code == 0) {
                        Message.success("操作成功")
                        // this.selectionList(this.afterBetTypeId)
                        let customize3 = this.customize3=='全部'?undefined:this.customizeOptions3[this.customize3 * 1 + 1].label
                        this.selectionList(this.afterBetTypeId, customize3)
                    } else {
                        Message.error(res.message)
                    }
                })
            },
            hotChange(r){
                if(r.hot!=1){r.hot=0}
                selectionHotSet(r.betSelectionId,r.hot).then(res=>{
                    console.log("设置人气",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        let customize3 = this.customize3=='全部'?undefined:this.customizeOptions3[this.customize3 * 1 + 1].label
                        this.selectionList(this.afterBetTypeId,customize3)
                    }else{
                        Message.error(res.message)
                    }
                })
            },
            setTop(round,topType){
                setTop(this.afterBetTypeId,round,topType).then(res=>{
                    console.log("设置置顶",res)
                    if(res.code==0){
                        Message.success("操作成功")
                        let customize3 = this.customize3=='全部'?undefined:this.customizeOptions3[this.customize3 * 1 + 1].label
                        this.selectionList(this.afterBetTypeId,customize3)
                    }else{
                        Message.error(res.message)
                    }
                })
            },

        }
    }
</script>


<style lang="scss" scoped>
  .bethomehome {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;

    .head {
      position: relative;
      box-sizing: border-box;

      .l {
        font-size: 24px;
        color: #909399;
        height: 40px;
      }

      .r {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        right: 0;

        .r1 {
          display: flex;
          align-items: center;
          margin-left: 20px;

          .label {
            color: #909399;
            font-size: 18px;
          }

          .value {
            color: #333;
            font-size: 18px;
          }
        }

        .r2 {
          display: flex;
          align-items: center;
          margin-left: 20px;

          .label {
            color: #909399;
            font-size: 18px;
          }

          .value {
            color: #333;
            font-size: 18px;
            margin-right: 10px;
          }
        }
      }
    }

    .head2 {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 10px;

      .item {
        margin-right: 20px;
      }

      .r {
        position: absolute;
        right: 20px;
        display: flex;
        align-items: center;

        .label {
          color: #909399;
          font-size: 18px;
          margin-right: 10px;
        }

        .value {
        }
      }
    }


    .list {
      box-sizing: border-box;
      padding-top: 10px;
    }

    .dialog {
      width: 100%;

      .con {
        width: 100%;
        margin-bottom: 80px;

        .item {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;

          .label {
            width: 80px;
            flex-shrink: 0;
          }

          .input {
            width: 100%;
          }
        }

        .item:last-child {
          margin-top: 10px;
        }

        .list-odds {
          padding-top: 20px;
          height: inherit;

          .input {
            border: 1px solid #909399;
            box-sizing: border-box;
            padding: 10px;

            .list-item {

              width: 100%;
              display: flex;
              align-items: center;

              .l1 {
                width: 150px;
                flex-shrink: 0;
              }

              .l1-1 {
                width: 150px;
                flex-shrink: 0;
              }

              .l2 {
                width: 100px;
                flex-shrink: 0;
              }

              .l3 {
                width: 100%;
                box-sizing: border-box;
                padding-right: 10px;
                text-align: right;
              }
            }
          }

        }

        .des {
          font-size: 16px;
          margin: 0 auto;
          line-height: 1.5;
        }
      }

      .foot {
        width: 400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .foot-des {
        justify-content: center;
      }
    }

  }
</style>

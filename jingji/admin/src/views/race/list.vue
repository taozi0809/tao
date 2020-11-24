<template>
    <div class="list">
        <div v-if="$route.path=='/race/list'">
            <div class="header">
                <div class="l">
                    <div class="m">
                        <el-button type="primary" @click="dialogMatchClick">添加赛事</el-button>
                    </div>
                </div>
            </div>
            <div class="list">
                <el-table :data="list" style="width: 100%;margin-bottom: 10px;" border height="700" v-loading="loading"
                          element-loading-text="加载中"
                          element-loading-background="rgba(255, 255, 255, .5)">
                    <el-table-column type="index" :index="getInIndex" width="50"></el-table-column>

                    <el-table-column prop="MatchSource" label="赛事来源" width="100">
                        <template slot-scope="scope">
                            {{scope.row.MatchSource==1?'体总':'后台'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="MatchType" label="赛事类型" width="120"></el-table-column>
                    <el-table-column label="赛事级别" width="120">
                        <template slot-scope="scope">
                            {{scope.row.MatchLevel | MatchLevelToStr}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="MatchID" label="昵称ID" width="160"></el-table-column>
                    <el-table-column prop="MatchName" label="赛事昵称" width="160"></el-table-column>
                    <el-table-column label="单人报名费(点券)" width="130">
                        <template slot-scope="scope">
                            {{scope.row.EnterFee}}点券
                        </template>
                    </el-table-column>
                    <el-table-column label="上架时间" width="150">
                        <template slot-scope="scope">
                            {{scope.row.ShelfTime | timestampToTime1}}
                        </template>
                    </el-table-column>
                    <el-table-column label="下架时间" width="150">
                        <template slot-scope="scope">
                            {{scope.row.DownShelfTime | timestampToTime1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="UseMatch" label="赛事使用场数" width="120"></el-table-column>
                    <el-table-column prop="LastMatch" label="赛事剩余场数" width="120"></el-table-column>
<!--                    <el-table-column prop="Operator" label="操作人" width="120"></el-table-column>-->
                    <el-table-column label="是否首页展示" width="120">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.ShowHall?1:0" placeholder="请选择" @change="showHallChange(scope.row)" size="small">
                                <el-option
                                        v-for="item in showHallOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </template>
                    </el-table-column>
                    <el-table-column label="排序" width="150">
                        <template slot-scope="scope">
                            <div class="sort">
                                <div class="s-t">
                                    <el-input v-model.number="scope.row.Sort" size="small" @focus="changeFocus(scope.row)"></el-input>
                                </div>
                                <div class="btn"><el-button type="text" size="small" v-if="scope.row.isSort" @click="editSort(scope.row.MatchID,scope.row.Sort)">确认</el-button></div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="400">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="isDialogView(scope.row)">查看</el-button>
                            <el-button type="primary" size="small" @click="$router.push({name:'race_report',params:{id:scope.row.MatchID}})">赛事报表</el-button>
                            <el-button type="primary" size="small" @click="dialogEditMatchClick(scope.row)">{{scope.row.MatchSource==1?'体总编辑':'平台编辑'}}</el-button>
                            <el-button type="warning" size="small" v-if="scope.row.State==0" @click="botMatch(scope.row.MatchID)">下架</el-button>
                            <el-button type="success" size="small" v-if="scope.row.State==3||scope.row.State==5" @click="topMatch(scope.row.MatchID)">上架</el-button>
                            <el-button type="danger" size="small" @click="delMatch(scope.row.MatchID)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="matchManagerList()"
                        :current-page.sync="page"
                        :page-size="per"
                        layout="total, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>
        <router-view/>

        <div class="dialogMatch">
            <el-dialog
                    title="添加赛事"
                    center
                    :modal-append-to-body="false"
                    :visible.sync="dialogMatch"
                    width="820px">
                <div class="dialog-con">
                    <div class="t1">
                        <div class="l">赛事图标</div>
                        <div class="r">
                            <el-upload
                                    class="avatar-uploader"
                                    action="123"
                                    :show-file-list="false"
                                    :before-upload="beforeUpload">
                                <img v-if="MatchIcon" :src="MatchIcon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事类型</div>
                        <div class="r">
                            <el-select v-model="MatchType" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事来源</div>
                        <div class="r">
                            <el-select v-model="MatchSource" placeholder="请选择" @change="changeMatchLevel">
                                <el-option
                                        v-for="item in MatchSourceOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="t1" v-if="isMatchLevel">
                        <div class="l">赛事级别</div>
                        <div class="r">
                            <el-select v-model="MatchLevel" placeholder="请选择">
                                <el-option
                                        v-for="item in MatchLevelOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事ID</div>
                        <div class="r">
                            <el-input v-model="MatchID" placeholder="根据赛事类型前两个字中文首字母缩写大写，后面的赛事昵称按照0001开始增加"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事昵称</div>
                        <div class="r">
                            <el-input v-model="MatchName" placeholder="请输入赛事昵称"></el-input>
                        </div>
                    </div>
                    <div class="t1 t2">
                        <div class="l">对局副数</div>
                        <div class="r">
                            <div class="r1">
                                <el-input v-model="Round" placeholder="请输入几局"
                                          oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                          maxLength='9'></el-input>
                                <p>局</p>
                            </div>
                            <div class="r2">
                                <el-input v-model="Card" placeholder="请输入几副"
                                          oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                          maxLength='9'></el-input>
                                <p>副</p>
                            </div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">时间类型</div>
                        <div class="r">
                            <el-radio v-model="StartType" label="2">倒计时间</el-radio>
                            <el-radio v-model="StartType" label="3">固定时间</el-radio>
                            <el-radio v-model="StartType" label="1">满人数开赛</el-radio>
                        </div>
                    </div>
                    <div class="t1 t3" v-if="StartType==2||StartType==3">
                        <div class="l">开赛时间</div>
                        <div class="r" v-if="StartType==2">
                            <el-input v-model="StartTime1" placeholder="请输入时间（秒）" oninput="if(isNaN(value)) { value = null }
                            if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                      maxLength='9'></el-input>
                        </div>
                        <div class="r" v-if="StartType==3">
                            <div class="r1">
                                <el-date-picker
                                        v-model="StartTime2"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="t1 t2">
                        <div class="l">开赛条件</div>
                        <div class="r">
                           <div class="r1">
                               <el-input v-model="LimitPlayer" placeholder="请输入3的倍数" oninput="if(isNaN(value)) { value = null }
                               if(value){
                                   this.timestampJ1 = Date.parse(new Date());
                                   var timestampJ2 = Date.parse(new Date());
                                   setTimeout(()=>{
                                       if(this.timestampJ1==timestampJ2){
                                           if(value % 3 !=0){
                                               value = null
                                           }
                                       }
                                   },500)
                               }
                               if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                         maxLength='9'></el-input>
                               <p>人</p>
                           </div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">开赛总场数</div>
                        <div class="r">
                            <el-input v-model="TotalMatch" placeholder="该种比赛可创建的总比赛次数"
                                      oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                      maxLength='9'></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">报名费</div>
                        <div class="r">
                            <el-input v-model="EnterFee" placeholder="请输入报名费"
                                      oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                      maxLength='9'></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">排序</div>
                        <div class="r">
                            <el-input v-model="Sort" placeholder="请输入排序序号"
                                      oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                      maxLength='9'></el-input>
                        </div>
                    </div>
                    <div class="t1 t4">
                        <div class="l">奖励列表</div>
                        <div class="r">
                            <el-button type="primary" @click="dialogConfig=true" size="small">添 加</el-button>
                        </div>
                    </div>
                    <div class="t1 t5" v-if="configArr.length>0">
                        <div class="l">配置清单</div>
                        <div class="r">
                            <div v-for="(item,index) in configArr" class="rc">
                                <div class="r1">第{{item.rank}}名</div>
                                <div class="r3">
                                        <span v-for="(item1,index1) in item.config">
                                            <span>{{item1.type}}</span>
                                            <span>×{{item1.num}}</span>
                                            <span v-if="index1+1!=item.config.length">,</span>
                                        </span>
                                </div>
                                <div class="r4">
                                    <el-button type="text" @click="dealConfig(index,configArr)" size="small">删除</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事说明</div>
                        <div class="r">
                            <el-input v-model="Recommend" placeholder="请输入赛事说明"></el-input>
                        </div>
                    </div>
                    <div class="t1 t3">
                        <div class="l">上架时间</div>
                        <div class="r">
                            <div class="r1">
                                <el-date-picker
                                        v-model="ShelfTime"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button type="primary" @click="addMatchClick">确 定</el-button>
                            <el-button @click="dialogMatch=false">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="编辑赛事"
                    center
                    :modal-append-to-body="false"
                    :visible.sync="dialogEditMatch"
                    width="820px">
                <div class="dialog-con">

                    <div class="t1" v-if="currentMatchData.MatchSource!=1">
                        <div class="l">赛事昵称</div>
                        <div class="r">
                            <el-input v-model="currentMatchData.MatchName" placeholder="赛事昵称"></el-input>
                        </div>
                    </div>
                    <div class="t1 t2" v-if="currentMatchData.MatchSource!=1">
                        <div class="l">对局副数</div>
                        <div class="r">
                            <div class="r1">
                                <el-input v-model="currentMatchData.Round" :disabled="true"></el-input>
                                <p>局</p>
                            </div>
                            <div class="r2">
                                <el-input v-model="currentMatchData.Card" placeholder="请输入几副"></el-input>
                                <p>副</p>
                            </div>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">开赛时间</div>
                        <div class="r" v-if="currentMatchData.StartType==1">--</div>
                        <div class="r" v-if="currentMatchData.StartType==2">
                            <el-input v-model="currentMatchData.StartTime" placeholder="请输入时间（秒）" oninput="if(isNaN(value)) { value = null }
                            if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                      maxLength='9'></el-input>
                        </div>
                        <div class="r" v-if="currentMatchData.StartType==3">
                            <div class="r1">
                                <el-date-picker
                                        v-model="currentMatchData.StartTime"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="t1 t2" v-if="currentMatchData.MatchSource!=1">
                        <div class="l">开赛条件</div>
                        <div class="r">
                            <div class="r1">
                                <el-input v-model="currentMatchData.LimitPlayer" placeholder="请输入3的倍数" oninput="if(isNaN(value)) { value = null }
                               if(value){
                                   this.timestampJ1 = Date.parse(new Date());
                                   var timestampJ2 = Date.parse(new Date());
                                   setTimeout(()=>{
                                       if(this.timestampJ1==timestampJ2){
                                           if(value % 3 !=0){
                                               value = null
                                           }
                                       }
                                   },500)
                               }
                               if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                                          maxLength='9'></el-input>
                                <p>人</p>
                            </div>
                        </div>
                    </div>
                    <div class="t1 t6">
                        <div class="l">晋级条件</div>
                        <div class="r">
                            <el-input v-model="currentMatchData.Eliminate" placeholder="每轮淘汰人数,逗号隔开"></el-input>
                        </div>
                    </div>
                    <div class="t1" v-if="currentMatchData.MatchSource!=1">
                        <div class="l">单人报名费</div>
                        <div class="r">
                            <el-input v-model="currentMatchData.EnterFee" placeholder="单人报名费"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事剩余场数</div>
                        <div class="r">
                            <el-input v-model="currentMatchData.LastMatch" placeholder="赛事剩余场数"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">赛事使用场数</div>
                        <div class="r">
                            <el-input v-model="currentMatchData.UseMatch" placeholder="赛事使用场数"></el-input>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">上架时间</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="currentMatchData.ShelfTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="t1">
                        <div class="l">下架时间</div>
                        <div class="r">
                            <el-date-picker
                                    v-model="currentMatchData.DownShelfTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="t1 tt">
                        <div class="l"></div>
                        <div class="r">
                            <el-button type="primary" @click="editMatchClick">确 定</el-button>
                            <el-button @click="dialogEditMatch=false">取 消</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="查 看"
                    center
                    :modal-append-to-body="false"
                    :visible.sync="dialogView"
                    :before-close="handleClose3"
                    width="820px">
                <div class="dialog-con">
                    <div class="item">
                        <div class="l"></div>
                        <div class="r"></div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">赛事昵称：</div>
                            <div class="v">{{dialogViewData.MatchName}}</div>
                        </div>
                        <div class="r">
                            <div class="t">对局副数：</div>
                            <div class="v">{{dialogViewData.RoundNum}}</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">开赛时间：</div>
                            <div class="v">
                                <span v-if="dialogViewData.StartType==1">--</span>
                                <span v-if="dialogViewData.StartType==2">{{dialogViewData.StartTime/60}}分钟</span>
                                <span v-if="dialogViewData.StartType==3">{{dialogViewData.StartTime | timestampToTime1}}</span>
                            </div>
                        </div>
                        <div class="r">
                            <div class="t">开赛条件：</div>
                            <div class="v">
                                <span v-if="dialogViewData.StartType==1">满{{dialogViewData.LimitPlayer}}人开赛</span>
                                <span v-if="dialogViewData.StartType==2||dialogViewData.StartType==3">{{dialogViewData.LimitPlayer}}人</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l">
                            <div class="t">赛事说明：</div>
                            <div class="v">{{dialogViewData.Recommend}}</div>
                        </div>
                        <div class="r">
                            <div class="t">晋级条件：</div>
                            <div class="v">
                                <span v-for="(item,index) in dialogViewData.Eliminate">
                                    <span>{{item}}</span>
                                    <span v-if="index+1!=dialogViewData.Eliminate.length">,</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="r">
                            <div class="t">单人报名费：</div>
                            <div class="v">{{dialogViewData.EnterFee}}</div>
                        </div>
                        <div class="r">
                            <div class="t">赛事奖励：</div>
                            <div class="v">
                                <div v-for="(item,key,index) in dialogViewData.AwardList">{{key}},{{item}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="l"></div>
                        <div class="r"></div>
                    </div>
                    <div class="item">
                        <div class="l"></div>
                        <div class="r"></div>
                    </div>
                    <div class="item">
                        <div class="l"></div>
                        <div class="r"></div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="dialogMatch">
            <el-dialog
                    title="配置附件"
                    center
                    :modal-append-to-body="false"
                    :visible.sync="dialogConfig"
                    :before-close="handleCloseConfig"
                    width="600px">
                <div class="dialog-config">
                    <div class="item">
                        <div class="t">奖励名次：</div>
                        <div class="v">
                            <el-input v-model.number="configIndex" placeholder="请输入奖励名次"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">配置附件：</div>
                        <div class="v">
                            <el-select v-model="config" multiple placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in configOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="t">{{config[0]}}数量：</div>
                        <div class="v">
                            <el-input v-model="configNum0" placeholder="请输入数量"></el-input>
                        </div>
                    </div>
                    <div class="item" v-if="config.length>1">
                        <div class="t">{{config[1]}}数量：</div>
                        <div class="v">
                            <el-input v-model="configNum1" placeholder="请输入数量"></el-input>
                        </div>
                    </div>
                    <div class="item" v-if="config.length>2">
                        <div class="t">{{config[2]}}数量：</div>
                        <div class="v">
                            <el-input v-model="configNum2" placeholder="请输入数量"></el-input>
                        </div>
                    </div>
                    <div class="item" v-if="config.length>3">
                        <div class="t">{{config[3]}}数量：</div>
                        <div class="v">
                            <el-input v-model="configNum3" placeholder="请输入数量"></el-input>
                        </div>
                    </div>
                    <div class="item item1">
                        <div class="t">生成状态：</div>
                        <div class="v">
                            <el-card class="box-card"  v-if="configArr.length>0">
                                <div v-for="(item,index) in configArr" class="rc">
                                    <div class="r1">第{{item.rank}}名</div>
                                    <div class="r3">
                                        <span v-for="(item1,index1) in item.config">
                                            <span>{{item1.type}}</span>
                                            <span>×{{item1.num}}</span>
                                            <span v-if="index1+1!=item.config.length">,</span>
                                        </span>
                                    </div>
                                    <div class="r4">
                                        <el-button type="text" @click="dealConfig(index,configArr)" size="small">删除</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="item-btn">
                        <el-button type="primary" @click="addConfig">添 加</el-button>
                        <el-button type="primary" @click="dialogConfig=false">确 定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {matchManagerList,addMatch,optMatch,showHall,editMatch,editSort} from "../../service/api/api";
    import {Message} from "element-ui";
    import {mapState, mapMutations} from 'vuex'
    import axios from "axios"
    import {baseUrl} from "../../service/base";
    import {MatchLevelOptions,configOptions} from "../../filter/filters";

    export default {
        data(){
            return{
                MatchLevel:2,
                isMatchLevel:false,
                MatchLevelOptions:MatchLevelOptions,
                per:10,
                page:1,
                list:[],
                count:0,
                timestampJ:0,
                loading:false,
                dialogMatch:false,
                dialogEditMatch:false,
                currentMatchData:{
                    MatchID:"",
                    MatchName:"",
                    Card:"",
                    StartType:"",
                    StartTime:"",
                    Eliminate:"",
                    EnterFee:"",
                    TotalMatch:"",
                    ShelfTime:"",
                    DownShelfTime:"",
                    AwardList:"",
                },
                MatchIcon:"",
                showHallOptions:[
                    {
                        value: 0,
                        label: '否'
                    },
                    {
                        value:1,
                        label:'是'
                    },
                ],
                options: [
                    {
                    value: '奖金赛',
                        label: '奖金赛'
                    }, {
                        value: '快速赛',
                        label: '快速赛'
                    }, {
                        value: '海选赛',
                        label: '海选赛'
                    }, {
                        value: '复式赛',
                        label: '复式赛'
                    }
                ],
                MatchType: '海选赛',
                MatchID:"",
                MatchName:"",
                Round:"",
                Card:"",
                StartType:"2",
                StartTime:"",
                LimitPlayer:"",
                TotalMatch:"",
                EnterFee:"",
                Sort:"",
                AwardList:[],
                Recommend:"",
                ShelfTime:"",

                StartTime1:"",
                StartTime2:"",

                MatchSource:2,
                MatchSourceOptions:[
                    {
                      value:1,
                      label:"体总"
                    },
                    {
                        value:2,
                        label:"后台"
                    },
                ],
                dialogView:false,
                dialogViewData:{
                    AwardList:""
                },

                dialogConfig:false,
                configIndex:1,
                config:"",
                configNum0:"",
                configNum1:"",
                configNum2:"",
                configNum3:"",
                configOptions:configOptions,
                configArr:[],
            }
        },
        computed:{
            ...mapState(['token']),
            getInIndex(){
                return (this.page - 1) * this.per +1
            },
        },
        created() {
            this.matchManagerList()
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
                        this.MatchIcon=response.data.url
                    }else{
                        Message.error(response.data.desc)
                    }
                }).catch(error=> {
                        console.log(error);
                    });
                return false
            },
            changeMatchLevel(){
                if(this.MatchSource==1){
                    this.isMatchLevel=true
                }else{
                    this.isMatchLevel=false
                }
            },
            change(){
                this.matchManagerList()
            },
            changeFocus(i){
                i.isSort=true
            },
            dialogMatchClick(){
                this.clearAttributes()
                this.dialogMatch=true

            },
            isDialogView(i){
                this.dialogView=true
                i.AwardList= JSON.parse(i.AwardList)
                this.dialogViewData=i
            },
            handleClose3(){
                this.dialogView=false
                this.dialogViewData={}
            },
            handleCloseConfig(){
                this.dialogConfig=false
            },
            dialogEditMatchClick(i){
                this.clearAttributes()
                if(typeof(i.Eliminate)!='string'){
                    i.Eliminate=i.Eliminate.join(",")
                }
                i.ShelfTime=i.ShelfTime*1000
                i.DownShelfTime=i.DownShelfTime*1000

                if(i.StartType==3){
                    i.StartTime=i.StartTime*1000
                }

                this.currentMatchData=i
                this.dialogEditMatch=true
            },

            addConfig(){
                let isConfig=false
                const clearA=()=>{
                    this.configIndex++
                    this.config=[]
                    this.configNum0=''
                    this.configNum1=''
                    this.configNum2=''
                    this.configNum3=''
                }
                for(let i in this.config){
                    if(eval('this.configNum'+i)>0){
                        isConfig=true
                    }else{
                        isConfig=false
                        break;
                    }
                }
                if(this.configIndex>0&&isConfig){
                    let config=[]
                    for(let i in this.config){
                        config.push({
                            type:this.config[i],
                            num:eval('this.configNum'+i),
                        })
                    }

                    for(let i in this.configArr){
                        if(this.configArr[i].rank==this.configIndex){
                            this.configArr.splice(i,1,{
                                rank:this.configIndex,
                                config:config
                            });
                            clearA()
                            return
                        }
                    }
                    this.configArr.push({
                        rank:this.configIndex,
                        config:config
                    })
                    clearA()
                }else{
                    Message.error("输入不符合规则")
                }


            },

            dealConfig(index,arr){
                arr.splice(index,1)
                this.configIndex=arr.length+1
            },
            matchManagerList(){
                this.loading=true
                matchManagerList(this.page,this.per).then(res=>{
                    this.loading=false
                    console.log("赛事列表",res)
                    if(res.code==0){
                        for(let i in res.list){
                            res.list[i]["isSort"]=false
                            res.list[i]['Card']=res.list[i].RoundNum.substring(res.list[i].RoundNum.indexOf('局')+1,res.list[i].RoundNum.indexOf('副'))
                            res.list[i]['Round']=res.list[i].RoundNum.substring(0,res.list[i].RoundNum.indexOf('局'))
                        }
                        this.list=res.list
                        this.count=res.total

                    }
                })
            },
            clearAttributes(){
                this.MatchID=''
                this.MatchName=''
                this.Round=''
                this.Card=''
                this.StartType="2"
                this.StartTime=''
                this.StartTime1=''
                this.StartTime2=''
                this.LimitPlayer=''
                this.TotalMatch=''
                this.EnterFee=''
                this.Sort=''
                this.AwardList=[]
                this.ShelfTime=''
                this.Recommend=''
                this.MatchSource=2
                this.matchManagerList()
            },
            addMatchClick(){
                if(!!this.MatchIcon){}else{Message.error("赛事图标不能为空");return}
                if(!!this.MatchID){}else{Message.error("赛事ID不能为空");return}
                if(!!this.MatchName){}else{Message.error("赛事名称不能为空");return}
                if(!!this.Round&&!!this.Card){}else{Message.error("对局副数不能为空");return}
                if(!!this.StartType){}else{Message.error("时间类型不能为空");return}
                if(!!this.LimitPlayer){}else{Message.error("开赛条件不能为空");return}
                if(!!this.TotalMatch){}else{Message.error("开赛总场数不能为空");return}
                if(this.EnterFee>=0){}else{Message.error("报名费不能为空");return}
                if(!!this.Sort){}else{Message.error("排序不能为空");return}
                if(this.configArr.length>0){}else{Message.error("奖励列表不能为空");return}
                if(!!this.ShelfTime){}else{Message.error("上架时间不能为空");return}
                if(!!this.Recommend){}else{Message.error("赛事说明不能为空");return}
                let objAwardList = {}
                const configToStr=value=>{
                    switch (value){
                        case '奖金':return'元';break;
                        case '点券':return'点券';break;
                        case '碎片':return'碎片';break;
                        case '红分':return'红分';break;
                        default:
                            return ''
                    }
                }
                for(let i in this.configArr){
                    let v=''
                    for(let j in this.configArr[i].config){
                        v+=this.configArr[i].config[j].num+configToStr(this.configArr[i].config[j].type)+','
                    }
                    let reg=/,$/gi;
                    objAwardList[`第${this.configArr[i].rank}名`]=v.replace(reg,"")
                }
                if(this.StartType==1){
                    this.StartTime=0
                }
                if(this.StartType==2){
                    this.StartTime=parseInt(this.StartTime1)
                }
                if(this.StartType==3){
                    this.StartTime= Date.parse(this.StartTime2)/1000
                }
                addMatch(
                    this.MatchType,
                    this.MatchID,
                    this.MatchName,
                    parseInt(this.Round),
                    parseInt(this.Card),
                    parseInt(this.StartType),
                    this.StartTime,
                    parseInt(this.LimitPlayer),
                    parseInt(this.TotalMatch),
                    parseInt(this.EnterFee),
                    parseInt(this.Sort),
                    JSON.stringify(objAwardList),
                    parseInt(Date.parse(this.ShelfTime)/1000),
                    this.Recommend,
                    null,
                    this.MatchSource,
                    this.MatchIcon,
                    this.MatchLevel).then(res=>{
                    console.log("新增赛事",res)
                    if(res.code==0){
                        this.matchManagerList()
                        Message.success("新增成功")
                        this.clearAttributes()
                        this.dialogMatch=false
                    }
                })

            },
            delMatch(id){
                optMatch(id,3).then(res=>{
                    console.log("删除赛事",res)
                    if(res.code==0){
                        Message.success("删除成功")
                        this.matchManagerList()
                    }
                })
            },
            topMatch(id){
                optMatch(id,1).then(res=>{
                    console.log("上架赛事",res)
                    if(res.code==0){
                        Message.success("上架成功")
                        this.matchManagerList()
                    }
                })
            },
            botMatch(id){
                optMatch(id,2).then(res=>{
                    console.log("下架赛事",res)
                    if(res.code==0){
                        Message.success("下架成功")
                        this.matchManagerList()
                    }
                })
            },
            showHallChange(i){
                showHall(i.MatchID,!i.ShowHall).then(res=>{
                    console.log("是否首页展示",res)
                    if(res.code==0){
                        Message.success("修改成功")
                        this.matchManagerList()
                    }
                })
            },
            editMatchClick(){
                if(!!this.currentMatchData.MatchName){}else{Message.error("赛事名称不能为空");return}
                if(!!this.currentMatchData.Card){}else{Message.error("对局副数不能为空");return}
                if(!!this.currentMatchData.LimitPlayer){}else{Message.error("开赛条件不能为空");return}
                if(this.currentMatchData.EnterFee>=0){}else{Message.error("报名费不能为空");return}
                if(!!this.currentMatchData.LastMatch){}else{Message.error("比赛剩余场数不能为空");return}
                if(!!this.currentMatchData.ShelfTime){}else{Message.error("上架时间不能为空");return}
                if(!!this.currentMatchData.Recommend){}else{Message.error("赛事说明不能为空");return}

                editMatch(this.currentMatchData.MatchID,
                    this.currentMatchData.MatchName,
                    parseInt(this.currentMatchData.Card),
                    this.currentMatchData.StartType,
                    this.currentMatchData.StartType==3?parseInt(this.currentMatchData.StartTime/1000):parseInt(this.currentMatchData.StartTime),
                    parseInt(this.currentMatchData.LimitPlayer),
                    this.currentMatchData.Eliminate.split(",").map(Number),
                    parseInt(this.currentMatchData.EnterFee),
                    parseInt(this.currentMatchData.UseMatch)+parseInt(this.currentMatchData.LastMatch),
                    this.currentMatchData.ShelfTime/1000,
                    this.currentMatchData.DownShelfTime/1000,
                    this.currentMatchData.AwardList,
                    parseInt(this.currentMatchData.UseMatch)).then(res=>{
                    console.log("编辑赛事",res)
                    if(res.code==0){
                        this.matchManagerList()
                        Message.success("编辑成功")
                        this.dialogEditMatch=false
                    }
                })
            },
            editSort(MatchID, Sort){
                editSort(MatchID, Sort).then(res=>{
                    console.log("修改排序",res)
                    if(res.code==0){
                        this.matchManagerList()
                        Message.success("修改成功")
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
        .img-icon{
            margin: 0 auto;
            width: 60px;
        }

        .sort{
            display: flex;
            align-content: center;
            justify-content: space-between;
            .s-t{
                width: 100%;
            }
            .btn{
                margin-left: 20px;
            }

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
                width:90px;
                flex-shrink: 0;
            }
            .r{
                width: 100%;
            }
        }
        .t2{
            .r{
                display: flex;
                align-items: center;
                .r1,.r2{
                    display: flex;
                    align-items: center;
                    width:245px;
                    margin-right:50px;
                    p{
                        margin-left: 10px;
                    }
                }
            }
        }
        .t3{
            .r{
                display: flex;
                align-items: center;
                .r1,.r2{
                    display: flex;
                    align-items: center;
                    width:200px;
                    margin-right:10px;
                }
            }
        }
        .t4{
            .r{
                position: relative;
                display: flex;
                align-items: center;
                .r1{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .r1-c{
                        width: 60px;
                        margin: 0 5px;
                    }
                }
                .r2,.r3{
                   display: flex;
                   align-items: center;
                    margin-right: 20px;
                    .r2-des{
                        flex-shrink: 0;
                    }
                    .r-c{
                        width:60px;
                        margin: 0 5px;
                    }
                }
                .r4{
                    position: absolute;
                    right: 0;
                }
            }
        }
        .t5{
            align-items: inherit;
            .r{
                border: 1px solid #DCDFE6;
                box-sizing: border-box;
                padding: 10px;
                .rc{
                    display: flex;
                    align-items: center;
                    .r1{
                        width: 150px;
                    }
                    .r2{
                        width: 200px;
                    }
                    .r3{
                        width: 300px;
                    }
                }
            }
        }
        .t6{
            .r{
                display: flex;
                align-items: center;
                .r1{
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .r-c{
                        width: 80px;
                        margin-left: 10px;
                    }
                }
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
        .item{
            display: flex;
            align-items: center;
            .l,.r{
                display: flex;
                width: 380px;
                box-sizing: border-box;
                margin-bottom: 20px;
                .t{
                    flex-shrink: 0;
                    color: #999;
                    font-size: 14px;
                }
                .v{
                    width: 100%;
                    color: #333;
                    font-size: 14px;
                }
            }
        }
    }

    .dialog-config{
        width: 100%;
        .item{
            display: flex;
            align-items: center;
            margin-top: 20px;
            width: 100%;
            .t{
                flex-shrink: 0;
                font-size: 14px;
                color: #999;
                width:70px;
                flex-shrink: 0;
            }
            .v{
                font-size: 14px;
                color: #333;
                width: 100%;
            }
            .v1{
                display: flex;
                align-items: center;
            }
        }
        .item1{
            align-items: normal;
            .rc{
                display: flex;
                align-items: center;
                .r1{
                    width:100px;
                }
                .r3{
                    width: 250px;
                    overflow: hidden;
                }
                .r4{

                }
            }
        }
        .item-btn{
            width: 400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            margin-top: 50px;
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


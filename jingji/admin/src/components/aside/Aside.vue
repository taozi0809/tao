<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="logo-icon" ><img src="../../assets/images/logo/logo.png" alt=""></span>
            <p v-if="!isCollapse">竞技二打一后台</p>
        </div>
        <el-menu
            id="tokenholdem-aside"
            default-active="/home"
            class="el-menu-vertical-demo"
            text-color="#607D8B"
            active-text-color="#fff"
            :default-active="pathFun"
            unique-opened
            router
             :collapse="isCollapse">
            <el-menu-item index="/home">
                <i class="jingji-iconhome mr10"></i>
                <span>首页</span>
            </el-menu-item>

            <el-submenu index="1" v-if="power[0]==1||power[1]==1">
                <template slot="title">
                    <i class="jingji-iconyonghuliebiao mr10"></i>
                    <span>用户列表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/user/list" v-if="power[0]==1">用户列表</el-menu-item>
                    <el-menu-item index="/user/whitelist" v-if="power[1]==1">白名单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2" v-if="power[2]==1||power[3]==1||power[4]==1||power[5]==1||power[6]==1||power[7]==1">
                <template slot="title">
                    <i class="jingji-iconsaishi mr10"></i>
                    <span>多人赛事</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/race/list" v-if="power[2]==1">赛事列表</el-menu-item>
                    <el-menu-item index="/race/details" v-if="power[3]==1">赛事详情</el-menu-item>
                    <el-menu-item index="/race/profit" v-if="power[4]==1">赛事盈亏</el-menu-item>
                    <el-menu-item index="/race/competition" v-if="power[5]==1">比赛获得</el-menu-item>
                    <el-menu-item index="/race/master" v-if="power[6]==1">大师分查询</el-menu-item>
                    <el-menu-item index="/race/abnormal" v-if="power[7]==1">异常赛事回调</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3" v-if="power[8]==1||power[9]==1||power[10]==1||power[11]==1">
                <template slot="title">
                    <i class="jingji-iconzhifufangshi1 mr10"></i>
                    <span>多支付通道</span>
                </template>
                <el-submenu index="3-1" v-if="power[8]==1||power[9]==1||power[10]==1">
                    <template slot="title">线上支付</template>
                    <el-menu-item index="/payment/mall" v-if="power[8]==1">商城支付</el-menu-item>
                    <el-menu-item index="/payment/bonus" v-if="power[9]==1">奖金提现</el-menu-item>
                    <el-menu-item index="/payment/recording" v-if="power[10]==1">支付记录</el-menu-item>
                </el-submenu>
                <el-menu-item index="/payment/offline" v-if="power[11]==1">线下支付</el-menu-item>
            </el-submenu>

            <el-submenu index="4" v-if="power[12]==1||power[13]==1||power[14]==1||power[15]==1||power[16]==1||power[17]==1||power[18]==1">
                <template slot="title">
                    <i class="jingji-iconguanlidating mr10"></i>
                    <span>大厅功能</span>
                </template>
                <el-menu-item index="/hall/email" v-if="power[12]==1">邮件系统</el-menu-item>
                <el-menu-item index="/hall/active" v-if="power[13]==1">活动</el-menu-item>
                <el-menu-item index="/hall/bulletin" v-if="power[14]==1">公告</el-menu-item>
                <el-menu-item index="/hall/welfare" v-if="power[15]==1">每日福利</el-menu-item>
                <el-menu-item index="/hall/props" v-if="power[16]==1">道具配置</el-menu-item>
                <el-menu-item index="/hall/share" v-if="power[17]==1">分享有奖</el-menu-item>
                <el-menu-item index="/hall/marquee" v-if="power[18]==1">跑马灯</el-menu-item>
            </el-submenu>

            <el-submenu index="5" v-if="power[19]==1||power[20]==1||power[21]==1||power[22]==1">
                <template slot="title">
                    <i class="jingji-icontubiao_caiwutongji mr10"></i>
                    <span>财务报表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/finance/overview" v-if="power[19]==1">财务总览</el-menu-item>
                    <el-menu-item index="/finance/recharge" v-if="power[20]==1">充值明细</el-menu-item>
                    <el-menu-item index="/finance/withdraw" v-if="power[21]==1">提现明细</el-menu-item>
                    <el-menu-item index="/finance/bonus" v-if="power[22]==1">赛事奖金总览界面</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6" v-if="power[23]||power[24]==1||power[25]==1||power[26]==1||power[27]==1||power[28]==1||power[29]==1||power[30]==1">
                <template slot="title">
                    <i class="jingji-iconshujubaobiao mr10"></i>
                    <span>数据报表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/data/analysis" v-if="power[23]==1">数据分析</el-menu-item>
                    <el-menu-item index="/data/user" v-if="power[24]==1">用户分析</el-menu-item>
                    <el-menu-item index="/data/userAdd" v-if="power[25]==1">新增用户分析</el-menu-item>
                    <el-menu-item index="/data/match" v-if="power[26]==1">赛事分析</el-menu-item>
                    <el-menu-item index="/data/recharge" v-if="power[27]==1">充值额度分析</el-menu-item>
                    <el-menu-item index="/data/balance" v-if="power[28]==1">点券余额分析</el-menu-item>
                    <el-menu-item index="/data/couponUse" v-if="power[29]==1">用户使用点券分析</el-menu-item>
                    <el-menu-item index="/data/bonusGet" v-if="power[30]==1">奖金获得分析</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="7" v-if="power[31]==1">
                <template slot="title">
                    <i class="jingji-iconsaishi mr10"></i>
                    <span>机器人设置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/robot/configuration" v-if="power[31]==1">配置列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="8" v-if="power[32]==1||power[33]==1||power[34]==1">
                <template slot="title">
                    <i class="jingji-icongroup52 mr10"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/set" v-if="power[32]==1">更新提示</el-menu-item>
                    <el-menu-item index="/feedback" v-if="power[33]==1">玩家反馈</el-menu-item>
                    <el-menu-item index="/sysAccount" v-if="power[34]==1">系统账号列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>


        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'


    export default {
        computed:{
            ...mapState(['isCollapse','power']),
            pathFun(){
                if(this.$route.matched.length>2){
                    let str1 = this.$route.matched[this.$route.matched.length-2].path
                    let str2 = this.$route.matched[this.$route.matched.length-1].path
                    if(str2.indexOf(str1) != -1){
                        return  str1
                    }else{
                        return  str2
                    }
                }else{
                    return this.$route.path
                }
            }
        },
        created() {

        },
        methods:{

        },
    }
</script>

<style lang="scss" scoped>
    .aside{
        position: fixed;
        top:0;
        bottom: 0;
        left:0;
        background: #fff;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 180px;
        z-index: 1;
        .logo{
            width: 180px;
            height:60px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 10px;
            .logo-icon{
                margin-left:4px;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                margin-right: 10px;
                img{
                    width: 100%;
                }
            }
            P{
                color: #607D8B;
                font-weight: bold;
                font-size: 15px;
                font-family: 微软雅黑;
            }
        }
        .el-menu{
            width: 100%;
            overflow: hidden;
            border: none;

        }

    }
    .unfold{
        width:180px;
    }
    .pack-up{
        width:60px;
    }

</style>
<style lang="scss">
    #tokenholdem-aside{
        .el-menu-item.is-active{
            background: #26C6DA;
        }
        .mr10{
            margin-right: 10px;
            font-size: 24px;
        }
    }
</style>



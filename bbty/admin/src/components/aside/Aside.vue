<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="icon"><img src="../../assets/images/logo/logo.png" alt=""></span>
            <p v-if="!isCollapse">BBTY</p>
        </div>
        <el-menu
            id="titan-aside"
            class="el-menu-vertical-demo"
            default-active="/home"
            background-color="#fff"
            text-color="#607D8B"
            active-text-color="#fff"
            router
             :collapse="isCollapse">

            <el-menu-item index="/home">
                <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/bet_order">
                <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                <span>投注订单管理</span>
            </el-menu-item>

            <el-submenu index="/e_list">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/em.png" alt=""></i>
                    <span>赛事管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/e_list">赛事列表</el-menu-item>
                    <el-menu-item index="/e_count">赛事投注统计</el-menu-item>
                    <el-menu-item index="/e_matching">赛事匹配</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/overview">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>数据报表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/data_overview">数据总览</el-menu-item>
                    <el-menu-item index="/data_user">用户分析</el-menu-item>
                    <el-menu-item index="/data_details">游戏对局明细</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/user">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/user">总览</el-menu-item>
                    <el-menu-item index="/user_miner">矿工数据</el-menu-item>
                    <el-menu-item index="/user_details">用户详情</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/finance">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>财务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/finance">财务管理</el-menu-item>
                    <el-menu-item index="/finance_deposit">充提币明细</el-menu-item>
                    <el-menu-item index="/finance_usdt">USDT交易明细</el-menu-item>
                    <el-menu-item index="/finance_exchange">兑换明细</el-menu-item>
                    <el-menu-item index="/finance_recording">用户流水</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/app">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>APP管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/app">APP管理</el-menu-item>
                    <el-menu-item index="/app_user">发布新版本</el-menu-item>
                    <el-menu-item index="/app_details">查看详情</el-menu-item>
                </el-menu-item-group>
            </el-submenu>


        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        computed:{
            ...mapState(['isCollapse']),
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
            width: 100%;
            height:60px;
            display: flex;
            align-items: center;
            .icon{
                margin-left: 12px;
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
            }
        }
        .el-menu{
            width: 100%;
            overflow: hidden;
            .icon-box{
                width: 22px;
                height: 22px;
                overflow: hidden;
                margin-right: 20px;
                display: inline-block;
                position: relative;
                img{
                    position: absolute;
                    width: 100%;

                }
            }
        }
    }
    .unfold{
        width:180px;
    }
    .pack-up{
        width:60px;
    }
    .aside::-webkit-scrollbar {
        display: none;
    }

</style>
<style lang="scss">
    #titan-aside{
        background: #fff !important;
        .el-menu-item-group__title{
            display: none;
            padding: 0;
        }
        .el-submenu{
            padding-left:0;
        }
        .el-menu-item.is-active{
            background: #26C6DA !important;
        }
    }

</style>
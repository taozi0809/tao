<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="logo-icon" ><img src="../../assets/images/logo/logo.png" alt=""></span>
            <p v-if="!isCollapse">GameToken后台</p>
        </div>
        <el-menu
            id="tokenholdem-aside"
            default-active="/home"
            class="el-menu-vertical-demo"
            text-color="#607D8B"
            active-text-color="#fff"
            :default-active="$route.path"
            router
             :collapse="isCollapse">
            <el-menu-item index="/home" class="mj-li">
                <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                <span>首页</span>
            </el-menu-item>

            <el-submenu index="/userList">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/rm.png" alt=""></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/userList">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/overview">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>数据报表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/overview">数据总览</el-menu-item>
<!--                    <el-menu-item index="/user_analysis">用户分析</el-menu-item>-->
                    <el-menu-item index="/game_match">游戏对局明细</el-menu-item>
<!--                    <el-menu-item index="/game_match_details">游戏对局明细-查看详情</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/finance">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/fm.png" alt=""></i>
                    <span>财务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/finance">财务总览</el-menu-item>
                    <el-menu-item index="/wxpay">用户充值明细</el-menu-item>
                    <el-menu-item index="/redpacket">红包发放明细</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

<!--            <el-submenu index="/overview">-->
<!--                <template slot="title">-->
<!--                    <i class="icon-box"><img src="../../assets/images/aside/rm.png" alt=""></i>-->
<!--                    <span>组织角色管理</span>-->
<!--                </template>-->
<!--            </el-submenu>-->
        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        computed:{
            ...mapState(['isCollapse','gameName']),
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
        padding: 0 10px;
        .logo{
            width: 180px;
            height:60px;
            display: flex;
            align-items: center;
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

</style>
<style lang="scss">
    #tokenholdem-aside{
        .el-menu-item-group__title{
            display: none;
            padding: 0;
        }
        .el-submenu__title{
            padding-left: 10px !important;
        }
        .el-menu-item.is-active{
            background: #26C6DA;
        }
    }

</style>

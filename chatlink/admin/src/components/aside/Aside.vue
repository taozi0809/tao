<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="icon"><img src="../../assets/images/logo/chatlink.png" alt=""></span>
            <p v-if="!isCollapse">CHATLINK</p>
        </div>
        <el-menu
            default-active="3-1"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#ffffff"
            active-text-color="#409eff"
            router
             :collapse="isCollapse">
            <el-submenu index="1" disabled>
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                    <span>首页</span>
                </template>
            </el-submenu>
            <el-submenu index="2" disabled>
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/um.png" alt=""></i>
                    <span>用户管理</span>
                </template>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/dr.png" alt=""></i>
                    <span>数据报表</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/overview">数据总览</el-menu-item>
                    <el-menu-item index="/user" disabled>用户分析</el-menu-item>
                    <el-menu-item index="/game_details" disabled>游戏对局明细</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" disabled>
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/fm.png" alt=""></i>
                    <span>财务管理</span>
                </template>
            </el-submenu>
            <el-submenu index="5" disabled>
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/rm.png" alt=""></i>
                    <span>组织角色管理</span>
                </template>
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
        background: #304156;
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
                color: #fff;
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

</style>
<style lang="scss">
    .el-menu-item-group__title{
        display: none;
        padding: 0;
    }
    /*.unfold{*/
        /*.el-submenu__title{*/
            /*display: flex;*/
            /*align-items: center;*/
        /*}*/
    /*}*/
</style>
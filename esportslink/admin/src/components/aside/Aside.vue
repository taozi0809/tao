<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="icon"><img src="../../assets/images/logo/eSportsLink.png" alt=""></span>
            <p v-if="!isCollapse">电竞链</p>
        </div>
        <el-menu
            id="titan-aside"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#607D8B"
            active-text-color="#fff"
            router
             :collapse="isCollapse">
            <el-menu-item index="/home">
                <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/handicap">
                <i class="icon-box"><img src="../../assets/images/aside/em.png" alt=""></i>
                <span>盘口管理</span>
            </el-menu-item>

            <el-menu-item index="/fight">
                <i class="icon-box"><img src="../../assets/images/aside/em.png" alt=""></i>
                <span>约战管理</span>
            </el-menu-item>

            <el-submenu index="/propaganda">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/em.png" alt=""></i>
                    <span>宣传管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/propaganda">通知公告</el-menu-item>
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
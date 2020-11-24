<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="logo-icon"><img src="../../assets/images/logo/mahjong.png" alt=""></span>
            <p v-if="!isCollapse">麻将全家福后台</p>
        </div>
        <el-menu
            id="tokenholdem-aside"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            text-color="#607D8B"
            active-text-color="#fff"
            router
             :collapse="isCollapse">
            <el-menu-item index="/home">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/images/aside/home.png" alt=""></i>
                    <span>首页</span>
                </template>
            </el-menu-item>

<!--            <el-menu-item index="/prize">-->
<!--                <template slot="title">-->
<!--                    <i class="icon-box"><img src="../../assets/images/aside/fm.png" alt=""></i>-->
<!--                    <span>兑奖列表</span>-->
<!--                </template>-->
<!--            </el-menu-item>-->

<!--            <el-menu-item index="/update">-->
<!--                <template slot="title">-->
<!--                    <i class="icon-box"><img src="../../assets/images/aside/rm.png" alt=""></i>-->
<!--                    <span>兑奖</span>-->
<!--                </template>-->
<!--            </el-menu-item>-->
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
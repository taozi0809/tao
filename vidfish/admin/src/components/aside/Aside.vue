<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <el-menu
                id="vidfish-el-menu"
                default-active="0"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#ffffff"
                active-text-color="#409eff"
                router
                :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title" class="one-level">
                    <i class="icon-box"><img src="../../assets/img/menu/video.png" alt=""></i>
                    <span>视频管理</span>
                </template>
                <el-menu-item-group>

                    <el-submenu index="1-1">
                        <template slot="title" class="one-level">
                            <span>电影管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/videoManage">电影详情</el-menu-item>
                                <el-menu-item index="/videoTop">电影置顶</el-menu-item>
                            </el-menu-item-group>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="1-2">
                        <template slot="title" class="one-level">
                            <span>电视剧管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/tvManage">电视剧详情</el-menu-item>
                                <el-menu-item index="/tvTop">电视剧置顶</el-menu-item>
                            </el-menu-item-group>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--<el-menu-item index="/prevueManage" disabled="">预告片管理</el-menu-item>-->
                    <el-menu-item index="/typeManage">类型管理</el-menu-item>
                    <el-menu-item index="/help">帮助文档</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="2" disabled>
                <i class="icon-box"><img src="../../assets/img/menu/channel.png" alt=""></i>
                <span slot="title">频道管理</span>
            </el-menu-item>

            <el-submenu index="3">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/img/menu/user.png" alt=""></i>
                    <span>账户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/userManage">用户管理</el-menu-item>
                    <el-menu-item index="/feedback">用户反馈</el-menu-item>
                    <el-menu-item index="/searchRecord">搜索记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="icon-box"><img src="../../assets/img/menu/content.png" alt=""></i>
                    <span>内容管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/carousel">轮播图管理</el-menu-item>
                    <el-menu-item index="/actorManage">演员管理</el-menu-item>
                    <!--<el-menu-item index="/subtitleManage">字幕管理</el-menu-item>-->
                    <el-menu-item index="/startPage">启动页管理</el-menu-item>
                    <el-menu-item index="/columnMange">栏目管理</el-menu-item>
                    <el-menu-item index="/langPage" disabled>语言管理</el-menu-item>
                    <el-menu-item index="/pushMsg" disabled>消息推送管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
                <template slot="title" >
                    <i class="icon-box"><img src="../../assets/img/menu/administrator.png" alt=""></i>
                    <span slot="title">管理员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/rechargeManage">充值码管理</el-menu-item>
                    <el-menu-item index="/rechargeUserManage">充值码使用管理</el-menu-item>
                    <el-menu-item index="/freeManage">免费码管理</el-menu-item>
                    <el-menu-item index="/roleManage" disabled>角色管理</el-menu-item>
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
    width: 180vw * 0.052 ;
    min-width: 180px;
    position: fixed;
    top:0;
    bottom: 0;
    left:0;
    overflow: hidden;
    background: #304156;
    box-sizing: border-box;
    .el-menu{
        width: 100%;
        overflow: hidden;
        .icon-box{
            display: inline-block;
            width: 20px;
            margin-right: 20px;
            box-sizing: border-box;
            position: relative;
            img{
                width: 100%;
                position: absolute;
                top:-10px;
            }
        }
    }
}

.unfold{
    width: 180vw * 0.052 ;
    min-width: 180px;
}
.pack-up{
    width: 60vw * 0.052 ;
    min-width: 60px;
}
</style>
<style lang="scss">
    .el-menu-item-group__title{
        display: none;
        padding: 0;
    }
</style>
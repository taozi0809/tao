<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="logo-icon"><img src="../../assets/images/logo/logo.png" alt=""></span>
            <p v-if="!isCollapse">GOLF后台</p>
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

            <el-submenu index="2">
                <template slot="title">
                    <i class="jingji-iconhome mr10"></i>
                    <span>配置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/home/homeconfig">首页配置</el-menu-item>
                    <el-menu-item index="/home/match">赛事配置</el-menu-item>
                    <el-menu-item index="/home/userlist">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'


    export default {
        computed: {
            ...mapState(['isCollapse']),
            pathFun() {
                if (this.$route.matched.length > 2) {
                    let str1 = this.$route.matched[this.$route.matched.length - (this.$route.matched.length - 1)].path
                    let str2 = this.$route.matched[this.$route.matched.length - (this.$route.matched.length - 2)].path
                    if (str2.indexOf(str1) != -1) {
                        return str1
                    } else {
                        return str2
                    }
                } else {
                    if (this.$route.matched[this.$route.matched.length - 1].path == '/home/guess/:matchId' ||
                        this.$route.matched[this.$route.matched.length - 1].path == '/home/bet/:betTypeId/:betTypeName/:type' ||
                        this.$route.matched[this.$route.matched.length - 1].path == '/home/detail/:betSelectionId'
                    ) {
                        return '/home/match'
                    } else {
                        return this.$route.path
                    }

                }
            }
        },
        created() {

        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
  .aside {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    width: 180px;
    z-index: 1;

    .logo {
      width: 180px;
      height: 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;

      .logo-icon {
        margin-left: 4px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-right: 10px;

        img {
          width: 100%;
        }
      }

      P {
        color: #607D8B;
        font-weight: bold;
        font-size: 15px;
        font-family: 微软雅黑;
      }
    }

    .el-menu {
      width: 100%;
      overflow: hidden;
      border: none;

    }

  }

  .unfold {
    width: 180px;
  }

  .pack-up {
    width: 60px;
  }

</style>
<style lang="scss">
  #tokenholdem-aside {
    .el-menu-item.is-active {
      background: #26C6DA;
    }

    .mr10 {
      margin-right: 10px;
      font-size: 24px;
    }
  }
</style>



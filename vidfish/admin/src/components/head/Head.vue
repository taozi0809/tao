<template>
    <div class="head" :class="isCollapse?'head-pack-up':'head-unfold'">
        <div class="icon-box" @click="handleCollapse">
            <img src="../../assets/img/menu/menu.png" alt="">
        </div>
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {setSessionStore} from "../../storage";

    export default {
        computed:{
            ...mapState(['isCollapse']),
        },
        methods:{
            ...mapMutations(['ISCOLLAPSE']),
            handleCollapse(){
                this.ISCOLLAPSE(!this.isCollapse)
            },
            handleCommand(command){
                if(command==='loginOut'){
                    setSessionStore('isLogin',false)
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },0)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .head{
        position: fixed;
        top:0;
        left:180px;
        right: 0;
        min-width: 1020px;
        height: 60px;
        border-bottom: 1px solid #e7e7e7;
        /*background: rgba(255,255,255,0.8);*/
        /*background: #fff;*/
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition:left 0.3s;
        z-index: 10;
        .icon-box{
            width:40px;
            height: 40px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left:10px;
            cursor: pointer;
            transition:transform 0.4s;
            img{
                width: 100%;
            }
        }
        .el-dropdown{
            position: fixed;
            right: 10px;
            width: 100px;
            height: 40px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
    .head-pack-up{
        left: 60px;
        .icon-box{
            transform:rotate(90deg);
        }
    }
    .head-unfold{
        left:180px;
        .icon-box{
            transform:rotate(0deg);
        }
    }
</style>
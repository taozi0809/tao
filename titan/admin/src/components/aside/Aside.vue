<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="icon"><img src="../../assets/images/logo/titan.jpg" alt=""></span>
            <p v-if="!isCollapse">TITAN</p>
        </div>
        <el-menu
            id="titan-aside"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#607D8B"
            active-text-color="#fff"
            router
            :collapse="isCollapse">
            <el-submenu v-for="(item,index) in managerMenus" :index="index">
                <template slot="title">
                    <i class="icon-box"><img :src="item.icon" alt=""></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item-group v-for="(subItem,subIndex) in item.submenus">
                    <el-menu-item :index="subItem.index">{{subItem.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'
    import {managerMenu} from "../../service/api";
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                managerMenus:[],
            }
        },
        computed:{
            ...mapState(['isCollapse','token','manageMenuList']),
        },
        created:function(){
            this.managerToken()
        },
        methods:{
            ...mapMutations(['MANAGEMENULIST']),
            managerToken(){
                if(this.manageMenuList.length>0){
                    this.managerMenus = this.manageMenuList
                }else{
                    managerMenu(this.token).then(res=>{
                        console.log('管理员菜单',res)
                        if(res.code==0){
                            if(!res.data.managerMenus.length>0){
                                Message.error('菜单为空')
                            }else{
                                this.managerMenus = res.data.managerMenus
                                this.MANAGEMENULIST(res.data.managerMenus)
                                for(let i in this.managerMenus){
                                    if(this.managerMenus[i].name=='TITAN代理'){
                                        this.$router.push({path:this.managerMenus[i].submenus[0].index});
                                    }
                                }
                            }
                        }else{
                            Message.error(res.message)
                        }
                    })
                }
            }
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
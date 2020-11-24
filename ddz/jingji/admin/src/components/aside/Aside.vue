<template>
    <div class="aside" :class="isCollapse?'pack-up':'unfold'">
        <div class="logo">
            <span class="logo-icon" ><img src="../../assets/images/logo/logo.png" alt=""></span>
            <p v-if="!isCollapse">竞技二打一斗地主-后台</p>
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

            <el-menu-item :index="item.path" v-for="item in listS">
                <i :class="item.i"></i>
                <span>{{item.name}}</span>
            </el-menu-item>


            <el-submenu :index="item.path" v-for="(item,index) in listE">
                <template slot="title">
                    <i :class="item.i"></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item :index="item1.path" v-for="item1 in item.list" v-if="item1.disabled">{{item1.name}}</el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'
    import {routerOptionsS,routerOptionsE} from "../../filter/filters";

    export default {
        data(){
            return{
                listS:[],
                listE:[],
            }
        },
        computed:{
            ...mapState(['isCollapse','token','pages']),
        },
        created() {
            let list1 = []
            let list2 = []
            for(let i in this.pages){
                if(this.pages[i].List===null){
                    list1.push(this.pages[i])
                }else{
                    list2.push(this.pages[i])
                }
            }
            let list3=[]
            for(let i in routerOptionsS){
                for(let j in list1){
                    if(list1[j].Title==routerOptionsS[i].name){
                        list3.push(routerOptionsS[i])
                    }
                }
            }
            this.listS=list3


            let list22=[]
            let list4=[...routerOptionsE]
            for(let i in list2){
                for(let j in list2[i].List){
                    list22.push(list2[i].List[j])
                }
            }
            for(let i in list4){
                for(let j in list4[i].list){
                    list4[i].list[j].disabled=true
                   if(list22.indexOf(list4[i].list[j].name)==-1){
                       list4[i].list[j].disabled=false

                   }
                }
            }
           this.listE=list4
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
                flex-shrink: 0;
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



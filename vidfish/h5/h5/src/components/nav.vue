<template>
    <div class="nav">
        <router-link class="item" to="/home" title="home" active-class="active">
            <span v-if="pathName=='home'"><img src="../assets/images/nav/home-active.png" alt=""></span>
            <span v-if="pathName!='home'"><img src="../assets/images/nav/home.png" alt=""></span>
            <p>主页</p>
        </router-link>
        <router-link class="item" to="/vip" title="vip" active-class="active">
            <span v-if="pathName=='vip'" class="span-2"><img src="../assets/images/nav/group-active.png" alt=""></span>
            <span v-if="pathName!='vip'" class="span-2"><img src="../assets/images/nav/group.png" alt=""></span>
            <p>会员</p>
        </router-link>
        <router-link class="item" to="/user" title="user" active-class="active">
            <span v-if="pathName=='user'" class="span-3"><img src="../assets/images/nav/me-active.png" alt=""></span>
            <span v-if="pathName!='user'" class="span-3"><img src="../assets/images/nav/me.png" alt=""></span>
            <p>个人</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pathName:'home',
            }
        },
        created:function(){
            this.pathName=this.$route.name
        },

    }
</script>
<style lang="scss" scoped>
    .nav{
        position: fixed;
        z-index: 99;
        width: 100%;
        height:100px;
        /*border: 1px solid red;*/
        overflow: hidden;
        box-sizing: border-box;
        bottom: 0;

        display: grid;
        grid-template-columns:repeat(3,33.33%);
        border-top: 1px solid #fff;

        .item{
            width: 100%;
            height: 100px;
            /*border: 1px solid #ffffff;*/
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction:column;
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                overflow: hidden;
                /*border: 1px solid red;*/
                margin-bottom: 12px;
                img{
                    width: 100%;
                    border: 0;
                }
            }
            p{
                color: #5D5D5D;
                font-size:24px;
            }
            .span-2{
                width: 53px;
            }
            .span-3{
                width: 43px;
            }
        }
        .active{
           p{
               color: #fff;
           }
        }
    }
</style>
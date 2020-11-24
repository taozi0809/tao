<template>
    <div class="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {setSessionStore,getSessionStore} from "./storage";
    import {autoPayInfo} from "./service/api";
    import { Toast } from 'vant';
    export default {
        data(){
            return{}
        },
        created:function(){
            this.userName=getSessionStore('userName')
            this.token=getSessionStore('token')
            if(!!this.userName&&this.token){}else{
                this.userName=this.$route.query.userName
                this.token=this.$route.query.token
                if(!!this.userName){setSessionStore('userName',this.userName)}else{Toast.fail({message:'userName为空',duration:1500})}
                if(!!this.token){setSessionStore('token',this.token)}else{Toast.fail({message:'token为空',duration:1500})}
            }
            setSessionStore('isAutoPayInfo',null)
            autoPayInfo(this.userName,this.token).then(res=>{
                console.log('是否设置自动获取：',res)
                if(res.code==0){
                    this.ISAUTOPAYINFO(res.data.isAutoPayInfo)
                    setSessionStore('isAutoPayInfo',res.data.isAutoPayInfo)
                }
            })
        },
        mounted:function(){
            window.selectPhoto = this.selectPhoto
            window.getPhotoUrl = this.getPhotoUrl
        },
        methods:{
            ...mapMutations(['IOSUPLOADURL','ISAUTOPAYINFO']),
            selectPhoto(){},
            getPhotoUrl(url){this.IOSUPLOADURL(url)},
        },
    }
</script>
<style lang="scss">
    @import "assets/css/normalize.css";
    @import "assets/css/public";
</style>
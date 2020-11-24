<template>
    <div class="user">
        <Head/>
        <div class="top"></div>
        <section class="main">
            <div class="con">
                <div class="nav" :class="!!userInfo.parentId?'subAccount':''">
                    <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</div>
                    <ul>
                        <li @click="$router.push({path:'/account'})">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</li>
                        <li class="active">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.subAccount:''}}</li>
                        <li @click="linkPay" v-if="!userInfo.parentId">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membership:''}}</li>
                    </ul>
                </div>
                <div class="r-con" v-if="status=='0'&&!this.userInfo.parentId">
                    <div class="t">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.subAccountTitle:''}}</div>
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <div class="item1 item" v-if="item.isSubAccount">
                                <div class="num">{{index+1}}</div>
                                <div class="new">{{item.email}}</div>
                                <div class="des">
                                    <!--<div class="united" @click="unitedSubAccount(item.id)">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.united:''}}</div>-->
                                    <div class="delete" @click="deleteSubAccount(item.id)">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.delete:''}}</div>
                                </div>
                            </div>
                            <div class="item2 item" v-if="!item.isSubAccount" @click="goToAdd(index)">
                                <div class="num">+</div>
                                <div class="new">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.createNewSubAccount:''}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="r-con" v-if="status=='1'&&!this.userInfo.parentId">
                    <div class="t">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.createNewSubAccount:''}}</div>
                    <div class="input-box">
                        <div class="label">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.email:''}}*</div>
                        <div class="input"><input type="text" v-model="email"></div>
                    </div>
                    <div class="input-box">
                        <div class="label">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.passwordR1:''}}</div>
                        <div class="input"><input type="text" v-model="password"></div>
                    </div>
                    <div class="addSubAccount" @click="addSubAccount">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.addSubAccount:''}}</div>
                </div>
                <div class="r-con" v-if="!!this.userInfo.parentId">
                    <div class="t">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.isSubAccount:''}}</div>
                    <div class="txt1">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.isSubAccountTxt1:''}}</div>
                    <div class="txt2">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.isSubAccountTxt2:''}}</div>
                    <div class="btn" @click="unitedSubAccount(userInfo.id)">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.upgrade:''}}</div>
                </div>


            </div>
        </section>
        <message ref="message"/>
    </div>
</template>

<script>
    import Head from '../../components/Head'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../../assets/data/langCon";
    import {subaccountAdd,subaccountList,subaccountDelete,subaccountUnited} from "../../service/api";

    export default {
        metaInfo: {
            title: 'Your Sub-Accounts - Vidfish',
            meta: [{
                name: 'keyWords',
                content: 'chinese dramas, chinese movies, watch chinese drama online, chinese movies online, watch chinese movies online, popular chinese drama 2019, chinese movie streaming'
            },
            {
                name: 'description',
                content: 'Update your Vidfish sub-accounts and share the joy of VIP with three other friends! '
            }],
        },
        components:{Head},
        data(){
            return{
                langCon:langCon,
                list:[],
                status:0,//0->显示子账户列表 1->添加子账户
                email:'',
                password:'',
            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo','country']),
        },
        created:function(){
            this.subaccountList()
        },
        mounted:function(){
            if(!this.isLogin){
                switch (this.lang.lang) {
                    case 'ZH':
                        // this.$refs.message.Message('您尚未登录。立即登录！');
                        alert('您尚未登录。立即登录！');
                        break;
                    case 'EN':
                        // this.$refs.message.Message('You are not logged in. Login now! ');
                        alert('You are not logged in. Login now! ');
                        break;
                    case 'IND':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'ES':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'PT':
                        // this.$refs.message.Message('Você não está logado. Entre agora!');
                        alert('Você não está logado. Entre agora!');
                        break;
                    default:
                        alert('You are not logged in. Login now! ');
                }
                this.$router.push({path:'/home'})
            }
        },
        methods:{
            linkPay(){
                if(this.userInfo.isVip==0){this.$router.push({path:'/member'})}
                if(this.userInfo.isVip!=0){this.$router.push({path:'/pay'})}
            },
            subaccountList(){
                subaccountList(this.userInfo.id).then(res=>{
                    console.log('子账户列表',res)
                    if(res.code==0){
                        let list=[]
                        list=[...res.data.userCtoModelList,...list]
                        for(let i=0;i<3;i++){
                            if(!!list[i]){}else{
                                list[i]={}
                            }
                            list[i]['isSubAccount']=true
                        }
                        let l = parseInt(res.data.userCtoModelList.length)
                        let n=3-l
                        for(var i=0;i<n;i++){
                            list[i+l].isSubAccount=false
                        }
                        this.list=list
                    }
                })
            },
            goToAdd(item){
                this.status=1
            },
            addSubAccount(){
                if(!!this.email&&!!this.password){
                    subaccountAdd(this.userInfo.id,this.email,this.password).then(res=>{
                        console.log('添加子账户',res)
                        if(res.code==0){
                            this.subaccountList()
                            this.status=0
                            this.email=''
                            this.password=''
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
            unitedSubAccount(id){
                subaccountUnited(id).then(res=>{
                    console.log('解绑子账户',res)
                    if(res.code==0){
                        this.subaccountList()
                        window.location.reload();
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            },
            deleteSubAccount(id){
                subaccountDelete(id).then(res=>{
                    console.log('删除子账户',res)
                    if(res.code==0){
                        this.subaccountList()
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            },
        },
        watch:{
            isLogin(newValue,oldValue){
                if(newValue!=oldValue){
                    if(!newValue){
                        this.$router.push('/')
                    }
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .top{
        position: absolute;
        width: 100%;
        height: 750px;
        background: url("../../assets/img/bg.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main{
        position: absolute;
        top:150px;
        min-width: 1200px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 60px;
        .con{
            width: 100%;
            min-width: 1200px;
            display: flex;
            .nav{
                width: 260px;
                border: 1px solid #fff;
                box-sizing: border-box;
                flex:  0 0 auto;
                height: 240px;
                overflow: hidden;
                .title{
                    font-size: 32px;
                    font-weight: bold;
                    color: #f7f7f7;
                    height: 60px;
                    line-height: 60px;
                    box-sizing: border-box;
                    padding: 0 10px;
                }
                ul{
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    li{
                        font-size: 16px;
                        font-weight: bold;
                        color: #fff;
                        cursor: pointer;
                        height: 60px;
                        line-height: 60px;
                        box-sizing: border-box;
                        padding: 0 10px;
                    }
                    .active{
                        cursor: default;
                        background: #358dfe;
                        /*background: #62a4fa;*/
                    }

                }
            }
            .subAccount{
                height: 180px;
            }
            .r-con{
                flex: 1 1 auto;
                height: 480px;
                background: #151515;
                box-sizing: border-box;
                padding: 15px;
                .t{
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 20px;
                }
                ul{
                    li{
                        .item{
                            display: flex;
                            align-items: center;
                            height: 60px;
                            width: 500px;
                            position: relative;
                            .new{
                                font-size: 16px;
                                width: 500px;
                                height: 24px;
                                border-bottom: 1px solid #fff;
                            }
                            .des{

                                display: flex;
                                align-items: center;
                                position: absolute;
                                right: 0;
                                .united{
                                    font-size: 16px;
                                    color: #358dfe;
                                    margin-right: 15px;
                                    cursor: pointer;
                                }
                                .delete{
                                    font-size: 16px;
                                    color: #358dfe;
                                    cursor: pointer;

                                }
                            }
                        }
                        .item1{
                            .num{
                                width: 20px;
                                height: 20px;
                                overflow: hidden;
                                border-radius: 50px;
                                border: 2px solid #fff;
                                color: #fff;
                                margin-right: 15px;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 14px;
                            }
                            .new{
                                color: #fff;
                            }
                        }
                        .item2{
                            .num{
                                width: 20px;
                                height: 20px;
                                line-height: 17px;
                                overflow: hidden;
                                border-radius: 50px;
                                border: 2px solid #fff;
                                color: #fff;
                                font-size:18px;
                                margin-right: 15px;
                                font-weight: bold;
                                text-align: center;
                            }
                            .new{
                                color:#358dfe;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .input-box{
                    width: 500px;
                    margin-bottom: 30px;
                    .label{
                        color: #555;
                        font-size: 16px;
                    }
                    .input{
                        input{
                            border:0;
                            width: 500px;
                            height: 30px;
                            background: none;
                            color: #fff;
                            font-size: 16px;
                            border-bottom: 1px solid #fff;
                            outline:none;
                        }
                    }

                }
                .addSubAccount{
                    width: 500px;
                    background:#358dfe;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .txt1{
                    color: #fff;
                    font-size: 16px;
                    margin-bottom: 30px;
                }
                .txt2{
                    color: #fff;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                .btn{
                    width: 300px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #358dfe;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
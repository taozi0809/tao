<template>
    <div class="create-group">
        <div class="con">
            <div class="l">
                <div class="top">
                    <div class="search"><input type="text" v-model="searchTxt" placeholder="搜索" @input="change"></div>
                    <div class="all">全选</div>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="(item,index) in showList" :key="index" @click="selectTo(item,index)">
                            <div class="info">
                                <span><img :src="item.avatar" alt=""></span>
                                <div class="name">{{item.userNickName}}</div>
                            </div>
                            <div class="radio-select">
                               <span v-if="!item.isSelect"><img src="../assets/images/font_select.png" alt=""></span>
                               <span v-if="item.isSelect"><img src="../assets/images/font_selected.png" alt=""></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bot">
                    <div class="btn" @click="POPOVER('0')">取消</div>
                    <div class="btn" @click="groupCreate">创建群聊</div>
                </div>
            </div>
            <div class="r">
                <div class="top">已选{{listSelected.length}}/{{friendList.length}}</div>
                <div class="list">
                    <ul>
                        <li v-for="(item,index) in listSelected" :key="index" @click="selectTo(item,index)">
                            <div class="info">
                                <span><img :src="item.avatar" alt=""></span>
                                <div class="name">{{item.userNickName}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {groupCreate} from "../service/api";

    export default {
        data(){
            return{
                listAll:[],
                showList:[],
                listSelected:[],
                searchTxt:'',
            }
        },
        computed:{
            ...mapState(['friendList','userInfo','token']),
        },
        created:function(){
            this.listAll=[...this.friendList]
            for(let i in this.listAll){
                this.listAll[i]['isSelect']=false
            }
            this.showList=[...this.listAll]
        },
        methods:{
            ...mapMutations(['POPOVER',]),
            selectTo(item,index){
                this.showList[index]['isSelect']=!this.showList[index]['isSelect']
                if(item.isSelect){
                    this.listSelected.push(item)
                }else{
                    for(let i in this.listSelected){
                        if(this.listSelected[i].idCode==item.idCode){
                            this.listSelected.splice(i,1)
                        }
                    }
                }
                // this.$forceUpdate()
            },
            groupCreate(){
                if(this.listSelected.length>0){
                    let userIdCodes=[]
                    for(let i in this.listSelected){
                        userIdCodes.push(this.listSelected[i].idCode)
                    }
                    groupCreate(this.userInfo.userName,this.token,`${this.userInfo.nickName}的群聊`,'NORMAL',userIdCodes).then(res=>{
                        console.log('创建群聊',res)
                        if(res.code==0){
                            this.POPOVER('0')
                            window.location.reload();
                        }
                    })
                }

            },
            change(){
                if(!!this.searchTxt){
                    this.showList=this.listAll.filter(value => value.nickName.indexOf(this.searchTxt) !==-1)
                }else{
                    this.showList=[...this.listAll]
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .create-group{
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        .con{
            height: 30vw;
            min-height: 480px;
            width: 30vw;
            min-width: 440px;
            background: #fff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            padding: 20px 0;
            position: relative;
            overflow: hidden;
            .l{
                width:60%;
                height: 100%;
                border-right: 1px solid #DBE0E7;
                box-sizing: border-box;
                overflow: hidden;
                .top{
                    display: flex;
                    align-items: center;
                    width: calc(100% - 30px);
                    margin: 0 auto;
                    height: 40px;
                    line-height: 40px;
                    /*border: 1px solid red;*/
                    .search{
                        width: 100%;
                        input{
                            background:#E4E4E4;
                            height: 30px;
                            line-height: 30px;
                            width: 100%;
                            box-sizing: border-box;
                            padding: 0 10px;
                            border-radius: 6px;
                            color: #333;
                        }
                        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                            color:   #888888;
                            text-align: center;
                        }
                        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                            color:   #888888;
                            text-align: center;
                        }
                        ::-moz-placeholder { /* Mozilla Firefox 19+ */
                            color:   #888888;
                            text-align: center;
                        }
                        :-ms-input-placeholder { /* Internet Explorer 10-11 */
                            color:   #888888;
                            text-align: center;
                        }
                    }
                    .all{
                        color: #333333;
                        font-size: 16px;
                        width: 60px;
                        text-align: right;
                        font-weight: 600;

                    }
                }
                .list{
                    width: calc(100% - 30px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    height: calc(30vw - 100px);
                    min-height: 380px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    ul{
                        li{
                            width: 100%;
                            height: 60px;
                            overflow: hidden;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 10px;
                            .info{
                                display: flex;
                                align-items: center;
                                flex: auto;
                                overflow: hidden;
                                span{
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 50px;
                                    height: 50px;
                                    overflow: hidden;
                                    margin-right: 8px;
                                    border-radius: 6px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .name{
                                    color: #333333;
                                    font-size: 14px;
                                    font-weight: 600;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                            }
                            .radio-select{
                                min-width: 60px;
                                height: 60px;
                                overflow: hidden;
                                flex: 0 0 60px;
                                display: flex;
                                align-items: center;
                                flex-direction: row-reverse;
                                /*border: 1px solid red;*/
                                span{
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 26px;
                                    img{
                                        width: 100%;
                                    }
                                }

                            }
                        }
                    }
                }
                .list::-webkit-scrollbar {display:none;}
                .bot{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    bottom: 20px;
                    width: calc(60% - 30px);
                    left: 15px;
                    .btn{
                        width: 84px;
                        height: 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #003680;
                        border-radius: 6px;
                        color: #003680;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }
            .r{
                width: 40%;
                height: 100%;
                box-sizing: border-box;
                overflow: hidden;
                .top{
                    color: #888888;
                    font-size: 14px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 15px;
                    height: 40px;
                    line-height: 40px;
                    /*border: 1px solid red;*/
                }
                .list{
                    width: calc(100% - 30px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    height: calc(30vw - 20px);
                    min-height: 440px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    /*border: 1px solid red;*/
                    ul{
                        li{
                            width: 100%;
                            height: 40px;
                            overflow: hidden;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 10px;
                            .info{
                                display: flex;
                                align-items: center;
                                flex: auto;
                                overflow: hidden;
                                span{
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 30px;
                                    height: 30px;
                                    overflow: hidden;
                                    margin-right: 8px;
                                    border-radius: 6px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .name{
                                    color: #333333;
                                    font-size: 12px;
                                    font-weight: 600;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
            }


        }
    }
</style>
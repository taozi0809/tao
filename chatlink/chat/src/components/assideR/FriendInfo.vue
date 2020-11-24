<template>
    <div class="friend-info">
        <div class="top">好友信息</div>
        <div class="name-label">好友昵称</div>
        <div class="name">{{JSON.parse(chatInfo.params).nickName}}</div>
        <div class="stick">
            <div class="t2">置顶聊天</div>
            <div class="r">
                <el-switch
                        v-model="stick"
                        active-color="#56c47d"
                        inactive-color="#bbb"
                        @change="onStick2"
                >
                </el-switch>
            </div>
        </div>

        <div class="btn" @click="relationD">删除好友</div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {relationDelete} from "../../service/api";
    import {duplicateRemoval,sortKey} from "../../util/tools/sore";

    export default {
        data(){
            return{
                stick:false,
            }
        },
        computed:{
            ...mapState(['chatInfo','userInfo','token','topList','messageList'])
        },
        created:function(){
           for(let i in this.topList){
               if(this.topList[i].groupIdCode==this.chatInfo.groupIdCode){
                   this.stick=true
               }
           }
        },
        methods:{
            ...mapMutations(['CHATSTATUS','ISCHATINFODES','TOPLIST','MESSAGELIST','ISCHATINFODES']),
            relationD(){
                relationDelete(this.userInfo.userName,this.token,JSON.parse(this.chatInfo.params).idCode).then(res=>{
                    console.log('删除好友',res)
                    if(res.code==0){
                        this.CHATSTATUS('0')
                        this.ISCHATINFODES(false)
                        window.location.reload();
                    }
                })
            },
            onStick2(){
                if(this.stick){
                    //添加置顶
                    var arr1=[]
                    arr1.push(this.chatInfo)
                    var arr2=[]
                    arr2=[...arr1,...this.topList]
                    this.TOPLIST(arr2)
                    var list4 = duplicateRemoval(this.messageList,this.topList)
                    this.MESSAGELIST([...this.topList,...list4])
                    setTimeout(()=>{
                        this.ISCHATINFODES(false)
                    },100)

                }else{
                    // 取消置顶
                    var arr=[]
                    for(let i in this.topList){
                        if(this.topList[i].groupIdCode!=this.chatInfo.groupIdCode){
                            arr.push(this.topList[i])
                        }
                    }
                    this.TOPLIST(arr)


                    var list3 = sortKey(this.messageList,'lastTime')
                    //去重
                    var list4 = duplicateRemoval(list3,this.topList)
                    this.MESSAGELIST([...this.topList,...list4])
                    setTimeout(()=>{
                        this.ISCHATINFODES(false)
                    },100)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .friend-info{
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        .top{
            height: 3.9vw;
            min-height: 62.5px;
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            box-sizing: border-box;
            padding: 0 15px;
        }
        .name-label{
            color: #888888;
            font-size: 16px;
            box-sizing: border-box;
            padding: 0 15px;
            width: 100%;
            margin-bottom: 10px;
        }
        .name{
            width: 100%;
            color: #333333;
            font-size: 14px;
            box-sizing: border-box;
            padding: 0 15px;
        }
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
            position: absolute;
            right:15px;
            bottom: 20px;
            cursor: pointer;
        }
        .stick{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            .t2{
                color: #333333;
                font-size: 16px;
            }
            .l{
                color: #888888;
                font-size: 16px;
            }
        }
    }

</style>
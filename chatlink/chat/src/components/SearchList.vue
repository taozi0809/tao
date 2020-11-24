<template>
    <div class="red-packet" @click.stop="POPOVER('0')">
        <div class="left">
            <input type="text" v-model="txt" placeholder="搜索" @input="change" @click.stop="POPOVER('14')" autofocus>

            <div class="all">
                <ul>
                    <li v-for="(item,index) in list" :key="index">
                        <div v-if="item.type=='GROUP'" class="item" @click="chatGroup(item,index)">
                            <div class="head-img">
                                <GroupHeadImg :imgList="JSON.parse(item.params).icons"/>
                            </div>
                            <div class="message">
                                <div class="t1">{{JSON.parse(item.params).name}}</div>
                            </div>
                        </div>
                        <div v-if="item.type=='USER'" class="item" @click="chatFriend(item,index)">
                            <div class="head-img">
                                <GroupHeadImg :imgList="JSON.parse(item.params).avatar"/>
                            </div>
                            <div class="message">
                                <div class="t1">{{JSON.parse(item.params).nickName}}</div>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import GroupHeadImg from '../components/GroupHeadImg'

    export default {
        components:{GroupHeadImg,},
        data(){
            return{
                txt:'',
                list:[],
            }
        },
        computed:{
            ...mapState(['chatInfo','packetInfo','userInfo','token','messageList']),
        },
        created:function(){

        },
        methods:{
            ...mapMutations(['POPOVER','CHATSTATUS','CHATINFO']),
            change(){
                if(!!this.txt){
                    var arr=[]
                    for(let i in this.messageList){
                        if(this.messageList[i].type=='GROUP'){
                            // console.log(JSON.parse(this.messageList[i].params).name)
                            if(JSON.parse(this.messageList[i].params).name.indexOf(this.txt)!= -1){
                                // console.log(JSON.parse(this.messageList[i].params).name)
                                arr.push(this.messageList[i])
                            }
                        }
                        if(this.messageList[i].type=='USER'){
                            // console.log(JSON.parse(this.messageList[i].params).nickName)
                            if(JSON.parse(this.messageList[i].params).nickName.indexOf(this.txt)!= -1){
                                // console.log(JSON.parse(this.messageList[i].params).nickName)
                                arr.push(this.messageList[i])
                            }
                        }
                    }
                    this.list=arr
                }else{
                    this.list=[]
                }
            },
            chatGroup(item,index){
                this.CHATSTATUS('2')
                this.CHATINFO(item)
            },
            chatFriend(item,index){
                this.CHATSTATUS('1')
                this.CHATINFO(item)

            },
        },
    }
</script>

<style lang="scss" scoped>
    .red-packet{
        position: absolute;
        z-index: 15;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        .left{
            width:13vw;
            height: 39vw;
            min-width: 208px;
            min-height: 625px;
            overflow: hidden;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            background: #fff;
            padding: 20px 10px;
            input{
                display: block;
                width: 100%;
                background: #D5DCE6;
                font-size: 14px;
                border-radius: 5px;
                height:30px;
                line-height: 30px;
                overflow: hidden;
                box-sizing: border-box;
                padding: 0 10px;
                color: #333;
            }
            .all{
                width: 100%;
                height: 550px;
                box-sizing: border-box;
                /*border: 1px solid red;*/
                overflow-x: hidden;
                overflow-y: auto;
                ul{
                    li{
                        .item{
                            display: flex;
                            align-items: center;
                            width: 100%;
                            height: 70px;
                            box-sizing: border-box;
                            overflow: hidden;
                            position: relative;
                            margin: 0 auto;
                            .head-img{
                                width: 42px;
                                height: 42px;
                                margin-right: 6px;
                                background: #fff;
                                border-radius: 6px;
                                overflow: hidden;
                                flex-shrink:0;
                                margin-left: 10px;
                            }
                            .message{
                                box-sizing: border-box;
                                height: 50px;
                                line-height: 50px;
                                flex-shrink: 0;
                                width: 150px;
                                overflow: hidden;
                                .t1{
                                    font-size: 15px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space : nowrap;
                                }

                            }

                        }
                    }
                }
            }
            .all::-webkit-scrollbar {display:none;}
        }
    }
</style>

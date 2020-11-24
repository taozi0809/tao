<template>
    <div class="video-play">
        <video id="player-container-id" width="930"  height="584" preload="auto" playsinline webkit-playsinline autoplay></video>

        <div class="sub" v-if="typeName=='DRAMA'&&subtitleList.length>0">
            <div class="sub-btn">
                <span class="icon">sub</span>
                <p class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].details.subBtn:''}}</p>
            </div>
            <div class="sub-list" :class="'sub-list'+subtitleList.length">
                <ul>
                    <li v-for="item in subtitleList" :class="langName==item.lang?'active':''" @click="selectSub(item.lang)">{{item.subtitleName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {playbackStatTimes,playbackSave} from "../service/api";
    import {getLocalStore} from "../storage";
    import {langCon} from "../assets/data/langCon";
    import {mapState, mapMutations} from 'vuex'
    import jq from '../assets/config/jquery.min'

    export default {
        ...jq,
        data(){
            return{
                player:null,
                token:'',
                langCon:{},
                langName:'',
            }
        },
        computed:{
            ...mapState(['lang']),
        },
        props: {
            fileId:String,
            id:null,
            typeName:String,
            subtitleList:Array,
        },
        created:function(){
            this.langCon = langCon
            this.langName = this.lang.lang
        },
        mounted:function(){
            this.token = getLocalStore('token')
            console.log(this.fileId,this.id,this.typeName,this.subtitleList)
            if(!!this.player){
                this.player.loadVideoByID({
                    fileID:this.fileId, // 请传入需要播放的视频filID 必须
                    appID: '1255464773', // 请传入点播账号的appID 必须
                });
            }else{
                this.player = TCPlayer('player-container-id', { // player-container-id 为播放器容器ID，必须与html中一致
                    fileID:this.fileId, // 请传入需要播放的视频filID 必须
                    appID: '1255464773', // 请传入点播账号的appID 必须
                    plugins:{
                        ProgressMarker: true,//进度条标记
                        ContinuePlay: { // 开启续播功能
                            auto: true, //[可选] 是否在视频播放后自动续播
                            text:'上次播放至 ', //[可选] 提示文案
                            btnText: '恢复播放' //[可选] 按钮文案
                        },
                    }
                });
            }
            setTimeout(()=>{
                playbackStatTimes(this.id).then(res=>{
                    console.log('视频播放量累计:',res)
                })
            },30000)
            setTimeout(()=>{
                let duration = parseInt(this.player.currentTime())
                playbackSave(this.token,this.id,duration,this.typeName).then(res=>{
                    console.log('播放历史保存:',res)
                })
            },5000)

            if(this.typeName=='DRAMA'){
                setTimeout(()=>{
                    $('video').addClass('playr_video')
                    for(let i in this.subtitleList){
                        if(this.subtitleList[i].lang==this.lang.lang){
                            $(`<track src="${this.subtitleList[i].httpsUrl}" srclang="${this.subtitleList[i].lang}" label="${this.subtitleList[i].subtitleName}" kind="subtitles" default class="subContent" id="id_${this.subtitleList[i].lang}">`).appendTo('video')
                        }
                    }
                },500)
            }
        },
        methods:{
            selectSub(lang){
                if(this.langName!=lang){
                    this.langName=lang
                    $('video').empty();
                    for(let i in this.subtitleList){
                        if(this.subtitleList[i].lang==lang){
                            $(`<track src="${this.subtitleList[i].httpsUrl}" srclang="${this.subtitleList[i].lang}" label="${this.subtitleList[i].subtitleName}" kind="subtitles" default class="subContent" id="id_${this.subtitleList[i].lang}">`).appendTo('video')
                        }
                    }
                }

            },
        },
        beforeDestroy:function(){
            this.player.dispose()
        },
        watch:{
            lang(newValue,oldValue){
                if(newValue!=oldValue){
                    $('video').empty();
                    this.langName=newValue.lang
                    for(let i in this.subtitleList){
                        if(this.subtitleList[i].lang==newValue.lang){
                            $(`<track src="${this.subtitleList[i].httpsUrl}" srclang="${this.subtitleList[i].lang}" label="${this.subtitleList[i].subtitleName}" kind="subtitles" default class="subContent" id="id_${this.subtitleList[i].lang}">`).appendTo('video')
                        }
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .video-play{
        box-sizing: border-box;
        width: 930px;
        height: 584px;
        position: relative;
        .sub{
            position: absolute;
            right: 150px;
            bottom: 0;
            z-index: 9999;
            height: 36px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            .sub-btn{
                display: flex;
                align-items: center;
                cursor: pointer;
                span{
                    border: 1px solid #fff;
                    padding:2px;
                    border-radius: 2px;
                    color: #fff;
                    font-size: 12px;
                    margin-right: 5px;
                }
                p{
                    color: #fff;
                    font-size: 12px;
                }
            }
            .sub-list{
                position: absolute;
                display: none;
                ul{
                    background: #000;
                    li{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        white-space : nowrap;
                        text-align: center;
                        color: #fff;
                        height: 36px;
                        font-size: 12px;
                        padding: 0 8px;
                        cursor: pointer;
                    }
                    li:hover{
                        background: rgba(43, 51, 63, 0.7);
                        color: #fff;
                    }
                    .active{
                        background: #fff;
                        color: #000;
                    }
                    .active:hover{
                        background: #fff;
                        color: #000;
                    }

                }
            }
            .sub-list1{
                top: -36px;
            }
            .sub-list2{
                top: -72px;
            }
            .sub-list3{
                top: -108px;
            }
        }
        .sub:hover{
            .sub-list{
                display: block;
            }
        }
    }
</style>
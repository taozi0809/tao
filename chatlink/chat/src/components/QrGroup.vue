<template>
    <div class="qr-group" @click.stop="POPOVER('0')">
        <div class="con">
            <div class="t">群二维码</div>
            <div class="box">
                <div id="qrcode"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {qrGroupinfo} from "../service/api";
    import QRCode from 'qrcodejs2'

    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['chatInfo']),
        },
        created:function(){
            qrGroupinfo(this.chatInfo.groupIdCode).then(res=>{
                console.log('群二维码',res)
                if(res.code==0){
                    this.init(res.data)
                }
            })
        },
        methods:{
            ...mapMutations(['POPOVER']),
            init(t){
                var _this=this
                this.qrcode=new QRCode('qrcode',{
                    width:250,
                    height:250,
                    text:t,
                    colorDark:'#000',
                    colorLight:'#fff',
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .qr-group{
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
            height:400px;
            width: 470px;
            background: #fff;
            border-radius: 6px;
            .t{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding:0 20px;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
            }
            .box{
                width: 250px;
                height: 250px;
                /*border: 1px solid red;*/
                margin:  0 auto;
                overflow: hidden;
            }

        }
    }
</style>
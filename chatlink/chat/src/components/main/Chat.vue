<template>
    <div class="chat">
        <div class="fungsi">
            <div class="jt" @click="sendPic"><img src="../../assets/images/main/jt.png" alt=""></div>
            <div class="hb" @click="sendPacket"><img src="../../assets/images/main/hb.png" alt=""></div>
        </div>
        <div class="content">
            <!--<div class="txt" contenteditable="true" ref="txtRef"-->
                 <!--v-html="innerText"-->
                 <!--@input="onDivInput($event)"-->
            <!--&gt;</div>-->

            <!--<input type="text" v-model="txt" class="txt2">-->
            <textarea style="vertical-align:top;outline:none;" v-model="txt" class="txt2"></textarea>
            <div class="btn" @click="messageSend">发送</div>
        </div>
        <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" class="form-control" ref="form_control" @change="onFileChange">
        <message ref="message"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {messageSend,upload,sendPic} from "../../service/api";

    export default {
        data(){
            return{
                innerText:'',
                txt:'',
            }
        },
        computed:{
            ...mapState(['chatInfo','userInfo','token','messageList','topList']),
        },
        created:function(){
            // console.log(this.userInfo,this.chatInfo)
        },
        mounted(){
            const that=this;
            //监听键盘enter事件
            document.onkeydown=function(event){
                var key = event.keyCode ||window.event.keyCode ;
                if (event.shiftKey && key==13) {
                    this.send_content = this.send_content+'\n'
                }else if(key==13){
                    that.messageSend()
                }

            }
        },
        methods:{
            ...mapMutations(['POPOVER','MESSAGELIST','CHATINFOINDEX']),
            messageSend(){
                if(!!this.txt){
                    if(parseInt(this.txt.length)>60000){
                        this.$refs.message.Message('发送消息内容超长，请分条发送');
                    }else{
                        messageSend('',this.userInfo.userName,this.token,this.txt,this.chatInfo.groupIdCode,this.chatInfo.type).then(res=>{
                            console.log('发送消息',res)
                            if(res .code==0){
                                this.txt=''
                                console.log(this.topList,this.messageList)
                                let index = this.topList.length
                                let arr= [...this.messageList]
                                for(let i in arr){
                                    if(arr[i].groupIdCode==this.chatInfo.groupIdCode){
                                         let p=arr[i]
                                         arr.splice(i,1)
                                         arr.splice(index,0,p)
                                    }
                                }
                                console.log('123',arr)
                                this.MESSAGELIST(arr)
                                this.CHATINFOINDEX(index)

                            }
                        })
                    }


                }
            },
            sendPic(){
                this.$refs.form_control.click();
            },
            onFileChange(e){
                let _this = this
                var files = e.target.files || e.dataTransfer.files;

                //判断是否小于1M
                if(parseInt(files[0].size/1024/1024)<1){
                    console.log('1')
                    if (!files.length)
                        return;
                    let createReader = function(file, whenReady) {
                        var reader = new FileReader;
                        reader.onload = function (evt) {
                            var image = new Image();
                            image.onload = function () {
                                var width = this.width;
                                var height = this.height;
                                if (whenReady) whenReady(width, height);
                            };
                            image.src = evt.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                    createReader(files[0], function (w, h) {
                        upload('content:pic',files[0]).then((res)=>{
                            console.log('上传图片',res)
                            if(res.code==0){
                                sendPic('',_this.userInfo.userName,_this.token,_this.chatInfo.groupIdCode,res.data.fullUrl,w,h,_this.chatInfo.type).then(response=>{
                                    console.log('发送图片',response)

                                })
                            }else{
                                this.$refs.message.Message(res.message);
                            }
                        })
                    });
                }else
                //判断是否大于1小于2
                if(1<parseInt(files[0].size/1024/1024)&&parseInt(files[0].size/1024/1024)<2){
                    console.log('2')
                    var files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                        return;
                    let createReader = function(file, whenReady) {
                        var reader = new FileReader;
                        reader.onload = function() {
                            var result = this.result;
                            var img = new Image();
                            img.src = result;
                            // 图片加载完毕之后进行压缩，然后上传
                            if (img.complete) {
                                callback();
                            } else {
                                img.onload = callback;
                            }
                            function callback() {
                                var w= this.width;
                                var h = this.height;
                                // console.log(w,h)
                                var data = _this.compress(img,0.4); // 使用canvas对大图片进行压缩
                                var dataURLtoFile = (dataurl, filename)=> {

                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mime });
                                }
                                var obj = dataURLtoFile(data, files[0].name)

                                upload('content:pic',obj).then((res)=>{
                                    console.log('上传图片',res)
                                    if(res.code==0){
                                        sendPic('',_this.userInfo.userName,_this.token,_this.chatInfo.groupIdCode,res.data.fullUrl,w,h,_this.chatInfo.type).then(response=>{
                                            console.log('发送图片',response)
                                        })
                                    }else{
                                        this.$refs.message.Message(res.message);
                                    }
                                })
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                    createReader(files[0], function (w, h) {});
                } else
                //判断是否大于2小于3
                if(2<parseInt(files[0].size/1024/1024)&&parseInt(files[0].size/1024/1024)<3){
                    console.log('3')
                    var files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                        return;
                    let createReader = function(file, whenReady) {
                        var reader = new FileReader;
                        reader.onload = function() {
                            var result = this.result;
                            var img = new Image();
                            img.src = result;
                            // 图片加载完毕之后进行压缩，然后上传
                            if (img.complete) {
                                callback();
                            } else {
                                img.onload = callback;
                            }
                            function callback() {
                                var w= this.width;
                                var h = this.height;
                                // console.log(w,h)
                                var data = _this.compress(img,0.3); // 使用canvas对大图片进行压缩
                                var dataURLtoFile = (dataurl, filename)=> {

                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mime });
                                }
                                var obj = dataURLtoFile(data, files[0].name)

                                upload('content:pic',obj).then((res)=>{
                                    console.log('上传图片',res)
                                    if(res.code==0){
                                        sendPic('',_this.userInfo.userName,_this.token,_this.chatInfo.groupIdCode,res.data.fullUrl,w,h,_this.chatInfo.type).then(response=>{
                                            console.log('发送图片',response)
                                        })
                                    }else{
                                        this.$refs.message.Message(res.message);
                                    }
                                })
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                    createReader(files[0], function (w, h) {});
                }else
                //判断是否大于3小于4
                if(3<parseInt(files[0].size/1024/1024)&&parseInt(files[0].size/1024/1024)<4){
                    var files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                        return;
                    let createReader = function(file, whenReady) {
                        var reader = new FileReader;
                        reader.onload = function() {
                            var result = this.result;
                            var img = new Image();
                            img.src = result;
                            // 图片加载完毕之后进行压缩，然后上传
                            if (img.complete) {
                                callback();
                            } else {
                                img.onload = callback;
                            }
                            function callback() {
                                var w= this.width;
                                var h = this.height;
                                // console.log(w,h)
                                var data = _this.compress(img,0.2); // 使用canvas对大图片进行压缩
                                var dataURLtoFile = (dataurl, filename)=> {

                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mime });
                                }
                                var obj = dataURLtoFile(data, files[0].name)

                                upload('content:pic',obj).then((res)=>{
                                    console.log('上传图片',res)
                                    if(res.code==0){
                                        sendPic('',_this.userInfo.userName,_this.token,_this.chatInfo.groupIdCode,res.data.fullUrl,w,h,_this.chatInfo.type).then(response=>{
                                            console.log('发送图片',response)
                                        })
                                    }else{
                                        this.$refs.message.Message(res.message);
                                    }
                                })
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                    createReader(files[0], function (w, h) {});
                }else
                //判断是否大于3小于4
                if(4<parseInt(files[0].size/1024/1024)&&parseInt(files[0].size/1024/1024)<5){
                    console.log('4')
                    var files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                        return;
                    let createReader = function(file, whenReady) {
                        var reader = new FileReader;
                        reader.onload = function() {
                            var result = this.result;
                            var img = new Image();
                            img.src = result;
                            // 图片加载完毕之后进行压缩，然后上传
                            if (img.complete) {
                                callback();
                            } else {
                                img.onload = callback;
                            }
                            function callback() {
                                var w= this.width;
                                var h = this.height;
                                // console.log(w,h)
                                var data = _this.compress(img,0.1); // 使用canvas对大图片进行压缩
                                var dataURLtoFile = (dataurl, filename)=> {

                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mime });
                                }
                                var obj = dataURLtoFile(data, files[0].name)

                                upload('content:pic',obj).then((res)=>{
                                    console.log('上传图片',res)
                                    if(res.code==0){
                                        sendPic('',_this.userInfo.userName,_this.token,_this.chatInfo.groupIdCode,res.data.fullUrl,w,h,_this.chatInfo.type).then(response=>{
                                            console.log('发送图片',response)
                                        })
                                    }else{
                                        this.$refs.message.Message(res.message);
                                    }
                                })
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                    createReader(files[0], function (w, h) {});
                }else
                //判断是否大于5M
                if(parseInt(files[0].size/1024/1024)>=5){
                    console.log('5')
                    _this.$refs.message.Message('图片过大');
                }
            },
            sendPacket(){
                if(this.chatInfo.type=='USER'){this.POPOVER('11')}
                if(this.chatInfo.type=='GROUP'){this.POPOVER('12')}
            },

            compress(img,rate) {
                //    用于压缩图片的canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext('2d');
                //    瓦片canvas
                var tCanvas = document.createElement("canvas");
                var tctx = tCanvas.getContext("2d");

                var initSize = img.src.length;
                var width = img.width;
                var height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                var ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    ratio = Math.sqrt(ratio);  // 平方根
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //   铺底色（防止png透明背景转成JPG变黑色）
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //  如果图片像素大于100万则使用瓦片绘制
                var count;
                if ((count = width * height / 1000000) > 1) {
                    count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
                    //   计算每块瓦片的宽和高
                    var nw = ~~(width / count);    // ~~取整
                    var nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (var i = 0; i < count; i++) {
                        for (var j = 0; j < count; j++) {
                            //  drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight,destX, destY, destWidth, destHeight)
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //进行最小压缩（将原来图片的质量压缩到原先的0.1倍）
                var ndata = canvas.toDataURL('image/jpeg', rate);
                // console.log('压缩前：' + initSize);
                // console.log('压缩后：' + ndata.length);
                // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                // console.log(ndata);
                return ndata;
            }
        },

    }
</script>

<style lang="scss" scoped>
    .chat{
        width:35.5vw;
        height: 9.1vw;
        min-width: 568px;
        min-height:142.5px;
        /*border: 1px solid #ee3747;*/
        overflow: hidden;
        box-sizing: border-box;
        background: #fff;
        .fungsi{
            height: 50px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            padding: 0 10px;
            .jt{
                width: 20px;
                cursor: pointer;
                padding:  0 15px;
                img{
                    width: 100%;
                }
            }
            .hb{
                width: 22px;
                cursor: pointer;
                padding:  0 15px;
                img{
                    width: 100%;
                }
            }
        }
        .content{
            width: 100%;
            height:calc(9.1vw - 50px);
            min-height: 94.25px;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            .txt{
                width: 100%;
                height:calc(9.1vw - 100px);
                min-height: 34px;
                box-sizing: border-box;
                border: none;
                padding: 0 25px;
                font-size: 16px;
                color: #333;
                overflow-x: hidden;
                overflow-y: auto;
                line-height: 1.2;
            }
            .txt:focus{outline: none;}
            .txt::-webkit-scrollbar {display:none}

            .txt2{
                margin: 0;
                width: 100%;
                height:calc(9.1vw - 110px);
                min-height: 44px;
                box-sizing: border-box;
                border: none;
                padding: 0 25px;
                font-size: 16px;
                color: #333;
                overflow-x: hidden;
                overflow-y: auto;
                line-height: 1.2;
                outline: none;
                resize: none;
                /*border: 1px solid red;*/
            }
            .txt2::-webkit-scrollbar { width: 0 !important }
            .txt2{ -ms-overflow-style: none; }
            .txt2{ overflow: -moz-scrollbars-none; }

            .btn{
                width: 80px;
                height: 36px;
                color: #003680;
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #003680;
                border-radius: 6px;
                position: absolute;
                right: 20px;
                bottom: 20px;
                cursor: pointer;
            }
        }

        .form-control{
            opacity: 0;
            width: 0;
            height: 0;
        }
    }
</style>
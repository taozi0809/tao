<template>
    <div class="change-password">
        <div class="password">
            <div class="title">设置—修改密码</div>
            <div class="item">
                <div class="label">原密码</div>
                <div class="input"><el-input v-model="originpassword" placeholder="请输入"></el-input></div>
            </div>
            <div class="item">
                <div class="label">请输入新密码</div>
                <div class="input"><el-input v-model="newpassword" placeholder="请输入"></el-input></div>
            </div>
            <div class="item">
                <div class="label">再次输入新密码</div>
                <div class="input"><el-input v-model="confirmpassword" placeholder="请输入"></el-input></div>
            </div>
            <div class="save"> <el-button type="primary" @click="save">保存</el-button></div>
        </div>
    </div>
</template>

<script>
    import {password} from "../../service/api/api";
    import { Message,Loading } from 'element-ui';
    export default {
        data(){
            return{
                originpassword:'',
                newpassword:'',
                confirmpassword:'',
            }
        },
        methods:{
            save(){
                if(!!this.originpassword&&!!this.newpassword&&!!this.confirmpassword){
                    let loading = Loading.service({
                        lock: true,
                        text: 'Loading...',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    var data=new FormData();
                    data.append('originpassword',this.originpassword);
                    data.append('newpassword',this.newpassword);
                    data.append('confirmpassword',this.confirmpassword);
                    password(data).then(res=>{
                        loading.close();
                        console.log('修改密码:',res)
                        if(res.errcode==2000){
                            Message.success('修改成功')
                            this.originpassword=''
                            this.newpassword=''
                            this.confirmpassword=''
                            this.$router.push({ path:'/overview'})
                        }else{
                            Message.error(res.errmsg)
                        }

                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .change-password{
        box-sizing: border-box;
        padding: 50px 20px;
        .password{
            width: 800px;
            height: 550px;
            box-sizing: border-box;
            overflow: hidden;
            border-radius: 5px;
            box-shadow:0px 0px 3px 0px rgba(45, 66, 58, 0.35);
            padding:10px 20px;
            position: relative;
            .title{
                color: #99ABB4;
                font-size: 18px;
                width: 100%;
                height: 60px;
                line-height: 60px;
            }
            .item{
                width: 100%;
                margin-bottom: 10px;
                .label{
                    color: #99ABB4;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                }
                .input{
                    width: 400px;
                }
            }
            .save{
                position: absolute;
                right: 20px;
                bottom: 40px;

            }
        }
    }
</style>
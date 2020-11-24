<template>
    <div class="update">
        <div class="row">
            <div class="item">
                <div class="label">用户账号</div>
                <el-input placeholder="请输入用户账号" v-model="accountid"></el-input>
            </div>
            <div class="item">
                <div class="label">兑换码</div>
                <el-input placeholder="请输入兑换码" v-model="code"></el-input>
            </div>
            <div class="item btn">
                <el-button type="primary" style="height: 40px;" @click="prizeUpdate(accountid,code)">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {prizeUpdate} from "../service/api/api";
    import {Message} from 'element-ui'
    export default {
        data(){
            return{
                accountid:'',
                code:'',
            }
        },
        methods:{
            prizeUpdate(accountid,code){
                if(!!accountid&&!!code){
                    prizeUpdate(accountid,code).then(res=>{
                        console.log('兑奖',res)
                        if(res.errcode==2000){
                            this.accountid=""
                            this.code=""
                            Message.success('兑奖成功')
                        }else{
                            Message.error(res.errmsg)
                        }
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scope>
    .update{
        box-sizing: border-box;
        padding: 10px;
        .row{
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            align-content: center;
            .item{
                width: 200px;
                margin-right: 40px;
                .label{
                    margin-bottom: 10px;
                }
            }
            .btn{
                display: flex;
                align-items: flex-end;
            }
        }
    }
</style>
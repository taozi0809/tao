<template>
    <div class="AccountHead">
        <el-row :gutter="20">
            <el-col v-for="item in data" :span="3">
                <div class="card" :class="item.color">
                    <p>{{item.name}}</p>
                    <p>{{item.people}}</p>
                </div>
            </el-col>
        </el-row>
        <el-form ref="form" :model="form"  label-width="80px" label-position="right">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" class="add">新增</el-button>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="地区">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="登录方式">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="属性">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="搜索">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form:{
                    name:''
                },
                data:[
                    {
                       name:'总人数',
                       people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                    {
                        name:'总人数',
                        people:100,
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .AccountHead{
        width: 100%;
        box-sizing: border-box;
        padding:15px;
        height: 220px;
        .card{
            background: #5daf34;
            height: 80px;
            border-radius: 5px;
            margin-bottom: 20px;
            @include flexY(center);
            box-sizing: border-box;
            padding-left: 15px;
            p{
                padding: 10px 0;
                color: #fff;
                font-size: 14px;
            }
            p:nth-child(1){
                font-size: 16px;
            }
        }
        .add{
            width: 100%;
        }
    }

</style>
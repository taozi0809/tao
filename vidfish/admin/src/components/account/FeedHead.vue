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
        <el-form ref="form" :model="form" label-position="left" label-width="40px">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="地区">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item></el-form-item>
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
                        name:'反馈总数',
                        people:100,
                    },
                    {
                        name:'已处理反馈',
                        people:100,
                    },
                    {
                        name:'未处理反馈',
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
        padding:0 15px ;
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
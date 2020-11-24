<template>
    <div class="AccountList">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="date" label="头像" width="80"></el-table-column>
            <el-table-column prop="name" label="邮箱" width="100"></el-table-column>
            <el-table-column prop="address" label="手机" width="100"></el-table-column>
            <el-table-column prop="address" label="地区" width="100"></el-table-column>
            <el-table-column prop="address" label="反馈内容"></el-table-column>

            <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">导出</el-button>
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        date: '2016',
                        name: '王小虎',
                        address: '上海市'
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .AccountList{
        width: 100%;
        position: absolute;
        padding: 0 15px;
        top:220px;
        box-sizing: border-box;
        left:0;
        bottom: 0;
        overflow: hidden;
        /*border: 1px solid red;*/
    }
</style>
<template>
    <div class="game">
        <el-table :data="announceCtoModelList" style="width: 100%;height: 700px;">
            <el-table-column prop="content" label="内容" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
<!--                    <el-button type="text" size="small" @click="deleteR(scope.row)" style="color: #F56C6C;">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="编辑"
                :visible.sync="isGame"
                width="600"
                :modal-append-to-body="false"
                :before-close="gameClose">
            <div class="judgment">
                <div class="content">
                    <el-input
                            resize
                            type="textarea"
                            :rows="10"
                            placeholder="请输入内容"
                            v-model="content">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer footer">
                <el-button size="small" plain type="warning" @click="editConfirm">确定</el-button>
                <el-button size="small" plain type="warning" @click="gameClose">取消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {announceList,announceDelete,announceUpdate} from "../../service/api";

    export default {
        data(){
            return{
                announceCtoModelList:[],
                pageNum:1,
                pageSize:10,
                isGame:false,
                content:'',
                data:{},
                type:0,//0-比赛 ，1-约战
            }
        },
        computed:{
            getIndex(){
                return (this.pageNum - 1) * this.pageSize +1
            },
        },
        created() {
            this.announceList(this.pageNum,this.pageSize,this.type)
        },
        methods:{
            announceList(pageNum,pageSize,type){
                announceList(pageNum,pageSize,type).then(res=>{
                    console.log('比赛公告列表',res)
                    if(res.code==0){
                        this.announceCtoModelList=res.data.announceCtoModelList
                    }
                })
            },
            edit(row){
                this.isGame=true
                this.content=row.content
                this.data=row
            },
            deleteR(row){
                this.$confirm('删除公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    announceDelete(row.id).then(res=>{
                        console.log('删除公告',res)
                        if(res.code==0){
                            this.announceList(this.pageNum,this.pageSize,this.type)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            gameClose(){this.isGame=false},
            editConfirm(){
                announceUpdate(this.data.title,this.content,this.data.type,this.data.enable_,this.data.id).then(res=>{
                    console.log('修改公告',res)
                    this.isGame=false
                    if(res.code==0){
                        this.announceList(this.pageNum,this.pageSize,this.type)
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message:res.message
                        });
                    }
                })
            },
        }
    }
</script>
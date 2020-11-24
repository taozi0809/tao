<template>
    <div class="type">
        <el-select v-model="generName" filterable multiple placeholder="请选择" @change="change">
            <el-option
                    v-for="item in videoGenreCtoModelList"
                    :key="item.type"
                    :label="item.name"
                    :value="item.type">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import {getSessionStore} from "../../storage";

    export default {
        data(){
            return{
                generName:'',
            }
        },
        created:function(){
            this.videoGenreCtoModelList=JSON.parse(getSessionStore('videoGenreCtoModelList'))
        },
        methods:{
            change(){
                this.$emit('type',this.generName)
            },
        },

    }
</script>
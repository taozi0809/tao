<template>
    <div class="LimitLevel">
        <el-select v-model="limitLevel1" placeholder="请选择" @change="change">
            <el-option
                v-for="item in limitLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>


<script>
    import {limitLevelOptions} from "../../assets/config/tool";

    export default {
        data(){
            return{
                limitLevel1:'',
                limitLevelOptions:limitLevelOptions
            }
        },
        props:['limitLevel'],
        created:function(){
            this.limitLevel1=this.limitLevel
        },
        methods:{
            change(){
                this.$emit('limitLevel',this.limitLevel1)
            },
        },

    }
</script>
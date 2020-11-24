<template>
    <div class="frameRate">
        <el-select v-model="frameRate1" placeholder="请选择" @change="change">
            <el-option
                    v-for="item in frameRateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import {frameRateOptions} from "../../assets/config/tool";

    export default {
        data(){
            return{
                frameRate1:'',
                frameRateOptions:frameRateOptions
            }
        },
        props:['frameRate'],
        created:function(){
            this.frameRate1=this.frameRate
        },
        methods:{
            change(){
                this.$emit('frameRate',this.frameRate1)
            },
        },
    }
</script>
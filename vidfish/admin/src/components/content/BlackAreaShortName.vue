<template>
    <div class="BlackAreaShortName">

        <el-select v-model="blackAreaShortName1" filterable multiple collapse-tags placeholder="请选择" @change="change">
            <el-option
                v-for="item in blackAreaShortNameOptions"
                :key="item.shortName"
                :label="item.en"
                :value="item.shortName">
            </el-option>
        </el-select>
    </div>
</template>


<script>
    import {getSessionStore} from "../../storage";

    export default {
        data(){
            return{
                blackAreaShortName1:[],
                blackAreaShortNameOptions:[],
                isSelecteAll:true,
            }
        },
        created:function(){
            console.log(this.blackAreaShortName)
            this.blackAreaShortName1=this.blackAreaShortName
            this.blackAreaShortName1[0]=='ALL'?this.isSelecteAll=true:this.isSelecteAll=false
            this.blackAreaShortNameOptions =JSON.parse(getSessionStore('contryNameCtoModelList'))
        },
        props:['blackAreaShortName'],
        methods:{
            change(){
                if(this.isSelecteAll){
                    if(this.blackAreaShortName1.find((value)=>{if(value==='ALL'){return  true}})==='ALL'){}else{
                        this.isSelecteAll = false
                        this.blackAreaShortName1 = []
                    }
                    if(this.blackAreaShortName1.length<229){
                        this.blackAreaShortName1 = this.delteAllE(this.blackAreaShortName1)
                        this.isSelecteAll = false
                    }
                }else{
                    if(this.blackAreaShortName1.find((value)=>{if(value==='ALL'){return  true}})==='ALL' || this.blackAreaShortName1.length=='228'){
                        this.isSelecteAll = true
                        this.blackAreaShortName1 = this.selectAll(this.blackAreaShortNameOptions)
                    }
                }
                this.$emit('blackAreaShortName',this.blackAreaShortName1)
            },
            selectAll(e){
                let arr = []
                for(let i in e){arr.push(e[i].shortName)}
                return arr
            },
            delteAllE(e){
                let arr = []
                for(let i in e){if(e[i]!='ALL'){arr.push(e[i])}}
                return arr
            },
        },
        watch:{
            blackAreaShortName(newValue,oldValue){
                this.blackAreaShortName1=newValue
                this.blackAreaShortName1[0]=='ALL'?this.isSelecteAll=true:this.isSelecteAll=false
                this.blackAreaShortNameOptions =JSON.parse(getSessionStore('contryNameCtoModelList'))
            }
        }

    }
</script>
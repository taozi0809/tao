<template>
    <div class="zplay" v-if="isZplay">
        <ul id="con1" ref="con1" :class="{anim:animate==true}">
            <li v-for='item in items' v-html="item.name"></li>
        </ul>
        <div class="close" @click="isZplay=false">×</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isZplay:true,
                animate:false,
                items:[
                    {name:`欢迎大家关注网站的新浪官方微博 <a href="/index" style="color:#14b9d6;">1z电竞比分网</a> ，我们会将比赛的汇总信息第一时间发布，同时也会在微博上给大家发送福利奖品！`},
                    {name:`希望大家在关注比赛的同时积极进入qq群和其他用户沟通交流，我们也会在群里及时解决各位反馈的问题，同时不定时会给广大用 户各种福利活动！群号：545185501<a href="/index" style="color:#14b9d6;"> 点击加入QQ群</a> `}
                ]
            }
        },
        created(){
            setInterval(this.scroll,2000)
        },
        methods: {
            scroll(){
                this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
                    this.items.shift();               //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                },1000)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .zplay{
        width: 1150px;
        height: 30px;
        overflow: hidden;
        margin: 0 auto;
        background-color: rgba(44,44,66,.9);
        border-radius: 3px;
        margin-bottom: 10px;
        padding-left: 10px;
        position: relative;
        left: -5px;
        z-index: 1;
    }
    .anim{
        transition: all .5s;
        margin-top: -30px;
    }
    #con1 li{
        list-style: none;
        line-height: 30px;
        height: 30px;
        font-size: 12px;
        color: #83cf39;
    }
    .close{
        position: absolute;
        right:0;
        top: -3px;
        font-size:20px;
        width: 20px;
        height: 50px;
        /*border: 1px solid red;*/
        cursor: pointer;
    }
</style>
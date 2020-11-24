<template>
    <div class="home">
        <Header @goToElement="onGoToElement" :currentIndex="currentIndex"/>
        <div class="wrapper" ref="wrapper" id="wrapper">
            <div class="content">
                <div class="main">
                    <Item1/>
                    <Item1_top/>
                    <Item2/>
                    <Item3/>
                    <Item4/>
                    <Item5/>
                    <Item6/>
                    <Item7/>
                    <Item8/>
                    <Item9/>
                    <Item10/>
                    <Item11/>
                    <Item12/>
                </div>
                <Footer/>
            </div>
        </div>
        <div class="weixin" v-if="$store.state.mask"><img src="../assets/img/weixin.png" alt=""></div>
        <FooterBot/>
    </div>
</template>

<script>
    import 'animate.css'
    import Header from '../components/Header'
    import Footer from '../components/Footer'
    import Item1 from '../components/main/Item1'
    import Item1_top from '../components/main/Item1_top'
    import Item2 from '../components/main/Item2'
    import Item3 from '../components/main/Item3'
    import Item4 from '../components/main/Item4'
    import Item5 from '../components/main/Item5'
    import Item6 from '../components/main/Item6'
    import Item7 from '../components/main/Item7'
    import Item8 from '../components/main/Item8'
    import Item9 from '../components/main/Item9'
    import Item10 from '../components/main/Item10'
    import Item11 from '../components/main/Item11'
    import Item12 from '../components/main/Item12'
    import FooterBot from '../components/FooterBot'

    import {ispc} from "../utils/isPc";
    import BScroll from 'better-scroll'

    export default {
        name:"Home",
        components:{
            Header,Footer,Item1,Item1_top,Item2,Item3,Item4,Item5,Item6,Item7,Item8,Item9,Item10,Item11,Item12,FooterBot
        },
        data(){
            return{
                isPC:true,
                scroll:null,
                activeIndex:1,
                isClick:false,
                currentIndex: 0,
                heightArr: [] // wrap下所有a标签距容器wrap顶部距离
            }
        },
        created() {
            this.isPC = ispc()
        },
        mounted() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    scrollY: true,
                    click:true,
                    scrollbar: {
                        fade: this.isPC?false:true,
                        interactive: false // 1.8.0 新增
                    },
                    mouseWheel: true,
                    probeType: 3,
                })
                this.wrapListener()

            })


        },
        methods:{
            onGoToElement(index){
                this.activeIndex=index
                this.scroll.scrollToElement(document.querySelector(`#item${index}`),300)
            },
            wrapListener() {
                // 监听的元素
                let wrapDom = document.getElementById('wrapper')
                // 获取wrap元素里所有的a标签元素
                let aDom = wrapDom.getElementsByClassName('mark')

                // wrap元素里第一个a元素上边框相对离自己最近且position属性为非static的祖先元素的偏移量，如果没有这样的祖先元素，就相对于html上边界的偏移量
                let diff = aDom[0].offsetTop
                let len = aDom.length
                // wrap可视区域高度
                let domHeight = wrapDom.clientHeight
                // wrap的滚动条的总高度
                let scrollHeight = wrapDom.scrollHeight

                for(let i=0;i<len;i++) {
                    this.heightArr.push(aDom[i].offsetTop - diff)
                }

                this.scroll.on('scroll', (pos) => {
                    // console.log(this.isClick)
                    if(this.isClick){return}
                    let scrollTop = -pos.y
                    for(let i=0;i<len;i++) {
                        if(scrollTop > this.heightArr[i] && scrollTop < this.heightArr[i+1] && i<len-1) {
                            // console.log(scrollTop,this.heightArr[i],this.heightArr[i+1],i<len-1)
                            this.currentIndex = i

                        } else if (i === (len-1)) {
                            // 最后一项
                            if(scrollTop > this.heightArr[i]) {
                                this.currentIndex = i
                            }
                        }
                    }
                    // 滚动到底部的条件
                    if(scrollTop + domHeight === scrollHeight) {
                        this.currentIndex = len - 1
                    }
                })
            }
        },
        watch:{
            activeIndex(newVal,oldVal){
                this.isClick=true
                setTimeout(()=>{
                    this.isClick=false
                },500)

            }
        }
    }
</script>

<style scoped lang="scss">

.home{
    width: 100%;
    overflow-x: hidden;
    background:#F7ebd4;
    .wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .content{
            width: 100%;
            height: auto;
            .main{
                width: 100%;
            }

        }

    }
    .weixin{
        position:fixed;
        top:0;
        left:0;
        bottom: 0;
        z-index:99999;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
}
</style>

<template>
    <div class="home">
        <Header @goToElement="onGoToElement"/>
        <div class="wrapper" ref="wrapper" id="wrapper">
            <div class="content">
                <div class="main">
                    <Item1/>
                    <Item2/>
                    <Item3/>
                    <Item4/>
                    <Item5/>
                    <Item6/>
                    <Item7/>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import 'animate.css'
    import Header from '../components/Header'
    import Footer from '../components/Footer'
    import Item1 from '../components/main/Item1'
    import Item2 from '../components/main/Item2'
    import Item3 from '../components/main/Item3'
    import Item4 from '../components/main/Item4'
    import Item5 from '../components/main/Item5'
    import Item6 from '../components/main/Item6'
    import Item7 from '../components/main/Item7'
    import {ispc} from "../utils/isPc";
    import BScroll from 'better-scroll'

    export default {
        name:"Home",
        components:{
            Header,Footer,Item1,Item2,Item3,Item4,Item5,Item6,Item7,
        },
        data(){
            return{
                isPC:true,
                scroll:null,
                activeIndex:1,
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

            })

        },
        methods:{
            onGoToElement(index){
                this.activeIndex=index
                this.scroll.scrollToElement(document.querySelector(`#item${index}`),300)
            }
        }
    }
</script>

<style scoped lang="scss">

.home{
    width: 100%;
    overflow-x: hidden;
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
}
</style>

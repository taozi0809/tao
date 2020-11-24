<template>
    <div class="ConfigureA">
        <div class="h2">配置添加</div>
        <div class="head">
            <div class="setp1">
                <span class="rectangle"></span>
                <span class="arrow-r"></span>
                <span class="des active">配置目标</span>
            </div>
            <div class="setp2">
                <span class="arrow-l"></span>
                <span class="rectangle"></span>
                <span class="arrow-r"></span>
                <span class="des">选择币种</span>
            </div>
            <div class="setp3">
                <span class="arrow-l"></span>
                <span class="rectangle"></span>
                <span class="des">配置数据</span>
            </div>
        </div>
        <ul class="type">
            <li class="sale" @click="$router.push({path:'/ConfigureBSale'})">
                <span>出售</span>
                <span class="right"></span>
            </li>
            <li class="buy" @click="$router.push({path:'/ConfigureBBuy'})">
                <span>购买</span>
                <span class="right"></span>
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped>
    .ConfigureA{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        .h2{
            color: #000;
            font-size: 17px;
            font-weight: bold;
            background: #fff;
            height: 53px;
            text-align: center;
            line-height: 53px;
            margin-bottom: 4px;
        }
        .head{
            background: #fff;
            display: flex;
            align-items: center;
            width: 375px;
            height: 30px;
            overflow: hidden;
            border-bottom: 3px solid #EFF0F4;
            padding-bottom: 8px;
            .setp1,.setp2,.setp3{
                width: 125px;
                height: 30px;
                position: relative;
                .rectangle{
                    width: 115px;
                    height: 30px;
                    background: #013071;
                    display: block;
                    position: absolute;
                    left: 0;
                }
                .arrow-r{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #013071;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 115px;
                    z-index: 2;
                }
                .des{
                    color: #B3B3B3;
                    font-size: 14px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    line-height: 30px;
                }
                .active{
                    color: #fff;
                }
            }
            .setp2{
                left: 5px;
                .arrow-l{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #fff;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 0;
                    z-index: 2;
                }
                .rectangle{
                    width: 110px;
                    background: #EFF0F4;
                    position: absolute;
                    left:0px;
                }
                .arrow-r{
                    border-color: transparent transparent transparent #EFF0F4;
                    position: absolute;
                    z-index: 2;
                    left: 110px;

                }
            }
            .setp3{
                background: red;
                left: 5px;
                width: 120px;
                .arrow-l{
                    display: block;
                    margin: 0px;
                    border-width: 15px;
                    border-style: solid;
                    border-color: transparent transparent transparent #fff;
                    padding: 0px;
                    width: 0px;
                    height: 0px;
                    position: absolute;
                    left: 0;
                    z-index: 2;
                }
                .rectangle{
                    width: 120px;
                    background: #EFF0F4;
                    position: absolute;
                    left: 0px;
                }
            }
        }
        .type{
            background: #fff;
            width: 100%;
            .sale,.buy{
                width: 100%;
                height: 60px;
                border-bottom:1px solid #D9D9D9;
                line-height: 60px;
                background: #fff;
                box-sizing: border-box;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span:nth-child(1){
                    color: #1B1B1B;
                    font-size: 15px;
                }
                span:nth-child(2){
                    border: solid #C2C2C7;
                    border-width: 0 2px 2px 0;
                    display: inline-block;
                    padding: 3px;
                }
                .right {
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                }
            }
        }
    }

</style>
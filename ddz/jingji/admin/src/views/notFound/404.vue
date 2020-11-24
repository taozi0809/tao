<template>
    <div class="notfound">
        <div class="l">404</div>
        <div class="r">This page could not be found.</div>
    </div>
</template>

<style lang="scss" scoped>
    .notfound{
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .l{
            display:inline-block;
            border-right:1px solid rgba(0, 0, 0,.3);
            margin:0;margin-right:20px;
            padding:10px 23px 10px 0;
            font-size:24px;
            font-weight:500;
            vertical-align:top
        }
        .r{
            font-size: 14px;
            font-weight: normal;
            line-height: inherit;
            margin: 0;
            padding: 0;
        }
    }
</style>

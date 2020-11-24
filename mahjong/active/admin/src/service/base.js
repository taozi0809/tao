var baseUrl={}

if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        // user:'http://192.168.1.118:3760',
        user:'http://123.207.12.67:3760',
    }
}else if(process.env.NODE_ENV == 'test'){//测试

}else if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        // user:'http://119.28.100.242:3760',
        user:'http://123.207.12.67:3760',
    }
}

export{baseUrl}

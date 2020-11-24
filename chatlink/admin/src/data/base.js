var baseUrl={}

if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        otc:'http://192.168.1.150:9039',
        user:'http://192.168.1.150:8000'
    }
}else if(process.env.NODE_ENV == 'test'){//测试
    baseUrl={
        otc:'http://192.168.1.150:9039',
        user:'http://192.168.1.150:8000'
    }
}else if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        otc:'http://192.168.1.150:9039',
        user:'http://192.168.1.150:8000'
    }
}

export{baseUrl}
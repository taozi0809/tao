var baseUrl={}

if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        user:'http://192.168.1.118:8660',
    }
}else if(process.env.NODE_ENV == 'test'){//测试
    baseUrl={

    }
}else if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        user:'http://119.28.100.242:8660',
    }
}

export{baseUrl}
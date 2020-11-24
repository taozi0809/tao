var baseUrl={}
if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        admin:'http://192.168.1.224:5005',
    }
}
if(process.env.NODE_ENV == 'test'){//测试
    baseUrl={

    }
}
if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        admin:'http://119.28.119.129:5005',
    }
}

export{baseUrl}
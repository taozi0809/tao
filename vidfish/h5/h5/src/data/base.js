var baseUrl={}

if (process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        service : "http://150.109.20.236:5007",
        upload:'http://150.109.20.236:5002',
        zf:'http://150.109.20.236:5001/client.do'

    }
}else if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        service:"http://192.168.1.213:7004",
        upload:'http://192.168.1.213:8002',
        zf:'http://192.168.1.213:8001/client.do',
    }
}else{//测试
    baseUrl={
        service:'http://150.109.20.244:9003',
        upload:'http://150.109.20.244:9007',
        zf:'http://150.109.20.244:9006/client.do',
    }
}
export{
    baseUrl
}
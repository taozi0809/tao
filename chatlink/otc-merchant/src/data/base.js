var baseUrl={}

if (process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        // otc:'http://150.109.10.131:9020',
        // coin:'http://api.core.chat.link',
        // upload:'http://api.upload.chat.link',
        otc:'http://api.otc.chatlink.shenzhouxing.com',
        coin:'http://api.core.chatlink.shenzhouxing.com',
        upload:'http://api.upload.chatlink.shenzhouxing.com',
}
}else if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        otc:'http://192.168.1.150:9039',
        coin:'http://192.168.1.150:8000',
        upload:'http://192.168.1.150:8001',
    }
}else{//测试
    baseUrl={

    }
}
export default baseUrl
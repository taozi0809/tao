var baseUrl={}

if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        core:'http://192.168.1.150:8000'
    }
}else if(process.env.NODE_ENV == 'test'){//测试
    baseUrl={

    }
}else if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        'core':'http://api.core.titan.shenzhouxing.com',
        'upload':'http://api.upload.titan.shenzhouxing.com',
        'center':'http://api.center.titan.shenzhouxing.com',
        'link':'http://api.link.titan.shenzhouxing.com',
        'otc':'http://api.otc.titan.shenzhouxing.com',
        'app':'http://api.app.titan.shenzhouxing.com',
         'ws':"ws://api.center.titan.shenzhouxing.com",
    }
}

export{baseUrl}
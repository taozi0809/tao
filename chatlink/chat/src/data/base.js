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
        'core':'http://api.core.chatlink.shenzhouxing.com',
        'upload':'http://api.upload.chatlink.shenzhouxing.com',
        'center':'http://api.center.chatlink.shenzhouxing.com',
        'link':'http://api.link.chatlink.shenzhouxing.com',
        'otc':'http://api.otc.chatlink.shenzhouxing.com',
        'app':'http://api.app.chatlink.shenzhouxing.com',

         'ws':"ws://api.center.chatlink.shenzhouxing.com",
    }
}

export{baseUrl}
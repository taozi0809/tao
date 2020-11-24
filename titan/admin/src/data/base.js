var baseUrl={}
if (process.env.NODE_ENV == 'development') {//本地
    baseUrl={
        user:'http://192.168.1.150:8000',
        football:'http://192.168.1.46:7007',
        manage:'http://192.168.1.150:9091',
        // agent:'http://192.168.1.150:9099',
        agent:'http://192.168.1.150:7007',
    }
}
if(process.env.NODE_ENV == 'test'){//测试
    baseUrl={

    }
}
if(process.env.NODE_ENV == 'production') {//生产
    baseUrl={
        user:'http://118.25.150.30:8000',
        football:'http://212.64.6.16:7007',
        manage:'http://118.25.150.30:9091',
        // agent:'http://118.25.150.30:9099',
        agent:'http://api.quiz.titan.shenzhouxing.com',
        // football:'http://192.168.1.46:7007',
    }
}

export{baseUrl}
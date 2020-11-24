import {YXB} from "./YXB";

export default async(option,url=YXB.url.jc+'/client.do') => {
    let data = YXB.getBaseCtoInfo(option.method,option.data)
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    data = ret
    if (window.fetch) {
        let requestConfig = {
            credentials: 'include',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
            },
            mode: "cors",
            cache: "force-cache",
        }

        Object.defineProperty(requestConfig, 'body', {
            value: data
        })
        try {
            const response = await fetch(url,requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (err) {
            throw new Error(err)
        }
    }
    else{

        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }
            requestObj.open('POST', url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(data);
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}

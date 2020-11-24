import {YXB} from "./YXB";

export default async(option,url=YXB.url.service+'/client.do',type='POST',file=false,headers={
    'Accept': 'application/json;charset=UTF-8',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
}) => {
    let data = YXB.getBaseCtoInfo(option.method,option.data)
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    data = ret

    var formFile = new FormData();
    if(file){
      data=null
      let data = YXB.getBaseCtoInfo(option.method,option.data)

      for(let i in data) {
          formFile.append(i, data[i])
      }
      formFile.append("file", file);


    }

  if (window.fetch) {
    let requestConfig = {
      credentials: 'include',
      method: 'POST',
      headers:headers,
      mode: "cors",
      cache: "force-cache",
    }

      if (type == 'GET') {
          let dataStr = ''; //数据拼接字符串
          Object.keys(data).forEach(key => {
              dataStr += key + '=' + data[key] + '&';
          })

          if (dataStr !== '') {
              dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
              url = url + '?' + dataStr;
          }
      }

      if (type == 'POST') {
          Object.defineProperty(requestConfig, 'body', {
              value: file?formFile:data
          })
      }
    try {
        // console.log(url,requestConfig)
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
      // let sendData = '';
      // if (type == 'POST') {
      //   sendData = JSON.stringify(data);
      // }
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

import {jq} from "../../plugins/jquery";jq()
import {YXB} from "./YXB";

export const getSignature = (callback)=>{
    $.ajax({
        url: YXB.url.service+'/qcloudSignature/getQcloudSign',  //获取客户端上传签名的 URL
        type: 'POST',
        dataType: 'json',
        success: function(result){
            callback(result.sign);
        }
    });
}

export const getAntiLeechUrl = (videoUrl, callback)=>{
    $.ajax({
        url: 'https://demo.vod2.myqcloud.com/ugc-upload/',
        data: JSON.stringify({
            "Action": "GetAntiLeechUrl",
            Url: videoUrl,
        }),
        type: 'POST',
        dataType: 'json',
        success: function(res){
            if(res.data && res.data.url) {
                callback(res.data.url);
            } else {
                return '获取防盗链视频地址失败';
            }

        }
    });
}
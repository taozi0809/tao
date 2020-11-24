'use strict'

import CryptoJS from 'crypto-js'
const KP = {
    key: 'y2x0b1j9y1z2t0a2', // 秘钥 16*n:
    iv: 't2o0k1e9n1h2o2ldem'  // 偏移量
};

function getAesString(data, key, iv) { // 加密
    key = CryptoJS.enc.Utf8.parse(key);
    // alert(key）;
    iv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();    // 返回的是base64格式的密文
}
function getDAesString(encrypted, key, iv) { // 解密
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    let decrypted = CryptoJS.AES.decrypt(encrypted, key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);      //
}

// const aes = {
//     en: (data) => getAesString(data, KP.key, KP.iv),
//     de: (data) => getDAesString(data, KP.key, KP.iv)
// };


export const aesEn = (data)=>{
    return getAesString(data, KP.key, KP.iv)
}
export const aesDe = (data)=>{
    return getDAesString(data, KP.key, KP.iv)
}
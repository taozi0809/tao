let strToSrc = (str)=>{
    switch (str) {
        case '一万':
            return require("../../assets/images/brand/一万.png")
            break;
        case '二万':
            return require("../../assets/images/brand/二万.png")
            break;
        case '三万':
            return require("../../assets/images/brand/三万.png")
            break;
        case '四万':
            return require("../../assets/images/brand/四万.png")
            break;
        case '五万':
            return require("../../assets/images/brand/五万.png")
            break;
        case '六万':
            return require("../../assets/images/brand/六万.png")
            break;
        case '七万':
            return require("../../assets/images/brand/七万.png")
            break;
        case '八万':
            return require("../../assets/images/brand/八万.png")
            break;
        case '九万':
            return require("../../assets/images/brand/九万.png")
            break;

        case '一条':
            return require("../../assets/images/brand/一条.png")
            break;
        case '二条':
            return require("../../assets/images/brand/二条.png")
            break;
        case '三条':
            return require("../../assets/images/brand/三条.png")
            break;
        case '四条':
            return require("../../assets/images/brand/四条.png")
            break;
        case '五条':
            return require("../../assets/images/brand/五条.png")
            break;
        case '六条':
            return require("../../assets/images/brand/六条.png")
            break;
        case '七条':
            return require("../../assets/images/brand/七条.png")
            break;
        case '八条':
            return require("../../assets/images/brand/八条.png")
            break;
        case '九条':
            return require("../../assets/images/brand/九条.png")
            break;

        case '一筒':
            return require("../../assets/images/brand/一筒.png")
            break;
        case '二筒':
            return require("../../assets/images/brand/二筒.png")
            break;
        case '三筒':
            return require("../../assets/images/brand/三筒.png")
            break;
        case '四筒':
            return require("../../assets/images/brand/四筒.png")
            break;
        case '五筒':
            return require("../../assets/images/brand/五筒.png")
            break;
        case '六筒':
            return require("../../assets/images/brand/六筒.png")
            break;
        case '七筒':
            return require("../../assets/images/brand/七筒.png")
            break;
        case '八筒':
            return require("../../assets/images/brand/八筒.png")
            break;
        case '九筒':
            return require("../../assets/images/brand/九筒.png")
            break;

        case '东风':
            return require("../../assets/images/brand/东风.png")
            break;
        case '南风':
            return require("../../assets/images/brand/南风.png")
            break;
        case '西风':
            return require("../../assets/images/brand/西风.png")
            break;
        case '北风':
            return require("../../assets/images/brand/北风.png")
            break;

        case '红中':
            return require("../../assets/images/brand/红中.png")
            break;
        case '发财':
            return require("../../assets/images/brand/发财.png")
            break;
        case '白板':
            return require("../../assets/images/brand/白板.png")
            break;
    }


}

export const pokersToSrc = (arr)=>{
    let arr1=[]
    for(let i in arr){
        arr1.push(strToSrc(arr[i]))
    }
    return arr1
}


let strToSrcA=(str)=>{
    switch (str) {
        case '接炮':
            return require("../../assets/images/gamematchDdetails/接炮.png")
            break;
        case '点炮':
            return require("../../assets/images/gamematchDdetails/点炮.png")
            break;
        case '自摸':
            return require("../../assets/images/gamematchDdetails/自摸.png")
            break;
        case '胡':
            return require("../../assets/images/gamematchDdetails/胡.png")
            break;
    }
}

export const pokersToSrcA = (str)=>{
    return strToSrcA(str)
}
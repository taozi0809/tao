let strToSrc = (str)=>{
    str=str.toString()
    switch (str) {
        case '3':
            return require("../../assets/images/brand/1.png")
            break;
        case '7':
            return require("../../assets/images/brand/2.png")
            break;
        case '11':
            return require("../../assets/images/brand/3.png")
            break;
        case '15':
            return require("../../assets/images/brand/4.png")
            break;
        case '19':
            return require("../../assets/images/brand/5.png")
            break;
        case '23':
            return require("../../assets/images/brand/6.png")
            break;
        case '27':
            return require("../../assets/images/brand/7.png")
            break;
        case '31':
            return require("../../assets/images/brand/8.png")
            break;
        case '35':
            return require("../../assets/images/brand/9.png")
            break;
        case '39':
            return require("../../assets/images/brand/10.png")
            break;
        case '43':
            return require("../../assets/images/brand/11.png")
            break;
        case '47':
            return require("../../assets/images/brand/12.png")
            break;
        case '51':
            return require("../../assets/images/brand/13.png")
            break;


        case '2':
            return require("../../assets/images/brand/14.png")
            break;
        case '6':
            return require("../../assets/images/brand/15.png")
            break;
        case '10':
            return require("../../assets/images/brand/16.png")
            break;
        case '14':
            return require("../../assets/images/brand/17.png")
            break;
        case '18':
            return require("../../assets/images/brand/18.png")
            break;
        case '22':
            return require("../../assets/images/brand/19.png")
            break;
        case '26':
            return require("../../assets/images/brand/20.png")
            break;
        case '30':
            return require("../../assets/images/brand/21.png")
            break;
        case '34':
            return require("../../assets/images/brand/22.png")
            break;
        case '38':
            return require("../../assets/images/brand/23.png")
            break;
        case '42':
            return require("../../assets/images/brand/24.png")
            break;
        case '46':
            return require("../../assets/images/brand/25.png")
            break;
        case '50':
            return require("../../assets/images/brand/26.png")
            break;


        case '1':
            return require("../../assets/images/brand/27.png")
            break;
        case '5':
            return require("../../assets/images/brand/28.png")
            break;
        case '9':
            return require("../../assets/images/brand/29.png")
            break;
        case '13':
            return require("../../assets/images/brand/30.png")
            break;
        case '17':
            return require("../../assets/images/brand/31.png")
            break;
        case '21':
            return require("../../assets/images/brand/32.png")
            break;
        case '25':
            return require("../../assets/images/brand/33.png")
            break;
        case '29':
            return require("../../assets/images/brand/34.png")
            break;
        case '33':
            return require("../../assets/images/brand/35.png")
            break;
        case '37':
            return require("../../assets/images/brand/36.png")
            break;
        case '41':
            return require("../../assets/images/brand/37.png")
            break;
        case '45':
            return require("../../assets/images/brand/38.png")
            break;
        case '49':

            return require("../../assets/images/brand/39.png")
            break;
        case '0':
            return require("../../assets/images/brand/40.png")
            break;
        case '4':
            return require("../../assets/images/brand/41.png")
            break;
        case '8':
            return require("../../assets/images/brand/42.png")
            break;
        case '12':
            return require("../../assets/images/brand/43.png")
            break;
        case '16':
            return require("../../assets/images/brand/44.png")
            break;
        case '20':
            return require("../../assets/images/brand/45.png")
            break;
        case '24':
            return require("../../assets/images/brand/46.png")
            break;
        case '28':
            return require("../../assets/images/brand/47.png")
            break;
        case '32':
            return require("../../assets/images/brand/48.png")
            break;
        case '36':
            return require("../../assets/images/brand/49.png")
            break;
        case '40':
            return require("../../assets/images/brand/50.png")
            break;
        case '44':
            return require("../../assets/images/brand/51.png")
            break;
        case '48':
            return require("../../assets/images/brand/52.png")
            break;

        case '52':
            return require("../../assets/images/brand/53.png")
            break;
        case '53':
            return require("../../assets/images/brand/54.png")
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

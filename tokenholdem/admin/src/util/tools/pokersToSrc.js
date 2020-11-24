let strToSrc = (str)=>{
    switch (str) {
        case '黑桃3':
            return require("../../assets/images/brand/1.png")
            break;
        case '黑桃4':
            return require("../../assets/images/brand/2.png")
            break;
        case '黑桃5':
            return require("../../assets/images/brand/3.png")
            break;
        case '黑桃6':
            return require("../../assets/images/brand/4.png")
            break;
        case '黑桃7':
            return require("../../assets/images/brand/5.png")
            break;
        case '黑桃8':
            return require("../../assets/images/brand/6.png")
            break;
        case '黑桃9':
            return require("../../assets/images/brand/7.png")
            break;
        case '黑桃10':
            return require("../../assets/images/brand/8.png")
            break;
        case '黑桃J':
            return require("../../assets/images/brand/9.png")
            break;
        case '黑桃Q':
            return require("../../assets/images/brand/10.png")
            break;
        case '黑桃K':
            return require("../../assets/images/brand/11.png")
            break;
        case '黑桃A':
            return require("../../assets/images/brand/12.png")
            break;
        case '黑桃2':
            return require("../../assets/images/brand/13.png")
            break;

        case '红桃3':
            return require("../../assets/images/brand/14.png")
            break;
        case '红桃4':
            return require("../../assets/images/brand/15.png")
            break;
        case '红桃5':
            return require("../../assets/images/brand/16.png")
            break;
        case '红桃6':
            return require("../../assets/images/brand/17.png")
            break;
        case '红桃7':
            return require("../../assets/images/brand/18.png")
            break;
        case '红桃8':
            return require("../../assets/images/brand/19.png")
            break;
        case '红桃9':
            return require("../../assets/images/brand/20.png")
            break;
        case '红桃10':
            return require("../../assets/images/brand/21.png")
            break;
        case '红桃J':
            return require("../../assets/images/brand/22.png")
            break;
        case '红桃Q':
            return require("../../assets/images/brand/23.png")
            break;
        case '红桃K':
            return require("../../assets/images/brand/24.png")
            break;
        case '红桃A':
            return require("../../assets/images/brand/25.png")
            break;
        case '红桃2':
            return require("../../assets/images/brand/26.png")
            break;

        case '梅花3':
            return require("../../assets/images/brand/27.png")
            break;
        case '梅花4':
            return require("../../assets/images/brand/28.png")
            break;
        case '梅花5':
            return require("../../assets/images/brand/29.png")
            break;
        case '梅花6':
            return require("../../assets/images/brand/30.png")
            break;
        case '梅花7':
            return require("../../assets/images/brand/31.png")
            break;
        case '梅花8':
            return require("../../assets/images/brand/32.png")
            break;
        case '梅花9':
            return require("../../assets/images/brand/33.png")
            break;
        case '梅花10':
            return require("../../assets/images/brand/34.png")
            break;
        case '梅花J':
            return require("../../assets/images/brand/35.png")
            break;
        case '梅花Q':
            return require("../../assets/images/brand/36.png")
            break;
        case '梅花K':
            return require("../../assets/images/brand/37.png")
            break;
        case '梅花A':
            return require("../../assets/images/brand/38.png")
            break;
        case '梅花2':
            return require("../../assets/images/brand/39.png")
            break;

        case '方块3':
            return require("../../assets/images/brand/40.png")
            break;
        case '方块4':
            return require("../../assets/images/brand/41.png")
            break;
        case '方块5':
            return require("../../assets/images/brand/42.png")
            break;
        case '方块6':
            return require("../../assets/images/brand/43.png")
            break;
        case '方块7':
            return require("../../assets/images/brand/44.png")
            break;
        case '方块8':
            return require("../../assets/images/brand/45.png")
            break;
        case '方块9':
            return require("../../assets/images/brand/46.png")
            break;
        case '方块10':
            return require("../../assets/images/brand/47.png")
            break;
        case '方块J':
            return require("../../assets/images/brand/48.png")
            break;
        case '方块Q':
            return require("../../assets/images/brand/49.png")
            break;
        case '方块K':
            return require("../../assets/images/brand/50.png")
            break;
        case '方块A':
            return require("../../assets/images/brand/51.png")
            break;
        case '方块2':
            return require("../../assets/images/brand/52.png")
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
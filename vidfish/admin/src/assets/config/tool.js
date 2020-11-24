import {getSessionStore} from "../../storage";

export const blackAreaShortNameAll=()=>{
    let contryNameCtoModelList = JSON.parse(getSessionStore('contryNameCtoModelList'))
    let arr=[]
    for(let i in contryNameCtoModelList){
        arr.push(contryNameCtoModelList[i].shortName)
    }
    return arr
}

export const limitLevelOptions=[{
    value: 'G',
    label: 'G级别'
}, {
    value: 'PG',
    label: 'PG级别'
},{
    value: 'PG13',
    label: 'PG13级别'
},{
    value: 'NC16',
    label: 'NC16级别'
},{
    value: 'M18',
    label: 'M18级别'
},{
    value: 'R21',
    label: 'R21级别'
}]

export const frameRateOptions=[{
    value: '480',
    label: '480'
}, {
    value: '720',
    label: '720'
},{
    value: '1080',
    label: '1080'
}]
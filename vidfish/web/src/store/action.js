import {LANGLIST} from "./mutation-types";
import {languageSelect} from "../service/api";

export const langList = ()=>{
    languageSelect().then((res)=>{
        if(res.code==0){
            commit(LANGLIST, res.data)
        }
    })
}
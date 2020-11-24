import {getVideoDetails} from "../service/api/api";
import {GET_USERINFO} from "./types";

export default {
    async getUserInfo({commit,state}){
        let res=await getVideoDetails('339')
        console.log(res)
        // commit(GET_USERINFO,res)
    },


}
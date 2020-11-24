import {baseUrl} from "../../data/base";
import {post} from "../axios";

export const userLogin=(account,password) => post(`${baseUrl.user}/client.do`,{
    method:'vidfish.user.login',
    data:{account,password}
})
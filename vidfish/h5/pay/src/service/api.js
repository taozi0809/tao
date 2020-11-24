import fetch from './fetch'
import {YXB} from "./YXB";

export const payProductlist = () => fetch({
    method:'youxibi.pay.product.list',
    data:{}
},YXB.url.zf)
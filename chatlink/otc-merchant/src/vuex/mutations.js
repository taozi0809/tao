import {ADDPAYSTATUS,EDITPAYINFO,IOSUPLOADURL,ISAUTOPAYINFO} from "./types";

export default {
    // 添加收款方式状态
    [ADDPAYSTATUS](state,addPayStatus) {
        state.addPayStatus = addPayStatus;
    },
    //修改收款方式信息
    [EDITPAYINFO](state,editPayInfo) {
        state.editPayInfo = editPayInfo;
    },
    //IOS收款码地址
    [IOSUPLOADURL](state,iosUploadUrl) {
        state.iosUploadUrl = iosUploadUrl;
    },
    //是否自动获取支付方式
    [ISAUTOPAYINFO](state,isAutoPayInfo) {
        state.isAutoPayInfo = isAutoPayInfo;
    },

}



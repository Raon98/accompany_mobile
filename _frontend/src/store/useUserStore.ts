import { sessionStorageEffect } from "components/utils/store/Storage";
import { atom } from "recoil";

export interface User {
    uid : string,
    name : string,
    gend : string,
    birth :string,
    mail : string,
    mohp : string,
}
const UserInfo : User = {
    uid : '',
    name : '',
    gend : '',
    birth : '',
    mail : '',
    mohp : '',
}

export const userInfo = atom({
    key : "userInfo",
    default : UserInfo,
    effects_UNSTABLE: [
        sessionStorageEffect("userInfo") 
    ]
})

 
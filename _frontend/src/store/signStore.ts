import {atom} from "recoil";

export interface SignState {
    name: boolean;
    uid: boolean;
    password: boolean;
    phone: boolean;
    email: boolean;
    gender: boolean;
    private: boolean;
}

export const signStore = atom<SignState>({
    key : "signStore",
    default: {
        name : true,
        uid : false,
        password : false,
        phone : false,
        email : false,
        gender : false,
        private : false
    }
})
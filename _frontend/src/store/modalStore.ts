import {atom} from "recoil";
export const modalStore = atom<Record<string, boolean>>({
    key : "modalStore",
    default: {
        confirm : false
    }
})
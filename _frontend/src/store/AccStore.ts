import { create } from "zustand";
import { LocalStore } from "store/localStore";

interface InfoType {
    [key: string]: string;
}

const AccStore = create((set:any) => ({
    info: LocalStore.getLocalStore('info') ?? {},
    setInfo: (info: InfoType) => {
        set({ info });
        LocalStore.setLocalStore('info', info);
    }
}));

AccStore.subscribe((state:any) => {
    LocalStore.setLocalStore('info', state.info);
});

export default AccStore;

import {create} from "zustand";
interface InfoType {
    [key: string]: string;
}

const AccStore = create(setState => ({
        info: {},
        setInfo : (info:InfoType) => setState({ info : info})
    }
))

export default AccStore;
import {useRecoilState} from "recoil";
import {SignState, signStore} from "store/signStore";

interface UseSign {
    inSign : (name : keyof SignState) => boolean;
    onState : (name: keyof SignState) => void;
}

const useSign = (): UseSign => {
    const [signState, setSignState] = useRecoilState(signStore);

    const inSign = (name : keyof SignState) => {
        return signState[name];
    }
    const onState = (name: keyof SignState) => {
        setSignState((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    return { inSign, onState };
};

export default useSign;

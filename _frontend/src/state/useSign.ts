import {useRecoilState} from "recoil";
import {FieldState, SignState, signStore} from "store/signStore";

interface UseSign {
    signState : (name : keyof SignState, option :keyof FieldState) => boolean;
    onState : (name: keyof SignState ,option: keyof FieldState) => void;
    onFocusReset : () => void;
}
const useSign = (): UseSign => {
    const [signList, setSignState] = useRecoilState(signStore);

    const signState = (name : keyof SignState,option: keyof FieldState) => {
        return signList[name][option];
    }
    const onState = (name: keyof SignState ,option: keyof FieldState) => {
        setSignState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                [option] : true
            },
        }));
    };
    const onFocusReset = () => {
        setSignState((prev) => {
            const resetState = {} as SignState;
            for (const key in prev) {
                if (prev.hasOwnProperty(key)) {
                    resetState[key as keyof SignState] = {
                        ...prev[key as keyof SignState],
                        focus: false,
                    };
                }
            }
            return resetState;
        });
    };


    return { signState, onState, onFocusReset };
};

export default useSign;

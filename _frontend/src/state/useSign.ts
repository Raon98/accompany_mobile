import {useRecoilState} from "recoil";
import {emailSelectBox, FieldState, SignState, signStore} from "store/signStore";

interface UseSign {
    signState : (name : keyof SignState, option :keyof FieldState) => boolean;
    onState : (name: keyof SignState ,option: keyof FieldState) => void;
    onFocusReset : () => void;
    openBox : () => void;
    onBox: boolean;
}
const useSign = (): UseSign => {
    const [signList, setSignState] = useRecoilState(signStore);
    const [onBox , setSelectBox] = useRecoilState(emailSelectBox);

    const signState = (name : keyof SignState,option: keyof FieldState) => {
        return signList[name][option];
    }
    const onState = (name: keyof SignState ,option: keyof FieldState) => {
        if(name === 'emailAddress'){
            setSelectBox(false);
        }
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

    const openBox = () => {
        setSelectBox(!onBox)
    }


    return { signState, onState, onFocusReset,openBox,onBox };
};

export default useSign;

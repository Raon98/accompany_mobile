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

    const signState = (name: keyof SignState, option: string): boolean => {
        return signList[name]?.[option as keyof FieldState] as boolean ?? false;
    };

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
                        state: false,
                        focus: false,
                        focus1: false,
                        focus2: false,
                        success: false,
                        fail: false,
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

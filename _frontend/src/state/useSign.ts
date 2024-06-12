import {useRecoilState} from "recoil";
import {emailSelectBox, FieldState, SignState, signStore} from "store/signStore";

interface UseSign {
    signState : (name : keyof SignState, option :keyof FieldState) => boolean;
    onState : (name: keyof SignState ,option: keyof FieldState) => void;
    onReset : (option: keyof FieldState) => void;
    onAllReset : () => void;
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
    const onReset = (option: keyof FieldState) => {
        setSignState((prev) => {
            const resetState = {} as SignState;
            for (const key in prev) {
                if (prev.hasOwnProperty(key)) {
                    resetState[key as keyof SignState] = {
                        ...prev[key as keyof SignState],
                        [option]: false,
                    };
                }
            }
            return resetState;
        });
    };

    const onAllReset = () => {
        setSignState((prev) => {
            const resetState = {} as SignState;
            for (const key in prev) {
                if (prev.hasOwnProperty(key)) {
                    resetState[key as keyof SignState] = {
                        state: false,
                        success: false,
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


    return { signState, onState, onReset ,onAllReset, openBox,onBox };
};

export default useSign;

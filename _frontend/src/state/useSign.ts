import {useRecoilState} from "recoil";
import {successForm,emailSelectBox, FieldState, SignState, signStore} from "store/signStore";

interface UseSign {
    signState : (name : keyof SignState, option :keyof FieldState) => boolean;
    onState : (name: keyof SignState ,option: keyof FieldState, state?:boolean, callback?: () => void) => void;
    onReset : (option: keyof FieldState) => void;
    onAllReset : () => void;
    openBox : () => void;
    onBox: boolean;
    setSucces : (flag:boolean)=> void;
    onSuccessForm : boolean;
}
const useSign = (): UseSign => {
    const [signList, setSignState] = useRecoilState(signStore);
    const [onBox , setSelectBox] = useRecoilState(emailSelectBox);
    const [onSuccessForm , setSuccesForm] = useRecoilState(successForm);


    const signState = (name: keyof SignState, option: string): boolean => {
        return signList[name]?.[option as keyof FieldState] as boolean ?? false;
    };

    const onState = (name: keyof SignState ,option: keyof FieldState, state?:boolean, callback?: () => void) => {
        if(name === 'emailAddress'){
            setSelectBox(false);
        }
        setSignState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                [option] : state !== undefined ? state : true
            },
        }));
        if(callback){
            callback()
        }

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
                        fail : false
                    };
                }
            }
            return resetState;
        });
    };

    const openBox = () => {
        setSelectBox(!onBox)
    }

    const setSucces = (flag:boolean) => {
        setSuccesForm(flag)
    }

    return { signState, onState, onReset ,onAllReset, openBox,onBox,setSucces,onSuccessForm };
};

export default useSign;

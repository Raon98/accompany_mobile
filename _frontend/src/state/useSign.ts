import { useRecoilState } from "recoil";
import {
  FieldState,
  OptionState,
  SignState,
  emailSelectBox,
  signStore,
  signTermsOption,
  successForm,
} from "store/signStore";

interface UseSign {
  signState: (name: keyof SignState, option: keyof FieldState) => boolean;
  onState: (
    name: keyof SignState,
    option: keyof FieldState,
    state?: boolean,
    callback?: () => void
  ) => void;
  onReset: (option: keyof FieldState) => void;
  onAllReset: () => void;
  openBox: () => void;
  onBox: boolean;
  setSucces: (flag: boolean) => void;
  onSuccessForm: boolean;
  optionState: (name: keyof OptionState) => boolean;
  setOptionState: (name: keyof OptionState) => void;
}
const useSign = (): UseSign => {
  const [signList, setSignState] = useRecoilState(signStore);
  const [onBox, setSelectBox] = useRecoilState(emailSelectBox);
  const [onSuccessForm, setSuccesForm] = useRecoilState(successForm);
  const [onOption, setOption] = useRecoilState(signTermsOption);

  const optionState = (name: keyof OptionState) => {
    return name ? onOption[name] : false;
  };
  const setOptionState = (name: keyof OptionState) => {
    if (name === "all") {
      setOption((prev) => {
        const reset: OptionState = {};
        for (const key in prev) {
          if (prev.hasOwnProperty(key)) {
            reset[key] = true;
          }
        }
        return reset;
      });
    } else {
      setOption((prev) => ({
        ...prev,
        [name]: !optionState(name),
      }));
    }
  };
  const signState = (name: keyof SignState, option: string): boolean => {
    return (signList[name]?.[option as keyof FieldState] as boolean) ?? false;
  };

  const onState = (
    name: keyof SignState,
    option: keyof FieldState,
    state?: boolean,
    callback?: () => void
  ) => {
    if (name === "emailAddress") {
      setSelectBox(false);
    }
    setSignState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [option]: state !== undefined ? state : true,
      },
    }));
    if (callback) {
      callback();
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
            fail: false,
          };
        }
      }
      return resetState;
    });
  };

  const openBox = () => {
    setSelectBox(!onBox);
  };

  const setSucces = (flag: boolean) => {
    setSuccesForm(flag);
  };

  return {
    signState,
    onState,
    onReset,
    onAllReset,
    openBox,
    onBox,
    setSucces,
    onSuccessForm,
    optionState,
    setOptionState,
  };
};

export default useSign;

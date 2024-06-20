import { atom } from "recoil";

export interface FieldState {
    state: boolean;
    focus: boolean;
    success: boolean;
    fail : boolean;
}

export interface SignState {
    name: FieldState;
    uid: FieldState;
    password: FieldState;
    passwordConfirm: FieldState;
    email: FieldState;
    emailAddress: FieldState;
    phone: FieldState;
    birthYy : FieldState;
    birthMm : FieldState;
    birthDd : FieldState;
    gender: FieldState;
    private: FieldState;
}

const defaultFieldState = {
    state: false,
    focus: false,
    success: false,
    fail : false
};

const defaultSignState = {
    uid: defaultFieldState,
    password: defaultFieldState,
    passwordConfirm: defaultFieldState,
    name: defaultFieldState,
    email: defaultFieldState,
    emailAddress: defaultFieldState,
    phone: defaultFieldState,
    birthYy: defaultFieldState,
    birthMm: defaultFieldState,
    birthDd: defaultFieldState,
    gender: defaultFieldState,
    private: defaultFieldState
};

export const signStore = atom<SignState>({
    key: "signStore",
    default: defaultSignState
});

export const emailSelectBox = atom({
    key : "emailSelectBox",
    default : false
})

export const successForm = atom({
    key: "successForm",
    default : false
})

export const signTermsOption = atom({
    key : "signTermsOption",
    default : {
        all : false,
        use : false,
        priv : false
    }
})
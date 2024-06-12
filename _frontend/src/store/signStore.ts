import { atom } from "recoil";

export interface FieldState {
    state: boolean;
    focus: boolean;
    success: boolean;
}

export interface SignState {
    name: FieldState;
    uid: FieldState;
    password: FieldState;
    passwordConfirm: FieldState;
    email: FieldState;
    emailAddress: FieldState;
    phone: FieldState;
    birth : FieldState;
    gender: FieldState;
    private: FieldState;
}

export const signStore = atom<SignState>({
    key: "signStore",
    default: {
        uid: {
            state: false,
            focus: false,
            success: false
        },
        password: {
            state: false,
            focus: false,
            success: false
        },
        passwordConfirm: {
            state: false,
            focus: false,
            success: false
        },
        name: {
            state: true,
            focus: false,
            success: false
        },
        email: {
            state: false,
            focus: false,
            success: false
        },
        emailAddress: {
            state: false,
            focus: false,
            success: false
        },
        phone: {
            state: false,
            focus: false,
            success: false
        },
        birth: {
            state: false,
            focus: false,
            success: false
        },
        gender: {
            state: false,
            focus: false,
            success: false
        },
        private: {
            state: false,
            focus: false,
            success: false
        }
    }
});

export const emailSelectBox = atom({
    key : "emailSelectBox",
    default : false
})
import { atom } from "recoil";

export interface FieldState {
    state: boolean;
    focus: boolean;
    focus1?: boolean;
    focus2?: boolean;
    success: boolean;
    fail: boolean;
}

export interface SignState {
    name: FieldState;
    uid: FieldState;
    password: FieldState;
    passwordConfirm?: FieldState ;
    phone: FieldState;
    email: FieldState;
    emailAddress: FieldState;
    gender: FieldState;
    private: FieldState;
}

export const signStore = atom<SignState>({
    key: "signStore",
    default: {
        name: {
            state: true,
            focus: false,
            success: false,
            fail: false
        },
        uid: {
            state: false,
            focus: false,
            success: false,
            fail: false
        },
        password: {
            state: false,
            focus: false,
            focus1: false,
            success: false,
            fail: false
        },
        phone: {
            state: false,
            focus: false,
            success: false,
            fail: false
        },
        email: {
            state: false,
            focus: false,
            success: false,
            fail: false
        },
        emailAddress: {
            state: false,
            focus: false,
            success: false,
            fail: false
        },
        gender: {
            state: false,
            focus: false,
            success: false,
            fail: false
        },
        private: {
            state: false,
            focus: false,
            success: false,
            fail: false
        }
    }
});

export const emailSelectBox = atom({
    key : "emailSelectBox",
    default : false
})
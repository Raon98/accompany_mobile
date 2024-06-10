import { atom } from "recoil";

export interface FieldState {
    state: boolean;
    focus: boolean;
    success: boolean;
    fail: boolean;
}

export interface SignState {
    name: FieldState;
    uid: FieldState;
    password: FieldState;
    passwordConfirm: FieldState;
    phone: FieldState;
    email: FieldState;
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
            success: false,
            fail: false
        },
        passwordConfirm: {
            state: false,
            focus: false,
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

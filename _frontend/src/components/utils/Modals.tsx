import React from "react";
import {useRecoilState} from "recoil";
import {modalStore} from "store/modalStore";
import {ConfirmModal} from "components/utils/modals/ConfirmModal";

interface SwitchProps {
    modals: { [key: string]: JSX.Element };
}

const Switch = ({modals}: SwitchProps) => {
    const [modalKeys] = useRecoilState(modalStore);
    const openModals = Object.keys(modalKeys).find((key: string) => modalKeys[key]);

    return openModals ? modals[openModals] : null;
};

export const Modals = () => (
    <>
        <Switch
            modals={{
                confirm: <ConfirmModal/>
            }}/>
    </>
)



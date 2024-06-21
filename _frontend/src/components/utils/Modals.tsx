import React, { Component } from "react";
import { useRecoilState } from "recoil";
import { modalStore } from "store/modalStore";
import { ComponentModal } from "components/utils/modals/ComponentModal";
import { ConfirmModal } from "components/utils/modals/ConfirmModal";

interface SwitchProps {
  modals: { [key: string]: JSX.Element };
}

const Switch = ({ modals }: SwitchProps) => {
  const [modalKeys] = useRecoilState(modalStore);
 
  const openModals = Object.keys(modalKeys).find((key: string) => {
    return modalKeys[key];
  });
  console.log(openModals)
  return openModals ? modals[openModals] : null;
};

interface ModalProps {
  Props1?: any;
  Props2?: any;
}
export const Modals = ({ Props1, Props2 }: ModalProps) => {
  return (
    <>
      <Switch
        modals={{
          confirm: <ConfirmModal />,
          component: <ComponentModal component={Props1} title={Props2} />,
        }}
      />
    </>
  );
};

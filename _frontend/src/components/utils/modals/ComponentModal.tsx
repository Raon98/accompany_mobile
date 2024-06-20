import { CloseHeader } from 'components/layout/CustomHeader';
import React from 'react';
import useModal from "state/useModal";

interface componentProp {
    component : React.Component;
    title : string
}
export const ConfirmModal = ({component,title}:componentProp) => {
    console.log('컴포넌트 모달입니다.')
    const {isOpen, onClose} = useModal('component')
    return (
        <>
            {isOpen && (
               <>
                <CloseHeader title={title}/>
                {component}
               </>
            )}
        </>
    );
};


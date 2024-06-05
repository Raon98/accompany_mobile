import React from 'react';
import useModal from "state/useModal";

export const ConfirmModal = () => {
    console.log('ConfirmModal')
    const {isOpen, onClose} = useModal('confirm')
    return (
        <>
            {isOpen && (
                <div>
                확인모달입니다.
                    <button onClick={onClose}>닫기버튼</button>
            </div>
            )}
        </>
    );
};


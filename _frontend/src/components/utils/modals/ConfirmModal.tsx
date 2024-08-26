import { useEffect } from "react";
import useModal from "state/useModal";

interface ConfirmModalProps {
  Props1: {
    title? : string;
    content: string;
    cancel?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirmFn?: () => void;
    style? : {
      height? : string;
    }
  };
}
export const ConfirmModal = ({ Props1 }: ConfirmModalProps) => {
  const { isOpen, onClose } = useModal("confirm");

  // const modalHeightStyle = Props1.style?.height ?  "30%" : Props1.style?.height
  const safeProps = Props1 || { content: "" };
  const func = {
    confirm: () => {
      if (safeProps.confirmFn) {
        safeProps.confirmFn();
      }
      onClose();
    },
  };

  
  return (
    <>
      {isOpen && (
        <>
          <div className="dimmed" onClick={onClose}></div>
          <div className="modals confirm" style={{height : safeProps.style?.height || "30%"}}>
            <div className="modals-title">{safeProps.title}</div>
            <div className="modals-content">
              <div dangerouslySetInnerHTML={{ __html: safeProps.content || '' }} />
            </div>
            <div className="btn__block">
              {safeProps.cancel && (
                <button className="modal-confirm__btn cancel" onClick={onClose}>
                  {safeProps?.cancelText ? Props1.cancelText : "취소"}
                </button>
              )}
              <button
                className={`modal-confirm__btn ${
                  safeProps.cancel ? "confirm" : ""
                }`}
                onClick={() => func.confirm()}
              >
                {safeProps.confirmText ? Props1.confirmText : "확인"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

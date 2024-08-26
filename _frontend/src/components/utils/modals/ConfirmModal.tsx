import useModal from "state/useModal";

interface ConfirmModalProps {
  Props1: {
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

  const func = {
    confirm: () => {
      if (Props1.confirmFn) {
        Props1.confirmFn();
      }
      onClose();
    },
  };
  return (
    <>
      {isOpen && (
        <>
          <div className="dimmed" onClick={onClose}></div>
          <div className="modals confirm" style={{height : Props1.style?.height? Props1.style.height : ''}}>
            <div className="modals-content">
              <div dangerouslySetInnerHTML={{ __html: Props1.content }} />
            </div>
            <div className="btn__block">
              {Props1.cancel && (
                <button className="modal-confirm__btn cancel" onClick={onClose}>
                  {Props1?.cancelText ? Props1.cancelText : "취소"}
                </button>
              )}
              <button
                className={`modal-confirm__btn ${
                  Props1.cancel ? "confirm" : ""
                }`}
                onClick={() => func.confirm()}
              >
                {Props1.confirmText ? Props1.confirmText : "확인"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

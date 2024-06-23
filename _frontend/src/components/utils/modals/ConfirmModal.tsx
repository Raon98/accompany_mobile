import useModal from "state/useModal";

interface ConfirmModalProps {
  Props1: {
    content: string;
    cancel?: boolean;
    confirmText?: string;
    cancelText?: string;
  };
}
export const ConfirmModal = ({ Props1 }: ConfirmModalProps) => {
  const { isOpen, onClose } = useModal("confirm");

  return (
    <>
      {isOpen && (
        <>
          <div className="dimmed" onClick={onClose}></div>
          <div className="modals confirm">
            <div className="modals-content">
              <>{Props1.content}</>
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
                onClick={onClose}
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

import useModal from "state/useModal";

interface ConfirmModalProps {
  context: string;
}
export const ConfirmModal = ({ context }: ConfirmModalProps) => {
  const { isOpen, onClose } = useModal("confirm");

  return (
    <>
      {isOpen && (
        <>
          <div className="dimmed" onClick={onClose}></div>
          <div className="modals confirm">
            <div className="modals-content">
              <>{context}</>
            </div>
            <button className="modal-confirm__btn" onClick={onClose}>
              확인
            </button>
          </div>
        </>
      )}
    </>
  );
};

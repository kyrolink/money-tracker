import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmation",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
    >
      <p className="text-gray-600 leading-relaxed">
        {message}
      </p>

      <div className="flex justify-end gap-3 mt-8">

        <Button
          variant="secondary"
          onClick={onClose}
        >
          {cancelText}
        </Button>

        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            danger
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
        >
          {confirmText}
        </button>

      </div>
    </Modal>
  );
}
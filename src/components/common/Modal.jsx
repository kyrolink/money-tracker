export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-5">

          {children}

        </div>

      </div>

    </div>
  );
}